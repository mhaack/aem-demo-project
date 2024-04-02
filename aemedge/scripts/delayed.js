// eslint-disable-next-line import/no-cycle
import { loadScript, sampleRUM } from './aem.js';

// Core Web Vitals RUM collection
sampleRUM('cwv');

// add more delayed functionality here

function getEnvType(hostname = window.location.hostname) {
  const fqdnToEnvType = {
    'www.sap.com': 'prod',
    'www-qa.sap.com': 'stage',
    'main--hlx-test--urfuwo.hlx.live': 'stage',
  };
  return fqdnToEnvType[hostname] || 'dev';
}

async function sendBeacon(stl = null) {
  window.adobeDataLayer.push({
    event: stl ? 'stlBeaconReady' : 'stBeaconReady',
  });
}

async function loadAdobeDC() {
  const adobeTagsSrc = {
    dev: 'https://assets.adobedtm.com/ccc66c06b30b/6fa889b263e0/launch-3318725e3375-development.min.js',
    stage: 'https://assets.adobedtm.com/ccc66c06b30b/6fa889b263e0/launch-6615f1bb001d-staging.min.js',
    prod: 'https://assets.adobedtm.com/ccc66c06b30b/6fa889b263e0/launch-69ede165613b.min.js',
  };
  const envType = getEnvType();
  if (envType && adobeTagsSrc[envType]) {
    if (envType !== 'dev' || ((new URLSearchParams(window.location.search)).get('tr')) != null) {
      await loadScript(adobeTagsSrc[envType], {});
      await sendBeacon();
    }
  }
}

await loadAdobeDC();
