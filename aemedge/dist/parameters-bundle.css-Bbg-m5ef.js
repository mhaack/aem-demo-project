var Kt = {}, Yt = Kt.hasOwnProperty, oo = Kt.toString, Jt = Yt.toString, _o = Jt.call(Object), mt = function(t) {
  var e, r;
  return !t || oo.call(t) !== "[object Object]" ? !1 : (e = Object.getPrototypeOf(t), e ? (r = Yt.call(e, "constructor") && e.constructor, typeof r == "function" && Jt.call(r) === _o) : !0);
}, ao = /* @__PURE__ */ Object.create(null), Qt = function(t, e, r, o) {
  var _, a, i, n, s, d, u = arguments[2] || {}, l = 3, p = arguments.length, c = arguments[0] || !1, v = arguments[1] ? void 0 : ao;
  for (typeof u != "object" && typeof u != "function" && (u = {}); l < p; l++)
    if ((s = arguments[l]) != null)
      for (n in s)
        _ = u[n], i = s[n], !(n === "__proto__" || u === i) && (c && i && (mt(i) || (a = Array.isArray(i))) ? (a ? (a = !1, d = _ && Array.isArray(_) ? _ : []) : d = _ && mt(_) ? _ : {}, u[n] = Qt(c, arguments[1], d, i)) : i !== v && (u[n] = i));
  return u;
};
const dt = function(t, e) {
  return Qt(!0, !1, ...arguments);
}, io = () => new Promise((t) => {
  document.body ? t() : document.addEventListener("DOMContentLoaded", () => {
    t();
  });
});
class T {
  constructor() {
    this._eventRegistry = /* @__PURE__ */ new Map();
  }
  attachEvent(e, r) {
    const o = this._eventRegistry, _ = o.get(e);
    if (!Array.isArray(_)) {
      o.set(e, [r]);
      return;
    }
    _.includes(r) || _.push(r);
  }
  detachEvent(e, r) {
    const o = this._eventRegistry, _ = o.get(e);
    if (!_)
      return;
    const a = _.indexOf(r);
    a !== -1 && _.splice(a, 1), _.length === 0 && o.delete(e);
  }
  /**
   * Fires an event and returns the results of all event listeners as an array.
   *
   * @param eventName the event to fire
   * @param data optional data to pass to each event listener
   * @returns {Array} an array with the results of all event listeners
   */
  fireEvent(e, r) {
    const _ = this._eventRegistry.get(e);
    return _ ? _.map((a) => a.call(this, r)) : [];
  }
  /**
   * Fires an event and returns a promise that will resolve once all listeners have resolved.
   *
   * @param eventName the event to fire
   * @param data optional data to pass to each event listener
   * @returns {Promise} a promise that will resolve when all listeners have resolved
   */
  fireEventAsync(e, r) {
    return Promise.all(this.fireEvent(e, r));
  }
  isHandlerAttached(e, r) {
    const _ = this._eventRegistry.get(e);
    return _ ? _.includes(r) : !1;
  }
  hasListeners(e) {
    return !!this._eventRegistry.get(e);
  }
}
const no = (t, e) => {
  const r = document.createElement("style");
  return r.type = "text/css", e && Object.entries(e).forEach((o) => r.setAttribute(...o)), r.textContent = t, document.head.appendChild(r), r;
}, so = (t, e) => {
  const r = document.createElement("link");
  return r.type = "text/css", r.rel = "stylesheet", e && Object.entries(e).forEach((o) => r.setAttribute(...o)), r.href = t, document.head.appendChild(r), new Promise((o) => {
    r.addEventListener("load", o), r.addEventListener("error", o);
  });
}, b = typeof document > "u", h = {
  get userAgent() {
    return b ? "" : navigator.userAgent;
  },
  get touch() {
    return b ? !1 : "ontouchstart" in window || navigator.maxTouchPoints > 0;
  },
  get ie() {
    return b ? !1 : /(msie|trident)/i.test(h.userAgent);
  },
  get chrome() {
    return b ? !1 : !h.ie && /(Chrome|CriOS)/.test(h.userAgent);
  },
  get firefox() {
    return b ? !1 : /Firefox/.test(h.userAgent);
  },
  get safari() {
    return b ? !1 : !h.ie && !h.chrome && /(Version|PhantomJS)\/(\d+\.\d+).*Safari/.test(h.userAgent);
  },
  get webkit() {
    return b ? !1 : !h.ie && /webkit/.test(h.userAgent);
  },
  get windows() {
    return b ? !1 : navigator.platform.indexOf("Win") !== -1;
  },
  get macOS() {
    return b ? !1 : !!navigator.userAgent.match(/Macintosh|Mac OS X/i);
  },
  get iOS() {
    return b ? !1 : !!navigator.platform.match(/iPhone|iPad|iPod/) || !!(h.userAgent.match(/Mac/) && "ontouchend" in document);
  },
  get android() {
    return b ? !1 : !h.windows && /Android/.test(h.userAgent);
  },
  get androidPhone() {
    return b ? !1 : h.android && /(?=android)(?=.*mobile)/i.test(h.userAgent);
  },
  get ipad() {
    return b ? !1 : /ipad/i.test(h.userAgent) || /Macintosh/i.test(h.userAgent) && "ontouchend" in document;
  }
};
let Te, Fe, I;
const ct = () => {
  if (b || !h.windows)
    return !1;
  if (Te === void 0) {
    const t = h.userAgent.match(/Windows NT (\d+).(\d)/);
    Te = t ? parseFloat(t[1]) : 0;
  }
  return Te >= 8;
}, co = () => {
  if (b || !h.webkit)
    return !1;
  if (Fe === void 0) {
    const t = h.userAgent.match(/(webkit)[ /]([\w.]+)/);
    Fe = t ? parseFloat(t[1]) : 0;
  }
  return Fe >= 537.1;
}, er = () => {
  if (b)
    return !1;
  if (I === void 0) {
    if (h.ipad) {
      I = !0;
      return;
    }
    if (h.touch) {
      if (ct()) {
        I = !0;
        return;
      }
      if (h.chrome && h.android) {
        I = !/Mobile Safari\/[.0-9]+/.test(h.userAgent);
        return;
      }
      let t = window.devicePixelRatio ? window.devicePixelRatio : 1;
      h.android && co() && (t = 1), I = Math.min(window.screen.width / t, window.screen.height / t) >= 600;
      return;
    }
    I = h.ie && h.userAgent.indexOf("Touch") !== -1 || h.android && !h.androidPhone;
  }
}, oe = () => h.safari, tr = () => (er(), (h.touch || ct()) && I), lo = () => (er(), h.touch && !I), uo = () => b ? !1 : !tr() && !lo() || ct(), ti = () => tr() && uo(), po = {
  version: "1.24.0",
  major: 1,
  minor: 24,
  patch: 0,
  suffix: "",
  isNext: !1,
  buildTime: 1712256366
}, rr = (t, e = document.body, r) => {
  let o = document.querySelector(t);
  return o || (o = r ? r() : document.createElement(t), e.insertBefore(o, e.firstChild));
}, vo = () => {
  const t = document.createElement("meta");
  return t.setAttribute("name", "ui5-shared-resources"), t.setAttribute("content", ""), t;
}, ho = () => typeof document > "u" ? null : rr('meta[name="ui5-shared-resources"]', document.head, vo), W = (t, e) => {
  const r = t.split(".");
  let o = ho();
  if (!o)
    return e;
  for (let _ = 0; _ < r.length; _++) {
    const a = r[_], i = _ === r.length - 1;
    Object.prototype.hasOwnProperty.call(o, a) || (o[a] = i ? e : {}), o = o[a];
  }
  return o;
};
let ue, mo = "";
const Ee = /* @__PURE__ */ new Map(), Y = W("Runtimes", []), fo = () => {
  if (ue === void 0) {
    ue = Y.length;
    const t = po;
    Y.push({
      ...t,
      alias: mo,
      description: `Runtime ${ue} - ver ${t.version}`
    });
  }
}, j = () => ue, or = (t, e) => {
  const r = `${t},${e}`;
  if (Ee.has(r))
    return Ee.get(r);
  const o = Y[t], _ = Y[e];
  if (!o || !_)
    throw new Error("Invalid runtime index supplied");
  if (o.isNext || _.isNext)
    return o.buildTime - _.buildTime;
  const a = o.major - _.major;
  if (a)
    return a;
  const i = o.minor - _.minor;
  if (i)
    return i;
  const n = o.patch - _.patch;
  if (n)
    return n;
  const d = new Intl.Collator(void 0, { numeric: !0, sensitivity: "base" }).compare(o.suffix, _.suffix);
  return Ee.set(r, d), d;
}, go = () => Y, bo = typeof document > "u", ke = (t, e) => e ? `${t}|${e}` : t, ft = (t) => t === void 0 ? !0 : or(j(), parseInt(t)) === 1, we = (t, e, r = "", o) => {
  const _ = typeof t == "string" ? t : t.content, a = j();
  if (document.adoptedStyleSheets && !oe()) {
    const i = new CSSStyleSheet();
    i.replaceSync(_), i._ui5StyleId = ke(e, r), o && (i._ui5RuntimeIndex = a, i._ui5Theme = o), document.adoptedStyleSheets = [...document.adoptedStyleSheets, i];
  } else {
    const i = {};
    i[e] = r, o && (i["data-ui5-runtime-index"] = a, i["data-ui5-theme"] = o), no(_, i);
  }
}, Co = (t, e, r = "", o) => {
  const _ = typeof t == "string" ? t : t.content, a = j();
  if (document.adoptedStyleSheets && !oe()) {
    const i = document.adoptedStyleSheets.find((n) => n._ui5StyleId === ke(e, r));
    if (!i)
      return;
    if (!o)
      i.replaceSync(_ || "");
    else {
      const n = i._ui5RuntimeIndex;
      (i._ui5Theme !== o || ft(n)) && (i.replaceSync(_ || ""), i._ui5RuntimeIndex = String(a), i._ui5Theme = o);
    }
  } else {
    const i = document.querySelector(`head>style[${e}="${r}"]`);
    if (!i)
      return;
    if (!o)
      i.textContent = _ || "";
    else {
      const n = i.getAttribute("data-ui5-runtime-index") || void 0;
      (i.getAttribute("data-ui5-theme") !== o || ft(n)) && (i.textContent = _ || "", i.setAttribute("data-ui5-runtime-index", String(a)), i.setAttribute("data-ui5-theme", o));
    }
  }
}, ye = (t, e = "") => {
  if (bo)
    return !0;
  const r = document.querySelector(`head>style[${t}="${e}"]`);
  return document.adoptedStyleSheets && !oe() ? !!r || !!document.adoptedStyleSheets.find((o) => o._ui5StyleId === ke(t, e)) : !!r;
}, Bo = (t, e = "") => {
  var r;
  if (document.adoptedStyleSheets && !oe())
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter((o) => o._ui5StyleId !== ke(t, e));
  else {
    const o = document.querySelector(`head > style[${t}="${e}"]`);
    (r = o == null ? void 0 : o.parentElement) == null || r.removeChild(o);
  }
}, _r = (t, e, r = "", o) => {
  ye(e, r) ? Co(t, e, r, o) : we(t, e, r, o);
}, ko = (t, e) => {
  if (t === void 0)
    return e;
  if (e === void 0)
    return t;
  const r = typeof e == "string" ? e : e.content;
  return typeof t == "string" ? `${t} ${r}` : {
    content: `${t.content} ${r}`,
    packageName: t.packageName,
    fileName: t.fileName
  };
}, wo = /* @__PURE__ */ new Map(), x = (t) => wo.get(t), yo = {
  packageName: "@ui5/webcomponents-base",
  fileName: "FontFace.css",
  content: `@font-face{font-family:"72";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),local("72");unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular-full.woff2?ui5-webcomponents) format("woff2"),local('72-full')}@font-face{font-family:"72";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Bold';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Boldfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Light';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light.woff2?ui5-webcomponents) format("woff2"),local('72-Light');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Lightfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72Mono';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular.woff2?ui5-webcomponents) format('woff2'),local('72Mono');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Monofull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:'72Mono-Bold';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold.woff2?ui5-webcomponents) format('woff2'),local('72Mono-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Mono-Boldfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72Black";font-style:bold;font-weight:900;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff2?ui5-webcomponents) format("woff2"),local('72Black');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Blackfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72-SemiboldDuplex";src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-SemiboldDuplex.woff2?ui5-webcomponents) format("woff2"),local('72-SemiboldDuplex');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}`
}, xo = {
  packageName: "@ui5/webcomponents-base",
  fileName: "OverrideFontFace.css",
  content: "@font-face{font-family:'72override';unicode-range:U+0102-0103,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EB7,U+1EB8-1EC7,U+1EC8-1ECB,U+1ECC-1EE3,U+1EE4-1EF1,U+1EF4-1EF7;src:local('Arial'),local('Helvetica'),local('sans-serif')}"
}, So = () => {
  const t = x("OpenUI5Support");
  (!t || !t.isOpenUI5Detected()) && Ao(), Io();
}, Ao = () => {
  ye("data-ui5-font-face") || we(yo, "data-ui5-font-face");
}, Io = () => {
  ye("data-ui5-font-face-override") || we(xo, "data-ui5-font-face-override");
}, To = {
  packageName: "@ui5/webcomponents-base",
  fileName: "SystemCSSVars.css",
  content: ":root{--_ui5_content_density:cozy}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact}"
}, Fo = () => {
  ye("data-ui5-system-css-vars") || we(To, "data-ui5-system-css-vars");
}, xe = { themes: { default: "sap_horizon", all: ["sap_fiori_3", "sap_fiori_3_dark", "sap_belize", "sap_belize_hcb", "sap_belize_hcw", "sap_fiori_3_hcb", "sap_fiori_3_hcw", "sap_horizon", "sap_horizon_dark", "sap_horizon_hcb", "sap_horizon_hcw", "sap_horizon_exp", "sap_horizon_dark_exp", "sap_horizon_hcb_exp", "sap_horizon_hcw_exp"] }, languages: { default: "en", all: ["ar", "bg", "ca", "cnr", "cs", "cy", "da", "de", "el", "en", "en_GB", "en_US_sappsd", "en_US_saprigi", "en_US_saptrc", "es", "es_MX", "et", "fi", "fr", "fr_CA", "hi", "hr", "hu", "in", "it", "iw", "ja", "kk", "ko", "lt", "lv", "mk", "ms", "nl", "no", "pl", "pt_PT", "pt", "ro", "ru", "sh", "sk", "sl", "sr", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_TW"] }, locales: { default: "en", all: ["ar", "ar_EG", "ar_SA", "bg", "ca", "cnr", "cs", "da", "de", "de_AT", "de_CH", "el", "el_CY", "en", "en_AU", "en_GB", "en_HK", "en_IE", "en_IN", "en_NZ", "en_PG", "en_SG", "en_ZA", "es", "es_AR", "es_BO", "es_CL", "es_CO", "es_MX", "es_PE", "es_UY", "es_VE", "et", "fa", "fi", "fr", "fr_BE", "fr_CA", "fr_CH", "fr_LU", "he", "hi", "hr", "hu", "id", "it", "it_CH", "ja", "kk", "ko", "lt", "lv", "ms", "mk", "nb", "nl", "nl_BE", "pl", "pt", "pt_PT", "ro", "ru", "ru_UA", "sk", "sl", "sr", "sr_Latn", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_HK", "zh_SG", "zh_TW"] } }, me = xe.themes.default, Eo = xe.themes.all, J = xe.languages.default, O = xe.locales.default, Ho = (t) => {
  const e = document.querySelector(`META[name="${t}"]`);
  return e && e.getAttribute("content");
}, Lo = (t) => {
  const e = Ho("sap-allowedThemeOrigins");
  return e && e.split(",").some((r) => r === "*" || t === r.trim());
}, Po = (t, e) => {
  const r = new URL(t).pathname;
  return new URL(r, e).toString();
}, Uo = (t) => {
  let e;
  try {
    if (t.startsWith(".") || t.startsWith("/"))
      e = new URL(t, window.location.href).toString();
    else {
      const r = new URL(t), o = r.origin;
      o && Lo(o) ? e = r.toString() : e = Po(r.toString(), window.location.href);
    }
    return e.endsWith("/") || (e = `${e}/`), `${e}UI5/`;
  } catch {
  }
};
var Je;
(function(t) {
  t.Full = "full", t.Basic = "basic", t.Minimal = "minimal", t.None = "none";
})(Je || (Je = {}));
const $o = Je;
let gt = !1, k = {
  animationMode: $o.Full,
  theme: me,
  themeRoot: void 0,
  rtl: void 0,
  language: void 0,
  timezone: void 0,
  calendarType: void 0,
  secondaryCalendarType: void 0,
  noConflict: !1,
  formatSettings: {},
  fetchDefaultLanguage: !1
};
const Mo = () => (_e(), k.theme), No = () => (_e(), k.themeRoot), Ro = () => (_e(), k.language), Oo = () => (_e(), k.fetchDefaultLanguage), Do = () => (_e(), k.noConflict), fe = /* @__PURE__ */ new Map();
fe.set("true", !0);
fe.set("false", !1);
const zo = () => {
  const t = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']");
  let e;
  if (t) {
    try {
      e = JSON.parse(t.innerHTML);
    } catch {
      console.warn("Incorrect data-sap-ui-config format. Please use JSON");
    }
    e && (k = dt(k, e));
  }
}, Wo = () => {
  const t = new URLSearchParams(window.location.search);
  t.forEach((e, r) => {
    const o = r.split("sap-").length;
    o === 0 || o === r.split("sap-ui-").length || bt(r, e, "sap");
  }), t.forEach((e, r) => {
    r.startsWith("sap-ui") && bt(r, e, "sap-ui");
  });
}, jo = (t) => {
  const e = t.split("@")[1];
  return Uo(e);
}, Vo = (t, e) => t === "theme" && e.includes("@") ? e.split("@")[0] : e, bt = (t, e, r) => {
  const o = e.toLowerCase(), _ = t.split(`${r}-`)[1];
  fe.has(e) && (e = fe.get(o)), _ === "theme" ? (k.theme = Vo(_, e), e && e.includes("@") && (k.themeRoot = jo(e))) : k[_] = e;
}, Go = () => {
  const t = x("OpenUI5Support");
  if (!t || !t.isOpenUI5Detected())
    return;
  const e = t.getConfigurationSettingsObject();
  k = dt(k, e);
}, _e = () => {
  typeof document > "u" || gt || (zo(), Wo(), Go(), gt = !0);
}, Ct = 10;
class qo {
  constructor() {
    this.list = [], this.lookup = /* @__PURE__ */ new Set();
  }
  add(e) {
    this.lookup.has(e) || (this.list.push(e), this.lookup.add(e));
  }
  remove(e) {
    this.lookup.has(e) && (this.list = this.list.filter((r) => r !== e), this.lookup.delete(e));
  }
  shift() {
    const e = this.list.shift();
    if (e)
      return this.lookup.delete(e), e;
  }
  isEmpty() {
    return this.list.length === 0;
  }
  isAdded(e) {
    return this.lookup.has(e);
  }
  /**
   * Processes the whole queue by executing the callback on each component,
   * while also imposing restrictions on how many times a component may be processed.
   *
   * @param callback - function with one argument (the web component to be processed)
   */
  process(e) {
    let r;
    const o = /* @__PURE__ */ new Map();
    for (r = this.shift(); r; ) {
      const _ = o.get(r) || 0;
      if (_ > Ct)
        throw new Error(`Web component processed too many times this task, max allowed is: ${Ct}`);
      e(r), o.set(r, _ + 1), r = this.shift();
    }
  }
}
const ar = W("Tags", /* @__PURE__ */ new Map()), lt = /* @__PURE__ */ new Set();
let L = /* @__PURE__ */ new Map(), He;
const ir = -1, Xo = (t) => {
  lt.add(t), ar.set(t, j());
}, Zo = (t) => lt.has(t), Ko = () => [...lt.values()], Yo = (t) => {
  let e = ar.get(t);
  e === void 0 && (e = ir), L.has(e) || L.set(e, /* @__PURE__ */ new Set()), L.get(e).add(t), He || (He = setTimeout(() => {
    Jo(), L = /* @__PURE__ */ new Map(), He = void 0;
  }, 1e3));
}, Jo = () => {
  const t = go(), e = j(), r = t[e];
  let o = "Multiple UI5 Web Components instances detected.";
  t.length > 1 && (o = `${o}
Loading order (versions before 1.1.0 not listed): ${t.map((_) => `
${_.description}`).join("")}`), [...L.keys()].forEach((_) => {
    let a, i;
    _ === ir ? (a = 1, i = {
      description: "Older unknown runtime"
    }) : (a = or(e, _), i = t[_]);
    let n;
    a > 0 ? n = "an older" : a < 0 ? n = "a newer" : n = "the same", o = `${o}

"${r.description}" failed to define ${L.get(_).size} tag(s) as they were defined by a runtime of ${n} version "${i.description}": ${[...L.get(_)].sort().join(", ")}.`, a > 0 ? o = `${o}
WARNING! If your code uses features of the above web components, unavailable in ${i.description}, it might not work as expected!` : o = `${o}
Since the above web components were defined by the same or newer version runtime, they should be compatible with your code.`;
  }), o = `${o}

To prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/main/docs/2-advanced/03-scoping.md.`, console.warn(o);
}, nr = /* @__PURE__ */ new Set(), Qo = (t) => {
  nr.add(t);
}, e_ = (t) => nr.has(t), ut = /* @__PURE__ */ new Set(), t_ = new T(), D = new qo();
let N, pe, Le, de;
const sr = async (t) => {
  D.add(t), await o_();
}, dr = (t) => {
  t_.fireEvent("beforeComponentRender", t), ut.add(t), t._render();
}, r_ = (t) => {
  D.remove(t), ut.delete(t);
}, o_ = async () => {
  de || (de = new Promise((t) => {
    window.requestAnimationFrame(() => {
      D.process(dr), de = null, t(), Le || (Le = setTimeout(() => {
        Le = void 0, D.isEmpty() && i_();
      }, 200));
    });
  })), await de;
}, __ = () => N || (N = new Promise((t) => {
  pe = t, window.requestAnimationFrame(() => {
    D.isEmpty() && (N = void 0, t());
  });
}), N), a_ = () => {
  const t = Ko().map((e) => customElements.whenDefined(e));
  return Promise.all(t);
}, cr = async () => {
  await a_(), await __();
}, i_ = () => {
  D.isEmpty() && pe && (pe(), pe = void 0, N = void 0);
}, n_ = async (t) => {
  ut.forEach((e) => {
    const r = e.constructor, o = r.getMetadata().getTag(), _ = e_(r), a = r.getMetadata().isLanguageAware(), i = r.getMetadata().isThemeAware();
    (!t || t.tag === o || t.rtlAware && _ || t.languageAware && a || t.themeAware && i) && sr(e);
  }), await cr();
}, lr = new T(), ur = "themeRegistered", s_ = (t) => {
  lr.attachEvent(ur, t);
}, d_ = (t) => lr.fireEvent(ur, t), Bt = /* @__PURE__ */ new Map(), pr = /* @__PURE__ */ new Map(), c_ = /* @__PURE__ */ new Map(), vr = /* @__PURE__ */ new Set(), ge = /* @__PURE__ */ new Set(), hr = (t, e, r) => {
  pr.set(`${t}/${e}`, r), vr.add(t), ge.add(e), d_(e);
}, mr = async (t, e, r) => {
  const o = `${t}_${e}_${r || ""}`, _ = Bt.get(o);
  if (_ !== void 0)
    return _;
  if (!ge.has(e)) {
    const s = [...ge.values()].join(", ");
    return console.warn(`You have requested a non-registered theme ${e} - falling back to ${me}. Registered themes are: ${s}`), Pe(t, me);
  }
  const [a, i] = await Promise.all([
    Pe(t, e),
    r ? Pe(t, r, !0) : void 0
  ]), n = ko(a, i);
  return n && Bt.set(o, n), n;
}, Pe = async (t, e, r = !1) => {
  const _ = (r ? c_ : pr).get(`${t}/${e}`);
  if (!_) {
    r || console.error(`Theme [${e}] not registered for package [${t}]`);
    return;
  }
  let a;
  try {
    a = await _(e);
  } catch (n) {
    console.error(t, n.message);
    return;
  }
  return a._ || a;
}, fr = () => vr, l_ = (t) => ge.has(t), R = /* @__PURE__ */ new Set(), u_ = () => {
  let t = document.querySelector(".sapThemeMetaData-Base-baseLib") || document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");
  if (t)
    return getComputedStyle(t).backgroundImage;
  t = document.createElement("span"), t.style.display = "none", t.classList.add("sapThemeMetaData-Base-baseLib"), document.body.appendChild(t);
  let e = getComputedStyle(t).backgroundImage;
  return e === "none" && (t.classList.add("sapThemeMetaData-UI5-sap-ui-core"), e = getComputedStyle(t).backgroundImage), document.body.removeChild(t), e;
}, p_ = (t) => {
  const e = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(t);
  if (e && e.length >= 2) {
    let r = e[1];
    if (r = r.replace(/\\"/g, '"'), r.charAt(0) !== "{" && r.charAt(r.length - 1) !== "}")
      try {
        r = decodeURIComponent(r);
      } catch {
        R.has("decode") || (console.warn("Malformed theme metadata string, unable to decodeURIComponent"), R.add("decode"));
        return;
      }
    try {
      return JSON.parse(r);
    } catch {
      R.has("parse") || (console.warn("Malformed theme metadata string, unable to parse JSON"), R.add("parse"));
    }
  }
}, v_ = (t) => {
  let e, r;
  try {
    e = t.Path.match(/\.([^.]+)\.css_variables$/)[1], r = t.Extends[0];
  } catch {
    R.has("object") || (console.warn("Malformed theme metadata Object", t), R.add("object"));
    return;
  }
  return {
    themeName: e,
    baseThemeName: r
  };
}, Qe = () => {
  const t = u_();
  if (!t || t === "none")
    return;
  const e = p_(t);
  if (e)
    return v_(e);
}, h_ = new T(), m_ = "themeLoaded", f_ = (t) => h_.fireEvent(m_, t);
let Ue;
const gr = () => (Ue === void 0 && (Ue = No()), Ue), g_ = (t) => `${gr()}Base/baseLib/${t}/css_variables.css`, b_ = async (t) => {
  const e = document.querySelector(`[sap-ui-webcomponents-theme="${t}"]`);
  e && document.head.removeChild(e), await so(g_(t), { "sap-ui-webcomponents-theme": t });
}, Q = "@ui5/webcomponents-theming", C_ = () => fr().has(Q), B_ = async (t) => {
  if (!C_())
    return;
  const e = await mr(Q, t);
  e && _r(e, "data-ui5-theme-properties", Q, t);
}, k_ = () => {
  Bo("data-ui5-theme-properties", Q);
}, w_ = async (t, e) => {
  const o = [...fr()].map(async (_) => {
    if (_ === Q)
      return;
    const a = await mr(_, t, e);
    a && _r(a, `data-ui5-component-properties-${j()}`, _);
  });
  return Promise.all(o);
}, y_ = async (t) => {
  var o;
  const e = Qe();
  if (e)
    return e;
  const r = x("OpenUI5Support");
  if (r && r.isOpenUI5Detected()) {
    if (r.cssVariablesLoaded())
      return {
        themeName: (o = r.getConfigurationSettingsObject()) == null ? void 0 : o.theme,
        baseThemeName: ""
        // baseThemeName is only relevant for custom themes
      };
  } else if (gr())
    return await b_(t), Qe();
}, br = async (t) => {
  const e = await y_(t);
  !e || t !== e.themeName ? await B_(t) : k_();
  const r = l_(t) ? t : e && e.baseThemeName;
  await w_(r || me, e && e.themeName === t ? t : void 0), f_(t);
};
let $e;
const Se = () => ($e === void 0 && ($e = Mo()), $e), x_ = () => {
  var e, r;
  const t = Se();
  return S_(t) ? !t.startsWith("sap_horizon") : !((r = (e = Qe()) == null ? void 0 : e.baseThemeName) != null && r.startsWith("sap_horizon"));
}, S_ = (t) => Eo.includes(t);
let Cr = !1, ce;
const A_ = new T(), I_ = async () => {
  if (ce !== void 0)
    return ce;
  const t = async (e) => {
    if (typeof document > "u") {
      e();
      return;
    }
    s_(T_), fo();
    const r = x("OpenUI5Support"), o = r ? r.isOpenUI5Detected() : !1, _ = x("F6Navigation");
    r && await r.init(), _ && !o && _.init(), await io(), await br(Se()), r && r.attachListeners(), So(), Fo(), e(), Cr = !0, await A_.fireEventAsync("boot");
  };
  return ce = new Promise(t), ce;
}, T_ = (t) => {
  const e = Se();
  Cr && t === e && br(e);
}, Me = /* @__PURE__ */ new Map(), Ne = /* @__PURE__ */ new Map(), kt = (t) => {
  if (!Me.has(t)) {
    const e = F_(t.split("-"));
    Me.set(t, e);
  }
  return Me.get(t);
}, Br = (t) => {
  if (!Ne.has(t)) {
    const e = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    Ne.set(t, e);
  }
  return Ne.get(t);
}, F_ = (t) => t.map((e, r) => r === 0 ? e.toLowerCase() : e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(""), E_ = (t) => {
  if (!(t instanceof HTMLElement))
    return "default";
  const e = t.getAttribute("slot");
  if (e) {
    const r = e.match(/^(.+?)-\d+$/);
    return r ? r[1] : e;
  }
  return "default";
}, kr = (t) => t instanceof HTMLSlotElement ? t.assignedNodes({ flatten: !0 }).filter((e) => e instanceof HTMLElement) : [t], H_ = (t) => t.reduce((e, r) => e.concat(kr(r)), []);
let L_, wt = {
  include: [/^ui5-/],
  exclude: []
};
const Re = /* @__PURE__ */ new Map(), wr = () => L_, et = (t) => {
  if (!Re.has(t)) {
    const e = wt.include.some((r) => t.match(r)) && !wt.exclude.some((r) => t.match(r));
    Re.set(t, e);
  }
  return Re.get(t);
}, yr = (t) => {
  if (et(t))
    return wr();
};
class P_ {
  constructor(e) {
    this.metadata = e;
  }
  getInitialState() {
    if (Object.prototype.hasOwnProperty.call(this, "_initialState"))
      return this._initialState;
    const e = {}, r = this.slotsAreManaged(), o = this.getProperties();
    for (const _ in o) {
      const a = o[_].type, i = o[_].defaultValue;
      a === Boolean ? (e[_] = !1, i !== void 0 && console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default")) : o[_].multiple ? Object.defineProperty(e, _, {
        enumerable: !0,
        get() {
          return [];
        }
      }) : a === Object ? Object.defineProperty(e, _, {
        enumerable: !0,
        get() {
          return "defaultValue" in o[_] ? o[_].defaultValue : {};
        }
      }) : a === String ? e[_] = "defaultValue" in o[_] ? o[_].defaultValue : "" : e[_] = i;
    }
    if (r) {
      const _ = this.getSlots();
      for (const [a, i] of Object.entries(_)) {
        const n = i.propertyName || a;
        e[n] = [];
      }
    }
    return this._initialState = e, e;
  }
  /**
   * Validates the property's value and returns it if correct
   * or returns the default value if not.
   * **Note:** Only intended for use by UI5Element.js
   * @public
   */
  static validatePropertyValue(e, r) {
    return r.multiple && e ? e.map((_) => yt(_, r)) : yt(e, r);
  }
  /**
   * Validates the slot's value and returns it if correct
   * or throws an exception if not.
   * **Note:** Only intended for use by UI5Element.js
   * @public
   */
  static validateSlotValue(e, r) {
    return U_(e, r);
  }
  /**
   * Returns the tag of the UI5 Element without the scope
   * @public
   */
  getPureTag() {
    return this.metadata.tag || "";
  }
  /**
   * Returns the tag of the UI5 Element
   * @public
   */
  getTag() {
    const e = this.metadata.tag;
    if (!e)
      return "";
    const r = yr(e);
    return r ? `${e}-${r}` : e;
  }
  /**
   * Determines whether a property should have an attribute counterpart
   * @public
   * @param propName
   */
  hasAttribute(e) {
    const r = this.getProperties()[e];
    return r.type !== Object && !r.noAttribute && !r.multiple;
  }
  /**
   * Returns an array with the properties of the UI5 Element (in camelCase)
   * @public
   */
  getPropertiesList() {
    return Object.keys(this.getProperties());
  }
  /**
   * Returns an array with the attributes of the UI5 Element (in kebab-case)
   * @public
   */
  getAttributesList() {
    return this.getPropertiesList().filter(this.hasAttribute.bind(this)).map(Br);
  }
  /**
   * Determines whether this UI5 Element has a default slot of type Node, therefore can slot text
   */
  canSlotText() {
    var e;
    return ((e = this.getSlots().default) == null ? void 0 : e.type) === Node;
  }
  /**
   * Determines whether this UI5 Element supports any slots
   * @public
   */
  hasSlots() {
    return !!Object.entries(this.getSlots()).length;
  }
  /**
   * Determines whether this UI5 Element supports any slots with "individualSlots: true"
   * @public
   */
  hasIndividualSlots() {
    return this.slotsAreManaged() && Object.values(this.getSlots()).some((e) => e.individualSlots);
  }
  /**
   * Determines whether this UI5 Element needs to invalidate if children are added/removed/changed
   * @public
   */
  slotsAreManaged() {
    return !!this.metadata.managedSlots;
  }
  /**
   * Determines whether this control supports F6 fast navigation
   * @public
   */
  supportsF6FastNavigation() {
    return !!this.metadata.fastNavigation;
  }
  /**
   * Returns an object with key-value pairs of properties and their metadata definitions
   * @public
   */
  getProperties() {
    return this.metadata.properties || (this.metadata.properties = {}), this.metadata.properties;
  }
  /**
   * Returns an object with key-value pairs of events and their metadata definitions
   * @public
   */
  getEvents() {
    return this.metadata.events || (this.metadata.events = {}), this.metadata.events;
  }
  /**
   * Returns an object with key-value pairs of slots and their metadata definitions
   * @public
   */
  getSlots() {
    return this.metadata.slots || (this.metadata.slots = {}), this.metadata.slots;
  }
  /**
   * Determines whether this UI5 Element has any translatable texts (needs to be invalidated upon language change)
   */
  isLanguageAware() {
    return !!this.metadata.languageAware;
  }
  /**
   * Determines whether this UI5 Element has any theme dependant carachteristics.
   */
  isThemeAware() {
    return !!this.metadata.themeAware;
  }
  /**
   * Matches a changed entity (property/slot) with the given name against the "invalidateOnChildChange" configuration
   * and determines whether this should cause and invalidation
   *
   * @param slotName the name of the slot in which a child was changed
   * @param type the type of change in the child: "property" or "slot"
   * @param name the name of the property/slot that changed
   */
  shouldInvalidateOnChildChange(e, r, o) {
    const _ = this.getSlots()[e].invalidateOnChildChange;
    if (_ === void 0)
      return !1;
    if (typeof _ == "boolean")
      return _;
    if (typeof _ == "object") {
      if (r === "property") {
        if (_.properties === void 0)
          return !1;
        if (typeof _.properties == "boolean")
          return _.properties;
        if (Array.isArray(_.properties))
          return _.properties.includes(o);
        throw new Error("Wrong format for invalidateOnChildChange.properties: boolean or array is expected");
      }
      if (r === "slot") {
        if (_.slots === void 0)
          return !1;
        if (typeof _.slots == "boolean")
          return _.slots;
        if (Array.isArray(_.slots))
          return _.slots.includes(o);
        throw new Error("Wrong format for invalidateOnChildChange.slots: boolean or array is expected");
      }
    }
    throw new Error("Wrong format for invalidateOnChildChange: boolean or object is expected");
  }
}
const yt = (t, e) => {
  const r = e.type;
  let o = e.validator;
  return r && r.isDataTypeClass && (o = r), o ? o.isValid(t) ? t : e.defaultValue : !r || r === String ? typeof t == "string" || typeof t > "u" || t === null ? t : t.toString() : r === Boolean ? typeof t == "boolean" ? t : !1 : r === Object ? typeof t == "object" ? t : e.defaultValue : t in r ? t : e.defaultValue;
}, U_ = (t, e) => (t && kr(t).forEach((r) => {
  if (!(r instanceof e.type))
    throw new Error(`The element is not of type ${e.type.toString()}`);
}), t);
class $_ extends HTMLElement {
}
customElements.get("ui5-static-area") || customElements.define("ui5-static-area", $_);
const M_ = () => W("CustomStyle.eventProvider", new T()), N_ = "CustomCSSChange", pt = (t) => {
  M_().attachEvent(N_, t);
}, R_ = () => W("CustomStyle.customCSSFor", {});
pt((t) => {
  n_({ tag: t });
});
const O_ = (t) => {
  const e = R_();
  return e[t] ? e[t].join("") : "";
}, D_ = 10, Oe = (t) => Array.isArray(t) ? t.filter((e) => !!e).flat(D_).map((e) => typeof e == "string" ? e : e.content).join(" ") : typeof t == "string" ? t : t.content, ve = /* @__PURE__ */ new Map();
pt((t) => {
  ve.delete(`${t}_normal`);
});
const xr = (t, e = !1) => {
  const r = t.getMetadata().getTag(), o = `${r}_${e ? "static" : "normal"}`, _ = x("OpenUI5Enablement");
  if (!ve.has(o)) {
    let a, i = "";
    if (_ && (i = Oe(_.getBusyIndicatorStyles())), e)
      a = Oe(t.staticAreaStyles);
    else {
      const n = O_(r) || "";
      a = `${Oe(t.styles)} ${n}`;
    }
    a = `${a} ${i}`, ve.set(o, a);
  }
  return ve.get(o);
}, he = /* @__PURE__ */ new Map();
pt((t) => {
  he.delete(`${t}_normal`);
});
const z_ = (t, e = !1) => {
  const o = `${t.getMetadata().getTag()}_${e ? "static" : "normal"}`;
  if (!he.has(o)) {
    const _ = xr(t, e), a = new CSSStyleSheet();
    a.replaceSync(_), he.set(o, [a]);
  }
  return he.get(o);
}, tt = (t, e = !1) => {
  let r;
  const o = t.constructor, _ = e ? t.staticAreaItem.shadowRoot : t.shadowRoot;
  let a;
  if (e ? a = t.renderStatic() : a = t.render(), !_) {
    console.warn("There is no shadow root to update");
    return;
  }
  if (document.adoptedStyleSheets && !oe() ? _.adoptedStyleSheets = z_(o, e) : r = xr(o, e), o.renderer) {
    o.renderer(a, _, r, e, { host: t });
    return;
  }
  o.render(a, _, r, e, { host: t });
}, W_ = "--_ui5_content_density", j_ = (t) => getComputedStyle(t).getPropertyValue(W_), Sr = (t) => t.matches(":dir(rtl)") ? "rtl" : "ltr", le = "ui5-static-area-item", V_ = "data-sap-ui-integration-popup-content";
class K extends HTMLElement {
  constructor() {
    super(), this._rendered = !1, this.attachShadow({ mode: "open" });
  }
  /**
   * @param ownerElement the UI5Element instance that owns this static area item
   */
  setOwnerElement(e) {
    this.ownerElement = e, this.classList.add(this.ownerElement._id), this.ownerElement.hasAttribute("data-ui5-static-stable") && this.setAttribute("data-ui5-stable", this.ownerElement.getAttribute("data-ui5-static-stable"));
  }
  /**
   * Updates the shadow root of the static area item with the latest state, if rendered
   */
  update() {
    this._rendered && (this.updateAdditionalProperties(), tt(this.ownerElement, !0));
  }
  updateAdditionalProperties() {
    this._updateAdditionalAttrs(), this._updateContentDensity(), this._updateDirection();
  }
  /**
   * Sets the correct content density based on the owner element's state
   * @private
   */
  _updateContentDensity() {
    j_(this.ownerElement) === "compact" ? (this.classList.add("sapUiSizeCompact"), this.classList.add("ui5-content-density-compact")) : (this.classList.remove("sapUiSizeCompact"), this.classList.remove("ui5-content-density-compact"));
  }
  _updateDirection() {
    if (this.ownerElement) {
      const e = Sr(this.ownerElement);
      e === "rtl" ? this.setAttribute("dir", e) : this.removeAttribute("dir");
    }
  }
  _updateAdditionalAttrs() {
    this.setAttribute(le, ""), this.setAttribute(V_, "");
  }
  /**
   * Returns reference to the DOM element where the current fragment is added.
   * @protected
   */
  async getDomRef() {
    return this.updateAdditionalProperties(), this._rendered || (this._rendered = !0, tt(this.ownerElement, !0)), await cr(), this.shadowRoot;
  }
  static getTag() {
    const e = yr(le);
    return e ? `${le}-${e}` : le;
  }
  static createInstance() {
    return customElements.get(K.getTag()) || customElements.define(K.getTag(), K), document.createElement(this.getTag());
  }
}
const G_ = [], q_ = (t) => G_.some((e) => t.startsWith(e)), rt = /* @__PURE__ */ new WeakMap(), X_ = (t, e, r) => {
  const o = new MutationObserver(e);
  rt.set(t, o), o.observe(t, r);
}, Z_ = (t) => {
  const e = rt.get(t);
  e && (e.disconnect(), rt.delete(t));
}, K_ = [
  "value-changed",
  "click"
];
let De;
const Y_ = (t) => K_.includes(t), J_ = (t) => {
  const e = Ar();
  return !(typeof e != "boolean" && e.events && e.events.includes && e.events.includes(t));
}, Ar = () => (De === void 0 && (De = Do()), De), Q_ = (t) => {
  const e = Ar();
  return Y_(t) ? !1 : e === !0 ? !0 : !J_(t);
}, ea = [
  "disabled",
  "title",
  "hidden",
  "role",
  "draggable"
], xt = (t) => ea.includes(t) || t.startsWith("aria") ? !0 : ![
  HTMLElement,
  Element,
  Node
].some((r) => r.prototype.hasOwnProperty(t)), St = (t, e) => {
  if (t.length !== e.length)
    return !1;
  for (let r = 0; r < t.length; r++)
    if (t[r] !== e[r])
      return !1;
  return !0;
}, ot = (t, e) => {
  const r = ta(e), o = wr();
  return t.call(e, e, r, o);
}, ta = (t) => {
  const e = t.constructor, r = e.getMetadata().getPureTag(), o = e.getUniqueDependencies().map((_) => _.getMetadata().getPureTag()).filter(et);
  return et(r) && o.push(r), o;
};
let ra = 0;
const At = /* @__PURE__ */ new Map(), ze = /* @__PURE__ */ new Map();
function G(t) {
  this._suppressInvalidation || (this.onInvalidation(t), this._changedState.push(t), sr(this), this._invalidationEventProvider.fireEvent("invalidate", { ...t, target: this }));
}
class ae extends HTMLElement {
  constructor() {
    super();
    const e = this.constructor;
    this._changedState = [], this._suppressInvalidation = !0, this._inDOM = !1, this._fullyConnected = !1, this._childChangeListeners = /* @__PURE__ */ new Map(), this._slotChangeListeners = /* @__PURE__ */ new Map(), this._invalidationEventProvider = new T(), this._componentStateFinalizedEventProvider = new T();
    let r;
    this._domRefReadyPromise = new Promise((o) => {
      r = o;
    }), this._domRefReadyPromise._deferredResolve = r, this._doNotSyncAttributes = /* @__PURE__ */ new Set(), this._state = { ...e.getMetadata().getInitialState() }, this._upgradeAllProperties(), e._needsShadowDOM() && this.attachShadow({ mode: "open" });
  }
  /**
   * Returns a unique ID for this UI5 Element
   *
   * @deprecated - This property is not guaranteed in future releases
   * @protected
   */
  get _id() {
    return this.__id || (this.__id = `ui5wc_${++ra}`), this.__id;
  }
  render() {
    const e = this.constructor.template;
    return ot(e, this);
  }
  renderStatic() {
    const e = this.constructor.staticAreaTemplate;
    return ot(e, this);
  }
  /**
   * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
   * @private
   */
  async connectedCallback() {
    const e = this.constructor;
    this.setAttribute(e.getMetadata().getPureTag(), ""), e.getMetadata().supportsF6FastNavigation() && this.setAttribute("data-sap-ui-fastnavgroup", "true");
    const r = e.getMetadata().slotsAreManaged();
    this._inDOM = !0, r && (this._startObservingDOMChildren(), await this._processChildren()), this._inDOM && (dr(this), this._domRefReadyPromise._deferredResolve(), this._fullyConnected = !0, this.onEnterDOM());
  }
  /**
   * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
   * @private
   */
  disconnectedCallback() {
    const r = this.constructor.getMetadata().slotsAreManaged();
    this._inDOM = !1, r && this._stopObservingDOMChildren(), this._fullyConnected && (this.onExitDOM(), this._fullyConnected = !1), this.staticAreaItem && this.staticAreaItem.parentElement && this.staticAreaItem.parentElement.removeChild(this.staticAreaItem), r_(this);
  }
  /**
   * Called every time before the component renders.
   * @public
   */
  onBeforeRendering() {
  }
  /**
   * Called every time after the component renders.
   * @public
   */
  onAfterRendering() {
  }
  /**
   * Called on connectedCallback - added to the DOM.
   * @public
   */
  onEnterDOM() {
  }
  /**
   * Called on disconnectedCallback - removed from the DOM.
   * @public
   */
  onExitDOM() {
  }
  /**
   * @private
   */
  _startObservingDOMChildren() {
    const r = this.constructor.getMetadata();
    if (!r.hasSlots())
      return;
    const _ = r.canSlotText(), a = Object.keys(r.getSlots()).some((n) => r.getSlots()[n].cloned), i = {
      childList: !0,
      subtree: _ || a,
      characterData: _
    };
    X_(this, this._processChildren.bind(this), i);
  }
  /**
   * @private
   */
  _stopObservingDOMChildren() {
    Z_(this);
  }
  /**
   * Note: this method is also manually called by "compatibility/patchNodeValue.js"
   * @private
   */
  async _processChildren() {
    this.constructor.getMetadata().hasSlots() && await this._updateSlots();
  }
  /**
   * @private
   */
  async _updateSlots() {
    const e = this.constructor, r = e.getMetadata().getSlots(), o = e.getMetadata().canSlotText(), _ = Array.from(o ? this.childNodes : this.children), a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    for (const [l, p] of Object.entries(r)) {
      const c = p.propertyName || l;
      i.set(c, l), a.set(c, [...this._state[c]]), this._clearSlot(l, p);
    }
    const n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), d = _.map(async (l, p) => {
      const c = E_(l), v = r[c];
      if (v === void 0) {
        if (c !== "default") {
          const f = Object.keys(r).join(", ");
          console.warn(`Unknown slotName: ${c}, ignoring`, l, `Valid values are: ${f}`);
        }
        return;
      }
      if (v.individualSlots) {
        const f = (n.get(c) || 0) + 1;
        n.set(c, f), l._individualSlot = `${c}-${f}`;
      }
      if (l instanceof HTMLElement) {
        const f = l.localName;
        if (f.includes("-") && !q_(f)) {
          if (!customElements.get(f)) {
            const to = customElements.whenDefined(f);
            let se = At.get(f);
            se || (se = new Promise((ro) => setTimeout(ro, 1e3)), At.set(f, se)), await Promise.race([to, se]);
          }
          customElements.upgrade(l);
        }
      }
      if (l = e.getMetadata().constructor.validateSlotValue(l, v), It(l) && v.invalidateOnChildChange) {
        const f = this._getChildChangeListener(c);
        f && l.attachInvalidate.call(l, f);
      }
      l instanceof HTMLSlotElement && this._attachSlotChange(l, c);
      const m = v.propertyName || c;
      s.has(m) ? s.get(m).push({ child: l, idx: p }) : s.set(m, [{ child: l, idx: p }]);
    });
    await Promise.all(d), s.forEach((l, p) => {
      this._state[p] = l.sort((c, v) => c.idx - v.idx).map((c) => c.child);
    });
    let u = !1;
    for (const [l, p] of Object.entries(r)) {
      const c = p.propertyName || l;
      St(a.get(c), this._state[c]) || (G.call(this, {
        type: "slot",
        name: i.get(c),
        reason: "children"
      }), u = !0);
    }
    u || G.call(this, {
      type: "slot",
      name: "default",
      reason: "textcontent"
    });
  }
  /**
   * Removes all children from the slot and detaches listeners, if any
   * @private
   */
  _clearSlot(e, r) {
    const o = r.propertyName || e;
    this._state[o].forEach((a) => {
      if (It(a)) {
        const i = this._getChildChangeListener(e);
        i && a.detachInvalidate.call(a, i);
      }
      a instanceof HTMLSlotElement && this._detachSlotChange(a, e);
    }), this._state[o] = [];
  }
  /**
   * Attach a callback that will be executed whenever the component is invalidated
   *
   * @param callback
   * @public
   */
  attachInvalidate(e) {
    this._invalidationEventProvider.attachEvent("invalidate", e);
  }
  /**
   * Detach the callback that is executed whenever the component is invalidated
   *
   * @param callback
   * @public
   */
  detachInvalidate(e) {
    this._invalidationEventProvider.detachEvent("invalidate", e);
  }
  /**
   * Callback that is executed whenever a monitored child changes its state
   *
   * @param slotName the slot in which a child was invalidated
   * @param childChangeInfo the changeInfo object for the child in the given slot
   * @private
   */
  _onChildChange(e, r) {
    this.constructor.getMetadata().shouldInvalidateOnChildChange(e, r.type, r.name) && G.call(this, {
      type: "slot",
      name: e,
      reason: "childchange",
      child: r.target
    });
  }
  /**
   * Do not override this method in derivatives of UI5Element
   * @private
   */
  attributeChangedCallback(e, r, o) {
    let _;
    if (this._doNotSyncAttributes.has(e))
      return;
    const a = this.constructor.getMetadata().getProperties(), i = e.replace(/^ui5-/, ""), n = kt(i);
    if (a.hasOwnProperty(n)) {
      const s = a[n], d = s.type;
      let u = s.validator;
      d && d.isDataTypeClass && (u = d), u ? _ = u.attributeToProperty(o) : d === Boolean ? _ = o !== null : _ = o, this[n] = _;
    }
  }
  /**
   * @private
   */
  _updateAttribute(e, r) {
    const o = this.constructor;
    if (!o.getMetadata().hasAttribute(e))
      return;
    const a = o.getMetadata().getProperties()[e], i = a.type;
    let n = a.validator;
    const s = Br(e), d = this.getAttribute(s);
    if (i && i.isDataTypeClass && (n = i), n) {
      const u = n.propertyToAttribute(r);
      u === null ? (this._doNotSyncAttributes.add(s), this.removeAttribute(s), this._doNotSyncAttributes.delete(s)) : this.setAttribute(s, u);
    } else
      i === Boolean ? r === !0 && d === null ? this.setAttribute(s, "") : r === !1 && d !== null && this.removeAttribute(s) : typeof r != "object" && d !== r && this.setAttribute(s, r);
  }
  /**
   * @private
   */
  _upgradeProperty(e) {
    if (this.hasOwnProperty(e)) {
      const r = this[e];
      delete this[e], this[e] = r;
    }
  }
  /**
   * @private
   */
  _upgradeAllProperties() {
    this.constructor.getMetadata().getPropertiesList().forEach(this._upgradeProperty.bind(this));
  }
  /**
   * Returns a singleton event listener for the "change" event of a child in a given slot
   *
   * @param slotName the name of the slot, where the child is
   * @private
   */
  _getChildChangeListener(e) {
    return this._childChangeListeners.has(e) || this._childChangeListeners.set(e, this._onChildChange.bind(this, e)), this._childChangeListeners.get(e);
  }
  /**
   * Returns a singleton slotchange event listener that invalidates the component due to changes in the given slot
   *
   * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
   * @private
   */
  _getSlotChangeListener(e) {
    return this._slotChangeListeners.has(e) || this._slotChangeListeners.set(e, this._onSlotChange.bind(this, e)), this._slotChangeListeners.get(e);
  }
  /**
   * @private
   */
  _attachSlotChange(e, r) {
    const o = this._getSlotChangeListener(r);
    o && e.addEventListener("slotchange", o);
  }
  /**
   * @private
   */
  _detachSlotChange(e, r) {
    e.removeEventListener("slotchange", this._getSlotChangeListener(r));
  }
  /**
   * Whenever a slot element is slotted inside a UI5 Web Component, its slotchange event invalidates the component
   *
   * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
   * @private
   */
  _onSlotChange(e) {
    G.call(this, {
      type: "slot",
      name: e,
      reason: "slotchange"
    });
  }
  /**
   * A callback that is executed each time an already rendered component is invalidated (scheduled for re-rendering)
   *
   * @param  changeInfo An object with information about the change that caused invalidation.
   * The object can have the following properties:
   *  - type: (property|slot) tells what caused the invalidation
   *   1) property: a property value was changed either directly or as a result of changing the corresponding attribute
   *   2) slot: a slotted node(nodes) changed in one of several ways (see "reason")
   *
   *  - name: the name of the property or slot that caused the invalidation
   *
   *  - reason: (children|textcontent|childchange|slotchange) relevant only for type="slot" only and tells exactly what changed in the slot
   *   1) children: immediate children (HTML elements or text nodes) were added, removed or reordered in the slot
   *   2) textcontent: text nodes in the slot changed value (or nested text nodes were added or changed value). Can only trigger for slots of "type: Node"
   *   3) slotchange: a slot element, slotted inside that slot had its "slotchange" event listener called. This practically means that transitively slotted children changed.
   *      Can only trigger if the child of a slot is a slot element itself.
   *   4) childchange: indicates that a UI5Element child in that slot was invalidated and in turn invalidated the component.
   *      Can only trigger for slots with "invalidateOnChildChange" metadata descriptor
   *
   *  - newValue: the new value of the property (for type="property" only)
   *
   *  - oldValue: the old value of the property (for type="property" only)
   *
   *  - child the child that was changed (for type="slot" and reason="childchange" only)
   *
   * @public
   */
  onInvalidation(e) {
  }
  // eslint-disable-line
  /**
   * Do not call this method directly, only intended to be called by js
   * @protected
   */
  _render() {
    const e = this.constructor, r = e.getMetadata().hasIndividualSlots();
    this._suppressInvalidation = !0, this.onBeforeRendering(), this._componentStateFinalizedEventProvider.fireEvent("componentStateFinalized"), this._suppressInvalidation = !1, this._changedState = [], e._needsShadowDOM() && tt(this), this.staticAreaItem && this.staticAreaItem.update(), r && this._assignIndividualSlotsToChildren(), this.onAfterRendering();
  }
  /**
   * @private
   */
  _assignIndividualSlotsToChildren() {
    Array.from(this.children).forEach((r) => {
      r._individualSlot && r.setAttribute("slot", r._individualSlot);
    });
  }
  /**
   * @private
   */
  _waitForDomRef() {
    return this._domRefReadyPromise;
  }
  /**
   * Returns the DOM Element inside the Shadow Root that corresponds to the opening tag in the UI5 Web Component's template
   * *Note:* For logical (abstract) elements (items, options, etc...), returns the part of the parent's DOM that represents this option
   * Use this method instead of "this.shadowRoot" to read the Shadow DOM, if ever necessary
   *
   * @public
   */
  getDomRef() {
    if (typeof this._getRealDomRef == "function")
      return this._getRealDomRef();
    if (!this.shadowRoot || this.shadowRoot.children.length === 0)
      return;
    const e = [...this.shadowRoot.children].filter((r) => !["link", "style"].includes(r.localName));
    return e.length !== 1 && console.warn(`The shadow DOM for ${this.constructor.getMetadata().getTag()} does not have a top level element, the getDomRef() method might not work as expected`), e[0];
  }
  /**
   * Returns the DOM Element marked with "data-sap-focus-ref" inside the template.
   * This is the element that will receive the focus by default.
   * @public
   */
  getFocusDomRef() {
    const e = this.getDomRef();
    if (e)
      return e.querySelector("[data-sap-focus-ref]") || e;
  }
  /**
   * Waits for dom ref and then returns the DOM Element marked with "data-sap-focus-ref" inside the template.
   * This is the element that will receive the focus by default.
   * @public
   */
  async getFocusDomRefAsync() {
    return await this._waitForDomRef(), this.getFocusDomRef();
  }
  /**
   * Set the focus to the element, returned by "getFocusDomRef()" (marked by "data-sap-focus-ref")
   * @param focusOptions additional options for the focus
   * @public
   */
  async focus(e) {
    await this._waitForDomRef();
    const r = this.getFocusDomRef();
    r && typeof r.focus == "function" && r.focus(e);
  }
  /**
   *
   * @public
   * @param name - name of the event
   * @param data - additional data for the event
   * @param cancelable - true, if the user can call preventDefault on the event object
   * @param bubbles - true, if the event bubbles
   * @returns false, if the event was cancelled (preventDefault called), true otherwise
   */
  fireEvent(e, r, o = !1, _ = !0) {
    const a = this._fireEvent(e, r, o, _), i = kt(e);
    return i !== e ? a && this._fireEvent(i, r, o, _) : a;
  }
  _fireEvent(e, r, o = !1, _ = !0) {
    const a = new CustomEvent(`ui5-${e}`, {
      detail: r,
      composed: !1,
      bubbles: _,
      cancelable: o
    }), i = this.dispatchEvent(a);
    if (Q_(e))
      return i;
    const n = new CustomEvent(e, {
      detail: r,
      composed: !1,
      bubbles: _,
      cancelable: o
    });
    return this.dispatchEvent(n) && i;
  }
  /**
   * Returns the actual children, associated with a slot.
   * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
   * @public
   */
  getSlottedNodes(e) {
    return H_(this[e]);
  }
  /**
   * Attach a callback that will be executed whenever the component's state is finalized
   *
   * @param callback
   * @public
   */
  attachComponentStateFinalized(e) {
    this._componentStateFinalizedEventProvider.attachEvent("componentStateFinalized", e);
  }
  /**
   * Detach the callback that is executed whenever the component's state is finalized
   *
   * @param callback
   * @public
   */
  detachComponentStateFinalized(e) {
    this._componentStateFinalizedEventProvider.detachEvent("componentStateFinalized", e);
  }
  /**
   * Determines whether the component should be rendered in RTL mode or not.
   * Returns: "rtl", "ltr" or undefined
   *
   * @public
   * @default undefined
   */
  get effectiveDir() {
    return Qo(this.constructor), Sr(this);
  }
  /**
   * Used to duck-type UI5 elements without using instanceof
   * @public
   * @default true
   */
  get isUI5Element() {
    return !0;
  }
  get classes() {
    return {};
  }
  /**
   * Returns the component accessibility info.
   * @private
   */
  get accessibilityInfo() {
    return {};
  }
  /**
   * Do not override this method in derivatives of UI5Element, use metadata properties instead
   * @private
   */
  static get observedAttributes() {
    return this.getMetadata().getAttributesList();
  }
  /**
   * @private
   */
  static _needsShadowDOM() {
    return !!this.template || Object.prototype.hasOwnProperty.call(this.prototype, "render");
  }
  /**
   * @private
   */
  static _needsStaticArea() {
    return !!this.staticAreaTemplate || Object.prototype.hasOwnProperty.call(this.prototype, "renderStatic");
  }
  /**
   * @public
   */
  getStaticAreaItemDomRef() {
    if (!this.constructor._needsStaticArea())
      throw new Error("This component does not use the static area");
    return this.staticAreaItem || (this.staticAreaItem = K.createInstance(), this.staticAreaItem.setOwnerElement(this)), this.staticAreaItem.parentElement || rr("ui5-static-area").appendChild(this.staticAreaItem), this.staticAreaItem.getDomRef();
  }
  /**
   * @private
   */
  static _generateAccessors() {
    const e = this.prototype, r = this.getMetadata().slotsAreManaged(), o = this.getMetadata().getProperties();
    for (const [_, a] of Object.entries(o)) {
      if (xt(_) || console.warn(`"${_}" is not a valid property name. Use a name that does not collide with DOM APIs`), a.type === Boolean && a.defaultValue)
        throw new Error(`Cannot set a default value for property "${_}". All booleans are false by default.`);
      if (a.type === Array)
        throw new Error(`Wrong type for property "${_}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`);
      if (a.type === Object && a.defaultValue)
        throw new Error(`Cannot set a default value for property "${_}". All properties of type "Object" are empty objects by default.`);
      if (a.multiple && a.defaultValue)
        throw new Error(`Cannot set a default value for property "${_}". All multiple properties are empty arrays by default.`);
      const i = Object.getOwnPropertyDescriptor(e, _);
      let n;
      i != null && i.set && (n = i.set);
      let s;
      i != null && i.get && (s = i.get), Object.defineProperty(e, _, {
        get() {
          if (s)
            return s.call(this);
          if (this._state[_] !== void 0)
            return this._state[_];
          const d = a.defaultValue;
          return a.type === Boolean ? !1 : a.type === String ? d : a.multiple ? [] : d;
        },
        set(d) {
          let u;
          d = this.constructor.getMetadata().constructor.validatePropertyValue(d, a);
          const c = a.type;
          let v = a.validator;
          const m = s ? s.call(this) : this._state[_];
          c && c.isDataTypeClass && (v = c), v ? u = !v.valuesAreEqual(m, d) : Array.isArray(m) && Array.isArray(d) && a.multiple && a.compareValues ? u = !St(m, d) : u = m !== d, u && (n ? n.call(this, d) : this._state[_] = d, G.call(this, {
            type: "property",
            name: _,
            newValue: d,
            oldValue: m
          }), this._updateAttribute(_, d));
        }
      });
    }
    if (r) {
      const _ = this.getMetadata().getSlots();
      for (const [a, i] of Object.entries(_)) {
        xt(a) || console.warn(`"${a}" is not a valid property name. Use a name that does not collide with DOM APIs`);
        const n = i.propertyName || a;
        Object.defineProperty(e, n, {
          get() {
            return this._state[n] !== void 0 ? this._state[n] : [];
          },
          set() {
            throw new Error("Cannot set slot content directly, use the DOM APIs (appendChild, removeChild, etc...)");
          }
        });
      }
    }
  }
  /**
   * Returns the Static Area CSS for this UI5 Web Component Class
   * @protected
   */
  static get staticAreaStyles() {
    return "";
  }
  /**
   * Returns an array with the dependencies for this UI5 Web Component, which could be:
   *  - composed components (used in its shadow root or static area item)
   *  - slotted components that the component may need to communicate with
   *
   * @protected
   */
  static get dependencies() {
    return [];
  }
  /**
   * Returns a list of the unique dependencies for this UI5 Web Component
   *
   * @public
   */
  static getUniqueDependencies() {
    if (!ze.has(this)) {
      const e = this.dependencies.filter((r, o, _) => _.indexOf(r) === o);
      ze.set(this, e);
    }
    return ze.get(this) || [];
  }
  /**
   * Returns a promise that resolves whenever all dependencies for this UI5 Web Component have resolved
   */
  static whenDependenciesDefined() {
    return Promise.all(this.getUniqueDependencies().map((e) => e.define()));
  }
  /**
   * Hook that will be called upon custom element definition
   *
   * @protected
   */
  static async onDefine() {
    return Promise.resolve();
  }
  /**
   * Registers a UI5 Web Component in the browser window object
   * @public
   */
  static async define() {
    await I_(), await Promise.all([
      this.whenDependenciesDefined(),
      this.onDefine()
    ]);
    const e = this.getMetadata().getTag(), r = Zo(e), o = customElements.get(e);
    return o && !r ? Yo(e) : o || (this._generateAccessors(), Xo(e), customElements.define(e, this)), this;
  }
  /**
   * Returns an instance of UI5ElementMetadata.js representing this UI5 Web Component's full metadata (its and its parents')
   * Note: not to be confused with the "get metadata()" method, which returns an object for this class's metadata only
   * @public
   */
  static getMetadata() {
    if (this.hasOwnProperty("_metadata"))
      return this._metadata;
    const e = [this.metadata];
    let r = this;
    for (; r !== ae; )
      r = Object.getPrototypeOf(r), e.unshift(r.metadata);
    const o = dt({}, ...e);
    return this._metadata = new P_(o), this._metadata;
  }
}
ae.metadata = {};
ae.styles = "";
const It = (t) => "isUI5Element" in t, oa = (t = {}) => (e) => {
  if (Object.prototype.hasOwnProperty.call(e, "metadata") || (e.metadata = {}), typeof t == "string") {
    e.metadata.tag = t;
    return;
  }
  const { tag: r, languageAware: o, themeAware: _, fastNavigation: a } = t;
  e.metadata.tag = r, o && (e.metadata.languageAware = o), _ && (e.metadata.themeAware = _), a && (e.metadata.fastNavigation = a), ["render", "renderer", "template", "staticAreaTemplate", "styles", "staticAreaStyles", "dependencies"].forEach((i) => {
    const s = t[i === "render" ? "renderer" : i];
    s && Object.defineProperty(e, i, {
      get: () => s
    });
  });
}, w = (t) => (e, r) => {
  const o = e.constructor;
  Object.prototype.hasOwnProperty.call(o, "metadata") || (o.metadata = {});
  const _ = o.metadata;
  _.properties || (_.properties = {});
  const a = _.properties;
  a[r] || (a[r] = t || { type: String });
}, ri = (t) => (e, r) => {
  const o = e.constructor;
  Object.prototype.hasOwnProperty.call(o, "metadata") || (o.metadata = {});
  const _ = o.metadata;
  _.slots || (_.slots = {});
  const a = _.slots;
  if (t && t.default && a.default)
    throw new Error("Only one slot can be the default slot.");
  const i = t && t.default ? "default" : r;
  t = t || { type: HTMLElement }, t.type || (t.type = HTMLElement), a[i] || (a[i] = t), t.default && (delete a.default.default, a.default.propertyName = r), o.metadata.managedSlots = !0;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var We;
const be = window, z = be.trustedTypes, Tt = z ? z.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, Ce = "$lit$", S = `lit$${(Math.random() + "").slice(9)}$`, vt = "?" + S, _a = `<${vt}>`, U = document, ee = () => U.createComment(""), te = (t) => t === null || typeof t != "object" && typeof t != "function", Ir = Array.isArray, Tr = (t) => Ir(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", je = `[ 	
\f\r]`, q = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ft = /-->/g, Et = />/g, E = RegExp(`>|${je}(?:([^\\s"'>=/]+)(${je}*=${je}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ht = /'/g, Lt = /"/g, Fr = /^(?:script|style|textarea|title)$/i, Er = (t) => (e, ...r) => ({ _$litType$: t, strings: e, values: r }), aa = Er(1), ia = Er(2), $ = Symbol.for("lit-noChange"), g = Symbol.for("lit-nothing"), Pt = /* @__PURE__ */ new WeakMap(), P = U.createTreeWalker(U, 129, null, !1);
function Hr(t, e) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Tt !== void 0 ? Tt.createHTML(e) : e;
}
const Lr = (t, e) => {
  const r = t.length - 1, o = [];
  let _, a = e === 2 ? "<svg>" : "", i = q;
  for (let n = 0; n < r; n++) {
    const s = t[n];
    let d, u, l = -1, p = 0;
    for (; p < s.length && (i.lastIndex = p, u = i.exec(s), u !== null); )
      p = i.lastIndex, i === q ? u[1] === "!--" ? i = Ft : u[1] !== void 0 ? i = Et : u[2] !== void 0 ? (Fr.test(u[2]) && (_ = RegExp("</" + u[2], "g")), i = E) : u[3] !== void 0 && (i = E) : i === E ? u[0] === ">" ? (i = _ ?? q, l = -1) : u[1] === void 0 ? l = -2 : (l = i.lastIndex - u[2].length, d = u[1], i = u[3] === void 0 ? E : u[3] === '"' ? Lt : Ht) : i === Lt || i === Ht ? i = E : i === Ft || i === Et ? i = q : (i = E, _ = void 0);
    const c = i === E && t[n + 1].startsWith("/>") ? " " : "";
    a += i === q ? s + _a : l >= 0 ? (o.push(d), s.slice(0, l) + Ce + s.slice(l) + S + c) : s + S + (l === -2 ? (o.push(void 0), n) : c);
  }
  return [Hr(t, a + (t[r] || "<?>") + (e === 2 ? "</svg>" : "")), o];
};
class re {
  constructor({ strings: e, _$litType$: r }, o) {
    let _;
    this.parts = [];
    let a = 0, i = 0;
    const n = e.length - 1, s = this.parts, [d, u] = Lr(e, r);
    if (this.el = re.createElement(d, o), P.currentNode = this.el.content, r === 2) {
      const l = this.el.content, p = l.firstChild;
      p.remove(), l.append(...p.childNodes);
    }
    for (; (_ = P.nextNode()) !== null && s.length < n; ) {
      if (_.nodeType === 1) {
        if (_.hasAttributes()) {
          const l = [];
          for (const p of _.getAttributeNames())
            if (p.endsWith(Ce) || p.startsWith(S)) {
              const c = u[i++];
              if (l.push(p), c !== void 0) {
                const v = _.getAttribute(c.toLowerCase() + Ce).split(S), m = /([.?@])?(.*)/.exec(c);
                s.push({ type: 1, index: a, name: m[2], strings: v, ctor: m[1] === "." ? Ur : m[1] === "?" ? $r : m[1] === "@" ? Mr : ie });
              } else
                s.push({ type: 6, index: a });
            }
          for (const p of l)
            _.removeAttribute(p);
        }
        if (Fr.test(_.tagName)) {
          const l = _.textContent.split(S), p = l.length - 1;
          if (p > 0) {
            _.textContent = z ? z.emptyScript : "";
            for (let c = 0; c < p; c++)
              _.append(l[c], ee()), P.nextNode(), s.push({ type: 2, index: ++a });
            _.append(l[p], ee());
          }
        }
      } else if (_.nodeType === 8)
        if (_.data === vt)
          s.push({ type: 2, index: a });
        else {
          let l = -1;
          for (; (l = _.data.indexOf(S, l + 1)) !== -1; )
            s.push({ type: 7, index: a }), l += S.length - 1;
        }
      a++;
    }
  }
  static createElement(e, r) {
    const o = U.createElement("template");
    return o.innerHTML = e, o;
  }
}
function M(t, e, r = t, o) {
  var _, a, i, n;
  if (e === $)
    return e;
  let s = o !== void 0 ? (_ = r._$Co) === null || _ === void 0 ? void 0 : _[o] : r._$Cl;
  const d = te(e) ? void 0 : e._$litDirective$;
  return (s == null ? void 0 : s.constructor) !== d && ((a = s == null ? void 0 : s._$AO) === null || a === void 0 || a.call(s, !1), d === void 0 ? s = void 0 : (s = new d(t), s._$AT(t, r, o)), o !== void 0 ? ((i = (n = r)._$Co) !== null && i !== void 0 ? i : n._$Co = [])[o] = s : r._$Cl = s), s !== void 0 && (e = M(t, s._$AS(t, e.values), s, o)), e;
}
class Pr {
  constructor(e, r) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = r;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var r;
    const { el: { content: o }, parts: _ } = this._$AD, a = ((r = e == null ? void 0 : e.creationScope) !== null && r !== void 0 ? r : U).importNode(o, !0);
    P.currentNode = a;
    let i = P.nextNode(), n = 0, s = 0, d = _[0];
    for (; d !== void 0; ) {
      if (n === d.index) {
        let u;
        d.type === 2 ? u = new V(i, i.nextSibling, this, e) : d.type === 1 ? u = new d.ctor(i, d.name, d.strings, this, e) : d.type === 6 && (u = new Nr(i, this, e)), this._$AV.push(u), d = _[++s];
      }
      n !== (d == null ? void 0 : d.index) && (i = P.nextNode(), n++);
    }
    return P.currentNode = U, a;
  }
  v(e) {
    let r = 0;
    for (const o of this._$AV)
      o !== void 0 && (o.strings !== void 0 ? (o._$AI(e, o, r), r += o.strings.length - 2) : o._$AI(e[r])), r++;
  }
}
class V {
  constructor(e, r, o, _) {
    var a;
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = r, this._$AM = o, this.options = _, this._$Cp = (a = _ == null ? void 0 : _.isConnected) === null || a === void 0 || a;
  }
  get _$AU() {
    var e, r;
    return (r = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && r !== void 0 ? r : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const r = this._$AM;
    return r !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = r.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, r = this) {
    e = M(this, e, r), te(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== $ && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : Tr(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== g && te(this._$AH) ? this._$AA.nextSibling.data = e : this.$(U.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var r;
    const { values: o, _$litType$: _ } = e, a = typeof _ == "number" ? this._$AC(e) : (_.el === void 0 && (_.el = re.createElement(Hr(_.h, _.h[0]), this.options)), _);
    if (((r = this._$AH) === null || r === void 0 ? void 0 : r._$AD) === a)
      this._$AH.v(o);
    else {
      const i = new Pr(a, this), n = i.u(this.options);
      i.v(o), this.$(n), this._$AH = i;
    }
  }
  _$AC(e) {
    let r = Pt.get(e.strings);
    return r === void 0 && Pt.set(e.strings, r = new re(e)), r;
  }
  T(e) {
    Ir(this._$AH) || (this._$AH = [], this._$AR());
    const r = this._$AH;
    let o, _ = 0;
    for (const a of e)
      _ === r.length ? r.push(o = new V(this.k(ee()), this.k(ee()), this, this.options)) : o = r[_], o._$AI(a), _++;
    _ < r.length && (this._$AR(o && o._$AB.nextSibling, _), r.length = _);
  }
  _$AR(e = this._$AA.nextSibling, r) {
    var o;
    for ((o = this._$AP) === null || o === void 0 || o.call(this, !1, !0, r); e && e !== this._$AB; ) {
      const _ = e.nextSibling;
      e.remove(), e = _;
    }
  }
  setConnected(e) {
    var r;
    this._$AM === void 0 && (this._$Cp = e, (r = this._$AP) === null || r === void 0 || r.call(this, e));
  }
}
class ie {
  constructor(e, r, o, _, a) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = r, this._$AM = _, this.options = a, o.length > 2 || o[0] !== "" || o[1] !== "" ? (this._$AH = Array(o.length - 1).fill(new String()), this.strings = o) : this._$AH = g;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, r = this, o, _) {
    const a = this.strings;
    let i = !1;
    if (a === void 0)
      e = M(this, e, r, 0), i = !te(e) || e !== this._$AH && e !== $, i && (this._$AH = e);
    else {
      const n = e;
      let s, d;
      for (e = a[0], s = 0; s < a.length - 1; s++)
        d = M(this, n[o + s], r, s), d === $ && (d = this._$AH[s]), i || (i = !te(d) || d !== this._$AH[s]), d === g ? e = g : e !== g && (e += (d ?? "") + a[s + 1]), this._$AH[s] = d;
    }
    i && !_ && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Ur extends ie {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
const na = z ? z.emptyScript : "";
class $r extends ie {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== g ? this.element.setAttribute(this.name, na) : this.element.removeAttribute(this.name);
  }
}
class Mr extends ie {
  constructor(e, r, o, _, a) {
    super(e, r, o, _, a), this.type = 5;
  }
  _$AI(e, r = this) {
    var o;
    if ((e = (o = M(this, e, r, 0)) !== null && o !== void 0 ? o : g) === $)
      return;
    const _ = this._$AH, a = e === g && _ !== g || e.capture !== _.capture || e.once !== _.once || e.passive !== _.passive, i = e !== g && (_ === g || a);
    a && this.element.removeEventListener(this.name, this, _), i && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var r, o;
    typeof this._$AH == "function" ? this._$AH.call((o = (r = this.options) === null || r === void 0 ? void 0 : r.host) !== null && o !== void 0 ? o : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Nr {
  constructor(e, r, o) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = r, this.options = o;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    M(this, e);
  }
}
const sa = { O: Ce, P: S, A: vt, C: 1, M: Lr, L: Pr, R: Tr, D: M, I: V, V: ie, H: $r, N: Mr, U: Ur, F: Nr }, Ut = be.litHtmlPolyfillSupport;
Ut == null || Ut(re, V), ((We = be.litHtmlVersions) !== null && We !== void 0 ? We : be.litHtmlVersions = []).push("2.8.0");
const da = (t, e, r) => {
  var o, _;
  const a = (o = r == null ? void 0 : r.renderBefore) !== null && o !== void 0 ? o : e;
  let i = a._$litPart$;
  if (i === void 0) {
    const n = (_ = r == null ? void 0 : r.renderBefore) !== null && _ !== void 0 ? _ : null;
    a._$litPart$ = i = new V(e.insertBefore(ee(), n), n, void 0, r ?? {});
  }
  return i._$AI(t), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rr = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, ca = (t) => (...e) => ({ _$litDirective$: t, values: e });
class Or {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, r, o) {
    this._$Ct = e, this._$AM = r, this._$Ci = o;
  }
  _$AS(e, r) {
    return this.update(e, r);
  }
  update(e, r) {
    return this.render(...r);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { I: la } = sa, $t = () => document.createComment(""), X = (t, e, r) => {
  var o;
  const _ = t._$AA.parentNode, a = e === void 0 ? t._$AB : e._$AA;
  if (r === void 0) {
    const i = _.insertBefore($t(), a), n = _.insertBefore($t(), a);
    r = new la(i, n, t, t.options);
  } else {
    const i = r._$AB.nextSibling, n = r._$AM, s = n !== t;
    if (s) {
      let d;
      (o = r._$AQ) === null || o === void 0 || o.call(r, t), r._$AM = t, r._$AP !== void 0 && (d = t._$AU) !== n._$AU && r._$AP(d);
    }
    if (i !== a || s) {
      let d = r._$AA;
      for (; d !== i; ) {
        const u = d.nextSibling;
        _.insertBefore(d, a), d = u;
      }
    }
  }
  return r;
}, H = (t, e, r = t) => (t._$AI(e, r), t), ua = {}, pa = (t, e = ua) => t._$AH = e, va = (t) => t._$AH, Ve = (t) => {
  var e;
  (e = t._$AP) === null || e === void 0 || e.call(t, !1, !0);
  let r = t._$AA;
  const o = t._$AB.nextSibling;
  for (; r !== o; ) {
    const _ = r.nextSibling;
    r.remove(), r = _;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Mt = (t, e, r) => {
  const o = /* @__PURE__ */ new Map();
  for (let _ = e; _ <= r; _++)
    o.set(t[_], _);
  return o;
}, ha = ca(class extends Or {
  constructor(t) {
    if (super(t), t.type !== Rr.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  ct(t, e, r) {
    let o;
    r === void 0 ? r = e : e !== void 0 && (o = e);
    const _ = [], a = [];
    let i = 0;
    for (const n of t)
      _[i] = o ? o(n, i) : i, a[i] = r(n, i), i++;
    return { values: a, keys: _ };
  }
  render(t, e, r) {
    return this.ct(t, e, r).values;
  }
  update(t, [e, r, o]) {
    var _;
    const a = va(t), { values: i, keys: n } = this.ct(e, r, o);
    if (!Array.isArray(a))
      return this.ut = n, i;
    const s = (_ = this.ut) !== null && _ !== void 0 ? _ : this.ut = [], d = [];
    let u, l, p = 0, c = a.length - 1, v = 0, m = i.length - 1;
    for (; p <= c && v <= m; )
      if (a[p] === null)
        p++;
      else if (a[c] === null)
        c--;
      else if (s[p] === n[v])
        d[v] = H(a[p], i[v]), p++, v++;
      else if (s[c] === n[m])
        d[m] = H(a[c], i[m]), c--, m--;
      else if (s[p] === n[m])
        d[m] = H(a[p], i[m]), X(t, d[m + 1], a[p]), p++, m--;
      else if (s[c] === n[v])
        d[v] = H(a[c], i[v]), X(t, a[p], a[c]), c--, v++;
      else if (u === void 0 && (u = Mt(n, v, m), l = Mt(s, p, c)), u.has(s[p]))
        if (u.has(s[c])) {
          const f = l.get(n[v]), ne = f !== void 0 ? a[f] : null;
          if (ne === null) {
            const Ie = X(t, a[p]);
            H(Ie, i[v]), d[v] = Ie;
          } else
            d[v] = H(ne, i[v]), X(t, a[p], ne), a[f] = null;
          v++;
        } else
          Ve(a[c]), c--;
      else
        Ve(a[p]), p++;
    for (; v <= m; ) {
      const f = X(t, d[m + 1]);
      H(f, i[v]), d[v++] = f;
    }
    for (; p <= c; ) {
      const f = a[p++];
      f !== null && Ve(f);
    }
    return this.ut = n, pa(t, d), $;
  }
});
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const y = (t) => t ?? g;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Nt extends Or {
  constructor(e) {
    if (super(e), this.et = g, e.type !== Rr.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === g || e == null)
      return this.ft = void 0, this.et = e;
    if (e === $)
      return e;
    if (typeof e != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.et)
      return this.ft;
    this.et = e;
    const r = [e];
    return r.raw = r, this.ft = { _$litType$: this.constructor.resultType, strings: r, values: [] };
  }
}
Nt.directiveName = "unsafeHTML", Nt.resultType = 1;
const Z = (t, ...e) => {
  const r = x("LitStatic");
  return (r ? r.html : aa)(t, ...e);
}, Ae = (t, ...e) => {
  const r = x("LitStatic");
  return (r ? r.svg : ia)(t, ...e);
}, ma = (t, e, r, o, _) => {
  const a = x("OpenUI5Enablement");
  a && !o && (t = a.wrapTemplateResultInBusyMarkup(Z, _.host, t)), typeof r == "string" ? t = Z`<style>${r}</style>${t}` : Array.isArray(r) && r.length && (t = Z`${r.map((i) => Z`<link type="text/css" rel="stylesheet" href="${i}">`)}${t}`), da(t, e, _);
}, oi = (t, e, r) => {
  const o = x("LitStatic");
  if (o)
    return o.unsafeStatic((e || []).includes(t) ? `${t}-${r}` : t);
}, Dr = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  SHIFT: 16,
  CONTROL: 17,
  ALT: 18,
  BREAK: 19,
  CAPS_LOCK: 20,
  ESCAPE: 27,
  SPACE: 32,
  PAGE_UP: 33,
  PAGE_DOWN: 34,
  END: 35,
  HOME: 36,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  PRINT: 44,
  INSERT: 45,
  DELETE: 46,
  DIGIT_0: 48,
  DIGIT_1: 49,
  DIGIT_2: 50,
  DIGIT_3: 51,
  DIGIT_4: 52,
  DIGIT_5: 53,
  DIGIT_6: 54,
  DIGIT_7: 55,
  DIGIT_8: 56,
  DIGIT_9: 57,
  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90,
  WINDOWS: 91,
  CONTEXT_MENU: 93,
  TURN_OFF: 94,
  SLEEP: 95,
  NUMPAD_0: 96,
  NUMPAD_1: 97,
  NUMPAD_2: 98,
  NUMPAD_3: 99,
  NUMPAD_4: 100,
  NUMPAD_5: 101,
  NUMPAD_6: 102,
  NUMPAD_7: 103,
  NUMPAD_8: 104,
  NUMPAD_9: 105,
  NUMPAD_ASTERISK: 106,
  NUMPAD_PLUS: 107,
  NUMPAD_MINUS: 109,
  NUMPAD_COMMA: 110,
  NUMPAD_SLASH: 111,
  F1: 112,
  F2: 113,
  F3: 114,
  F4: 115,
  F5: 116,
  F6: 117,
  F7: 118,
  F8: 119,
  F9: 120,
  F10: 121,
  F11: 122,
  F12: 123,
  NUM_LOCK: 144,
  SCROLL_LOCK: 145,
  COLON: 186,
  PLUS: 187,
  COMMA: 188,
  SLASH: 189,
  DOT: 190,
  PIPE: 191,
  SEMICOLON: 192,
  MINUS: 219,
  GREAT_ACCENT: 220,
  EQUALS: 221,
  SINGLE_QUOTE: 222,
  BACKSLASH: 226
}, fa = (t) => (t.key ? t.key === "Enter" : t.keyCode === Dr.ENTER) && !zr(t), Rt = (t) => (t.key ? t.key === "Spacebar" || t.key === " " : t.keyCode === Dr.SPACE) && !zr(t), zr = (t) => t.shiftKey || t.altKey || ga(t), ga = (t) => !!(t.metaKey || t.ctrlKey), ba = (t, e = {}) => (r) => {
  Object.prototype.hasOwnProperty.call(r, "metadata") || (r.metadata = {});
  const o = r.metadata;
  o.events || (o.events = {});
  const _ = o.events;
  _[t] || (_[t] = e);
};
var Be;
(function(t) {
  t["SAP-icons"] = "SAP-icons-v4", t.horizon = "SAP-icons-v5", t["SAP-icons-TNT"] = "tnt", t.BusinessSuiteInAppSymbols = "business-suite";
})(Be || (Be = {}));
const Wr = (t) => Be[t] ? Be[t] : t;
var F;
(function(t) {
  t.SAPIconsV4 = "SAP-icons-v4", t.SAPIconsV5 = "SAP-icons-v5", t.SAPIconsTNTV2 = "tnt-v2", t.SAPIconsTNTV3 = "tnt-v3", t.SAPBSIconsV1 = "business-suite-v1", t.SAPBSIconsV2 = "business-suite-v2";
})(F || (F = {}));
const A = /* @__PURE__ */ new Map();
A.set("SAP-icons", {
  legacy: F.SAPIconsV4,
  sap_horizon: F.SAPIconsV5
});
A.set("tnt", {
  legacy: F.SAPIconsTNTV2,
  sap_horizon: F.SAPIconsTNTV3
});
A.set("business-suite", {
  legacy: F.SAPBSIconsV1,
  sap_horizon: F.SAPBSIconsV2
});
const Ca = (t, e) => {
  if (A.has(t)) {
    A.set(t, { ...e, ...A.get(t) });
    return;
  }
  A.set(t, e);
}, Ot = (t) => {
  const e = x_() ? "legacy" : "sap_horizon";
  return A.has(t) ? A.get(t)[e] : t;
}, Ba = /* @__PURE__ */ new Map(), ka = (t) => Ba.get(t), jr = (t) => {
  const e = ka(Se());
  return !t && e ? Wr(e) : Ot(t || "SAP-icons");
}, wa = typeof document > "u", ya = () => {
  if (wa)
    return J;
  const t = navigator.languages, e = () => navigator.language;
  return t && t[0] || e() || J;
}, xa = new T(), Sa = "languageChange", Aa = (t) => {
  xa.attachEvent(Sa, t);
};
let Ge, _t;
const Ia = () => (Ge === void 0 && (Ge = Ro()), Ge), Ta = (t) => {
  _t = t;
}, Fa = () => (_t === void 0 && Ta(Oo()), _t), Ea = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i;
class Vr {
  constructor(e) {
    const r = Ea.exec(e.replace(/_/g, "-"));
    if (r === null)
      throw new Error(`The given language ${e} does not adhere to BCP-47.`);
    this.sLocaleId = e, this.sLanguage = r[1] || J, this.sScript = r[2] || "", this.sRegion = r[3] || "", this.sVariant = r[4] && r[4].slice(1) || null, this.sExtension = r[5] && r[5].slice(1) || null, this.sPrivateUse = r[6] || null, this.sLanguage && (this.sLanguage = this.sLanguage.toLowerCase()), this.sScript && (this.sScript = this.sScript.toLowerCase().replace(/^[a-z]/, (o) => o.toUpperCase())), this.sRegion && (this.sRegion = this.sRegion.toUpperCase());
  }
  getLanguage() {
    return this.sLanguage;
  }
  getScript() {
    return this.sScript;
  }
  getRegion() {
    return this.sRegion;
  }
  getVariant() {
    return this.sVariant;
  }
  getVariantSubtags() {
    return this.sVariant ? this.sVariant.split("-") : [];
  }
  getExtension() {
    return this.sExtension;
  }
  getExtensionSubtags() {
    return this.sExtension ? this.sExtension.slice(2).split("-") : [];
  }
  getPrivateUse() {
    return this.sPrivateUse;
  }
  getPrivateUseSubtags() {
    return this.sPrivateUse ? this.sPrivateUse.slice(2).split("-") : [];
  }
  hasPrivateUseSubtag(e) {
    return this.getPrivateUseSubtags().indexOf(e) >= 0;
  }
  toString() {
    const e = [this.sLanguage];
    return this.sScript && e.push(this.sScript), this.sRegion && e.push(this.sRegion), this.sVariant && e.push(this.sVariant), this.sExtension && e.push(this.sExtension), this.sPrivateUse && e.push(this.sPrivateUse), e.join("-");
  }
}
const qe = /* @__PURE__ */ new Map(), Gr = (t) => (qe.has(t) || qe.set(t, new Vr(t)), qe.get(t)), Dt = (t) => {
  try {
    if (t && typeof t == "string")
      return Gr(t);
  } catch {
  }
  return new Vr(O);
}, Xe = (t) => {
  if (t)
    return Dt(t);
  const e = Ia();
  return e ? Gr(e) : Dt(ya());
}, Ha = /^((?:[A-Z]{2,3}(?:-[A-Z]{3}){0,3})|[A-Z]{4}|[A-Z]{5,8})(?:-([A-Z]{4}))?(?:-([A-Z]{2}|[0-9]{3}))?((?:-[0-9A-Z]{5,8}|-[0-9][0-9A-Z]{3})*)((?:-[0-9A-WYZ](?:-[0-9A-Z]{2,8})+)*)(?:-(X(?:-[0-9A-Z]{1,8})+))?$/i, zt = /(?:^|-)(saptrc|sappsd)(?:-|$)/i, La = {
  he: "iw",
  yi: "ji",
  nb: "no",
  sr: "sh"
}, Pa = (t) => {
  let e;
  if (!t)
    return O;
  if (typeof t == "string" && (e = Ha.exec(t.replace(/_/g, "-")))) {
    let r = e[1].toLowerCase(), o = e[3] ? e[3].toUpperCase() : void 0;
    const _ = e[2] ? e[2].toLowerCase() : void 0, a = e[4] ? e[4].slice(1) : void 0, i = e[6];
    return r = La[r] || r, i && (e = zt.exec(i)) || a && (e = zt.exec(a)) ? `en_US_${e[1].toLowerCase()}` : (r === "zh" && !o && (_ === "hans" ? o = "CN" : _ === "hant" && (o = "TW")), r + (o ? "_" + o + (a ? "_" + a.replace("-", "_") : "") : ""));
  }
  return O;
}, Ua = (t) => {
  if (!t)
    return O;
  if (t === "zh_HK")
    return "zh_TW";
  const e = t.lastIndexOf("_");
  return e >= 0 ? t.slice(0, e) : t !== O ? O : "";
}, Wt = /* @__PURE__ */ new Set(), jt = /* @__PURE__ */ new Set(), ht = /* @__PURE__ */ new Map(), Ze = /* @__PURE__ */ new Map(), qr = /* @__PURE__ */ new Map(), Vt = (t, e) => {
  ht.set(t, e);
}, $a = (t) => ht.get(t), Xr = (t, e) => {
  const r = `${t}/${e}`;
  return qr.has(r);
}, Ma = (t, e) => {
  const r = `${t}/${e}`, o = qr.get(r);
  return o && !Ze.get(r) && Ze.set(r, o(e)), Ze.get(r);
}, Na = (t) => {
  Wt.has(t) || (console.warn(
    `[${t}]: Message bundle assets are not configured. Falling back to English texts.`,
    /* eslint-disable-line */
    ` Add \`import "${t}/dist/Assets.js"\` in your bundle and make sure your build tool supports dynamic imports and JSON imports. See section "Assets" in the documentation for more information.`
  ), Wt.add(t));
}, Gt = (t, e) => e !== J && !Xr(t, e), Zr = async (t) => {
  const e = Xe().getLanguage(), r = Xe().getRegion(), o = Xe().getVariant();
  let _ = e + (r ? `-${r}` : "") + (o ? `-${o}` : "");
  if (Gt(t, _))
    for (_ = Pa(_); Gt(t, _); )
      _ = Ua(_);
  const a = Fa();
  if (_ === J && !a) {
    Vt(t, null);
    return;
  }
  if (!Xr(t, _)) {
    Na(t);
    return;
  }
  try {
    const i = await Ma(t, _);
    Vt(t, i);
  } catch (i) {
    const n = i;
    jt.has(n.message) || (jt.add(n.message), console.error(n.message));
  }
};
Aa((t) => {
  const e = [...ht.keys()];
  return Promise.all(e.map(Zr));
});
const Ra = /('')|'([^']+(?:''[^']*)*)(?:'|$)|\{([0-9]+(?:\s*,[^{}]*)?)\}|[{}]/g, Oa = (t, e) => (e = e || [], t.replace(Ra, (r, o, _, a, i) => {
  if (o)
    return "'";
  if (_)
    return _.replace(/''/g, "'");
  if (a) {
    const n = typeof a == "string" ? parseInt(a) : a;
    return String(e[n]);
  }
  throw new Error(`[i18n]: pattern syntax error at pos ${i}`);
})), Ke = /* @__PURE__ */ new Map();
class Da {
  constructor(e) {
    this.packageName = e;
  }
  /**
   * Returns a text in the currently loaded language
   *
   * @public
   * @param textObj key/defaultText pair or just the key
   * @param params Values for the placeholders
   */
  getText(e, ...r) {
    if (typeof e == "string" && (e = { key: e, defaultText: e }), !e || !e.key)
      return "";
    const o = $a(this.packageName);
    o && !o[e.key] && console.warn(`Key ${e.key} not found in the i18n bundle, the default text will be used`);
    const _ = o && o[e.key] ? o[e.key] : e.defaultText || e.key;
    return Oa(_, r);
  }
}
const za = (t) => {
  if (Ke.has(t))
    return Ke.get(t);
  const e = new Da(t);
  return Ke.set(t, e), e;
}, Kr = async (t) => (await Zr(t), za(t)), Wa = "legacy", at = /* @__PURE__ */ new Map(), Yr = W("SVGIcons.registry", /* @__PURE__ */ new Map()), Ye = W("SVGIcons.promises", /* @__PURE__ */ new Map()), it = "ICON_NOT_FOUND", _i = (t, e) => {
  at.set(t, e);
}, ja = async (t) => {
  if (!Ye.has(t)) {
    if (!at.has(t))
      throw new Error(`No loader registered for the ${t} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`);
    const e = at.get(t);
    Ye.set(t, e(t));
  }
  return Ye.get(t);
}, qt = (t) => {
  Object.keys(t.data).forEach((e) => {
    const r = t.data[e];
    Va(e, {
      pathData: r.path || r.paths,
      ltr: r.ltr,
      accData: r.acc,
      collection: t.collection,
      packageName: t.packageName
    });
  });
}, Va = (t, e) => {
  const r = `${e.collection}/${t}`;
  Yr.set(r, {
    pathData: e.pathData,
    ltr: e.ltr,
    accData: e.accData,
    packageName: e.packageName,
    customTemplate: e.customTemplate,
    viewBox: e.viewBox,
    collection: e.collection
  });
}, Jr = (t) => {
  t.startsWith("sap-icon://") && (t = t.replace("sap-icon://", ""));
  let e;
  return [t, e] = t.split("/").reverse(), t = t.replace("icon-", ""), e && (e = Wr(e)), { name: t, collection: e };
}, Qr = (t) => {
  const { name: e, collection: r } = Jr(t);
  return nt(r, e);
}, eo = async (t) => {
  const { name: e, collection: r } = Jr(t);
  let o = it;
  try {
    o = await ja(jr(r));
  } catch (a) {
    console.error(a.message);
  }
  if (o === it)
    return o;
  const _ = nt(r, e);
  return _ || (Array.isArray(o) ? o.forEach((a) => {
    qt(a), Ca(r, { [a.themeFamily || Wa]: a.collection });
  }) : qt(o), nt(r, e));
}, nt = (t, e) => {
  const r = `${jr(t)}/${e}`;
  return Yr.get(r);
}, ai = async (t) => {
  if (!t)
    return;
  let e = Qr(t);
  if (e || (e = await eo(t)), e && e !== it && e.accData)
    return (await Kr(e.packageName)).getText(e.accData);
};
function Ga(t, e, r) {
  return Z`<svg class="ui5-icon-root" part="root" tabindex="${y(this._tabIndex)}" dir="${y(this._dir)}" viewBox="${y(this.viewBox)}" role="${y(this.effectiveAccessibleRole)}" focusable="false" preserveAspectRatio="xMidYMid meet" aria-label="${y(this.effectiveAccessibleName)}" aria-hidden=${y(this.effectiveAriaHidden)} xmlns="http://www.w3.org/2000/svg" @focusin=${this._onfocusin} @focusout=${this._onfocusout} @keydown=${this._onkeydown} @keyup=${this._onkeyup}>${Ka.call(this, t, e, r)}</svg>`;
}
function qa(t, e, r) {
  return Ae`<title id="${y(this._id)}-tooltip">${y(this.effectiveAccessibleName)}</title>`;
}
function Xa(t, e, r) {
  return Ae`${y(this.customSvg)}`;
}
function Za(t, e, r, o, _) {
  return Ae`<path d="${y(o)}"></path>`;
}
function Ka(t, e, r) {
  return Ae`${this.hasIconTooltip ? qa.call(this, t, e, r) : void 0}<g role="presentation">${this.customSvg ? Xa.call(this, t, e, r) : void 0}${ha(this.pathData, (o, _) => o._id || _, (o, _) => Za.call(this, t, e, r, o, _))}</g>`;
}
var st;
(function(t) {
  t.Contrast = "Contrast", t.Critical = "Critical", t.Default = "Default", t.Information = "Information", t.Negative = "Negative", t.Neutral = "Neutral", t.NonInteractive = "NonInteractive", t.Positive = "Positive";
})(st || (st = {}));
const Xt = st, Ya = { packageName: "@ui5/webcomponents-theming", fileName: "themes/sap_horizon/parameters-bundle.css.ts", content: `:root{--sapThemeMetaData-Base-baseLib:{"Path": "Base.baseLib.sap_horizon.css_variables","PathPattern": "/%frameworkId%/%libId%/%themeId%/%fileId%.css","Extends": ["baseTheme"],"Tags": ["Fiori_3","LightColorScheme"],"FallbackThemeId": "sap_fiori_3","Engine":{"Name": "theming-engine","Version": "8.0.2"},"Version":{"Build": "11.12.0.20240207130903","Source": "11.12.0"}};--sapBrandColor: #0070f2;--sapHighlightColor: #0064d9;--sapBaseColor: #fff;--sapShellColor: #fff;--sapBackgroundColor: #f5f6f7;--sapFontFamily: "72", "72full", Arial, Helvetica, sans-serif;--sapFontSize: .875rem;--sapTextColor: #1d2d3e;--sapLinkColor: #0064d9;--sapCompanyLogo: none;--sapBackgroundImage: none;--sapBackgroundImageOpacity: 1;--sapBackgroundImageRepeat: false;--sapSelectedColor: #0064d9;--sapHoverColor: #eaecee;--sapActiveColor: #dee2e5;--sapHighlightTextColor: #fff;--sapTitleColor: #1d2d3e;--sapNegativeColor: #aa0808;--sapCriticalColor: #e76500;--sapPositiveColor: #256f3a;--sapInformativeColor: #0070f2;--sapNeutralColor: #788fa6;--sapNegativeElementColor: #f53232;--sapCriticalElementColor: #e76500;--sapPositiveElementColor: #30914c;--sapInformativeElementColor: #0070f2;--sapNeutralElementColor: #788fa6;--sapNegativeTextColor: #aa0808;--sapCriticalTextColor: #b44f00;--sapPositiveTextColor: #256f3a;--sapInformativeTextColor: #0064d9;--sapNeutralTextColor: #1d2d3e;--sapErrorColor: #aa0808;--sapWarningColor: #e76500;--sapSuccessColor: #256f3a;--sapInformationColor: #0070f2;--sapErrorBackground: #ffeaf4;--sapWarningBackground: #fff8d6;--sapSuccessBackground: #f5fae5;--sapInformationBackground: #e1f4ff;--sapNeutralBackground: #eff1f2;--sapErrorBorderColor: #e90b0b;--sapWarningBorderColor: #dd6100;--sapSuccessBorderColor: #30914c;--sapInformationBorderColor: #0070f2;--sapNeutralBorderColor: #788fa6;--sapElement_LineHeight: 2.75rem;--sapElement_Height: 2.25rem;--sapElement_BorderWidth: .0625rem;--sapElement_BorderCornerRadius: .75rem;--sapElement_Compact_LineHeight: 2rem;--sapElement_Compact_Height: 1.625rem;--sapElement_Condensed_LineHeight: 1.5rem;--sapElement_Condensed_Height: 1.375rem;--sapContent_LineHeight: 1.5;--sapContent_IconHeight: 1rem;--sapContent_IconColor: #1d2d3e;--sapContent_ContrastIconColor: #fff;--sapContent_NonInteractiveIconColor: #758ca4;--sapContent_MarkerIconColor: #5d36ff;--sapContent_MarkerTextColor: #046c7a;--sapContent_MeasureIndicatorColor: #556b81;--sapContent_Selected_MeasureIndicatorColor: #0064d9;--sapContent_Placeholderloading_Background: #ccc;--sapContent_Placeholderloading_Gradient: linear-gradient(to right, #ccc 0%, #ccc 20%, #999 50%, #ccc 80%, #ccc 100%);--sapContent_ImagePlaceholderBackground: #eaecee;--sapContent_ImagePlaceholderForegroundColor: #5b738b;--sapContent_RatedColor: #d27700;--sapContent_UnratedColor: #758ca4;--sapContent_BusyColor: #0064d9;--sapContent_FocusColor: #0032a5;--sapContent_FocusStyle: solid;--sapContent_FocusWidth: .125rem;--sapContent_ContrastFocusColor: #fff;--sapContent_ShadowColor: #223548;--sapContent_ContrastShadowColor: #fff;--sapContent_Shadow0: 0 0 .125rem 0 rgba(34,53,72,.2), 0 .125rem .25rem 0 rgba(34,53,72,.2);--sapContent_Shadow1: 0 0 0 .0625rem rgba(34,53,72,.48), 0 .125rem .5rem 0 rgba(34,53,72,.3);--sapContent_Shadow2: 0 0 0 .0625rem rgba(34,53,72,.48), 0 .625rem 1.875rem 0 rgba(34,53,72,.25);--sapContent_Shadow3: 0 0 0 .0625rem rgba(34,53,72,.48), 0 1.25rem 5rem 0 rgba(34,53,72,.25);--sapContent_TextShadow: 0 0 .125rem #fff;--sapContent_ContrastTextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapContent_HeaderShadow: 0 .125rem .125rem 0 rgba(34,53,72,.05), inset 0 -.0625rem 0 0 #d9d9d9;--sapContent_Interaction_Shadow: inset 0 0 0 .0625rem rgba(85,107,129,.25);--sapContent_Selected_Shadow: inset 0 0 0 .0625rem rgba(79,160,255,.5);--sapContent_Negative_Shadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapContent_Critical_Shadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapContent_Positive_Shadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapContent_Informative_Shadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapContent_Neutral_Shadow: inset 0 0 0 .0625rem rgba(120,143,166,.3);--sapContent_SearchHighlightColor: #dafdf5;--sapContent_HelpColor: #188918;--sapContent_LabelColor: #556b82;--sapContent_MonospaceFontFamily: "72Mono", "72Monofull", lucida console, monospace;--sapContent_MonospaceBoldFontFamily: "72Mono-Bold", "72Mono-Boldfull", lucida console, monospace;--sapContent_IconFontFamily: "SAP-icons";--sapContent_DisabledTextColor: rgba(29,45,62,.6);--sapContent_DisabledOpacity: .4;--sapContent_ContrastTextThreshold: .65;--sapContent_ContrastTextColor: #fff;--sapContent_ForegroundColor: #efefef;--sapContent_ForegroundBorderColor: #758ca4;--sapContent_ForegroundTextColor: #1d2d3e;--sapContent_BadgeBackground: #aa0808;--sapContent_BadgeTextColor: #fff;--sapContent_DragAndDropActiveColor: #0064d9;--sapContent_Selected_TextColor: #0064d9;--sapContent_Selected_Background: #fff;--sapContent_Selected_Hover_Background: #e3f0ff;--sapContent_Selected_ForegroundColor: #0064d9;--sapContent_ForcedColorAdjust: none;--sapContent_Illustrative_Color1: #5d36ff;--sapContent_Illustrative_Color2: #0070f2;--sapContent_Illustrative_Color3: #f58b00;--sapContent_Illustrative_Color4: #00144a;--sapContent_Illustrative_Color5: #a9b4be;--sapContent_Illustrative_Color6: #d5dadd;--sapContent_Illustrative_Color7: #ebf8ff;--sapContent_Illustrative_Color8: #fff;--sapContent_Illustrative_Color9: #64edd2;--sapContent_Illustrative_Color10: #ebf8ff;--sapContent_Illustrative_Color11: #f31ded;--sapContent_Illustrative_Color12: #00a800;--sapContent_Illustrative_Color13: #005dc9;--sapContent_Illustrative_Color14: #004da5;--sapContent_Illustrative_Color15: #cc7400;--sapContent_Illustrative_Color16: #3b0ac6;--sapContent_Illustrative_Color17: #00a58a;--sapContent_Illustrative_Color18: #d1efff;--sapContent_Illustrative_Color19: #b8e6ff;--sapContent_Illustrative_Color20: #9eddff;--sapFontLightFamily: "72-Light", "72-Lightfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontBoldFamily: "72-Bold", "72-Boldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSemiboldFamily: "72-Semibold", "72-Semiboldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSemiboldDuplexFamily: "72-SemiboldDuplex", "72-SemiboldDuplexfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontBlackFamily: "72Black", "72Blackfull","72", "72full", Arial, Helvetica, sans-serif;--sapFontHeaderFamily: "72-Bold", "72-Boldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSmallSize: .75rem;--sapFontLargeSize: 1rem;--sapFontHeader1Size: 3rem;--sapFontHeader2Size: 2rem;--sapFontHeader3Size: 1.5rem;--sapFontHeader4Size: 1.25rem;--sapFontHeader5Size: 1rem;--sapFontHeader6Size: .875rem;--sapLink_TextDecoration: none;--sapLink_Hover_Color: #0064d9;--sapLink_Hover_TextDecoration: underline;--sapLink_Active_Color: #0064d9;--sapLink_Active_TextDecoration: none;--sapLink_Visited_Color: #0064d9;--sapLink_InvertedColor: #a6cfff;--sapLink_SubtleColor: #1d2d3e;--sapShell_Background: #eff1f2;--sapShell_BackgroundImage: linear-gradient(to bottom, #eff1f2, #eff1f2);--sapShell_BackgroundImageOpacity: 1;--sapShell_BackgroundImageRepeat: false;--sapShell_BorderColor: #fff;--sapShell_TextColor: #1d2d3e;--sapShell_InteractiveBackground: #eff1f2;--sapShell_InteractiveTextColor: #1d2d3e;--sapShell_InteractiveBorderColor: #556b81;--sapShell_GroupTitleTextColor: #1d2d3e;--sapShell_GroupTitleTextShadow: 0 0 .125rem #fff;--sapShell_Hover_Background: #fff;--sapShell_Active_Background: #fff;--sapShell_Active_TextColor: #0070f2;--sapShell_Selected_Background: #fff;--sapShell_Selected_TextColor: #0070f2;--sapShell_Selected_Hover_Background: #fff;--sapShell_Favicon: none;--sapShell_Navigation_Background: #fff;--sapShell_Navigation_Hover_Background: #fff;--sapShell_Navigation_SelectedColor: #0064d9;--sapShell_Navigation_Selected_TextColor: #0064d9;--sapShell_Navigation_TextColor: #1d2d3e;--sapShell_Navigation_Active_TextColor: #0064d9;--sapShell_Navigation_Active_Background: #fff;--sapShell_Shadow: 0 .125rem .125rem 0 rgba(34,53,72,.15), inset 0 -.0625rem 0 0 rgba(34,53,72,.2);--sapShell_NegativeColor: #aa0808;--sapShell_CriticalColor: #b44f00;--sapShell_PositiveColor: #256f3a;--sapShell_InformativeColor: #0064d9;--sapShell_NeutralColor: #1d2d3e;--sapShell_Assistant_ForegroundColor: #5d36ff;--sapShell_Category_1_Background: #0057d2;--sapShell_Category_1_BorderColor: #0057d2;--sapShell_Category_1_TextColor: #fff;--sapShell_Category_1_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_2_Background: #df1278;--sapShell_Category_2_BorderColor: #df1278;--sapShell_Category_2_TextColor: #fff;--sapShell_Category_2_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_3_Background: #e76500;--sapShell_Category_3_BorderColor: #e76500;--sapShell_Category_3_TextColor: #fff;--sapShell_Category_3_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_4_Background: #7800a4;--sapShell_Category_4_BorderColor: #7800a4;--sapShell_Category_4_TextColor: #fff;--sapShell_Category_4_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_5_Background: #aa2608;--sapShell_Category_5_BorderColor: #aa2608;--sapShell_Category_5_TextColor: #fff;--sapShell_Category_5_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_6_Background: #07838f;--sapShell_Category_6_BorderColor: #07838f;--sapShell_Category_6_TextColor: #fff;--sapShell_Category_6_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_7_Background: #f31ded;--sapShell_Category_7_BorderColor: #f31ded;--sapShell_Category_7_TextColor: #fff;--sapShell_Category_7_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_8_Background: #188918;--sapShell_Category_8_BorderColor: #188918;--sapShell_Category_8_TextColor: #fff;--sapShell_Category_8_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_9_Background: #002a86;--sapShell_Category_9_BorderColor: #002a86;--sapShell_Category_9_TextColor: #fff;--sapShell_Category_9_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_10_Background: #5b738b;--sapShell_Category_10_BorderColor: #5b738b;--sapShell_Category_10_TextColor: #fff;--sapShell_Category_10_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_11_Background: #d20a0a;--sapShell_Category_11_BorderColor: #d20a0a;--sapShell_Category_11_TextColor: #fff;--sapShell_Category_11_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_12_Background: #7858ff;--sapShell_Category_12_BorderColor: #7858ff;--sapShell_Category_12_TextColor: #fff;--sapShell_Category_12_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_13_Background: #a00875;--sapShell_Category_13_BorderColor: #a00875;--sapShell_Category_13_TextColor: #fff;--sapShell_Category_13_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_14_Background: #14565b;--sapShell_Category_14_BorderColor: #14565b;--sapShell_Category_14_TextColor: #fff;--sapShell_Category_14_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_15_Background: #223548;--sapShell_Category_15_BorderColor: #223548;--sapShell_Category_15_TextColor: #fff;--sapShell_Category_15_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_16_Background: #1e592f;--sapShell_Category_16_BorderColor: #1e592f;--sapShell_Category_16_TextColor: #fff;--sapShell_Category_16_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapAssistant_Color1: #5d36ff;--sapAssistant_Color2: #a100c2;--sapAssistant_BackgroundGradient: linear-gradient(#5d36ff, #a100c2);--sapAssistant_Background: #5d36ff;--sapAssistant_BorderColor: #5d36ff;--sapAssistant_TextColor: #fff;--sapAssistant_Hover_Background: #2800cf;--sapAssistant_Hover_BorderColor: #2800cf;--sapAssistant_Hover_TextColor: #fff;--sapAssistant_Active_Background: #fff;--sapAssistant_Active_BorderColor: #5d36ff;--sapAssistant_Active_TextColor: #5d36ff;--sapAssistant_Question_Background: #eae5ff;--sapAssistant_Question_BorderColor: #eae5ff;--sapAssistant_Question_TextColor: #1d2d3e;--sapAssistant_Answer_Background: #eff1f2;--sapAssistant_Answer_BorderColor: #eff1f2;--sapAssistant_Answer_TextColor: #1d2d3e;--sapAvatar_1_Background: #fff3b8;--sapAvatar_1_BorderColor: #fff3b8;--sapAvatar_1_TextColor: #a45d00;--sapAvatar_2_Background: #ffd0e7;--sapAvatar_2_BorderColor: #ffd0e7;--sapAvatar_2_TextColor: #aa0808;--sapAvatar_3_Background: #ffdbe7;--sapAvatar_3_BorderColor: #ffdbe7;--sapAvatar_3_TextColor: #ba066c;--sapAvatar_4_Background: #ffdcf3;--sapAvatar_4_BorderColor: #ffdcf3;--sapAvatar_4_TextColor: #a100c2;--sapAvatar_5_Background: #ded3ff;--sapAvatar_5_BorderColor: #ded3ff;--sapAvatar_5_TextColor: #552cff;--sapAvatar_6_Background: #d1efff;--sapAvatar_6_BorderColor: #d1efff;--sapAvatar_6_TextColor: #0057d2;--sapAvatar_7_Background: #c2fcee;--sapAvatar_7_BorderColor: #c2fcee;--sapAvatar_7_TextColor: #046c7a;--sapAvatar_8_Background: #ebf5cb;--sapAvatar_8_BorderColor: #ebf5cb;--sapAvatar_8_TextColor: #256f3a;--sapAvatar_9_Background: #ddccf0;--sapAvatar_9_BorderColor: #ddccf0;--sapAvatar_9_TextColor: #6c32a9;--sapAvatar_10_Background: #eaecee;--sapAvatar_10_BorderColor: #eaecee;--sapAvatar_10_TextColor: #556b82;--sapButton_Background: #fff;--sapButton_BorderColor: #bcc3ca;--sapButton_BorderWidth: .0625rem;--sapButton_BorderCornerRadius: .5rem;--sapButton_TextColor: #0064d9;--sapButton_Hover_Background: #eaecee;--sapButton_Hover_BorderColor: #bcc3ca;--sapButton_Hover_TextColor: #0064d9;--sapButton_IconColor: #0064d9;--sapButton_Active_Background: #fff;--sapButton_Active_BorderColor: #0064d9;--sapButton_Active_TextColor: #0064d9;--sapButton_Emphasized_Background: #0070f2;--sapButton_Emphasized_BorderColor: #0070f2;--sapButton_Emphasized_TextColor: #fff;--sapButton_Emphasized_Hover_Background: #0064d9;--sapButton_Emphasized_Hover_BorderColor: #0064d9;--sapButton_Emphasized_Hover_TextColor: #fff;--sapButton_Emphasized_Active_Background: #fff;--sapButton_Emphasized_Active_BorderColor: #0064d9;--sapButton_Emphasized_Active_TextColor: #0064d9;--sapButton_Emphasized_TextShadow: transparent;--sapButton_Emphasized_FontWeight: bold;--sapButton_Reject_Background: #ffd6e9;--sapButton_Reject_BorderColor: #ffc2de;--sapButton_Reject_TextColor: #aa0808;--sapButton_Reject_Hover_Background: #ffbddb;--sapButton_Reject_Hover_BorderColor: #ffbddb;--sapButton_Reject_Hover_TextColor: #aa0808;--sapButton_Reject_Active_Background: #fff;--sapButton_Reject_Active_BorderColor: #e90b0b;--sapButton_Reject_Active_TextColor: #aa0808;--sapButton_Reject_Selected_Background: #fff;--sapButton_Reject_Selected_BorderColor: #e90b0b;--sapButton_Reject_Selected_TextColor: #aa0808;--sapButton_Reject_Selected_Hover_Background: #ffbddb;--sapButton_Reject_Selected_Hover_BorderColor: #e90b0b;--sapButton_Accept_Background: #ebf5cb;--sapButton_Accept_BorderColor: #dbeda0;--sapButton_Accept_TextColor: #256f3a;--sapButton_Accept_Hover_Background: #e3f1b6;--sapButton_Accept_Hover_BorderColor: #e3f1b6;--sapButton_Accept_Hover_TextColor: #256f3a;--sapButton_Accept_Active_Background: #fff;--sapButton_Accept_Active_BorderColor: #30914c;--sapButton_Accept_Active_TextColor: #256f3a;--sapButton_Accept_Selected_Background: #fff;--sapButton_Accept_Selected_BorderColor: #30914c;--sapButton_Accept_Selected_TextColor: #256f3a;--sapButton_Accept_Selected_Hover_Background: #e3f1b6;--sapButton_Accept_Selected_Hover_BorderColor: #30914c;--sapButton_Lite_Background: transparent;--sapButton_Lite_BorderColor: transparent;--sapButton_Lite_TextColor: #0064d9;--sapButton_Lite_Hover_Background: #eaecee;--sapButton_Lite_Hover_BorderColor: #bcc3ca;--sapButton_Lite_Hover_TextColor: #0064d9;--sapButton_Lite_Active_Background: #fff;--sapButton_Lite_Active_BorderColor: #0064d9;--sapButton_Selected_Background: #edf6ff;--sapButton_Selected_BorderColor: #0064d9;--sapButton_Selected_TextColor: #0064d9;--sapButton_Selected_Hover_Background: #d9ecff;--sapButton_Selected_Hover_BorderColor: #0064d9;--sapButton_Attention_Background: #fff3b7;--sapButton_Attention_BorderColor: #ffeb84;--sapButton_Attention_TextColor: #b44f00;--sapButton_Attention_Hover_Background: #ffef9e;--sapButton_Attention_Hover_BorderColor: #ffef9e;--sapButton_Attention_Hover_TextColor: #b44f00;--sapButton_Attention_Active_Background: #fff;--sapButton_Attention_Active_BorderColor: #dd6100;--sapButton_Attention_Active_TextColor: #b44f00;--sapButton_Attention_Selected_Background: #fff;--sapButton_Attention_Selected_BorderColor: #dd6100;--sapButton_Attention_Selected_TextColor: #b44f00;--sapButton_Attention_Selected_Hover_Background: #ffef9e;--sapButton_Attention_Selected_Hover_BorderColor: #dd6100;--sapButton_Negative_Background: #f53232;--sapButton_Negative_BorderColor: #f53232;--sapButton_Negative_TextColor: #fff;--sapButton_Negative_Hover_Background: #e90b0b;--sapButton_Negative_Hover_BorderColor: #e90b0b;--sapButton_Negative_Hover_TextColor: #fff;--sapButton_Negative_Active_Background: #fff;--sapButton_Negative_Active_BorderColor: #f53232;--sapButton_Negative_Active_TextColor: #aa0808;--sapButton_Critical_Background: #e76500;--sapButton_Critical_BorderColor: #e76500;--sapButton_Critical_TextColor: #fff;--sapButton_Critical_Hover_Background: #dd6100;--sapButton_Critical_Hover_BorderColor: #dd6100;--sapButton_Critical_Hover_TextColor: #fff;--sapButton_Critical_Active_Background: #fff;--sapButton_Critical_Active_BorderColor: #dd6100;--sapButton_Critical_Active_TextColor: #b44f00;--sapButton_Success_Background: #30914c;--sapButton_Success_BorderColor: #30914c;--sapButton_Success_TextColor: #fff;--sapButton_Success_Hover_Background: #2c8646;--sapButton_Success_Hover_BorderColor: #2c8646;--sapButton_Success_Hover_TextColor: #fff;--sapButton_Success_Active_Background: #fff;--sapButton_Success_Active_BorderColor: #30914c;--sapButton_Success_Active_TextColor: #256f3a;--sapButton_Information_Background: #e8f3ff;--sapButton_Information_BorderColor: #b5d8ff;--sapButton_Information_TextColor: #0064d9;--sapButton_Information_Hover_Background: #d4e8ff;--sapButton_Information_Hover_BorderColor: #b5d8ff;--sapButton_Information_Hover_TextColor: #0064d9;--sapButton_Information_Active_Background: #fff;--sapButton_Information_Active_BorderColor: #0064d9;--sapButton_Information_Active_TextColor: #0064d9;--sapButton_Neutral_Background: #e8f3ff;--sapButton_Neutral_BorderColor: #b5d8ff;--sapButton_Neutral_TextColor: #0064d9;--sapButton_Neutral_Hover_Background: #d4e8ff;--sapButton_Neutral_Hover_BorderColor: #b5d8ff;--sapButton_Neutral_Hover_TextColor: #0064d9;--sapButton_Neutral_Active_Background: #fff;--sapButton_Neutral_Active_BorderColor: #0064d9;--sapButton_Neutral_Active_TextColor: #0064d9;--sapButton_Track_Background: #788fa6;--sapButton_Track_BorderColor: #788fa6;--sapButton_Track_TextColor: #fff;--sapButton_Track_Hover_Background: #637d97;--sapButton_Track_Hover_BorderColor: #637d97;--sapButton_Track_Selected_Background: #0064d9;--sapButton_Track_Selected_BorderColor: #0064d9;--sapButton_Track_Selected_TextColor: #fff;--sapButton_Track_Selected_Hover_Background: #0058c0;--sapButton_Track_Selected_Hover_BorderColor: #0058c0;--sapButton_Handle_Background: #fff;--sapButton_Handle_BorderColor: #fff;--sapButton_Handle_TextColor: #1d2d3e;--sapButton_Handle_Hover_Background: #fff;--sapButton_Handle_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_Handle_Selected_Background: #edf6ff;--sapButton_Handle_Selected_BorderColor: #edf6ff;--sapButton_Handle_Selected_TextColor: #0064d9;--sapButton_Handle_Selected_Hover_Background: #edf6ff;--sapButton_Handle_Selected_Hover_BorderColor: rgba(237,246,255,.5);--sapButton_Track_Negative_Background: #f53232;--sapButton_Track_Negative_BorderColor: #f53232;--sapButton_Track_Negative_TextColor: #fff;--sapButton_Track_Negative_Hover_Background: #e90b0b;--sapButton_Track_Negative_Hover_BorderColor: #e90b0b;--sapButton_Handle_Negative_Background: #fff;--sapButton_Handle_Negative_BorderColor: #fff;--sapButton_Handle_Negative_TextColor: #aa0808;--sapButton_Handle_Negative_Hover_Background: #fff;--sapButton_Handle_Negative_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_Track_Positive_Background: #30914c;--sapButton_Track_Positive_BorderColor: #30914c;--sapButton_Track_Positive_TextColor: #fff;--sapButton_Track_Positive_Hover_Background: #2c8646;--sapButton_Track_Positive_Hover_BorderColor: #2c8646;--sapButton_Handle_Positive_Background: #fff;--sapButton_Handle_Positive_BorderColor: #fff;--sapButton_Handle_Positive_TextColor: #256f3a;--sapButton_Handle_Positive_Hover_Background: #fff;--sapButton_Handle_Positive_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_TokenBackground: #fff;--sapButton_TokenBorderColor: #bcc3ca;--sapField_Background: #fff;--sapField_BackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #556b81, #556b81) border-box;--sapField_TextColor: #131e29;--sapField_PlaceholderTextColor: #556b82;--sapField_BorderColor: #556b81;--sapField_HelpBackground: #fff;--sapField_BorderWidth: .0625rem;--sapField_BorderStyle: none;--sapField_BorderCornerRadius: .25rem;--sapField_Shadow: inset 0 0 0 .0625rem rgba(85,107,129,.25);--sapField_Hover_Background: #fff;--sapField_Hover_BackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #0064d9, #0064d9) border-box;--sapField_Hover_BorderColor: #0064d9;--sapField_Hover_HelpBackground: #fff;--sapField_Hover_Shadow: inset 0 0 0 .0625rem rgba(79,160,255,.5);--sapField_Hover_InvalidShadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapField_Hover_WarningShadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapField_Hover_SuccessShadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapField_Hover_InformationShadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapField_Active_BorderColor: #0064d9;--sapField_Focus_Background: #fff;--sapField_Focus_BorderColor: #0032a5;--sapField_Focus_HelpBackground: #fff;--sapField_ReadOnly_Background: #eaecee;--sapField_ReadOnly_BackgroundStyle: 0 100% / .375rem .0625rem repeat-x linear-gradient(90deg, #556b81 0, #556b81 .25rem, transparent .25rem) border-box;--sapField_ReadOnly_BorderColor: #556b81;--sapField_ReadOnly_BorderStyle: none;--sapField_ReadOnly_HelpBackground: #eaecee;--sapField_RequiredColor: #ba066c;--sapField_InvalidColor: #e90b0b;--sapField_InvalidBackground: #ffeaf4;--sapField_InvalidBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #e90b0b, #e90b0b) border-box;--sapField_InvalidBorderWidth: .125rem;--sapField_InvalidBorderStyle: none;--sapField_InvalidShadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapField_WarningColor: #dd6100;--sapField_WarningBackground: #fff8d6;--sapField_WarningBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #dd6100, #dd6100) border-box;--sapField_WarningBorderWidth: .125rem;--sapField_WarningBorderStyle: none;--sapField_WarningShadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapField_SuccessColor: #30914c;--sapField_SuccessBackground: #f5fae5;--sapField_SuccessBackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #30914c, #30914c) border-box;--sapField_SuccessBorderWidth: .0625rem;--sapField_SuccessBorderStyle: none;--sapField_SuccessShadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapField_InformationColor: #0070f2;--sapField_InformationBackground: #e1f4ff;--sapField_InformationBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #0070f2, #0070f2) border-box;--sapField_InformationBorderWidth: .125rem;--sapField_InformationBorderStyle: none;--sapField_InformationShadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapGroup_TitleBackground: #fff;--sapGroup_TitleBorderColor: #a8b2bd;--sapGroup_TitleTextColor: #1d2d3e;--sapGroup_Title_FontSize: 1rem;--sapGroup_ContentBackground: #fff;--sapGroup_ContentBorderColor: #d9d9d9;--sapGroup_BorderWidth: .0625rem;--sapGroup_BorderCornerRadius: .5rem;--sapGroup_FooterBackground: transparent;--sapToolbar_Background: #fff;--sapToolbar_SeparatorColor: #d9d9d9;--sapList_HeaderBackground: #fff;--sapList_HeaderBorderColor: #a8b2bd;--sapList_HeaderTextColor: #1d2d3e;--sapList_BorderColor: #e5e5e5;--sapList_BorderWidth: .0625rem;--sapList_TextColor: #1d2d3e;--sapList_Active_TextColor: #1d2d3e;--sapList_Active_Background: #dee2e5;--sapList_SelectionBackgroundColor: #ebf8ff;--sapList_SelectionBorderColor: #0064d9;--sapList_Hover_SelectionBackground: #dcf3ff;--sapList_Background: #fff;--sapList_Hover_Background: #eaecee;--sapList_AlternatingBackground: #f5f6f7;--sapList_GroupHeaderBackground: #fff;--sapList_GroupHeaderBorderColor: #a8b2bd;--sapList_GroupHeaderTextColor: #1d2d3e;--sapList_TableGroupHeaderBackground: #eff1f2;--sapList_TableGroupHeaderBorderColor: #a8b2bd;--sapList_TableGroupHeaderTextColor: #1d2d3e;--sapList_FooterBackground: #fff;--sapList_FooterTextColor: #1d2d3e;--sapList_TableFooterBorder: #a8b2bd;--sapList_TableFixedBorderColor: #8c8c8c;--sapMessage_ErrorBorderColor: #ff8ec4;--sapMessage_WarningBorderColor: #ffe770;--sapMessage_SuccessBorderColor: #cee67e;--sapMessage_InformationBorderColor: #7bcfff;--sapPopover_BorderCornerRadius: .5rem;--sapProgress_Background: #d5dadd;--sapProgress_BorderColor: #d5dadd;--sapProgress_TextColor: #1d2d3e;--sapProgress_FontSize: .875rem;--sapProgress_NegativeBackground: #ffdbec;--sapProgress_NegativeBorderColor: #ffdbec;--sapProgress_NegativeTextColor: #1d2d3e;--sapProgress_CriticalBackground: #fff4bd;--sapProgress_CriticalBorderColor: #fff4bd;--sapProgress_CriticalTextColor: #1d2d3e;--sapProgress_PositiveBackground: #e5f2ba;--sapProgress_PositiveBorderColor: #e5f2ba;--sapProgress_PositiveTextColor: #1d2d3e;--sapProgress_InformationBackground: #cdedff;--sapProgress_InformationBorderColor: #cdedff;--sapProgress_InformationTextColor: #1d2d3e;--sapProgress_Value_Background: #617b94;--sapProgress_Value_BorderColor: #617b94;--sapProgress_Value_TextColor: #788fa6;--sapProgress_Value_NegativeBackground: #f53232;--sapProgress_Value_NegativeBorderColor: #f53232;--sapProgress_Value_NegativeTextColor: #f53232;--sapProgress_Value_CriticalBackground: #e76500;--sapProgress_Value_CriticalBorderColor: #e76500;--sapProgress_Value_CriticalTextColor: #e76500;--sapProgress_Value_PositiveBackground: #30914c;--sapProgress_Value_PositiveBorderColor: #30914c;--sapProgress_Value_PositiveTextColor: #30914c;--sapProgress_Value_InformationBackground: #0070f2;--sapProgress_Value_InformationBorderColor: #0070f2;--sapProgress_Value_InformationTextColor: #0070f2;--sapScrollBar_FaceColor: #7b91a8;--sapScrollBar_TrackColor: #fff;--sapScrollBar_BorderColor: #7b91a8;--sapScrollBar_SymbolColor: #0064d9;--sapScrollBar_Dimension: .75rem;--sapScrollBar_Hover_FaceColor: #5b728b;--sapSlider_Background: #d5dadd;--sapSlider_BorderColor: #d5dadd;--sapSlider_Selected_Background: #0064d9;--sapSlider_Selected_BorderColor: #0064d9;--sapSlider_HandleBackground: #fff;--sapSlider_HandleBorderColor: #b0d5ff;--sapSlider_RangeHandleBackground: #fff;--sapSlider_Hover_HandleBackground: #d9ecff;--sapSlider_Hover_HandleBorderColor: #b0d5ff;--sapSlider_Hover_RangeHandleBackground: #d9ecff;--sapSlider_Active_HandleBackground: #fff;--sapSlider_Active_HandleBorderColor: #0064d9;--sapSlider_Active_RangeHandleBackground: transparent;--sapPageHeader_Background: #fff;--sapPageHeader_BorderColor: #d9d9d9;--sapPageHeader_TextColor: #1d2d3e;--sapPageFooter_Background: #fff;--sapPageFooter_BorderColor: #d9d9d9;--sapPageFooter_TextColor: #1d2d3e;--sapInfobar_Background: #c2fcee;--sapInfobar_Hover_Background: #fff;--sapInfobar_Active_Background: #fff;--sapInfobar_NonInteractive_Background: #f5f6f7;--sapInfobar_TextColor: #046c7a;--sapObjectHeader_Background: #fff;--sapObjectHeader_Hover_Background: #eaecee;--sapObjectHeader_BorderColor: #d9d9d9;--sapObjectHeader_Title_TextColor: #1d2d3e;--sapObjectHeader_Title_FontSize: 1.5rem;--sapObjectHeader_Title_SnappedFontSize: 1.25rem;--sapObjectHeader_Title_FontFamily: "72Black", "72Blackfull","72", "72full", Arial, Helvetica, sans-serif;--sapObjectHeader_Subtitle_TextColor: #556b82;--sapBlockLayer_Background: #000;--sapTile_Background: #fff;--sapTile_Hover_Background: #eaecee;--sapTile_Active_Background: #dee2e5;--sapTile_BorderColor: transparent;--sapTile_BorderCornerRadius: 1rem;--sapTile_TitleTextColor: #1d2d3e;--sapTile_TextColor: #556b82;--sapTile_IconColor: #556b82;--sapTile_SeparatorColor: #ccc;--sapTile_Interactive_BorderColor: #b3b3b3;--sapTile_OverlayBackground: #fff;--sapTile_OverlayForegroundColor: #1d2d3e;--sapAccentColor1: #d27700;--sapAccentColor2: #aa0808;--sapAccentColor3: #ba066c;--sapAccentColor4: #a100c2;--sapAccentColor5: #5d36ff;--sapAccentColor6: #0057d2;--sapAccentColor7: #046c7a;--sapAccentColor8: #256f3a;--sapAccentColor9: #6c32a9;--sapAccentColor10: #5b738b;--sapAccentBackgroundColor1: #fff3b8;--sapAccentBackgroundColor2: #ffd0e7;--sapAccentBackgroundColor3: #ffdbe7;--sapAccentBackgroundColor4: #ffdcf3;--sapAccentBackgroundColor5: #ded3ff;--sapAccentBackgroundColor6: #d1efff;--sapAccentBackgroundColor7: #c2fcee;--sapAccentBackgroundColor8: #ebf5cb;--sapAccentBackgroundColor9: #ddccf0;--sapAccentBackgroundColor10: #eaecee;--sapIndicationColor_1: #840606;--sapIndicationColor_1_Background: #840606;--sapIndicationColor_1_BorderColor: #840606;--sapIndicationColor_1_TextColor: #fff;--sapIndicationColor_1_Hover_Background: #6c0505;--sapIndicationColor_1_Active_Background: #fff;--sapIndicationColor_1_Active_BorderColor: #fb9d9d;--sapIndicationColor_1_Active_TextColor: #840606;--sapIndicationColor_1_Selected_Background: #fff;--sapIndicationColor_1_Selected_BorderColor: #fb9d9d;--sapIndicationColor_1_Selected_TextColor: #840606;--sapIndicationColor_1b: #fb9d9d;--sapIndicationColor_1b_BorderColor: #fb9d9d;--sapIndicationColor_1b_Hover_Background: #fa8585;--sapIndicationColor_2: #aa0808;--sapIndicationColor_2_Background: #aa0808;--sapIndicationColor_2_BorderColor: #aa0808;--sapIndicationColor_2_TextColor: #fff;--sapIndicationColor_2_Hover_Background: #920707;--sapIndicationColor_2_Active_Background: #fff;--sapIndicationColor_2_Active_BorderColor: #fcc4c4;--sapIndicationColor_2_Active_TextColor: #aa0808;--sapIndicationColor_2_Selected_Background: #fff;--sapIndicationColor_2_Selected_BorderColor: #fcc4c4;--sapIndicationColor_2_Selected_TextColor: #aa0808;--sapIndicationColor_2b: #fcc4c4;--sapIndicationColor_2b_BorderColor: #fcc4c4;--sapIndicationColor_2b_Hover_Background: #fbacac;--sapIndicationColor_3: #b95100;--sapIndicationColor_3_Background: #e76500;--sapIndicationColor_3_BorderColor: #e76500;--sapIndicationColor_3_TextColor: #fff;--sapIndicationColor_3_Hover_Background: #d85e00;--sapIndicationColor_3_Active_Background: #fff;--sapIndicationColor_3_Active_BorderColor: #fff2c0;--sapIndicationColor_3_Active_TextColor: #b95100;--sapIndicationColor_3_Selected_Background: #fff;--sapIndicationColor_3_Selected_BorderColor: #fff2c0;--sapIndicationColor_3_Selected_TextColor: #b95100;--sapIndicationColor_3b: #fff2c0;--sapIndicationColor_3b_BorderColor: #fff2c0;--sapIndicationColor_3b_Hover_Background: #ffeda6;--sapIndicationColor_4: #256f3a;--sapIndicationColor_4_Background: #256f3a;--sapIndicationColor_4_BorderColor: #256f3a;--sapIndicationColor_4_TextColor: #fff;--sapIndicationColor_4_Hover_Background: #1f5c30;--sapIndicationColor_4_Active_Background: #fff;--sapIndicationColor_4_Active_BorderColor: #bae8bc;--sapIndicationColor_4_Active_TextColor: #256f3a;--sapIndicationColor_4_Selected_Background: #fff;--sapIndicationColor_4_Selected_BorderColor: #bae8bc;--sapIndicationColor_4_Selected_TextColor: #256f3a;--sapIndicationColor_4b: #bae8bc;--sapIndicationColor_4b_BorderColor: #bae8bc;--sapIndicationColor_4b_Hover_Background: #a7e2a9;--sapIndicationColor_5: #0070f2;--sapIndicationColor_5_Background: #0070f2;--sapIndicationColor_5_BorderColor: #0070f2;--sapIndicationColor_5_TextColor: #fff;--sapIndicationColor_5_Hover_Background: #0064d9;--sapIndicationColor_5_Active_Background: #fff;--sapIndicationColor_5_Active_BorderColor: #d3effd;--sapIndicationColor_5_Active_TextColor: #0070f2;--sapIndicationColor_5_Selected_Background: #fff;--sapIndicationColor_5_Selected_BorderColor: #d3effd;--sapIndicationColor_5_Selected_TextColor: #0070f2;--sapIndicationColor_5b: #d3effd;--sapIndicationColor_5b_BorderColor: #d3effd;--sapIndicationColor_5b_Hover_Background: #bbe6fc;--sapIndicationColor_6: #046c7a;--sapIndicationColor_6_Background: #046c7a;--sapIndicationColor_6_BorderColor: #046c7a;--sapIndicationColor_6_TextColor: #fff;--sapIndicationColor_6_Hover_Background: #035661;--sapIndicationColor_6_Active_Background: #fff;--sapIndicationColor_6_Active_BorderColor: #cdf5ec;--sapIndicationColor_6_Active_TextColor: #046c7a;--sapIndicationColor_6_Selected_Background: #fff;--sapIndicationColor_6_Selected_BorderColor: #cdf5ec;--sapIndicationColor_6_Selected_TextColor: #046c7a;--sapIndicationColor_6b: #cdf5ec;--sapIndicationColor_6b_BorderColor: #cdf5ec;--sapIndicationColor_6b_Hover_Background: #b8f1e4;--sapIndicationColor_7: #5d36ff;--sapIndicationColor_7_Background: #5d36ff;--sapIndicationColor_7_BorderColor: #5d36ff;--sapIndicationColor_7_TextColor: #fff;--sapIndicationColor_7_Hover_Background: #481cff;--sapIndicationColor_7_Active_Background: #fff;--sapIndicationColor_7_Active_BorderColor: #e2dbff;--sapIndicationColor_7_Active_TextColor: #5d36ff;--sapIndicationColor_7_Selected_Background: #fff;--sapIndicationColor_7_Selected_BorderColor: #e2dbff;--sapIndicationColor_7_Selected_TextColor: #5d36ff;--sapIndicationColor_7b: #e2dbff;--sapIndicationColor_7b_BorderColor: #e2dbff;--sapIndicationColor_7b_Hover_Background: #cdc2ff;--sapIndicationColor_8: #a100c2;--sapIndicationColor_8_Background: #a100c2;--sapIndicationColor_8_BorderColor: #a100c2;--sapIndicationColor_8_TextColor: #fff;--sapIndicationColor_8_Hover_Background: #8c00a9;--sapIndicationColor_8_Active_Background: #fff;--sapIndicationColor_8_Active_BorderColor: #f8d6ff;--sapIndicationColor_8_Active_TextColor: #a100c2;--sapIndicationColor_8_Selected_Background: #fff;--sapIndicationColor_8_Selected_BorderColor: #f8d6ff;--sapIndicationColor_8_Selected_TextColor: #a100c2;--sapIndicationColor_8b: #f8d6ff;--sapIndicationColor_8b_BorderColor: #f8d6ff;--sapIndicationColor_8b_Hover_Background: #f4bdff;--sapIndicationColor_9: #1d2d3e;--sapIndicationColor_9_Background: #1d2d3e;--sapIndicationColor_9_BorderColor: #1d2d3e;--sapIndicationColor_9_TextColor: #fff;--sapIndicationColor_9_Hover_Background: #15202d;--sapIndicationColor_9_Active_Background: #fff;--sapIndicationColor_9_Active_BorderColor: #d9d9d9;--sapIndicationColor_9_Active_TextColor: #1d2d3e;--sapIndicationColor_9_Selected_Background: #fff;--sapIndicationColor_9_Selected_BorderColor: #d9d9d9;--sapIndicationColor_9_Selected_TextColor: #1d2d3e;--sapIndicationColor_9b: #fff;--sapIndicationColor_9b_BorderColor: #d9d9d9;--sapIndicationColor_9b_Hover_Background: #f2f2f2;--sapIndicationColor_10: #45484a;--sapIndicationColor_10_Background: #83888b;--sapIndicationColor_10_BorderColor: #83888b;--sapIndicationColor_10_TextColor: #fff;--sapIndicationColor_10_Hover_Background: #767b7e;--sapIndicationColor_10_Active_Background: #fff;--sapIndicationColor_10_Active_BorderColor: #eaecee;--sapIndicationColor_10_Active_TextColor: #45484a;--sapIndicationColor_10_Selected_Background: #fff;--sapIndicationColor_10_Selected_BorderColor: #eaecee;--sapIndicationColor_10_Selected_TextColor: #45484a;--sapIndicationColor_10b: #eaecee;--sapIndicationColor_10b_BorderColor: #eaecee;--sapIndicationColor_10b_Hover_Background: #dcdfe3;--sapLegend_WorkingBackground: #fff;--sapLegend_NonWorkingBackground: #ebebeb;--sapLegend_CurrentDateTime: #a100c2;--sapLegendColor1: #c35500;--sapLegendColor2: #d23a0a;--sapLegendColor3: #df1278;--sapLegendColor4: #840606;--sapLegendColor5: #cc00dc;--sapLegendColor6: #0057d2;--sapLegendColor7: #07838f;--sapLegendColor8: #188918;--sapLegendColor9: #5b738b;--sapLegendColor10: #7800a4;--sapLegendColor11: #a93e00;--sapLegendColor12: #aa2608;--sapLegendColor13: #ba066c;--sapLegendColor14: #8d2a00;--sapLegendColor15: #4e247a;--sapLegendColor16: #002a86;--sapLegendColor17: #035663;--sapLegendColor18: #1e592f;--sapLegendColor19: #1a4796;--sapLegendColor20: #470ced;--sapLegendBackgroundColor1: #ffef9f;--sapLegendBackgroundColor2: #feeae1;--sapLegendBackgroundColor3: #fbf6f8;--sapLegendBackgroundColor4: #fbebeb;--sapLegendBackgroundColor5: #ffe5fe;--sapLegendBackgroundColor6: #d1efff;--sapLegendBackgroundColor7: #c2fcee;--sapLegendBackgroundColor8: #f5fae5;--sapLegendBackgroundColor9: #f5f6f7;--sapLegendBackgroundColor10: #fff0fa;--sapLegendBackgroundColor11: #fff8d6;--sapLegendBackgroundColor12: #fff6f6;--sapLegendBackgroundColor13: #f7ebef;--sapLegendBackgroundColor14: #f1ecd5;--sapLegendBackgroundColor15: #f0e7f8;--sapLegendBackgroundColor16: #ebf8ff;--sapLegendBackgroundColor17: #dafdf5;--sapLegendBackgroundColor18: #ebf5cb;--sapLegendBackgroundColor19: #fafdff;--sapLegendBackgroundColor20: #eceeff;--sapChart_OrderedColor_1: #0070f2;--sapChart_OrderedColor_2: #c87b00;--sapChart_OrderedColor_3: #75980b;--sapChart_OrderedColor_4: #df1278;--sapChart_OrderedColor_5: #8b47d7;--sapChart_OrderedColor_6: #049f9a;--sapChart_OrderedColor_7: #3c8cdd;--sapChart_OrderedColor_8: #cc00dc;--sapChart_OrderedColor_9: #798c77;--sapChart_OrderedColor_10: #da6c6c;--sapChart_OrderedColor_11: #5d36ff;--sapChart_Bad: #f53232;--sapChart_Critical: #e76500;--sapChart_Good: #30914c;--sapChart_Neutral: #788fa6;--sapChart_Sequence_1: #0070f2;--sapChart_Sequence_2: #c87b00;--sapChart_Sequence_3: #75980b;--sapChart_Sequence_4: #df1278;--sapChart_Sequence_5: #8b47d7;--sapChart_Sequence_6: #049f9a;--sapChart_Sequence_7: #3c8cdd;--sapChart_Sequence_8: #cc00dc;--sapChart_Sequence_9: #798c77;--sapChart_Sequence_10: #da6c6c;--sapChart_Sequence_11: #5d36ff;--sapChart_Sequence_Neutral: #788fa6;}
` }, Ja = { packageName: "@ui5/webcomponents", fileName: "themes/sap_horizon/parameters-bundle.css.ts", content: `:root{--ui5-v1-24-0-avatar-hover-box-shadow-offset: 0px 0px 0px .0625rem;--ui5-v1-24-0-avatar-initials-color: var(--sapContent_ImagePlaceholderForegroundColor);--ui5-v1-24-0-avatar-border-radius-img-deduction: .0625rem;--_ui5-v1-24-0_avatar_outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-24-0_avatar_focus_width: .0625rem;--_ui5-v1-24-0_avatar_focus_color: var(--sapContent_FocusColor);--_ui5-v1-24-0_avatar_focus_offset: .1875rem;--ui5-v1-24-0-avatar-initials-border: .0625rem solid var(--sapAvatar_1_BorderColor);--ui5-v1-24-0-avatar-border-radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-24-0_avatar_fontsize_XS: 1rem;--_ui5-v1-24-0_avatar_fontsize_S: 1.125rem;--_ui5-v1-24-0_avatar_fontsize_M: 1.5rem;--_ui5-v1-24-0_avatar_fontsize_L: 2.25rem;--_ui5-v1-24-0_avatar_fontsize_XL: 3rem;--ui5-v1-24-0-avatar-accent1: var(--sapAvatar_1_Background);--ui5-v1-24-0-avatar-accent2: var(--sapAvatar_2_Background);--ui5-v1-24-0-avatar-accent3: var(--sapAvatar_3_Background);--ui5-v1-24-0-avatar-accent4: var(--sapAvatar_4_Background);--ui5-v1-24-0-avatar-accent5: var(--sapAvatar_5_Background);--ui5-v1-24-0-avatar-accent6: var(--sapAvatar_6_Background);--ui5-v1-24-0-avatar-accent7: var(--sapAvatar_7_Background);--ui5-v1-24-0-avatar-accent8: var(--sapAvatar_8_Background);--ui5-v1-24-0-avatar-accent9: var(--sapAvatar_9_Background);--ui5-v1-24-0-avatar-accent10: var(--sapAvatar_10_Background);--ui5-v1-24-0-avatar-placeholder: var(--sapContent_ImagePlaceholderBackground);--ui5-v1-24-0-avatar-accent1-color: var(--sapAvatar_1_TextColor);--ui5-v1-24-0-avatar-accent2-color: var(--sapAvatar_2_TextColor);--ui5-v1-24-0-avatar-accent3-color: var(--sapAvatar_3_TextColor);--ui5-v1-24-0-avatar-accent4-color: var(--sapAvatar_4_TextColor);--ui5-v1-24-0-avatar-accent5-color: var(--sapAvatar_5_TextColor);--ui5-v1-24-0-avatar-accent6-color: var(--sapAvatar_6_TextColor);--ui5-v1-24-0-avatar-accent7-color: var(--sapAvatar_7_TextColor);--ui5-v1-24-0-avatar-accent8-color: var(--sapAvatar_8_TextColor);--ui5-v1-24-0-avatar-accent9-color: var(--sapAvatar_9_TextColor);--ui5-v1-24-0-avatar-accent10-color: var(--sapAvatar_10_TextColor);--ui5-v1-24-0-avatar-placeholder-color: var(--sapContent_ImagePlaceholderForegroundColor);--ui5-v1-24-0-avatar-accent1-border-color: var(--sapAvatar_1_BorderColor);--ui5-v1-24-0-avatar-accent2-border-color: var(--sapAvatar_2_BorderColor);--ui5-v1-24-0-avatar-accent3-border-color: var(--sapAvatar_3_BorderColor);--ui5-v1-24-0-avatar-accent4-border-color: var(--sapAvatar_4_BorderColor);--ui5-v1-24-0-avatar-accent5-border-color: var(--sapAvatar_5_BorderColor);--ui5-v1-24-0-avatar-accent6-border-color: var(--sapAvatar_6_BorderColor);--ui5-v1-24-0-avatar-accent7-border-color: var(--sapAvatar_7_BorderColor);--ui5-v1-24-0-avatar-accent8-border-color: var(--sapAvatar_8_BorderColor);--ui5-v1-24-0-avatar-accent9-border-color: var(--sapAvatar_9_BorderColor);--ui5-v1-24-0-avatar-accent10-border-color: var(--sapAvatar_10_BorderColor);--ui5-v1-24-0-avatar-placeholder-border-color: var(--sapContent_ImagePlaceholderBackground);--_ui5-v1-24-0_avatar_icon_XS: var(--_ui5-v1-24-0_avatar_fontsize_XS);--_ui5-v1-24-0_avatar_icon_S: var(--_ui5-v1-24-0_avatar_fontsize_S);--_ui5-v1-24-0_avatar_icon_M: var(--_ui5-v1-24-0_avatar_fontsize_M);--_ui5-v1-24-0_avatar_icon_L: var(--_ui5-v1-24-0_avatar_fontsize_L);--_ui5-v1-24-0_avatar_icon_XL: var(--_ui5-v1-24-0_avatar_fontsize_XL);--_ui5-v1-24-0_avatar_group_button_focus_border: none;--_ui5-v1-24-0_avatar_group_focus_border_radius: .375rem;--_ui5-v1-24-0-badge-icon-width: .75rem;--ui5-v1-24-0-badge-text-shadow: var(--sapContent_TextShadow);--ui5-v1-24-0-badge-contrast-text-shadow: var(--sapContent_ContrastTextShadow);--ui5-v1-24-0-badge-color-scheme-1-border: var(--sapAccentColor1);--ui5-v1-24-0-badge-color-scheme-2-border: var(--sapAccentColor2);--ui5-v1-24-0-badge-color-scheme-3-border: var(--sapAccentColor3);--ui5-v1-24-0-badge-color-scheme-4-border: var(--sapAccentColor4);--ui5-v1-24-0-badge-color-scheme-5-border: var(--sapAccentColor5);--ui5-v1-24-0-badge-color-scheme-6-border: var(--sapAccentColor6);--ui5-v1-24-0-badge-color-scheme-7-border: var(--sapAccentColor7);--ui5-v1-24-0-badge-color-scheme-8-border: var(--sapLegendColor18);--ui5-v1-24-0-badge-color-scheme-9-border: var(--sapAccentColor10);--ui5-v1-24-0-badge-color-scheme-10-border: var(--sapAccentColor9);--ui5-v1-24-0-badge-set2-color-scheme-1-color: var(--sapIndicationColor_1);--ui5-v1-24-0-badge-set2-color-scheme-1-background: var(--sapIndicationColor_1b);--ui5-v1-24-0-badge-set2-color-scheme-1-border: var(--sapIndicationColor_1b_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-1-hover-background: var(--sapIndicationColor_1b_Hover_Background);--ui5-v1-24-0-badge-set2-color-scheme-1-active-color: var(--sapIndicationColor_1_Active_TextColor);--ui5-v1-24-0-badge-set2-color-scheme-1-active-background: var(--sapIndicationColor_1_Active_Background);--ui5-v1-24-0-badge-set2-color-scheme-1-active-border: var(--sapIndicationColor_1_Active_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-2-color: var(--sapIndicationColor_2);--ui5-v1-24-0-badge-set2-color-scheme-2-background: var(--sapIndicationColor_2b);--ui5-v1-24-0-badge-set2-color-scheme-2-border: var(--sapIndicationColor_2b_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-2-hover-background: var(--sapIndicationColor_2b_Hover_Background);--ui5-v1-24-0-badge-set2-color-scheme-2-active-color: var(--sapIndicationColor_2_Active_TextColor);--ui5-v1-24-0-badge-set2-color-scheme-2-active-background: var(--sapIndicationColor_2_Active_Background);--ui5-v1-24-0-badge-set2-color-scheme-2-active-border: var(--sapIndicationColor_2_Active_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-3-color: var(--sapIndicationColor_3);--ui5-v1-24-0-badge-set2-color-scheme-3-background: var(--sapIndicationColor_3b);--ui5-v1-24-0-badge-set2-color-scheme-3-border: var(--sapIndicationColor_3b_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-3-hover-background: var(--sapIndicationColor_3b_Hover_Background);--ui5-v1-24-0-badge-set2-color-scheme-3-active-color: var(--sapIndicationColor_3_Active_TextColor);--ui5-v1-24-0-badge-set2-color-scheme-3-active-background: var(--sapIndicationColor_3_Active_Background);--ui5-v1-24-0-badge-set2-color-scheme-3-active-border: var(--sapIndicationColor_3_Active_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-4-color: var(--sapIndicationColor_4);--ui5-v1-24-0-badge-set2-color-scheme-4-background: var(--sapIndicationColor_4b);--ui5-v1-24-0-badge-set2-color-scheme-4-border: var(--sapIndicationColor_4b_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-4-hover-background: var(--sapIndicationColor_4b_Hover_Background);--ui5-v1-24-0-badge-set2-color-scheme-4-active-color: var(--sapIndicationColor_4_Active_TextColor);--ui5-v1-24-0-badge-set2-color-scheme-4-active-background: var(--sapIndicationColor_4_Active_Background);--ui5-v1-24-0-badge-set2-color-scheme-4-active-border: var(--sapIndicationColor_4_Active_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-5-color: var(--sapIndicationColor_5);--ui5-v1-24-0-badge-set2-color-scheme-5-background: var(--sapIndicationColor_5b);--ui5-v1-24-0-badge-set2-color-scheme-5-border: var(--sapIndicationColor_5b_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-5-hover-background: var(--sapIndicationColor_5b_Hover_Background);--ui5-v1-24-0-badge-set2-color-scheme-5-active-color: var(--sapIndicationColor_5_Active_TextColor);--ui5-v1-24-0-badge-set2-color-scheme-5-active-background: var(--sapIndicationColor_5_Active_Background);--ui5-v1-24-0-badge-set2-color-scheme-5-active-border: var(--sapIndicationColor_5_Active_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-6-color: var(--sapIndicationColor_6);--ui5-v1-24-0-badge-set2-color-scheme-6-background: var(--sapIndicationColor_6b);--ui5-v1-24-0-badge-set2-color-scheme-6-border: var(--sapIndicationColor_6b_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-6-hover-background: var(--sapIndicationColor_6b_Hover_Background);--ui5-v1-24-0-badge-set2-color-scheme-6-active-color: var(--sapIndicationColor_6_Active_TextColor);--ui5-v1-24-0-badge-set2-color-scheme-6-active-background: var(--sapIndicationColor_6_Active_Background);--ui5-v1-24-0-badge-set2-color-scheme-6-active-border: var(--sapIndicationColor_6_Active_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-7-color: var(--sapIndicationColor_7);--ui5-v1-24-0-badge-set2-color-scheme-7-background: var(--sapIndicationColor_7b);--ui5-v1-24-0-badge-set2-color-scheme-7-border: var(--sapIndicationColor_7b_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-7-hover-background: var(--sapIndicationColor_7b_Hover_Background);--ui5-v1-24-0-badge-set2-color-scheme-7-active-color: var(--sapIndicationColor_7_Active_TextColor);--ui5-v1-24-0-badge-set2-color-scheme-7-active-background: var(--sapIndicationColor_7_Active_Background);--ui5-v1-24-0-badge-set2-color-scheme-7-active-border: var(--sapIndicationColor_7_Active_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-8-color: var(--sapIndicationColor_8);--ui5-v1-24-0-badge-set2-color-scheme-8-background: var(--sapIndicationColor_8b);--ui5-v1-24-0-badge-set2-color-scheme-8-border: var(--sapIndicationColor_8b_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-8-hover-background: var(--sapIndicationColor_8b_Hover_Background);--ui5-v1-24-0-badge-set2-color-scheme-8-active-color: var(--sapIndicationColor_8_Active_TextColor);--ui5-v1-24-0-badge-set2-color-scheme-8-active-background: var(--sapIndicationColor_8_Active_Background);--ui5-v1-24-0-badge-set2-color-scheme-8-active-border: var(--sapIndicationColor_8_Active_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-9-color: var(--sapIndicationColor_9);--ui5-v1-24-0-badge-set2-color-scheme-9-background: var(--sapIndicationColor_9b);--ui5-v1-24-0-badge-set2-color-scheme-9-border: var(--sapIndicationColor_9b_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-9-hover-background: var(--sapIndicationColor_9b_Hover_Background);--ui5-v1-24-0-badge-set2-color-scheme-9-active-color: var(--sapIndicationColor_9_Active_TextColor);--ui5-v1-24-0-badge-set2-color-scheme-9-active-background: var(--sapIndicationColor_9_Active_Background);--ui5-v1-24-0-badge-set2-color-scheme-9-active-border: var(--sapIndicationColor_9_Active_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-10-color: var(--sapIndicationColor_10);--ui5-v1-24-0-badge-set2-color-scheme-10-background: var(--sapIndicationColor_10b);--ui5-v1-24-0-badge-set2-color-scheme-10-border: var(--sapIndicationColor_10b_BorderColor);--ui5-v1-24-0-badge-set2-color-scheme-10-hover-background: var(--sapIndicationColor_10b_Hover_Background);--ui5-v1-24-0-badge-set2-color-scheme-10-active-color: var(--sapIndicationColor_10_Active_TextColor);--ui5-v1-24-0-badge-set2-color-scheme-10-active-background: var(--sapIndicationColor_10_Active_Background);--ui5-v1-24-0-badge-set2-color-scheme-10-active-border: var(--sapIndicationColor_10_Active_BorderColor);--_ui5-v1-24-0-badge-height: 1.375rem;--_ui5-v1-24-0-badge-border: none;--_ui5-v1-24-0-badge-border-radius: .25rem;--_ui5-v1-24-0-badge-padding-inline: .375em;--_ui5-v1-24-0-badge-padding-inline-icon-only: .313rem;--_ui5-v1-24-0-badge-text-transform: none;--_ui5-v1-24-0-badge-icon-height: 1rem;--_ui5-v1-24-0-badge-icon-gap: .25rem;--_ui5-v1-24-0-badge-font-size: var(--sapFontSize);--_ui5-v1-24-0-badge-font: var(--sapFontSemiboldDuplexFamily);--_ui5-v1-24-0-badge-font-weight: normal;--_ui5-v1-24-0-badge-letter-spacing: normal;--ui5-v1-24-0-badge-color-scheme-1-background: var(--sapAvatar_1_Background);--ui5-v1-24-0-badge-color-scheme-1-color: var(--sapAvatar_1_TextColor);--ui5-v1-24-0-badge-color-scheme-2-background: var(--sapAvatar_2_Background);--ui5-v1-24-0-badge-color-scheme-2-color: var(--sapAvatar_2_TextColor);--ui5-v1-24-0-badge-color-scheme-3-background: var(--sapAvatar_3_Background);--ui5-v1-24-0-badge-color-scheme-3-color: var(--sapAvatar_3_TextColor);--ui5-v1-24-0-badge-color-scheme-4-background: var(--sapAvatar_4_Background);--ui5-v1-24-0-badge-color-scheme-4-color: var(--sapAvatar_4_TextColor);--ui5-v1-24-0-badge-color-scheme-5-background: var(--sapAvatar_5_Background);--ui5-v1-24-0-badge-color-scheme-5-color: var(--sapAvatar_5_TextColor);--ui5-v1-24-0-badge-color-scheme-6-background: var(--sapAvatar_6_Background);--ui5-v1-24-0-badge-color-scheme-6-color: var(--sapAvatar_6_TextColor);--ui5-v1-24-0-badge-color-scheme-7-background: var(--sapAvatar_7_Background);--ui5-v1-24-0-badge-color-scheme-7-color: var(--sapAvatar_7_TextColor);--ui5-v1-24-0-badge-color-scheme-8-background: var(--sapAvatar_8_Background);--ui5-v1-24-0-badge-color-scheme-8-color: var(--sapAvatar_8_TextColor);--ui5-v1-24-0-badge-color-scheme-9-background: var(--sapAvatar_9_Background);--ui5-v1-24-0-badge-color-scheme-9-color: var(--sapAvatar_9_TextColor);--ui5-v1-24-0-badge-color-scheme-10-background: var(--sapAvatar_10_Background);--ui5-v1-24-0-badge-color-scheme-10-color: var(--sapAvatar_10_TextColor);--_ui5-v1-24-0_breadcrumbs_margin: 0 0 .5rem 0;--browser_scrollbar_border_radius: var(--sapElement_BorderCornerRadius);--browser_scrollbar_border: none;--_ui5-v1-24-0_busy_indicator_color: var(--sapContent_BusyColor);--_ui5-v1-24-0_busy_indicator_focus_border_radius: .75rem;--_ui5-v1-24-0_busy_indicator_focus_outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-24-0_button_base_min_compact_width: 2rem;--_ui5-v1-24-0_button_base_height: var(--sapElement_Height);--_ui5-v1-24-0_button_compact_height: 1.625rem;--_ui5-v1-24-0_button_border_radius: var(--sapButton_BorderCornerRadius);--_ui5-v1-24-0_button_compact_padding: .4375rem;--_ui5-v1-24-0_button_emphasized_outline: 1px dotted var(--sapContent_FocusColor);--_ui5-v1-24-0_button_focus_offset: 1px;--_ui5-v1-24-0_button_focus_width: 1px;--_ui5-v1-24-0_button_emphasized_focused_border_before: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-24-0_button_emphasized_focused_active_border_color: transparent;--_ui5-v1-24-0_button_focused_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-24-0_button_focused_border_radius: .375rem;--_ui5-v1-24-0_button_focused_inner_border_radius: .375rem;--_ui5-v1-24-0_button_base_min_width: 2.25rem;--_ui5-v1-24-0_button_base_padding: .5625rem;--_ui5-v1-24-0_button_base_icon_only_padding: .5625rem;--_ui5-v1-24-0_button_base_icon_margin: .375rem;--_ui5-v1-24-0_button_icon_font_size: 1rem;--_ui5-v1-24-0_button_text_shadow: none;--_ui5-v1-24-0_button_emphasized_border_width: .0625rem;--_ui5-v1-24-0_button_pressed_focused_border_color: var(--sapContent_FocusColor);--_ui5-v1-24-0_button_fontFamily: var(--sapFontSemiboldDuplexFamily);--_ui5-v1-24-0_button_emphasized_focused_border_color: var(--sapContent_ContrastFocusColor);--_ui5-v1-24-0-calendar-legend-root-padding: .75rem;--_ui5-v1-24-0-calendar-legend-root-width: 18.5rem;--_ui5-v1-24-0-calendar-legend-item-box-margin: .25rem .5rem .25rem .25rem;--_ui5-v1-24-0-calendar-legend-item-root-focus-margin: 0;--_ui5-v1-24-0-calendar-legend-item-root-width: 7.75rem;--_ui5-v1-24-0-calendar-legend-item-root-focus-border: var(--sapContent_FocusWidth) solid var(--sapContent_FocusColor);--_ui5-v1-24-0-calendar-legend-item-root-focus-border-radius: .125rem;--_ui5-v1-24-0_card_box_shadow: var(--sapContent_Shadow0);--_ui5-v1-24-0_card_header_border_color: var(--sapTile_SeparatorColor);--_ui5-v1-24-0_card_header_focus_border: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-24-0_card_header_focus_bottom_radius: 0px;--_ui5-v1-24-0_card_header_title_font_weight: normal;--_ui5-v1-24-0_card_header_subtitle_margin_top: .25rem;--_ui5-v1-24-0_card_hover_box_shadow: var(--sapContent_Shadow2);--_ui5-v1-24-0_card_header_focus_offset: 0px;--_ui5-v1-24-0_card_header_focus_radius: var(--_ui5-v1-24-0_card_border-radius);--_ui5-v1-24-0_card_header_title_font_family: var(--sapFontHeaderFamily);--_ui5-v1-24-0_card_header_title_font_size: var(--sapFontHeader6Size);--_ui5-v1-24-0_card_header_hover_bg: var(--sapTile_Hover_Background);--_ui5-v1-24-0_card_header_active_bg: var(--sapTile_Active_Background);--_ui5-v1-24-0_card_header_border: none;--_ui5-v1-24-0_card_border-radius: var(--sapTile_BorderCornerRadius);--_ui5-v1-24-0_card_header_padding: 1rem 1rem .75rem 1rem;--_ui5-v1-24-0_card_border: none;--ui5-v1-24-0_carousel_background_color_solid: var(--sapGroup_ContentBackground);--ui5-v1-24-0_carousel_background_color_translucent: var(--sapBackgroundColor);--ui5-v1-24-0_carousel_button_size: 2.5rem;--ui5-v1-24-0_carousel_inactive_dot_size: .25rem;--ui5-v1-24-0_carousel_inactive_dot_margin: 0 .375rem;--ui5-v1-24-0_carousel_inactive_dot_border: 1px solid var(--sapContent_ForegroundBorderColor);--ui5-v1-24-0_carousel_inactive_dot_background: var(--sapContent_ForegroundBorderColor);--ui5-v1-24-0_carousel_active_dot_border: 1px solid var(--sapContent_Selected_ForegroundColor);--ui5-v1-24-0_carousel_active_dot_background: var(--sapContent_Selected_ForegroundColor);--ui5-v1-24-0_carousel_navigation_button_active_box_shadow: none;--_ui5-v1-24-0_checkbox_box_shadow: none;--_ui5-v1-24-0_checkbox_transition: unset;--_ui5-v1-24-0_checkbox_focus_border: none;--_ui5-v1-24-0_checkbox_border_radius: 0;--_ui5-v1-24-0_checkbox_focus_outline: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-24-0_checkbox_outer_hover_background: transparent;--_ui5-v1-24-0_checkbox_inner_width_height: 1.375rem;--_ui5-v1-24-0_checkbox_inner_disabled_border_color: var(--sapField_BorderColor);--_ui5-v1-24-0_checkbox_inner_information_box_shadow: none;--_ui5-v1-24-0_checkbox_inner_warning_box_shadow: none;--_ui5-v1-24-0_checkbox_inner_error_box_shadow: none;--_ui5-v1-24-0_checkbox_inner_success_box_shadow: none;--_ui5-v1-24-0_checkbox_inner_default_box_shadow: none;--_ui5-v1-24-0_checkbox_inner_background: var(--sapField_Background);--_ui5-v1-24-0_checkbox_wrapped_focus_padding: .375rem;--_ui5-v1-24-0_checkbox_wrapped_content_margin_top: .125rem;--_ui5-v1-24-0_checkbox_compact_wrapper_padding: .5rem;--_ui5-v1-24-0_checkbox_compact_width_height: 2rem;--_ui5-v1-24-0_checkbox_compact_inner_size: 1rem;--_ui5-v1-24-0_checkbox_compact_focus_position: .375rem;--_ui5-v1-24-0_checkbox_compact_wrapped_label_margin_top: -1px;--_ui5-v1-24-0_checkbox_label_offset: var(--_ui5-v1-24-0_checkbox_wrapper_padding);--_ui5-v1-24-0_checkbox_disabled_label_color: var(--sapContent_LabelColor);--_ui5-v1-24-0_checkbox_default_focus_border: none;--_ui5-v1-24-0_checkbox_focus_outline_display: block;--_ui5-v1-24-0_checkbox_wrapper_padding: .6875rem;--_ui5-v1-24-0_checkbox_width_height: 2.75rem;--_ui5-v1-24-0_checkbox_label_color: var(--sapField_TextColor);--_ui5-v1-24-0_checkbox_inner_border: solid var(--sapField_BorderWidth) var(--sapField_BorderColor);--_ui5-v1-24-0_checkbox_inner_border_radius: var(--sapField_BorderCornerRadius);--_ui5-v1-24-0_checkbox_checkmark_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-24-0_checkbox_hover_background: var(--sapContent_Selected_Hover_Background);--_ui5-v1-24-0_checkbox_inner_hover_border_color: var(--sapField_Hover_BorderColor);--_ui5-v1-24-0_checkbox_inner_hover_checked_border_color: var(--sapField_Hover_BorderColor);--_ui5-v1-24-0_checkbox_inner_selected_border_color: var(--sapField_BorderColor);--_ui5-v1-24-0_checkbox_inner_active_border_color: var(--sapField_Hover_BorderColor);--_ui5-v1-24-0_checkbox_active_background: var(--sapContent_Selected_Hover_Background);--_ui5-v1-24-0_checkbox_inner_readonly_border: var(--sapElement_BorderWidth) var(--sapField_ReadOnly_BorderColor) dashed;--_ui5-v1-24-0_checkbox_inner_error_border: var(--sapField_InvalidBorderWidth) solid var(--sapField_InvalidColor);--_ui5-v1-24-0_checkbox_inner_error_background_hover: var(--sapField_Hover_Background);--_ui5-v1-24-0_checkbox_inner_warning_border: var(--sapField_WarningBorderWidth) solid var(--sapField_WarningColor);--_ui5-v1-24-0_checkbox_inner_warning_color: var(--sapField_WarningColor);--_ui5-v1-24-0_checkbox_inner_warning_background_hover: var(--sapField_Hover_Background);--_ui5-v1-24-0_checkbox_checkmark_warning_color: var(--sapField_WarningColor);--_ui5-v1-24-0_checkbox_inner_success_border: var(--sapField_SuccessBorderWidth) solid var(--sapField_SuccessColor);--_ui5-v1-24-0_checkbox_inner_success_background_hover: var(--sapField_Hover_Background);--_ui5-v1-24-0_checkbox_inner_information_color: var(--sapField_InformationColor);--_ui5-v1-24-0_checkbox_inner_information_border: var(--sapField_InformationBorderWidth) solid var(--sapField_InformationColor);--_ui5-v1-24-0_checkbox_inner_information_background_hover: var(--sapField_Hover_Background);--_ui5-v1-24-0_checkbox_disabled_opacity: var(--sapContent_DisabledOpacity);--_ui5-v1-24-0_checkbox_focus_position: .3125rem;--_ui5-v1-24-0_checkbox_focus_border_radius: .5rem;--_ui5-v1-24-0_checkbox_right_focus_distance: var(--_ui5-v1-24-0_checkbox_focus_position);--_ui5-v1-24-0_checkbox_wrapped_focus_left_top_bottom_position: .1875rem;--_ui5-v1-24-0_color-palette-item-outer-border-radius: .25rem;--_ui5-v1-24-0_color-palette-item-inner-border-radius: .1875rem;--_ui5-v1-24-0_color-palette-item-container-sides-padding: .3125rem;--_ui5-v1-24-0_color-palette-item-container-rows-padding: .6875rem;--_ui5-v1-24-0_color-palette-item-focus-height: 1.5rem;--_ui5-v1-24-0_color-palette-item-container-padding: var(--_ui5-v1-24-0_color-palette-item-container-sides-padding) var(--_ui5-v1-24-0_color-palette-item-container-rows-padding);--_ui5-v1-24-0_color-palette-item-hover-margin: .0625rem;--_ui5-v1-24-0_color-palette-row-height: 9.5rem;--_ui5-v1-24-0_color-palette-button-height: 3rem;--_ui5-v1-24-0_color-palette-item-before-focus-color: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-24-0_color-palette-item-before-focus-offset: -.3125rem;--_ui5-v1-24-0_color-palette-item-before-focus-hover-offset: -.0625rem;--_ui5-v1-24-0_color-palette-item-after-focus-color: .0625rem solid var(--sapContent_ContrastFocusColor);--_ui5-v1-24-0_color-palette-item-after-focus-offset: -.1875rem;--_ui5-v1-24-0_color-palette-item-after-focus-hover-offset: .0625rem;--_ui5-v1-24-0_color-palette-item-before-focus-border-radius: .4375rem;--_ui5-v1-24-0_color-palette-item-after-focus-border-radius: .3125rem;--_ui5-v1-24-0_color-palette-item-hover-outer-border-radius: .4375rem;--_ui5-v1-24-0_color-palette-item-hover-inner-border-radius: .375rem;--_ui5-v1-24-0_color_picker_circle_outer_border: .0625rem solid var(--sapContent_ContrastShadowColor);--_ui5-v1-24-0_color_picker_circle_inner_border: .0625rem solid var(--sapField_BorderColor);--_ui5-v1-24-0_color_picker_circle_inner_circle_size: .5625rem;--_ui5-v1-24-0_color_picker_slider_handle_box_shadow: .125rem solid var(--sapField_BorderColor);--_ui5-v1-24-0_color_picker_slider_handle_border: .125rem solid var(--sapField_BorderColor);--_ui5-v1-24-0_color_picker_slider_handle_outline_hover: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-24-0_color_picker_slider_handle_outline_focus: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-24-0_color_picker_slider_handle_margin_top: -.1875rem;--_ui5-v1-24-0_color_picker_slider_handle_focus_margin_top: var(--_ui5-v1-24-0_color_picker_slider_handle_margin_top);--_ui5-v1-24-0_color_picker_slider_container_margin_top: -11px;--_ui5-v1-24-0_color_picker_slider_handle_inline_focus: 1px solid var(--sapContent_ContrastFocusColor);--_ui5-v1-24-0_datepicker_icon_border: none;--_ui5-v1-24-0-datepicker-hover-background: var(--sapField_Hover_Background);--_ui5-v1-24-0-datepicker_border_radius: .25rem;--_ui5-v1-24-0-datepicker_icon_border_radius: .125rem;--_ui5-v1-24-0_daypicker_item_box_shadow: inset 0 0 0 .0625rem var(--sapContent_Selected_ForegroundColor);--_ui5-v1-24-0_daypicker_item_margin: 2px;--_ui5-v1-24-0_daypicker_item_border: none;--_ui5-v1-24-0_daypicker_item_selected_border_color: var(--sapList_Background);--_ui5-v1-24-0_daypicker_daynames_container_height: 2rem;--_ui5-v1-24-0_daypicker_weeknumbers_container_padding_top: 2rem;--_ui5-v1-24-0_daypicker_item_othermonth_background_color: var(--sapList_Background);--_ui5-v1-24-0_daypicker_item_othermonth_color: var(--sapContent_LabelColor);--_ui5-v1-24-0_daypicker_item_othermonth_hover_color: var(--sapContent_LabelColor);--_ui5-v1-24-0_daypicker_item_now_inner_border_radius: 0;--_ui5-v1-24-0_daypicker_item_outline_width: 1px;--_ui5-v1-24-0_daypicker_item_outline_offset: 1px;--_ui5-v1-24-0_daypicker_item_now_focus_after_width: calc(100% - .25rem) ;--_ui5-v1-24-0_daypicker_item_now_focus_after_height: calc(100% - .25rem) ;--_ui5-v1-24-0_daypicker_item_now_selected_focus_after_width: calc(100% - .375rem) ;--_ui5-v1-24-0_daypicker_item_now_selected_focus_after_height: calc(100% - .375rem) ;--_ui5-v1-24-0_daypicker_item_selected_background: transparent;--_ui5-v1-24-0_daypicker_item_outline_focus_after: none;--_ui5-v1-24-0_daypicker_item_border_focus_after: var(--_ui5-v1-24-0_daypicker_item_outline_width) dotted var(--sapContent_FocusColor);--_ui5-v1-24-0_daypicker_item_width_focus_after: calc(100% - .25rem) ;--_ui5-v1-24-0_daypicker_item_height_focus_after: calc(100% - .25rem) ;--_ui5-v1-24-0_daypicker_item_now_outline: none;--_ui5-v1-24-0_daypicker_item_now_outline_offset: none;--_ui5-v1-24-0_daypicker_item_now_outline_offset_focus_after: var(--_ui5-v1-24-0_daypicker_item_now_outline_offset);--_ui5-v1-24-0_daypicker_item_now_not_selected_inset: 0;--_ui5-v1-24-0_daypicker_item_now_border_color: var(--sapLegend_CurrentDateTime);--_ui5-v1-24-0_dp_two_calendar_item_secondary_text_border_radios: .25rem;--_ui5-v1-24-0_daypicker_special_day_top: 2.5rem;--_ui5-v1-24-0_daypicker_special_day_before_border_color: var(--sapList_Background);--_ui5-v1-24-0_daypicker_selected_item_now_special_day_border_bottom_radius: 0;--_ui5-v1-24-0_daypicker_twocalendar_item_special_day_after_border_width: .125rem;--_ui5-v1-24-0_daypicker_twocalendar_item_special_day_dot: .375rem;--_ui5-v1-24-0_daypicker_twocalendar_item_special_day_top: 2rem;--_ui5-v1-24-0_daypicker_twocalendar_item_special_day_right: 1.4375rem;--_ui5-v1-24-0_daypicker_item_border_radius: .4375rem;--_ui5-v1-24-0_daypicker_item_focus_border: .0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-24-0_daypicker_item_selected_border: .0625rem solid var(--sapList_SelectionBorderColor);--_ui5-v1-24-0_daypicker_item_not_selected_focus_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-24-0_daypicker_item_selected_focus_color: var(--sapContent_FocusColor);--_ui5-v1-24-0_daypicker_item_selected_focus_width: .125rem;--_ui5-v1-24-0_daypicker_item_no_selected_inset: .375rem;--_ui5-v1-24-0_daypicker_item_now_border_focus_after: .125rem solid var(--sapList_SelectionBorderColor);--_ui5-v1-24-0_daypicker_item_now_border_radius_focus_after: .3125rem;--_ui5-v1-24-0_day_picker_item_selected_now_border_focus: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-24-0_day_picker_item_selected_now_border_radius_focus: .1875rem;--ui5-v1-24-0-dp-item_withsecondtype_border: .375rem;--_ui5-v1-24-0_daypicker_item_now_border: .125rem solid var(--sapLegend_CurrentDateTime);--_ui5-v1-24-0_daypicker_dayname_color: var(--sapContent_LabelColor);--_ui5-v1-24-0_daypicker_weekname_color: var(--sapContent_LabelColor);--_ui5-v1-24-0_daypicker_item_selected_box_shadow: inset 0 0 0 .0625rem var(--sapContent_Selected_ForegroundColor);--_ui5-v1-24-0_daypicker_item_selected_daytext_hover_background: transparent;--_ui5-v1-24-0_daypicker_item_border_radius_item: .5rem;--_ui5-v1-24-0_daypicker_item_border_radius_focus_after: .1875rem;--_ui5-v1-24-0_daypicker_item_selected_between_border: .5rem;--_ui5-v1-24-0_daypicker_item_selected_between_background: var(--sapList_SelectionBackgroundColor);--_ui5-v1-24-0_daypicker_item_selected_between_text_background: transparent;--_ui5-v1-24-0_daypicker_item_selected_between_text_font: var(--sapFontFamily);--_ui5-v1-24-0_daypicker_item_selected_text_font: var(--sapFontBoldFamily);--_ui5-v1-24-0_daypicker_item_selected_between_hover_background: var(--sapList_Hover_SelectionBackground);--_ui5-v1-24-0_daypicker_item_now_box_shadow: inset 0 0 0 .35rem var(--sapList_Background);--_ui5-v1-24-0_daypicker_item_selected_text_outline: .0625rem solid var(--sapSelectedColor);--_ui5-v1-24-0_daypicker_item_now_selected_outline_offset: -.25rem;--_ui5-v1-24-0_daypicker_item_now_selected_between_inset: .25rem;--_ui5-v1-24-0_daypicker_item_now_selected_between_border: .0625rem solid var(--sapContent_Selected_ForegroundColor);--_ui5-v1-24-0_daypicker_item_now_selected_between_border_radius: .1875rem;--_ui5-v1-24-0_daypicker_item_select_between_border: 1px solid var(--sapContent_Selected_ForegroundColor);--_ui5-v1-24-0_daypicker_item_weeekend_filter: brightness(105%);--_ui5-v1-24-0_daypicker_item_selected_hover: var(--sapList_Hover_Background);--_ui5-v1-24-0_daypicker_item_now_inset: .3125rem;--_ui5-v1-24-0-dp-item_withsecondtype_border: .25rem;--_ui5-v1-24-0_daypicker_item_selected__secondary_type_text_outline: .0625rem solid var(--sapSelectedColor);--_ui5-v1-24-0_daypicker_two_calendar_item_now_day_text_content: "";--_ui5-v1-24-0_daypicker_two_calendar_item_now_selected_border_width: .125rem;--_ui5-v1-24-0_daypicker_two_calendar_item_border_radius: .5rem;--_ui5-v1-24-0_daypicker_two_calendar_item_border_focus_border_radius: .375rem;--_ui5-v1-24-0_daypicker_two_calendar_item_no_selected_inset: 0;--_ui5-v1-24-0_daypicker_two_calendar_item_selected_now_border_radius_focus: .1875rem;--_ui5-v1-24-0_daypicker_two_calendar_item_no_selected_focus_inset: .1875rem;--_ui5-v1-24-0_daypicker_two_calendar_item_no_select_focus_border_radius: .3125rem;--_ui5-v1-24-0_daypicker_two_calendar_item_now_inset: .3125rem;--_ui5-v1-24-0_daypicker_two_calendar_item_now_selected_border_inset: .125rem;--_ui5-v1-24-0_daypicker_selected_item_special_day_width: calc(100% - .125rem) ;--_ui5-v1-24-0_daypicker_special_day_border_bottom_radius: .5rem;--_ui5-v1-24-0-daypicker_item_selected_now_border_radius: .5rem;--_ui5-v1-24-0_daypicker_selected_item_now_special_day_width: calc(100% - .1875rem) ;--_ui5-v1-24-0_daypicker_selected_item_now_special_day_border_bottom_radius_alternate: .5rem;--_ui5-v1-24-0_daypicker_selected_item_now_special_day_top: 2.4375rem;--_ui5-v1-24-0_daypicker_two_calendar_item_margin_bottom: 0;--_ui5-v1-24-0_daypicker_twocalendar_item_special_day_now_inset: .3125rem;--_ui5-v1-24-0_daypicker_twocalendar_item_special_day_now_border_radius: .25rem;--_ui5-v1-24-0_daypicker_item_now_focus_margin: 0;--_ui5-v1-24-0_daypicker_special_day_border_top: none;--_ui5-v1-24-0_daypicker_special_day_selected_border_radius_bottom: .25rem;--_ui5-v1-24-0_daypicker_specialday_focused_top: 2.125rem;--_ui5-v1-24-0_daypicker_specialday_focused_width: calc(100% - .75rem) ;--_ui5-v1-24-0_daypicker_specialday_focused_border_bottom: 0;--_ui5-v1-24-0_daypicker_item_now_specialday_top: 2.3125rem;--_ui5-v1-24-0_daypicker_item_now_specialday_width: calc(100% - .5rem) ;--_ui5-v1-24-0_dialog_resize_handle_color: var(--sapButton_Lite_TextColor);--_ui5-v1-24-0_dialog_header_error_state_icon_color: var(--sapNegativeElementColor);--_ui5-v1-24-0_dialog_header_information_state_icon_color: var(--sapInformativeElementColor);--_ui5-v1-24-0_dialog_header_success_state_icon_color: var(--sapPositiveElementColor);--_ui5-v1-24-0_dialog_header_warning_state_icon_color: var(--sapCriticalElementColor);--_ui5-v1-24-0_dialog_header_state_line_height: .0625rem;--_ui5-v1-24-0_dialog_header_focus_bottom_offset: 2px;--_ui5-v1-24-0_dialog_header_focus_top_offset: 1px;--_ui5-v1-24-0_dialog_header_focus_left_offset: 1px;--_ui5-v1-24-0_dialog_header_focus_right_offset: 1px;--_ui5-v1-24-0_dialog_resize_handle_right: 0;--_ui5-v1-24-0_dialog_resize_handle_bottom: 3px;--_ui5-v1-24-0_dialog_header_border_radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-24-0_file_uploader_value_state_error_hover_background_color: var(--sapField_Hover_Background);--_ui5-v1-24-0_file_uploader_hover_border: none;--ui5-v1-24-0-group-header-listitem-background-color: var(--sapList_GroupHeaderBackground);--ui5-v1-24-0-icon-focus-border-radius: .25rem;--_ui5-v1-24-0_input_width: 13.125rem;--_ui5-v1-24-0_input_min_width: 2.75rem;--_ui5-v1-24-0_input_height: var(--sapElement_Height);--_ui5-v1-24-0_input_compact_height: 1.625rem;--_ui5-v1-24-0_input_value_state_error_hover_background: var(--sapField_Hover_Background);--_ui5-v1-24-0_input_background_color: var(--sapField_Background);--_ui5-v1-24-0_input_border_radius: var(--sapField_BorderCornerRadius);--_ui5-v1-24-0_input_placeholder_style: italic;--_ui5-v1-24-0_input_placeholder_color: var(--sapField_PlaceholderTextColor);--_ui5-v1-24-0_input_bottom_border_height: 0;--_ui5-v1-24-0_input_bottom_border_color: transparent;--_ui5-v1-24-0_input_focused_border_color: var(--sapField_Hover_BorderColor);--_ui5-v1-24-0_input_state_border_width: .125rem;--_ui5-v1-24-0_input_information_border_width: .125rem;--_ui5-v1-24-0_input_error_font_weight: normal;--_ui5-v1-24-0_input_warning_font_weight: normal;--_ui5-v1-24-0_input_focus_border_width: 1px;--_ui5-v1-24-0_input_error_warning_font_style: inherit;--_ui5-v1-24-0_input_error_warning_text_indent: 0;--_ui5-v1-24-0_input_disabled_color: var(--sapContent_DisabledTextColor);--_ui5-v1-24-0_input_disabled_font_weight: normal;--_ui5-v1-24-0_input_disabled_border_color: var(--sapField_BorderColor);--_ui5-v1-24-0-input_disabled_background: var(--sapField_Background);--_ui5-v1-24-0_input_readonly_border_color: var(--sapField_ReadOnly_BorderColor);--_ui5-v1-24-0_input_readonly_background: var(--sapField_ReadOnly_Background);--_ui5-v1-24-0_input_disabled_opacity: var(--sapContent_DisabledOpacity);--_ui5-v1-24-0_input_icon_min_width: 2.25rem;--_ui5-v1-24-0_input_compact_min_width: 2rem;--_ui5-v1-24-0_input_transition: none;--_ui5-v1-24-0-input-value-state-icon-display: none;--_ui5-v1-24-0_input_value_state_error_border_color: var(--sapField_InvalidColor);--_ui5-v1-24-0_input_focused_value_state_error_border_color: var(--sapField_InvalidColor);--_ui5-v1-24-0_input_value_state_warning_border_color: var(--sapField_WarningColor);--_ui5-v1-24-0_input_focused_value_state_warning_border_color: var(--sapField_WarningColor);--_ui5-v1-24-0_input_value_state_success_border_color: var(--sapField_SuccessColor);--_ui5-v1-24-0_input_focused_value_state_success_border_color: var(--sapField_SuccessColor);--_ui5-v1-24-0_input_value_state_success_border_width: 1px;--_ui5-v1-24-0_input_value_state_information_border_color: var(--sapField_InformationColor);--_ui5-v1-24-0_input_focused_value_state_information_border_color: var(--sapField_InformationColor);--_ui5-v1-24-0-input-value-state-information-border-width: 1px;--_ui5-v1-24-0-input-background-image: none;--ui5-v1-24-0_input_focus_pseudo_element_content: "";--_ui5-v1-24-0_input_value_state_error_warning_placeholder_font_weight: normal;--_ui5-v1-24-0-input_error_placeholder_color: var(--sapField_PlaceholderTextColor);--_ui5-v1-24-0_input_icon_width: 2.25rem;--_ui5-v1-24-0-input-icons-count: 0;--_ui5-v1-24-0_input_margin_top_bottom: .1875rem;--_ui5-v1-24-0_input_tokenizer_min_width: 3.25rem;--_ui5-v1-24-0-input-border: none;--_ui5-v1-24-0_input_hover_border: none;--_ui5-v1-24-0_input_focus_border_radius: .25rem;--_ui5-v1-24-0_input_readonly_focus_border_radius: .125rem;--_ui5-v1-24-0_input_error_warning_border_style: none;--_ui5-v1-24-0_input_focused_value_state_error_background: var(--sapField_Hover_Background);--_ui5-v1-24-0_input_focused_value_state_warning_background: var(--sapField_Hover_Background);--_ui5-v1-24-0_input_focused_value_state_success_background: var(--sapField_Hover_Background);--_ui5-v1-24-0_input_focused_value_state_information_background: var(--sapField_Hover_Background);--_ui5-v1-24-0_input_focused_value_state_error_focus_outline_color: var(--sapField_InvalidColor);--_ui5-v1-24-0_input_focused_value_state_warning_focus_outline_color: var(--sapField_WarningColor);--_ui5-v1-24-0_input_focused_value_state_success_focus_outline_color: var(--sapField_SuccessColor);--_ui5-v1-24-0_input_focus_offset: 0;--_ui5-v1-24-0_input_readonly_focus_offset: .125rem;--_ui5-v1-24-0_input_information_icon_padding: .625rem .625rem .5rem .625rem;--_ui5-v1-24-0_input_information_focused_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-24-0_input_error_warning_icon_padding: .625rem .625rem .5rem .625rem;--_ui5-v1-24-0_input_error_warning_focused_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-24-0_input_custom_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-24-0_input_error_warning_custom_icon_padding: .625rem .625rem .5rem .625rem;--_ui5-v1-24-0_input_error_warning_custom_focused_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-24-0_input_information_custom_icon_padding: .625rem .625rem .5rem .625rem;--_ui5-v1-24-0_input_information_custom_focused_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-24-0_input_focus_outline_color: var(--sapField_Active_BorderColor);--_ui5-v1-24-0_input_icon_wrapper_height: calc(100% - 1px) ;--_ui5-v1-24-0_input_icon_wrapper_state_height: calc(100% - 2px) ;--_ui5-v1-24-0_input_icon_wrapper_success_state_height: calc(100% - var(--_ui5-v1-24-0_input_value_state_success_border_width));--_ui5-v1-24-0_input_icon_color: var(--sapContent_IconColor);--_ui5-v1-24-0_input_icon_pressed_bg: var(--sapButton_Selected_Background);--_ui5-v1-24-0_input_icon_padding: .625rem .625rem .5625rem .625rem;--_ui5-v1-24-0_input_icon_hover_bg: var(--sapField_Focus_Background);--_ui5-v1-24-0_input_icon_pressed_color: var(--sapButton_Active_TextColor);--_ui5-v1-24-0_input_icon_border_radius: .25rem;--_ui5-v1-24-0_input_icon_box_shadow: var(--sapField_Hover_Shadow);--_ui5-v1-24-0_input_icon_border: none;--_ui5-v1-24-0_input_error_icon_box_shadow: var(--sapContent_Negative_Shadow);--_ui5-v1-24-0_input_warning_icon_box_shadow: var(--sapContent_Critical_Shadow);--_ui5-v1-24-0_input_information_icon_box_shadow: var(--sapContent_Informative_Shadow);--_ui5-v1-24-0_input_success_icon_box_shadow: var(--sapContent_Positive_Shadow);--_ui5-v1-24-0_input_icon_error_pressed_color: var(--sapButton_Reject_Selected_TextColor);--_ui5-v1-24-0_input_icon_warning_pressed_color: var(--sapButton_Attention_Selected_TextColor);--_ui5-v1-24-0_input_icon_information_pressed_color: var(--sapButton_Selected_TextColor);--_ui5-v1-24-0_input_icon_success_pressed_color: var(--sapButton_Accept_Selected_TextColor);--_ui5-v1-24-0_link_focus_text_decoration: underline;--_ui5-v1-24-0_link_text_decoration: var(--sapLink_TextDecoration);--_ui5-v1-24-0_link_hover_text_decoration: var(--sapLink_Hover_TextDecoration);--_ui5-v1-24-0_link_focused_hover_text_decoration: none;--_ui5-v1-24-0_link_focused_hover_text_color: var(--sapContent_ContrastTextColor);--_ui5-v1-24-0_link_active_text_decoration: var(--sapLink_Active_TextDecoration);--_ui5-v1-24-0_link_border: .125rem solid transparent;--_ui5-v1-24-0_link_border_focus: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-24-0_link_focus_border-radius: .125rem;--_ui5-v1-24-0_link_focus_background_color: var(--sapContent_FocusColor);--_ui5-v1-24-0_link_focus_color: var(--sapContent_ContrastTextColor);--_ui5-v1-24-0_link_subtle_text_decoration: underline;--_ui5-v1-24-0_link_subtle_text_decoration_hover: none;--ui5-v1-24-0_list_footer_text_color: var(--sapList_FooterTextColor);--ui5-v1-24-0-listitem-background-color: var(--sapList_Background);--ui5-v1-24-0-listitem-border-bottom: var(--sapList_BorderWidth) solid var(--sapList_BorderColor);--ui5-v1-24-0-listitem-selected-border-bottom: 1px solid var(--sapList_SelectionBorderColor);--ui5-v1-24-0-listitem-focused-selected-border-bottom: 1px solid var(--sapList_SelectionBorderColor);--_ui5-v1-24-0_listitembase_focus_width: 1px;--_ui5-v1-24-0-listitembase_disabled_opacity: .5;--_ui5-v1-24-0_product_switch_item_border: none;--ui5-v1-24-0-listitem-active-border-color: var(--sapContent_FocusColor);--_ui5-v1-24-0_menu_item_padding: 0 1rem 0 .75rem;--_ui5-v1-24-0_menu_item_submenu_icon_right: 1rem;--_ui5-v1-24-0_menu_item_additional_text_start_margin: 1rem;--_ui5-v1-24-0_menu_popover_border_radius: var(--sapPopover_BorderCornerRadius);--_ui5-v1-24-0_monthpicker_item_border: none;--_ui5-v1-24-0_monthpicker_item_margin: 1px;--_ui5-v1-24-0_monthpicker_item_border_radius: .5rem;--_ui5-v1-24-0_monthpicker_item_focus_after_border: var(--_ui5-v1-24-0_button_focused_border);--_ui5-v1-24-0_monthpicker_item_focus_after_border_radius: .5rem;--_ui5-v1-24-0_monthpicker_item_focus_after_width: calc(100% - .5rem) ;--_ui5-v1-24-0_monthpicker_item_focus_after_height: calc(100% - .5rem) ;--_ui5-v1-24-0_monthpicker_item_focus_after_offset: .25rem;--_ui5-v1-24-0_monthpicker_item_selected_text_color: var(--sapContent_Selected_TextColor);--_ui5-v1-24-0_monthpicker_item_selected_background_color:var(--sapLegend_WorkingBackground);--_ui5-v1-24-0_monthpicker_item_selected_hover_color: var(--sapList_Hover_Background);--_ui5-v1-24-0_monthpicker_item_selected_box_shadow: none;--_ui5-v1-24-0_monthpicker_item_focus_after_outline: .125rem solid var(--sapSelectedColor);--_ui5-v1-24-0_monthpicker_item_selected_font_wieght: bold;--_ui5-v1-24-0_message_strip_icon_width: 2.5rem;--_ui5-v1-24-0_message_strip_button_border_width: 0;--_ui5-v1-24-0_message_strip_button_border_style: none;--_ui5-v1-24-0_message_strip_button_border_color: transparent;--_ui5-v1-24-0_message_strip_button_border_radius: 0;--_ui5-v1-24-0_message_strip_padding: .4375rem 2.5rem .4375rem 2.5rem;--_ui5-v1-24-0_message_strip_padding_block_no_icon: .4375rem .4375rem;--_ui5-v1-24-0_message_strip_padding_inline_no_icon: 1rem 2.5rem;--_ui5-v1-24-0_message_strip_button_height: 1.625rem;--_ui5-v1-24-0_message_strip_border_width: 1px;--_ui5-v1-24-0_message_strip_close_button_border: none;--_ui5-v1-24-0_message_strip_icon_top: .4375rem;--_ui5-v1-24-0_message_strip_focus_width: 1px;--_ui5-v1-24-0_message_strip_focus_offset: -2px;--_ui5-v1-24-0_message_strip_close_button_top: .125rem;--_ui5-v1-24-0_message_strip_close_button_right: .1875rem;--_ui5-v1-24-0_panel_focus_border: var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);--_ui5-v1-24-0_panel_header_height: 2.75rem;--_ui5-v1-24-0_panel_button_root_width: 2.75rem;--_ui5-v1-24-0_panel_button_root_height: 2.75rem;--_ui5-v1-24-0_panel_header_padding_right: .5rem;--_ui5-v1-24-0_panel_header_button_wrapper_padding: .25rem;--_ui5-v1-24-0_panel_border_radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-24-0_panel_border_bottom: none;--_ui5-v1-24-0_panel_default_header_border: .0625rem solid var(--sapGroup_TitleBorderColor);--_ui5-v1-24-0_panel_outline_offset: -.125rem;--_ui5-v1-24-0_panel_border_radius_expanded: var(--sapElement_BorderCornerRadius) var(--sapElement_BorderCornerRadius) 0 0;--_ui5-v1-24-0_panel_icon_color: var(--sapButton_Lite_TextColor);--_ui5-v1-24-0_panel_focus_offset: 0px;--_ui5-v1-24-0_panel_focus_bottom_offset: -1px;--_ui5-v1-24-0_panel_content_padding: .625rem 1rem;--_ui5-v1-24-0_panel_header_background_color: var(--sapGroup_TitleBackground);--_ui5-v1-24-0_popover_background: var(--sapGroup_ContentBackground);--_ui5-v1-24-0_popover_box_shadow: var(--sapContent_Shadow2);--_ui5-v1-24-0_popover_no_arrow_box_shadow: var(--sapContent_Shadow1);--_ui5-v1-24-0_popup_content_padding_s: 1rem;--_ui5-v1-24-0_popup_content_padding_m_l: 2rem;--_ui5-v1-24-0_popup_content_padding_xl: 3rem;--_ui5-v1-24-0_popup_header_footer_padding_s: 1rem;--_ui5-v1-24-0_popup_header_footer_padding_m_l: 2rem;--_ui5-v1-24-0_popup_header_footer_padding_xl: 3rem;--_ui5-v1-24-0_popup_viewport_margin: 10px;--_ui5-v1-24-0_popup_header_font_weight: 400;--_ui5-v1-24-0_popup_header_prop_header_text_alignment: flex-start;--_ui5-v1-24-0_popup_header_background: var(--sapPageHeader_Background);--_ui5-v1-24-0_popup_header_shadow: var(--sapContent_HeaderShadow);--_ui5-v1-24-0_popup_header_border: none;--_ui5-v1-24-0_popup_header_font_family: var(--sapFontHeaderFamily);--_ui5-v1-24-0_popup_border_radius: .5rem;--_ui5-v1-24-0_popup_block_layer_background: color-mix(in oklch, transparent, var(--sapBlockLayer_Background) 60%);--_ui5-v1-24-0_progress_indicator_bar_border_max: none;--_ui5-v1-24-0_progress_indicator_icon_visibility: inline-block;--_ui5-v1-24-0_progress_indicator_side_points_visibility: block;--_ui5-v1-24-0_progress_indicator_padding: 1.25rem 0 .75rem 0;--_ui5-v1-24-0_progress_indicator_padding_end: 1.25rem;--_ui5-v1-24-0_progress_indicator_host_height: unset;--_ui5-v1-24-0_progress_indicator_host_min_height: unset;--_ui5-v1-24-0_progress_indicator_host_box_sizing: border-box;--_ui5-v1-24-0_progress_indicator_root_position: relative;--_ui5-v1-24-0_progress_indicator_root_border_radius: .25rem;--_ui5-v1-24-0_progress_indicator_root_height: .375rem;--_ui5-v1-24-0_progress_indicator_root_min_height: .375rem;--_ui5-v1-24-0_progress_indicator_root_overflow: visible;--_ui5-v1-24-0_progress_indicator_bar_height: .625rem;--_ui5-v1-24-0_progress_indicator_bar_border_radius: .5rem;--_ui5-v1-24-0_progress_indicator_remaining_bar_border_radius: .25rem;--_ui5-v1-24-0_progress_indicator_remaining_bar_position: absolute;--_ui5-v1-24-0_progress_indicator_remaining_bar_width: 100%;--_ui5-v1-24-0_progress_indicator_remaining_bar_overflow: visible;--_ui5-v1-24-0_progress_indicator_icon_position: absolute;--_ui5-v1-24-0_progress_indicator_icon_right_position: -1.25rem;--_ui5-v1-24-0_progress_indicator_value_margin: 0 0 .1875rem 0;--_ui5-v1-24-0_progress_indicator_value_position: absolute;--_ui5-v1-24-0_progress_indicator_value_top_position: -1.3125rem;--_ui5-v1-24-0_progress_indicator_value_left_position: 0;--_ui5-v1-24-0_progress_indicator_background_none: var(--sapProgress_Background);--_ui5-v1-24-0_progress_indicator_background_error: var(--sapProgress_NegativeBackground);--_ui5-v1-24-0_progress_indicator_background_warning: var(--sapProgress_CriticalBackground);--_ui5-v1-24-0_progress_indicator_background_success: var(--sapProgress_PositiveBackground);--_ui5-v1-24-0_progress_indicator_background_information: var(--sapProgress_InformationBackground);--_ui5-v1-24-0_progress_indicator_value_state_none: var(--sapProgress_Value_Background);--_ui5-v1-24-0_progress_indicator_value_state_error: var(--sapProgress_Value_NegativeBackground);--_ui5-v1-24-0_progress_indicator_value_state_warning: var(--sapProgress_Value_CriticalBackground);--_ui5-v1-24-0_progress_indicator_value_state_success: var(--sapProgress_Value_PositiveBackground);--_ui5-v1-24-0_progress_indicator_value_state_information: var(--sapProgress_Value_InformationBackground);--_ui5-v1-24-0_progress_indicator_value_state_error_icon_color: var(--sapProgress_Value_NegativeTextColor);--_ui5-v1-24-0_progress_indicator_value_state_warning_icon_color: var(--sapProgress_Value_CriticalTextColor);--_ui5-v1-24-0_progress_indicator_value_state_success_icon_color: var(--sapProgress_Value_PositiveTextColor);--_ui5-v1-24-0_progress_indicator_value_state_information_icon_color: var(--sapProgress_Value_InformationTextColor);--_ui5-v1-24-0_progress_indicator_border: none;--_ui5-v1-24-0_progress_indicator_border_color_error: var(--sapErrorBorderColor);--_ui5-v1-24-0_progress_indicator_border_color_warning: var(--sapWarningBorderColor);--_ui5-v1-24-0_progress_indicator_border_color_success: var(--sapSuccessBorderColor);--_ui5-v1-24-0_progress_indicator_border_color_information: var(--sapInformationBorderColor);--_ui5-v1-24-0_progress_indicator_color: var(--sapField_TextColor);--_ui5-v1-24-0_progress_indicator_bar_color: var(--sapProgress_TextColor);--_ui5-v1-24-0_progress_indicator_icon_size: var(--sapFontLargeSize);--_ui5-v1-24-0_rating_indicator_item_height: 1em;--_ui5-v1-24-0_rating_indicator_item_width: 1em;--_ui5-v1-24-0_rating_indicator_component_spacing: .5rem 0px;--_ui5-v1-24-0_rating_indicator_border_radius: .25rem;--_ui5-v1-24-0_rating_indicator_outline_offset: .125rem;--_ui5-v1-24-0_rating_indicator_readonly_item_height: .75em;--_ui5-v1-24-0_rating_indicator_readonly_item_width: .75em;--_ui5-v1-24-0_rating_indicator_readonly_item_spacing: .1875rem .1875rem;--_ui5-v1-24-0_segmented_btn_inner_border: .0625rem solid transparent;--_ui5-v1-24-0_segmented_btn_inner_border_odd_child: .0625rem solid transparent;--_ui5-v1-24-0_segmented_btn_inner_pressed_border_odd_child: .0625rem solid var(--sapButton_Selected_BorderColor);--_ui5-v1-24-0_segmented_btn_inner_border_radius: var(--sapButton_BorderCornerRadius);--_ui5-v1-24-0_segmented_btn_background_color: var(--sapButton_Lite_Background);--_ui5-v1-24-0_segmented_btn_border_color: var(--sapButton_Lite_BorderColor);--_ui5-v1-24-0_segmented_btn_hover_box_shadow: none;--_ui5-v1-24-0_segmented_btn_item_border_left: .0625rem;--_ui5-v1-24-0_segmented_btn_item_border_right: .0625rem;--_ui5-v1-24-0_radio_button_min_width: 2.75rem;--_ui5-v1-24-0_radio_button_hover_fill_error: var(--sapField_Hover_Background);--_ui5-v1-24-0_radio_button_hover_fill_warning: var(--sapField_Hover_Background);--_ui5-v1-24-0_radio_button_hover_fill_success: var(--sapField_Hover_Background);--_ui5-v1-24-0_radio_button_hover_fill_information: var(--sapField_Hover_Background);--_ui5-v1-24-0_radio_button_checked_fill: var(--sapSelectedColor);--_ui5-v1-24-0_radio_button_checked_error_fill: var(--sapField_InvalidColor);--_ui5-v1-24-0_radio_button_checked_success_fill: var(--sapField_SuccessColor);--_ui5-v1-24-0_radio_button_checked_information_fill: var(--sapField_InformationColor);--_ui5-v1-24-0_radio_button_warning_error_border_dash: 0;--_ui5-v1-24-0_radio_button_outer_ring_color: var(--sapField_BorderColor);--_ui5-v1-24-0_radio_button_outer_ring_width: var(--sapField_BorderWidth);--_ui5-v1-24-0_radio_button_outer_ring_bg: var(--sapField_Background);--_ui5-v1-24-0_radio_button_outer_ring_hover_color: var(--sapField_Hover_BorderColor);--_ui5-v1-24-0_radio_button_outer_ring_active_color: var(--sapField_Hover_BorderColor);--_ui5-v1-24-0_radio_button_outer_ring_checked_hover_color: var(--sapField_Hover_BorderColor);--_ui5-v1-24-0_radio_button_outer_ring_padding_with_label: 0 .6875rem;--_ui5-v1-24-0_radio_button_border: none;--_ui5-v1-24-0_radio_button_focus_border: none;--_ui5-v1-24-0_radio_button_focus_outline: block;--_ui5-v1-24-0_radio_button_color: var(--sapField_BorderColor);--_ui5-v1-24-0_radio_button_label_offset: 1px;--_ui5-v1-24-0_radio_button_items_align: unset;--_ui5-v1-24-0_radio_button_information_border_width: var(--sapField_InformationBorderWidth);--_ui5-v1-24-0_radio_button_border_width: var(--sapContent_FocusWidth);--_ui5-v1-24-0_radio_button_border_radius: .5rem;--_ui5-v1-24-0_radio_button_label_color: var(--sapField_TextColor);--_ui5-v1-24-0_radio_button_inner_ring_radius: 27.5%;--_ui5-v1-24-0_radio_button_outer_ring_padding: 0 .6875rem;--_ui5-v1-24-0_radio_button_read_only_border_type: 4,2;--_ui5-v1-24-0_radio_button_inner_ring_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-24-0_radio_button_checked_warning_fill: var(--sapField_WarningColor);--_ui5-v1-24-0_radio_button_read_only_inner_ring_color: var(--sapField_TextColor);--_ui5-v1-24-0_radio_button_read_only_border_width: var(--sapElement_BorderWidth);--_ui5-v1-24-0_radio_button_hover_fill: var(--sapContent_Selected_Hover_Background);--_ui5-v1-24-0_radio_button_focus_dist: .375rem;--_ui5-v1-24-0_switch_height: 2.75rem;--_ui5-v1-24-0_switch_foucs_border_size: 1px;--_ui5-v1-24-0-switch-root-border-radius: 0;--_ui5-v1-24-0-switch-root-box-shadow: none;--_ui5-v1-24-0-switch-focus: "";--_ui5-v1-24-0_switch_track_border_radius: .75rem;--_ui5-v1-24-0-switch-track-border: 1px solid;--_ui5-v1-24-0_switch_track_transition: none;--_ui5-v1-24-0_switch_handle_border_radius: 1rem;--_ui5-v1-24-0-switch-handle-icon-display: none;--_ui5-v1-24-0-switch-slider-texts-display: inline;--_ui5-v1-24-0_switch_width: 3.5rem;--_ui5-v1-24-0_switch_min_width: none;--_ui5-v1-24-0_switch_with_label_width: 3.875rem;--_ui5-v1-24-0_switch_focus_outline: none;--_ui5-v1-24-0_switch_root_after_outline: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-24-0_switch_root_after_boreder: none;--_ui5-v1-24-0_switch_root_after_boreder_radius: 1rem;--_ui5-v1-24-0_switch_root_outline_top: .5rem;--_ui5-v1-24-0_switch_root_outline_bottom: .5rem;--_ui5-v1-24-0_switch_root_outline_left: .375rem;--_ui5-v1-24-0_switch_root_outline_right: .375rem;--_ui5-v1-24-0_switch_disabled_opacity: var(--sapContent_DisabledOpacity);--_ui5-v1-24-0_switch_transform: translateX(100%) translateX(-1.625rem);--_ui5-v1-24-0_switch_transform_with_label: translateX(100%) translateX(-1.875rem);--_ui5-v1-24-0_switch_rtl_transform: translateX(-100%) translateX(1.625rem);--_ui5-v1-24-0_switch_rtl_transform_with_label: translateX(-100%) translateX(1.875rem);--_ui5-v1-24-0_switch_track_width: 2.5rem;--_ui5-v1-24-0_switch_track_height: 1.5rem;--_ui5-v1-24-0_switch_track_with_label_width: 2.875rem;--_ui5-v1-24-0_switch_track_with_label_height: 1.5rem;--_ui5-v1-24-0_switch_track_active_background_color: var(--sapButton_Track_Selected_Background);--_ui5-v1-24-0_switch_track_inactive_background_color: var(--sapButton_Track_Background);--_ui5-v1-24-0_switch_track_hover_active_background_color: var(--sapButton_Track_Selected_Hover_Background);--_ui5-v1-24-0_switch_track_hover_inactive_background_color: var(--sapButton_Track_Hover_Background);--_ui5-v1-24-0_switch_track_active_border_color: var(--sapButton_Track_Selected_BorderColor);--_ui5-v1-24-0_switch_track_inactive_border_color: var(--sapButton_Track_BorderColor);--_ui5-v1-24-0_switch_track_hover_active_border_color: var(--sapButton_Track_Selected_Hover_BorderColor);--_ui5-v1-24-0_switch_track_hover_inactive_border_color: var(--sapButton_Track_Hover_BorderColor);--_ui5-v1-24-0_switch_track_semantic_accept_background_color: var(--sapButton_Track_Positive_Background);--_ui5-v1-24-0_switch_track_semantic_reject_background_color: var(--sapButton_Track_Negative_Background);--_ui5-v1-24-0_switch_track_semantic_hover_accept_background_color: var(--sapButton_Track_Positive_Hover_Background);--_ui5-v1-24-0_switch_track_semantic_hover_reject_background_color: var(--sapButton_Track_Negative_Hover_Background);--_ui5-v1-24-0_switch_track_semantic_accept_border_color: var(--sapButton_Track_Positive_BorderColor);--_ui5-v1-24-0_switch_track_semantic_reject_border_color: var(--sapButton_Track_Negative_BorderColor);--_ui5-v1-24-0_switch_track_semantic_hover_accept_border_color: var(--sapButton_Track_Positive_Hover_BorderColor);--_ui5-v1-24-0_switch_track_semantic_hover_reject_border_color: var(--sapButton_Track_Negative_Hover_BorderColor);--_ui5-v1-24-0_switch_track_icon_display: inline-block;--_ui5-v1-24-0_switch_handle_width: 1.5rem;--_ui5-v1-24-0_switch_handle_height: 1.25rem;--_ui5-v1-24-0_switch_handle_with_label_width: 1.75rem;--_ui5-v1-24-0_switch_handle_with_label_height: 1.25rem;--_ui5-v1-24-0_switch_handle_border: var(--_ui5-v1-24-0_switch_handle_border_width) solid var(--sapButton_Handle_BorderColor);--_ui5-v1-24-0_switch_handle_border_width: .125rem;--_ui5-v1-24-0_switch_handle_active_background_color: var(--sapButton_Handle_Selected_Background);--_ui5-v1-24-0_switch_handle_inactive_background_color: var(--sapButton_Handle_Background);--_ui5-v1-24-0_switch_handle_hover_active_background_color: var(--sapButton_Handle_Selected_Hover_Background);--_ui5-v1-24-0_switch_handle_hover_inactive_background_color: var(--sapButton_Handle_Hover_Background);--_ui5-v1-24-0_switch_handle_active_border_color: var(--sapButton_Handle_Selected_BorderColor);--_ui5-v1-24-0_switch_handle_inactive_border_color: var(--sapButton_Handle_BorderColor);--_ui5-v1-24-0_switch_handle_hover_active_border_color: var(--sapButton_Handle_Selected_BorderColor);--_ui5-v1-24-0_switch_handle_hover_inactive_border_color: var(--sapButton_Handle_BorderColor);--_ui5-v1-24-0_switch_handle_semantic_accept_background_color: var(--sapButton_Handle_Positive_Background);--_ui5-v1-24-0_switch_handle_semantic_reject_background_color: var(--sapButton_Handle_Negative_Background);--_ui5-v1-24-0_switch_handle_semantic_hover_accept_background_color: var(--sapButton_Handle_Positive_Hover_Background);--_ui5-v1-24-0_switch_handle_semantic_hover_reject_background_color: var(--sapButton_Handle_Negative_Hover_Background);--_ui5-v1-24-0_switch_handle_semantic_accept_border_color: var(--sapButton_Handle_Positive_BorderColor);--_ui5-v1-24-0_switch_handle_semantic_reject_border_color: var(--sapButton_Handle_Negative_BorderColor);--_ui5-v1-24-0_switch_handle_semantic_hover_accept_border_color: var(--sapButton_Handle_Positive_BorderColor);--_ui5-v1-24-0_switch_handle_semantic_hover_reject_border_color: var(--sapButton_Handle_Negative_BorderColor);--_ui5-v1-24-0_switch_handle_on_hover_box_shadow: 0 0 0 .125rem var(--sapButton_Handle_Selected_Hover_BorderColor);--_ui5-v1-24-0_switch_handle_off_hover_box_shadow: 0 0 0 .125rem var(--sapButton_Handle_Hover_BorderColor);--_ui5-v1-24-0_switch_handle_semantic_on_hover_box_shadow: 0 0 0 .125rem var(--sapButton_Handle_Positive_Hover_BorderColor);--_ui5-v1-24-0_switch_handle_semantic_off_hover_box_shadow: 0 0 0 .125rem var(--sapButton_Handle_Negative_Hover_BorderColor);--_ui5-v1-24-0_switch_handle_left: .0625rem;--_ui5-v1-24-0_switch_text_font_family: var(--sapContent_IconFontFamily);--_ui5-v1-24-0_switch_text_font_size: var(--sapFontLargeSize);--_ui5-v1-24-0_switch_text_width: 1.25rem;--_ui5-v1-24-0_switch_text_with_label_font_family: "72-Condensed-Bold" , "72" , "72full" , Arial, Helvetica, sans-serif;--_ui5-v1-24-0_switch_text_with_label_font_size: var(--sapFontSmallSize);--_ui5-v1-24-0_switch_text_with_label_width: 1.75rem;--_ui5-v1-24-0_switch_text_inactive_left: .1875rem;--_ui5-v1-24-0_switch_text_inactive_left_alternate: .0625rem;--_ui5-v1-24-0_switch_text_inactive_right: auto;--_ui5-v1-24-0_switch_text_inactive_right_alternate: 0;--_ui5-v1-24-0_switch_text_active_left: .1875rem;--_ui5-v1-24-0_switch_text_active_left_alternate: .0625rem;--_ui5-v1-24-0_switch_text_active_right: auto;--_ui5-v1-24-0_switch_text_active_color: var(--sapButton_Handle_Selected_TextColor);--_ui5-v1-24-0_switch_text_inactive_color: var(--sapButton_Handle_TextColor);--_ui5-v1-24-0_switch_text_semantic_accept_color: var(--sapButton_Handle_Positive_TextColor);--_ui5-v1-24-0_switch_text_semantic_reject_color: var(--sapButton_Handle_Negative_TextColor);--_ui5-v1-24-0_switch_text_overflow: hidden;--_ui5-v1-24-0_switch_text_z_index: 1;--_ui5-v1-24-0_switch_text_hidden: hidden;--_ui5-v1-24-0_switch_text_min_width: none;--_ui5-v1-24-0_switch_icon_width: 1rem;--_ui5-v1-24-0_switch_icon_height: 1rem;--_ui5-v1-24-0_select_disabled_background: var(--sapField_Background);--_ui5-v1-24-0_select_disabled_border_color: var(--sapField_BorderColor);--_ui5-v1-24-0_select_state_error_warning_border_style: solid;--_ui5-v1-24-0_select_state_error_warning_border_width: .125rem;--_ui5-v1-24-0_select_focus_width: 1px;--_ui5-v1-24-0_select_label_color: var(--sapField_TextColor);--_ui5-v1-24-0_select_hover_icon_left_border: none;--_ui5-v1-24-0_select_option_focus_border_radius: var(--sapElement_BorderCornerRadius);--_ui5-v1-24-0_split_button_host_transparent_hover_background: transparent;--_ui5-v1-24-0_split_button_transparent_disabled_background: transparent;--_ui5-v1-24-0_split_button_host_default_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_BorderColor);--_ui5-v1-24-0_split_button_host_attention_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Attention_BorderColor);--_ui5-v1-24-0_split_button_host_emphasized_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Emphasized_BorderColor);--_ui5-v1-24-0_split_button_host_positive_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Accept_BorderColor);--_ui5-v1-24-0_split_button_host_negative_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Reject_BorderColor);--_ui5-v1-24-0_split_button_host_transparent_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_Lite_BorderColor);--_ui5-v1-24-0_split_text_button_border_color: transparent;--_ui5-v1-24-0_split_text_button_background_color: transparent;--_ui5-v1-24-0_split_text_button_emphasized_border: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-24-0_split_text_button_emphasized_border_width: .0625rem;--_ui5-v1-24-0_split_text_button_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-24-0_split_text_button_emphasized_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-24-0_split_text_button_positive_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-24-0_split_text_button_negative_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-24-0_split_text_button_attention_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-24-0_split_text_button_transparent_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-24-0_split_arrow_button_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-24-0_split_arrow_button_emphasized_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-24-0_split_arrow_button_emphasized_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-24-0_split_arrow_button_positive_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-24-0_split_arrow_button_negative_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-24-0_split_arrow_button_attention_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-24-0_split_arrow_button_transparent_hover_border: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-24-0_split_text_button_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-24-0_split_text_button_emphasized_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Emphasized_BorderColor);--_ui5-v1-24-0_split_text_button_positive_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-24-0_split_text_button_negative_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-24-0_split_text_button_attention_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-24-0_split_text_button_transparent_hover_border_left: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-24-0_split_button_focused_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-24-0_split_button_focused_border_radius: .375rem;--_ui5-v1-24-0_split_button_hover_border_radius: var(--_ui5-v1-24-0_button_border_radius);--_ui5-v1-24-0_split_button_middle_separator_width: 0;--_ui5-v1-24-0_split_button_middle_separator_left: -.0625rem;--_ui5-v1-24-0_split_button_middle_separator_hover_display: none;--_ui5-v1-24-0_split_button_text_button_width: 2.375rem;--_ui5-v1-24-0_split_button_text_button_right_border_width: .0625rem;--_ui5-v1-24-0_split_button_transparent_hover_background: var(--sapButton_Lite_Hover_Background);--_ui5-v1-24-0_split_button_transparent_hover_color: var(--sapButton_TextColor);--_ui5-v1-24-0_split_button_host_transparent_hover_box_shadow: inset 0 0 0 var(--sapButton_BorderWidth) var(--sapButton_BorderColor);--_ui5-v1-24-0_split_button_inner_focused_border_radius_outer: .375rem;--_ui5-v1-24-0_split_button_inner_focused_border_radius_inner: .375rem;--_ui5-v1-24-0_split_button_emphasized_separator_color: transparent;--_ui5-v1-24-0_split_button_positive_separator_color: transparent;--_ui5-v1-24-0_split_button_negative_separator_color: transparent;--_ui5-v1-24-0_split_button_attention_separator_color: transparent;--_ui5-v1-24-0_split_button_attention_separator_color_default: var(--sapButton_Attention_TextColor);--_ui5-v1-24-0_split_text_button_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-24-0_split_text_button_emphasized_hover_border_right: none;--_ui5-v1-24-0_split_text_button_positive_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Accept_BorderColor);--_ui5-v1-24-0_split_text_button_negative_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Reject_BorderColor);--_ui5-v1-24-0_split_text_button_attention_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_Attention_BorderColor);--_ui5-v1-24-0_split_text_button_transparent_hover_border_right: var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);--_ui5-v1-24-0_split_button_middle_separator_hover_display_emphasized: none;--_ui5-v1-24-0_tc_header_height: var(--_ui5-v1-24-0_tc_item_height);--_ui5-v1-24-0_tc_header_height_text_only: var(--_ui5-v1-24-0_tc_item_text_only_height);--_ui5-v1-24-0_tc_header_height_text_with_additional_text: var(--_ui5-v1-24-0_tc_item_text_only_with_additional_text_height);--_ui5-v1-24-0_tc_header_box_shadow: var(--sapContent_HeaderShadow);--_ui5-v1-24-0_tc_header_background: var(--sapObjectHeader_Background);--_ui5-v1-24-0_tc_header_background_translucent: var(--sapObjectHeader_Background);--_ui5-v1-24-0_tc_content_background: var(--sapBackgroundColor);--_ui5-v1-24-0_tc_content_background_translucent: var(--sapGroup_ContentBackground);--_ui5-v1-24-0_tc_headeritem_padding: 1rem;--_ui5-v1-24-0_tc_headerItem_additional_text_color: var(--sapContent_LabelColor);--_ui5-v1-24-0_tc_headerItem_text_selected_color: var(--sapSelectedColor);--_ui5-v1-24-0_tc_headerItem_text_selected_hover_color: var(--sapSelectedColor);--_ui5-v1-24-0_tc_headerItem_additional_text_font_weight: normal;--_ui5-v1-24-0_tc_headerItem_neutral_color: var(--sapNeutralTextColor);--_ui5-v1-24-0_tc_headerItem_positive_color: var(--sapPositiveTextColor);--_ui5-v1-24-0_tc_headerItem_negative_color: var(--sapNegativeTextColor);--_ui5-v1-24-0_tc_headerItem_critical_color: var(--sapCriticalTextColor);--_ui5-v1-24-0_tc_headerItem_neutral_border_color: var(--sapNeutralElementColor);--_ui5-v1-24-0_tc_headerItem_positive_border_color: var(--sapPositiveElementColor);--_ui5-v1-24-0_tc_headerItem_negative_border_color: var(--sapNegativeElementColor);--_ui5-v1-24-0_tc_headerItem_critical_border_color: var(--sapCriticalElementColor);--_ui5-v1-24-0_tc_headerItem_neutral_selected_border_color: var(--_ui5-v1-24-0_tc_headerItem_neutral_color);--_ui5-v1-24-0_tc_headerItem_positive_selected_border_color: var(--_ui5-v1-24-0_tc_headerItem_positive_color);--_ui5-v1-24-0_tc_headerItem_negative_selected_border_color: var(--_ui5-v1-24-0_tc_headerItem_negative_color);--_ui5-v1-24-0_tc_headerItem_critical_selected_border_color: var(--_ui5-v1-24-0_tc_headerItem_critical_color);--_ui5-v1-24-0_tc_headerItem_transition: none;--_ui5-v1-24-0_tc_headerItem_hover_border_visibility: hidden;--_ui5-v1-24-0_tc_headerItemContent_border_radius: .125rem .125rem 0 0;--_ui5-v1-24-0_tc_headerItemContent_border_bg: transparent;--_ui5-v1-24-0_tc_headerItem_neutral_border_bg: transparent;--_ui5-v1-24-0_tc_headerItem_positive_border_bg: transparent;--_ui5-v1-24-0_tc_headerItem_negative_border_bg: transparent;--_ui5-v1-24-0_tc_headerItem_critical_border_bg: transparent;--_ui5-v1-24-0_tc_headerItemContent_border_height: 0;--_ui5-v1-24-0_tc_headerItemContent_focus_offset: 1rem;--_ui5-v1-24-0_tc_headerItem_text_focus_border_offset_left: 0px;--_ui5-v1-24-0_tc_headerItem_text_focus_border_offset_right: 0px;--_ui5-v1-24-0_tc_headerItem_text_focus_border_offset_top: 0px;--_ui5-v1-24-0_tc_headerItem_text_focus_border_offset_bottom: 0px;--_ui5-v1-24-0_tc_headerItem_mixed_mode_focus_border_offset_left: .75rem;--_ui5-v1-24-0_tc_headerItem_mixed_mode_focus_border_offset_right: .625rem;--_ui5-v1-24-0_tc_headerItem_mixed_mode_focus_border_offset_top: .75rem;--_ui5-v1-24-0_tc_headerItem_mixed_mode_focus_border_offset_bottom: .75rem;--_ui5-v1-24-0_tc_headerItemContent_focus_border: none;--_ui5-v1-24-0_tc_headerItemContent_default_focus_border: none;--_ui5-v1-24-0_tc_headerItemContent_focus_border_radius: 0;--_ui5-v1-24-0_tc_headerItemSemanticIcon_display: none;--_ui5-v1-24-0_tc_headerItemSemanticIcon_size: .75rem;--_ui5-v1-24-0_tc_mixedMode_itemText_font_family: var(--sapFontFamily);--_ui5-v1-24-0_tc_mixedMode_itemText_font_size: var(--sapFontSmallSize);--_ui5-v1-24-0_tc_mixedMode_itemText_font_weight: normal;--_ui5-v1-24-0_tc_overflowItem_positive_color: var(--sapPositiveColor);--_ui5-v1-24-0_tc_overflowItem_negative_color: var(--sapNegativeColor);--_ui5-v1-24-0_tc_overflowItem_critical_color: var(--sapCriticalColor);--_ui5-v1-24-0_tc_overflowItem_focus_offset: .125rem;--_ui5-v1-24-0_tc_overflowItem_extraIndent: 0rem;--_ui5-v1-24-0_tc_headerItemIcon_positive_selected_background: var(--sapPositiveColor);--_ui5-v1-24-0_tc_headerItemIcon_negative_selected_background: var(--sapNegativeColor);--_ui5-v1-24-0_tc_headerItemIcon_critical_selected_background: var(--sapCriticalColor);--_ui5-v1-24-0_tc_headerItemIcon_neutral_selected_background: var(--sapNeutralColor);--_ui5-v1-24-0_tc_headerItemIcon_semantic_selected_color: var(--sapGroup_ContentBackground);--_ui5-v1-24-0_tc_header_border_bottom: .0625rem solid var(--sapObjectHeader_Background);--_ui5-v1-24-0_tc_headerItemContent_border_bottom: .1875rem solid var(--sapSelectedColor);--_ui5-v1-24-0_tc_headerItem_color: var(--sapTextColor);--_ui5-v1-24-0_tc_overflowItem_default_color: var(--sapTextColor);--_ui5-v1-24-0_tc_overflowItem_current_color: CurrentColor;--_ui5-v1-24-0_tc_content_border_bottom: .0625rem solid var(--sapObjectHeader_BorderColor);--_ui5-v1-24-0_tc_headerItem_expand_button_margin_inline_start: 0rem;--_ui5-v1-24-0_tc_headerItem_single_click_expand_button_margin_inline_start: .25rem;--_ui5-v1-24-0_tc_headerItem_expand_button_border_radius: .25rem;--_ui5-v1-24-0_tc_headerItem_expand_button_separator_display: inline-block;--_ui5-v1-24-0_tc_headerItem_focus_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-24-0_tc_headerItem_focus_border_offset: -5px;--_ui5-v1-24-0_tc_headerItemIcon_focus_border_radius: 50%;--_ui5-v1-24-0_tc_headerItem_focus_border_radius: .375rem;--_ui5-v1-24-0_tc_headeritem_text_font_weight: bold;--_ui5-v1-24-0_tc_headerItem_focus_offset: 1px;--_ui5-v1-24-0_tc_headerItem_text_hover_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-24-0_tc_headerItemIcon_border: .125rem solid var(--sapContent_Selected_ForegroundColor);--_ui5-v1-24-0_tc_headerItemIcon_color: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-24-0_tc_headerItemIcon_selected_background: var(--sapContent_Selected_ForegroundColor);--_ui5-v1-24-0_tc_headerItemIcon_background_color: var(--sapContent_Selected_Background);--_ui5-v1-24-0_tc_headerItemIcon_selected_color: var(--sapContent_ContrastIconColor);--_ui5-v1-24-0_tc_mixedMode_itemText_color: var(--sapTextColor);--_ui5-v1-24-0_tc_overflow_text_color: var(--sapTextColor);--_ui5-v1-24-0_textarea_state_border_width: .125rem;--_ui5-v1-24-0_textarea_information_border_width: .125rem;--_ui5-v1-24-0_textarea_placeholder_font_style: italic;--_ui5-v1-24-0_textarea_value_state_error_warning_placeholder_font_weight: normal;--_ui5-v1-24-0_textarea_error_placeholder_font_style: italic;--_ui5-v1-24-0_textarea_error_placeholder_color: var(--sapField_PlaceholderTextColor);--_ui5-v1-24-0_textarea_error_hover_background_color: var(--sapField_Hover_Background);--_ui5-v1-24-0_textarea_disabled_opacity: .4;--_ui5-v1-24-0_textarea_focus_pseudo_element_content: "";--_ui5-v1-24-0_textarea_min_height: 2.25rem;--_ui5-v1-24-0_textarea_padding_right_and_left_readonly: .5625rem;--_ui5-v1-24-0_textarea_padding_top_readonly: .4375rem;--_ui5-v1-24-0_textarea_exceeded_text_height: 1rem;--_ui5-v1-24-0_textarea_hover_border: none;--_ui5-v1-24-0_textarea_focus_border_radius: .25rem;--_ui5-v1-24-0_textarea_error_warning_border_style: none;--_ui5-v1-24-0_textarea_line_height: 1.5;--_ui5-v1-24-0_textarea_focused_value_state_error_background: var(--sapField_Hover_Background);--_ui5-v1-24-0_textarea_focused_value_state_warning_background: var(--sapField_Hover_Background);--_ui5-v1-24-0_textarea_focused_value_state_success_background: var(--sapField_Hover_Background);--_ui5-v1-24-0_textarea_focused_value_state_information_background: var(--sapField_Hover_Background);--_ui5-v1-24-0_textarea_focused_value_state_error_focus_outline_color: var(--sapField_InvalidColor);--_ui5-v1-24-0_textarea_focused_value_state_warning_focus_outline_color: var(--sapField_WarningColor);--_ui5-v1-24-0_textarea_focused_value_state_success_focus_outline_color: var(--sapField_SuccessColor);--_ui5-v1-24-0_textarea_focus_offset: 0;--_ui5-v1-24-0_textarea_readonly_focus_offset: 1px;--_ui5-v1-24-0_textarea_focus_outline_color: var(--sapField_Active_BorderColor);--_ui5-v1-24-0_textarea_value_state_focus_offset: 0;--_ui5-v1-24-0_textarea_wrapper_padding: .0625rem;--_ui5-v1-24-0_textarea_success_wrapper_padding: .0625rem;--_ui5-v1-24-0_textarea_warning_error_wrapper_padding: .0625rem .0625rem .125rem .0625rem;--_ui5-v1-24-0_textarea_information_wrapper_padding: .0625rem .0625rem .125rem .0625rem;--_ui5-v1-24-0_textarea_padding_bottom_readonly: .375rem;--_ui5-v1-24-0_textarea_padding_top_error_warning: .5rem;--_ui5-v1-24-0_textarea_padding_bottom_error_warning: .4375rem;--_ui5-v1-24-0_textarea_padding_top_information: .5rem;--_ui5-v1-24-0_textarea_padding_bottom_information: .4375rem;--_ui5-v1-24-0_textarea_padding_right_and_left: .625rem;--_ui5-v1-24-0_textarea_padding_right_and_left_error_warning: .625rem;--_ui5-v1-24-0_textarea_padding_right_and_left_information: .625rem;--_ui5-v1-24-0_textarea_readonly_border_style: dashed;--_ui5-v1-24-0_time_picker_border: .0625rem solid transparent;--_ui5-v1-24-0-time_picker_border_radius: .25rem;--_ui5-v1-24-0_toast_vertical_offset: 3rem;--_ui5-v1-24-0_toast_horizontal_offset: 2rem;--_ui5-v1-24-0_toast_background: var(--sapList_Background);--_ui5-v1-24-0_toast_shadow: var(--sapContent_Shadow2);--_ui5-v1-24-0_toast_offset_width: -.1875rem;--_ui5-v1-24-0_wheelslider_item_text_size: var(--sapFontSize);--_ui5-v1-24-0_wheelslider_label_text_size: var(--sapFontSmallSize);--_ui5-v1-24-0_wheelslider_selection_frame_margin_top: calc(var(--_ui5-v1-24-0_wheelslider_item_height) * 2);--_ui5-v1-24-0_wheelslider_mobile_selection_frame_margin_top: calc(var(--_ui5-v1-24-0_wheelslider_item_height) * 4);--_ui5-v1-24-0_wheelslider_label_text_color: var(--sapContent_LabelColor);--_ui5-v1-24-0_wheelslider_height: 240px;--_ui5-v1-24-0_wheelslider_mobile_height: 432px;--_ui5-v1-24-0_wheelslider_item_width: 48px;--_ui5-v1-24-0_wheelslider_item_height: 46px;--_ui5-v1-24-0_wheelslider_arrows_visibility: hidden;--_ui5-v1-24-0_wheelslider_item_background_color: var(--sapLegend_WorkingBackground);--_ui5-v1-24-0_wheelslider_item_text_color: var(--sapTextColor);--_ui_wheelslider_item_hover_color: var(--sapList_AlternatingBackground);--_ui_wheelslider_item_expanded_hover_color: var(--sapList_AlternatingBackground);--_ui_wheelslider_item_exanded_hover_color: var(--sapList_AlternatingBackground);--_ui5-v1-24-0_wheelslider_item_border_color: var(--sapList_SelectionBorderColor);--_ui5-v1-24-0_wheelslider_item_expanded_border_color: transparent;--_ui5-v1-24-0_wheelslider_item_hovered_border_color: transparent;--_ui5-v1-24-0_wheelslider_collapsed_item_text_color: var(--sapList_SelectionBorderColor);--_ui5-v1-24-0_wheelslider_selected_item_background_color: var(--sapContent_Selected_Background);--_ui5-v1-24-0_wheelslider_selected_item_hover_background_color: var(--sapButton_Emphasized_Hover_BorderColor);--_ui5-v1-24-0_wheelslider_active_item_background_color:var(--sapContent_Selected_Background);--_ui5-v1-24-0_wheelslider_active_item_text_color: var(--sapContent_Selected_TextColor);--_ui5-v1-24-0_wheelslider_selection_frame_color: var(--sapList_SelectionBorderColor);--_ui_wheelslider_item_border_radius: var(--_ui5-v1-24-0_button_border_radius);--_ui5-v1-24-0_toggle_button_pressed_focussed: var(--sapButton_Selected_BorderColor);--_ui5-v1-24-0_toggle_button_pressed_focussed_hovered: var(--sapButton_Selected_BorderColor);--_ui5-v1-24-0_toggle_button_selected_positive_text_color: var(--sapButton_Selected_TextColor);--_ui5-v1-24-0_toggle_button_selected_negative_text_color: var(--sapButton_Selected_TextColor);--_ui5-v1-24-0_toggle_button_selected_attention_text_color: var(--sapButton_Selected_TextColor);--_ui5-v1-24-0_toggle_button_emphasized_pressed_focussed_hovered: var(--sapContent_FocusColor);--_ui5-v1-24-0_toggle_button_emphasized_text_shadow: none;--_ui5-v1-24-0_yearpicker_item_selected_focus: var(--sapContent_Selected_Background);--_ui5-v1-24-0_yearpicker_item_border: none;--_ui5-v1-24-0_yearpicker_item_margin: 1px;--_ui5-v1-24-0_yearpicker_item_border_radius: .5rem;--_ui5-v1-24-0_yearpicker_item_focus_after_offset: .25rem;--_ui5-v1-24-0_yearpicker_item_focus_after_border: var(--_ui5-v1-24-0_button_focused_border);--_ui5-v1-24-0_yearpicker_item_focus_after_border_radius: .5rem;--_ui5-v1-24-0_yearpicker_item_focus_after_width: calc(100% - .5rem) ;--_ui5-v1-24-0_yearpicker_item_focus_after_height: calc(100% - .5rem) ;--_ui5-v1-24-0_yearpicker_item_selected_background_color: transparent;--_ui5-v1-24-0_yearpicker_item_selected_text_color: var(--sapContent_Selected_TextColor);--_ui5-v1-24-0_yearpicker_item_selected_box_shadow: none;--_ui5-v1-24-0_yearpicker_item_selected_hover_color: var(--sapList_Hover_Background);--_ui5-v1-24-0_yearpicker_item_focus_after_outline: none;--_ui5-v1-24-0_calendar_header_middle_button_width: 6.25rem;--_ui5-v1-24-0_calendar_header_middle_button_flex: 1 1 auto;--_ui5-v1-24-0_calendar_header_middle_button_focus_after_display: block;--_ui5-v1-24-0_calendar_header_middle_button_focus_after_width: calc(100% - .375rem) ;--_ui5-v1-24-0_calendar_header_middle_button_focus_after_height: calc(100% - .375rem) ;--_ui5-v1-24-0_calendar_header_middle_button_focus_after_top_offset: .125rem;--_ui5-v1-24-0_calendar_header_middle_button_focus_after_left_offset: .125rem;--_ui5-v1-24-0_calendar_header_arrow_button_border: none;--_ui5-v1-24-0_calendar_header_arrow_button_border_radius: .5rem;--_ui5-v1-24-0_calendar_header_button_background_color: var(--sapButton_Lite_Background);--_ui5-v1-24-0_calendar_header_arrow_button_box_shadow: 0 0 .125rem 0 rgb(85 107 130 / 72%);--_ui5-v1-24-0_calendar_header_middle_button_focus_border_radius: .5rem;--_ui5-v1-24-0_calendar_header_middle_button_focus_border: none;--_ui5-v1-24-0_calendar_header_middle_button_focus_after_border: none;--_ui5-v1-24-0_calendar_header_middle_button_focus_background: transparent;--_ui5-v1-24-0_calendar_header_middle_button_focus_outline: .125rem solid var(--sapSelectedColor);--_ui5-v1-24-0_calendar_header_middle_button_focus_active_outline: .0625rem solid var(--sapSelectedColor);--_ui5-v1-24-0_calendar_header_middle_button_focus_active_background: transparent;--_ui5-v1-24-0_token_background: var(--sapButton_TokenBackground);--_ui5-v1-24-0_token_readonly_background: var(--sapButton_TokenBackground);--_ui5-v1-24-0_token_readonly_color: var(--sapContent_LabelColor);--_ui5-v1-24-0_token_right_margin: .3125rem;--_ui5-v1-24-0_token_padding: .25rem 0;--_ui5-v1-24-0_token_left_padding: .3125rem;--_ui5-v1-24-0_token_focused_selected_border: 1px solid var(--sapButton_Selected_BorderColor);--_ui5-v1-24-0_token_focus_offset: -.25rem;--_ui5-v1-24-0_token_focus_outline_width: .0625rem;--_ui5-v1-24-0_token_hover_border_color: var(--sapButton_TokenBorderColor);--_ui5-v1-24-0_token_selected_focus_outline: none;--_ui5-v1-24-0_token_focus_outline: none;--_ui5-v1-24-0_token_outline_offset: .125rem;--_ui5-v1-24-0_token_selected_hover_border_color: var(--sapButton_Selected_BorderColor);--ui5-v1-24-0_token_focus_pseudo_element_content: "";--_ui5-v1-24-0_token_border_radius: .375rem;--_ui5-v1-24-0_token_focus_outline_border_radius: .5rem;--_ui5-v1-24-0_token_text_color: var(--sapTextColor);--_ui5-v1-24-0_token_selected_text_font_family: var(--sapFontSemiboldDuplexFamily);--_ui5-v1-24-0_token_selected_internal_border_bottom: .125rem solid var(--sapButton_Selected_BorderColor);--_ui5-v1-24-0_token_selected_internal_border_bottom_radius: .1875rem;--_ui5-v1-24-0_token_text_icon_top: .0625rem;--_ui5-v1-24-0_token_selected_focused_offset_bottom: -.375rem;--_ui5-v1-24-0_token_readonly_padding: .25rem .3125rem;--_ui5-v1-24-0_tokenizer-popover_offset: .3125rem;--_ui5-v1-24-0_tokenizer_n_more_text_color: var(--sapLinkColor);--_ui5-v1-24-0-multi_combobox_token_margin_top: 1px;--_ui5-v1-24-0_slider_progress_container_dot_background: var(--sapField_BorderColor);--_ui5-v1-24-0_slider_progress_border: none;--_ui5-v1-24-0_slider_padding: 1.406rem 1.0625rem;--_ui5-v1-24-0_slider_inner_height: .25rem;--_ui5-v1-24-0_slider_outer_height: 1.6875rem;--_ui5-v1-24-0_slider_progress_border_radius: .25rem;--_ui5-v1-24-0_slider_tickmark_bg: var(--sapField_BorderColor);--_ui5-v1-24-0_slider_handle_margin_left: calc(-1 * (var(--_ui5-v1-24-0_slider_handle_width) / 2));--_ui5-v1-24-0_slider_handle_outline_offset: .075rem;--_ui5-v1-24-0_slider_progress_outline: .0625rem dotted var(--sapContent_FocusColor);--_ui5-v1-24-0_slider_progress_outline_offset: -.8125rem;--_ui5-v1-24-0_slider_disabled_opacity: .4;--_ui5-v1-24-0_slider_tooltip_border_color: var(--sapField_BorderColor);--_ui5-v1-24-0_range_slider_handle_background_focus: transparent;--_ui5-v1-24-0_slider_progress_box_sizing: content-box;--_ui5-v1-24-0_range_slider_focus_outline_width: 100%;--_ui5-v1-24-0_slider_progress_outline_offset_left: 0;--_ui5-v1-24-0_range_slider_focus_outline_radius: 0;--_ui5-v1-24-0_slider_progress_container_top: 0;--_ui5-v1-24-0_slider_progress_height: 100%;--_ui5-v1-24-0_slider_active_progress_border: none;--_ui5-v1-24-0_slider_active_progress_left: 0;--_ui5-v1-24-0_slider_active_progress_top: 0;--_ui5-v1-24-0_slider_no_tickmarks_progress_container_top: var(--_ui5-v1-24-0_slider_progress_container_top);--_ui5-v1-24-0_slider_no_tickmarks_progress_height: var(--_ui5-v1-24-0_slider_progress_height);--_ui5-v1-24-0_slider_no_tickmarks_active_progress_border: var(--_ui5-v1-24-0_slider_active_progress_border);--_ui5-v1-24-0_slider_no_tickmarks_active_progress_left: var(--_ui5-v1-24-0_slider_active_progress_left);--_ui5-v1-24-0_slider_no_tickmarks_active_progress_top: var(--_ui5-v1-24-0_slider_active_progress_top);--_ui5-v1-24-0_slider_handle_focus_visibility: none;--_ui5-v1-24-0_slider_handle_icon_size: 1rem;--_ui5-v1-24-0_slider_progress_container_background: var(--sapSlider_Background);--_ui5-v1-24-0_slider_progress_container_dot_display: block;--_ui5-v1-24-0_slider_inner_min_width: 4rem;--_ui5-v1-24-0_slider_progress_background: var(--sapSlider_Selected_Background);--_ui5-v1-24-0_slider_progress_before_background: var(--sapSlider_Selected_Background);--_ui5-v1-24-0_slider_progress_after_background: var(--sapContent_MeasureIndicatorColor);--_ui5-v1-24-0_slider_handle_background: var(--sapSlider_HandleBackground);--_ui5-v1-24-0_slider_handle_icon_display: inline-block;--_ui5-v1-24-0_slider_handle_border: .0625rem solid var(--sapSlider_HandleBorderColor);--_ui5-v1-24-0_slider_handle_border_radius: .5rem;--_ui5-v1-24-0_slider_handle_height: 1.5rem;--_ui5-v1-24-0_slider_handle_width: 2rem;--_ui5-v1-24-0_slider_handle_top: -.625rem;--_ui5-v1-24-0_slider_handle_font_family: "SAP-icons";--_ui5-v1-24-0_slider_handle_hover_border: .0625rem solid var(--sapSlider_Hover_HandleBorderColor);--_ui5-v1-24-0_slider_handle_focus_border: .125rem solid var(--sapContent_FocusColor);--_ui5-v1-24-0_slider_handle_background_focus: var(--sapSlider_Active_RangeHandleBackground);--_ui5-v1-24-0_slider_handle_outline: none;--_ui5-v1-24-0_slider_handle_hover_background: var(--sapSlider_Hover_HandleBackground);--_ui5-v1-24-0_slider_tooltip_background: var(--sapField_Focus_Background);--_ui5-v1-24-0_slider_tooltip_border: none;--_ui5-v1-24-0_slider_tooltip_border_radius: .5rem;--_ui5-v1-24-0_slider_tooltip_box_shadow: var(--sapContent_Shadow1);--_ui5-v1-24-0_range_slider_legacy_progress_focus_display: none;--_ui5-v1-24-0_range_slider_progress_focus_display: block;--_ui5-v1-24-0_slider_tickmark_in_range_bg: var(--sapSlider_Selected_BorderColor);--_ui5-v1-24-0_slider_label_fontsize: var(--sapFontSmallSize);--_ui5-v1-24-0_slider_label_color: var(--sapContent_LabelColor);--_ui5-v1-24-0_slider_tooltip_min_width: 2rem;--_ui5-v1-24-0_slider_tooltip_padding: .25rem;--_ui5-v1-24-0_slider_tooltip_fontsize: var(--sapFontSmallSize);--_ui5-v1-24-0_slider_tooltip_color: var(--sapContent_LabelColor);--_ui5-v1-24-0_slider_tooltip_height: 1.375rem;--_ui5-v1-24-0_slider_handle_focus_width: 1px;--_ui5-v1-24-0_slider_start_end_point_size: .5rem;--_ui5-v1-24-0_slider_start_end_point_left: -.75rem;--_ui5-v1-24-0_slider_start_end_point_top: -.125rem;--_ui5-v1-24-0_slider_handle_focused_tooltip_distance: calc(var(--_ui5-v1-24-0_slider_tooltip_bottom) - var(--_ui5-v1-24-0_slider_handle_focus_width));--_ui5-v1-24-0_slider_tooltip_border_box: border-box;--_ui5-v1-24-0_range_slider_handle_active_background: var(--sapSlider_Active_RangeHandleBackground);--_ui5-v1-24-0_range_slider_active_handle_icon_display: none;--_ui5-v1-24-0_range_slider_progress_focus_top: -15px;--_ui5-v1-24-0_range_slider_progress_focus_left: calc(-1 * (var(--_ui5-v1-24-0_slider_handle_width) / 2) - 5px);--_ui5-v1-24-0_range_slider_progress_focus_padding: 0 1rem 0 1rem;--_ui5-v1-24-0_range_slider_progress_focus_width: calc(100% + var(--_ui5-v1-24-0_slider_handle_width) + 10px);--_ui5-v1-24-0_range_slider_progress_focus_height: calc(var(--_ui5-v1-24-0_slider_handle_height) + 10px);--_ui5-v1-24-0_range_slider_root_hover_handle_icon_display: inline-block;--_ui5-v1-24-0_range_slider_root_hover_handle_bg: var(--_ui5-v1-24-0_slider_handle_hover_background);--_ui5-v1-24-0_range_slider_root_active_handle_icon_display: none;--_ui5-v1-24-0_slider_tickmark_height: .5rem;--_ui5-v1-24-0_slider_tickmark_top: -2px;--_ui5-v1-24-0_slider_handle_box_sizing: border-box;--_ui5-v1-24-0_range_slider_handle_background: var(--sapSlider_RangeHandleBackground);--_ui5-v1-24-0_slider_tooltip_bottom: 2rem;--_ui5-v1-24-0_value_state_message_border: none;--_ui5-v1-24-0_value_state_header_border: none;--_ui5-v1-24-0_input_value_state_icon_offset: .5rem;--_ui5-v1-24-0_value_state_header_box_shadow_error: inset 0 -.0625rem var(--sapField_InvalidColor);--_ui5-v1-24-0_value_state_header_box_shadow_information: inset 0 -.0625rem var(--sapField_InformationColor);--_ui5-v1-24-0_value_state_header_box_shadow_success: inset 0 -.0625rem var(--sapField_SuccessColor);--_ui5-v1-24-0_value_state_header_box_shadow_warning: inset 0 -.0625rem var(--sapField_WarningColor);--_ui5-v1-24-0_value_state_message_icon_offset_phone: 1rem;--_ui5-v1-24-0_value_state_header_border_bottom: none;--_ui5-v1-24-0_input_value_state_icon_display: inline-block;--_ui5-v1-24-0_value_state_message_padding: .5rem .5rem .5rem 1.875rem;--_ui5-v1-24-0_value_state_header_padding: .5rem .5rem .5rem 1.875rem;--_ui5-v1-24-0_value_state_message_popover_box_shadow: var(--sapContent_Shadow1);--_ui5-v1-24-0_value_state_message_icon_width: 1rem;--_ui5-v1-24-0_value_state_message_icon_height: 1rem;--_ui5-v1-24-0_value_state_header_offset: -.25rem;--_ui5-v1-24-0_value_state_message_popover_border_radius: var(--sapPopover_BorderCornerRadius);--_ui5-v1-24-0_value_state_message_padding_phone: .5rem .5rem .5rem 2.375rem;--_ui5-v1-24-0_value_state_message_line_height: 1.125rem;--ui5-v1-24-0_table_bottom_border: 1px solid var(--sapList_BorderColor);--ui5-v1-24-0_table_multiselect_column_width: 2.75rem;--ui5-v1-24-0_table_header_row_border_width: 1px;--_ui5-v1-24-0_table_load_more_border-bottom: none;--ui5-v1-24-0_table_header_row_outline_width: var(--sapContent_FocusWidth);--ui5-v1-24-0_table_header_row_font_family: var(--sapFontSemiboldDuplexFamily);--ui5-v1-24-0_table_header_row_border_bottom_color: var(--sapList_HeaderBorderColor);--ui5-v1-24-0_table_header_row_font_weight: bold;--ui5-v1-24-0_table_multiselect_popin_row_padding: 3.25rem;--ui5-v1-24-0_table_row_outline_width: var(--sapContent_FocusWidth);--ui5-v1-24-0_table_group_row_font-weight: bold;--ui5-v1-24-0_table_border_width: 1px 0 1px 0;--_ui5-v1-24-0-toolbar-padding-left: .5rem;--_ui5-v1-24-0-toolbar-padding-right: .5rem;--_ui5-v1-24-0-toolbar-item-margin-left: 0;--_ui5-v1-24-0-toolbar-item-margin-right: .25rem;--_ui5-v1-24-0_step_input_min_width: 7.25rem;--_ui5-v1-24-0_step_input_padding: 2.5rem;--_ui5-v1-24-0_step_input_input_error_background_color: inherit;--_ui5-v1-24-0-step_input_button_state_hover_background_color: var(--sapField_Hover_Background);--_ui5-v1-24-0_step_input_border_style: none;--_ui5-v1-24-0_step_input_border_style_hover: none;--_ui5-v1-24-0_step_input_button_background_color: transparent;--_ui5-v1-24-0_step_input_input_border: none;--_ui5-v1-24-0_step_input_input_margin_top: 0;--_ui5-v1-24-0_step_input_button_display: inline-flex;--_ui5-v1-24-0_step_input_button_left: 0;--_ui5-v1-24-0_step_input_button_right: 0;--_ui5-v1-24-0_step_input_input_border_focused_after: .125rem solid #0070f2;--_ui5-v1-24-0_step_input_input_border_top_bottom_focused_after: 0;--_ui5-v1-24-0_step_input_input_border_radius_focused_after: .25rem;--_ui5-v1-24-0_step_input_input_information_border_color_focused_after: var(--sapField_InformationColor);--_ui5-v1-24-0_step_input_input_warning_border_color_focused_after: var(--sapField_WarningColor);--_ui5-v1-24-0_step_input_input_success_border_color_focused_after: var(--sapField_SuccessColor);--_ui5-v1-24-0_step_input_input_error_border_color_focused_after: var(--sapField_InvalidColor);--_ui5-v1-24-0_step_input_disabled_button_background: none;--_ui5-v1-24-0_step_input_border_color_hover: none;--_ui5-v1-24-0_step_input_border_hover: none;--_ui5-v1-24-0_input_input_background_color: transparent;--_ui5-v1-24-0_load_more_padding: 0;--_ui5-v1-24-0_load_more_border: 1px top solid transparent;--_ui5-v1-24-0_load_more_border_radius: none;--_ui5-v1-24-0_load_more_outline_width: var(--sapContent_FocusWidth);--_ui5-v1-24-0_load_more_border-bottom: var(--sapList_BorderWidth) solid var(--sapList_BorderColor);--_ui5-v1-24-0_calendar_height: 24.5rem;--_ui5-v1-24-0_calendar_width: 20rem;--_ui5-v1-24-0_calendar_padding: 1rem;--_ui5-v1-24-0_calendar_left_right_padding: .5rem;--_ui5-v1-24-0_calendar_top_bottom_padding: 1rem;--_ui5-v1-24-0_calendar_header_height: 3rem;--_ui5-v1-24-0_calendar_header_arrow_button_width: 2.5rem;--_ui5-v1-24-0_calendar_header_padding: .25rem 0;--_ui5-v1-24-0_checkbox_root_side_padding: .6875rem;--_ui5-v1-24-0_checkbox_icon_size: 1rem;--_ui5-v1-24-0_checkbox_partially_icon_size: .75rem;--_ui5-v1-24-0_custom_list_item_rb_min_width: 2.75rem;--_ui5-v1-24-0_day_picker_item_width: 2.25rem;--_ui5-v1-24-0_day_picker_item_height: 2.875rem;--_ui5-v1-24-0_day_picker_empty_height: 3rem;--_ui5-v1-24-0_day_picker_item_justify_content: space-between;--_ui5-v1-24-0_dp_two_calendar_item_now_text_padding_top: .375rem;--_ui5-v1-24-0_daypicker_item_now_selected_two_calendar_focus_special_day_top: 2rem;--_ui5-v1-24-0_daypicker_item_now_selected_two_calendar_focus_special_day_right: 1.4375rem;--_ui5-v1-24-0_dp_two_calendar_item_primary_text_height: 1.8125rem;--_ui5-v1-24-0_dp_two_calendar_item_secondary_text_height: 1rem;--_ui5-v1-24-0_dp_two_calendar_item_text_padding_top: .4375rem;--_ui5-v1-24-0_daypicker_item_now_selected_two_calendar_focus_secondary_text_padding_block: 0 .5rem;--_ui5-v1-24-0_color-palette-swatch-container-padding: .3125rem .6875rem;--_ui5-v1-24-0_datetime_picker_width: 40.0625rem;--_ui5-v1-24-0_datetime_picker_height: 25rem;--_ui5-v1-24-0_datetime_timeview_width: 17rem;--_ui5-v1-24-0_datetime_timeview_phonemode_width: 19.5rem;--_ui5-v1-24-0_datetime_timeview_padding: 1rem;--_ui5-v1-24-0_datetime_timeview_phonemode_clocks_width: 24.5rem;--_ui5-v1-24-0_datetime_dateview_phonemode_margin_bottom: 0;--_ui5-v1-24-0_dialog_content_min_height: 2.75rem;--_ui5-v1-24-0_dialog_footer_height: 2.75rem;--_ui5-v1-24-0_input_inner_padding: 0 .625rem;--_ui5-v1-24-0_input_inner_padding_with_icon: 0 .25rem 0 .625rem;--_ui5-v1-24-0_input_inner_space_to_tokenizer: .125rem;--_ui5-v1-24-0_input_inner_space_to_n_more_text: .1875rem;--_ui5-v1-24-0_list_no_data_height: 3rem;--_ui5-v1-24-0_list_item_cb_margin_right: 0;--_ui5-v1-24-0_list_item_title_size: var(--sapFontLargeSize);--_ui5-v1-24-0_list_no_data_font_size: var(--sapFontLargeSize);--_ui5-v1-24-0_list_item_img_size: 3rem;--_ui5-v1-24-0_list_item_img_top_margin: .5rem;--_ui5-v1-24-0_list_item_img_bottom_margin: .5rem;--_ui5-v1-24-0_list_item_img_hn_margin: .75rem;--_ui5-v1-24-0_list_item_dropdown_base_height: 2.5rem;--_ui5-v1-24-0_list_item_base_height: var(--sapElement_LineHeight);--_ui5-v1-24-0_list_item_icon_size: 1.125rem;--_ui5-v1-24-0_list_item_icon_padding-inline-end: .5rem;--_ui5-v1-24-0_list_item_selection_btn_margin_top: calc(-1 * var(--_ui5-v1-24-0_checkbox_wrapper_padding));--_ui5-v1-24-0_list_item_content_vertical_offset: calc((var(--_ui5-v1-24-0_list_item_base_height) - var(--_ui5-v1-24-0_list_item_title_size)) / 2);--_ui5-v1-24-0_group_header_list_item_height: 2.75rem;--_ui5-v1-24-0_list_busy_row_height: 3rem;--_ui5-v1-24-0_month_picker_item_height: 3rem;--_ui5-v1-24-0_list_buttons_left_space: .125rem;--_ui5-v1-24-0_popup_default_header_height: 2.75rem;--_ui5-v1-24-0-notification-overflow-popover-padding: .25rem .5rem;--_ui5-v1-24-0_year_picker_item_height: 3rem;--_ui5-v1-24-0_tokenizer_padding: .25rem;--_ui5-v1-24-0_token_height: 1.625rem;--_ui5-v1-24-0_token_icon_size: .75rem;--_ui5-v1-24-0_token_icon_padding: .25rem .5rem;--_ui5-v1-24-0_token_wrapper_right_padding: .3125rem;--_ui5-v1-24-0_token_wrapper_left_padding: 0;--_ui5-v1-24-0_tl_bubble_padding: 1rem;--_ui5-v1-24-0_tl_indicator_before_bottom: -1.625rem;--_ui5-v1-24-0_tl_padding: 1rem 1rem 1rem .5rem;--_ui5-v1-24-0_tl_li_margin_bottom: 1.625rem;--_ui5-v1-24-0_switch_focus_width_size_horizon_exp: calc(100% + 4px) ;--_ui5-v1-24-0_switch_focus_height_size_horizon_exp: calc(100% + 4px) ;--_ui5-v1-24-0_tc_item_text: 3rem;--_ui5-v1-24-0_tc_item_height: 4.75rem;--_ui5-v1-24-0_tc_item_text_only_height: 2.75rem;--_ui5-v1-24-0_tc_item_text_only_with_additional_text_height: 3.75rem;--_ui5-v1-24-0_tc_item_text_line_height: 1.325rem;--_ui5-v1-24-0_tc_item_icon_circle_size: 2.75rem;--_ui5-v1-24-0_tc_item_icon_size: 1.25rem;--_ui5-v1-24-0_tc_item_add_text_margin_top: .375rem;--_ui5-v1-24-0_textarea_margin: .25rem 0;--_ui5-v1-24-0_radio_button_height: 2.75rem;--_ui5-v1-24-0_radio_button_label_side_padding: .875rem;--_ui5-v1-24-0_radio_button_inner_size: 2.75rem;--_ui5-v1-24-0_radio_button_svg_size: 1.375rem;--_ui5-v1-24-0-responsive_popover_header_height: 2.75rem;--ui5-v1-24-0_side_navigation_item_height: 2.75rem;--_ui5-v1-24-0_load_more_text_height: 2.75rem;--_ui5-v1-24-0_load_more_text_font_size: var(--sapFontMediumSize);--_ui5-v1-24-0_load_more_desc_padding: .375rem 2rem .875rem 2rem;--ui5-v1-24-0_table_header_row_height: 2.75rem;--ui5-v1-24-0_table_row_height: 2.75rem;--ui5-v1-24-0_table_focus_outline_offset: -.125rem;--ui5-v1-24-0_table_group_row_height: 2rem;--_ui5-v1-24-0-tree-indent-step: 1.5rem;--_ui5-v1-24-0-tree-toggle-box-width: 2.75rem;--_ui5-v1-24-0-tree-toggle-box-height: 2.25rem;--_ui5-v1-24-0-tree-toggle-icon-size: 1.0625rem;--_ui5-v1-24-0_timeline_tli_indicator_before_bottom: -1.625rem;--_ui5-v1-24-0_timeline_tli_indicator_before_right: -1.625rem;--_ui5-v1-24-0_timeline_tli_indicator_before_without_icon_bottom: -1.875rem;--_ui5-v1-24-0_timeline_tli_indicator_before_without_icon_right: -1.9375rem;--_ui5-v1-24-0-toolbar-separator-height: 2rem;--_ui5-v1-24-0-toolbar-height: 2.75rem;--_ui5-v1-24-0_toolbar_overflow_padding: .25rem .5rem;--_ui5-v1-24-0_split_button_middle_separator_top: .625rem;--_ui5-v1-24-0_split_button_middle_separator_height: 1rem;--_ui5-v1-24-0_color-palette-item-height: 1.75rem;--_ui5-v1-24-0_color-palette-item-hover-height: 2.25rem;--_ui5-v1-24-0_color-palette-item-margin: calc(((var(--_ui5-v1-24-0_color-palette-item-hover-height) - var(--_ui5-v1-24-0_color-palette-item-height)) / 2) + .0625rem);--_ui5-v1-24-0_color-palette-row-width: 12rem;--_ui5-v1-24-0_textarea_padding_top: .5rem;--_ui5-v1-24-0_textarea_padding_bottom: .4375rem;--_ui5-v1-24-0_dp_two_calendar_item_secondary_text_padding_block: 0 .5rem;--_ui5-v1-24-0_dp_two_calendar_item_secondary_text_padding: 0 .5rem;--_ui5-v1-24-0_daypicker_two_calendar_item_selected_focus_margin_bottom: 0;--_ui5-v1-24-0_daypicker_two_calendar_item_selected_focus_padding_right: .5rem}[data-ui5-compact-size],.ui5-content-density-compact,.sapUiSizeCompact{--_ui5-v1-24-0_input_min_width: 2rem;--_ui5-v1-24-0_input_icon_width: 2rem;--_ui5-v1-24-0_input_information_icon_padding: .3125rem .5rem .1875rem .5rem;--_ui5-v1-24-0_input_information_focused_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-24-0_input_error_warning_icon_padding: .3125rem .5rem .1875rem .5rem;--_ui5-v1-24-0_input_error_warning_focused_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-24-0_input_custom_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-24-0_input_error_warning_custom_icon_padding: .3125rem .5rem .1875rem .5rem;--_ui5-v1-24-0_input_error_warning_custom_focused_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-24-0_input_information_custom_icon_padding: .3125rem .5rem .1875rem .5rem;--_ui5-v1-24-0_input_information_custom_focused_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-24-0_input_icon_padding: .3125rem .5rem .25rem .5rem;--_ui5-v1-24-0_panel_header_button_wrapper_padding: .1875rem .25rem;--_ui5-v1-24-0_rating_indicator_item_height: .67em;--_ui5-v1-24-0_rating_indicator_item_width: .67em;--_ui5-v1-24-0_rating_indicator_component_spacing: .8125rem 0px;--_ui5-v1-24-0_rating_indicator_readonly_item_height: .5em;--_ui5-v1-24-0_rating_indicator_readonly_item_width: .5em;--_ui5-v1-24-0_rating_indicator_readonly_item_spacing: .125rem .125rem;--_ui5-v1-24-0_radio_button_min_width: 2rem;--_ui5-v1-24-0_radio_button_outer_ring_padding_with_label: 0 .5rem;--_ui5-v1-24-0_radio_button_outer_ring_padding: 0 .5rem;--_ui5-v1-24-0_radio_button_focus_dist: .1875rem;--_ui5-v1-24-0_switch_height: 2rem;--_ui5-v1-24-0_switch_width: 3rem;--_ui5-v1-24-0_switch_min_width: none;--_ui5-v1-24-0_switch_with_label_width: 3.75rem;--_ui5-v1-24-0_switch_root_outline_top: .25rem;--_ui5-v1-24-0_switch_root_outline_bottom: .25rem;--_ui5-v1-24-0_switch_transform: translateX(100%) translateX(-1.375rem);--_ui5-v1-24-0_switch_transform_with_label: translateX(100%) translateX(-1.875rem);--_ui5-v1-24-0_switch_rtl_transform: translateX(1.375rem) translateX(-100%);--_ui5-v1-24-0_switch_rtl_transform_with_label: translateX(1.875rem) translateX(-100%);--_ui5-v1-24-0_switch_track_width: 2rem;--_ui5-v1-24-0_switch_track_height: 1.25rem;--_ui5-v1-24-0_switch_track_with_label_width: 2.75rem;--_ui5-v1-24-0_switch_track_with_label_height: 1.25rem;--_ui5-v1-24-0_switch_handle_width: 1.25rem;--_ui5-v1-24-0_switch_handle_height: 1rem;--_ui5-v1-24-0_switch_handle_with_label_width: 1.75rem;--_ui5-v1-24-0_switch_handle_with_label_height: 1rem;--_ui5-v1-24-0_switch_text_font_size: var(--sapFontSize);--_ui5-v1-24-0_switch_text_width: 1rem;--_ui5-v1-24-0_switch_text_active_left: .1875rem;--_ui5-v1-24-0_textarea_padding_right_and_left_readonly: .4375rem;--_ui5-v1-24-0_textarea_padding_top_readonly: .125rem;--_ui5-v1-24-0_textarea_exceeded_text_height: .375rem;--_ui5-v1-24-0_textarea_min_height: 1.625rem;--_ui5-v1-24-0_textarea_padding_bottom_readonly: .0625rem;--_ui5-v1-24-0_textarea_padding_top_error_warning: .1875rem;--_ui5-v1-24-0_textarea_padding_bottom_error_warning: .125rem;--_ui5-v1-24-0_textarea_padding_top_information: .1875rem;--_ui5-v1-24-0_textarea_padding_bottom_information: .125rem;--_ui5-v1-24-0_textarea_padding_right_and_left: .5rem;--_ui5-v1-24-0_textarea_padding_right_and_left_error_warning: .5rem;--_ui5-v1-24-0_textarea_padding_right_and_left_information: .5rem;--_ui5-v1-24-0_token_selected_focused_offset_bottom: -.25rem;--_ui5-v1-24-0_tokenizer-popover_offset: .1875rem;--_ui5-v1-24-0_slider_handle_icon_size: .875rem;--_ui5-v1-24-0_slider_padding: 1rem 1.0625rem;--_ui5-v1-24-0_range_slider_progress_focus_width: calc(100% + var(--_ui5-v1-24-0_slider_handle_width) + 10px);--_ui5-v1-24-0_range_slider_progress_focus_height: calc(var(--_ui5-v1-24-0_slider_handle_height) + 10px);--_ui5-v1-24-0_range_slider_progress_focus_top: -.8125rem;--_ui5-v1-24-0_slider_tooltip_bottom: 1.75rem;--_ui5-v1-24-0_slider_handle_focused_tooltip_distance: calc(var(--_ui5-v1-24-0_slider_tooltip_bottom) - var(--_ui5-v1-24-0_slider_handle_focus_width));--_ui5-v1-24-0_range_slider_progress_focus_left: calc(-1 * (var(--_ui5-v1-24-0_slider_handle_width) / 2) - 5px);--_ui5-v1-24-0_button_base_height: var(--sapElement_Compact_Height);--_ui5-v1-24-0_button_base_padding: .4375rem;--_ui5-v1-24-0_button_base_min_width: 2rem;--_ui5-v1-24-0_button_icon_font_size: 1rem;--_ui5-v1-24-0_calendar_height: 18rem;--_ui5-v1-24-0_calendar_width: 17.75rem;--_ui5-v1-24-0_calendar_left_right_padding: .25rem;--_ui5-v1-24-0_calendar_top_bottom_padding: .5rem;--_ui5-v1-24-0_calendar_header_height: 2rem;--_ui5-v1-24-0_calendar_header_arrow_button_width: 2rem;--_ui5-v1-24-0_calendar_header_padding: 0;--_ui5-v1-24-0-calendar-legend-root-padding: .5rem;--_ui5-v1-24-0-calendar-legend-root-width: 16.75rem;--_ui5-v1-24-0-calendar-legend-item-box-margin: .125rem .5rem .125rem .125rem;--_ui5-v1-24-0-calendar-legend-item-root-focus-margin: -.125rem;--_ui5-v1-24-0_checkbox_root_side_padding: var(--_ui5-v1-24-0_checkbox_wrapped_focus_padding);--_ui5-v1-24-0_checkbox_wrapped_content_margin_top: var(--_ui5-v1-24-0_checkbox_compact_wrapped_label_margin_top);--_ui5-v1-24-0_checkbox_wrapped_focus_left_top_bottom_position: var(--_ui5-v1-24-0_checkbox_compact_focus_position);--_ui5-v1-24-0_checkbox_width_height: var(--_ui5-v1-24-0_checkbox_compact_width_height);--_ui5-v1-24-0_checkbox_wrapper_padding: var(--_ui5-v1-24-0_checkbox_compact_wrapper_padding);--_ui5-v1-24-0_checkbox_inner_width_height: var(--_ui5-v1-24-0_checkbox_compact_inner_size);--_ui5-v1-24-0_checkbox_icon_size: .75rem;--_ui5-v1-24-0_checkbox_partially_icon_size: .5rem;--_ui5-v1-24-0_custom_list_item_rb_min_width: 2rem;--_ui5-v1-24-0_daypicker_weeknumbers_container_padding_top: 2rem;--_ui5-v1-24-0_day_picker_item_width: 2rem;--_ui5-v1-24-0_day_picker_item_height: 2rem;--_ui5-v1-24-0_day_picker_empty_height: 2.125rem;--_ui5-v1-24-0_day_picker_item_justify_content: flex-end;--_ui5-v1-24-0_dp_two_calendar_item_now_text_padding_top: .5rem;--_ui5-v1-24-0_dp_two_calendar_item_primary_text_height: 1rem;--_ui5-v1-24-0_dp_two_calendar_item_secondary_text_height: .75rem;--_ui5-v1-24-0_dp_two_calendar_item_text_padding_top: .5rem;--_ui5-v1-24-0_daypicker_special_day_top: 1.625rem;--_ui5-v1-24-0_daypicker_twocalendar_item_special_day_top: 1.25rem;--_ui5-v1-24-0_daypicker_twocalendar_item_special_day_right: 1.25rem;--_ui5-v1-24-0_daypicker_two_calendar_item_margin_bottom: 0;--_ui5-v1-24-0_daypicker_item_now_selected_two_calendar_focus_special_day_top: 1.125rem;--_ui5-v1-24-0_daypicker_item_now_selected_two_calendar_focus_special_day_right: 1.125rem;--_ui5-v1-24-0_daypicker_item_now_selected_two_calendar_focus_secondary_text_padding_block: 0 1rem;--_ui5-v1-24-0_datetime_picker_height: 20.5rem;--_ui5-v1-24-0_datetime_picker_width: 35.5rem;--_ui5-v1-24-0_datetime_timeview_width: 17rem;--_ui5-v1-24-0_datetime_timeview_phonemode_width: 18.5rem;--_ui5-v1-24-0_datetime_timeview_padding: .5rem;--_ui5-v1-24-0_datetime_timeview_phonemode_clocks_width: 21.125rem;--_ui5-v1-24-0_datetime_dateview_phonemode_margin_bottom: 3.125rem;--_ui5-v1-24-0_dialog_content_min_height: 2.5rem;--_ui5-v1-24-0_dialog_footer_height: 2.5rem;--_ui5-v1-24-0_input_height: var(--sapElement_Compact_Height);--_ui5-v1-24-0_input_inner_padding: 0 .5rem;--_ui5-v1-24-0_input_inner_padding_with_icon: 0 .2rem 0 .5rem;--_ui5-v1-24-0_input_inner_space_to_tokenizer: .125rem;--_ui5-v1-24-0_input_inner_space_to_n_more_text: .125rem;--_ui5-v1-24-0_input_icon_min_width: var(--_ui5-v1-24-0_input_compact_min_width);--_ui5-v1-24-0_menu_item_padding: 0 .75rem 0 .5rem;--_ui5-v1-24-0_menu_item_submenu_icon_right: .75rem;--_ui5-v1-24-0-notification-overflow-popover-padding: .25rem .5rem;--_ui5-v1-24-0_popup_default_header_height: 2.5rem;--_ui5-v1-24-0_textarea_margin: .1875rem 0;--_ui5-v1-24-0_list_no_data_height: 2rem;--_ui5-v1-24-0_list_item_cb_margin_right: .5rem;--_ui5-v1-24-0_list_item_title_size: var(--sapFontSize);--_ui5-v1-24-0_list_item_img_top_margin: .55rem;--_ui5-v1-24-0_list_no_data_font_size: var(--sapFontSize);--_ui5-v1-24-0_list_item_dropdown_base_height: 2rem;--_ui5-v1-24-0_list_item_base_height: 2rem;--_ui5-v1-24-0_list_item_icon_size: 1rem;--_ui5-v1-24-0_list_item_selection_btn_margin_top: calc(-1 * var(--_ui5-v1-24-0_checkbox_wrapper_padding));--_ui5-v1-24-0_list_item_content_vertical_offset: calc((var(--_ui5-v1-24-0_list_item_base_height) - var(--_ui5-v1-24-0_list_item_title_size)) / 2);--_ui5-v1-24-0_list_busy_row_height: 2rem;--_ui5-v1-24-0_list_buttons_left_space: .125rem;--_ui5-v1-24-0_month_picker_item_height: 2rem;--_ui5-v1-24-0_year_picker_item_height: 2rem;--_ui5-v1-24-0_panel_header_height: 2rem;--_ui5-v1-24-0_panel_button_root_height: 2rem;--_ui5-v1-24-0_panel_button_root_width: 2.5rem;--_ui5-v1-24-0_token_height: 1.25rem;--_ui5-v1-24-0_token_right_margin: .25rem;--_ui5-v1-24-0_token_left_padding: .25rem;--_ui5-v1-24-0_token_readonly_padding: .125rem .25rem;--_ui5-v1-24-0_token_focus_offset: -.125rem;--_ui5-v1-24-0_token_icon_size: .75rem;--_ui5-v1-24-0_token_icon_padding: .125rem .25rem;--_ui5-v1-24-0_token_wrapper_right_padding: .25rem;--_ui5-v1-24-0_token_wrapper_left_padding: 0;--_ui5-v1-24-0_token_outline_offset: -.125rem;--_ui5-v1-24-0_tl_bubble_padding: .5rem;--_ui5-v1-24-0_tl_indicator_before_bottom: -.5rem;--_ui5-v1-24-0_tl_padding: .5rem;--_ui5-v1-24-0_tl_li_margin_bottom: .5rem;--_ui5-v1-24-0_wheelslider_item_width: 64px;--_ui5-v1-24-0_wheelslider_item_height: 32px;--_ui5-v1-24-0_wheelslider_height: 224px;--_ui5-v1-24-0_wheelslider_selection_frame_margin_top: calc(var(--_ui5-v1-24-0_wheelslider_item_height) * 2);--_ui5-v1-24-0_wheelslider_arrows_visibility: visible;--_ui5-v1-24-0_wheelslider_mobile_selection_frame_margin_top: 128px;--_ui5-v1-24-0_tc_item_text: 2rem;--_ui5-v1-24-0_tc_item_text_line_height: 1.325rem;--_ui5-v1-24-0_tc_item_add_text_margin_top: .3125rem;--_ui5-v1-24-0_tc_item_height: 4rem;--_ui5-v1-24-0_tc_header_height: var(--_ui5-v1-24-0_tc_item_height);--_ui5-v1-24-0_tc_item_icon_circle_size: 2rem;--_ui5-v1-24-0_tc_item_icon_size: 1rem;--_ui5-v1-24-0_radio_button_height: 2rem;--_ui5-v1-24-0_radio_button_label_side_padding: .5rem;--_ui5-v1-24-0_radio_button_inner_size: 2rem;--_ui5-v1-24-0_radio_button_svg_size: 1rem;--_ui5-v1-24-0-responsive_popover_header_height: 2.5rem;--ui5-v1-24-0_side_navigation_item_height: 2rem;--_ui5-v1-24-0_slider_handle_height: 1.25rem;--_ui5-v1-24-0_slider_handle_width: 1.25rem;--_ui5-v1-24-0_slider_tooltip_padding: .25rem;--_ui5-v1-24-0_slider_progress_outline_offset: -.625rem;--_ui5-v1-24-0_slider_outer_height: 1.3125rem;--_ui5-v1-24-0_step_input_min_width: 6rem;--_ui5-v1-24-0_step_input_padding: 2rem;--_ui5-v1-24-0_load_more_text_height: 2.625rem;--_ui5-v1-24-0_load_more_text_font_size: var(--sapFontSize);--_ui5-v1-24-0_load_more_desc_padding: 0 2rem .875rem 2rem;--ui5-v1-24-0_table_header_row_height: 2rem;--ui5-v1-24-0_table_row_height: 2rem;--_ui5-v1-24-0-tree-indent-step: .5rem;--_ui5-v1-24-0-tree-toggle-box-width: 2rem;--_ui5-v1-24-0-tree-toggle-box-height: 1.5rem;--_ui5-v1-24-0-tree-toggle-icon-size: .8125rem;--_ui5-v1-24-0_timeline_tli_indicator_before_bottom: -.5rem;--_ui5-v1-24-0_timeline_tli_indicator_before_right: -.5rem;--_ui5-v1-24-0_timeline_tli_indicator_before_without_icon_bottom: -.75rem;--_ui5-v1-24-0_timeline_tli_indicator_before_without_icon_right: -.8125rem;--_ui5-v1-24-0_vsd_header_container: 2.5rem;--_ui5-v1-24-0_vsd_sub_header_container_height: 2rem;--_ui5-v1-24-0_vsd_header_height: 4rem;--_ui5-v1-24-0_vsd_expand_content_height: 25.4375rem;--_ui5-v1-24-0-toolbar-separator-height: 1.5rem;--_ui5-v1-24-0-toolbar-height: 2rem;--_ui5-v1-24-0_toolbar_overflow_padding: .1875rem .375rem;--_ui5-v1-24-0_textarea_padding_top: .1875rem;--_ui5-v1-24-0_textarea_padding_bottom: .125rem;--_ui5-v1-24-0_checkbox_focus_position: .25rem;--_ui5-v1-24-0_split_button_middle_separator_top: .3125rem;--_ui5-v1-24-0_split_button_middle_separator_height: 1rem;--_ui5-v1-24-0_slider_handle_top: -.5rem;--_ui5-v1-24-0_slider_tooltip_height: 1.375rem;--_ui5-v1-24-0_color-palette-item-height: 1.25rem;--_ui5-v1-24-0_color-palette-item-focus-height: 1rem;--_ui5-v1-24-0_color-palette-item-container-sides-padding: .1875rem;--_ui5-v1-24-0_color-palette-item-container-rows-padding: .8125rem;--_ui5-v1-24-0_color-palette-item-hover-height: 1.625rem;--_ui5-v1-24-0_color-palette-item-margin: calc(((var(--_ui5-v1-24-0_color-palette-item-hover-height) - var(--_ui5-v1-24-0_color-palette-item-height)) / 2) + .0625rem);--_ui5-v1-24-0_color-palette-row-width: 8.75rem;--_ui5-v1-24-0_color-palette-swatch-container-padding: .1875rem .5rem;--_ui5-v1-24-0_color-palette-item-hover-margin: .0625rem;--_ui5-v1-24-0_color-palette-row-height: 7.5rem;--_ui5-v1-24-0_color-palette-button-height: 2rem;--_ui5-v1-24-0_color-palette-item-before-focus-offset: -.25rem;--_ui5-v1-24-0_color-palette-item-after-focus-offset: -.125rem;--_ui5-v1-24-0_color_picker_slider_container_margin_top: -9px;--_ui5-v1-24-0_daypicker_selected_item_now_special_day_top: 1.5625rem;--_ui5-v1-24-0_daypicker_specialday_focused_top: 1.3125rem;--_ui5-v1-24-0_daypicker_selected_item_now_special_day_border_bottom_radius_alternate: .5rem;--_ui5-v1-24-0_daypicker_specialday_focused_border_bottom: .25rem;--_ui5-v1-24-0_daypicker_item_now_specialday_top: 1.4375rem;--_ui5-v1-24-0_dp_two_calendar_item_secondary_text_padding_block: 0 .375rem;--_ui5-v1-24-0_dp_two_calendar_item_secondary_text_padding: 0 .375rem;--_ui5-v1-24-0_daypicker_two_calendar_item_selected_focus_margin_bottom: -.25rem;--_ui5-v1-24-0_daypicker_two_calendar_item_selected_focus_padding_right: .4375rem}[dir=rtl]{--_ui5-v1-24-0_progress_indicator_bar_border_radius: .5rem;--_ui5-v1-24-0_icon_transform_scale: scale(-1, 1);--_ui5-v1-24-0_panel_toggle_btn_rotation: var(--_ui5-v1-24-0_rotation_minus_90deg);--_ui5-v1-24-0_li_notification_group_toggle_btn_rotation: var(--_ui5-v1-24-0_rotation_minus_90deg);--_ui5-v1-24-0_timeline_scroll_container_offset: -.5rem;--_ui5-v1-24-0_popover_upward_arrow_margin: .1875rem .125rem 0 0;--_ui5-v1-24-0_popover_right_arrow_margin: .1875rem .25rem 0 0;--_ui5-v1-24-0_popover_downward_arrow_margin: -.4375rem .125rem 0 0;--_ui5-v1-24-0_popover_left_arrow_margin: .1875rem -.375rem 0 0;--_ui5-v1-24-0_dialog_resize_cursor:sw-resize;--_ui5-v1-24-0_progress_indicator_bar_border_radius: 0 .5rem .5rem 0;--_ui5-v1-24-0_progress_indicator_remaining_bar_border_radius: .5rem 0 0 .5rem;--_ui5-v1-24-0_menu_submenu_margin_offset: 0 -.25rem;--_ui5-v1-24-0_menu_submenu_placement_type_left_margin_offset: 0 .25rem;--_ui5-v1-24-0-menu_item_icon_float: left;--_ui5-v1-24-0-shellbar-notification-btn-count-offset: auto;--_ui5-v1-24-0_segmented_btn_item_border_left: .0625rem;--_ui5-v1-24-0_segmented_btn_item_border_right: .0625rem}:root,[dir=ltr]{--_ui5-v1-24-0_rotation_90deg: rotate(90deg);--_ui5-v1-24-0_rotation_minus_90deg: rotate(-90deg);--_ui5-v1-24-0_icon_transform_scale: none;--_ui5-v1-24-0_panel_toggle_btn_rotation: var(--_ui5-v1-24-0_rotation_90deg);--_ui5-v1-24-0_li_notification_group_toggle_btn_rotation: var(--_ui5-v1-24-0_rotation_90deg);--_ui5-v1-24-0_timeline_scroll_container_offset: .5rem;--_ui5-v1-24-0_popover_upward_arrow_margin: .1875rem 0 0 .1875rem;--_ui5-v1-24-0_popover_right_arrow_margin: .1875rem 0 0 -.375rem;--_ui5-v1-24-0_popover_downward_arrow_margin: -.375rem 0 0 .125rem;--_ui5-v1-24-0_popover_left_arrow_margin: .125rem 0 0 .25rem;--_ui5-v1-24-0_dialog_resize_cursor: se-resize;--_ui5-v1-24-0_progress_indicator_bar_border_radius: .5rem 0 0 .5rem;--_ui5-v1-24-0_progress_indicator_remaining_bar_border_radius: 0 .5rem .5rem 0;--_ui5-v1-24-0_menu_submenu_margin_offset: -.25rem 0;--_ui5-v1-24-0_menu_submenu_placement_type_left_margin_offset: .25rem 0;--_ui5-v1-24-0-menu_item_icon_float: right;--_ui5-v1-24-0-shellbar-notification-btn-count-offset: -.125rem}
` };
hr("@ui5/webcomponents-theming", "sap_horizon", async () => Ya);
hr("@ui5/webcomponents", "sap_horizon", async () => Ja);
const Qa = { packageName: "@ui5/webcomponents", fileName: "themes/Icon.css.ts", content: `:host{-webkit-tap-highlight-color:rgba(0,0,0,0)}:host([hidden]){display:none}:host([invalid]){display:none}:host(:not([hidden]).ui5_hovered){opacity:.7}:host{display:inline-block;width:1rem;height:1rem;color:var(--sapContent_IconColor);fill:currentColor;outline:none}:host([design="Contrast"]){color:var(--sapContent_ContrastIconColor)}:host([design="Critical"]){color:var(--sapCriticalElementColor)}:host([design="Information"]){color:var(--sapInformativeElementColor)}:host([design="Negative"]){color:var(--sapNegativeElementColor)}:host([design="Neutral"]){color:var(--sapNeutralElementColor)}:host([design="NonInteractive"]){color:var(--sapContent_NonInteractiveIconColor)}:host([design="Positive"]){color:var(--sapPositiveElementColor)}:host([interactive][focused]) .ui5-icon-root{outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);border-radius:var(--ui5-v1-24-0-icon-focus-border-radius)}.ui5-icon-root{display:flex;height:100%;width:100%;outline:none;vertical-align:top}:host([interactive]){cursor:pointer}.ui5-icon-root:not([dir=ltr]){transform:var(--_ui5-v1-24-0_icon_transform_scale);transform-origin:center}
` };
var B = function(t, e, r, o) {
  var _ = arguments.length, a = _ < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, r) : o, i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    a = Reflect.decorate(t, e, r, o);
  else
    for (var n = t.length - 1; n >= 0; n--)
      (i = t[n]) && (a = (_ < 3 ? i(a) : _ > 3 ? i(e, r, a) : i(e, r)) || a);
  return _ > 3 && a && Object.defineProperty(e, r, a), a;
};
const ei = "ICON_NOT_FOUND", Zt = "presentation";
let C = class extends ae {
  _onFocusInHandler() {
    this.interactive && (this.focused = !0);
  }
  _onFocusOutHandler() {
    this.focused = !1;
  }
  _onkeydown(e) {
    this.interactive && (fa(e) && this.fireEvent("click"), Rt(e) && e.preventDefault());
  }
  _onkeyup(e) {
    this.interactive && Rt(e) && this.fireEvent("click");
  }
  /**
  * Enforce "ltr" direction, based on the icons collection metadata.
  */
  get _dir() {
    return this.ltr ? "ltr" : void 0;
  }
  get effectiveAriaHidden() {
    return this.ariaHidden === "" ? this.isDecorative ? !0 : void 0 : this.ariaHidden;
  }
  get _tabIndex() {
    return this.interactive ? "0" : void 0;
  }
  get isDecorative() {
    return this.effectiveAccessibleRole === Zt;
  }
  get effectiveAccessibleRole() {
    return this.accessibleRole ? this.accessibleRole : this.interactive ? "button" : this.effectiveAccessibleName ? "img" : Zt;
  }
  async onBeforeRendering() {
    const e = this.name;
    if (!e)
      return console.warn("Icon name property is required", this);
    let r = Qr(e);
    if (r || (r = await eo(e)), !r)
      return this.invalid = !0, console.warn(`Required icon is not registered. Invalid icon name: ${this.name}`);
    if (r === ei)
      return this.invalid = !0, console.warn(`Required icon is not registered. You can either import the icon as a module in order to use it e.g. "@ui5/webcomponents-icons/dist/${e.replace("sap-icon://", "")}.js", or setup a JSON build step and import "@ui5/webcomponents-icons/dist/AllIcons.js".`);
    if (this.viewBox = r.viewBox || "0 0 512 512", r.customTemplate && (r.pathData = [], this.customSvg = ot(r.customTemplate, this)), this.invalid = !1, this.pathData = Array.isArray(r.pathData) ? r.pathData : [r.pathData], this.accData = r.accData, this.ltr = r.ltr, this.packageName = r.packageName, this._onfocusout = this.interactive ? this._onFocusOutHandler.bind(this) : void 0, this._onfocusin = this.interactive ? this._onFocusInHandler.bind(this) : void 0, this.accessibleName)
      this.effectiveAccessibleName = this.accessibleName;
    else if (this.accData) {
      const o = await Kr(this.packageName);
      this.effectiveAccessibleName = o.getText(this.accData) || void 0;
    } else
      this.effectiveAccessibleName = void 0;
  }
  get hasIconTooltip() {
    return this.showTooltip && this.effectiveAccessibleName;
  }
};
B([
  w({ type: Xt, defaultValue: Xt.Default })
], C.prototype, "design", void 0);
B([
  w({ type: Boolean })
], C.prototype, "interactive", void 0);
B([
  w()
], C.prototype, "name", void 0);
B([
  w()
], C.prototype, "accessibleName", void 0);
B([
  w({ type: Boolean })
], C.prototype, "showTooltip", void 0);
B([
  w()
], C.prototype, "accessibleRole", void 0);
B([
  w()
], C.prototype, "ariaHidden", void 0);
B([
  w({ multiple: !0 })
], C.prototype, "pathData", void 0);
B([
  w({ type: Object, defaultValue: void 0, noAttribute: !0 })
], C.prototype, "accData", void 0);
B([
  w({ type: Boolean })
], C.prototype, "focused", void 0);
B([
  w({ type: Boolean })
], C.prototype, "invalid", void 0);
B([
  w({ noAttribute: !0, defaultValue: void 0 })
], C.prototype, "effectiveAccessibleName", void 0);
C = B([
  oa({
    tag: "ui5-icon",
    languageAware: !0,
    themeAware: !0,
    renderer: ma,
    template: Ga,
    styles: Qa
  }),
  ba("click")
], C);
C.define();
const ni = C, si = { packageName: "@udex/web-components", fileName: "themes/sap_horizon/parameters-bundle.css.ts", content: "" };
export {
  cr as A,
  ha as B,
  ni as I,
  ae as U,
  hr as a,
  Ya as b,
  si as c,
  ri as d,
  Z as e,
  oa as f,
  Rt as g,
  ma as h,
  x_ as i,
  Ja as j,
  ba as k,
  y as l,
  lo as m,
  tr as n,
  ti as o,
  w as p,
  x as q,
  Va as r,
  oi as s,
  ai as t,
  oe as u,
  fa as v,
  uo as w,
  Kr as x,
  _i as y,
  It as z
};
