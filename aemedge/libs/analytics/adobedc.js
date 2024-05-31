import { loadScript } from '../../scripts/aem.js';
// eslint-disable-next-line import/no-cycle
import { getEnvType, getScope } from './analytics-core.js';

async function sendAdobeDCBeacon(stl = null, dl = window.adobeDataLayer) {
  dl.push({
    event: stl ? 'stlBeaconReady' : 'stBeaconReady',
  });
}

async function loadAdobeDC() {
  const prefix = 'https://assets.adobedtm.com/ccc66c06b30b';
  const adobeTagsSrc = {
    ch_mvp: {
      dev: `${prefix}/9603c787a032/launch-889fcf09872a-development.min.js`,
      stage: `${prefix}/9603c787a032/launch-e44b1a92b035-staging.min.js`,
      prod: null,
    },
    ch_full: {
      dev: `${prefix}/329fd5db13e8/launch-462cd12600a7-development.min.js`,
      stage: `${prefix}/329fd5db13e8/launch-ea4f6d155d11-staging.min.js`,
      prod: null,
    },
    ds: {
      dev: `${prefix}/78be3ff00491/launch-906ccafb0bc4-development.min.js`,
      stage: `${prefix}/78be3ff00491/launch-ee67e6d731cd-staging.min.js`,
      prod: null,
    },
  };
  const envType = getEnvType();
  const scope = getScope();
  if (envType && adobeTagsSrc[scope][envType]) {
    if (envType !== 'dev' || ((new URLSearchParams(window.location.search)).get('tr')) != null) {
      await loadScript(adobeTagsSrc[scope][envType], {});
    }
  }
}

await loadAdobeDC();
await sendAdobeDCBeacon();
