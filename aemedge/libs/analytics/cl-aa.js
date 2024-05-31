import { getEnvType } from './analytics-core.js';

function getEndpointURL() {
  const prefix = 'https://smetrics.sap.com/b/ss/sapnewsdev';
  const url = {
    dev: `${prefix}`,
    stage: `${prefix}`,
    prod: null,
  };
  const envType = getEnvType();
  if (envType && url[envType]) {
    if (envType !== 'dev' || ((new URLSearchParams(window.location.search)).get('tr')) != null) {
      return `${url[envType]}/1/s${Math.abs(Math.floor(Math.random() * 100000000000))}`;
    }
  }
  return null;
}

function getAnonvid() {
  return Math.abs(Math.floor(Math.random() * 1000000000000));
}

function timestamp() {
  const now = new Date();
  const year = now.getYear();
  return `${now.getDate()}/${now.getMonth()}/${year < 1900 ? year + 1900 : year} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDay()} ${now.getTimezoneOffset()}`;
}

// Ref: https://experienceleague.adobe.com/en/docs/analytics/implementation/validate/query-parameters
function mapParams(dlState) {
  const params = new Map();
  params.set('vid', `${getAnonvid()}`);
  params.set('ce', 'UTF-8');
  params.set('cc', 'USD');
  params.set('ch', dlState.page.section);
  params.set('server', 'sap');
  params.set('pageName', `${dlState.site.name}:${dlState.page.name}`);
  const pageURL = window.location.href;
  params.set('g', pageURL);
  params.set('t', timestamp());
  params.set('v1', `${dlState.site.name}:${dlState.page.country}`);
  params.set('v2', dlState.page.language);
  params.set('v3', dlState.page.section);
  params.set('v4', navigator.userAgent);
  params.set('v7', window.location.hostname);
  params.set('v20', `${dlState.site.name}:${dlState.page.name}`);
  params.set('v75', pageURL);
  params.set('v128', document.title);
  return params;
}

function sendCLAABeacon(dl = window.adobeDataLayer) {
  try {
    const requestURL = getEndpointURL();
    if (requestURL) {
      const dlState = dl.getState();
      dlState.user.loginStatus = 'no';
      dlState.site.name = `${dlState.site.name}`; // prefix site name
      let url = `${requestURL}?AQB=1`;
      mapParams(dlState).forEach((value, key) => {
        url += `&${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      });
      url += '&AQE=1';
      navigator.sendBeacon(url);
    }
  } catch (error) {
    window.console.log('error', `Error sending data to endpoint: ${error}`);
  }
}

function registerDLPageViewEventHandler() {
  document.addEventListener('dl:event', (dlEvent) => {
    if (dlEvent.data && dlEvent.data.event === 'pageView') {
      sendCLAABeacon();
    }
  });
}

registerDLPageViewEventHandler();

export {
  getAnonvid,
  sendCLAABeacon,
};
