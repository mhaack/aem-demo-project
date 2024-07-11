import { sendAdobeDCBeacon, getPrenotificationPromise } from './beacon.js';
import { getEnvType } from './analytics-core.js';
import { loadScript } from '../../scripts/aem.js';

async function loadLaunch() {
  const prefix = 'https://assets.adobedtm.com/ccc66c06b30b';
  const adobeTagsSrc = {
    dev: `${prefix}/329fd5db13e8/launch-462cd12600a7-development.min.js`,
    stage: `${prefix}/329fd5db13e8/launch-ea4f6d155d11-staging.min.js`,
    prod: null,
  };
  const envType = getEnvType();
  if (envType && adobeTagsSrc[envType]) {
    if (envType !== 'dev' || ((new URLSearchParams(window.location.search)).get('tr')) != null) {
      await loadScript(adobeTagsSrc[envType], {});
    }
  }
}

async function loadAdobeDC() {
  const ccPromise = getPrenotificationPromise('cc');
  if (ccPromise) {
    ccPromise.then(() => {
      loadLaunch();
    });
  } else {
    loadLaunch();
  }
}

loadAdobeDC();
sendAdobeDCBeacon();
