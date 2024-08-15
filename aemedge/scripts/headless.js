import { readBlockConfig, toCamelCase, toClassName } from './aem.js';

// eslint-disable-next-line import/prefer-default-export
export class HeadlessFragment extends HTMLElement {
  constructor() {
    super();

    // Attaches a shadow DOM tree to the element
    // With mode open the shadow root elements are accessible from JavaScript outside the root
    this.attachShadow({ mode: 'open' });

    // Keep track if we have rendered the fragment yet.
    this.initialized = false;
  }

  loadCSS(url) {
    const styles = document.createElement('link');
    styles.setAttribute('rel', 'stylesheet');
    styles.setAttribute('href', url);
    this.shadowRoot.querySelector('head').appendChild(styles);
  }

  // eslint-disable-next-line class-methods-use-this
  decorateSections(main) {
    main.querySelectorAll(':scope > div').forEach((section) => {
      section.classList.add('section');
      section.dataset.sectionStatus = 'initialized';
      section.style.display = 'none';

      // Process section metadata
      const sectionMeta = section.querySelector('div.section-metadata');
      if (sectionMeta) {
        const meta = readBlockConfig(sectionMeta);
        Object.keys(meta).forEach((key) => {
          if (key === 'style') {
            const styles = meta.style
              .split(',')
              .filter((style) => style)
              .map((style) => toClassName(style.trim()));
            styles.forEach((style) => section.classList.add(style));
          } else {
            section.dataset[toCamelCase(key)] = meta[key];
          }
        });
        sectionMeta.remove();
      }
    });
  }

  /**
   * Invoked each time the custom element is appended into a document-connected element.
   * This will happen each time the node is moved, and may happen before the element's contents
   * have been fully parsed.
   */
  async connectedCallback() {
    if (!this.initialized) {
      try {
        const urlAttribute = this.attributes.getNamedItem('url');
        if (!urlAttribute) {
          throw new Error('franklin-fragment missing url attribute');
        }

        const head = document.createElement('head');
        this.shadowRoot.append(head);

        const body = document.createElement('body');
        body.style = 'display: none';
        this.shadowRoot.append(body);

        const { href, origin } = new URL(`${urlAttribute.value}.plain.html`);

        // Load fragment
        const resp = await fetch(href);
        if (!resp.ok) {
          throw new Error(`Unable to fetch ${href}`);
        }

        this.loadCSS(`${origin}/aemedge/styles/css_variables.css`);
        this.loadCSS(`${origin}/aemedge/styles/styles.css`);
        this.loadCSS(`${origin}/aemedge/styles/fonts.css`);
        this.loadCSS(`${origin}/aemedge/styles/headless.css`);
        body.style.display = null;

        const main = document.createElement('main');
        body.append(main);

        let htmlText = await resp.text();
        // Fix relative image urls
        const regex = /.\/media/g;
        htmlText = htmlText.replace(regex, `${origin}/media`);
        main.innerHTML = htmlText;

        // Set initialized to true so we don't run through this again
        this.initialized = true;

        this.decorateSections(main);

        // Query all the blocks in the fragment
        const blockElements = main.querySelectorAll(':scope > div > div');

        // Did we find any blocks or all default content?
        const blocksLoaded = new Set();
        const decorateBlocks = {};

        if (blockElements.length > 0) {
          // Get the block names
          const blocks = Array.from(blockElements).map((block) => block.classList.item(0));

          // Load scripts file for fragment host site
          window.hlx = window.hlx || {};
          window.hlx.suppressLoadPage = true;
          window.hlx.codeBasePath = '/aemedge';

          const { decorateMain } = await import(`${origin}/aemedge/scripts/scripts.js`);
          if (decorateMain) {
            await decorateMain(main);
          }
          body.classList.add('appear');

          // For each block in the fragment load it's js/css
          for (let i = 0; i < blockElements.length; i += 1) {
            const blockName = blocks[i];
            const block = blockElements[i];

            if (!blocksLoaded.has(blockName)) {
              const link = document.createElement('link');
              link.setAttribute('rel', 'stylesheet');
              link.setAttribute('href', `${origin}/aemedge/blocks/${blockName}/${blockName}.css`);

              const cssLoaded = new Promise((resolve) => {
                link.onload = resolve;
                link.onerror = resolve;
              });

              body.appendChild(link);
              // eslint-disable-next-line no-await-in-loop
              await cssLoaded;
            }

            try {
              const blockScriptUrl = `${origin}/aemedge/blocks/${blockName}/${blockName}.js`;
              // eslint-disable-next-line no-await-in-loop
              const decorateBlock = decorateBlocks[blockScriptUrl] || await import(blockScriptUrl);
              decorateBlocks[blockScriptUrl] = decorateBlock;
              if (decorateBlock.default) {
                // eslint-disable-next-line no-await-in-loop
                await decorateBlock.default(block);
              }
            } catch (e) {
              // eslint-disable-next-line no-console
              console.log(e || 'An error occured while loading the fragment');
            }
          }

          // process sections
          const sections = main.querySelectorAll('.section');
          sections.forEach((section) => {
            section.dataset.sectionStatus = 'loaded';
            section.style.display = null;
          });
        }

        // Append the fragment to the shadow dom
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err || 'An error occured while loading the fragment');
      }
    }
  }

  /**
   * Imports a script and appends to document body
   * @param {*} url
   * @returns
   */

  // eslint-disable-next-line class-methods-use-this
  async importScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.type = 'module';
      script.onload = resolve;
      script.onerror = reject;

      document.body.appendChild(script);
    });
  }
}

customElements.define('aem-content', HeadlessFragment);
