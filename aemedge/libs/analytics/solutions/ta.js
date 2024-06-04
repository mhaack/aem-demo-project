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

  // const host = window.location.hostname.toLocaleLowerCase();
  const privacyPath = encodeURIComponent('https://www.sap.com/about/legal/privacy.html');
  const trustArcScriptURL = `https://consent.trustarc.com/notice?domain=sap.com&c=${trustArcConsentDiv}&gtm=1&js=nj&noticeType=bb&text=true&pn=1-0&privacypolicylink=${privacyPath}`

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
