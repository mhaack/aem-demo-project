import { e as r, l as o, h as b, s as l, r as p, i as y, a as x, b as T, k as L, p as _, d as w, j as E, U as O, m as M, n as S, o as z, q as P, t as V, f as B, u as F, v as j, w as G, g as q, I as R, c as U } from "./parameters-bundle.css-umy6yUJ9.js";
const H = (e) => {
  const i = e;
  return i.accessibleNameRef ? X(e) : i.accessibleName ? i.accessibleName : void 0;
}, X = (e) => {
  var n;
  const i = ((n = e.accessibleNameRef) == null ? void 0 : n.split(" ")) ?? [], t = e.getRootNode();
  let a = "";
  return i.forEach((d, c) => {
    const s = t.querySelector(`[id='${d}']`), g = `${s && s.textContent ? s.textContent : ""}`;
    g && (a += g, c < i.length - 1 && (a += " "));
  }), a;
};
class I {
  /**
   * Checks if the value is valid for its data type.
   * @public
   */
  // eslint-disable-next-line
  static isValid(i) {
    return !1;
  }
  static attributeToProperty(i) {
    return i;
  }
  static propertyToAttribute(i) {
    return i === null ? null : String(i);
  }
  static valuesAreEqual(i, t) {
    return i === t;
  }
  static generateTypeAccessors(i) {
    Object.keys(i).forEach((t) => {
      Object.defineProperty(this, t, {
        get() {
          return i[t];
        }
      });
    });
  }
  static get isDataTypeClass() {
    return !0;
  }
}
class W extends I {
  static isValid(i) {
    return Number.isInteger(i);
  }
  static attributeToProperty(i) {
    return parseInt(i);
  }
}
class Q extends I {
  static isValid(i) {
    return Number(i) === i;
  }
  static attributeToProperty(i) {
    return parseFloat(i);
  }
}
const J = { key: "RATING_INDICATOR_TOOLTIP_TEXT", defaultText: "Rating" }, K = { key: "RATING_INDICATOR_TEXT", defaultText: "Rating Indicator" }, Y = { key: "RATING_INDICATOR_ARIA_DESCRIPTION", defaultText: "Required" };
function Z(e, i, t) {
  return r`<div class="ui5-rating-indicator-root" role="slider" aria-roledescription="${o(this._ariaRoleDescription)}" aria-valuemin="0" aria-valuenow="${o(this.value)}" aria-valuemax="${o(this.max)}" aria-valuetext="${o(this.value)} of ${o(this.max)}" aria-orientation="horizontal" aria-disabled="${o(this._ariaDisabled)}" aria-readonly="${o(this.ariaReadonly)}" aria-description="${o(this._ariaDescription)}" tabindex="${o(this.effectiveTabIndex)}" @focusin="${this._onfocusin}" @focusout="${this._onfocusout}" @click="${this._onclick}" @keydown="${this._onkeydown}" title="${o(this.ratingTooltip)}" aria-label="${o(this._ariaLabel)}"><ul class="ui5-rating-indicator-list" aria-hidden="true">${b(this._stars, (a, n) => a._id || n, (a, n) => ii.call(this, e, i, t, a, n))}</ul></div>`;
}
function ii(e, i, t, a, n) {
  return r`${a.selected ? ti.call(this, e, i, t, a, n) : ai.call(this, e, i, t, a, n)}`;
}
function ti(e, i, t, a, n) {
  return t ? r`<li data-ui5-value="${o(a.index)}" class="ui5-rating-indicator-item ui5-rating-indicator-item-sel"><${l("ui5-icon", i, t)} data-ui5-value="${o(a.index)}" name="favorite"></${l("ui5-icon", i, t)}></li>` : r`<li data-ui5-value="${o(a.index)}" class="ui5-rating-indicator-item ui5-rating-indicator-item-sel"><ui5-icon data-ui5-value="${o(a.index)}" name="favorite"></ui5-icon></li>`;
}
function ai(e, i, t, a, n) {
  return r`${a.halfStar ? ei.call(this, e, i, t, a, n) : ni.call(this, e, i, t, a, n)}`;
}
function ei(e, i, t, a, n) {
  return t ? r`<li class="ui5-rating-indicator-item ui5-rating-indicator-item-half"><${l("ui5-icon", i, t)} data-ui5-value="${o(a.index)}" name="unfavorite"></${l("ui5-icon", i, t)}><div class="ui5-rating-indicator-half-icon-wrapper"><${l("ui5-icon", i, t)} data-ui5-value="${o(a.index)}" name="favorite" class="ui5-rating-indicator-half-icon"></${l("ui5-icon", i, t)}></div></li>` : r`<li class="ui5-rating-indicator-item ui5-rating-indicator-item-half"><ui5-icon data-ui5-value="${o(a.index)}" name="unfavorite"></ui5-icon><div class="ui5-rating-indicator-half-icon-wrapper"><ui5-icon data-ui5-value="${o(a.index)}" name="favorite" class="ui5-rating-indicator-half-icon"></ui5-icon></div></li>`;
}
function ni(e, i, t, a, n) {
  return r`${this.readonly ? oi.call(this, e, i, t, a, n) : ri.call(this, e, i, t, a, n)}`;
}
function oi(e, i, t, a, n) {
  return t ? r`<li class="ui5-rating-indicator-item ui5-rating-indicator-item-unsel"><${l("ui5-icon", i, t)} data-ui5-value="${o(a.index)}" name="favorite"></${l("ui5-icon", i, t)}></li>` : r`<li class="ui5-rating-indicator-item ui5-rating-indicator-item-unsel"><ui5-icon data-ui5-value="${o(a.index)}" name="favorite"></ui5-icon></li>`;
}
function ri(e, i, t, a, n) {
  return r`${this.disabled ? li.call(this, e, i, t, a, n) : di.call(this, e, i, t, a, n)}`;
}
function li(e, i, t, a, n) {
  return t ? r`<li class="ui5-rating-indicator-item ui5-rating-indicator-item-unsel"><${l("ui5-icon", i, t)} data-ui5-value="${o(a.index)}" name="favorite"></${l("ui5-icon", i, t)}></li>` : r`<li class="ui5-rating-indicator-item ui5-rating-indicator-item-unsel"><ui5-icon data-ui5-value="${o(a.index)}" name="favorite"></ui5-icon></li>`;
}
function di(e, i, t, a, n) {
  return t ? r`<li data-ui5-value="${o(a.index)}" class="ui5-rating-indicator-item ui5-rating-indicator-item-unsel"><${l("ui5-icon", i, t)} data-ui5-value="${o(a.index)}" name="unfavorite"></${l("ui5-icon", i, t)}></li>` : r`<li data-ui5-value="${o(a.index)}" class="ui5-rating-indicator-item ui5-rating-indicator-item-unsel"><ui5-icon data-ui5-value="${o(a.index)}" name="unfavorite"></ui5-icon></li>`;
}
const ci = "favorite", k = "M378.36 297.834q-5.996 3.998-2.998 8.995l71.96 193.892q1.999 4.997-2.499 8.995t-9.494.999l-174.903-123.93q-4.997-3-8.995 0L76.53 510.714q-4.997 2.998-9.495-1t-2.499-8.994l71.96-193.892q2-5.997-2.998-8.995L3.569 205.885q-4.997-2.998-2.998-8.495t6.996-5.497h165.908q4.997 0 7.995-4.997L248.433 4.997Q250.432 0 255.929 0t7.495 4.997l66.963 181.899q1.999 4.997 7.996 4.997H503.29q5.996 0 7.995 5.497t-2.998 8.495z", si = !1, ui = "SAP-icons-v4", _i = "@ui5/webcomponents-icons";
p(ci, { pathData: k, ltr: si, collection: ui, packageName: _i });
const hi = "favorite", C = "M0 198q0-9 6.5-16t15.5-9l148-21 63-137q7-15 23-15t23 15l64 137 147 21q10 2 16 9t6 16q0 11-7 18L399 328l26 154q1 2 1 5 0 10-7.5 17.5T400 512q-6 0-12-3l-132-74-132 74q-4 3-12 3-11 0-18.5-7.5T86 487q0-2 .5-2.5t.5-2.5l26-154L7 216q-7-7-7-18z", gi = !1, vi = "SAP-icons-v5", mi = "@ui5/webcomponents-icons";
p(hi, { pathData: C, ltr: gi, collection: vi, packageName: mi });
y();
const pi = "unfavorite", D = "M8.569 191.946h164.954q5.998 0 7.998-4.998l66.981-181.95Q250.502 0 256.5 0q4.998 0 6.998 4.999l66.981 181.949q2 4.998 7.998 4.998h165.954q4.998 0 6.998 5.499t-3 8.498l-129.963 91.974q-4 2.999-3 8.997l71.98 193.946q2 4.999-1 7.998t-6.997 3q-3 0-4-1L260.5 386.891q-1-1-4-1-3.998 0-4.998 1L76.551 510.857q-1 1-4 1-3.999 0-6.998-2.999t-1-7.998l71.98-193.946q2-5.998-2.999-8.997L3.57 205.943q-4.998-3-2.999-8.498t7.998-5.499zm143.96 79.978q10.997 7.998 14.996 20.494t-1 25.493l-44.987 121.966L233.506 360.9q9.997-6.998 22.994-6.998 11.996 0 21.994 5.999l111.968 79.977-44.987-121.966q-4.999-12.996-1-25.493t14.996-20.494l68.98-47.986h-89.974q-26.992 0-37.99-25.993L256.5 76.979l-44.988 120.966q-10.997 25.993-37.989 25.993H84.548z", xi = !1, fi = "SAP-icons-v4", $i = "@ui5/webcomponents-icons";
p(pi, { pathData: D, ltr: xi, collection: fi, packageName: $i });
const bi = "unfavorite", N = "M400 510q-7 0-12-3l-132-74-131 74q-6 3-13 3-11 0-18.5-7T86 485q0-2 .5-2.5t.5-1.5l26-155L7 214q-7-7-7-17t6.5-17 15.5-9l148-21 63-137q7-15 23-15t23 15l64 137 147 21q10 2 16 9t6 17q0 11-7 17L399 326l26 155q1 1 1 4 0 11-7.5 18t-18.5 7zM256 379q7 0 13 3l97 54-20-114q0-7 1-12t6-10l81-85-112-16q-13-1-20-15l-46-99-46 99q-5 13-19 15L78 215l81 85q5 5 6 10t1 12l-20 114 98-54q5-3 12-3z", yi = !1, Ti = "SAP-icons-v5", wi = "@ui5/webcomponents-icons";
p(bi, { pathData: N, ltr: yi, collection: Ti, packageName: wi });
y();
x("@ui5/webcomponents-theming", "sap_horizon", async () => T);
x("@ui5/webcomponents", "sap_horizon", async () => L);
const qi = { packageName: "@ui5/webcomponents", fileName: "themes/RatingIndicator.css.ts", content: `:host(:not([hidden])){display:inline-block;font-size:24px;margin:var(--_ui5-v1-24-0_rating_indicator_component_spacing);cursor:pointer}:host([disabled]){opacity:.4;cursor:initial;outline:none}:host([readonly]){cursor:initial}:host([disabled]) .ui5-rating-indicator-item-unsel,:host([readonly]) .ui5-rating-indicator-item-unsel{padding-inline:var(--_ui5-v1-24-0_rating_indicator_readonly_item_spacing);width:var(--_ui5-v1-24-0_rating_indicator_readonly_item_width);height:var(--_ui5-v1-24-0_rating_indicator_readonly_item_height)}:host(:not([readonly]):not([disabled])) .ui5-rating-indicator-root:hover{opacity:.9}:host([_focused]){outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);outline-offset:var(--_ui5-v1-24-0_rating_indicator_outline_offset);border-radius:var(--_ui5-v1-24-0_rating_indicator_border_radius)}[ui5-icon]{display:flex;text-shadow:var(--sapContent_TextShadow)}.ui5-rating-indicator-root{outline:none;position:relative}.ui5-rating-indicator-list{list-style-type:none;display:flex;align-items:center;margin:0;padding:0}.ui5-rating-indicator-item{position:relative;width:var(--_ui5-v1-24-0_rating_indicator_item_width);height:var(--_ui5-v1-24-0_rating_indicator_item_height)}.ui5-rating-indicator-item:not(:last-child){margin-inline-end:.1875rem}.ui5-rating-indicator-item [ui5-icon]{width:100%;height:100%;color:inherit;user-select:none}.ui5-rating-indicator-item.ui5-rating-indicator-item-sel{color:var(--sapContent_RatedColor)}.ui5-rating-indicator-item.ui5-rating-indicator-item-unsel,.ui5-rating-indicator-item.ui5-rating-indicator-item-half{color:var(--sapContent_UnratedColor)}.ui5-rating-indicator-item [ui5-icon].ui5-rating-indicator-half-icon{position:absolute;inset-inline-start:50%;color:var(--sapContent_RatedColor)}.ui5-rating-indicator-half-icon-wrapper{width:100%;height:100%;position:absolute;inset-inline-start:-50%;top:0;z-index:32;overflow:hidden}
` };
var h = function(e, i, t, a) {
  var n = arguments.length, d = n < 3 ? i : a === null ? a = Object.getOwnPropertyDescriptor(i, t) : a, c;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    d = Reflect.decorate(e, i, t, a);
  else
    for (var s = e.length - 1; s >= 0; s--)
      (c = e[s]) && (d = (n < 3 ? c(d) : n > 3 ? c(i, t, d) : c(i, t)) || d);
  return n > 3 && d && Object.defineProperty(i, t, d), d;
}, v;
let u = v = class extends O {
  static async onDefine() {
    v.i18nBundle = await M("@ui5/webcomponents");
  }
  constructor() {
    super();
  }
  onBeforeRendering() {
    this.calcState();
  }
  calcState() {
    this._stars = [];
    for (let i = 1; i < this.max + 1; i++) {
      const t = Math.round((this.value - Math.floor(this.value)) * 10);
      let a = !1, n = this.value;
      Math.floor(this.value) + 1 === i && t > 2 && t < 8 ? a = !0 : t <= 2 ? n = Math.floor(this.value) : t >= 8 && (n = Math.ceil(this.value)), this._stars.push({
        selected: i <= n,
        index: i,
        halfStar: a
      });
    }
  }
  _onclick(i) {
    const t = i.target;
    if (!(t instanceof HTMLElement) || this.disabled || this.readonly)
      return;
    const a = t.getAttribute("data-ui5-value");
    a !== null && (this.value = parseInt(a), this.value === 1 && this._liveValue === 1 && (this.value = 0), this._liveValue !== this.value && (this.fireEvent("change"), this._liveValue = this.value));
  }
  _onkeydown(i) {
    if (this.disabled || this.readonly)
      return;
    const t = S(i) || z(i), a = P(i) || V(i), n = B(i) || F(i), d = j(i), c = G(i), s = i.keyCode >= 48 && i.keyCode <= 57 || i.keyCode >= 96 && i.keyCode <= 105;
    if (t || a || n || d || c || s) {
      if (i.preventDefault(), t && this.value > 0)
        this.value = Math.round(this.value - 1);
      else if (a && this.value < this.max)
        this.value = Math.round(this.value + 1);
      else if (n) {
        const g = Math.round(this.value + 1);
        this.value = g > this.max ? 0 : g;
      } else if (d)
        this.value = 0;
      else if (c)
        this.value = this.max;
      else if (s) {
        const g = parseInt(i.key);
        this.value = g > this.max ? this.max : g;
      }
      this.fireEvent("change");
    }
  }
  _onfocusin() {
    this.disabled || (this._focused = !0, this._liveValue = this.value);
  }
  _onfocusout() {
    this._focused = !1;
  }
  get effectiveTabIndex() {
    const i = this.getAttribute("tabindex");
    return this.disabled ? "-1" : i || "0";
  }
  get ratingTooltip() {
    return this.tooltip || this.defaultTooltip;
  }
  get defaultTooltip() {
    return v.i18nBundle.getText(J);
  }
  get _ariaRoleDescription() {
    return v.i18nBundle.getText(K);
  }
  get _ariaDisabled() {
    return this.disabled || void 0;
  }
  get _ariaLabel() {
    return H(this);
  }
  get _ariaDescription() {
    return this.required ? v.i18nBundle.getText(Y) : void 0;
  }
  get ariaReadonly() {
    return this.readonly ? "true" : void 0;
  }
};
h([
  _({ validator: Q, defaultValue: 0 })
], u.prototype, "value", void 0);
h([
  _({ validator: W, defaultValue: 5 })
], u.prototype, "max", void 0);
h([
  _({ type: Boolean })
], u.prototype, "disabled", void 0);
h([
  _({ type: Boolean })
], u.prototype, "readonly", void 0);
h([
  _()
], u.prototype, "accessibleName", void 0);
h([
  _({ defaultValue: "" })
], u.prototype, "accessibleNameRef", void 0);
h([
  _({ type: Boolean })
], u.prototype, "required", void 0);
h([
  _()
], u.prototype, "tooltip", void 0);
h([
  _({ type: Object, multiple: !0 })
], u.prototype, "_stars", void 0);
h([
  _({ type: Boolean })
], u.prototype, "_focused", void 0);
u = v = h([
  w({
    tag: "ui5-rating-indicator",
    languageAware: !0,
    renderer: q,
    styles: qi,
    template: Z,
    dependencies: [R]
  }),
  E("change")
], u);
u.define();
const A = u;
function Ri(e, i, t) {
  return r`<div class="udex-rating-indicator ui5-rating-indicator-root ${o(this.classNames)}" role="slider" aria-roledescription="${o(this._ariaRoleDescription)}" aria-valuemin="0" aria-valuenow="${o(this.value)}" aria-valuemax="${o(this.max)}" aria-valuetext="${o(this.value)} of ${o(this.max)}" aria-orientation="horizontal" aria-disabled="${o(this._ariaDisabled)}" aria-readonly="${o(this.ariaReadonly)}" aria-description="${o(this._ariaDescription)}" tabindex="${o(this.effectiveTabIndex)}" @focusin="${this._onfocusin}" @focusout="${this._onfocusout}" @click="${this._onclick}" @keydown="${this._onkeydown}" title="${o(this.ratingTooltip)}" aria-label="${o(this._ariaLabel)}"><ul class="udex-rating-indicator__list ui5-rating-indicator-list" aria-hidden="true">${b(this._stars, (a, n) => a._id || n, (a, n) => Ii.call(this, e, i, t, a, n))}</ul>${this.totalCount ? Mi.call(this, e, i, t) : void 0}</div>`;
}
function Ii(e, i, t, a, n) {
  return r`${a.selected ? ki.call(this, e, i, t, a, n) : Ci.call(this, e, i, t, a, n)}`;
}
function ki(e, i, t, a, n) {
  return t ? r`<li data-ui5-value="${o(a.index)}" class="udex-rating-indicator__item udex-rating-indicator__item-sel ui5-rating-indicator-item ui5-rating-indicator-item-sel"><${l("ui5-icon", i, t)} data-ui5-value="${o(a.index)}" name="favorite"></${l("ui5-icon", i, t)}></li>` : r`<li data-ui5-value="${o(a.index)}" class="udex-rating-indicator__item udex-rating-indicator__item-sel ui5-rating-indicator-item ui5-rating-indicator-item-sel"><ui5-icon data-ui5-value="${o(a.index)}" name="favorite"></ui5-icon></li>`;
}
function Ci(e, i, t, a, n) {
  return r`${a.halfStar ? Di.call(this, e, i, t, a, n) : Ni.call(this, e, i, t, a, n)}`;
}
function Di(e, i, t, a, n) {
  return t ? r`<li class="udex-rating-indicator__item udex-rating-indicator__item-half ui5-rating-indicator-item ui5-rating-indicator-item-half"><${l("ui5-icon", i, t)} data-ui5-value="${o(a.index)}" name="unfavorite"></${l("ui5-icon", i, t)}><div class="udex-rating-indicator__half-icon-wrapper ui5-rating-indicator-half-icon-wrapper"><${l("ui5-icon", i, t)} data-ui5-value="${o(a.index)}" name="favorite" class="udex-rating-indicator__half-icon ui5-rating-indicator-half-icon"></${l("ui5-icon", i, t)}></div></li>` : r`<li class="udex-rating-indicator__item udex-rating-indicator__item-half ui5-rating-indicator-item ui5-rating-indicator-item-half"><ui5-icon data-ui5-value="${o(a.index)}" name="unfavorite"></ui5-icon><div class="udex-rating-indicator__half-icon-wrapper ui5-rating-indicator-half-icon-wrapper"><ui5-icon data-ui5-value="${o(a.index)}" name="favorite" class="udex-rating-indicator__half-icon ui5-rating-indicator-half-icon"></ui5-icon></div></li>`;
}
function Ni(e, i, t, a, n) {
  return r`${this.readonly ? Ai.call(this, e, i, t, a, n) : Li.call(this, e, i, t, a, n)}`;
}
function Ai(e, i, t, a, n) {
  return t ? r`<li class="udex-rating-indicator__item udex-rating-indicator__item-unsel ui5-rating-indicator-item ui5-rating-indicator-item-unsel"><${l("ui5-icon", i, t)} data-ui5-value="${o(a.index)}" name="favorite"></${l("ui5-icon", i, t)}></li>` : r`<li class="udex-rating-indicator__item udex-rating-indicator__item-unsel ui5-rating-indicator-item ui5-rating-indicator-item-unsel"><ui5-icon data-ui5-value="${o(a.index)}" name="favorite"></ui5-icon></li>`;
}
function Li(e, i, t, a, n) {
  return r`${this.disabled ? Ei.call(this, e, i, t, a, n) : Oi.call(this, e, i, t, a, n)}`;
}
function Ei(e, i, t, a, n) {
  return t ? r`<li class="udex-rating-indicator__item udex-rating-indicator__item-unsel ui5-rating-indicator-item ui5-rating-indicator-item-unsel"><${l("ui5-icon", i, t)} data-ui5-value="${o(a.index)}" name="unfavorite"></${l("ui5-icon", i, t)}></li>` : r`<li class="udex-rating-indicator__item udex-rating-indicator__item-unsel ui5-rating-indicator-item ui5-rating-indicator-item-unsel"><ui5-icon data-ui5-value="${o(a.index)}" name="unfavorite"></ui5-icon></li>`;
}
function Oi(e, i, t, a, n) {
  return t ? r`<li data-ui5-value="${o(a.index)}" class="udex-rating-indicator__item udex-rating-indicator__item-unsel ui5-rating-indicator-item ui5-rating-indicator-item-unsel"><${l("ui5-icon", i, t)} data-ui5-value="${o(a.index)}" name="unfavorite"></${l("ui5-icon", i, t)}></li>` : r`<li data-ui5-value="${o(a.index)}" class="udex-rating-indicator__item udex-rating-indicator__item-unsel ui5-rating-indicator-item ui5-rating-indicator-item-unsel"><ui5-icon data-ui5-value="${o(a.index)}" name="unfavorite"></ui5-icon></li>`;
}
function Mi(e, i, t) {
  return r`<div class="udex-rating-indicator__total">(${o(this.totalCount)})</div>`;
}
x("@ui5/webcomponents-theming", "sap_horizon", async () => T);
x("@udex/web-components", "sap_horizon", async () => U);
const Si = { packageName: "@udex/web-components", fileName: "themes/RatingIndicator.css.ts", content: `:host{--udex_rating_indicator_readonly_item_width: 1.5rem;--udex_rating_indicator_readonly_item_height: 1.5rem;--udex_rating_indicator_item_width: 1.5rem;--udex_rating_indicator_item_height: 1.5rem;--udex_rating_indicator_mobile_item_padding: 10px;--udex_rating_indicator_disabled_opacity: .4;--udex-rating_indicator_items_gap: 8px;--udex-rating_indicator_mobile_items_gap: 8px;--udex-rating_indicator_rated_color: var(--sapContent_RatedColor, #E76500);--udex-rating_indicator_unrated_color: var(--sapContent_UnratedColor, #5B738B);--udex-rating_indicator_rated_hover_color: var(--udexColorMango7, #C35500);--udex-rating_indicator_unrated_hover_color: var(--udexColorGrey7, #475E75)}.udex-rating-indicator{font-family:var(--sapFontFamily);font-size:var(--sapFontSize, 16px)}:host(:not([hidden])){display:inline-block;margin:var(--_ui5-v0-74-10_rating_indicator_component_spacing);cursor:pointer}:host([disabled]){opacity:var(--udex_rating_indicator_disabled_opacity);cursor:initial;outline:none}:host([readonly]){cursor:initial}:host([disabled]) .udex-rating-indicator__item-unsel,:host([readonly]) .udex-rating-indicator__item-unsel{width:var(--udex_rating_indicator_readonly_item_width);height:var(--udex_rating_indicator_readonly_item_height)}:host([_focused]){outline:var(--sapContent_FocusWidth) var(--sapContent_FocusStyle) var(--sapContent_FocusColor);outline-offset:.125rem;border-radius:.25rem}[ui5-icon]{display:flex;text-shadow:var(--sapContent_TextShadow)}.udex-rating-indicator{outline:none;position:relative;display:inline-flex;gap:12px;align-items:center}.udex-rating-indicator__total{color:var(--udexColorGrey6);line-height:24px}.udex-rating-indicator__list{list-style-type:none;display:flex;align-items:center;margin:0;padding:0}.udex-rating-indicator__item{position:relative;width:var(--udex_rating_indicator_item_width);height:var(--udex_rating_indicator_item_height)}.udex-rating-indicator__item:not(:last-child){margin-inline-end:var(--udex-rating_indicator_items_gap)}.udex-rating-indicator__item [ui5-icon]{width:100%;height:100%;color:inherit;user-select:none}.udex-rating-indicator__item.udex-rating-indicator__item-sel{color:var(--udex-rating_indicator_rated_color)}.udex-rating-indicator__item.udex-rating-indicator__item-unsel{color:var(--udex-rating_indicator_unrated_color)}.udex-rating-indicator__item.udex-rating-indicator__item-half{color:var(--udex-rating_indicator_rated_color)}.udex-rating-indicator__item [ui5-icon].udex-rating-indicator__half-icon{position:absolute;inset-inline-start:50%;color:var(--udex-rating_indicator_rated_color)}:host(:not([readonly]):not([disabled])) .udex-rating-indicator:hover .udex-rating-indicator__item-sel,:host(:not([readonly]):not([disabled])) .udex-rating-indicator:hover .udex-rating-indicator__half-icon,:host(:not([readonly]):not([disabled])) .udex-rating-indicator:hover .udex-rating-indicator__item-half{color:var(--udex-rating_indicator_rated_hover_color)}:host(:not([readonly]):not([disabled])) .udex-rating-indicator:hover .udex-rating-indicator__item-unsel{color:var(--udex-rating_indicator_unrated_hover_color)}.udex-rating-indicator__half-icon-wrapper{width:100%;height:100%;position:absolute;inset-inline-start:-50%;top:0;z-index:32;overflow:hidden}.udex-rating-indicator--mobile .udex-rating-indicator__half-icon-wrapper{top:var(--udex_rating_indicator_mobile_item_padding)}.udex-rating-indicator--mobile .udex-rating-indicator__item [ui5-icon].udex-rating-indicator__half-icon{height:var(--udex_rating_indicator_item_height)}.udex-rating-indicator--mobile .udex-rating-indicator__item{padding:var(--udex_rating_indicator_mobile_item_padding)}.udex-rating-indicator--mobile .udex-rating-indicator__item:not(:last-child){margin-inline-end:var(--udex-rating_indicator_mobile_items_gap)}
` };
var $ = function(e, i, t, a) {
  var n = arguments.length, d = n < 3 ? i : a === null ? a = Object.getOwnPropertyDescriptor(i, t) : a, c;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    d = Reflect.decorate(e, i, t, a);
  else
    for (var s = e.length - 1; s >= 0; s--)
      (c = e[s]) && (d = (n < 3 ? c(d) : n > 3 ? c(i, t, d) : c(i, t)) || d);
  return n > 3 && d && Object.defineProperty(i, t, d), d;
}, f;
(function(e) {
  e.Desktop = "Desktop", e.Mobile = "Mobile";
})(f || (f = {}));
let m = class extends A {
  get classNames() {
    return `udex-rating-indicator--${this.display.toLowerCase()}`;
  }
};
$([
  _({ defaultValue: f.Desktop })
], m.prototype, "display", void 0);
$([
  _()
], m.prototype, "totalCount", void 0);
m = $([
  w({
    tag: "udex-rating-indicator",
    renderer: q,
    styles: [A.styles, Si],
    template: Ri,
    dependencies: [R]
  })
], m);
m.define();
