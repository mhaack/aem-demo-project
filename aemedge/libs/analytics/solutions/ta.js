import { getCountryCode, getRegionCode } from './country.js';

const prodHostnames = [
  'www.sap.com',
  'sap.com',
];

function createConsentBlackBar() {
  const div = document.createElement('div');
  div.id = 'consent_blackbar';
  div.style = 'position:fixed; bottom:0px; z-index:1000000; width:100%';
  div.dataset.sapUiPreserve = 'consent_blackbar';
  document.body.appendChild(div);
}

function loadTrustArcScript() {
  const { trustArcDiv } = window;
  let trustArcConsentDiv = 'teconsent';
  if (typeof (trustArcDiv) !== 'undefined' && trustArcDiv !== '') {
    trustArcConsentDiv = trustArcDiv;
  }

  const trustArcDomain = prodHostnames.includes(window.location.hostname) ? 'sap.com' : 'saptest.com';
  const countryCode = getCountryCode();
  const countryParam = countryCode ? `country=${countryCode}&` : '';
  const stateParam = (countryCode === 'US' && getRegionCode()) ? `state=${getRegionCode()}&` : '';
  const privacyPath = encodeURIComponent('https://www.sap.com/about/legal/privacy.html');
  const trustArcScriptURL = `https://consent.trustarc.com/notice?domain=${trustArcDomain}&c=${trustArcConsentDiv}&gtm=1&pcookie&js=nj&noticeType=bb&pn=1-0&${countryParam}${stateParam}privacypolicylink=${privacyPath}&text=true`

  const script = document.createElement('SCRIPT');
  script.async = true;
  script.src = trustArcScriptURL;
  document.head.appendChild(script);
}

function init() {
  try {
    const trustArcReferrer = sessionStorage.getItem('trustarc_referrer') || false;
    if (!trustArcReferrer) {
      sessionStorage.setItem('trustarc_referrer', JSON.stringify({ referrer: document.referrer, isConsumed: false }));
    }
  } catch (e) {
    // ignore
  }

  window.addEventListener('message', (event) => {
    if (event.origin.indexOf('consent-pref.trustarc.com') < 0) {
      return;
    }

    // console.log("******message....")
    // console.log(event);
    const data = JSON.parse(event.data);
    if (data && data.message === 'remove_iframe') {
      sessionStorage.setItem('referrerBeforeTrustArcReload', document.referrer);
      sessionStorage.setItem('referrerBeforeTrustArcReloadUpdateTime', new Date().getTime());
      window.location.reload();
    }
  });

  function addEventListener() {
    document.body.addEventListener('click', (event) => {
      if (event && event.target && event.target.id === 'truste-consent-button') {
        sessionStorage.setItem('referrerBeforeTrustArcReload', document.referrer);
        sessionStorage.setItem('referrerBeforeTrustArcReloadUpdateTime', new Date().getTime());
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
  }

  addEventListener();

}

createConsentBlackBar();
loadTrustArcScript();
init();
