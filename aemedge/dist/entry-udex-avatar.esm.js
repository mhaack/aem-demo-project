import { z as w, e as u, l as t, s as g, a as y, b as X, j, r as A, i as P, p as i, d as C, f as D, k as U, U as G, x as W, A as K, w as Z, v as J, g as q, h as N, I as Q, c as Y } from "./parameters-bundle.css-Bbg-m5ef.js";
import { A as aa } from "./i18n-defaults-BEqZgmok.js";
let T;
const b = /* @__PURE__ */ new Map(), E = () => (T || (T = new window.ResizeObserver((a) => {
  window.requestAnimationFrame(() => {
    a.forEach((r) => {
      const e = b.get(r.target);
      e && Promise.all(e.map((o) => o()));
    });
  });
})), T), ra = (a, r) => {
  const e = b.get(a) || [];
  e.length || E().observe(a), b.set(a, [...e, r]);
}, ea = (a, r) => {
  const e = b.get(a) || [];
  if (e.length === 0)
    return;
  const o = e.filter((v) => v !== r);
  o.length === 0 ? (E().unobserve(a), b.delete(a)) : b.set(a, o);
};
class I {
  /**
   * @public
   * @param element UI5 Web Component or DOM Element to be observed
   * @param callback Callback to be executed
   */
  static register(r, e) {
    let o = r;
    w(o) && (o = o.getDomRef()), o instanceof HTMLElement ? ra(o, e) : console.warn("Cannot register ResizeHandler for element", r);
  }
  /**
   * @public
   * @param element UI5 Web Component or DOM Element to be unobserved
   * @param callback Callback to be removed
   */
  static deregister(r, e) {
    let o = r;
    w(o) && (o = o.getDomRef()), o instanceof HTMLElement ? ea(o, e) : console.warn("Cannot deregister ResizeHandler for element", r);
  }
}
function oa(a, r, e) {
  return u`<div class="ui5-avatar-root" tabindex="${t(this.tabindex)}" data-sap-focus-ref @keyup=${this._onkeyup} @keydown=${this._onkeydown} @click=${this._onclick} role="${t(this._role)}" aria-haspopup="${t(this._ariaHasPopup)}" aria-label="${t(this.accessibleNameText)}" fallback-icon="${t(this._fallbackIcon)}">${this.hasImage ? ta.call(this, a, r, e) : ia.call(this, a, r, e)}<slot name="badge"></slot></div>`;
}
function ta(a, r, e) {
  return u`<slot></slot>`;
}
function ia(a, r, e) {
  return u`${this.icon ? ca.call(this, a, r, e) : void 0}${this.initials ? da.call(this, a, r, e) : void 0}`;
}
function ca(a, r, e) {
  return e ? u`<${g("ui5-icon", r, e)} class="ui5-avatar-icon" name="${t(this.icon)}"></${g("ui5-icon", r, e)}>` : u`<ui5-icon class="ui5-avatar-icon" name="${t(this.icon)}"></ui5-icon>`;
}
function da(a, r, e) {
  return e ? u`<span class="ui5-avatar-initials ui5-avatar-initials-hidden">${t(this.validInitials)}</span><${g("ui5-icon", r, e)} class="ui5-avatar-icon ui5-avatar-icon-fallback ui5-avatar-fallback-icon-hidden" name="${t(this.fallbackIcon)}"></${g("ui5-icon", r, e)}>` : u`<span class="ui5-avatar-initials ui5-avatar-initials-hidden">${t(this.validInitials)}</span><ui5-icon class="ui5-avatar-icon ui5-avatar-icon-fallback ui5-avatar-fallback-icon-hidden" name="${t(this.fallbackIcon)}"></ui5-icon>`;
}
y("@ui5/webcomponents-theming", "sap_horizon", async () => X);
y("@ui5/webcomponents", "sap_horizon", async () => j);
const na = { packageName: "@ui5/webcomponents", fileName: "themes/Avatar.css.ts", content: `:host(:not([hidden])){display:inline-block;box-sizing:border-box;position:relative;font-family:"72override",var(--sapFontFamily)}:host(:not([hidden]).ui5_hovered){opacity:.7}:host([interactive]:not([disabled])){cursor:pointer}:host([interactive]:not([hidden]):active){background-color:var(--sapButton_Active_Background);border-color:var(--sapButton_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([interactive]:not([hidden]):not([disabled]):not(:active):hover){box-shadow:var(--ui5-v1-24-0-avatar-hover-box-shadow-offset)}:host([interactive][desktop]:not([hidden])) .ui5-avatar-root:focus-within,:host([interactive]:not([hidden])) .ui5-avatar-root:focus-visible{outline:var(--_ui5-v1-24-0_avatar_outline);outline-offset:var(--_ui5-v1-24-0_avatar_focus_offset)}:host([disabled]){opacity:var(--sapContent_DisabledOpacity)}:host{height:3rem;width:3rem;border-radius:50%;border:var(--ui5-v1-24-0-avatar-initials-border);outline:none;color:var(--ui5-v1-24-0-avatar-initials-color)}.ui5-avatar-root{display:flex;align-items:center;justify-content:center;outline:none;height:100%;width:100%;border-radius:inherit}:host([_size="XS"]),:host([size="XS"]){height:2rem;width:2rem;min-height:2rem;min-width:2rem;font-size:var(--_ui5-v1-24-0_avatar_fontsize_XS)}:host(:not([size])),:host([_size="S"]),:host([size="S"]){min-height:3rem;min-width:3rem;font-size:var(--_ui5-v1-24-0_avatar_fontsize_S)}:host([_size="M"]),:host([size="M"]){min-height:4rem;min-width:4rem;font-size:var(--_ui5-v1-24-0_avatar_fontsize_M)}:host([_size="L"]),:host([size="L"]){min-height:5rem;min-width:5rem;font-size:var(--_ui5-v1-24-0_avatar_fontsize_L)}:host([_size="XL"]),:host([size="XL"]){min-height:7rem;min-width:7rem;font-size:var(--_ui5-v1-24-0_avatar_fontsize_XL)}:host .ui5-avatar-icon{height:var(--_ui5-v1-24-0_avatar_fontsize_S);width:var(--_ui5-v1-24-0_avatar_fontsize_S);color:inherit}:host([_size="XS"]) .ui5-avatar-icon,:host([size="XS"]) .ui5-avatar-icon{height:var(--_ui5-v1-24-0_avatar_icon_XS);width:var(--_ui5-v1-24-0_avatar_icon_XS)}:host([_size="S"]) .ui5-avatar-icon,:host([size="S"]) .ui5-avatar-icon{height:var(--_ui5-v1-24-0_avatar_icon_S);width:var(--_ui5-v1-24-0_avatar_icon_S)}:host([_size="M"]) .ui5-avatar-icon,:host([size="M"]) .ui5-avatar-icon{height:var(--_ui5-v1-24-0_avatar_icon_M);width:var(--_ui5-v1-24-0_avatar_icon_M)}:host([_size="L"]) .ui5-avatar-icon,:host([size="L"]) .ui5-avatar-icon{height:var(--_ui5-v1-24-0_avatar_icon_L);width:var(--_ui5-v1-24-0_avatar_icon_L)}:host([_size="XL"]) .ui5-avatar-icon,:host([size="XL"]) .ui5-avatar-icon{height:var(--_ui5-v1-24-0_avatar_icon_XL);width:var(--_ui5-v1-24-0_avatar_icon_XL)}::slotted(*){border-radius:50%;width:100%;height:100%;pointer-events:none}:host([shape="Square"]){border-radius:var(--ui5-v1-24-0-avatar-border-radius)}:host([shape="Square"]) ::slotted(*){border-radius:calc(var(--ui5-v1-24-0-avatar-border-radius) - var(--ui5-v1-24-0-avatar-border-radius-img-deduction))}:host(:not([color-scheme])),:host(:not([_has-image])),:host([_color-scheme="Accent6"]),:host([ui5-avatar][color-scheme="Accent6"]){background-color:var(--ui5-v1-24-0-avatar-accent6);color:var(--ui5-v1-24-0-avatar-accent6-color);border-color:var(--ui5-v1-24-0-avatar-accent6-border-color)}:host([_color-scheme="Accent1"]),:host([ui5-avatar][color-scheme="Accent1"]){background-color:var(--ui5-v1-24-0-avatar-accent1);color:var(--ui5-v1-24-0-avatar-accent1-color);border-color:var(--ui5-v1-24-0-avatar-accent1-border-color)}:host([_color-scheme="Accent2"]),:host([ui5-avatar][color-scheme="Accent2"]){background-color:var(--ui5-v1-24-0-avatar-accent2);color:var(--ui5-v1-24-0-avatar-accent2-color);border-color:var(--ui5-v1-24-0-avatar-accent2-border-color)}:host([_color-scheme="Accent3"]),:host([ui5-avatar][color-scheme="Accent3"]){background-color:var(--ui5-v1-24-0-avatar-accent3);color:var(--ui5-v1-24-0-avatar-accent3-color);border-color:var(--ui5-v1-24-0-avatar-accent3-border-color)}:host([_color-scheme="Accent4"]),:host([ui5-avatar][color-scheme="Accent4"]){background-color:var(--ui5-v1-24-0-avatar-accent4);color:var(--ui5-v1-24-0-avatar-accent4-color);border-color:var(--ui5-v1-24-0-avatar-accent4-border-color)}:host([_color-scheme="Accent5"]),:host([ui5-avatar][color-scheme="Accent5"]){background-color:var(--ui5-v1-24-0-avatar-accent5);color:var(--ui5-v1-24-0-avatar-accent5-color);border-color:var(--ui5-v1-24-0-avatar-accent5-border-color)}:host([_color-scheme="Accent7"]),:host([ui5-avatar][color-scheme="Accent7"]){background-color:var(--ui5-v1-24-0-avatar-accent7);color:var(--ui5-v1-24-0-avatar-accent7-color);border-color:var(--ui5-v1-24-0-avatar-accent7-border-color)}:host([_color-scheme="Accent8"]),:host([ui5-avatar][color-scheme="Accent8"]){background-color:var(--ui5-v1-24-0-avatar-accent8);color:var(--ui5-v1-24-0-avatar-accent8-color);border-color:var(--ui5-v1-24-0-avatar-accent8-border-color)}:host([_color-scheme="Accent9"]),:host([ui5-avatar][color-scheme="Accent9"]){background-color:var(--ui5-v1-24-0-avatar-accent9);color:var(--ui5-v1-24-0-avatar-accent9-color);border-color:var(--ui5-v1-24-0-avatar-accent9-border-color)}:host([_color-scheme="Accent10"]),:host([ui5-avatar][color-scheme="Accent10"]){background-color:var(--ui5-v1-24-0-avatar-accent10);color:var(--ui5-v1-24-0-avatar-accent10-color);border-color:var(--ui5-v1-24-0-avatar-accent10-border-color)}:host([_color-scheme="Placeholder"]),:host([ui5-avatar][color-scheme="Placeholder"]){background-color:var(--ui5-v1-24-0-avatar-placeholder);color:var(--ui5-v1-24-0-avatar-placeholder-color);border-color:var(--ui5-v1-24-0-avatar-placeholder-border-color)}:host([_has-image]){color:var(--ui5-v1-24-0-avatar-accent10-color);background-color:transparent;vertical-align:middle}.ui5-avatar-initials{color:inherit}.ui5-avatar-icon~.ui5-avatar-initials,.ui5-avatar-icon~.ui5-avatar-icon-fallback{display:none}.ui5-avatar-fallback-icon-hidden{display:none}.ui5-avatar-initials-hidden{position:absolute;visibility:hidden;z-index:0;pointer-events:none}::slotted([slot="badge"]){position:absolute;bottom:0;right:0;width:1.125rem;height:1.125rem;font-family:"72override",var(--sapFontFamily);font-size:var(--sapFontSmallSize);color:var(--sapBackgroundColor);--_ui5-v1-24-0-badge-height: 1.125rem;--_ui5-v1-24-0-badge-border-radius: 50%;--ui5-v1-24-0-badge-color-scheme-1-background: var(--sapButton_Emphasized_Background);--ui5-v1-24-0-badge-color-scheme-1-color: var(--sapButton_Emphasized_TextColor);--ui5-v1-24-0-badge-color-scheme-1-border: var(--sapButton_Emphasized_BorderColor)}:host([_size="L"]) ::slotted([slot="badge"]),:host([size="L"]) ::slotted([slot="badge"]){width:1.25rem;height:1.25rem;--_ui5-v1-24-0-badge-height: 1.25rem;--_ui5-v1-24-0-badge-icon-width: .875rem}:host([_size="XL"]) ::slotted([slot="badge"]),:host([size="XL"]) ::slotted([slot="badge"]){width:1.75rem;height:1.75rem;--_ui5-v1-24-0-badge-height: 1.75rem;--_ui5-v1-24-0-badge-icon-width: 1rem}:host([shape="Square"]) ::slotted([slot="badge"]){bottom:-.125rem;right:-.125rem}:host([_size="L"][shape="Square"]) ::slotted([slot="badge"]),:host([size="L"][shape="Square"]) ::slotted([slot="badge"]){bottom:-.1875rem;right:-.1875rem}:host([_size="XL"][shape="Square"]) ::slotted([slot="badge"]),:host([size="XL"][shape="Square"]) ::slotted([slot="badge"]){bottom:-.25rem;right:-.25rem}
` };
var $;
(function(a) {
  a.XS = "XS", a.S = "S", a.M = "M", a.L = "L", a.XL = "XL";
})($ || ($ = {}));
const _ = $;
var B;
(function(a) {
  a.Circle = "Circle", a.Square = "Square";
})(B || (B = {}));
const L = B;
var S;
(function(a) {
  a.Accent1 = "Accent1", a.Accent2 = "Accent2", a.Accent3 = "Accent3", a.Accent4 = "Accent4", a.Accent5 = "Accent5", a.Accent6 = "Accent6", a.Accent7 = "Accent7", a.Accent8 = "Accent8", a.Accent9 = "Accent9", a.Accent10 = "Accent10", a.Placeholder = "Placeholder";
})(S || (S = {}));
const f = S, la = "employee", H = "M448 512H64V384q0-26 10-49.5t27.5-41T142 266t50-10h64q-27 0-50-10t-40.5-27.5T138 178t-10-50q0-26 10-49.5t27.5-41T206 10t50-10q26 0 49.5 10t41 27.5 27.5 41 10 49.5q0 27-10 50t-27.5 40.5-41 27.5-49.5 10h64q26 0 49.5 10t41 27.5 27.5 41 10 49.5v128zM96 384v96h320v-96q0-40-28-68t-68-28H192q-40 0-68 28t-28 68zm160-160q40 0 68-28t28-68-28-68-68-28-68 28-28 68 28 68 68 28zm32 192v-32h96v32h-96z", sa = !1, va = "SAP-icons-v4", ua = "@ui5/webcomponents-icons";
A(la, { pathData: H, ltr: sa, collection: va, packageName: ua });
const ha = "employee", V = "M342 255q48 23 77 67.5t29 99.5v32q0 11-7.5 18.5T422 480H90q-11 0-18.5-7.5T64 454v-32q0-55 29-99.5t77-67.5l-4-5q-19-17-28.5-40.5T128 160q0-27 10-50t27.5-40.5 41-27.5T256 32t49.5 10.5 41 28T374 111t10 49q0 27-11 52t-31 43zm-163-95q0 32 22.5 54.5T256 237t54.5-22.5T333 160t-22.5-54.5T256 83t-54.5 22.5T179 160zm51 181l-25-15q-13-7-13-19v-6q-34 17-55.5 49T115 422v7h115v-88zm167 81q0-40-21-72t-56-49v6q0 12-13 19l-26 15v88h116v-7zm-71-70q11 0 18.5 7.5T352 378t-7.5 18-18.5 7h-12q-11 0-18.5-7t-7.5-18 7.5-18.5T314 352h12z", xa = !1, ba = "SAP-icons-v5", ga = "@ui5/webcomponents-icons";
A(ha, { pathData: V, ltr: xa, collection: ba, packageName: ga });
P();
const pa = "alert", F = "M501 374q5 10 7.5 19.5T512 412v5q0 31-23 47t-50 16H74q-13 0-26-4t-23.5-12-17-20T0 417q0-13 4-22.5t9-20.5L198 38q21-38 61-38 38 0 59 38zM257 127q-13 0-23.5 8T223 161q1 7 2 12 3 25 4.5 48t3.5 61q0 11 7.5 16t16.5 5q22 0 23-21l2-36 9-85q0-18-10.5-26t-23.5-8zm0 299q20 0 31.5-12t11.5-32q0-19-11.5-31T257 339t-31.5 12-11.5 31q0 20 11.5 32t31.5 12z", _a = !1, fa = "SAP-icons-v4", ma = "@ui5/webcomponents-icons";
A(pa, { pathData: F, ltr: _a, collection: fa, packageName: ma });
const ka = "alert", O = "M505 399q7 13 7 27 0 21-15.5 37.5T456 480H56q-25 0-40.5-16.5T0 426q0-14 7-27L208 59q17-27 48-27 14 0 27 6.5T304 59zM288 176q0-14-9-23t-23-9-23 9-9 23v96q0 14 9 23t23 9 23-9 9-23v-96zm-32 240q14 0 23-9t9-23-9-23-23-9-23 9-9 23 9 23 23 9z", za = !1, ya = "SAP-icons-v5", Aa = "@ui5/webcomponents-icons";
A(ka, { pathData: O, ltr: za, collection: ya, packageName: Aa });
P();
var n = function(a, r, e, o) {
  var v = arguments.length, d = v < 3 ? r : o === null ? o = Object.getOwnPropertyDescriptor(r, e) : o, h;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    d = Reflect.decorate(a, r, e, o);
  else
    for (var x = a.length - 1; x >= 0; x--)
      (h = a[x]) && (d = (v < 3 ? h(d) : v > 3 ? h(r, e, d) : h(r, e)) || d);
  return v > 3 && d && Object.defineProperty(r, e, d), d;
}, p;
let c = p = class extends G {
  constructor() {
    super(), this._handleResizeBound = this.handleResize.bind(this);
  }
  static async onDefine() {
    p.i18nBundle = await W("@ui5/webcomponents");
  }
  get tabindex() {
    return this.forcedTabIndex || (this._interactive ? "0" : "-1");
  }
  /**
   * Returns the effective avatar size.
   * @default "S"
   * @private
   */
  get effectiveSize() {
    return this.getAttribute("size") || this._size;
  }
  /**
   * Returns the effective background color.
   * @default "Accent6"
   * @private
   */
  get еffectiveBackgroundColor() {
    return this.getAttribute("color-scheme") || this._colorScheme;
  }
  get _role() {
    return this._interactive ? "button" : "img";
  }
  get _ariaHasPopup() {
    return this._getAriaHasPopup();
  }
  get _fallbackIcon() {
    return this.fallbackIcon === "" && (this.fallbackIcon = "employee"), this.fallbackIcon;
  }
  get _interactive() {
    return this.interactive && !this.disabled;
  }
  get validInitials() {
    const r = /^[a-zA-Zà-üÀ-Ü]{1,3}$/;
    return this.initials && r.test(this.initials) ? this.initials : null;
  }
  get accessibleNameText() {
    return this.accessibleName ? this.accessibleName : p.i18nBundle.getText(aa) || void 0;
  }
  get hasImage() {
    return this._hasImage = !!this.image.length, this._hasImage;
  }
  get initialsContainer() {
    return this.getDomRef().querySelector(".ui5-avatar-initials");
  }
  get fallBackIconDomRef() {
    return this.getDomRef().querySelector(".ui5-avatar-icon-fallback");
  }
  onBeforeRendering() {
    this._onclick = this._interactive ? this._onClickHandler.bind(this) : void 0;
  }
  async onAfterRendering() {
    await K(), this.initials && !this.icon && this._checkInitials();
  }
  onEnterDOM() {
    Z() && this.setAttribute("desktop", ""), this.initialsContainer && I.register(this.initialsContainer, this._handleResizeBound);
  }
  onExitDOM() {
    this.initialsContainer && I.deregister(this.initialsContainer, this._handleResizeBound);
  }
  handleResize() {
    this.initials && !this.icon && this._checkInitials();
  }
  _checkInitials() {
    const r = this.getDomRef(), e = r.querySelector(".ui5-avatar-initials");
    if (this.validInitials && e && e.scrollWidth <= r.scrollWidth) {
      this.showInitials();
      return;
    }
    this.showFallbackIcon();
  }
  showFallbackIcon() {
    var r, e;
    (r = this.initialsContainer) == null || r.classList.add("ui5-avatar-initials-hidden"), (e = this.fallBackIconDomRef) == null || e.classList.remove("ui5-avatar-fallback-icon-hidden");
  }
  showInitials() {
    var r, e;
    (r = this.initialsContainer) == null || r.classList.remove("ui5-avatar-initials-hidden"), (e = this.fallBackIconDomRef) == null || e.classList.add("ui5-avatar-fallback-icon-hidden");
  }
  _onClickHandler(r) {
    r.stopPropagation(), this._fireClick();
  }
  _onkeydown(r) {
    this._interactive && (J(r) && this._fireClick(), q(r) && r.preventDefault());
  }
  _onkeyup(r) {
    this._interactive && !r.shiftKey && q(r) && this._fireClick();
  }
  _fireClick() {
    this.fireEvent("click");
  }
  _getAriaHasPopup() {
    if (!(!this._interactive || this.ariaHaspopup === ""))
      return this.ariaHaspopup;
  }
};
n([
  i({ type: Boolean })
], c.prototype, "disabled", void 0);
n([
  i({ type: Boolean })
], c.prototype, "interactive", void 0);
n([
  i()
], c.prototype, "icon", void 0);
n([
  i()
], c.prototype, "fallbackIcon", void 0);
n([
  i()
], c.prototype, "initials", void 0);
n([
  i({ type: L, defaultValue: L.Circle })
], c.prototype, "shape", void 0);
n([
  i({ type: _, defaultValue: _.S })
], c.prototype, "size", void 0);
n([
  i({ type: _, defaultValue: _.S })
], c.prototype, "_size", void 0);
n([
  i({ type: f, defaultValue: f.Accent6 })
], c.prototype, "colorScheme", void 0);
n([
  i({ type: f, defaultValue: f.Accent6 })
], c.prototype, "_colorScheme", void 0);
n([
  i()
], c.prototype, "accessibleName", void 0);
n([
  i()
], c.prototype, "ariaHaspopup", void 0);
n([
  i({ noAttribute: !0 })
], c.prototype, "forcedTabIndex", void 0);
n([
  i({ type: Boolean })
], c.prototype, "_hasImage", void 0);
n([
  C({ type: HTMLElement, default: !0 })
], c.prototype, "image", void 0);
n([
  C()
], c.prototype, "badge", void 0);
c = p = n([
  D({
    tag: "ui5-avatar",
    languageAware: !0,
    renderer: N,
    styles: na,
    template: oa,
    dependencies: [Q]
  }),
  U("click")
], c);
c.define();
function Ca(a, r, e) {
  return e ? u`<${g("ui5-avatar", r, e)} class="${t(this.udexAvatarClass)}" ?disabled="${this.disabled}" initials="${t(this.initials)}" ?interactive="${this.interactive}" accessible-name="${t(this.accessibleName)}" color-scheme="${t(this.getUI5AvatarColorScheme)}" fallback-icon="${t(this.fallbackIcon)}" icon="${t(this.icon)}" shape="${t(this.shape)}" size="${t(this.size)}">${this.imageSlot ? R.call(this, a, r, e) : void 0}${this.badgeSlot ? M.call(this, a, r, e) : void 0}</${g("ui5-avatar", r, e)}>` : u`<ui5-avatar class="${t(this.udexAvatarClass)}" ?disabled="${this.disabled}" initials="${t(this.initials)}" ?interactive="${this.interactive}" accessible-name="${t(this.accessibleName)}" color-scheme="${t(this.getUI5AvatarColorScheme)}" fallback-icon="${t(this.fallbackIcon)}" icon="${t(this.icon)}" shape="${t(this.shape)}" size="${t(this.size)}">${this.imageSlot ? R.call(this, a, r, e) : void 0}${this.badgeSlot ? M.call(this, a, r, e) : void 0}</ui5-avatar>`;
}
function R(a, r, e) {
  return u`<slot></slot>`;
}
function M(a, r, e) {
  return u`<slot name="badge" slot="badge"></slot>`;
}
y("@ui5/webcomponents-theming", "sap_horizon", async () => X);
y("@udex/web-components", "sap_horizon", async () => Y);
const Ta = { packageName: "@udex/web-components", fileName: "themes/Avatar.css.ts", content: `:host{--udex-avatar-badge-size-background-xs-and-s-and-m: 18px;--udex-avatar-badge-size-background-l: 20px;--udex-avatar-badge-size-background-xl: 28px;--udex-avatar-badge-size-icon-xs-and-s-and-m: 12px;--udex-avatar-badge-size-icon-l: 14px;--udex-avatar-badge-size-icon-xl: 16px;--udex-avatar-size-xs: 32px;--udex-avatar-size-s: 48px;--udex-avatar-size-m: 64px;--udex-avatar-size-l: 84px;--udex-avatar-size-xl: 120px;--udex-avatar-font-size-xs: 12px;--udex-avatar-font-size-s: 18px;--udex-avatar-font-size-m: 24px;--udex-avatar-font-size-l: 32px;--udex-avatar-font-size-xl: 48px;--udex-avatar-icon-size-xs: 16px;--udex-avatar-icon-size-s: 18px;--udex-avatar-icon-size-m: 24px;--udex-avatar-icon-size-l: 36px;--udex-avatar-icon-size-xl: 52px;--udex-avatar-radius-xs: var(--udexRadiusXS, 4px);--udex-avatar-radius-s: var(--udexRadiusXS, 4px);--udex-avatar-radius-m: var(--udexRadiusM, 8px);--udex-avatar-radius-l: var(--udexRadiusM, 8px);--udex-avatar-radius-xl: var(--udexRadiusXL, 16px);--udex-avatar-image-default-border-color: var(--udexColorGrey2, #EAECEE);--udex-avatar-image-hover-border-color: var(--udexColorGrey7, #475E75);--udex-avatar-blue-default-background-color: var(--sapAvatar_6_Background, var(--udexColorBlue2));--udex-avatar-blue-default-border-color: var(--sapAvatar_6_Background, var(--udexColorBlue2));--udex-avatar-blue-default-icon-color: var(--sapAvatar_6_TextColor, var(--udexColorBlue7));--udex-avatar-blue-hover-backgound-color: var(--sapAvatar_6_Background, var(--udexColorBlue2));--udex-avatar-blue-hover-border-color: var(--sapAvatar_6_TextColor, var(--udexColorBlue7));--udex-avatar-blue-hover-icon-color: var(--sapAvatar_6_TextColor, var(--udexColorBlue7));--udex-avatar-mango-default-background-color: var(--sapAvatar_1_Background, var(--udexColorMango2));--udex-avatar-mango-default-border-color: var(--sapAvatar_1_Background, var(--udexColorMango2));--udex-avatar-mango-default-icon-color: var(--sapAvatar_1_TextColor, var(--udexColorMango7));--udex-avatar-mango-hover-backgound-color: var(--sapAvatar_1_Background, var(--udexColorMango2));--udex-avatar-mango-hover-border-color: var(--sapAvatar_1_TextColor, var(--udexColorMango7));--udex-avatar-mango-hover-icon-color: var(--sapAvatar_1_TextColor, var(--udexColorMango7));--udex-avatar-red-default-background-color: var(--sapAvatar_2_Background, var(--udexColorRed2));--udex-avatar-red-default-border-color: var(--sapAvatar_2_Background, var(--udexColorRed2));--udex-avatar-red-default-icon-color: var(--sapAvatar_2_TextColor, var(--udexColorRed7));--udex-avatar-red-hover-backgound-color: var(--sapAvatar_2_Background, var(--udexColorRed2));--udex-avatar-red-hover-border-color: var(--sapAvatar_2_TextColor, var(--udexColorRed7));--udex-avatar-red-hover-icon-color: var(--sapAvatar_2_TextColor, var(--udexColorRed7));--udex-avatar-raspberry-default-background-color: var(--sapAvatar_3_Background, var(--udexColorRaspberry2));--udex-avatar-raspberry-default-border-color: var(--sapAvatar_3_Background, var(--udexColorRaspberry2));--udex-avatar-raspberry-default-icon-color: var(--sapAvatar_3_TextColor, var(--udexColorRaspberry7));--udex-avatar-raspberry-hover-backgound-color: var(--sapAvatar_3_Background, var(--udexColorRaspberry2));--udex-avatar-raspberry-hover-border-color: var(--sapAvatar_3_TextColor, var(--udexColorRaspberry7));--udex-avatar-raspberry-hover-icon-color: var(--sapAvatar_3_TextColor, var(--udexColorRaspberry7));--udex-avatar-pink-default-background-color: var(--sapAvatar_4_Background, var(--udexColorPink2));--udex-avatar-pink-default-border-color: var(--sapAvatar_4_Background, var(--udexColorPink2));--udex-avatar-pink-default-icon-color: var(--sapAvatar_4_TextColor, var(--udexColorPink7));--udex-avatar-pink-hover-backgound-color: var(--sapAvatar_4_Background, var(--udexColorPink2));--udex-avatar-pink-hover-border-color: var(--sapAvatar_4_TextColor, var(--udexColorPink7));--udex-avatar-pink-hover-icon-color: var(--sapAvatar_4_TextColor, var(--udexColorPink7));--udex-avatar-indigo-default-background-color: var(--sapAvatar_5_Background, var(--udexColorIndigo2));--udex-avatar-indigo-default-border-color: var(--sapAvatar_5_Background, var(--udexColorIndigo2));--udex-avatar-indigo-default-icon-color: var(--sapAvatar_5_TextColor, var(--udexColorIndigo7));--udex-avatar-indigo-hover-backgound-color: var(--sapAvatar_5_Background, var(--udexColorIndigo2));--udex-avatar-indigo-hover-border-color: var(--sapAvatar_5_TextColor, var(--udexColorIndigo7));--udex-avatar-indigo-hover-icon-color: var(--sapAvatar_5_TextColor, var(--udexColorIndigo7));--udex-avatar-teal-default-background-color: var(--sapAvatar_7_Background, var(--udexColorTeal2));--udex-avatar-teal-default-border-color: var(--sapAvatar_7_Background, var(--udexColorTeal2));--udex-avatar-teal-default-icon-color: var(--sapAvatar_7_TextColor, var(--udexColorTeal7));--udex-avatar-teal-hover-backgound-color: var(--sapAvatar_7_Background, var(--udexColorTeal2));--udex-avatar-teal-hover-border-color: var(--sapAvatar_7_TextColor, var(--udexColorTeal7));--udex-avatar-teal-hover-icon-color: var(--sapAvatar_7_TextColor, var(--udexColorTeal7));--udex-avatar-green-default-background-color: var(--sapAvatar_8_Background, var(--udexColorGreen2));--udex-avatar-green-default-border-color: var(--sapAvatar_8_Background, var(--udexColorGreen2));--udex-avatar-green-default-icon-color: var(--sapAvatar_8_TextColor, var(--udexColorGreen7));--udex-avatar-green-hover-backgound-color: var(--sapAvatar_8_Background, var(--udexColorGreen2));--udex-avatar-green-hover-border-color: var(--sapAvatar_8_TextColor, var(--udexColorGreen7));--udex-avatar-green-hover-icon-color: var(--sapAvatar_8_TextColor, var(--udexColorGreen7));--udex-avatar-grey-default-background-color: var(--sapAvatar_9_Background, var(--udexColorGrey2));--udex-avatar-grey-default-border-color: var(--sapAvatar_9_Background, var(--udexColorGrey2));--udex-avatar-grey-default-icon-color: var(--sapAvatar_9_TextColor, var(--udexColorGrey7));--udex-avatar-grey-hover-backgound-color: var(--sapAvatar_9_Background, var(--udexColorGrey2));--udex-avatar-grey-hover-border-color: var(--sapAvatar_9_TextColor, var(--udexColorGrey7));--udex-avatar-grey-hover-icon-color: var(--sapAvatar_9_TextColor, var(--udexColorGrey7));--udex-avatar-transparent-default-background-color: hsla(0, 0%, 0%, 0);--udex-avatar-transparent-default-border-color: hsla(0, 0%, 0%, 0);--udex-avatar-transparent-default-icon-color: var(--udexColorGrey9, #223548);--udex-avatar-transparent-hover-backgound-color: hsla(0, 0%, 0%, 0);--udex-avatar-transparent-hover-border-color: var(--udexColorGrey9, #223548);--udex-avatar-transparent-hover-icon-color: var(--udexColorGrey9, #223548);--udex-avatar-neutral-default-background-color: var(--sapAvatar_10_Background, var(--udexColorNeuturalWhite));--udex-avatar-neutral-default-border-color: var(--sapAvatar_10_BorderColor, var(--udexColorGrey3));--udex-avatar-neutral-default-icon-color: var(--sapAvatar_10_TextColor , #0070F2);--udex-avatar-neutral-hover-backgound-color: var(--sapAvatar_10_Background, var(--udexColorNeuturalWhite));--udex-avatar-neutral-hover-border-color: var(, var(--udexColorGrey5, #8396a8));--udex-avatar-neutral-hover-icon-color: var(--sapAvatar_10_TextColor, #0070F2);--udex-avatar-neutral-active-border-color: var(--udexColorBlue9, #0040B0);--udex-avatar-neutral-active-background-color: var(--sapAvatar_10_Background, var(--udexColorNeuturalWhite));--udex-avatar-neutral-active-icon-color: var(--udexColorBlue9, #0040B0)}:host{font-family:var(--sapFontFamily, sans-serif);font-size:var(--sapFontSize, 16px);display:inline-block}:host([interactive]) .udex-avatar:hover{box-shadow:none}:host([color-scheme]) .udex-avatar.udex-avatar--with-image{background-color:#0000;border-color:var(--udex-avatar-image-default-border-color)}:host([color-scheme][interactive]) .udex-avatar.udex-avatar--with-image:hover{border-color:var(--udex-avatar-image-hover-border-color);background-color:#0000}.udex-avatar ::slotted([slot="badge"]){display:flex;justify-content:center;align-items:center}:host([size="XS"]) .udex-avatar ::slotted([slot="badge"]){width:var(--udex-avatar-badge-size-background-xs-and-s-and-m);height:var(--udex-avatar-badge-size-background-xs-and-s-and-m);font-size:var(--udex-avatar-badge-size-icon-xs-and-s-and-m);padding:3px}:host([size="S"]) .udex-avatar ::slotted([slot="badge"]){width:var(--udex-avatar-badge-size-background-xs-and-s-and-m);height:var(--udex-avatar-badge-size-background-xs-and-s-and-m);font-size:var(--udex-avatar-badge-size-icon-xs-and-s-and-m);padding:3px}:host([size="M"]) .udex-avatar ::slotted([slot="badge"]){width:var(--udex-avatar-badge-size-background-xs-and-s-and-m);height:var(--udex-avatar-badge-size-background-xs-and-s-and-m);font-size:var(--udex-avatar-badge-size-icon-xs-and-s-and-m);padding:3px}:host([size="L"]) .udex-avatar ::slotted([slot="badge"]){width:var(--udex-avatar-badge-size-background-l);height:var(--udex-avatar-badge-size-background-l);font-size:var(--udex-avatar-badge-size-icon-l);padding:3px}:host([size="XL"]) .udex-avatar ::slotted([slot="badge"]){width:var(--udex-avatar-badge-size-background-xl);height:var(--udex-avatar-badge-size-background-xl);font-size:var(--udex-avatar-badge-size-icon-xl);padding:6px}:host([size="XS"]) .udex-avatar{width:var(--udex-avatar-size-xs);height:var(--udex-avatar-size-xs);font-size:var(--udex-avatar-font-size-xs)}:host([size="XS"][icon]) .udex-avatar{font-size:var(--udex-avatar-icon-size-xs)}:host([size="S"]) .udex-avatar{width:var(--udex-avatar-size-s);height:var(--udex-avatar-size-s);font-size:var(--udex-avatar-font-size-s)}:host([size="S"][icon]) .udex-avatar{font-size:var(--udex-avatar-icon-size-s)}:host([size="M"]) .udex-avatar{width:var(--udex-avatar-size-m);height:var(--udex-avatar-size-m);font-size:var(--udex-avatar-font-size-m)}:host([size="M"][icon]) .udex-avatar{font-size:var(--udex-avatar-icon-size-m)}:host([size="L"]) .udex-avatar{width:var(--udex-avatar-size-l);height:var(--udex-avatar-size-l);font-size:var(--udex-avatar-font-size-l)}:host([size="L"][icon]) .udex-avatar{font-size:var(--udex-avatar-icon-size-l)}:host([size="XL"]) .udex-avatar{width:var(--udex-avatar-size-xl);height:var(--udex-avatar-size-xl);font-size:var(--udex-avatar-font-size-xl)}:host([size="XL"][icon]) .udex-avatar{font-size:var(--udex-avatar-icon-size-xl)}:host([size="XS"][shape="Square"]) .udex-avatar{border-radius:var(--udex-avatar-radius-xs)}:host([size="XS"][shape="Square"]) .udex-avatar ::slotted(*:not([slot="badge"])){border-radius:var(--udex-avatar-radius-xs)}:host([size="S"][shape="Square"]) .udex-avatar{border-radius:var(--udex-avatar-radius-s)}:host([size="S"][shape="Square"]) .udex-avatar ::slotted(*:not([slot="badge"])){border-radius:var(--udex-avatar-radius-s)}:host([size="M"][shape="Square"]) .udex-avatar{border-radius:var(--udex-avatar-radius-m)}:host([size="M"][shape="Square"]) .udex-avatar ::slotted(*:not([slot="badge"])){border-radius:var(--udex-avatar-radius-m)}:host([size="L"][shape="Square"]) .udex-avatar{border-radius:var(--udex-avatar-radius-l)}:host([size="L"][shape="Square"]) .udex-avatar ::slotted(*:not([slot="badge"])){border-radius:var(--udex-avatar-radius-l)}:host([size="XL"][shape="Square"]) .udex-avatar{border-radius:var(--udex-avatar-radius-xl)}:host([size="XL"][shape="Square"]) .udex-avatar ::slotted(*:not([slot="badge"])){border-radius:var(--udex-avatar-radius-xl)}:host([color-scheme="Blue"]) .udex-avatar{background-color:var(--udex-avatar-blue-default-background-color);color:var(--udex-avatar-blue-default-icon-color);border-color:var(--udex-avatar-blue-default-border-color)}:host([color-scheme="Blue"][interactive]) .udex-avatar:hover{background-color:var(--udex-avatar-blue-default-background-color);border-color:var(--udex-avatar-blue-hover-border-color);color:var(--udex-avatar-blue-default-icon-color)}:host([color-scheme="Mango"]) .udex-avatar{background-color:var(--udex-avatar-mango-default-background-color);color:var(--udex-avatar-mango-default-icon-color);border-color:var(--udex-avatar-mango-default-border-color)}:host([color-scheme="Mango"][interactive]) .udex-avatar:hover{background-color:var(--udex-avatar-mango-default-background-color);border-color:var(--udex-avatar-mango-hover-border-color);color:var(--udex-avatar-mango-default-icon-color)}:host([disabled]) .udex-avatar:hover{border:0}:host([color-scheme="Red"]) .udex-avatar{background-color:var(--udex-avatar-red-default-background-color);color:var(--udex-avatar-red-default-icon-color);border-color:var(--udex-avatar-red-default-border-color)}:host([color-scheme="Red"][interactive]) .udex-avatar:hover{background-color:var(--udex-avatar-red-default-background-color);border-color:var(--udex-avatar-red-hover-border-color);color:var(--udex-avatar-red-default-icon-color)}:host([color-scheme="Raspberry"]) .udex-avatar{background-color:var(--udex-avatar-raspberry-default-background-color);color:var(--udex-avatar-raspberry-default-icon-color);border-color:var(--udex-avatar-raspberry-default-border-color)}:host([color-scheme="Raspberry"][interactive]) .udex-avatar:hover{background-color:var(--udex-avatar-raspberry-default-background-color);border-color:var(--udex-avatar-raspberry-hover-border-color);color:var(--udex-avatar-raspberry-default-icon-color)}:host([color-scheme="Pink"]) .udex-avatar{background-color:var(--udex-avatar-pink-default-background-color);color:var(--udex-avatar-pink-default-icon-color);border-color:var(--udex-avatar-pink-default-border-color)}:host([color-scheme="Pink"][interactive]) .udex-avatar:hover{background-color:var(--udex-avatar-pink-default-background-color);border-color:var(--udex-avatar-pink-hover-border-color);color:var(--udex-avatar-pink-default-icon-color)}:host([color-scheme="Indigo"]) .udex-avatar{background-color:var(--udex-avatar-indigo-default-background-color);color:var(--udex-avatar-indigo-default-icon-color);border-color:var(--udex-avatar-indigo-default-border-color)}:host([color-scheme="Indigo"][interactive]) .udex-avatar:hover{background-color:var(--udex-avatar-indigo-default-background-color);border-color:var(--udex-avatar-indigo-hover-border-color);color:var(--udex-avatar-indigo-default-icon-color)}:host([color-scheme="Teal"]) .udex-avatar{background-color:var(--udex-avatar-teal-default-background-color);color:var(--udex-avatar-teal-default-icon-color);border-color:var(--udex-avatar-teal-default-border-color)}:host([color-scheme="Teal"][interactive]) .udex-avatar:hover{background-color:var(--udex-avatar-teal-default-background-color);border-color:var(--udex-avatar-teal-hover-border-color);color:var(--udex-avatar-teal-default-icon-color)}:host([color-scheme="Green"]) .udex-avatar{background-color:var(--udex-avatar-green-default-background-color);color:var(--udex-avatar-green-default-icon-color);border-color:var(--udex-avatar-green-default-border-color)}:host([color-scheme="Green"][interactive]) .udex-avatar:hover{background-color:var(--udex-avatar-green-default-background-color);border-color:var(--udex-avatar-green-hover-border-color);color:var(--udex-avatar-green-default-icon-color)}:host([color-scheme="Grey"]) .udex-avatar{background-color:var(--udex-avatar-grey-default-background-color);color:var(--udex-avatar-grey-default-icon-color);border-color:var(--udex-avatar-grey-default-border-color)}:host([color-scheme="Grey"][interactive]) .udex-avatar:hover{background-color:var(--udex-avatar-grey-default-background-color);border-color:var(--udex-avatar-grey-hover-border-color);color:var(--udex-avatar-grey-default-icon-color)}:host([color-scheme="Transparent"]) .udex-avatar{background-color:var(--udex-avatar-transparent-default-background-color);color:var(--udex-avatar-transparent-default-icon-color);border-color:var(--udex-avatar-transparent-default-border-color)}:host([color-scheme="Transparent"][interactive]) .udex-avatar:hover{background-color:var(--udex-avatar-transparent-default-background-color);border-color:var(--udex-avatar-transparent-hover-border-color);color:var(--udex-avatar-transparent-default-icon-color)}:host([color-scheme="Neutral"]) .udex-avatar{background-color:var(--udex-avatar-neutral-default-background-color);color:var(--udex-avatar-neutral-default-icon-color);border-color:var(--udex-avatar-neutral-default-border-color)}:host([color-scheme="Neutral"][interactive]) .udex-avatar:hover{background-color:var(--udex-avatar-neutral-default-background-color);border-color:var(--udex-avatar-neutral-hover-border-color);color:var(--udex-avatar-neutral-default-icon-color)}:host([interactive]:not([hidden])) .udex-avatar:active,:host([interactive]:not([hidden])) .udex-avatar.udex-avatar--with-image:active{border-color:var(--udex-avatar-neutral-active-border-color);background-color:var(--udex-avatar-neutral-active-background-color);color:var(--udex-avatar-neutral-active-icon-color)}
` };
var s = function(a, r, e, o) {
  var v = arguments.length, d = v < 3 ? r : o === null ? o = Object.getOwnPropertyDescriptor(r, e) : o, h;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    d = Reflect.decorate(a, r, e, o);
  else
    for (var x = a.length - 1; x >= 0; x--)
      (h = a[x]) && (d = (v < 3 ? h(d) : v > 3 ? h(r, e, d) : h(r, e)) || d);
  return v > 3 && d && Object.defineProperty(r, e, d), d;
}, m;
(function(a) {
  a.Mango = "Mango", a.Red = "Red", a.Raspberry = "Raspberry", a.Pink = "Pink", a.Indigo = "Indigo", a.Blue = "Blue", a.Teal = "Teal", a.Green = "Green", a.Grey = "Grey", a.Transparent = "Transparent", a.Neutral = "Neutral";
})(m || (m = {}));
var k;
(function(a) {
  a.Circle = "Circle", a.Square = "Square";
})(k || (k = {}));
var z;
(function(a) {
  a.XS = "XS", a.S = "S", a.M = "M", a.L = "L", a.XL = "XL";
})(z || (z = {}));
const $a = {
  Mango: "Accent1",
  Red: "Accent2",
  Raspberry: "Accent3",
  Pink: "Accent4",
  Indigo: "Accent5",
  Blue: "Accent6",
  Teal: "Accent7",
  Green: "Accent8",
  Grey: "Accent10",
  Transparent: "Accent6",
  Neutral: "Accent6"
};
let l = class extends G {
  get getUI5AvatarColorScheme() {
    return $a[this.colorScheme];
  }
  get imageSlot() {
    return !!this.image.length;
  }
  get badgeSlot() {
    return !!this.badge.length;
  }
  get udexAvatarClass() {
    let r = "udex-avatar";
    return this.imageSlot && (r += " udex-avatar--with-image"), r;
  }
};
s([
  i({ type: String, defaultValue: "" })
], l.prototype, "initials", void 0);
s([
  i({ type: Boolean })
], l.prototype, "interactive", void 0);
s([
  i({ type: String, defaultValue: "" })
], l.prototype, "accessibleName", void 0);
s([
  i({ type: m, defaultValue: m.Blue })
], l.prototype, "colorScheme", void 0);
s([
  i({ type: Boolean })
], l.prototype, "disabled", void 0);
s([
  i({ type: String, defaultValue: "" })
], l.prototype, "fallbackIcon", void 0);
s([
  i({ type: String, defaultValue: "" })
], l.prototype, "icon", void 0);
s([
  i({ type: k, defaultValue: k.Circle })
], l.prototype, "shape", void 0);
s([
  i({ type: z, defaultValue: z.S })
], l.prototype, "size", void 0);
s([
  C({ type: HTMLElement, default: !0 })
], l.prototype, "image", void 0);
s([
  C({ type: HTMLElement })
], l.prototype, "badge", void 0);
l = s([
  D({
    tag: "udex-avatar",
    renderer: N,
    styles: Ta,
    template: Ca
  })
], l);
l.define();
