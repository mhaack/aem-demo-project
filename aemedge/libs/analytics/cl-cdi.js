import { getEnvType } from './analytics-core.js';
import { getAnonvid } from './cl-aa.js';

function getEndpointURL() {
  const prefix = 'https://stage-eddl.cdi.services.sap.com/v1/events';
  const url = {
    dev: `${prefix}`,
    stage: `${prefix}`,
    prod: null,
  };
  const envType = getEnvType();
  if (envType && url[envType]) {
    if (envType !== 'dev' || ((new URLSearchParams(window.location.search)).get('cdi')) != null) {
      return url[envType];
    }
  }
  return null;
}

function CDISupportedEventNames() {
  return ['pageView', 'globalDL'];
}

function CDIECID() {
  return getAnonvid();
}

function CDIUniqueEventID() {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    /* eslint no-bitwise: ["error", { "allow": ["|"] }] */
    const r = (dt + Math.random() * 16) % 16 | 0;
    /* eslint no-bitwise: ["error", { "allow": ["|", "&"] }] */
    dt = Math.floor(dt / 16); return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
  });
}

function CDICustomerConsentClassification() {
  // !consentless! isConsentEnabled(eddl.cdi.services.sap.com', 1).toString()
  return 'false';
}

function CDIEDDLSchema(event) {
  const eventSchema = {
    pageView: 'https://sap.ies.cxs.eddl.pageview.v.0.1.json',
    globalDL: 'https://sap.ies.cxs.eddl.globaldl.v.0.1.json',
  };
  return eventSchema[event];
}

function CDIEDDLType(event) {
  const eventType = {
    pageView: 'sap.ies.cxs.eddl.pageview',
    globalDL: 'sap.ies.cxs.eddl.globaldl',
  };
  return eventType[event];
}

function sendCLCDIEvent(eventData) {
  try {
    const eventName = eventData.event;
    if (CDISupportedEventNames().includes(eventName)) {
      const requestURL = getEndpointURL();
      if (requestURL) {
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const payload = JSON.stringify({
          correlationid: CDIECID(),
          customerconsentclassification: CDICustomerConsentClassification(),
          data: eventData,
          datacontenttype: 'application/json',
          dataschema: CDIEDDLSchema(eventName),
          eventgenerationtype: 'actual',
          id: CDIUniqueEventID(),
          source: 'testdata.generator',
          specversion: '1.0',
          type: CDIEDDLType(eventName),
        });

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: payload,
          redirect: 'follow',
        };

        fetch(requestURL, requestOptions)
          .then((response) => response.text())
          .catch((error) => window.console.log(`Error sending event ${eventName}: ${error}`));
      }
    }
  } catch (error) {
    window.console.log('error', `Error sending event data to endpoint: ${error}`);
  }
}

function registerDLEventHandler() {
  document.addEventListener('dl:event', (dlEvent) => {
    if (dlEvent.data) {
      sendCLCDIEvent(dlEvent.data);
    }
  });
}

registerDLEventHandler();

export {
  // eslint-disable-next-line import/prefer-default-export
  sendCLCDIEvent,
};
