import { e as _, l as u, s as k, a as B, b as j, j as O, p as n, d as I, f as P, k as S, U as M, m as F, n as V, o as G, q as A, t as U, u as J, g as T, v as w, w as z, x as Y, h as L, I as q, y as E, c as X } from "./parameters-bundle.css-Bbg-m5ef.js";
import { B as Z, a as K, b as Q } from "./i18n-defaults-BEqZgmok.js";
const oo = (t) => {
  const o = t;
  return o.accessibleNameRef ? to(t) : o.accessibleName ? o.accessibleName : void 0;
}, to = (t) => {
  var c;
  const o = ((c = t.accessibleNameRef) == null ? void 0 : c.split(" ")) ?? [], e = t.getRootNode();
  let i = "";
  return o.forEach((d, s) => {
    const l = e.querySelector(`[id='${d}']`), C = `${l && l.textContent ? l.textContent : ""}`;
    C && (i += C, s < o.length - 1 && (i += " "));
  }), i;
}, eo = /* @__PURE__ */ new WeakMap(), v = (t, o) => {
  eo.set(t, o);
}, ro = (t) => Array.from(t).filter((o) => o.nodeType !== Node.COMMENT_NODE && (o.nodeType !== Node.TEXT_NODE || (o.nodeValue || "").trim().length !== 0)).length > 0;
var m;
(function(t) {
  t.Default = "Default", t.Positive = "Positive", t.Negative = "Negative", t.Transparent = "Transparent", t.Emphasized = "Emphasized", t.Attention = "Attention";
})(m || (m = {}));
const x = m;
var y;
(function(t) {
  t.Button = "Button", t.Submit = "Submit", t.Reset = "Reset";
})(y || (y = {}));
const p = y;
var f;
(function(t) {
  t.Button = "Button", t.Link = "Link";
})(f || (f = {}));
const R = f;
function ao(t, o, e) {
  return _`<button type="button" class="ui5-button-root" ?disabled="${this.disabled}" data-sap-focus-ref  @focusout=${this._onfocusout} @focusin=${this._onfocusin} @click=${this._onclick} @mousedown=${this._onmousedown} @mouseup=${this._onmouseup} @keydown=${this._onkeydown} @keyup=${this._onkeyup} @touchstart="${this._ontouchstart}" @touchend="${this._ontouchend}" tabindex=${u(this.tabIndexValue)} aria-expanded="${u(this.accessibilityAttributes.expanded)}" aria-controls="${u(this.accessibilityAttributes.controls)}" aria-haspopup="${u(this._hasPopup)}" aria-label="${u(this.ariaLabelText)}" title="${u(this.buttonTitle)}" part="button" role="${u(this.buttonAccessibleRole)}">${this.icon ? no.call(this, t, o, e) : void 0}<span id="${u(this._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${this.hasButtonType ? io.call(this, t, o, e) : void 0}</button> `;
}
function no(t, o, e) {
  return e ? _`<${k("ui5-icon", o, e)} class="ui5-button-icon" name="${u(this.icon)}" accessible-role="${u(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></${k("ui5-icon", o, e)}>` : _`<ui5-icon class="ui5-button-icon" name="${u(this.icon)}" accessible-role="${u(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></ui5-icon>`;
}
function io(t, o, e) {
  return _`<span class="ui5-hidden-text">${u(this.buttonTypeText)}</span>`;
}
var N;
(function(t) {
  t.Dialog = "Dialog", t.Grid = "Grid", t.ListBox = "ListBox", t.Menu = "Menu", t.Tree = "Tree";
})(N || (N = {}));
B("@ui5/webcomponents-theming", "sap_horizon", async () => j);
B("@ui5/webcomponents", "sap_horizon", async () => O);
const uo = { packageName: "@ui5/webcomponents", fileName: "themes/Button.css.ts", content: `:host{vertical-align:middle}.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5-v1-24-0_button_base_min_width);height:var(--_ui5-v1-24-0_button_base_height);line-height:normal;font-family:var(--_ui5-v1-24-0_button_fontFamily);font-size:var(--sapFontSize);text-shadow:var(--_ui5-v1-24-0_button_text_shadow);border-radius:var(--_ui5-v1-24-0_button_border_radius);cursor:pointer;background-color:var(--sapButton_Background);border:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);color:var(--sapButton_TextColor);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui5-button-root{min-width:inherit;cursor:inherit;height:100%;width:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;outline:none;padding:0 var(--_ui5-v1-24-0_button_base_padding);position:relative;background:transparent;border:none;color:inherit;text-shadow:inherit;font:inherit;white-space:inherit;overflow:inherit;text-overflow:inherit;letter-spacing:inherit;word-spacing:inherit;line-height:inherit;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host(:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host(:not([hidden]):not([disabled]).ui5_hovered){background:var(--sapButton_Hover_Background);border:1px solid var(--sapButton_Hover_BorderColor);color:var(--sapButton_Hover_TextColor)}.ui5-button-icon{color:inherit;flex-shrink:0}:host([icon-end]) .ui5-button-root{flex-direction:row-reverse}:host([icon-end]) .ui5-button-icon{margin-inline-start:var(--_ui5-v1-24-0_button_base_icon_margin)}:host([icon-only]) .ui5-button-root{min-width:auto;padding:0}:host([icon-only]) .ui5-button-text{display:none}.ui5-button-text{outline:none;position:relative;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([has-icon]:not([icon-end])) .ui5-button-text{margin-inline-start:var(--_ui5-v1-24-0_button_base_icon_margin)}:host([has-icon][icon-end]) .ui5-button-text{margin-inline-start:0}:host([disabled]){opacity:var(--sapContent_DisabledOpacity);pointer-events:unset;cursor:default}:host([has-icon]:not([icon-only])) .ui5-button-text{min-width:calc(var(--_ui5-v1-24-0_button_base_min_width) - var(--_ui5-v1-24-0_button_base_icon_margin) - 1rem)}:host([disabled]:active){pointer-events:none}:host([focused]:not([active])) .ui5-button-root:after,:host([focused][active][design="Emphasized"]) .ui5-button-root:after,:host([focused][active]) .ui5-button-root:before{content:"";position:absolute;box-sizing:border-box;inset:.0625rem;border:var(--_ui5-v1-24-0_button_focused_border);border-radius:var(--_ui5-v1-24-0_button_focused_border_radius)}:host([focused][active]) .ui5-button-root:before{border-color:var(--_ui5-v1-24-0_button_pressed_focused_border_color)}:host([design="Emphasized"][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-24-0_button_emphasized_focused_border_color)}:host([design="Emphasized"][focused]) .ui5-button-root:before{content:"";position:absolute;box-sizing:border-box;inset:.0625rem;border:var(--_ui5-v1-24-0_button_emphasized_focused_border_before);border-radius:var(--_ui5-v1-24-0_button_focused_border_radius)}.ui5-button-root::-moz-focus-inner{border:0}bdi{display:block;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([ui5-button][active]:not([disabled]):not([non-interactive])){background-image:none;background-color:var(--sapButton_Active_Background);border-color:var(--sapButton_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([design="Positive"]){background-color:var(--sapButton_Accept_Background);border-color:var(--sapButton_Accept_BorderColor);color:var(--sapButton_Accept_TextColor)}:host([design="Positive"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Positive"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Accept_Hover_Background);border-color:var(--sapButton_Accept_Hover_BorderColor);color:var(--sapButton_Accept_Hover_TextColor)}:host([ui5-button][design="Positive"][active]:not([non-interactive])){background-color:var(--sapButton_Accept_Active_Background);border-color:var(--sapButton_Accept_Active_BorderColor);color:var(--sapButton_Accept_Active_TextColor)}:host([design="Negative"]){background-color:var(--sapButton_Reject_Background);border-color:var(--sapButton_Reject_BorderColor);color:var(--sapButton_Reject_TextColor)}:host([design="Negative"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Negative"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Reject_Hover_Background);border-color:var(--sapButton_Reject_Hover_BorderColor);color:var(--sapButton_Reject_Hover_TextColor)}:host([ui5-button][design="Negative"][active]:not([non-interactive])){background-color:var(--sapButton_Reject_Active_Background);border-color:var(--sapButton_Reject_Active_BorderColor);color:var(--sapButton_Reject_Active_TextColor)}:host([design="Attention"]){background-color:var(--sapButton_Attention_Background);border-color:var(--sapButton_Attention_BorderColor);color:var(--sapButton_Attention_TextColor)}:host([design="Attention"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Attention"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Attention_Hover_Background);border-color:var(--sapButton_Attention_Hover_BorderColor);color:var(--sapButton_Attention_Hover_TextColor)}:host([ui5-button][design="Attention"][active]:not([non-interactive])){background-color:var(--sapButton_Attention_Active_Background);border-color:var(--sapButton_Attention_Active_BorderColor);color:var(--sapButton_Attention_Active_TextColor)}:host([design="Emphasized"]){background-color:var(--sapButton_Emphasized_Background);border-color:var(--sapButton_Emphasized_BorderColor);border-width:var(--_ui5-v1-24-0_button_emphasized_border_width);color:var(--sapButton_Emphasized_TextColor);font-family:var(--sapFontBoldFamily )}:host([design="Emphasized"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Emphasized"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Emphasized_Hover_Background);border-color:var(--sapButton_Emphasized_Hover_BorderColor);border-width:var(--_ui5-v1-24-0_button_emphasized_border_width);color:var(--sapButton_Emphasized_Hover_TextColor)}:host([ui5-button][design="Empasized"][active]:not([non-interactive])){background-color:var(--sapButton_Emphasized_Active_Background);border-color:var(--sapButton_Emphasized_Active_BorderColor);color:var(--sapButton_Emphasized_Active_TextColor)}:host([design="Emphasized"][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-24-0_button_emphasized_focused_border_color);outline:none}:host([design="Emphasized"][focused][active]:not([non-interactive])) .ui5-button-root:after{border-color:var(--_ui5-v1-24-0_button_emphasized_focused_active_border_color)}:host([design="Transparent"]){background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);border-color:var(--sapButton_Lite_BorderColor)}:host([design="Transparent"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Transparent"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Lite_Hover_Background);border-color:var(--sapButton_Lite_Hover_BorderColor);color:var(--sapButton_Lite_Hover_TextColor)}:host([ui5-button][design="Transparent"][active]:not([non-interactive])){background-color:var(--sapButton_Lite_Active_Background);border-color:var(--sapButton_Lite_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([ui5-segmented-button-item][active][focused]) .ui5-button-root:after,:host([pressed][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-24-0_button_pressed_focused_border_color);outline:none}:host([ui5-segmented-button-item][focused]:not(:last-child)) .ui5-button-root:after{border-top-right-radius:var(--_ui5-v1-24-0_button_focused_inner_border_radius);border-bottom-right-radius:var(--_ui5-v1-24-0_button_focused_inner_border_radius)}:host([ui5-segmented-button-item][focused]:not(:first-child)) .ui5-button-root:after{border-top-left-radius:var(--_ui5-v1-24-0_button_focused_inner_border_radius);border-bottom-left-radius:var(--_ui5-v1-24-0_button_focused_inner_border_radius)}
` };
var a = function(t, o, e, i) {
  var c = arguments.length, d = c < 3 ? o : i === null ? i = Object.getOwnPropertyDescriptor(o, e) : i, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    d = Reflect.decorate(t, o, e, i);
  else
    for (var l = t.length - 1; l >= 0; l--)
      (s = t[l]) && (d = (c < 3 ? s(d) : c > 3 ? s(o, e, d) : s(o, e)) || d);
  return c > 3 && d && Object.defineProperty(o, e, d), d;
}, g;
let W = !1, b = null, r = g = class extends M {
  constructor() {
    super(), this._deactivate = () => {
      b && b._setActiveState(!1);
    }, W || (document.addEventListener("mouseup", this._deactivate), W = !0);
    const o = (e) => {
      v(e, "button"), !this.nonInteractive && this._setActiveState(!0);
    };
    this._ontouchstart = {
      handleEvent: o,
      passive: !0
    };
  }
  onEnterDOM() {
    this._isTouch = (F() || V()) && !G();
  }
  async onBeforeRendering() {
    const o = A("FormSupport");
    this.type !== p.Button && !o && console.warn('In order for the "type" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";'), this.submits && !o && console.warn('In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";'), this.iconOnly = this.isIconOnly, this.hasIcon = !!this.icon, this.buttonTitle = this.tooltip || await U(this.icon);
  }
  _onclick(o) {
    var i;
    if (this.nonInteractive)
      return;
    v(o, "button");
    const e = A("FormSupport");
    e && this._isSubmit && e.triggerFormSubmit(this), e && this._isReset && e.triggerFormReset(this), J() && ((i = this.getDomRef()) == null || i.focus());
  }
  _onmousedown(o) {
    this.nonInteractive || this._isTouch || (v(o, "button"), this._setActiveState(!0), b = this);
  }
  _ontouchend(o) {
    this.disabled && (o.preventDefault(), o.stopPropagation()), this.active && this._setActiveState(!1), b && b._setActiveState(!1);
  }
  _onmouseup(o) {
    v(o, "button");
  }
  _onkeydown(o) {
    v(o, "button"), (T(o) || w(o)) && this._setActiveState(!0);
  }
  _onkeyup(o) {
    (T(o) || w(o)) && this.active && this._setActiveState(!1);
  }
  _onfocusout() {
    this.nonInteractive || (this.active && this._setActiveState(!1), z() && (this.focused = !1));
  }
  _onfocusin(o) {
    this.nonInteractive || (v(o, "button"), z() && (this.focused = !0));
  }
  _setActiveState(o) {
    this.fireEvent("_active-state-change", null, !0) && (this.active = o);
  }
  get _hasPopup() {
    var o;
    return (o = this.accessibilityAttributes.hasPopup) == null ? void 0 : o.toLowerCase();
  }
  get hasButtonType() {
    return this.design !== x.Default && this.design !== x.Transparent;
  }
  get iconRole() {
    return this.icon ? "presentation" : "";
  }
  get isIconOnly() {
    return !ro(this.text);
  }
  static typeTextMappings() {
    return {
      Positive: Z,
      Negative: K,
      Emphasized: Q
    };
  }
  get buttonTypeText() {
    return g.i18nBundle.getText(g.typeTextMappings()[this.design]);
  }
  get buttonAccessibleRole() {
    return this.accessibleRole.toLowerCase();
  }
  get tabIndexValue() {
    const o = this.getAttribute("tabindex");
    return o || (this.nonInteractive ? "-1" : this.forcedTabIndex);
  }
  get showIconTooltip() {
    return this.iconOnly && !this.tooltip;
  }
  get ariaLabelText() {
    return oo(this);
  }
  get _isSubmit() {
    return this.type === p.Submit || this.submits;
  }
  get _isReset() {
    return this.type === p.Reset;
  }
  static async onDefine() {
    g.i18nBundle = await Y("@ui5/webcomponents");
  }
};
a([
  n({ type: x, defaultValue: x.Default })
], r.prototype, "design", void 0);
a([
  n({ type: Boolean })
], r.prototype, "disabled", void 0);
a([
  n()
], r.prototype, "icon", void 0);
a([
  n({ type: Boolean })
], r.prototype, "iconEnd", void 0);
a([
  n({ type: Boolean })
], r.prototype, "submits", void 0);
a([
  n()
], r.prototype, "tooltip", void 0);
a([
  n({ defaultValue: void 0 })
], r.prototype, "accessibleName", void 0);
a([
  n({ defaultValue: "" })
], r.prototype, "accessibleNameRef", void 0);
a([
  n({ type: Object })
], r.prototype, "accessibilityAttributes", void 0);
a([
  n({ type: p, defaultValue: p.Button })
], r.prototype, "type", void 0);
a([
  n({ type: R, defaultValue: R.Button })
], r.prototype, "accessibleRole", void 0);
a([
  n({ type: Boolean })
], r.prototype, "active", void 0);
a([
  n({ type: Boolean })
], r.prototype, "iconOnly", void 0);
a([
  n({ type: Boolean })
], r.prototype, "focused", void 0);
a([
  n({ type: Boolean })
], r.prototype, "hasIcon", void 0);
a([
  n({ type: Boolean })
], r.prototype, "nonInteractive", void 0);
a([
  n({ noAttribute: !0 })
], r.prototype, "buttonTitle", void 0);
a([
  n({ type: Object })
], r.prototype, "_iconSettings", void 0);
a([
  n({ defaultValue: "0", noAttribute: !0 })
], r.prototype, "forcedTabIndex", void 0);
a([
  n({ type: Boolean })
], r.prototype, "_isTouch", void 0);
a([
  I({ type: Node, default: !0 })
], r.prototype, "text", void 0);
r = g = a([
  P({
    tag: "ui5-button",
    languageAware: !0,
    renderer: L,
    template: ao,
    styles: uo,
    dependencies: [q]
  }),
  S("click"),
  S("_active-state-change")
], r);
r.define();
const $ = r, H = async (t) => {
  let o;
  if (t === "SAP-icons-v5" ? o = (await import(
    /* webpackChunkName: "ui5-webcomponents-sap-icons-v5" */
    "./SAP-icons-DWInTI4p.js"
  )).default : o = (await import(
    /* webpackChunkName: "ui5-webcomponents-sap-icons-v4" */
    "./SAP-icons-3qXgW2P0.js"
  )).default, typeof o == "string" && o.endsWith(".json"))
    throw new Error('[icons] Invalid bundling detected - dynamic JSON imports bundled as URLs. Switch to inlining JSON files from the build or use `import "@ui5/webcomponents-icons/dist/Assets-static.js". Check the "Assets" documentation for more information.');
  return o;
}, co = () => {
  E("SAP-icons-v4", H), E("SAP-icons-v5", H);
};
co();
B("@ui5/webcomponents-theming", "sap_horizon", async () => j);
B("@udex/web-components", "sap_horizon", async () => X);
const so = { packageName: "@udex/web-components", fileName: "themes/Button.css.ts", content: `:host{--udex-button-color-transparent: hsla(0, 0%, 0%, 0);--udex-button-padding-small: 5.5px 10px;--udex-button-padding-medium: 9px 10px;--udex-button-padding-large: 12px 14px;--udex-button-icon-only-padding-small: 6px;--udex-button-icon-only-padding-medium: 10px;--udex-button-icon-only-padding-large: 12px;--udex-button-small-size: 26px;--udex-button-medium-size: 36px;--udex-button-large-size: 42px;--udex-button-icon-s-size: .875rem;--udex-button-icon-m-size: 1 rem;--udex-button-icon-l-size: 1.125rem;--udexTypographyFontWeightMedium: 500;--udex-button-color-primary-standard-default-background: var(--sapButton_Emphasized_Background, var(--udexCorePrimaryAction));--udex-button-color-primary-standard-default-text-and-icon: var(--sapButton_Emphasized_TextColor, var(--udexCoreTextLight));--udex-button-color-primary-standard-hover-background: var(--sapButton_Emphasized_Hover_Background, var(--udexColorBlue9));--udex-button-color-primary-standard-hover-text-and-icon: var(--sapButton_Emphasized_Hover_TextColor, var(--udexCoreTextLight));--udex-button-color-primary-standard-active-background: var(--sapButton_Emphasized_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-primary-standard-active-border: var(--sapButton_Emphasized_Active_BorderColor, var(--udexColorBlue9));--udex-button-color-primary-standard-active-text-and-icon: var(--sapButton_Emphasized_Active_TextColor, var(--udexColorBlue9));--udex-button-color-primary-standard-disabled-background: var(--sapButton_Emphasized_Background, var(--udexColorBlue9));--udex-button-color-primary-standard-disabled-text-and-icon: var(--sapButton_Emphasized_TextColor, var(--udexCoreTextLight));--udex-button-color-primary-toggled-default-background: var(--sapButton_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-primary-toggled-default-border: var(--sapButton_Selected_BorderColor, var(--udexColorBlue9));--udex-button-color-primary-toggled-default-text-and-icon: var(--sapButton_Selected_TextColor, var(--udexColorBlue9));--udex-button-color-primary-toggled-hover-background: var(--sapButton_Selected_Hover_Background, var(--udexColorBlue2));--udex-button-color-primary-toggled-hover-border: var(--sapButton_Selected_Hover_BorderColor, var(--udexColorBlue9));--udex-button-color-primary-toggled-hover-text-and-icon: var(--sapButton_Selected_TextColor, var(--udexColorBlue9));--udex-button-color-primary-toggled-disabled-background: var(--sapButton_Emphasized_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-primary-toggled-disabled-border: var(--sapButton_Emphasized_Active_BorderColor, var(--udexColorBlue9));--udex-button-color-primary-toggled-disabled-text-and-icon: var(--sapButton_Emphasized_Active_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-standard-default-background: var(--sapButton_Background, var(--udexColorNeutralWhite));--udex-button-color-secondary-standard-default-border: var(--sapButton_BorderColor, var(--udexColorGrey7));--udex-button-color-secondary-standard-default-text-and-icon: var(--sapButton_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-standard-hover-background: var(--sapButton_Hover_Background, var(--udexColorGrey2));--udex-button-color-secondary-standard-hover-border: var(--sapButton_Hover_BorderColor, var(--udexColorGrey7));--udex-button-color-secondary-standard-hover-text-and-icon: var(--sapButton_Hover_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-standard-active-background: var(--sapButton_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-secondary-standard-active-border: var(--sapButton_Active_BorderColor, var(--udexColorBlue9));--udex-button-color-secondary-standard-active-text-and-icon: var(--sapButton_Active_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-standard-disabled-background: var(--sapButton_Background, var(--udexColorNeutralWhite));--udex-button-color-secondary-standard-disabled-border: var(--sapButton_BorderColor, var(--udexColorGrey7));--udex-button-color-secondary-standard-disabled-text-and-icon: var(--sapButton_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-toggled-default-background: var(--sapButton_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-secondary-toggled-default-border: var(--sapButton_Selected_BorderColor, var(--udexColorBlue9));--udex-button-color-secondary-toggled-default-text-and-icon: var(--sapButton_Selected_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-toggled-hover-background: var(--sapButton_Selected_Hover_Background, var(--udexColorBlue2));--udex-button-color-secondary-toggled-hover-border: var(--sapButton_Selected_Hover_BorderColor, var(--udexColorBlue9));--udex-button-color-secondary-toggled-hover-text-and-icon: var(--sapButton_Selected_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-toggled-disabled-background: var(--sapButton_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-secondary-toggled-disabled-border: var(--sapButton_Selected_BorderColor, var(--udexColorBlue9));--udex-button-color-secondary-toggled-disabled-text-and-icon: var(--sapButton_Selected_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-standard-default-background: var(--udex-button-color-transparent, hsla(0, 0%, 0%, 0));--udex-button-color-tertiary-standard-default-border: var(--udex-button-color-transparent, hsla(0, 0%, 0%, 0));--udex-button-color-tertiary-standard-default-text-and-icon: var(--sapButton_Lite_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-standard-hover-background: var(--sapButton_Lite_Hover_Background, var(--udexColorGrey2));--udex-button-color-tertiary-standard-hover-border: var(--sapButton_Lite_Hover_BorderColor, var(--udexColorGrey7));--udex-button-color-tertiary-standard-hover-text-and-icon: var(--sapButton_Lite_Hover_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-standard-active-background: var(--sapButton_Lite_Active_Background, var(--udexColorBlue9));--udex-button-color-tertiary-standard-active-border: var(--sapButton_Lite_Active_BorderColor, var(--udexColorNeutralWhite));--udex-button-color-tertiary-standard-active-text-and-icon: var(--sapButton_Lite_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-standard-disabled-background: var(--udex-button-color-transparent, hsla(0, 0%, 0%, 0));--udex-button-color-tertiary-standard-disabled-border: var(--udex-button-color-transparent, hsla(0, 0%, 0%, 0));--udex-button-color-tertiary-standard-disabled-text-and-icon: var(--sapButton_Lite_Disabled_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-toggled-default-background: var(--sapButton_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-tertiary-toggled-default-border: var(--sapButton_Selected_BorderColor, var(--udexColorBlue9));--udex-button-color-tertiary-toggled-default-text-and-icon: var(--sapButton_Selected_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-toggled-hover-background: var(--sapButton_Selected_Hover_Background, var(--udexColorBlue2));--udex-button-color-tertiary-toggled-hover-border: var(--sapButton_Selected_Hover_BorderColor, var(--udexColorBlue9));--udex-button-color-tertiary-toggled-hover-text-and-icon: var(--sapButton_Selected_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-toggled-disabled-background: var(--sapButton_Lite_Background, var(--udexColorNeutralWhite));--udex-button-color-tertiary-toggled-disabled-border: var(--sapButton_Lite_BorderColor, var(--udexColorBlue9));--udex-button-color-tertiary-toggled-disabled-text-and-icon: var(--sapButton_Lite_TextColor, var(--udexColorBlue9));--udex-button-color-positive-standard-default-background: var(--sapButton_Accept_Background, var(--udexCoreSemanticSuccess2));--udex-button-color-positive-standard-default-border: var(--sapButton_Accept_BorderColor, var(--udexCoreSemanticSuccess7));--udex-button-color-positive-standard-default-text-and-icon: var(--sapButton_Accept_TextColor, var(--udexCoreSemanticSuccess8));--udex-button-color-positive-standard-hover-background: var(--sapButton_Accept_Hover_Background, var(--udexCoreSemanticSuccess3));--udex-button-color-positive-standard-hover-border: var(--sapButton_Accept_Hover_BorderColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-standard-hover-text-and-icon: var(--sapButton_Accept_Hover_TextColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-standard-active-background: var(--sapButton_Accept_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-positive-standard-active-border: var(--sapButton_Accept_Active_BorderColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-standard-active-text-and-icon: var(--sapButton_Accept_Active_TextColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-standard-disabled-background: var(--sapButton_Accept_Background, var(--udexCoreSemanticSuccess2));--udex-button-color-positive-standard-disabled-border: var(--sapButton_Accept_BorderColor, var(--udexCoreSemanticSuccess7));--udex-button-color-positive-standard-disabled-text-and-icon: var(--sapButton_Accept_TextColor, var(--udexCoreSemanticSuccess8));--udex-button-color-positive-toggled-default-background: var(--sapButton_Accept_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-positive-toggled-default-border: var(--sapButton_Accept_Selected_BorderColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-toggled-default-text-and-icon: var(--sapButton_Accept_Selected_TextColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-toggled-hover-background: var(--sapButton_Accept_Selected_Hover_Background, var(--udexCoreSemanticSuccess2));--udex-button-color-positive-toggled-hover-border: var(--sapButton_Accept_Selected_Hover_BorderColor, var(--udexCoreSemanticSuccess8));--udex-button-color-positive-toggled-hover-text-and-icon: var(--sapButton_Accept_TextColor, var(--udexCoreSemanticSuccess8));--udex-button-color-positive-toggled-disabled-background: var(--sapButton_Accept_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-positive-toggled-disabled-border: var(--sapButton_Accept_Selected_BorderColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-toggled-disabled-text-and-icon: var(--sapButton_Accept_Selected_TextColor, var(--udexCoreSemanticSuccess10));--udex-button-color-negative-standard-default-background: var(--sapButton_Reject_Background, var(--udexCoreSemanticError2));--udex-button-color-negative-standard-default-border: var(--sapButton_Reject_BorderColor, var(--udexCoreSemanticError7));--udex-button-color-negative-standard-default-text-and-icon: var(--sapButton_Reject_TextColor, var(--udexCoreSemanticError8));--udex-button-color-negative-standard-hover-background: var(--sapButton_Reject_Hover_Background, var(--udexCoreSemanticError3));--udex-button-color-negative-standard-hover-border: var(--sapButton_Reject_Hover_BorderColor, var(--udexCoreSemanticError10));--udex-button-color-negative-standard-hover-text-and-icon: var(--sapButton_Reject_Hover_TextColor, var(--udexCoreSemanticError10));--udex-button-color-negative-standard-active-background: var(--sapButton_Reject_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-negative-standard-active-border: var(--sapButton_Reject_Active_BorderColor, var(--udexCoreSemanticError10));--udex-button-color-negative-standard-active-text-and-icon: var(--sapButton_Reject_Active_TextColor, var(--udexCoreSemanticError10));--udex-button-color-negative-standard-disabled-background: var(--sapButton_Reject_Background, var(--udexCoreSemanticError2));--udex-button-color-negative-standard-disabled-border: var(--sapButton_Reject_BorderColor, var(--udexCoreSemanticError7));--udex-button-color-negative-standard-disabled-text-and-icon: var(--sapButton_Reject_TextColor, var(--udexCoreSemanticError8));--udex-button-color-negative-toggled-default-background: var(--sapButton_Reject_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-negative-toggled-default-border: var(--sapButton_Reject_Selected_BorderColor, var(--udexCoreSemanticError10));--udex-button-color-negative-toggled-default-text-and-icon: var(--sapButton_Reject_Selected_TextColor, var(--udexCoreSemanticError10));--udex-button-color-negative-toggled-hover-background: var(--sapButton_Reject_Selected_Hover_Background, var(--udexCoreSemanticError2));--udex-button-color-negative-toggled-hover-border: var(--sapButton_Reject_Selected_Hover_BorderColor, var(--udexCoreSemanticError8));--udex-button-color-negative-toggled-hover-text-and-icon: var(--udexCoreSemanticError8, #AA0808);--udex-button-color-negative-toggled-disabled-background: var(--sapButton_Reject_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-negative-toggled-disabled-border: var(--sapButton_Reject_Selected_BorderColor, var(--udexCoreSemanticError10));--udex-button-color-negative-toggled-disabled-text-and-icon: var(--sapButton_Reject_Selected_TextColor, var(--udexCoreSemanticError10));--udex-button-color-warning-standard-default-background: var(--sapButton_Attention_Background, var(--udexCoreSemanticWarning2));--udex-button-color-warning-standard-default-border: var(--sapButton_Attention_BorderColor, var(--udexCoreSemanticWarning7));--udex-button-color-warning-standard-default-text-and-icon: var(--sapButton_Attention_TextColor, var(--udexCoreSemanticWarning8));--udex-button-color-warning-standard-hover-background: var(--sapButton_Attention_Hover_Background, var(--udexCoreSemanticWarning3));--udex-button-color-warning-standard-hover-border: var(--sapButton_Attention_Hover_BorderColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-standard-hover-text-and-icon: var(--sapButton_Attention_Hover_TextColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-standard-active-background: var(--sapButton_Attention_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-warning-standard-active-border: var(--sapButton_Attention_Active_BorderColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-standard-active-text-and-icon: var(--sapButton_Attention_Active_TextColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-standard-disabled-background: var(--sapButton_Attention_Background, var(--udexCoreSemanticWarning2));--udex-button-color-warning-standard-disabled-border: var(--sapButton_Attention_BorderColor, var(--udexCoreSemanticWarning7));--udex-button-color-warning-standard-disabled-text-and-icon: var(--sapButton_Attention_TextColor, var(--udexCoreSemanticWarning8));--udex-button-color-warning-toggled-default-background: var(--sapButton_Attention_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-warning-toggled-default-border: var(--sapButton_Attention_Selected_BorderColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-toggled-default-text-and-icon: var(--sapButton_Attention_Selected_TextColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-toggled-hover-background: var(--sapButton_Attention_Selected_Hover_Background, var(--udexCoreSemanticWarning2));--udex-button-color-warning-toggled-hover-border: var(--sapButton_Attention_Selected_Hover_BorderColor, var(--udexCoreSemanticWarning8));--udex-button-color-warning-toggled-hover-text-and-icon: var(--sapButton_Attention_Selected_Hover_BorderColor, var(--udexCoreSemanticWarning8));--udex-button-color-warning-toggled-disabled-background: var(--sapButton_Attention_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-warning-toggled-disabled-border: var(--sapButton_Attention_Selected_BorderColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-toggled-disabled-text-and-icon: var(--sapButton_Attention_Selected_TextColor, var(--udexCoreSemanticWarning10))}:host{display:inline-block;font-weight:var(--udexTypographyFontWeightMedium)}:host([disabled]){pointer-events:none}:host([size="Small"]){font-size:var(--udexTypographyNavigationMediumMFontSize);height:var(--udex-button-small-size)}:host([size="Small"])::part(button){padding:var(--udex-button-padding-small)}:host,:host([size="Medium"]){font-size:1rem;height:var(--udex-button-medium-size)}:host::part(button),:host([size="Medium"])::part(button){padding:var(--udex-button-padding-medium)}:host([size="Large"]){font-size:1rem;height:var(--udex-button-large-size)}:host([size="Large"])::part(button){padding:var(--udex-button-padding-large)}:host([size="Small"][icon-only]){min-width:var(--udex-button-small-size);max-width:var(--udex-button-small-size);height:var(--udex-button-small-size);min-height:var(--udex-button-small-size)}:host([icon-only]),:host([size="Medium"][icon-only]){min-width:var(--udex-button-medium-size);max-width:var(--udex-button-medium-size);height:var(--udex-button-medium-size);min-height:var(--udex-button-medium-size)}:host([size="Large"][icon-only]){min-width:var(--udex-button-large-size);max-width:var(--udex-button-large-size);height:var(--udex-button-large-size);min-height:var(--udex-button-large-size)}:host([size="Small"][icon-only])::part(button){padding:var(--udex-button-icon-only-padding-small)}:host([icon-only])::part(button),:host([size="Medium"][icon-only])::part(button){padding:var(--udex-button-icon-only-padding-medium)}:host([size="Large"][icon-only])::part(button){padding:var(--udex-button-icon-only-padding-large)}:host([icon-only][icon-end])::part(icon){margin:0}:host([icon-end])::part(icon){margin-inline-start:8px}:host([size="Small"])::part(icon){height:var(--udex-button-icon-s-size, 14px);width:var(--udex-button-icon-s-size, 14px)}:host([size="Medium"])::part(icon),:host([size="Large"])::part(icon){height:var(--udex-button-icon-l-size, 18px);width:var(--udex-button-icon-l-size, 18px)}:host,:host([design=Primary]){color:var(--udex-button-color-primary-standard-default-text-and-icon);background-color:var(--udex-button-color-primary-standard-default-background);border:1px solid var(--udex-button-color-primary-standard-default-background)}:host(:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]):hover),:host([design="Primary"]:not([disabled]):hover),:host([design="Primary"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]):hover),:host([design="Primary"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]).ui5_hovered){color:var(--udex-button-color-primary-standard-hover-text-and-icon);background-color:var(--udex-button-color-primary-standard-hover-background);border:1px solid var(--udex-button-color-primary-standard-hover-background)}:host([active]:not([disabled])),:host([design=Primary][active]:not([disabled])){color:var(--udex-button-color-primary-standard-active-text-and-icon);background-color:var(--udex-button-color-primary-standard-active-background);border:1px solid var(--udex-button-color-primary-standard-active-border)}:host:disabled,:host([design=Primary]):disabled{color:var(--udex-button-color-primary-standard-disabled-text-and-icon);background-color:var(--udex-button-color-primary-standard-disabled-background);border:1px solid var(--udex-button-color-primary-standard-disabled-background);opacity:var(--sapContent_DisabledOpacity, .4)}:host([toggled]),:host([design=Primary][toggled]){color:var(--udex-button-color-primary-toggled-default-text-and-icon);background-color:var(--udex-button-color-primary-toggled-default-background);border:1px solid var(--udex-button-color-primary-toggled-default-border)}:host([toggled]:not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design=Primary][toggled]:not([non-interactive]):not([_is-touch]):not([disabled]):hover){color:var(--udex-button-color-primary-toggled-hover-text-and-icon);background-color:var(--udex-button-color-primary-toggled-hover-background);border:1px solid var(--udex-button-color-primary-toggled-hover-border)}:host([toggled]):disabled,:host([design=Primary][toggled]):disabled{color:var(--udex-button-color-primary-toggled-disabled-text-and-icon);background-color:var(--udex-button-color-primary-toggled-disabled-background);border:1px solid var(--udex-button-color-primary-toggled-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}:host([design=Secondary]){color:var(--udex-button-color-secondary-standard-default-text-and-icon);background-color:var(--udex-button-color-secondary-standard-default-background);border:1px solid var(--udex-button-color-secondary-standard-default-border)}:host([design="Secondary"]:not([disabled]):hover),:host([design="Secondary"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]):hover),:host([design="Secondary"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]).ui5_hovered){color:var(--udex-button-color-secondary-standard-hover-text-and-icon);background-color:var(--udex-button-color-secondary-standard-hover-background);border:1px solid var(--udex-button-color-secondary-standard-hover-border)}:host([design=Secondary][active]:not([disabled])){color:var(--udex-button-color-secondary-standard-active-text-and-icon);background-color:var(--udex-button-color-secondary-standard-active-background);border:1px solid var(--udex-button-color-secondary-standard-active-border)}:host([design=Secondary]):disabled{color:var(--udex-button-color-secondary-standard-disabled-text-and-icon);background-color:var(--udex-button-color-secondary-standard-disabled-background);border:1px solid var(--udex-button-color-secondary-standard-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}:host([design=Secondary][toggled]){color:var(--udex-button-color-secondary-toggled-default-text-and-icon);background-color:var(--udex-button-color-secondary-toggled-default-background);border:1px solid var(--udex-button-color-secondary-toggled-default-border)}:host([design=Secondary][toggled]:not([non-interactive]):not([_is-touch]):not([disabled]):hover){color:var(--udex-button-color-secondary-toggled-hover-text-and-icon);background-color:var(--udex-button-color-secondary-toggled-hover-background);border:1px solid var(--sapButton_Selected_Hover_BorderColor)}:host([design=Secondary][toggled]):disabled{color:var(--udex-button-color-secondary-toggled-disabled-text-and-icon);background-color:var(--udex-button-color-secondary-toggled-disabled-background);border:1px solid var(--udex-button-color-secondary-toggled-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}:host([design=Tertiary]){color:var(--udex-button-color-tertiary-standard-default-text-and-icon);background-color:var(--udex-button-color-tertiary-standard-default-background);border:1px solid var(--udex-button-color-tertiary-standard-default-border)}:host([design="Tertiary"]:not([disabled]):hover),:host([design="Tertiary"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]):hover),:host([design="Tertiary"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]).ui5_hovered){color:var(--udex-button-color-tertiary-standard-hover-text-and-icon);background-color:var(--udex-button-color-tertiary-standard-hover-background);border:1px solid var(--udex-button-color-tertiary-standard-hover-border)}:host([design=Tertiary][active]:not([disabled])){color:var(--udex-button-color-tertiary-standard-active-text-and-icon);background-color:var(--udex-button-color-tertiary-standard-active-background);border:1px solid var(--udex-button-color-tertiary-standard-active-border)}:host([design=Tertiary]):disabled{color:var(--udex-button-color-tertiary-standard-disabled-text-and-icon);background-color:var(--udex-button-color-tertiary-standard-disabled-background);border:1px solid var(--udex-button-color-tertiary-standard-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}:host([design=Tertiary][toggled]){color:var(--udex-button-color-tertiary-toggled-default-text-and-icon);background-color:var(--udex-button-color-tertiary-toggled-default-background);border:1px solid var(--udex-button-color-tertiary-toggled-default-border)}:host([design=Tertiary][toggled]:not([non-interactive]):not([_is-touch]):not([disabled]):hover){color:var(--udex-button-color-tertiary-toggled-hover-text-and-icon);background-color:var(--udex-button-color-tertiary-toggled-hover-background);border:1px solid var(--udex-button-color-tertiary-toggled-hover-border)}:host([design=Tertiary][toggled]):disabled{color:var(--udex-button-color-tertiary-toggled-disabled-text-and-icon);background-color:var(--udex-button-color-tertiary-toggled-disabled-background);border:1px solid var(--udex-button-color-tertiary-toggled-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}:host([design=Positive]){color:var(--udex-button-color-positive-standard-default-text-and-icon);background-color:var(--udex-button-color-positive-standard-default-background);border:1px solid var(--udex-button-color-positive-standard-default-border)}:host([design="Positive"]:not([disabled]):hover),:host([design="Positive"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]):hover),:host([design="Positive"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]).ui5_hovered){color:var(--udex-button-color-positive-standard-hover-text-and-icon);background-color:var(--udex-button-color-positive-standard-hover-background);border:1px solid var(--udex-button-color-positive-standard-hover-border)}:host([design=Positive][active]:not([disabled])){color:var(--udex-button-color-positive-standard-active-text-and-icon);background-color:var(--udex-button-color-positive-standard-active-background);border:1px solid var(--udex-button-color-positive-standard-active-border)}:host([design=Positive]):disabled{color:var(--udex-button-color-positive-standard-disabled-text-and-icon);background-color:var(--udex-button-color-positive-standard-disabled-background);border:1px solid var(--udex-button-color-positive-standard-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}:host([design=Positive][toggled]){color:var(--udex-button-color-positive-toggled-default-text-and-icon);background-color:var(--udex-button-color-positive-toggled-default-background);border:1px solid var(--udex-button-color-positive-toggled-default-border)}:host([design=Positive][toggled]:not([non-interactive]):not([_is-touch]):not([disabled]):hover){color:var(--udex-button-color-positive-toggled-hover-text-and-icon);background-color:var(--udex-button-color-positive-toggled-hover-background);border:1px solid var(--udex-button-color-positive-toggled-hover-border)}:host([design=Positive][toggled]):disabled{color:var(--udex-button-color-positive-toggled-disabled-text-and-icon);background-color:var(--udex-button-color-positive-toggled-disabled-background);border:1px solid var(--udex-button-color-positive-toggled-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}:host([design=Negative]){color:var(--udex-button-color-negative-standard-default-text-and-icon);background-color:var(--udex-button-color-negative-standard-default-background);border:1px solid var(--udex-button-color-negative-standard-default-border)}:host([design="Negative"]:not([disabled]):hover),:host([design="Negative"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]):hover),:host([design="Negative"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]).ui5_hovered){color:var(--udex-button-color-negative-standard-hover-text-and-icon);background-color:var(--udex-button-color-negative-standard-hover-background);border:1px solid var(--udex-button-color-negative-standard-hover-border)}:host([design=Negative][active]:not([disabled])){color:var(--udex-button-color-negative-standard-active-text-and-icon);background-color:var(--udex-button-color-negative-standard-active-background);border:1px solid var(--udex-button-color-negative-standard-active-border)}:host([design=Negative]):disabled{color:var(--udex-button-color-negative-standard-disabled-text-and-icon);background-color:var(--udex-button-color-negative-standard-disabled-background);border:1px solid var(--udex-button-color-negative-standard-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}:host([design=Negative][toggled]){color:var(--udex-button-color-negative-toggled-default-text-and-icon);background-color:var(--udex-button-color-negative-toggled-default-background);border:1px solid var(--udex-button-color-negative-toggled-default-border)}:host([design=Negative][toggled]:not([non-interactive]):not([_is-touch]):not([disabled]):hover){color:var(--udex-button-color-negative-toggled-hover-text-and-icon);background-color:var(--udex-button-color-negative-toggled-hover-background);border:1px solid var(--udex-button-color-negative-toggled-hover-border)}:host([design=Negative][toggled]):disabled{color:var(--udex-button-color-negative-toggled-disabled-text-and-icon);background-color:var(--udex-button-color-negative-toggled-disabled-background);border:1px solid var(--udex-button-color-negative-toggled-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}:host([design=Warning]){color:var(--udex-button-color-warning-standard-default-text-and-icon);background-color:var(--udex-button-color-warning-standard-default-background);border:1px solid var(--udex-button-color-warning-standard-default-border)}:host([design="Warning"]:not([disabled]):hover),:host([design="Warning"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]):hover),:host([design="Warning"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):not([toggled]).ui5_hovered){color:var(--udex-button-color-warning-standard-hover-text-and-icon);background-color:var(--udex-button-color-warning-standard-hover-background);border:1px solid var(--udex-button-color-warning-standard-hover-border)}:host([design=Warning][active]:not([disabled])){color:var(--udex-button-color-warning-standard-active-text-and-icon);background-color:var(--udex-button-color-warning-standard-active-background);border:1px solid var(--udex-button-color-warning-standard-active-border)}:host([design=Warning]):disabled{color:var(--udex-button-color-warning-standard-disabled-text-and-icon);background-color:var(--udex-button-color-warning-standard-disabled-background);border:1px solid var(--udex-button-color-warning-standard-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}:host([design=Warning][toggled]){color:var(--udex-button-color-warning-toggled-default-text-and-icon);background-color:var(--udex-button-color-warning-toggled-default-background);border:1px solid var(--udex-button-color-warning-toggled-default-border)}:host([design=Warning][toggled]:not([non-interactive]):not([_is-touch]):not([disabled]):hover){color:var(--udex-button-color-warning-toggled-hover-text-and-icon);background-color:var(--udex-button-color-warning-toggled-hover-background);border:1px solid var(--udex-button-color-warning-toggled-hover-border)}:host([design=Warning][toggled]):disabled{color:var(--udex-button-color-warning-toggled-disabled-text-and-icon);background-color:var(--udex-button-color-warning-toggled-disabled-background);border:1px solid var(--udex-button-color-warning-toggled-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}
` };
var D = function(t, o, e, i) {
  var c = arguments.length, d = c < 3 ? o : i === null ? i = Object.getOwnPropertyDescriptor(o, e) : i, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    d = Reflect.decorate(t, o, e, i);
  else
    for (var l = t.length - 1; l >= 0; l--)
      (s = t[l]) && (d = (c < 3 ? s(d) : c > 3 ? s(o, e, d) : s(o, e)) || d);
  return c > 3 && d && Object.defineProperty(o, e, d), d;
};
let h = class extends $ {
};
D([
  n({ type: String, defaultValue: "Medium" })
], h.prototype, "size", void 0);
h = D([
  P({
    tag: "udex-button",
    renderer: L,
    styles: [$.styles, so]
  })
], h);
h.define();
