# SAP Content Hub

## Environments

- Preview: https://main--builder-prospect--sapudex.hlx.page
- Live: https://main--builder-prospect--sapudex.hlx.live
- External: https://www-qa.sap.com

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

## Syncing Dev Repo to Production Repo Using Release Pull Requests

1. Ensure Development Repository is Up-to-Date:
   - Ensure you are on the latest `main` branch in your development repository (Repo `builder-prospect`).
   - Double check all branches / PRs are merged

2. Create release
   - Use https://github.tools.sap/sapudex/builder-prospect/releases/new to create a release and a release tag

   ![Screenshot release](/docs/screenshot-release.png)


3. Create a pull request from the Production repo:
   - Go to https://github.tools.sap/sapudex/builder-prospect-prod/pulls
   - Create a new pull request
   - Select "compare across forks"
   - Select `builder-prospect` from the second repository dropdown
   - Select the new release tag from the "compare" dropdown
   - Click "Create pull request"
   - Fill out the details
   - Click "Create pull request"

   ![Screenshot pull request](/docs/screenshot-create-pr.png)

   The pull request should look like: https://github.tools.sap/sapudex/builder-prospect-prod/pull/1

   It has all the changes between now and the last release PR.

4. Review the release pull request
   - Review the changes which will be pushed to production
   - Get approval for the release pull request

5. Merge the release pull request
   - Merge the pull request to `main` of `builder-prospect-prod`
   - Done


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
