import { loadFragment } from '../../scripts/scripts.js';
import ffetch from '../../scripts/ffetch.js';
import { meta } from '../../scripts/dom-builder.js';
import { compareVersions, fioriWebRootUrl, getVersionList } from '../../scripts/utils.js';

const rootUrl = fioriWebRootUrl;

function getParentUrl(pathParts) {
  const file = pathParts[pathParts.length - 1];

  return rootUrl + file;
}

function correctUrlVersion(path, virtualVersion, sourceVersion) {
  if (virtualVersion === 'latest') {
    return path.replace(`v${sourceVersion}/`, '');
  }

  return path.replace(sourceVersion, virtualVersion);
}

function findVersion(version, pageVersions) {
  if (version === 'latest') {
    return pageVersions[pageVersions.length - 1];
  }

  for (let i = 0; i < pageVersions.length; i += 1) {
    const comparison = compareVersions(pageVersions[i].version, version);
    if (comparison === 0) {
      return pageVersions[i];
    }

    if (comparison > 0) {
      if (i === 0) {
        // eslint-disable-next-line no-console
        console.warn(`No version found for ${version} using the first available`);
        return pageVersions[0];
      }
      return pageVersions[i - 1];
    }
  }

  return pageVersions[pageVersions.length - 1];
}

async function decorate(doc) {
  doc.body.classList.add('design-system', 'web-component');
  doc.head.querySelector('meta[name="template"]').setAttribute('content', 'web-component');

  const path = doc.location.pathname;
  const pathParts = path.split('/');
  const parentUrl = getParentUrl(pathParts);

  const rawVersion = (pathParts.length > 3) ? pathParts[3] : 'latest';

  let virtualVersion = 'latest';
  const regExpMatchArray = rawVersion.match(/^v(\d+-\d+)/);
  if (regExpMatchArray) {
    // eslint-disable-next-line prefer-destructuring
    virtualVersion = regExpMatchArray[1];
  }

  const pageVersions = await ffetch(`${rootUrl}query-index.json`).filter((row) => getParentUrl(row.path.split('/')) === parentUrl).all();

  pageVersions.sort((a, b) => compareVersions(a.version, b.version));

  const sourceVersion = findVersion(virtualVersion, pageVersions);

  document.title = sourceVersion.title;

  const metaFields = {
    targetVersionUrl: sourceVersion.path,
    breadcrumbs: sourceVersion.breadcrumbs,
  };
  if (virtualVersion === 'latest') {
    const versionList = await getVersionList();
    metaFields.version = versionList[versionList.length - 1];
  }

  if (sourceVersion.uielementstechnology) {
    metaFields.uielementstechnology = sourceVersion.uielementstechnology;
  }
  if (sourceVersion.designowner) {
    metaFields.designowner = sourceVersion.designowner;
  }
  if (sourceVersion.elementtype) {
    metaFields.elementtype = sourceVersion.elementtype;
  }

  Object.entries(metaFields).forEach(([name, content]) => {
    const metaField = meta({
      name,
      content,
    });
    doc.head.append(metaField);
  });

  const main = doc.querySelector('main');
  const newMain = await loadFragment(sourceVersion.path, true);
  newMain.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href) {
      a.setAttribute('href', correctUrlVersion(href, virtualVersion, sourceVersion.version));
    }
  });

  main.replaceWith(newMain);
}
decorate(document);
