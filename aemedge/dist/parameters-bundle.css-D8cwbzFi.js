var ct = {}, ft = ct.hasOwnProperty, eo = ct.toString, _t = ft.toString, to = _t.call(Object), je = function(t) {
  var e, o;
  return !t || eo.call(t) !== "[object Object]" ? !1 : (e = Object.getPrototypeOf(t), e ? (o = ft.call(e, "constructor") && e.constructor, typeof o == "function" && _t.call(o) === to) : !0);
}, oo = /* @__PURE__ */ Object.create(null), pt = function(t, e, o, r) {
  var a, n, s, l, i, d, f = arguments[2] || {}, c = 3, u = arguments.length, _ = arguments[0] || !1, C = arguments[1] ? void 0 : oo;
  for (typeof f != "object" && typeof f != "function" && (f = {}); c < u; c++)
    if ((i = arguments[c]) != null)
      for (l in i)
        a = f[l], s = i[l], !(l === "__proto__" || f === s) && (_ && s && (je(s) || (n = Array.isArray(s))) ? (n ? (n = !1, d = a && Array.isArray(a) ? a : []) : d = a && je(a) ? a : {}, f[l] = pt(_, arguments[1], d, s)) : s !== C && (f[l] = s));
  return f;
};
const Pe = function(t, e) {
  return pt(!0, !1, ...arguments);
}, ro = () => new Promise((t) => {
  document.body ? t() : document.addEventListener("DOMContentLoaded", () => {
    t();
  });
});
class w {
  constructor() {
    this._eventRegistry = /* @__PURE__ */ new Map();
  }
  attachEvent(e, o) {
    const r = this._eventRegistry, a = r.get(e);
    if (!Array.isArray(a)) {
      r.set(e, [o]);
      return;
    }
    a.includes(o) || a.push(o);
  }
  detachEvent(e, o) {
    const r = this._eventRegistry, a = r.get(e);
    if (!a)
      return;
    const n = a.indexOf(o);
    n !== -1 && a.splice(n, 1), a.length === 0 && r.delete(e);
  }
  /**
   * Fires an event and returns the results of all event listeners as an array.
   *
   * @param eventName the event to fire
   * @param data optional data to pass to each event listener
   * @returns {Array} an array with the results of all event listeners
   */
  fireEvent(e, o) {
    const a = this._eventRegistry.get(e);
    return a ? a.map((n) => n.call(this, o)) : [];
  }
  /**
   * Fires an event and returns a promise that will resolve once all listeners have resolved.
   *
   * @param eventName the event to fire
   * @param data optional data to pass to each event listener
   * @returns {Promise} a promise that will resolve when all listeners have resolved
   */
  fireEventAsync(e, o) {
    return Promise.all(this.fireEvent(e, o));
  }
  isHandlerAttached(e, o) {
    const a = this._eventRegistry.get(e);
    return a ? a.includes(o) : !1;
  }
  hasListeners(e) {
    return !!this._eventRegistry.get(e);
  }
}
const ao = (t, e) => {
  const o = document.createElement("style");
  return o.type = "text/css", e && Object.entries(e).forEach((r) => o.setAttribute(...r)), o.textContent = t, document.head.appendChild(o), o;
}, no = (t, e) => {
  const o = document.createElement("link");
  return o.type = "text/css", o.rel = "stylesheet", e && Object.entries(e).forEach((r) => o.setAttribute(...r)), o.href = t, document.head.appendChild(o), new Promise((r) => {
    o.addEventListener("load", r), o.addEventListener("error", r);
  });
}, g = typeof document > "u", p = {
  get userAgent() {
    return g ? "" : navigator.userAgent;
  },
  get touch() {
    return g ? !1 : "ontouchstart" in window || navigator.maxTouchPoints > 0;
  },
  get ie() {
    return g ? !1 : /(msie|trident)/i.test(p.userAgent);
  },
  get chrome() {
    return g ? !1 : !p.ie && /(Chrome|CriOS)/.test(p.userAgent);
  },
  get firefox() {
    return g ? !1 : /Firefox/.test(p.userAgent);
  },
  get safari() {
    return g ? !1 : !p.ie && !p.chrome && /(Version|PhantomJS)\/(\d+\.\d+).*Safari/.test(p.userAgent);
  },
  get webkit() {
    return g ? !1 : !p.ie && /webkit/.test(p.userAgent);
  },
  get windows() {
    return g ? !1 : navigator.platform.indexOf("Win") !== -1;
  },
  get macOS() {
    return g ? !1 : !!navigator.userAgent.match(/Macintosh|Mac OS X/i);
  },
  get iOS() {
    return g ? !1 : !!navigator.platform.match(/iPhone|iPad|iPod/) || !!(p.userAgent.match(/Mac/) && "ontouchend" in document);
  },
  get android() {
    return g ? !1 : !p.windows && /Android/.test(p.userAgent);
  },
  get androidPhone() {
    return g ? !1 : p.android && /(?=android)(?=.*mobile)/i.test(p.userAgent);
  },
  get ipad() {
    return g ? !1 : /ipad/i.test(p.userAgent) || /Macintosh/i.test(p.userAgent) && "ontouchend" in document;
  }
};
let ue, he, y;
const Me = () => {
  if (g || !p.windows)
    return !1;
  if (ue === void 0) {
    const t = p.userAgent.match(/Windows NT (\d+).(\d)/);
    ue = t ? parseFloat(t[1]) : 0;
  }
  return ue >= 8;
}, so = () => {
  if (g || !p.webkit)
    return !1;
  if (he === void 0) {
    const t = p.userAgent.match(/(webkit)[ /]([\w.]+)/);
    he = t ? parseFloat(t[1]) : 0;
  }
  return he >= 537.1;
}, ut = () => {
  if (g)
    return !1;
  if (y === void 0) {
    if (p.ipad) {
      y = !0;
      return;
    }
    if (p.touch) {
      if (Me()) {
        y = !0;
        return;
      }
      if (p.chrome && p.android) {
        y = !/Mobile Safari\/[.0-9]+/.test(p.userAgent);
        return;
      }
      let t = window.devicePixelRatio ? window.devicePixelRatio : 1;
      p.android && so() && (t = 1), y = Math.min(window.screen.width / t, window.screen.height / t) >= 600;
      return;
    }
    y = p.ie && p.userAgent.indexOf("Touch") !== -1 || p.android && !p.androidPhone;
  }
}, W = () => p.safari, ht = () => (ut(), (p.touch || Me()) && y), io = () => (ut(), p.touch && !y), lo = () => g ? !1 : !ht() && !io() || Me(), sa = () => ht() && lo(), co = {
  version: "1.24.0",
  major: 1,
  minor: 24,
  patch: 0,
  suffix: "",
  isNext: !1,
  buildTime: 1712256366
}, gt = (t, e = document.body, o) => {
  let r = document.querySelector(t);
  return r || (r = o ? o() : document.createElement(t), e.insertBefore(r, e.firstChild));
}, fo = () => {
  const t = document.createElement("meta");
  return t.setAttribute("name", "ui5-shared-resources"), t.setAttribute("content", ""), t;
}, _o = () => typeof document > "u" ? null : gt('meta[name="ui5-shared-resources"]', document.head, fo), le = (t, e) => {
  const o = t.split(".");
  let r = _o();
  if (!r)
    return e;
  for (let a = 0; a < o.length; a++) {
    const n = o[a], s = a === o.length - 1;
    Object.prototype.hasOwnProperty.call(r, n) || (r[n] = s ? e : {}), r = r[n];
  }
  return r;
};
let Q, po = "";
const ge = /* @__PURE__ */ new Map(), N = le("Runtimes", []), uo = () => {
  if (Q === void 0) {
    Q = N.length;
    const t = co;
    N.push({
      ...t,
      alias: po,
      description: `Runtime ${Q} - ver ${t.version}`
    });
  }
}, P = () => Q, Ct = (t, e) => {
  const o = `${t},${e}`;
  if (ge.has(o))
    return ge.get(o);
  const r = N[t], a = N[e];
  if (!r || !a)
    throw new Error("Invalid runtime index supplied");
  if (r.isNext || a.isNext)
    return r.buildTime - a.buildTime;
  const n = r.major - a.major;
  if (n)
    return n;
  const s = r.minor - a.minor;
  if (s)
    return s;
  const l = r.patch - a.patch;
  if (l)
    return l;
  const d = new Intl.Collator(void 0, { numeric: !0, sensitivity: "base" }).compare(r.suffix, a.suffix);
  return ge.set(o, d), d;
}, ho = () => N, go = typeof document > "u", de = (t, e) => e ? `${t}|${e}` : t, ze = (t) => t === void 0 ? !0 : Ct(P(), parseInt(t)) === 1, ce = (t, e, o = "", r) => {
  const a = typeof t == "string" ? t : t.content, n = P();
  if (document.adoptedStyleSheets && !W()) {
    const s = new CSSStyleSheet();
    s.replaceSync(a), s._ui5StyleId = de(e, o), r && (s._ui5RuntimeIndex = n, s._ui5Theme = r), document.adoptedStyleSheets = [...document.adoptedStyleSheets, s];
  } else {
    const s = {};
    s[e] = o, r && (s["data-ui5-runtime-index"] = n, s["data-ui5-theme"] = r), ao(a, s);
  }
}, Co = (t, e, o = "", r) => {
  const a = typeof t == "string" ? t : t.content, n = P();
  if (document.adoptedStyleSheets && !W()) {
    const s = document.adoptedStyleSheets.find((l) => l._ui5StyleId === de(e, o));
    if (!s)
      return;
    if (!r)
      s.replaceSync(a || "");
    else {
      const l = s._ui5RuntimeIndex;
      (s._ui5Theme !== r || ze(l)) && (s.replaceSync(a || ""), s._ui5RuntimeIndex = String(n), s._ui5Theme = r);
    }
  } else {
    const s = document.querySelector(`head>style[${e}="${o}"]`);
    if (!s)
      return;
    if (!r)
      s.textContent = a || "";
    else {
      const l = s.getAttribute("data-ui5-runtime-index") || void 0;
      (s.getAttribute("data-ui5-theme") !== r || ze(l)) && (s.textContent = a || "", s.setAttribute("data-ui5-runtime-index", String(n)), s.setAttribute("data-ui5-theme", r));
    }
  }
}, fe = (t, e = "") => {
  if (go)
    return !0;
  const o = document.querySelector(`head>style[${t}="${e}"]`);
  return document.adoptedStyleSheets && !W() ? !!o || !!document.adoptedStyleSheets.find((r) => r._ui5StyleId === de(t, e)) : !!o;
}, mo = (t, e = "") => {
  var o;
  if (document.adoptedStyleSheets && !W())
    document.adoptedStyleSheets = document.adoptedStyleSheets.filter((r) => r._ui5StyleId !== de(t, e));
  else {
    const r = document.querySelector(`head > style[${t}="${e}"]`);
    (o = r == null ? void 0 : r.parentElement) == null || o.removeChild(r);
  }
}, mt = (t, e, o = "", r) => {
  fe(e, o) ? Co(t, e, o, r) : ce(t, e, o, r);
}, Bo = (t, e) => {
  if (t === void 0)
    return e;
  if (e === void 0)
    return t;
  const o = typeof e == "string" ? e : e.content;
  return typeof t == "string" ? `${t} ${o}` : {
    content: `${t.content} ${o}`,
    packageName: t.packageName,
    fileName: t.fileName
  };
}, vo = /* @__PURE__ */ new Map(), S = (t) => vo.get(t), So = {
  packageName: "@ui5/webcomponents-base",
  fileName: "FontFace.css",
  content: `@font-face{font-family:"72";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular.woff2?ui5-webcomponents) format("woff2"),local("72");unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:400;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Regular-full.woff2?ui5-webcomponents) format("woff2"),local('72-full')}@font-face{font-family:"72";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:"72full";font-style:normal;font-weight:700;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Bold';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold.woff2?ui5-webcomponents) format("woff2"),local('72-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Boldfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Bold-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72-Light';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light.woff2?ui5-webcomponents) format("woff2"),local('72-Light');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72-Lightfull';font-style:normal;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Light-full.woff2?ui5-webcomponents) format("woff2")}@font-face{font-family:'72Mono';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular.woff2?ui5-webcomponents) format('woff2'),local('72Mono');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Monofull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Regular-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:'72Mono-Bold';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold.woff2?ui5-webcomponents) format('woff2'),local('72Mono-Bold');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Mono-Boldfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72Mono-Bold-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72Black";font-style:bold;font-weight:900;src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black.woff2?ui5-webcomponents) format("woff2"),local('72Black');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}@font-face{font-family:'72Blackfull';src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-Black-full.woff2?ui5-webcomponents) format('woff2')}@font-face{font-family:"72-SemiboldDuplex";src:url(https://sdk.openui5.org/resources/sap/ui/core/themes/sap_horizon/fonts/72-SemiboldDuplex.woff2?ui5-webcomponents) format("woff2"),local('72-SemiboldDuplex');unicode-range:U+00,U+0D,U+20-7E,U+A0-FF,U+131,U+152-153,U+161,U+178,U+17D-17E,U+192,U+237,U+2C6,U+2DC,U+3BC,U+1E9E,U+2013-2014,U+2018-201A,U+201C-201E,U+2020-2022,U+2026,U+2030,U+2039-203A,U+2044,U+20AC,U+2122}`
}, bo = {
  packageName: "@ui5/webcomponents-base",
  fileName: "OverrideFontFace.css",
  content: "@font-face{font-family:'72override';unicode-range:U+0102-0103,U+01A0-01A1,U+01AF-01B0,U+1EA0-1EB7,U+1EB8-1EC7,U+1EC8-1ECB,U+1ECC-1EE3,U+1EE4-1EF1,U+1EF4-1EF7;src:local('Arial'),local('Helvetica'),local('sans-serif')}"
}, yo = () => {
  const t = S("OpenUI5Support");
  (!t || !t.isOpenUI5Detected()) && Ao(), To();
}, Ao = () => {
  fe("data-ui5-font-face") || ce(So, "data-ui5-font-face");
}, To = () => {
  fe("data-ui5-font-face-override") || ce(bo, "data-ui5-font-face-override");
}, ko = {
  packageName: "@ui5/webcomponents-base",
  fileName: "SystemCSSVars.css",
  content: ":root{--_ui5_content_density:cozy}.sapUiSizeCompact,.ui5-content-density-compact,[data-ui5-compact-size]{--_ui5_content_density:compact}"
}, wo = () => {
  fe("data-ui5-system-css-vars") || ce(ko, "data-ui5-system-css-vars");
}, _e = { themes: { default: "sap_horizon", all: ["sap_fiori_3", "sap_fiori_3_dark", "sap_belize", "sap_belize_hcb", "sap_belize_hcw", "sap_fiori_3_hcb", "sap_fiori_3_hcw", "sap_horizon", "sap_horizon_dark", "sap_horizon_hcb", "sap_horizon_hcw", "sap_horizon_exp", "sap_horizon_dark_exp", "sap_horizon_hcb_exp", "sap_horizon_hcw_exp"] }, languages: { default: "en", all: ["ar", "bg", "ca", "cnr", "cs", "cy", "da", "de", "el", "en", "en_GB", "en_US_sappsd", "en_US_saprigi", "en_US_saptrc", "es", "es_MX", "et", "fi", "fr", "fr_CA", "hi", "hr", "hu", "in", "it", "iw", "ja", "kk", "ko", "lt", "lv", "mk", "ms", "nl", "no", "pl", "pt_PT", "pt", "ro", "ru", "sh", "sk", "sl", "sr", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_TW"] }, locales: { default: "en", all: ["ar", "ar_EG", "ar_SA", "bg", "ca", "cnr", "cs", "da", "de", "de_AT", "de_CH", "el", "el_CY", "en", "en_AU", "en_GB", "en_HK", "en_IE", "en_IN", "en_NZ", "en_PG", "en_SG", "en_ZA", "es", "es_AR", "es_BO", "es_CL", "es_CO", "es_MX", "es_PE", "es_UY", "es_VE", "et", "fa", "fi", "fr", "fr_BE", "fr_CA", "fr_CH", "fr_LU", "he", "hi", "hr", "hu", "id", "it", "it_CH", "ja", "kk", "ko", "lt", "lv", "ms", "mk", "nb", "nl", "nl_BE", "pl", "pt", "pt_PT", "ro", "ru", "ru_UA", "sk", "sl", "sr", "sr_Latn", "sv", "th", "tr", "uk", "vi", "zh_CN", "zh_HK", "zh_SG", "zh_TW"] } }, re = _e.themes.default, Io = _e.themes.all, ia = _e.languages.default, la = _e.locales.default, xo = (t) => {
  const e = document.querySelector(`META[name="${t}"]`);
  return e && e.getAttribute("content");
}, Eo = (t) => {
  const e = xo("sap-allowedThemeOrigins");
  return e && e.split(",").some((o) => o === "*" || t === o.trim());
}, Uo = (t, e) => {
  const o = new URL(t).pathname;
  return new URL(o, e).toString();
}, Ho = (t) => {
  let e;
  try {
    if (t.startsWith(".") || t.startsWith("/"))
      e = new URL(t, window.location.href).toString();
    else {
      const o = new URL(t), r = o.origin;
      r && Eo(r) ? e = o.toString() : e = Uo(o.toString(), window.location.href);
    }
    return e.endsWith("/") || (e = `${e}/`), `${e}UI5/`;
  } catch {
  }
};
var Ee;
(function(t) {
  t.Full = "full", t.Basic = "basic", t.Minimal = "minimal", t.None = "none";
})(Ee || (Ee = {}));
const $o = Ee;
let Ve = !1, v = {
  animationMode: $o.Full,
  theme: re,
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
const Lo = () => (q(), v.theme), Po = () => (q(), v.themeRoot), da = () => (q(), v.language), ca = () => (q(), v.fetchDefaultLanguage), Mo = () => (q(), v.noConflict), ae = /* @__PURE__ */ new Map();
ae.set("true", !0);
ae.set("false", !1);
const Fo = () => {
  const t = document.querySelector("[data-ui5-config]") || document.querySelector("[data-id='sap-ui-config']");
  let e;
  if (t) {
    try {
      e = JSON.parse(t.innerHTML);
    } catch {
      console.warn("Incorrect data-sap-ui-config format. Please use JSON");
    }
    e && (v = Pe(v, e));
  }
}, Oo = () => {
  const t = new URLSearchParams(window.location.search);
  t.forEach((e, o) => {
    const r = o.split("sap-").length;
    r === 0 || r === o.split("sap-ui-").length || We(o, e, "sap");
  }), t.forEach((e, o) => {
    o.startsWith("sap-ui") && We(o, e, "sap-ui");
  });
}, Ro = (t) => {
  const e = t.split("@")[1];
  return Ho(e);
}, No = (t, e) => t === "theme" && e.includes("@") ? e.split("@")[0] : e, We = (t, e, o) => {
  const r = e.toLowerCase(), a = t.split(`${o}-`)[1];
  ae.has(e) && (e = ae.get(r)), a === "theme" ? (v.theme = No(a, e), e && e.includes("@") && (v.themeRoot = Ro(e))) : v[a] = e;
}, Do = () => {
  const t = S("OpenUI5Support");
  if (!t || !t.isOpenUI5Detected())
    return;
  const e = t.getConfigurationSettingsObject();
  v = Pe(v, e);
}, q = () => {
  typeof document > "u" || Ve || (Fo(), Oo(), Do(), Ve = !0);
}, qe = 10;
class jo {
  constructor() {
    this.list = [], this.lookup = /* @__PURE__ */ new Set();
  }
  add(e) {
    this.lookup.has(e) || (this.list.push(e), this.lookup.add(e));
  }
  remove(e) {
    this.lookup.has(e) && (this.list = this.list.filter((o) => o !== e), this.lookup.delete(e));
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
    let o;
    const r = /* @__PURE__ */ new Map();
    for (o = this.shift(); o; ) {
      const a = r.get(o) || 0;
      if (a > qe)
        throw new Error(`Web component processed too many times this task, max allowed is: ${qe}`);
      e(o), r.set(o, a + 1), o = this.shift();
    }
  }
}
const Bt = le("Tags", /* @__PURE__ */ new Map()), Fe = /* @__PURE__ */ new Set();
let T = /* @__PURE__ */ new Map(), Ce;
const vt = -1, zo = (t) => {
  Fe.add(t), Bt.set(t, P());
}, Vo = (t) => Fe.has(t), Wo = () => [...Fe.values()], qo = (t) => {
  let e = Bt.get(t);
  e === void 0 && (e = vt), T.has(e) || T.set(e, /* @__PURE__ */ new Set()), T.get(e).add(t), Ce || (Ce = setTimeout(() => {
    Go(), T = /* @__PURE__ */ new Map(), Ce = void 0;
  }, 1e3));
}, Go = () => {
  const t = ho(), e = P(), o = t[e];
  let r = "Multiple UI5 Web Components instances detected.";
  t.length > 1 && (r = `${r}
Loading order (versions before 1.1.0 not listed): ${t.map((a) => `
${a.description}`).join("")}`), [...T.keys()].forEach((a) => {
    let n, s;
    a === vt ? (n = 1, s = {
      description: "Older unknown runtime"
    }) : (n = Ct(e, a), s = t[a]);
    let l;
    n > 0 ? l = "an older" : n < 0 ? l = "a newer" : l = "the same", r = `${r}

"${o.description}" failed to define ${T.get(a).size} tag(s) as they were defined by a runtime of ${l} version "${s.description}": ${[...T.get(a)].sort().join(", ")}.`, n > 0 ? r = `${r}
WARNING! If your code uses features of the above web components, unavailable in ${s.description}, it might not work as expected!` : r = `${r}
Since the above web components were defined by the same or newer version runtime, they should be compatible with your code.`;
  }), r = `${r}

To prevent other runtimes from defining tags that you use, consider using scoping or have third-party libraries use scoping: https://github.com/SAP/ui5-webcomponents/blob/main/docs/2-advanced/03-scoping.md.`, console.warn(r);
}, St = /* @__PURE__ */ new Set(), Jo = (t) => {
  St.add(t);
}, Ko = (t) => St.has(t), Oe = /* @__PURE__ */ new Set(), Zo = new w(), H = new jo();
let E, ee, me, K;
const bt = async (t) => {
  H.add(t), await Yo();
}, yt = (t) => {
  Zo.fireEvent("beforeComponentRender", t), Oe.add(t), t._render();
}, Xo = (t) => {
  H.remove(t), Oe.delete(t);
}, Yo = async () => {
  K || (K = new Promise((t) => {
    window.requestAnimationFrame(() => {
      H.process(yt), K = null, t(), me || (me = setTimeout(() => {
        me = void 0, H.isEmpty() && tr();
      }, 200));
    });
  })), await K;
}, Qo = () => E || (E = new Promise((t) => {
  ee = t, window.requestAnimationFrame(() => {
    H.isEmpty() && (E = void 0, t());
  });
}), E), er = () => {
  const t = Wo().map((e) => customElements.whenDefined(e));
  return Promise.all(t);
}, At = async () => {
  await er(), await Qo();
}, tr = () => {
  H.isEmpty() && ee && (ee(), ee = void 0, E = void 0);
}, or = async (t) => {
  Oe.forEach((e) => {
    const o = e.constructor, r = o.getMetadata().getTag(), a = Ko(o), n = o.getMetadata().isLanguageAware(), s = o.getMetadata().isThemeAware();
    (!t || t.tag === r || t.rtlAware && a || t.languageAware && n || t.themeAware && s) && bt(e);
  }), await At();
}, Tt = new w(), kt = "themeRegistered", rr = (t) => {
  Tt.attachEvent(kt, t);
}, ar = (t) => Tt.fireEvent(kt, t), Ge = /* @__PURE__ */ new Map(), wt = /* @__PURE__ */ new Map(), nr = /* @__PURE__ */ new Map(), It = /* @__PURE__ */ new Set(), ne = /* @__PURE__ */ new Set(), fa = (t, e, o) => {
  wt.set(`${t}/${e}`, o), It.add(t), ne.add(e), ar(e);
}, xt = async (t, e, o) => {
  const r = `${t}_${e}_${o || ""}`, a = Ge.get(r);
  if (a !== void 0)
    return a;
  if (!ne.has(e)) {
    const i = [...ne.values()].join(", ");
    return console.warn(`You have requested a non-registered theme ${e} - falling back to ${re}. Registered themes are: ${i}`), Be(t, re);
  }
  const [n, s] = await Promise.all([
    Be(t, e),
    o ? Be(t, o, !0) : void 0
  ]), l = Bo(n, s);
  return l && Ge.set(r, l), l;
}, Be = async (t, e, o = !1) => {
  const a = (o ? nr : wt).get(`${t}/${e}`);
  if (!a) {
    o || console.error(`Theme [${e}] not registered for package [${t}]`);
    return;
  }
  let n;
  try {
    n = await a(e);
  } catch (l) {
    console.error(t, l.message);
    return;
  }
  return n._ || n;
}, Et = () => It, sr = (t) => ne.has(t), U = /* @__PURE__ */ new Set(), ir = () => {
  let t = document.querySelector(".sapThemeMetaData-Base-baseLib") || document.querySelector(".sapThemeMetaData-UI5-sap-ui-core");
  if (t)
    return getComputedStyle(t).backgroundImage;
  t = document.createElement("span"), t.style.display = "none", t.classList.add("sapThemeMetaData-Base-baseLib"), document.body.appendChild(t);
  let e = getComputedStyle(t).backgroundImage;
  return e === "none" && (t.classList.add("sapThemeMetaData-UI5-sap-ui-core"), e = getComputedStyle(t).backgroundImage), document.body.removeChild(t), e;
}, lr = (t) => {
  const e = /\(["']?data:text\/plain;utf-8,(.*?)['"]?\)$/i.exec(t);
  if (e && e.length >= 2) {
    let o = e[1];
    if (o = o.replace(/\\"/g, '"'), o.charAt(0) !== "{" && o.charAt(o.length - 1) !== "}")
      try {
        o = decodeURIComponent(o);
      } catch {
        U.has("decode") || (console.warn("Malformed theme metadata string, unable to decodeURIComponent"), U.add("decode"));
        return;
      }
    try {
      return JSON.parse(o);
    } catch {
      U.has("parse") || (console.warn("Malformed theme metadata string, unable to parse JSON"), U.add("parse"));
    }
  }
}, dr = (t) => {
  let e, o;
  try {
    e = t.Path.match(/\.([^.]+)\.css_variables$/)[1], o = t.Extends[0];
  } catch {
    U.has("object") || (console.warn("Malformed theme metadata Object", t), U.add("object"));
    return;
  }
  return {
    themeName: e,
    baseThemeName: o
  };
}, Ue = () => {
  const t = ir();
  if (!t || t === "none")
    return;
  const e = lr(t);
  if (e)
    return dr(e);
}, cr = new w(), fr = "themeLoaded", _r = (t) => cr.fireEvent(fr, t);
let ve;
const Ut = () => (ve === void 0 && (ve = Po()), ve), pr = (t) => `${Ut()}Base/baseLib/${t}/css_variables.css`, ur = async (t) => {
  const e = document.querySelector(`[sap-ui-webcomponents-theme="${t}"]`);
  e && document.head.removeChild(e), await no(pr(t), { "sap-ui-webcomponents-theme": t });
}, D = "@ui5/webcomponents-theming", hr = () => Et().has(D), gr = async (t) => {
  if (!hr())
    return;
  const e = await xt(D, t);
  e && mt(e, "data-ui5-theme-properties", D, t);
}, Cr = () => {
  mo("data-ui5-theme-properties", D);
}, mr = async (t, e) => {
  const r = [...Et()].map(async (a) => {
    if (a === D)
      return;
    const n = await xt(a, t, e);
    n && mt(n, `data-ui5-component-properties-${P()}`, a);
  });
  return Promise.all(r);
}, Br = async (t) => {
  var r;
  const e = Ue();
  if (e)
    return e;
  const o = S("OpenUI5Support");
  if (o && o.isOpenUI5Detected()) {
    if (o.cssVariablesLoaded())
      return {
        themeName: (r = o.getConfigurationSettingsObject()) == null ? void 0 : r.theme,
        baseThemeName: ""
        // baseThemeName is only relevant for custom themes
      };
  } else if (Ut())
    return await ur(t), Ue();
}, Ht = async (t) => {
  const e = await Br(t);
  !e || t !== e.themeName ? await gr(t) : Cr();
  const o = sr(t) ? t : e && e.baseThemeName;
  await mr(o || re, e && e.themeName === t ? t : void 0), _r(t);
};
let Se;
const Re = () => (Se === void 0 && (Se = Lo()), Se), _a = () => {
  var e, o;
  const t = Re();
  return vr(t) ? !t.startsWith("sap_horizon") : !((o = (e = Ue()) == null ? void 0 : e.baseThemeName) != null && o.startsWith("sap_horizon"));
}, vr = (t) => Io.includes(t);
let $t = !1, Z;
const Sr = new w(), br = async () => {
  if (Z !== void 0)
    return Z;
  const t = async (e) => {
    if (typeof document > "u") {
      e();
      return;
    }
    rr(yr), uo();
    const o = S("OpenUI5Support"), r = o ? o.isOpenUI5Detected() : !1, a = S("F6Navigation");
    o && await o.init(), a && !r && a.init(), await ro(), await Ht(Re()), o && o.attachListeners(), yo(), wo(), e(), $t = !0, await Sr.fireEventAsync("boot");
  };
  return Z = new Promise(t), Z;
}, yr = (t) => {
  const e = Re();
  $t && t === e && Ht(e);
}, be = /* @__PURE__ */ new Map(), ye = /* @__PURE__ */ new Map(), Je = (t) => {
  if (!be.has(t)) {
    const e = Ar(t.split("-"));
    be.set(t, e);
  }
  return be.get(t);
}, Lt = (t) => {
  if (!ye.has(t)) {
    const e = t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
    ye.set(t, e);
  }
  return ye.get(t);
}, Ar = (t) => t.map((e, o) => o === 0 ? e.toLowerCase() : e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).join(""), Tr = (t) => {
  if (!(t instanceof HTMLElement))
    return "default";
  const e = t.getAttribute("slot");
  if (e) {
    const o = e.match(/^(.+?)-\d+$/);
    return o ? o[1] : e;
  }
  return "default";
}, Pt = (t) => t instanceof HTMLSlotElement ? t.assignedNodes({ flatten: !0 }).filter((e) => e instanceof HTMLElement) : [t], kr = (t) => t.reduce((e, o) => e.concat(Pt(o)), []);
let wr, Ke = {
  include: [/^ui5-/],
  exclude: []
};
const Ae = /* @__PURE__ */ new Map(), Mt = () => wr, He = (t) => {
  if (!Ae.has(t)) {
    const e = Ke.include.some((o) => t.match(o)) && !Ke.exclude.some((o) => t.match(o));
    Ae.set(t, e);
  }
  return Ae.get(t);
}, Ft = (t) => {
  if (He(t))
    return Mt();
};
class Ir {
  constructor(e) {
    this.metadata = e;
  }
  getInitialState() {
    if (Object.prototype.hasOwnProperty.call(this, "_initialState"))
      return this._initialState;
    const e = {}, o = this.slotsAreManaged(), r = this.getProperties();
    for (const a in r) {
      const n = r[a].type, s = r[a].defaultValue;
      n === Boolean ? (e[a] = !1, s !== void 0 && console.warn("The 'defaultValue' metadata key is ignored for all booleans properties, they would be initialized with 'false' by default")) : r[a].multiple ? Object.defineProperty(e, a, {
        enumerable: !0,
        get() {
          return [];
        }
      }) : n === Object ? Object.defineProperty(e, a, {
        enumerable: !0,
        get() {
          return "defaultValue" in r[a] ? r[a].defaultValue : {};
        }
      }) : n === String ? e[a] = "defaultValue" in r[a] ? r[a].defaultValue : "" : e[a] = s;
    }
    if (o) {
      const a = this.getSlots();
      for (const [n, s] of Object.entries(a)) {
        const l = s.propertyName || n;
        e[l] = [];
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
  static validatePropertyValue(e, o) {
    return o.multiple && e ? e.map((a) => Ze(a, o)) : Ze(e, o);
  }
  /**
   * Validates the slot's value and returns it if correct
   * or throws an exception if not.
   * **Note:** Only intended for use by UI5Element.js
   * @public
   */
  static validateSlotValue(e, o) {
    return xr(e, o);
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
    const o = Ft(e);
    return o ? `${e}-${o}` : e;
  }
  /**
   * Determines whether a property should have an attribute counterpart
   * @public
   * @param propName
   */
  hasAttribute(e) {
    const o = this.getProperties()[e];
    return o.type !== Object && !o.noAttribute && !o.multiple;
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
    return this.getPropertiesList().filter(this.hasAttribute.bind(this)).map(Lt);
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
  shouldInvalidateOnChildChange(e, o, r) {
    const a = this.getSlots()[e].invalidateOnChildChange;
    if (a === void 0)
      return !1;
    if (typeof a == "boolean")
      return a;
    if (typeof a == "object") {
      if (o === "property") {
        if (a.properties === void 0)
          return !1;
        if (typeof a.properties == "boolean")
          return a.properties;
        if (Array.isArray(a.properties))
          return a.properties.includes(r);
        throw new Error("Wrong format for invalidateOnChildChange.properties: boolean or array is expected");
      }
      if (o === "slot") {
        if (a.slots === void 0)
          return !1;
        if (typeof a.slots == "boolean")
          return a.slots;
        if (Array.isArray(a.slots))
          return a.slots.includes(r);
        throw new Error("Wrong format for invalidateOnChildChange.slots: boolean or array is expected");
      }
    }
    throw new Error("Wrong format for invalidateOnChildChange: boolean or object is expected");
  }
}
const Ze = (t, e) => {
  const o = e.type;
  let r = e.validator;
  return o && o.isDataTypeClass && (r = o), r ? r.isValid(t) ? t : e.defaultValue : !o || o === String ? typeof t == "string" || typeof t > "u" || t === null ? t : t.toString() : o === Boolean ? typeof t == "boolean" ? t : !1 : o === Object ? typeof t == "object" ? t : e.defaultValue : t in o ? t : e.defaultValue;
}, xr = (t, e) => (t && Pt(t).forEach((o) => {
  if (!(o instanceof e.type))
    throw new Error(`The element is not of type ${e.type.toString()}`);
}), t);
class Er extends HTMLElement {
}
customElements.get("ui5-static-area") || customElements.define("ui5-static-area", Er);
const Ur = () => le("CustomStyle.eventProvider", new w()), Hr = "CustomCSSChange", Ne = (t) => {
  Ur().attachEvent(Hr, t);
}, $r = () => le("CustomStyle.customCSSFor", {});
Ne((t) => {
  or({ tag: t });
});
const Lr = (t) => {
  const e = $r();
  return e[t] ? e[t].join("") : "";
}, Pr = 10, Te = (t) => Array.isArray(t) ? t.filter((e) => !!e).flat(Pr).map((e) => typeof e == "string" ? e : e.content).join(" ") : typeof t == "string" ? t : t.content, te = /* @__PURE__ */ new Map();
Ne((t) => {
  te.delete(`${t}_normal`);
});
const Ot = (t, e = !1) => {
  const o = t.getMetadata().getTag(), r = `${o}_${e ? "static" : "normal"}`, a = S("OpenUI5Enablement");
  if (!te.has(r)) {
    let n, s = "";
    if (a && (s = Te(a.getBusyIndicatorStyles())), e)
      n = Te(t.staticAreaStyles);
    else {
      const l = Lr(o) || "";
      n = `${Te(t.styles)} ${l}`;
    }
    n = `${n} ${s}`, te.set(r, n);
  }
  return te.get(r);
}, oe = /* @__PURE__ */ new Map();
Ne((t) => {
  oe.delete(`${t}_normal`);
});
const Mr = (t, e = !1) => {
  const r = `${t.getMetadata().getTag()}_${e ? "static" : "normal"}`;
  if (!oe.has(r)) {
    const a = Ot(t, e), n = new CSSStyleSheet();
    n.replaceSync(a), oe.set(r, [n]);
  }
  return oe.get(r);
}, $e = (t, e = !1) => {
  let o;
  const r = t.constructor, a = e ? t.staticAreaItem.shadowRoot : t.shadowRoot;
  let n;
  if (e ? n = t.renderStatic() : n = t.render(), !a) {
    console.warn("There is no shadow root to update");
    return;
  }
  if (document.adoptedStyleSheets && !W() ? a.adoptedStyleSheets = Mr(r, e) : o = Ot(r, e), r.renderer) {
    r.renderer(n, a, o, e, { host: t });
    return;
  }
  r.render(n, a, o, e, { host: t });
}, Fr = "--_ui5_content_density", Or = (t) => getComputedStyle(t).getPropertyValue(Fr), Rt = (t) => t.matches(":dir(rtl)") ? "rtl" : "ltr", X = "ui5-static-area-item", Rr = "data-sap-ui-integration-popup-content";
class R extends HTMLElement {
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
    this._rendered && (this.updateAdditionalProperties(), $e(this.ownerElement, !0));
  }
  updateAdditionalProperties() {
    this._updateAdditionalAttrs(), this._updateContentDensity(), this._updateDirection();
  }
  /**
   * Sets the correct content density based on the owner element's state
   * @private
   */
  _updateContentDensity() {
    Or(this.ownerElement) === "compact" ? (this.classList.add("sapUiSizeCompact"), this.classList.add("ui5-content-density-compact")) : (this.classList.remove("sapUiSizeCompact"), this.classList.remove("ui5-content-density-compact"));
  }
  _updateDirection() {
    if (this.ownerElement) {
      const e = Rt(this.ownerElement);
      e === "rtl" ? this.setAttribute("dir", e) : this.removeAttribute("dir");
    }
  }
  _updateAdditionalAttrs() {
    this.setAttribute(X, ""), this.setAttribute(Rr, "");
  }
  /**
   * Returns reference to the DOM element where the current fragment is added.
   * @protected
   */
  async getDomRef() {
    return this.updateAdditionalProperties(), this._rendered || (this._rendered = !0, $e(this.ownerElement, !0)), await At(), this.shadowRoot;
  }
  static getTag() {
    const e = Ft(X);
    return e ? `${X}-${e}` : X;
  }
  static createInstance() {
    return customElements.get(R.getTag()) || customElements.define(R.getTag(), R), document.createElement(this.getTag());
  }
}
const Nr = [], Dr = (t) => Nr.some((e) => t.startsWith(e)), Le = /* @__PURE__ */ new WeakMap(), jr = (t, e, o) => {
  const r = new MutationObserver(e);
  Le.set(t, r), r.observe(t, o);
}, zr = (t) => {
  const e = Le.get(t);
  e && (e.disconnect(), Le.delete(t));
}, Vr = [
  "value-changed",
  "click"
];
let ke;
const Wr = (t) => Vr.includes(t), qr = (t) => {
  const e = Nt();
  return !(typeof e != "boolean" && e.events && e.events.includes && e.events.includes(t));
}, Nt = () => (ke === void 0 && (ke = Mo()), ke), Gr = (t) => {
  const e = Nt();
  return Wr(t) ? !1 : e === !0 ? !0 : !qr(t);
}, Jr = [
  "disabled",
  "title",
  "hidden",
  "role",
  "draggable"
], Xe = (t) => Jr.includes(t) || t.startsWith("aria") ? !0 : ![
  HTMLElement,
  Element,
  Node
].some((o) => o.prototype.hasOwnProperty(t)), Ye = (t, e) => {
  if (t.length !== e.length)
    return !1;
  for (let o = 0; o < t.length; o++)
    if (t[o] !== e[o])
      return !1;
  return !0;
}, Qe = (t, e) => {
  const o = Kr(e), r = Mt();
  return t.call(e, e, o, r);
}, Kr = (t) => {
  const e = t.constructor, o = e.getMetadata().getPureTag(), r = e.getUniqueDependencies().map((a) => a.getMetadata().getPureTag()).filter(He);
  return He(o) && r.push(o), r;
};
let Zr = 0;
const et = /* @__PURE__ */ new Map(), we = /* @__PURE__ */ new Map();
function F(t) {
  this._suppressInvalidation || (this.onInvalidation(t), this._changedState.push(t), bt(this), this._invalidationEventProvider.fireEvent("invalidate", { ...t, target: this }));
}
class pe extends HTMLElement {
  constructor() {
    super();
    const e = this.constructor;
    this._changedState = [], this._suppressInvalidation = !0, this._inDOM = !1, this._fullyConnected = !1, this._childChangeListeners = /* @__PURE__ */ new Map(), this._slotChangeListeners = /* @__PURE__ */ new Map(), this._invalidationEventProvider = new w(), this._componentStateFinalizedEventProvider = new w();
    let o;
    this._domRefReadyPromise = new Promise((r) => {
      o = r;
    }), this._domRefReadyPromise._deferredResolve = o, this._doNotSyncAttributes = /* @__PURE__ */ new Set(), this._state = { ...e.getMetadata().getInitialState() }, this._upgradeAllProperties(), e._needsShadowDOM() && this.attachShadow({ mode: "open" });
  }
  /**
   * Returns a unique ID for this UI5 Element
   *
   * @deprecated - This property is not guaranteed in future releases
   * @protected
   */
  get _id() {
    return this.__id || (this.__id = `ui5wc_${++Zr}`), this.__id;
  }
  render() {
    const e = this.constructor.template;
    return Qe(e, this);
  }
  renderStatic() {
    const e = this.constructor.staticAreaTemplate;
    return Qe(e, this);
  }
  /**
   * Do not call this method from derivatives of UI5Element, use "onEnterDOM" only
   * @private
   */
  async connectedCallback() {
    const e = this.constructor;
    this.setAttribute(e.getMetadata().getPureTag(), ""), e.getMetadata().supportsF6FastNavigation() && this.setAttribute("data-sap-ui-fastnavgroup", "true");
    const o = e.getMetadata().slotsAreManaged();
    this._inDOM = !0, o && (this._startObservingDOMChildren(), await this._processChildren()), this._inDOM && (yt(this), this._domRefReadyPromise._deferredResolve(), this._fullyConnected = !0, this.onEnterDOM());
  }
  /**
   * Do not call this method from derivatives of UI5Element, use "onExitDOM" only
   * @private
   */
  disconnectedCallback() {
    const o = this.constructor.getMetadata().slotsAreManaged();
    this._inDOM = !1, o && this._stopObservingDOMChildren(), this._fullyConnected && (this.onExitDOM(), this._fullyConnected = !1), this.staticAreaItem && this.staticAreaItem.parentElement && this.staticAreaItem.parentElement.removeChild(this.staticAreaItem), Xo(this);
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
    const o = this.constructor.getMetadata();
    if (!o.hasSlots())
      return;
    const a = o.canSlotText(), n = Object.keys(o.getSlots()).some((l) => o.getSlots()[l].cloned), s = {
      childList: !0,
      subtree: a || n,
      characterData: a
    };
    jr(this, this._processChildren.bind(this), s);
  }
  /**
   * @private
   */
  _stopObservingDOMChildren() {
    zr(this);
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
    const e = this.constructor, o = e.getMetadata().getSlots(), r = e.getMetadata().canSlotText(), a = Array.from(r ? this.childNodes : this.children), n = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map();
    for (const [c, u] of Object.entries(o)) {
      const _ = u.propertyName || c;
      s.set(_, c), n.set(_, [...this._state[_]]), this._clearSlot(c, u);
    }
    const l = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), d = a.map(async (c, u) => {
      const _ = Tr(c), C = o[_];
      if (C === void 0) {
        if (_ !== "default") {
          const B = Object.keys(o).join(", ");
          console.warn(`Unknown slotName: ${_}, ignoring`, c, `Valid values are: ${B}`);
        }
        return;
      }
      if (C.individualSlots) {
        const B = (l.get(_) || 0) + 1;
        l.set(_, B), c._individualSlot = `${_}-${B}`;
      }
      if (c instanceof HTMLElement) {
        const B = c.localName;
        if (B.includes("-") && !Dr(B)) {
          if (!customElements.get(B)) {
            const Yt = customElements.whenDefined(B);
            let J = et.get(B);
            J || (J = new Promise((Qt) => setTimeout(Qt, 1e3)), et.set(B, J)), await Promise.race([Yt, J]);
          }
          customElements.upgrade(c);
        }
      }
      if (c = e.getMetadata().constructor.validateSlotValue(c, C), tt(c) && C.invalidateOnChildChange) {
        const B = this._getChildChangeListener(_);
        B && c.attachInvalidate.call(c, B);
      }
      c instanceof HTMLSlotElement && this._attachSlotChange(c, _);
      const m = C.propertyName || _;
      i.has(m) ? i.get(m).push({ child: c, idx: u }) : i.set(m, [{ child: c, idx: u }]);
    });
    await Promise.all(d), i.forEach((c, u) => {
      this._state[u] = c.sort((_, C) => _.idx - C.idx).map((_) => _.child);
    });
    let f = !1;
    for (const [c, u] of Object.entries(o)) {
      const _ = u.propertyName || c;
      Ye(n.get(_), this._state[_]) || (F.call(this, {
        type: "slot",
        name: s.get(_),
        reason: "children"
      }), f = !0);
    }
    f || F.call(this, {
      type: "slot",
      name: "default",
      reason: "textcontent"
    });
  }
  /**
   * Removes all children from the slot and detaches listeners, if any
   * @private
   */
  _clearSlot(e, o) {
    const r = o.propertyName || e;
    this._state[r].forEach((n) => {
      if (tt(n)) {
        const s = this._getChildChangeListener(e);
        s && n.detachInvalidate.call(n, s);
      }
      n instanceof HTMLSlotElement && this._detachSlotChange(n, e);
    }), this._state[r] = [];
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
  _onChildChange(e, o) {
    this.constructor.getMetadata().shouldInvalidateOnChildChange(e, o.type, o.name) && F.call(this, {
      type: "slot",
      name: e,
      reason: "childchange",
      child: o.target
    });
  }
  /**
   * Do not override this method in derivatives of UI5Element
   * @private
   */
  attributeChangedCallback(e, o, r) {
    let a;
    if (this._doNotSyncAttributes.has(e))
      return;
    const n = this.constructor.getMetadata().getProperties(), s = e.replace(/^ui5-/, ""), l = Je(s);
    if (n.hasOwnProperty(l)) {
      const i = n[l], d = i.type;
      let f = i.validator;
      d && d.isDataTypeClass && (f = d), f ? a = f.attributeToProperty(r) : d === Boolean ? a = r !== null : a = r, this[l] = a;
    }
  }
  /**
   * @private
   */
  _updateAttribute(e, o) {
    const r = this.constructor;
    if (!r.getMetadata().hasAttribute(e))
      return;
    const n = r.getMetadata().getProperties()[e], s = n.type;
    let l = n.validator;
    const i = Lt(e), d = this.getAttribute(i);
    if (s && s.isDataTypeClass && (l = s), l) {
      const f = l.propertyToAttribute(o);
      f === null ? (this._doNotSyncAttributes.add(i), this.removeAttribute(i), this._doNotSyncAttributes.delete(i)) : this.setAttribute(i, f);
    } else
      s === Boolean ? o === !0 && d === null ? this.setAttribute(i, "") : o === !1 && d !== null && this.removeAttribute(i) : typeof o != "object" && d !== o && this.setAttribute(i, o);
  }
  /**
   * @private
   */
  _upgradeProperty(e) {
    if (this.hasOwnProperty(e)) {
      const o = this[e];
      delete this[e], this[e] = o;
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
  _attachSlotChange(e, o) {
    const r = this._getSlotChangeListener(o);
    r && e.addEventListener("slotchange", r);
  }
  /**
   * @private
   */
  _detachSlotChange(e, o) {
    e.removeEventListener("slotchange", this._getSlotChangeListener(o));
  }
  /**
   * Whenever a slot element is slotted inside a UI5 Web Component, its slotchange event invalidates the component
   *
   * @param slotName the name of the slot, where the slot element (whose slotchange event we're listening to) is
   * @private
   */
  _onSlotChange(e) {
    F.call(this, {
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
    const e = this.constructor, o = e.getMetadata().hasIndividualSlots();
    this._suppressInvalidation = !0, this.onBeforeRendering(), this._componentStateFinalizedEventProvider.fireEvent("componentStateFinalized"), this._suppressInvalidation = !1, this._changedState = [], e._needsShadowDOM() && $e(this), this.staticAreaItem && this.staticAreaItem.update(), o && this._assignIndividualSlotsToChildren(), this.onAfterRendering();
  }
  /**
   * @private
   */
  _assignIndividualSlotsToChildren() {
    Array.from(this.children).forEach((o) => {
      o._individualSlot && o.setAttribute("slot", o._individualSlot);
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
    const e = [...this.shadowRoot.children].filter((o) => !["link", "style"].includes(o.localName));
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
    const o = this.getFocusDomRef();
    o && typeof o.focus == "function" && o.focus(e);
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
  fireEvent(e, o, r = !1, a = !0) {
    const n = this._fireEvent(e, o, r, a), s = Je(e);
    return s !== e ? n && this._fireEvent(s, o, r, a) : n;
  }
  _fireEvent(e, o, r = !1, a = !0) {
    const n = new CustomEvent(`ui5-${e}`, {
      detail: o,
      composed: !1,
      bubbles: a,
      cancelable: r
    }), s = this.dispatchEvent(n);
    if (Gr(e))
      return s;
    const l = new CustomEvent(e, {
      detail: o,
      composed: !1,
      bubbles: a,
      cancelable: r
    });
    return this.dispatchEvent(l) && s;
  }
  /**
   * Returns the actual children, associated with a slot.
   * Useful when there are transitive slots in nested component scenarios and you don't want to get a list of the slots, but rather of their content.
   * @public
   */
  getSlottedNodes(e) {
    return kr(this[e]);
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
    return Jo(this.constructor), Rt(this);
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
    return this.staticAreaItem || (this.staticAreaItem = R.createInstance(), this.staticAreaItem.setOwnerElement(this)), this.staticAreaItem.parentElement || gt("ui5-static-area").appendChild(this.staticAreaItem), this.staticAreaItem.getDomRef();
  }
  /**
   * @private
   */
  static _generateAccessors() {
    const e = this.prototype, o = this.getMetadata().slotsAreManaged(), r = this.getMetadata().getProperties();
    for (const [a, n] of Object.entries(r)) {
      if (Xe(a) || console.warn(`"${a}" is not a valid property name. Use a name that does not collide with DOM APIs`), n.type === Boolean && n.defaultValue)
        throw new Error(`Cannot set a default value for property "${a}". All booleans are false by default.`);
      if (n.type === Array)
        throw new Error(`Wrong type for property "${a}". Properties cannot be of type Array - use "multiple: true" and set "type" to the single value type, such as "String", "Object", etc...`);
      if (n.type === Object && n.defaultValue)
        throw new Error(`Cannot set a default value for property "${a}". All properties of type "Object" are empty objects by default.`);
      if (n.multiple && n.defaultValue)
        throw new Error(`Cannot set a default value for property "${a}". All multiple properties are empty arrays by default.`);
      const s = Object.getOwnPropertyDescriptor(e, a);
      let l;
      s != null && s.set && (l = s.set);
      let i;
      s != null && s.get && (i = s.get), Object.defineProperty(e, a, {
        get() {
          if (i)
            return i.call(this);
          if (this._state[a] !== void 0)
            return this._state[a];
          const d = n.defaultValue;
          return n.type === Boolean ? !1 : n.type === String ? d : n.multiple ? [] : d;
        },
        set(d) {
          let f;
          d = this.constructor.getMetadata().constructor.validatePropertyValue(d, n);
          const _ = n.type;
          let C = n.validator;
          const m = i ? i.call(this) : this._state[a];
          _ && _.isDataTypeClass && (C = _), C ? f = !C.valuesAreEqual(m, d) : Array.isArray(m) && Array.isArray(d) && n.multiple && n.compareValues ? f = !Ye(m, d) : f = m !== d, f && (l ? l.call(this, d) : this._state[a] = d, F.call(this, {
            type: "property",
            name: a,
            newValue: d,
            oldValue: m
          }), this._updateAttribute(a, d));
        }
      });
    }
    if (o) {
      const a = this.getMetadata().getSlots();
      for (const [n, s] of Object.entries(a)) {
        Xe(n) || console.warn(`"${n}" is not a valid property name. Use a name that does not collide with DOM APIs`);
        const l = s.propertyName || n;
        Object.defineProperty(e, l, {
          get() {
            return this._state[l] !== void 0 ? this._state[l] : [];
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
    if (!we.has(this)) {
      const e = this.dependencies.filter((o, r, a) => a.indexOf(o) === r);
      we.set(this, e);
    }
    return we.get(this) || [];
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
    await br(), await Promise.all([
      this.whenDependenciesDefined(),
      this.onDefine()
    ]);
    const e = this.getMetadata().getTag(), o = Vo(e), r = customElements.get(e);
    return r && !o ? qo(e) : r || (this._generateAccessors(), zo(e), customElements.define(e, this)), this;
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
    let o = this;
    for (; o !== pe; )
      o = Object.getPrototypeOf(o), e.unshift(o.metadata);
    const r = Pe({}, ...e);
    return this._metadata = new Ir(r), this._metadata;
  }
}
pe.metadata = {};
pe.styles = "";
const tt = (t) => "isUI5Element" in t, pa = (t = {}) => (e) => {
  if (Object.prototype.hasOwnProperty.call(e, "metadata") || (e.metadata = {}), typeof t == "string") {
    e.metadata.tag = t;
    return;
  }
  const { tag: o, languageAware: r, themeAware: a, fastNavigation: n } = t;
  e.metadata.tag = o, r && (e.metadata.languageAware = r), a && (e.metadata.themeAware = a), n && (e.metadata.fastNavigation = n), ["render", "renderer", "template", "staticAreaTemplate", "styles", "staticAreaStyles", "dependencies"].forEach((s) => {
    const i = t[s === "render" ? "renderer" : s];
    i && Object.defineProperty(e, s, {
      get: () => i
    });
  });
}, ua = (t) => (e, o) => {
  const r = e.constructor;
  Object.prototype.hasOwnProperty.call(r, "metadata") || (r.metadata = {});
  const a = r.metadata;
  a.properties || (a.properties = {});
  const n = a.properties;
  n[o] || (n[o] = t || { type: String });
}, ha = (t) => (e, o) => {
  const r = e.constructor;
  Object.prototype.hasOwnProperty.call(r, "metadata") || (r.metadata = {});
  const a = r.metadata;
  a.slots || (a.slots = {});
  const n = a.slots;
  if (t && t.default && n.default)
    throw new Error("Only one slot can be the default slot.");
  const s = t && t.default ? "default" : o;
  t = t || { type: HTMLElement }, t.type || (t.type = HTMLElement), n[s] || (n[s] = t), t.default && (delete n.default.default, n.default.propertyName = o), r.metadata.managedSlots = !0;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Ie;
const se = window, $ = se.trustedTypes, ot = $ ? $.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, ie = "$lit$", b = `lit$${(Math.random() + "").slice(9)}$`, De = "?" + b, Xr = `<${De}>`, I = document, j = () => I.createComment(""), z = (t) => t === null || typeof t != "object" && typeof t != "function", Dt = Array.isArray, jt = (t) => Dt(t) || typeof (t == null ? void 0 : t[Symbol.iterator]) == "function", xe = `[ 	
\f\r]`, O = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, rt = /-->/g, at = />/g, A = RegExp(`>|${xe}(?:([^\\s"'>=/]+)(${xe}*=${xe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), nt = /'/g, st = /"/g, zt = /^(?:script|style|textarea|title)$/i, Vt = (t) => (e, ...o) => ({ _$litType$: t, strings: e, values: o }), Yr = Vt(1), Qr = Vt(2), L = Symbol.for("lit-noChange"), h = Symbol.for("lit-nothing"), it = /* @__PURE__ */ new WeakMap(), k = I.createTreeWalker(I, 129, null, !1);
function Wt(t, e) {
  if (!Array.isArray(t) || !t.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return ot !== void 0 ? ot.createHTML(e) : e;
}
const qt = (t, e) => {
  const o = t.length - 1, r = [];
  let a, n = e === 2 ? "<svg>" : "", s = O;
  for (let l = 0; l < o; l++) {
    const i = t[l];
    let d, f, c = -1, u = 0;
    for (; u < i.length && (s.lastIndex = u, f = s.exec(i), f !== null); )
      u = s.lastIndex, s === O ? f[1] === "!--" ? s = rt : f[1] !== void 0 ? s = at : f[2] !== void 0 ? (zt.test(f[2]) && (a = RegExp("</" + f[2], "g")), s = A) : f[3] !== void 0 && (s = A) : s === A ? f[0] === ">" ? (s = a ?? O, c = -1) : f[1] === void 0 ? c = -2 : (c = s.lastIndex - f[2].length, d = f[1], s = f[3] === void 0 ? A : f[3] === '"' ? st : nt) : s === st || s === nt ? s = A : s === rt || s === at ? s = O : (s = A, a = void 0);
    const _ = s === A && t[l + 1].startsWith("/>") ? " " : "";
    n += s === O ? i + Xr : c >= 0 ? (r.push(d), i.slice(0, c) + ie + i.slice(c) + b + _) : i + b + (c === -2 ? (r.push(void 0), l) : _);
  }
  return [Wt(t, n + (t[o] || "<?>") + (e === 2 ? "</svg>" : "")), r];
};
class V {
  constructor({ strings: e, _$litType$: o }, r) {
    let a;
    this.parts = [];
    let n = 0, s = 0;
    const l = e.length - 1, i = this.parts, [d, f] = qt(e, o);
    if (this.el = V.createElement(d, r), k.currentNode = this.el.content, o === 2) {
      const c = this.el.content, u = c.firstChild;
      u.remove(), c.append(...u.childNodes);
    }
    for (; (a = k.nextNode()) !== null && i.length < l; ) {
      if (a.nodeType === 1) {
        if (a.hasAttributes()) {
          const c = [];
          for (const u of a.getAttributeNames())
            if (u.endsWith(ie) || u.startsWith(b)) {
              const _ = f[s++];
              if (c.push(u), _ !== void 0) {
                const C = a.getAttribute(_.toLowerCase() + ie).split(b), m = /([.?@])?(.*)/.exec(_);
                i.push({ type: 1, index: n, name: m[2], strings: C, ctor: m[1] === "." ? Jt : m[1] === "?" ? Kt : m[1] === "@" ? Zt : G });
              } else
                i.push({ type: 6, index: n });
            }
          for (const u of c)
            a.removeAttribute(u);
        }
        if (zt.test(a.tagName)) {
          const c = a.textContent.split(b), u = c.length - 1;
          if (u > 0) {
            a.textContent = $ ? $.emptyScript : "";
            for (let _ = 0; _ < u; _++)
              a.append(c[_], j()), k.nextNode(), i.push({ type: 2, index: ++n });
            a.append(c[u], j());
          }
        }
      } else if (a.nodeType === 8)
        if (a.data === De)
          i.push({ type: 2, index: n });
        else {
          let c = -1;
          for (; (c = a.data.indexOf(b, c + 1)) !== -1; )
            i.push({ type: 7, index: n }), c += b.length - 1;
        }
      n++;
    }
  }
  static createElement(e, o) {
    const r = I.createElement("template");
    return r.innerHTML = e, r;
  }
}
function x(t, e, o = t, r) {
  var a, n, s, l;
  if (e === L)
    return e;
  let i = r !== void 0 ? (a = o._$Co) === null || a === void 0 ? void 0 : a[r] : o._$Cl;
  const d = z(e) ? void 0 : e._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== d && ((n = i == null ? void 0 : i._$AO) === null || n === void 0 || n.call(i, !1), d === void 0 ? i = void 0 : (i = new d(t), i._$AT(t, o, r)), r !== void 0 ? ((s = (l = o)._$Co) !== null && s !== void 0 ? s : l._$Co = [])[r] = i : o._$Cl = i), i !== void 0 && (e = x(t, i._$AS(t, e.values), i, r)), e;
}
class Gt {
  constructor(e, o) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = o;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    var o;
    const { el: { content: r }, parts: a } = this._$AD, n = ((o = e == null ? void 0 : e.creationScope) !== null && o !== void 0 ? o : I).importNode(r, !0);
    k.currentNode = n;
    let s = k.nextNode(), l = 0, i = 0, d = a[0];
    for (; d !== void 0; ) {
      if (l === d.index) {
        let f;
        d.type === 2 ? f = new M(s, s.nextSibling, this, e) : d.type === 1 ? f = new d.ctor(s, d.name, d.strings, this, e) : d.type === 6 && (f = new Xt(s, this, e)), this._$AV.push(f), d = a[++i];
      }
      l !== (d == null ? void 0 : d.index) && (s = k.nextNode(), l++);
    }
    return k.currentNode = I, n;
  }
  v(e) {
    let o = 0;
    for (const r of this._$AV)
      r !== void 0 && (r.strings !== void 0 ? (r._$AI(e, r, o), o += r.strings.length - 2) : r._$AI(e[o])), o++;
  }
}
class M {
  constructor(e, o, r, a) {
    var n;
    this.type = 2, this._$AH = h, this._$AN = void 0, this._$AA = e, this._$AB = o, this._$AM = r, this.options = a, this._$Cp = (n = a == null ? void 0 : a.isConnected) === null || n === void 0 || n;
  }
  get _$AU() {
    var e, o;
    return (o = (e = this._$AM) === null || e === void 0 ? void 0 : e._$AU) !== null && o !== void 0 ? o : this._$Cp;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const o = this._$AM;
    return o !== void 0 && (e == null ? void 0 : e.nodeType) === 11 && (e = o.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, o = this) {
    e = x(this, e, o), z(e) ? e === h || e == null || e === "" ? (this._$AH !== h && this._$AR(), this._$AH = h) : e !== this._$AH && e !== L && this._(e) : e._$litType$ !== void 0 ? this.g(e) : e.nodeType !== void 0 ? this.$(e) : jt(e) ? this.T(e) : this._(e);
  }
  k(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  $(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.k(e));
  }
  _(e) {
    this._$AH !== h && z(this._$AH) ? this._$AA.nextSibling.data = e : this.$(I.createTextNode(e)), this._$AH = e;
  }
  g(e) {
    var o;
    const { values: r, _$litType$: a } = e, n = typeof a == "number" ? this._$AC(e) : (a.el === void 0 && (a.el = V.createElement(Wt(a.h, a.h[0]), this.options)), a);
    if (((o = this._$AH) === null || o === void 0 ? void 0 : o._$AD) === n)
      this._$AH.v(r);
    else {
      const s = new Gt(n, this), l = s.u(this.options);
      s.v(r), this.$(l), this._$AH = s;
    }
  }
  _$AC(e) {
    let o = it.get(e.strings);
    return o === void 0 && it.set(e.strings, o = new V(e)), o;
  }
  T(e) {
    Dt(this._$AH) || (this._$AH = [], this._$AR());
    const o = this._$AH;
    let r, a = 0;
    for (const n of e)
      a === o.length ? o.push(r = new M(this.k(j()), this.k(j()), this, this.options)) : r = o[a], r._$AI(n), a++;
    a < o.length && (this._$AR(r && r._$AB.nextSibling, a), o.length = a);
  }
  _$AR(e = this._$AA.nextSibling, o) {
    var r;
    for ((r = this._$AP) === null || r === void 0 || r.call(this, !1, !0, o); e && e !== this._$AB; ) {
      const a = e.nextSibling;
      e.remove(), e = a;
    }
  }
  setConnected(e) {
    var o;
    this._$AM === void 0 && (this._$Cp = e, (o = this._$AP) === null || o === void 0 || o.call(this, e));
  }
}
class G {
  constructor(e, o, r, a, n) {
    this.type = 1, this._$AH = h, this._$AN = void 0, this.element = e, this.name = o, this._$AM = a, this.options = n, r.length > 2 || r[0] !== "" || r[1] !== "" ? (this._$AH = Array(r.length - 1).fill(new String()), this.strings = r) : this._$AH = h;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e, o = this, r, a) {
    const n = this.strings;
    let s = !1;
    if (n === void 0)
      e = x(this, e, o, 0), s = !z(e) || e !== this._$AH && e !== L, s && (this._$AH = e);
    else {
      const l = e;
      let i, d;
      for (e = n[0], i = 0; i < n.length - 1; i++)
        d = x(this, l[r + i], o, i), d === L && (d = this._$AH[i]), s || (s = !z(d) || d !== this._$AH[i]), d === h ? e = h : e !== h && (e += (d ?? "") + n[i + 1]), this._$AH[i] = d;
    }
    s && !a && this.j(e);
  }
  j(e) {
    e === h ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Jt extends G {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === h ? void 0 : e;
  }
}
const ea = $ ? $.emptyScript : "";
class Kt extends G {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    e && e !== h ? this.element.setAttribute(this.name, ea) : this.element.removeAttribute(this.name);
  }
}
class Zt extends G {
  constructor(e, o, r, a, n) {
    super(e, o, r, a, n), this.type = 5;
  }
  _$AI(e, o = this) {
    var r;
    if ((e = (r = x(this, e, o, 0)) !== null && r !== void 0 ? r : h) === L)
      return;
    const a = this._$AH, n = e === h && a !== h || e.capture !== a.capture || e.once !== a.once || e.passive !== a.passive, s = e !== h && (a === h || n);
    n && this.element.removeEventListener(this.name, this, a), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    var o, r;
    typeof this._$AH == "function" ? this._$AH.call((r = (o = this.options) === null || o === void 0 ? void 0 : o.host) !== null && r !== void 0 ? r : this.element, e) : this._$AH.handleEvent(e);
  }
}
class Xt {
  constructor(e, o, r) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = o, this.options = r;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    x(this, e);
  }
}
const ga = { O: ie, P: b, A: De, C: 1, M: qt, L: Gt, R: jt, D: x, I: M, V: G, H: Kt, N: Zt, U: Jt, F: Xt }, lt = se.litHtmlPolyfillSupport;
lt == null || lt(V, M), ((Ie = se.litHtmlVersions) !== null && Ie !== void 0 ? Ie : se.litHtmlVersions = []).push("2.8.0");
const ta = (t, e, o) => {
  var r, a;
  const n = (r = o == null ? void 0 : o.renderBefore) !== null && r !== void 0 ? r : e;
  let s = n._$litPart$;
  if (s === void 0) {
    const l = (a = o == null ? void 0 : o.renderBefore) !== null && a !== void 0 ? a : null;
    n._$litPart$ = s = new M(e.insertBefore(j(), l), l, void 0, o ?? {});
  }
  return s._$AI(t), s;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oa = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, Ca = (t) => (...e) => ({ _$litDirective$: t, values: e });
class ra {
  constructor(e) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(e, o, r) {
    this._$Ct = e, this._$AM = o, this._$Ci = r;
  }
  _$AS(e, o) {
    return this.update(e, o);
  }
  update(e, o) {
    return this.render(...o);
  }
}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ma = (t) => t ?? h;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class dt extends ra {
  constructor(e) {
    if (super(e), this.et = h, e.type !== oa.CHILD)
      throw Error(this.constructor.directiveName + "() can only be used in child bindings");
  }
  render(e) {
    if (e === h || e == null)
      return this.ft = void 0, this.et = e;
    if (e === L)
      return e;
    if (typeof e != "string")
      throw Error(this.constructor.directiveName + "() called with a non-string value");
    if (e === this.et)
      return this.ft;
    this.et = e;
    const o = [e];
    return o.raw = o, this.ft = { _$litType$: this.constructor.resultType, strings: o, values: [] };
  }
}
dt.directiveName = "unsafeHTML", dt.resultType = 1;
const Y = (t, ...e) => {
  const o = S("LitStatic");
  return (o ? o.html : Yr)(t, ...e);
}, Ba = (t, ...e) => {
  const o = S("LitStatic");
  return (o ? o.svg : Qr)(t, ...e);
}, va = (t, e, o, r, a) => {
  const n = S("OpenUI5Enablement");
  n && !r && (t = n.wrapTemplateResultInBusyMarkup(Y, a.host, t)), typeof o == "string" ? t = Y`<style>${o}</style>${t}` : Array.isArray(o) && o.length && (t = Y`${o.map((s) => Y`<link type="text/css" rel="stylesheet" href="${s}">`)}${t}`), ta(t, e, a);
}, Sa = (t, e, o) => {
  const r = S("LitStatic");
  if (r)
    return r.unsafeStatic((e || []).includes(t) ? `${t}-${o}` : t);
}, ba = { packageName: "@ui5/webcomponents-theming", fileName: "themes/sap_horizon/parameters-bundle.css.ts", content: `:root{--sapThemeMetaData-Base-baseLib:{"Path": "Base.baseLib.sap_horizon.css_variables","PathPattern": "/%frameworkId%/%libId%/%themeId%/%fileId%.css","Extends": ["baseTheme"],"Tags": ["Fiori_3","LightColorScheme"],"FallbackThemeId": "sap_fiori_3","Engine":{"Name": "theming-engine","Version": "8.0.2"},"Version":{"Build": "11.12.0.20240207130903","Source": "11.12.0"}};--sapBrandColor: #0070f2;--sapHighlightColor: #0064d9;--sapBaseColor: #fff;--sapShellColor: #fff;--sapBackgroundColor: #f5f6f7;--sapFontFamily: "72", "72full", Arial, Helvetica, sans-serif;--sapFontSize: .875rem;--sapTextColor: #1d2d3e;--sapLinkColor: #0064d9;--sapCompanyLogo: none;--sapBackgroundImage: none;--sapBackgroundImageOpacity: 1;--sapBackgroundImageRepeat: false;--sapSelectedColor: #0064d9;--sapHoverColor: #eaecee;--sapActiveColor: #dee2e5;--sapHighlightTextColor: #fff;--sapTitleColor: #1d2d3e;--sapNegativeColor: #aa0808;--sapCriticalColor: #e76500;--sapPositiveColor: #256f3a;--sapInformativeColor: #0070f2;--sapNeutralColor: #788fa6;--sapNegativeElementColor: #f53232;--sapCriticalElementColor: #e76500;--sapPositiveElementColor: #30914c;--sapInformativeElementColor: #0070f2;--sapNeutralElementColor: #788fa6;--sapNegativeTextColor: #aa0808;--sapCriticalTextColor: #b44f00;--sapPositiveTextColor: #256f3a;--sapInformativeTextColor: #0064d9;--sapNeutralTextColor: #1d2d3e;--sapErrorColor: #aa0808;--sapWarningColor: #e76500;--sapSuccessColor: #256f3a;--sapInformationColor: #0070f2;--sapErrorBackground: #ffeaf4;--sapWarningBackground: #fff8d6;--sapSuccessBackground: #f5fae5;--sapInformationBackground: #e1f4ff;--sapNeutralBackground: #eff1f2;--sapErrorBorderColor: #e90b0b;--sapWarningBorderColor: #dd6100;--sapSuccessBorderColor: #30914c;--sapInformationBorderColor: #0070f2;--sapNeutralBorderColor: #788fa6;--sapElement_LineHeight: 2.75rem;--sapElement_Height: 2.25rem;--sapElement_BorderWidth: .0625rem;--sapElement_BorderCornerRadius: .75rem;--sapElement_Compact_LineHeight: 2rem;--sapElement_Compact_Height: 1.625rem;--sapElement_Condensed_LineHeight: 1.5rem;--sapElement_Condensed_Height: 1.375rem;--sapContent_LineHeight: 1.5;--sapContent_IconHeight: 1rem;--sapContent_IconColor: #1d2d3e;--sapContent_ContrastIconColor: #fff;--sapContent_NonInteractiveIconColor: #758ca4;--sapContent_MarkerIconColor: #5d36ff;--sapContent_MarkerTextColor: #046c7a;--sapContent_MeasureIndicatorColor: #556b81;--sapContent_Selected_MeasureIndicatorColor: #0064d9;--sapContent_Placeholderloading_Background: #ccc;--sapContent_Placeholderloading_Gradient: linear-gradient(to right, #ccc 0%, #ccc 20%, #999 50%, #ccc 80%, #ccc 100%);--sapContent_ImagePlaceholderBackground: #eaecee;--sapContent_ImagePlaceholderForegroundColor: #5b738b;--sapContent_RatedColor: #d27700;--sapContent_UnratedColor: #758ca4;--sapContent_BusyColor: #0064d9;--sapContent_FocusColor: #0032a5;--sapContent_FocusStyle: solid;--sapContent_FocusWidth: .125rem;--sapContent_ContrastFocusColor: #fff;--sapContent_ShadowColor: #223548;--sapContent_ContrastShadowColor: #fff;--sapContent_Shadow0: 0 0 .125rem 0 rgba(34,53,72,.2), 0 .125rem .25rem 0 rgba(34,53,72,.2);--sapContent_Shadow1: 0 0 0 .0625rem rgba(34,53,72,.48), 0 .125rem .5rem 0 rgba(34,53,72,.3);--sapContent_Shadow2: 0 0 0 .0625rem rgba(34,53,72,.48), 0 .625rem 1.875rem 0 rgba(34,53,72,.25);--sapContent_Shadow3: 0 0 0 .0625rem rgba(34,53,72,.48), 0 1.25rem 5rem 0 rgba(34,53,72,.25);--sapContent_TextShadow: 0 0 .125rem #fff;--sapContent_ContrastTextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapContent_HeaderShadow: 0 .125rem .125rem 0 rgba(34,53,72,.05), inset 0 -.0625rem 0 0 #d9d9d9;--sapContent_Interaction_Shadow: inset 0 0 0 .0625rem rgba(85,107,129,.25);--sapContent_Selected_Shadow: inset 0 0 0 .0625rem rgba(79,160,255,.5);--sapContent_Negative_Shadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapContent_Critical_Shadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapContent_Positive_Shadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapContent_Informative_Shadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapContent_Neutral_Shadow: inset 0 0 0 .0625rem rgba(120,143,166,.3);--sapContent_SearchHighlightColor: #dafdf5;--sapContent_HelpColor: #188918;--sapContent_LabelColor: #556b82;--sapContent_MonospaceFontFamily: "72Mono", "72Monofull", lucida console, monospace;--sapContent_MonospaceBoldFontFamily: "72Mono-Bold", "72Mono-Boldfull", lucida console, monospace;--sapContent_IconFontFamily: "SAP-icons";--sapContent_DisabledTextColor: rgba(29,45,62,.6);--sapContent_DisabledOpacity: .4;--sapContent_ContrastTextThreshold: .65;--sapContent_ContrastTextColor: #fff;--sapContent_ForegroundColor: #efefef;--sapContent_ForegroundBorderColor: #758ca4;--sapContent_ForegroundTextColor: #1d2d3e;--sapContent_BadgeBackground: #aa0808;--sapContent_BadgeTextColor: #fff;--sapContent_DragAndDropActiveColor: #0064d9;--sapContent_Selected_TextColor: #0064d9;--sapContent_Selected_Background: #fff;--sapContent_Selected_Hover_Background: #e3f0ff;--sapContent_Selected_ForegroundColor: #0064d9;--sapContent_ForcedColorAdjust: none;--sapContent_Illustrative_Color1: #5d36ff;--sapContent_Illustrative_Color2: #0070f2;--sapContent_Illustrative_Color3: #f58b00;--sapContent_Illustrative_Color4: #00144a;--sapContent_Illustrative_Color5: #a9b4be;--sapContent_Illustrative_Color6: #d5dadd;--sapContent_Illustrative_Color7: #ebf8ff;--sapContent_Illustrative_Color8: #fff;--sapContent_Illustrative_Color9: #64edd2;--sapContent_Illustrative_Color10: #ebf8ff;--sapContent_Illustrative_Color11: #f31ded;--sapContent_Illustrative_Color12: #00a800;--sapContent_Illustrative_Color13: #005dc9;--sapContent_Illustrative_Color14: #004da5;--sapContent_Illustrative_Color15: #cc7400;--sapContent_Illustrative_Color16: #3b0ac6;--sapContent_Illustrative_Color17: #00a58a;--sapContent_Illustrative_Color18: #d1efff;--sapContent_Illustrative_Color19: #b8e6ff;--sapContent_Illustrative_Color20: #9eddff;--sapFontLightFamily: "72-Light", "72-Lightfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontBoldFamily: "72-Bold", "72-Boldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSemiboldFamily: "72-Semibold", "72-Semiboldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSemiboldDuplexFamily: "72-SemiboldDuplex", "72-SemiboldDuplexfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontBlackFamily: "72Black", "72Blackfull","72", "72full", Arial, Helvetica, sans-serif;--sapFontHeaderFamily: "72-Bold", "72-Boldfull", "72", "72full", Arial, Helvetica, sans-serif;--sapFontSmallSize: .75rem;--sapFontLargeSize: 1rem;--sapFontHeader1Size: 3rem;--sapFontHeader2Size: 2rem;--sapFontHeader3Size: 1.5rem;--sapFontHeader4Size: 1.25rem;--sapFontHeader5Size: 1rem;--sapFontHeader6Size: .875rem;--sapLink_TextDecoration: none;--sapLink_Hover_Color: #0064d9;--sapLink_Hover_TextDecoration: underline;--sapLink_Active_Color: #0064d9;--sapLink_Active_TextDecoration: none;--sapLink_Visited_Color: #0064d9;--sapLink_InvertedColor: #a6cfff;--sapLink_SubtleColor: #1d2d3e;--sapShell_Background: #eff1f2;--sapShell_BackgroundImage: linear-gradient(to bottom, #eff1f2, #eff1f2);--sapShell_BackgroundImageOpacity: 1;--sapShell_BackgroundImageRepeat: false;--sapShell_BorderColor: #fff;--sapShell_TextColor: #1d2d3e;--sapShell_InteractiveBackground: #eff1f2;--sapShell_InteractiveTextColor: #1d2d3e;--sapShell_InteractiveBorderColor: #556b81;--sapShell_GroupTitleTextColor: #1d2d3e;--sapShell_GroupTitleTextShadow: 0 0 .125rem #fff;--sapShell_Hover_Background: #fff;--sapShell_Active_Background: #fff;--sapShell_Active_TextColor: #0070f2;--sapShell_Selected_Background: #fff;--sapShell_Selected_TextColor: #0070f2;--sapShell_Selected_Hover_Background: #fff;--sapShell_Favicon: none;--sapShell_Navigation_Background: #fff;--sapShell_Navigation_Hover_Background: #fff;--sapShell_Navigation_SelectedColor: #0064d9;--sapShell_Navigation_Selected_TextColor: #0064d9;--sapShell_Navigation_TextColor: #1d2d3e;--sapShell_Navigation_Active_TextColor: #0064d9;--sapShell_Navigation_Active_Background: #fff;--sapShell_Shadow: 0 .125rem .125rem 0 rgba(34,53,72,.15), inset 0 -.0625rem 0 0 rgba(34,53,72,.2);--sapShell_NegativeColor: #aa0808;--sapShell_CriticalColor: #b44f00;--sapShell_PositiveColor: #256f3a;--sapShell_InformativeColor: #0064d9;--sapShell_NeutralColor: #1d2d3e;--sapShell_Assistant_ForegroundColor: #5d36ff;--sapShell_Category_1_Background: #0057d2;--sapShell_Category_1_BorderColor: #0057d2;--sapShell_Category_1_TextColor: #fff;--sapShell_Category_1_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_2_Background: #df1278;--sapShell_Category_2_BorderColor: #df1278;--sapShell_Category_2_TextColor: #fff;--sapShell_Category_2_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_3_Background: #e76500;--sapShell_Category_3_BorderColor: #e76500;--sapShell_Category_3_TextColor: #fff;--sapShell_Category_3_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_4_Background: #7800a4;--sapShell_Category_4_BorderColor: #7800a4;--sapShell_Category_4_TextColor: #fff;--sapShell_Category_4_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_5_Background: #aa2608;--sapShell_Category_5_BorderColor: #aa2608;--sapShell_Category_5_TextColor: #fff;--sapShell_Category_5_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_6_Background: #07838f;--sapShell_Category_6_BorderColor: #07838f;--sapShell_Category_6_TextColor: #fff;--sapShell_Category_6_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_7_Background: #f31ded;--sapShell_Category_7_BorderColor: #f31ded;--sapShell_Category_7_TextColor: #fff;--sapShell_Category_7_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_8_Background: #188918;--sapShell_Category_8_BorderColor: #188918;--sapShell_Category_8_TextColor: #fff;--sapShell_Category_8_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_9_Background: #002a86;--sapShell_Category_9_BorderColor: #002a86;--sapShell_Category_9_TextColor: #fff;--sapShell_Category_9_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_10_Background: #5b738b;--sapShell_Category_10_BorderColor: #5b738b;--sapShell_Category_10_TextColor: #fff;--sapShell_Category_10_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_11_Background: #d20a0a;--sapShell_Category_11_BorderColor: #d20a0a;--sapShell_Category_11_TextColor: #fff;--sapShell_Category_11_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_12_Background: #7858ff;--sapShell_Category_12_BorderColor: #7858ff;--sapShell_Category_12_TextColor: #fff;--sapShell_Category_12_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_13_Background: #a00875;--sapShell_Category_13_BorderColor: #a00875;--sapShell_Category_13_TextColor: #fff;--sapShell_Category_13_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_14_Background: #14565b;--sapShell_Category_14_BorderColor: #14565b;--sapShell_Category_14_TextColor: #fff;--sapShell_Category_14_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_15_Background: #223548;--sapShell_Category_15_BorderColor: #223548;--sapShell_Category_15_TextColor: #fff;--sapShell_Category_15_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapShell_Category_16_Background: #1e592f;--sapShell_Category_16_BorderColor: #1e592f;--sapShell_Category_16_TextColor: #fff;--sapShell_Category_16_TextShadow: 0 0 .0625rem rgba(0,0,0,.7);--sapAssistant_Color1: #5d36ff;--sapAssistant_Color2: #a100c2;--sapAssistant_BackgroundGradient: linear-gradient(#5d36ff, #a100c2);--sapAssistant_Background: #5d36ff;--sapAssistant_BorderColor: #5d36ff;--sapAssistant_TextColor: #fff;--sapAssistant_Hover_Background: #2800cf;--sapAssistant_Hover_BorderColor: #2800cf;--sapAssistant_Hover_TextColor: #fff;--sapAssistant_Active_Background: #fff;--sapAssistant_Active_BorderColor: #5d36ff;--sapAssistant_Active_TextColor: #5d36ff;--sapAssistant_Question_Background: #eae5ff;--sapAssistant_Question_BorderColor: #eae5ff;--sapAssistant_Question_TextColor: #1d2d3e;--sapAssistant_Answer_Background: #eff1f2;--sapAssistant_Answer_BorderColor: #eff1f2;--sapAssistant_Answer_TextColor: #1d2d3e;--sapAvatar_1_Background: #fff3b8;--sapAvatar_1_BorderColor: #fff3b8;--sapAvatar_1_TextColor: #a45d00;--sapAvatar_2_Background: #ffd0e7;--sapAvatar_2_BorderColor: #ffd0e7;--sapAvatar_2_TextColor: #aa0808;--sapAvatar_3_Background: #ffdbe7;--sapAvatar_3_BorderColor: #ffdbe7;--sapAvatar_3_TextColor: #ba066c;--sapAvatar_4_Background: #ffdcf3;--sapAvatar_4_BorderColor: #ffdcf3;--sapAvatar_4_TextColor: #a100c2;--sapAvatar_5_Background: #ded3ff;--sapAvatar_5_BorderColor: #ded3ff;--sapAvatar_5_TextColor: #552cff;--sapAvatar_6_Background: #d1efff;--sapAvatar_6_BorderColor: #d1efff;--sapAvatar_6_TextColor: #0057d2;--sapAvatar_7_Background: #c2fcee;--sapAvatar_7_BorderColor: #c2fcee;--sapAvatar_7_TextColor: #046c7a;--sapAvatar_8_Background: #ebf5cb;--sapAvatar_8_BorderColor: #ebf5cb;--sapAvatar_8_TextColor: #256f3a;--sapAvatar_9_Background: #ddccf0;--sapAvatar_9_BorderColor: #ddccf0;--sapAvatar_9_TextColor: #6c32a9;--sapAvatar_10_Background: #eaecee;--sapAvatar_10_BorderColor: #eaecee;--sapAvatar_10_TextColor: #556b82;--sapButton_Background: #fff;--sapButton_BorderColor: #bcc3ca;--sapButton_BorderWidth: .0625rem;--sapButton_BorderCornerRadius: .5rem;--sapButton_TextColor: #0064d9;--sapButton_Hover_Background: #eaecee;--sapButton_Hover_BorderColor: #bcc3ca;--sapButton_Hover_TextColor: #0064d9;--sapButton_IconColor: #0064d9;--sapButton_Active_Background: #fff;--sapButton_Active_BorderColor: #0064d9;--sapButton_Active_TextColor: #0064d9;--sapButton_Emphasized_Background: #0070f2;--sapButton_Emphasized_BorderColor: #0070f2;--sapButton_Emphasized_TextColor: #fff;--sapButton_Emphasized_Hover_Background: #0064d9;--sapButton_Emphasized_Hover_BorderColor: #0064d9;--sapButton_Emphasized_Hover_TextColor: #fff;--sapButton_Emphasized_Active_Background: #fff;--sapButton_Emphasized_Active_BorderColor: #0064d9;--sapButton_Emphasized_Active_TextColor: #0064d9;--sapButton_Emphasized_TextShadow: transparent;--sapButton_Emphasized_FontWeight: bold;--sapButton_Reject_Background: #ffd6e9;--sapButton_Reject_BorderColor: #ffc2de;--sapButton_Reject_TextColor: #aa0808;--sapButton_Reject_Hover_Background: #ffbddb;--sapButton_Reject_Hover_BorderColor: #ffbddb;--sapButton_Reject_Hover_TextColor: #aa0808;--sapButton_Reject_Active_Background: #fff;--sapButton_Reject_Active_BorderColor: #e90b0b;--sapButton_Reject_Active_TextColor: #aa0808;--sapButton_Reject_Selected_Background: #fff;--sapButton_Reject_Selected_BorderColor: #e90b0b;--sapButton_Reject_Selected_TextColor: #aa0808;--sapButton_Reject_Selected_Hover_Background: #ffbddb;--sapButton_Reject_Selected_Hover_BorderColor: #e90b0b;--sapButton_Accept_Background: #ebf5cb;--sapButton_Accept_BorderColor: #dbeda0;--sapButton_Accept_TextColor: #256f3a;--sapButton_Accept_Hover_Background: #e3f1b6;--sapButton_Accept_Hover_BorderColor: #e3f1b6;--sapButton_Accept_Hover_TextColor: #256f3a;--sapButton_Accept_Active_Background: #fff;--sapButton_Accept_Active_BorderColor: #30914c;--sapButton_Accept_Active_TextColor: #256f3a;--sapButton_Accept_Selected_Background: #fff;--sapButton_Accept_Selected_BorderColor: #30914c;--sapButton_Accept_Selected_TextColor: #256f3a;--sapButton_Accept_Selected_Hover_Background: #e3f1b6;--sapButton_Accept_Selected_Hover_BorderColor: #30914c;--sapButton_Lite_Background: transparent;--sapButton_Lite_BorderColor: transparent;--sapButton_Lite_TextColor: #0064d9;--sapButton_Lite_Hover_Background: #eaecee;--sapButton_Lite_Hover_BorderColor: #bcc3ca;--sapButton_Lite_Hover_TextColor: #0064d9;--sapButton_Lite_Active_Background: #fff;--sapButton_Lite_Active_BorderColor: #0064d9;--sapButton_Selected_Background: #edf6ff;--sapButton_Selected_BorderColor: #0064d9;--sapButton_Selected_TextColor: #0064d9;--sapButton_Selected_Hover_Background: #d9ecff;--sapButton_Selected_Hover_BorderColor: #0064d9;--sapButton_Attention_Background: #fff3b7;--sapButton_Attention_BorderColor: #ffeb84;--sapButton_Attention_TextColor: #b44f00;--sapButton_Attention_Hover_Background: #ffef9e;--sapButton_Attention_Hover_BorderColor: #ffef9e;--sapButton_Attention_Hover_TextColor: #b44f00;--sapButton_Attention_Active_Background: #fff;--sapButton_Attention_Active_BorderColor: #dd6100;--sapButton_Attention_Active_TextColor: #b44f00;--sapButton_Attention_Selected_Background: #fff;--sapButton_Attention_Selected_BorderColor: #dd6100;--sapButton_Attention_Selected_TextColor: #b44f00;--sapButton_Attention_Selected_Hover_Background: #ffef9e;--sapButton_Attention_Selected_Hover_BorderColor: #dd6100;--sapButton_Negative_Background: #f53232;--sapButton_Negative_BorderColor: #f53232;--sapButton_Negative_TextColor: #fff;--sapButton_Negative_Hover_Background: #e90b0b;--sapButton_Negative_Hover_BorderColor: #e90b0b;--sapButton_Negative_Hover_TextColor: #fff;--sapButton_Negative_Active_Background: #fff;--sapButton_Negative_Active_BorderColor: #f53232;--sapButton_Negative_Active_TextColor: #aa0808;--sapButton_Critical_Background: #e76500;--sapButton_Critical_BorderColor: #e76500;--sapButton_Critical_TextColor: #fff;--sapButton_Critical_Hover_Background: #dd6100;--sapButton_Critical_Hover_BorderColor: #dd6100;--sapButton_Critical_Hover_TextColor: #fff;--sapButton_Critical_Active_Background: #fff;--sapButton_Critical_Active_BorderColor: #dd6100;--sapButton_Critical_Active_TextColor: #b44f00;--sapButton_Success_Background: #30914c;--sapButton_Success_BorderColor: #30914c;--sapButton_Success_TextColor: #fff;--sapButton_Success_Hover_Background: #2c8646;--sapButton_Success_Hover_BorderColor: #2c8646;--sapButton_Success_Hover_TextColor: #fff;--sapButton_Success_Active_Background: #fff;--sapButton_Success_Active_BorderColor: #30914c;--sapButton_Success_Active_TextColor: #256f3a;--sapButton_Information_Background: #e8f3ff;--sapButton_Information_BorderColor: #b5d8ff;--sapButton_Information_TextColor: #0064d9;--sapButton_Information_Hover_Background: #d4e8ff;--sapButton_Information_Hover_BorderColor: #b5d8ff;--sapButton_Information_Hover_TextColor: #0064d9;--sapButton_Information_Active_Background: #fff;--sapButton_Information_Active_BorderColor: #0064d9;--sapButton_Information_Active_TextColor: #0064d9;--sapButton_Neutral_Background: #e8f3ff;--sapButton_Neutral_BorderColor: #b5d8ff;--sapButton_Neutral_TextColor: #0064d9;--sapButton_Neutral_Hover_Background: #d4e8ff;--sapButton_Neutral_Hover_BorderColor: #b5d8ff;--sapButton_Neutral_Hover_TextColor: #0064d9;--sapButton_Neutral_Active_Background: #fff;--sapButton_Neutral_Active_BorderColor: #0064d9;--sapButton_Neutral_Active_TextColor: #0064d9;--sapButton_Track_Background: #788fa6;--sapButton_Track_BorderColor: #788fa6;--sapButton_Track_TextColor: #fff;--sapButton_Track_Hover_Background: #637d97;--sapButton_Track_Hover_BorderColor: #637d97;--sapButton_Track_Selected_Background: #0064d9;--sapButton_Track_Selected_BorderColor: #0064d9;--sapButton_Track_Selected_TextColor: #fff;--sapButton_Track_Selected_Hover_Background: #0058c0;--sapButton_Track_Selected_Hover_BorderColor: #0058c0;--sapButton_Handle_Background: #fff;--sapButton_Handle_BorderColor: #fff;--sapButton_Handle_TextColor: #1d2d3e;--sapButton_Handle_Hover_Background: #fff;--sapButton_Handle_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_Handle_Selected_Background: #edf6ff;--sapButton_Handle_Selected_BorderColor: #edf6ff;--sapButton_Handle_Selected_TextColor: #0064d9;--sapButton_Handle_Selected_Hover_Background: #edf6ff;--sapButton_Handle_Selected_Hover_BorderColor: rgba(237,246,255,.5);--sapButton_Track_Negative_Background: #f53232;--sapButton_Track_Negative_BorderColor: #f53232;--sapButton_Track_Negative_TextColor: #fff;--sapButton_Track_Negative_Hover_Background: #e90b0b;--sapButton_Track_Negative_Hover_BorderColor: #e90b0b;--sapButton_Handle_Negative_Background: #fff;--sapButton_Handle_Negative_BorderColor: #fff;--sapButton_Handle_Negative_TextColor: #aa0808;--sapButton_Handle_Negative_Hover_Background: #fff;--sapButton_Handle_Negative_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_Track_Positive_Background: #30914c;--sapButton_Track_Positive_BorderColor: #30914c;--sapButton_Track_Positive_TextColor: #fff;--sapButton_Track_Positive_Hover_Background: #2c8646;--sapButton_Track_Positive_Hover_BorderColor: #2c8646;--sapButton_Handle_Positive_Background: #fff;--sapButton_Handle_Positive_BorderColor: #fff;--sapButton_Handle_Positive_TextColor: #256f3a;--sapButton_Handle_Positive_Hover_Background: #fff;--sapButton_Handle_Positive_Hover_BorderColor: rgba(255,255,255,.5);--sapButton_TokenBackground: #fff;--sapButton_TokenBorderColor: #bcc3ca;--sapField_Background: #fff;--sapField_BackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #556b81, #556b81) border-box;--sapField_TextColor: #131e29;--sapField_PlaceholderTextColor: #556b82;--sapField_BorderColor: #556b81;--sapField_HelpBackground: #fff;--sapField_BorderWidth: .0625rem;--sapField_BorderStyle: none;--sapField_BorderCornerRadius: .25rem;--sapField_Shadow: inset 0 0 0 .0625rem rgba(85,107,129,.25);--sapField_Hover_Background: #fff;--sapField_Hover_BackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #0064d9, #0064d9) border-box;--sapField_Hover_BorderColor: #0064d9;--sapField_Hover_HelpBackground: #fff;--sapField_Hover_Shadow: inset 0 0 0 .0625rem rgba(79,160,255,.5);--sapField_Hover_InvalidShadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapField_Hover_WarningShadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapField_Hover_SuccessShadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapField_Hover_InformationShadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapField_Active_BorderColor: #0064d9;--sapField_Focus_Background: #fff;--sapField_Focus_BorderColor: #0032a5;--sapField_Focus_HelpBackground: #fff;--sapField_ReadOnly_Background: #eaecee;--sapField_ReadOnly_BackgroundStyle: 0 100% / .375rem .0625rem repeat-x linear-gradient(90deg, #556b81 0, #556b81 .25rem, transparent .25rem) border-box;--sapField_ReadOnly_BorderColor: #556b81;--sapField_ReadOnly_BorderStyle: none;--sapField_ReadOnly_HelpBackground: #eaecee;--sapField_RequiredColor: #ba066c;--sapField_InvalidColor: #e90b0b;--sapField_InvalidBackground: #ffeaf4;--sapField_InvalidBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #e90b0b, #e90b0b) border-box;--sapField_InvalidBorderWidth: .125rem;--sapField_InvalidBorderStyle: none;--sapField_InvalidShadow: inset 0 0 0 .0625rem rgba(255,142,196,.45);--sapField_WarningColor: #dd6100;--sapField_WarningBackground: #fff8d6;--sapField_WarningBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #dd6100, #dd6100) border-box;--sapField_WarningBorderWidth: .125rem;--sapField_WarningBorderStyle: none;--sapField_WarningShadow: inset 0 0 0 .0625rem rgba(255,213,10,.4);--sapField_SuccessColor: #30914c;--sapField_SuccessBackground: #f5fae5;--sapField_SuccessBackgroundStyle: 0 100% / 100% .0625rem no-repeat linear-gradient(0deg, #30914c, #30914c) border-box;--sapField_SuccessBorderWidth: .0625rem;--sapField_SuccessBorderStyle: none;--sapField_SuccessShadow: inset 0 0 0 .0625rem rgba(48,145,76,.18);--sapField_InformationColor: #0070f2;--sapField_InformationBackground: #e1f4ff;--sapField_InformationBackgroundStyle: 0 100% / 100% .125rem no-repeat linear-gradient(0deg, #0070f2, #0070f2) border-box;--sapField_InformationBorderWidth: .125rem;--sapField_InformationBorderStyle: none;--sapField_InformationShadow: inset 0 0 0 .0625rem rgba(104,174,255,.5);--sapGroup_TitleBackground: #fff;--sapGroup_TitleBorderColor: #a8b2bd;--sapGroup_TitleTextColor: #1d2d3e;--sapGroup_Title_FontSize: 1rem;--sapGroup_ContentBackground: #fff;--sapGroup_ContentBorderColor: #d9d9d9;--sapGroup_BorderWidth: .0625rem;--sapGroup_BorderCornerRadius: .5rem;--sapGroup_FooterBackground: transparent;--sapToolbar_Background: #fff;--sapToolbar_SeparatorColor: #d9d9d9;--sapList_HeaderBackground: #fff;--sapList_HeaderBorderColor: #a8b2bd;--sapList_HeaderTextColor: #1d2d3e;--sapList_BorderColor: #e5e5e5;--sapList_BorderWidth: .0625rem;--sapList_TextColor: #1d2d3e;--sapList_Active_TextColor: #1d2d3e;--sapList_Active_Background: #dee2e5;--sapList_SelectionBackgroundColor: #ebf8ff;--sapList_SelectionBorderColor: #0064d9;--sapList_Hover_SelectionBackground: #dcf3ff;--sapList_Background: #fff;--sapList_Hover_Background: #eaecee;--sapList_AlternatingBackground: #f5f6f7;--sapList_GroupHeaderBackground: #fff;--sapList_GroupHeaderBorderColor: #a8b2bd;--sapList_GroupHeaderTextColor: #1d2d3e;--sapList_TableGroupHeaderBackground: #eff1f2;--sapList_TableGroupHeaderBorderColor: #a8b2bd;--sapList_TableGroupHeaderTextColor: #1d2d3e;--sapList_FooterBackground: #fff;--sapList_FooterTextColor: #1d2d3e;--sapList_TableFooterBorder: #a8b2bd;--sapList_TableFixedBorderColor: #8c8c8c;--sapMessage_ErrorBorderColor: #ff8ec4;--sapMessage_WarningBorderColor: #ffe770;--sapMessage_SuccessBorderColor: #cee67e;--sapMessage_InformationBorderColor: #7bcfff;--sapPopover_BorderCornerRadius: .5rem;--sapProgress_Background: #d5dadd;--sapProgress_BorderColor: #d5dadd;--sapProgress_TextColor: #1d2d3e;--sapProgress_FontSize: .875rem;--sapProgress_NegativeBackground: #ffdbec;--sapProgress_NegativeBorderColor: #ffdbec;--sapProgress_NegativeTextColor: #1d2d3e;--sapProgress_CriticalBackground: #fff4bd;--sapProgress_CriticalBorderColor: #fff4bd;--sapProgress_CriticalTextColor: #1d2d3e;--sapProgress_PositiveBackground: #e5f2ba;--sapProgress_PositiveBorderColor: #e5f2ba;--sapProgress_PositiveTextColor: #1d2d3e;--sapProgress_InformationBackground: #cdedff;--sapProgress_InformationBorderColor: #cdedff;--sapProgress_InformationTextColor: #1d2d3e;--sapProgress_Value_Background: #617b94;--sapProgress_Value_BorderColor: #617b94;--sapProgress_Value_TextColor: #788fa6;--sapProgress_Value_NegativeBackground: #f53232;--sapProgress_Value_NegativeBorderColor: #f53232;--sapProgress_Value_NegativeTextColor: #f53232;--sapProgress_Value_CriticalBackground: #e76500;--sapProgress_Value_CriticalBorderColor: #e76500;--sapProgress_Value_CriticalTextColor: #e76500;--sapProgress_Value_PositiveBackground: #30914c;--sapProgress_Value_PositiveBorderColor: #30914c;--sapProgress_Value_PositiveTextColor: #30914c;--sapProgress_Value_InformationBackground: #0070f2;--sapProgress_Value_InformationBorderColor: #0070f2;--sapProgress_Value_InformationTextColor: #0070f2;--sapScrollBar_FaceColor: #7b91a8;--sapScrollBar_TrackColor: #fff;--sapScrollBar_BorderColor: #7b91a8;--sapScrollBar_SymbolColor: #0064d9;--sapScrollBar_Dimension: .75rem;--sapScrollBar_Hover_FaceColor: #5b728b;--sapSlider_Background: #d5dadd;--sapSlider_BorderColor: #d5dadd;--sapSlider_Selected_Background: #0064d9;--sapSlider_Selected_BorderColor: #0064d9;--sapSlider_HandleBackground: #fff;--sapSlider_HandleBorderColor: #b0d5ff;--sapSlider_RangeHandleBackground: #fff;--sapSlider_Hover_HandleBackground: #d9ecff;--sapSlider_Hover_HandleBorderColor: #b0d5ff;--sapSlider_Hover_RangeHandleBackground: #d9ecff;--sapSlider_Active_HandleBackground: #fff;--sapSlider_Active_HandleBorderColor: #0064d9;--sapSlider_Active_RangeHandleBackground: transparent;--sapPageHeader_Background: #fff;--sapPageHeader_BorderColor: #d9d9d9;--sapPageHeader_TextColor: #1d2d3e;--sapPageFooter_Background: #fff;--sapPageFooter_BorderColor: #d9d9d9;--sapPageFooter_TextColor: #1d2d3e;--sapInfobar_Background: #c2fcee;--sapInfobar_Hover_Background: #fff;--sapInfobar_Active_Background: #fff;--sapInfobar_NonInteractive_Background: #f5f6f7;--sapInfobar_TextColor: #046c7a;--sapObjectHeader_Background: #fff;--sapObjectHeader_Hover_Background: #eaecee;--sapObjectHeader_BorderColor: #d9d9d9;--sapObjectHeader_Title_TextColor: #1d2d3e;--sapObjectHeader_Title_FontSize: 1.5rem;--sapObjectHeader_Title_SnappedFontSize: 1.25rem;--sapObjectHeader_Title_FontFamily: "72Black", "72Blackfull","72", "72full", Arial, Helvetica, sans-serif;--sapObjectHeader_Subtitle_TextColor: #556b82;--sapBlockLayer_Background: #000;--sapTile_Background: #fff;--sapTile_Hover_Background: #eaecee;--sapTile_Active_Background: #dee2e5;--sapTile_BorderColor: transparent;--sapTile_BorderCornerRadius: 1rem;--sapTile_TitleTextColor: #1d2d3e;--sapTile_TextColor: #556b82;--sapTile_IconColor: #556b82;--sapTile_SeparatorColor: #ccc;--sapTile_Interactive_BorderColor: #b3b3b3;--sapTile_OverlayBackground: #fff;--sapTile_OverlayForegroundColor: #1d2d3e;--sapAccentColor1: #d27700;--sapAccentColor2: #aa0808;--sapAccentColor3: #ba066c;--sapAccentColor4: #a100c2;--sapAccentColor5: #5d36ff;--sapAccentColor6: #0057d2;--sapAccentColor7: #046c7a;--sapAccentColor8: #256f3a;--sapAccentColor9: #6c32a9;--sapAccentColor10: #5b738b;--sapAccentBackgroundColor1: #fff3b8;--sapAccentBackgroundColor2: #ffd0e7;--sapAccentBackgroundColor3: #ffdbe7;--sapAccentBackgroundColor4: #ffdcf3;--sapAccentBackgroundColor5: #ded3ff;--sapAccentBackgroundColor6: #d1efff;--sapAccentBackgroundColor7: #c2fcee;--sapAccentBackgroundColor8: #ebf5cb;--sapAccentBackgroundColor9: #ddccf0;--sapAccentBackgroundColor10: #eaecee;--sapIndicationColor_1: #840606;--sapIndicationColor_1_Background: #840606;--sapIndicationColor_1_BorderColor: #840606;--sapIndicationColor_1_TextColor: #fff;--sapIndicationColor_1_Hover_Background: #6c0505;--sapIndicationColor_1_Active_Background: #fff;--sapIndicationColor_1_Active_BorderColor: #fb9d9d;--sapIndicationColor_1_Active_TextColor: #840606;--sapIndicationColor_1_Selected_Background: #fff;--sapIndicationColor_1_Selected_BorderColor: #fb9d9d;--sapIndicationColor_1_Selected_TextColor: #840606;--sapIndicationColor_1b: #fb9d9d;--sapIndicationColor_1b_BorderColor: #fb9d9d;--sapIndicationColor_1b_Hover_Background: #fa8585;--sapIndicationColor_2: #aa0808;--sapIndicationColor_2_Background: #aa0808;--sapIndicationColor_2_BorderColor: #aa0808;--sapIndicationColor_2_TextColor: #fff;--sapIndicationColor_2_Hover_Background: #920707;--sapIndicationColor_2_Active_Background: #fff;--sapIndicationColor_2_Active_BorderColor: #fcc4c4;--sapIndicationColor_2_Active_TextColor: #aa0808;--sapIndicationColor_2_Selected_Background: #fff;--sapIndicationColor_2_Selected_BorderColor: #fcc4c4;--sapIndicationColor_2_Selected_TextColor: #aa0808;--sapIndicationColor_2b: #fcc4c4;--sapIndicationColor_2b_BorderColor: #fcc4c4;--sapIndicationColor_2b_Hover_Background: #fbacac;--sapIndicationColor_3: #b95100;--sapIndicationColor_3_Background: #e76500;--sapIndicationColor_3_BorderColor: #e76500;--sapIndicationColor_3_TextColor: #fff;--sapIndicationColor_3_Hover_Background: #d85e00;--sapIndicationColor_3_Active_Background: #fff;--sapIndicationColor_3_Active_BorderColor: #fff2c0;--sapIndicationColor_3_Active_TextColor: #b95100;--sapIndicationColor_3_Selected_Background: #fff;--sapIndicationColor_3_Selected_BorderColor: #fff2c0;--sapIndicationColor_3_Selected_TextColor: #b95100;--sapIndicationColor_3b: #fff2c0;--sapIndicationColor_3b_BorderColor: #fff2c0;--sapIndicationColor_3b_Hover_Background: #ffeda6;--sapIndicationColor_4: #256f3a;--sapIndicationColor_4_Background: #256f3a;--sapIndicationColor_4_BorderColor: #256f3a;--sapIndicationColor_4_TextColor: #fff;--sapIndicationColor_4_Hover_Background: #1f5c30;--sapIndicationColor_4_Active_Background: #fff;--sapIndicationColor_4_Active_BorderColor: #bae8bc;--sapIndicationColor_4_Active_TextColor: #256f3a;--sapIndicationColor_4_Selected_Background: #fff;--sapIndicationColor_4_Selected_BorderColor: #bae8bc;--sapIndicationColor_4_Selected_TextColor: #256f3a;--sapIndicationColor_4b: #bae8bc;--sapIndicationColor_4b_BorderColor: #bae8bc;--sapIndicationColor_4b_Hover_Background: #a7e2a9;--sapIndicationColor_5: #0070f2;--sapIndicationColor_5_Background: #0070f2;--sapIndicationColor_5_BorderColor: #0070f2;--sapIndicationColor_5_TextColor: #fff;--sapIndicationColor_5_Hover_Background: #0064d9;--sapIndicationColor_5_Active_Background: #fff;--sapIndicationColor_5_Active_BorderColor: #d3effd;--sapIndicationColor_5_Active_TextColor: #0070f2;--sapIndicationColor_5_Selected_Background: #fff;--sapIndicationColor_5_Selected_BorderColor: #d3effd;--sapIndicationColor_5_Selected_TextColor: #0070f2;--sapIndicationColor_5b: #d3effd;--sapIndicationColor_5b_BorderColor: #d3effd;--sapIndicationColor_5b_Hover_Background: #bbe6fc;--sapIndicationColor_6: #046c7a;--sapIndicationColor_6_Background: #046c7a;--sapIndicationColor_6_BorderColor: #046c7a;--sapIndicationColor_6_TextColor: #fff;--sapIndicationColor_6_Hover_Background: #035661;--sapIndicationColor_6_Active_Background: #fff;--sapIndicationColor_6_Active_BorderColor: #cdf5ec;--sapIndicationColor_6_Active_TextColor: #046c7a;--sapIndicationColor_6_Selected_Background: #fff;--sapIndicationColor_6_Selected_BorderColor: #cdf5ec;--sapIndicationColor_6_Selected_TextColor: #046c7a;--sapIndicationColor_6b: #cdf5ec;--sapIndicationColor_6b_BorderColor: #cdf5ec;--sapIndicationColor_6b_Hover_Background: #b8f1e4;--sapIndicationColor_7: #5d36ff;--sapIndicationColor_7_Background: #5d36ff;--sapIndicationColor_7_BorderColor: #5d36ff;--sapIndicationColor_7_TextColor: #fff;--sapIndicationColor_7_Hover_Background: #481cff;--sapIndicationColor_7_Active_Background: #fff;--sapIndicationColor_7_Active_BorderColor: #e2dbff;--sapIndicationColor_7_Active_TextColor: #5d36ff;--sapIndicationColor_7_Selected_Background: #fff;--sapIndicationColor_7_Selected_BorderColor: #e2dbff;--sapIndicationColor_7_Selected_TextColor: #5d36ff;--sapIndicationColor_7b: #e2dbff;--sapIndicationColor_7b_BorderColor: #e2dbff;--sapIndicationColor_7b_Hover_Background: #cdc2ff;--sapIndicationColor_8: #a100c2;--sapIndicationColor_8_Background: #a100c2;--sapIndicationColor_8_BorderColor: #a100c2;--sapIndicationColor_8_TextColor: #fff;--sapIndicationColor_8_Hover_Background: #8c00a9;--sapIndicationColor_8_Active_Background: #fff;--sapIndicationColor_8_Active_BorderColor: #f8d6ff;--sapIndicationColor_8_Active_TextColor: #a100c2;--sapIndicationColor_8_Selected_Background: #fff;--sapIndicationColor_8_Selected_BorderColor: #f8d6ff;--sapIndicationColor_8_Selected_TextColor: #a100c2;--sapIndicationColor_8b: #f8d6ff;--sapIndicationColor_8b_BorderColor: #f8d6ff;--sapIndicationColor_8b_Hover_Background: #f4bdff;--sapIndicationColor_9: #1d2d3e;--sapIndicationColor_9_Background: #1d2d3e;--sapIndicationColor_9_BorderColor: #1d2d3e;--sapIndicationColor_9_TextColor: #fff;--sapIndicationColor_9_Hover_Background: #15202d;--sapIndicationColor_9_Active_Background: #fff;--sapIndicationColor_9_Active_BorderColor: #d9d9d9;--sapIndicationColor_9_Active_TextColor: #1d2d3e;--sapIndicationColor_9_Selected_Background: #fff;--sapIndicationColor_9_Selected_BorderColor: #d9d9d9;--sapIndicationColor_9_Selected_TextColor: #1d2d3e;--sapIndicationColor_9b: #fff;--sapIndicationColor_9b_BorderColor: #d9d9d9;--sapIndicationColor_9b_Hover_Background: #f2f2f2;--sapIndicationColor_10: #45484a;--sapIndicationColor_10_Background: #83888b;--sapIndicationColor_10_BorderColor: #83888b;--sapIndicationColor_10_TextColor: #fff;--sapIndicationColor_10_Hover_Background: #767b7e;--sapIndicationColor_10_Active_Background: #fff;--sapIndicationColor_10_Active_BorderColor: #eaecee;--sapIndicationColor_10_Active_TextColor: #45484a;--sapIndicationColor_10_Selected_Background: #fff;--sapIndicationColor_10_Selected_BorderColor: #eaecee;--sapIndicationColor_10_Selected_TextColor: #45484a;--sapIndicationColor_10b: #eaecee;--sapIndicationColor_10b_BorderColor: #eaecee;--sapIndicationColor_10b_Hover_Background: #dcdfe3;--sapLegend_WorkingBackground: #fff;--sapLegend_NonWorkingBackground: #ebebeb;--sapLegend_CurrentDateTime: #a100c2;--sapLegendColor1: #c35500;--sapLegendColor2: #d23a0a;--sapLegendColor3: #df1278;--sapLegendColor4: #840606;--sapLegendColor5: #cc00dc;--sapLegendColor6: #0057d2;--sapLegendColor7: #07838f;--sapLegendColor8: #188918;--sapLegendColor9: #5b738b;--sapLegendColor10: #7800a4;--sapLegendColor11: #a93e00;--sapLegendColor12: #aa2608;--sapLegendColor13: #ba066c;--sapLegendColor14: #8d2a00;--sapLegendColor15: #4e247a;--sapLegendColor16: #002a86;--sapLegendColor17: #035663;--sapLegendColor18: #1e592f;--sapLegendColor19: #1a4796;--sapLegendColor20: #470ced;--sapLegendBackgroundColor1: #ffef9f;--sapLegendBackgroundColor2: #feeae1;--sapLegendBackgroundColor3: #fbf6f8;--sapLegendBackgroundColor4: #fbebeb;--sapLegendBackgroundColor5: #ffe5fe;--sapLegendBackgroundColor6: #d1efff;--sapLegendBackgroundColor7: #c2fcee;--sapLegendBackgroundColor8: #f5fae5;--sapLegendBackgroundColor9: #f5f6f7;--sapLegendBackgroundColor10: #fff0fa;--sapLegendBackgroundColor11: #fff8d6;--sapLegendBackgroundColor12: #fff6f6;--sapLegendBackgroundColor13: #f7ebef;--sapLegendBackgroundColor14: #f1ecd5;--sapLegendBackgroundColor15: #f0e7f8;--sapLegendBackgroundColor16: #ebf8ff;--sapLegendBackgroundColor17: #dafdf5;--sapLegendBackgroundColor18: #ebf5cb;--sapLegendBackgroundColor19: #fafdff;--sapLegendBackgroundColor20: #eceeff;--sapChart_OrderedColor_1: #0070f2;--sapChart_OrderedColor_2: #c87b00;--sapChart_OrderedColor_3: #75980b;--sapChart_OrderedColor_4: #df1278;--sapChart_OrderedColor_5: #8b47d7;--sapChart_OrderedColor_6: #049f9a;--sapChart_OrderedColor_7: #3c8cdd;--sapChart_OrderedColor_8: #cc00dc;--sapChart_OrderedColor_9: #798c77;--sapChart_OrderedColor_10: #da6c6c;--sapChart_OrderedColor_11: #5d36ff;--sapChart_Bad: #f53232;--sapChart_Critical: #e76500;--sapChart_Good: #30914c;--sapChart_Neutral: #788fa6;--sapChart_Sequence_1: #0070f2;--sapChart_Sequence_2: #c87b00;--sapChart_Sequence_3: #75980b;--sapChart_Sequence_4: #df1278;--sapChart_Sequence_5: #8b47d7;--sapChart_Sequence_6: #049f9a;--sapChart_Sequence_7: #3c8cdd;--sapChart_Sequence_8: #cc00dc;--sapChart_Sequence_9: #798c77;--sapChart_Sequence_10: #da6c6c;--sapChart_Sequence_11: #5d36ff;--sapChart_Sequence_Neutral: #788fa6;}
` }, ya = { packageName: "@udex/web-components", fileName: "themes/sap_horizon/parameters-bundle.css.ts", content: "" };
export {
  Re as A,
  le as B,
  Ba as C,
  ia as D,
  w as E,
  Qe as F,
  L as T,
  pe as U,
  ya as a,
  ha as b,
  pa as c,
  va as d,
  Y as e,
  Sa as f,
  ht as g,
  sa as h,
  io as i,
  S as j,
  W as k,
  ma as l,
  lo as m,
  tt as n,
  _a as o,
  ua as p,
  At as q,
  fa as r,
  ba as s,
  ga as t,
  Ca as u,
  ra as v,
  oa as w,
  ca as x,
  da as y,
  la as z
};
