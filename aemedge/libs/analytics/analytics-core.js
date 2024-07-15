import { getMetadata } from '../../scripts/aem.js';
import {
  fetchAndStoreCountryCode,
  getCountryCode,
} from './solutions/country.js';
import { registerWaitForSolution, solutionReadyById } from './guards.js';

function getEnvType(hostname = window.location.hostname) {
  const fqdnToEnvType = {
    'www.sap.com': 'prod',
    'www-qa.sap.com': 'stage',
    'main--builder-prospect--sapudex.hlx.live': 'stage',
  };
  const suffixToEnvType = '--builder-prospect--sapudex.hlx.live';
  return fqdnToEnvType[hostname] || (hostname.includes(suffixToEnvType) ? 'stage' : 'dev');
}

function isCFEnabled() {
  const trackingFlag = getMetadata('tracking');
  return trackingFlag !== 'consentless only' && trackingFlag !== 'off'; // default: enabled
}

// disabled until #871 is resolved
const globalCLDisabled = true;

function isCLEnabled() {
  const trackingFlag = getMetadata('tracking');
  return (trackingFlag === 'consentless only' || trackingFlag === 'full') && !globalCLDisabled; // default: disabled
}

async function setCountry() {
  if (!getCountryCode()) {
    await fetchAndStoreCountryCode();
  }
}

async function scheduleSolutionsLoad() {
  registerWaitForSolution('cc', true);
  const delayMs = 20;
  window.setTimeout(() => {
    document.addEventListener('cc-initialized', () => {
      if (window.isConsentEnabled('omtrdc.net', 1) && window.isConsentEnabled('6sense.com', 1)) {
        registerWaitForSolution('6s');
        import('./solutions/6s.js');
      }
      if (window.isConsentEnabled('omtrdc.net', 1) && window.isConsentEnabled('ml314.com', 1)) {
        registerWaitForSolution('bb');
        import('./solutions/bb.js');
      }
      solutionReadyById('cc');
    });
    (async () => {
      await setCountry();
      import('./solutions/ta.js');
      import('./solutions/cc.js');
    })();
  }, delayMs);
}

export {
  scheduleSolutionsLoad,
  isCFEnabled,
  isCLEnabled,
  getEnvType,
};
