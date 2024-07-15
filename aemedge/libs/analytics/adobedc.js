import { getLoadAdobeDCGuard, getSendBeaconGuard } from './guards.js';
import { getEnvType } from './analytics-core.js';
import { loadScript } from '../../scripts/aem.js';

async function sendBeacon(stl = null, dl = window.adobeDataLayer) {
  getSendBeaconGuard().then(() => {
    dl.push({
      event: stl ? 'stlBeaconReady' : 'stBeaconReady',
    });
  });
}

async function loadAdobeDC() {
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

async function loadAdobeDCSendBeacon() {
  getLoadAdobeDCGuard().then(() => {
    loadAdobeDC();
    sendBeacon();
  });
}

loadAdobeDCSendBeacon();
