// eslint-disable-next-line import/no-cycle
import { getMetadata, loadScript, sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

function getEnvType(hostname = window.location.hostname) {
  const fqdnToEnvType = {
    'www.sap.com': 'prod',
    'www-qa.sap.com': 'stage',
    'main--builder-prospect--sapudex.hlx.live': 'stage',
  };
  return fqdnToEnvType[hostname] || 'dev';
}

function getScope(path = window.location.pathname) {
  if (path.startsWith('/news/')
    || (path.startsWith('/blogs/') && getMetadata('article:tag')?.includes('content-type/executive-blog'))) {
    return 'ch_mvp_slc';
  }
  if (path.startsWith('/design/') || path.startsWith('/design-system/')) {
    return 'ds_slc'; // return null if internal
  }
  return 'ch_full_slc';
}

async function sendBeacon(stl = null) {
  window.adobeDataLayer.push({
    event: stl ? 'stlBeaconReady' : 'stBeaconReady',
  });
}

async function loadAdobeDC() {
  const prefix = 'https://assets.adobedtm.com/ccc66c06b30b';
  const adobeTagsSrc = {
    ch_mvp_slc: {
      dev: `${prefix}/6fa889b263e0/launch-3318725e3375-development.min.js`,
      stage: `${prefix}/6fa889b263e0/launch-6615f1bb001d-staging.min.js`,
      prod: `${prefix}/6fa889b263e0/launch-69ede165613b.min.js`,
    },
    ch_full_slc: {
      dev: `${prefix}/25f24eee2abd/launch-f3136a1cc085-development.min.js`,
      stage: `${prefix}/25f24eee2abd/launch-6f23898368f1-staging.min.js`,
      prod: `${prefix}/25f24eee2abd/launch-2fd2742fb9c4.min.js`,
    },
    ds_slc: {
      dev: `${prefix}/57f4f8e3a781/launch-92f6f7a945ee-development.min.js`,
      stage: `${prefix}/57f4f8e3a781/launch-131489947aa0-staging.min.js`,
      prod: `${prefix}/57f4f8e3a781/launch-b3931adab11c.min.js`,
    },
  };
  const envType = getEnvType();
  const scope = getScope();
  if (envType && adobeTagsSrc[scope][envType]) {
    if (envType !== 'dev' || ((new URLSearchParams(window.location.search)).get('tr')) != null) {
      await loadScript(adobeTagsSrc[scope][envType], {});
      await sendBeacon();
    }
  }
}

await loadAdobeDC();
