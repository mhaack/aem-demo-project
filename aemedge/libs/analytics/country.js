const prodHostnames = [
  'www.sap.com',
  'sap.com',
];

function getCountryCookieValue() {
  const match = document.cookie.match('country=([^;]+)');
  return match && match[1] !== '(NULL)' ? match[1] : null;
}

function storeCountryCodeInCookie(countryCode) {
  try {
    let cookieDomain;
    if (window.COUNTRY_COOKIE_DOMAIN) {
      cookieDomain = window.COUNTRY_COOKIE_DOMAIN;
    } else if (window.location.hostname.indexOf('.sap.com') >= 0) {
      cookieDomain = '.sap.com';
    } else if (window.location.hostname.indexOf('.sap.corp') >= 0) {
      cookieDomain = '.sap.corp';
    } else if (window.location.hostname.indexOf('.cloud.sap') >= 0) {
      cookieDomain = '.cloud.sap';
    } else if (window.location.hostname.indexOf('.sap.cn') >= 0) {
      cookieDomain = '.sap.cn';
    }
    let cookieValue = `country=${countryCode}; path=/;`;
    if (cookieDomain) {
      cookieValue += `domain=${cookieDomain};`;
    }
    document.cookie = cookieValue;
  } catch (ex) {
    window.console.log(`Error setting country: ${ex}`);
  }
}

async function fetchAndStoreCountryCode() { // sync
  try {
    const resp = await fetch(`https://${prodHostnames.includes(window.location.hostname) ? 'www.sap.com' : 'www-qa.sap.com'}/sap-session?fields=detectedCountry`);
    if (resp.ok) {
      const json = await resp.json();
      const countryCode = json.detectedCountry;
      if (countryCode) {
        storeCountryCodeInCookie(countryCode.toUpperCase());
      }
    }
  } catch (e) {
    window.console.log(`Error occurred: ${e}`);
  }
}

export {
  getCountryCookieValue,
  fetchAndStoreCountryCode,
};
