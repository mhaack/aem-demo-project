import { getCountryCode } from '../country.js';

const settings = {
  'prodHostnames': [
    'www.sap.com',
    'sap.com'
  ]
};

function initConsentChecker() {
  if (!window.isConsentEnabled) {
    function resolveCountryCode(countryCode, isDebug) {
      var countryCodeFromPath = countryCode ? countryCode : getCountryCode();
      var host = getHostname();
      var isSapCom = getIsSapCom(host);
      var isCn = getIsCn(host);

      function getHostname() {
        var hostname = window.location.hostname;
        var isIFrame = window !== window.parent;

        if (isIFrame) {
          var searchParams = new URLSearchParams(window.location.search);

          if(searchParams.has('external-referer')) {
            var referer = searchParams.get('external-referer');

            hostname = new URL(referer).hostname;
          }
        }
        return hostname;
      }

      function getIsSapCom(hostname) {
        var testSapComHosts = /(www)-(dev-|test-|qa.|preprod.)(green|blue|cyan|hotpink)?/;
        var prodSapComHosts = /(www.sap.(com|cn))/;
        var dataPagePath = document.getElementsByTagName('html').item(0);
        var isSapDx = dataPagePath && dataPagePath.hasAttribute('data-page-path') && dataPagePath.getAttribute('data-page-path').startsWith('/content/sapdx');
        return isSapDx && (testSapComHosts.test(hostname) || prodSapComHosts.test(hostname));
      }

      function getIsCn(hostname) {
        var regexp = /[.-]cn(.|$)/;
        return regexp.test(hostname);
      }

      if (isSapCom && isCn) {
        countryCodeFromPath = 'CN';
      } else if (isSapCom) {
        var countries = [
          {'countrySite': 'africa', 'countryCode': countryCodeFromPath},
          {'countrySite': 'australia', 'countryCode': 'AU'},
          {'countrySite': 'austria', 'countryCode': 'AT'},
          {'countrySite': 'belgie', 'countryCode': 'BE'},
          {'countrySite': 'belgique', 'countryCode': 'BE'},
          {'countrySite': 'brazil', 'countryCode': 'BR'},
          {'countrySite': 'bulgaria', 'countryCode': 'BG'},
          {'countrySite': 'canada', 'countryCode': 'CA'},
          {'countrySite': 'canada-fr', 'countryCode': 'CA'},
          {'countrySite': 'china', 'countryCode': 'CN'},
          {'countrySite': 'cis', 'countryCode': countryCodeFromPath},
          {'countrySite': 'central-asia-caucasus', 'countryCode': countryCodeFromPath},
          {'countrySite': 'cz', 'countryCode': 'CZ'},
          {'countrySite': 'croatia', 'countryCode': 'HR'},
          {'countrySite': 'denmark', 'countryCode': 'DK'},
          {'countrySite': 'estonia', 'countryCode': 'EE'},
          {'countrySite': 'finland', 'countryCode': 'FI'},
          {'countrySite': 'france', 'countryCode': 'FR'},
          {'countrySite': 'germany', 'countryCode': 'DE'},
          {'countrySite': 'greece', 'countryCode': 'GR'},
          {'countrySite': 'hk', 'countryCode': 'HK'},
          {'countrySite': 'hungary', 'countryCode': 'HU'},
          {'countrySite': 'india', 'countryCode': 'IN'},
          {'countrySite': 'israel', 'countryCode': 'IL'},
          {'countrySite': 'italy', 'countryCode': 'IT'},
          {'countrySite': 'japan', 'countryCode': 'JP'},
          {'countrySite': 'korea', 'countryCode': 'KR'},
          {'countrySite': 'latinamerica', 'countryCode': countryCodeFromPath},
          {'countrySite': 'latvia', 'countryCode': 'LV'},
          {'countrySite': 'lithuania', 'countryCode': 'LT'},
          {'countrySite': 'mena', 'countryCode': countryCodeFromPath},
          {'countrySite': 'mena-ar', 'countryCode': countryCodeFromPath},
          {'countrySite': 'netherlands', 'countryCode': 'NL'},
          {'countrySite': 'norway', 'countryCode': 'NO'},
          {'countrySite': 'poland', 'countryCode': 'PL'},
          {'countrySite': 'portugal', 'countryCode': 'PT'},
          {'countrySite': 'romania', 'countryCode': 'RO'},
          {'countrySite': 'sea', 'countryCode': countryCodeFromPath},
          {'countrySite': 'sk', 'countryCode': 'SK'},
          {'countrySite': 'slovenia', 'countryCode': 'SI'},
          {'countrySite': 'spain', 'countryCode': 'ES'},
          {'countrySite': 'sweden', 'countryCode': 'SE'},
          {'countrySite': 'swiss', 'countryCode': 'CH'},
          {'countrySite': 'suisse', 'countryCode': 'CH'},
          {'countrySite': 'taiwan', 'countryCode': 'TW'},
          {'countrySite': 'turkey', 'countryCode': 'TR'},
          {'countrySite': 'uk', 'countryCode': 'GB'},
          {'countrySite': 'ukraine', 'countryCode': 'UA'},
          {'countrySite': 'westbalkans', 'countryCode': countryCodeFromPath}
        ];

        var countrySite = window.location.pathname.match(/^\/[\w-]+/);
        var countryFromPath = countries.find(function (country) {
          return countrySite && country.countrySite.toLowerCase() === countrySite[0].replace('/', '').toLowerCase();
        });

        countryCodeFromPath = countryFromPath ? countryFromPath.countryCode : 'US';
      }

      return countryCodeFromPath;
    }

    // function getCountryCodeByGeolocation is superseded by fetchAndStoreCountryCode (see country.js)

    function isCPRA() {
      var CPRA_COUNTRIES = {'US': 1, 'MA': 1, 'MX': 1, 'RS': 1, 'SG': 1, 'ZA': 1};
      var countryCode = resolveCountryCode();

      return countryCode in CPRA_COUNTRIES;
    }

    function isZeroConsentCountry(countryCode) {
      var ZERO_CONSENT_COUNTRIES = {
        'AE': 1, 'AR': 1, 'AT': 1, 'AX': 1, 'AZ': 1, 'BE': 1, 'BG': 1, 'BL': 1, 'BR': 1, 'CA': 1, 'CH': 1, 'CO': 1, 'CR': 1, 'CY': 1, 'CZ': 1,
        'DE': 1, 'DK': 1, 'EE': 1, 'ES': 1, 'FI': 1, 'FR': 1, 'GB': 1, 'GF': 1, 'GP': 1, 'GR': 1, 'HR': 1, 'HU': 1,
        'IE': 1, 'IL': 1, 'IS': 1, 'IT': 1, 'JP': 1, 'KE': 1, 'KR': 1, 'LI': 1, 'LT': 1, 'LU': 1, 'LV': 1, 'MA': 1,
        'MF': 1, 'MQ': 1, 'MT': 1, 'MX': 1, 'MY': 1, 'NG': 1, 'NL': 1, 'NO': 1, 'PA': 1, 'PE': 1, 'PH': 1, 'PL': 1, 'PT': 1, 'QA': 1,
        'RE': 1, 'RO': 1, 'RS': 1, 'SA': 1, 'SE': 1, 'SG': 1, 'SI': 1, 'SK': 1, 'TF': 1, 'TH': 1, 'TR': 1, 'US': 1,
        'VN': 1, 'ZA': 1, '(NULL)': 1
      };

      return countryCode in ZERO_CONSENT_COUNTRIES;
    }

    function isConsentTrack() {
      return !document.cookie.match('notice_gdpr_prefs=([^;]+)');
    }

    function isCookieBannerOpen() {
      var isSettingsDialogClosed = document.querySelectorAll('iframe[src^="https://consent-pref.trustarc.com"]').length === 0;

      return window.truste && isConsentTrack() && isSettingsDialogClosed;
    }

    if (isCPRA()) {
      if (isConsentTrack()) {
        document.addEventListener('click', function (event) {
          if (event.target.matches('a:not([href^="#"])') && isCookieBannerOpen()) {
            window.truste.util.createPreferenceFromCookieValue('0,1,2');
            window.setTimeout(function () {
              location.reload();
            }, 500);
          }
        });
      }

      document.addEventListener('cc-initialized',function () {
        window.setTimeout(function () {
          if (isCookieBannerOpen()) {
            window.truste.util.createPreferenceFromCookieValue('0,1,2');
            sessionStorage.setItem('referrerBeforeTrustArcReload', document.referrer);
            sessionStorage.setItem('referrerBeforeTrustArcReloadUpdateTime', new Date().getTime());
            location.reload();
          }
        }, 8000);
      });
    }

    function getCookieValue(name){
      const regex = new RegExp(`(^| )${name}=([^;]+)`);
      const match = document.cookie.match(regex);
      return match ? match[2] : null;
    }

    window.isConsentEnabled = (function (cookie, trustArcPreferenceCookie, storageString, countryCode, isDebug) {
      countryCode = (countryCode || "").toUpperCase();
      window.isUserFromChina = countryCode === 'CN';
      countryCode = resolveCountryCode(countryCode, isDebug);
      trustArcPreferenceCookie = trustArcPreferenceCookie || '';
      var hasTrustArcLocationCookie = countryCode || cookie && cookie.match(/\bnotice_behavior=/);
      var isTrustArcUserFromZeroConsentCountry = countryCode
        ? (countryCode.indexOf('NULL') !== -1 || isZeroConsentCountry(countryCode))
        : (!cookie || cookie.match(/\bnotice_behavior=\bexpressed\b/));
      var trustArcStorageKeys = ['Required Cookies', 'Functional Cookies', 'Advertising Cookies'];
      const trustArcNoDomainExists = -1;
      const trustArcOptedOut = 0;
      const trustArcOptedIn = 1;
      var trustArcStorage;

      try {
        trustArcStorage = JSON.parse(storageString);
      } catch (ex) {
        console.log(ex);
        trustArcStorage = undefined;
      }

      function getGranularTrustArcPermission(domain, allowedRuleLevel) {
        if (!trustArcStorage || !allowedRuleLevel || allowedRuleLevel < 0 || allowedRuleLevel >= trustArcStorageKeys.length)
          return trustArcNoDomainExists;

        var optout_domains;
        for (var category in trustArcStorage) {
          if (trustArcStorage[category].value === allowedRuleLevel.toString()) {
            optout_domains = trustArcStorage[category].domains;
            break;
          }
        }

        if (!optout_domains)
          return trustArcNoDomainExists;

        var perm = optout_domains[domain];
        if (!perm)
          return trustArcNoDomainExists;

        if (perm === "0") { //opted out
          return trustArcOptedOut;
        } else {
          return trustArcOptedIn;
        }
      }

      return function (domain, allowedRuleLevel) {
        if (allowedRuleLevel === 0) {
          return true;
        }

        if (!hasTrustArcLocationCookie) {
          return false;
        }

        //if notice_gdpr_prefs cookie is not set, could happen initially
        if (!trustArcPreferenceCookie) {
          return !isTrustArcUserFromZeroConsentCountry;
        }

        var perm = getGranularTrustArcPermission(domain, allowedRuleLevel);
        if (perm === trustArcOptedIn) {
          return true;
        } else if (perm === trustArcOptedOut) {
          return false;
        }

        return trustArcPreferenceCookie.indexOf(allowedRuleLevel) >= 0;
      }
    })(document.cookie,
      getCookieValue("notice_gdpr_prefs"),
      localStorage.getItem("optout_domains"),
      getCookieValue("country"),
      false);
  }

  // notify after initialization
  if (window.isConsentEnabled) {
    setTimeout(() => { document.dispatchEvent(new Event("cc-initialized")); }, 50);
  }
}

initConsentChecker();
