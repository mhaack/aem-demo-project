# SAP Content Hub

## Environments

- Preview: https://main--hlx-test--urfuwo.hlx.page/
- Live: https://main--hlx-test--urfuwo.hlx.live/

## Documentation

All technical documentation of the project lives in [/docs](/docs) folder.

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. Create a new repository based on the `aem-boilerplate` template and add a mountpoint in the `fstab.yaml`
2. Add the [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) to the repository
3. Install the [AEM CLI](https://github.com/adobe/aem-cli): `npm install -g @adobe/aem-cli`
4. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
5. Open the `{repo}` directory in your favorite IDE and start coding :)

## UDEX webcomponent integration

The plan is to use various webcomponents from the UDEX project to implement blocks where appropriate.
The hero block currently already is using the HeroBanner component and can serve as an example of the approach.

In a nutshell, for each webcomponent, we need to create a proxy (called entry-point) in the [entry-points](entry-points) directory. This file should just import the component from UDEX - e.g. in [entry-points/entry-udex-hero-banner.js](entry-points/entry-udex-hero-banner.js),

```
import '@udex/web-components/dist/HeroBanner.js';
```

we import the HeroBanner from UDEX. This new file, in turn, now needs to be added as an entry point in the [vite.config.js](vite.config.js):

```
...
      entry: [path.resolve(__dirname, 'entry-points/entry-udex-hero-banner.js')],
...
```

and into the `import-map` in [head.html](head.html):

```
<script type="importmap">
  {
    "imports": {
      "@udex/web-components/dist/HeroBanner.js": "/dist/entry-udex-hero-banner.esm.js"
    }
  }
</script>
```

mapping the UDEX import to the output of the vite build (will be in the [dist](dist) dir after the build - called the same as the entry point but with `.esm.js` as extension).

Next, we can already use that component in a block by importing it like normal and then starting to use the webcomponent e.g. for the [Hero](blocks/hero/hero.js) we do:

```
import '@udex/web-components/dist/HeroBanner.js';

export default async function decorate(block) {
...
  const hero = document.createElement('udex-hero-banner');
...
```

What is left is to run the build using `npm run build` (notice that the output in [dist](dist) needs to be commited as well and that it is required to have run `npm install` to have all required dependencies installed). This is only necessary if a new entry-point has been added.

Finally, when a new update of the UDEX library is pushed to the CDN, it can be incorporated by updating the link in the [package.json](package.json)

```
  "dependencies": {
    "@udex/web-components": "https://cdn.udex.services.sap.com/dds/npm/web-components-0.25.0.tgz"
  }
```

pointing it to the new release and running `npm run build`. For now, the process of updates is manual - i.e., the UDEX team needs to make a new version available on the CDN and then, the url can be updated after this is communicated OOB.
.
