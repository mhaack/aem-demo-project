import { a, li, ul } from '../../scripts/dom-builder.js';
import { loadFragment } from '../../scripts/scripts.js';

function openTab(target) {
  const parent = target.parentNode;
  const main = parent.closest('main');
  const selected = target.getAttribute('aria-selected') === 'true';
  if (!selected) {
    // close all open tabs
    const openPageNav = parent.parentNode.querySelectorAll('li[aria-selected="true"]');
    const openContent = main.querySelectorAll('div.section[aria-hidden="false"][data-name]');
    openPageNav.forEach((tab) => tab.setAttribute('aria-selected', false));
    openContent.forEach((tab) => tab.setAttribute('aria-hidden', true));
    // open clicked tab
    parent.setAttribute('aria-selected', true);
    const tabs = main.querySelectorAll(`div.section[data-name="${target.getAttribute('href').substring(1)}"]`);
    tabs.forEach((tab) => tab.setAttribute('aria-hidden', false));
  }
}

async function createTabList(sections, active) {
  const sectionsDict = sections.reduce((acc, section) => {
    const sectionName = section.getAttribute('data-name');
    acc[sectionName] = true;
    return acc;
  });

  return ul(
    ...Object
      .keys(sectionsDict)
      // TODO should we remove tabSections?
      .map((tabName) => li(
        { 'aria-selected': tabName === active },
        a({
          href: `#${tabName}`,
          onclick: (e) => {
            openTab(e.target);
          }, // tabName, tabSections); },
        }, tabName),
      )),
  );
}

export default async function decorate(block) {
  const main = block.closest('main');
  const tabNames = [...block.children].map((child) => child.textContent.trim());
  if (!tabNames) return;

  const namedSections = (await Promise.all(tabNames.map(async (tabName) => {
    const sanitizedTabName = tabName.toLowerCase().replace(/ /g, '-');
    const tabUrl = `${document.location.pathname}${sanitizedTabName}`;
    // eslint-disable-next-line no-await-in-loop
    return [await loadFragment(tabUrl), tabName];
  }))).reduce((acc, [tab, tabName]) => {
    const sections = [...tab.children];
    sections.forEach((section) => section.setAttribute('data-name', tabName));
    acc.push(...sections);

    return acc;
  }, []);

  block.closest('.section').after(...namedSections);

  let activeHash = window.location.hash;
  const id = activeHash.substring(1, activeHash.length);

  const tabExists = namedSections.some((section) => section?.getAttribute('data-name') === id);
  let activeTab = id;
  if (!tabExists) {
    const element = document.getElementById(id);
    if (element) {
      activeTab = element.closest('.section')?.getAttribute('aria-labelledby');
      element.scrollIntoView();
    } else {
      activeTab = namedSections[0].getAttribute('data-name');
    }
  }

  namedSections.forEach((section) => {
    if (activeTab === section.getAttribute('data-name')) {
      section.setAttribute('aria-hidden', false);
    } else {
      section.setAttribute('aria-hidden', true);
    }
  });

  block.replaceChildren(await createTabList(namedSections, activeTab));

  window.addEventListener('hashchange', () => {
    activeHash = window.location.hash;
    activeHash = activeHash ? activeHash.substring(1) : namedSections[0].getAttribute('data-name');
    if (!activeHash) return;

    const element = document.getElementById(activeHash);
    const tab = element?.closest('.section');
    if (tab) {
      const targetTabName = tab.getAttribute('data-name');
      const targetTab = block.querySelector(`a[href="#${targetTabName}"]`);
      if (!targetTab) return;
      openTab(targetTab);
      document.getElementById(activeHash).scrollIntoView();
    }

    const targetTab = block.querySelector(`a[href="#${activeHash}"]`);
    if (!targetTab) return;

    openTab(targetTab);

    // scroll content into view
    const firstVisibleSection = main.querySelector(`div.section[aria-labelledby="${activeHash}"]`);
    if (!firstVisibleSection) return;

    window.scrollTo({
      left: 0,
      top: firstVisibleSection.offsetTop - 10,
      behavior: 'smooth',
    });
  });

  const pageTabsBlock = main.querySelector('.page-tabs-wrapper');
  pageTabsBlock.classList.add('sticky-element', 'sticky-desktop');
}
