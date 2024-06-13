import { e as g, l as a, s as B, a as m, b as L, j as F, p as r, d as O, f as P, k as f, U as D, m as M, n as V, o as G, q as T, t as U, u as J, g as w, v as E, w as z, x as Y, h as I, I as q, y as $, c as X } from "./parameters-bundle.css-Bbg-m5ef.js";
import { B as Z, a as K, b as Q } from "./i18n-defaults-BEqZgmok.js";
const oo = (t) => {
  const o = t;
  return o.accessibleNameRef ? to(t) : o.accessibleName ? o.accessibleName : void 0;
}, to = (t) => {
  var l;
  const o = ((l = t.accessibleNameRef) == null ? void 0 : l.split(" ")) ?? [], e = t.getRootNode();
  let u = "";
  return o.forEach((i, b) => {
    const v = e.querySelector(`[id='${i}']`), A = `${v && v.textContent ? v.textContent : ""}`;
    A && (u += A, b < o.length - 1 && (u += " "));
  }), u;
}, eo = /* @__PURE__ */ new WeakMap(), p = (t, o) => {
  eo.set(t, o);
}, ro = (t) => Array.from(t).filter((o) => o.nodeType !== Node.COMMENT_NODE && (o.nodeType !== Node.TEXT_NODE || (o.nodeValue || "").trim().length !== 0)).length > 0;
var C;
(function(t) {
  t.Default = "Default", t.Positive = "Positive", t.Negative = "Negative", t.Transparent = "Transparent", t.Emphasized = "Emphasized", t.Attention = "Attention";
})(C || (C = {}));
const y = C;
var k;
(function(t) {
  t.Button = "Button", t.Submit = "Submit", t.Reset = "Reset";
})(k || (k = {}));
const h = k;
var S;
(function(t) {
  t.Button = "Button", t.Link = "Link";
})(S || (S = {}));
const R = S;
function ao(t, o, e) {
  return g`<button type="button" class="ui5-button-root" ?disabled="${this.disabled}" data-sap-focus-ref  @focusout=${this._onfocusout} @focusin=${this._onfocusin} @click=${this._onclick} @mousedown=${this._onmousedown} @mouseup=${this._onmouseup} @keydown=${this._onkeydown} @keyup=${this._onkeyup} @touchstart="${this._ontouchstart}" @touchend="${this._ontouchend}" tabindex=${a(this.tabIndexValue)} aria-expanded="${a(this.accessibilityAttributes.expanded)}" aria-controls="${a(this.accessibilityAttributes.controls)}" aria-haspopup="${a(this._hasPopup)}" aria-label="${a(this.ariaLabelText)}" title="${a(this.buttonTitle)}" part="button" role="${a(this.buttonAccessibleRole)}">${this.icon ? no.call(this, t, o, e) : void 0}<span id="${a(this._id)}-content" class="ui5-button-text"><bdi><slot></slot></bdi></span>${this.hasButtonType ? io.call(this, t, o, e) : void 0}</button> `;
}
function no(t, o, e) {
  return e ? g`<${B("ui5-icon", o, e)} class="ui5-button-icon" name="${a(this.icon)}" accessible-role="${a(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></${B("ui5-icon", o, e)}>` : g`<ui5-icon class="ui5-button-icon" name="${a(this.icon)}" accessible-role="${a(this.iconRole)}" part="icon" ?show-tooltip=${this.showIconTooltip}></ui5-icon>`;
}
function io(t, o, e) {
  return g`<span class="ui5-hidden-text">${a(this.buttonTypeText)}</span>`;
}
var N;
(function(t) {
  t.Dialog = "Dialog", t.Grid = "Grid", t.ListBox = "ListBox", t.Menu = "Menu", t.Tree = "Tree";
})(N || (N = {}));
m("@ui5/webcomponents-theming", "sap_horizon", async () => L);
m("@ui5/webcomponents", "sap_horizon", async () => F);
const uo = { packageName: "@ui5/webcomponents", fileName: "themes/Button.css.ts", content: `:host{vertical-align:middle}.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:inline-block}:host{min-width:var(--_ui5-v1-24-0_button_base_min_width);height:var(--_ui5-v1-24-0_button_base_height);line-height:normal;font-family:var(--_ui5-v1-24-0_button_fontFamily);font-size:var(--sapFontSize);text-shadow:var(--_ui5-v1-24-0_button_text_shadow);border-radius:var(--_ui5-v1-24-0_button_border_radius);cursor:pointer;background-color:var(--sapButton_Background);border:var(--sapButton_BorderWidth) solid var(--sapButton_BorderColor);color:var(--sapButton_TextColor);box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui5-button-root{min-width:inherit;cursor:inherit;height:100%;width:100%;box-sizing:border-box;display:flex;justify-content:center;align-items:center;outline:none;padding:0 var(--_ui5-v1-24-0_button_base_padding);position:relative;background:transparent;border:none;color:inherit;text-shadow:inherit;font:inherit;white-space:inherit;overflow:inherit;text-overflow:inherit;letter-spacing:inherit;word-spacing:inherit;line-height:inherit;-webkit-user-select:none;-moz-user-select:none;user-select:none}:host(:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host(:not([hidden]):not([disabled]).ui5_hovered){background:var(--sapButton_Hover_Background);border:1px solid var(--sapButton_Hover_BorderColor);color:var(--sapButton_Hover_TextColor)}.ui5-button-icon{color:inherit;flex-shrink:0}:host([icon-end]) .ui5-button-root{flex-direction:row-reverse}:host([icon-end]) .ui5-button-icon{margin-inline-start:var(--_ui5-v1-24-0_button_base_icon_margin)}:host([icon-only]) .ui5-button-root{min-width:auto;padding:0}:host([icon-only]) .ui5-button-text{display:none}.ui5-button-text{outline:none;position:relative;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([has-icon]:not([icon-end])) .ui5-button-text{margin-inline-start:var(--_ui5-v1-24-0_button_base_icon_margin)}:host([has-icon][icon-end]) .ui5-button-text{margin-inline-start:0}:host([disabled]){opacity:var(--sapContent_DisabledOpacity);pointer-events:unset;cursor:default}:host([has-icon]:not([icon-only])) .ui5-button-text{min-width:calc(var(--_ui5-v1-24-0_button_base_min_width) - var(--_ui5-v1-24-0_button_base_icon_margin) - 1rem)}:host([disabled]:active){pointer-events:none}:host([focused]:not([active])) .ui5-button-root:after,:host([focused][active][design="Emphasized"]) .ui5-button-root:after,:host([focused][active]) .ui5-button-root:before{content:"";position:absolute;box-sizing:border-box;inset:.0625rem;border:var(--_ui5-v1-24-0_button_focused_border);border-radius:var(--_ui5-v1-24-0_button_focused_border_radius)}:host([focused][active]) .ui5-button-root:before{border-color:var(--_ui5-v1-24-0_button_pressed_focused_border_color)}:host([design="Emphasized"][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-24-0_button_emphasized_focused_border_color)}:host([design="Emphasized"][focused]) .ui5-button-root:before{content:"";position:absolute;box-sizing:border-box;inset:.0625rem;border:var(--_ui5-v1-24-0_button_emphasized_focused_border_before);border-radius:var(--_ui5-v1-24-0_button_focused_border_radius)}.ui5-button-root::-moz-focus-inner{border:0}bdi{display:block;white-space:inherit;overflow:inherit;text-overflow:inherit}:host([ui5-button][active]:not([disabled]):not([non-interactive])){background-image:none;background-color:var(--sapButton_Active_Background);border-color:var(--sapButton_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([design="Positive"]){background-color:var(--sapButton_Accept_Background);border-color:var(--sapButton_Accept_BorderColor);color:var(--sapButton_Accept_TextColor)}:host([design="Positive"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Positive"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Accept_Hover_Background);border-color:var(--sapButton_Accept_Hover_BorderColor);color:var(--sapButton_Accept_Hover_TextColor)}:host([ui5-button][design="Positive"][active]:not([non-interactive])){background-color:var(--sapButton_Accept_Active_Background);border-color:var(--sapButton_Accept_Active_BorderColor);color:var(--sapButton_Accept_Active_TextColor)}:host([design="Negative"]){background-color:var(--sapButton_Reject_Background);border-color:var(--sapButton_Reject_BorderColor);color:var(--sapButton_Reject_TextColor)}:host([design="Negative"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Negative"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Reject_Hover_Background);border-color:var(--sapButton_Reject_Hover_BorderColor);color:var(--sapButton_Reject_Hover_TextColor)}:host([ui5-button][design="Negative"][active]:not([non-interactive])){background-color:var(--sapButton_Reject_Active_Background);border-color:var(--sapButton_Reject_Active_BorderColor);color:var(--sapButton_Reject_Active_TextColor)}:host([design="Attention"]){background-color:var(--sapButton_Attention_Background);border-color:var(--sapButton_Attention_BorderColor);color:var(--sapButton_Attention_TextColor)}:host([design="Attention"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Attention"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Attention_Hover_Background);border-color:var(--sapButton_Attention_Hover_BorderColor);color:var(--sapButton_Attention_Hover_TextColor)}:host([ui5-button][design="Attention"][active]:not([non-interactive])){background-color:var(--sapButton_Attention_Active_Background);border-color:var(--sapButton_Attention_Active_BorderColor);color:var(--sapButton_Attention_Active_TextColor)}:host([design="Emphasized"]){background-color:var(--sapButton_Emphasized_Background);border-color:var(--sapButton_Emphasized_BorderColor);border-width:var(--_ui5-v1-24-0_button_emphasized_border_width);color:var(--sapButton_Emphasized_TextColor);font-family:var(--sapFontBoldFamily )}:host([design="Emphasized"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Emphasized"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Emphasized_Hover_Background);border-color:var(--sapButton_Emphasized_Hover_BorderColor);border-width:var(--_ui5-v1-24-0_button_emphasized_border_width);color:var(--sapButton_Emphasized_Hover_TextColor)}:host([ui5-button][design="Empasized"][active]:not([non-interactive])){background-color:var(--sapButton_Emphasized_Active_Background);border-color:var(--sapButton_Emphasized_Active_BorderColor);color:var(--sapButton_Emphasized_Active_TextColor)}:host([design="Emphasized"][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-24-0_button_emphasized_focused_border_color);outline:none}:host([design="Emphasized"][focused][active]:not([non-interactive])) .ui5-button-root:after{border-color:var(--_ui5-v1-24-0_button_emphasized_focused_active_border_color)}:host([design="Transparent"]){background-color:var(--sapButton_Lite_Background);color:var(--sapButton_Lite_TextColor);border-color:var(--sapButton_Lite_BorderColor)}:host([design="Transparent"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]):hover),:host([design="Transparent"]:not([active]):not([non-interactive]):not([_is-touch]):not([disabled]).ui5_hovered){background-color:var(--sapButton_Lite_Hover_Background);border-color:var(--sapButton_Lite_Hover_BorderColor);color:var(--sapButton_Lite_Hover_TextColor)}:host([ui5-button][design="Transparent"][active]:not([non-interactive])){background-color:var(--sapButton_Lite_Active_Background);border-color:var(--sapButton_Lite_Active_BorderColor);color:var(--sapButton_Active_TextColor)}:host([ui5-segmented-button-item][active][focused]) .ui5-button-root:after,:host([pressed][focused]) .ui5-button-root:after{border-color:var(--_ui5-v1-24-0_button_pressed_focused_border_color);outline:none}:host([ui5-segmented-button-item][focused]:not(:last-child)) .ui5-button-root:after{border-top-right-radius:var(--_ui5-v1-24-0_button_focused_inner_border_radius);border-bottom-right-radius:var(--_ui5-v1-24-0_button_focused_inner_border_radius)}:host([ui5-segmented-button-item][focused]:not(:first-child)) .ui5-button-root:after{border-top-left-radius:var(--_ui5-v1-24-0_button_focused_inner_border_radius);border-bottom-left-radius:var(--_ui5-v1-24-0_button_focused_inner_border_radius)}
` };
var d = function(t, o, e, u) {
  var l = arguments.length, i = l < 3 ? o : u === null ? u = Object.getOwnPropertyDescriptor(o, e) : u, b;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(t, o, e, u);
  else
    for (var v = t.length - 1; v >= 0; v--)
      (b = t[v]) && (i = (l < 3 ? b(i) : l > 3 ? b(o, e, i) : b(o, e)) || i);
  return l > 3 && i && Object.defineProperty(o, e, i), i;
}, _;
let W = !1, x = null, n = _ = class extends D {
  constructor() {
    super(), this._deactivate = () => {
      x && x._setActiveState(!1);
    }, W || (document.addEventListener("mouseup", this._deactivate), W = !0);
    const o = (e) => {
      p(e, "button"), !this.nonInteractive && this._setActiveState(!0);
    };
    this._ontouchstart = {
      handleEvent: o,
      passive: !0
    };
  }
  onEnterDOM() {
    this._isTouch = (M() || V()) && !G();
  }
  async onBeforeRendering() {
    const o = T("FormSupport");
    this.type !== h.Button && !o && console.warn('In order for the "type" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";'), this.submits && !o && console.warn('In order for the "submits" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";'), this.iconOnly = this.isIconOnly, this.hasIcon = !!this.icon, this.buttonTitle = this.tooltip || await U(this.icon);
  }
  _onclick(o) {
    var u;
    if (this.nonInteractive)
      return;
    p(o, "button");
    const e = T("FormSupport");
    e && this._isSubmit && e.triggerFormSubmit(this), e && this._isReset && e.triggerFormReset(this), J() && ((u = this.getDomRef()) == null || u.focus());
  }
  _onmousedown(o) {
    this.nonInteractive || this._isTouch || (p(o, "button"), this._setActiveState(!0), x = this);
  }
  _ontouchend(o) {
    this.disabled && (o.preventDefault(), o.stopPropagation()), this.active && this._setActiveState(!1), x && x._setActiveState(!1);
  }
  _onmouseup(o) {
    p(o, "button");
  }
  _onkeydown(o) {
    p(o, "button"), (w(o) || E(o)) && this._setActiveState(!0);
  }
  _onkeyup(o) {
    (w(o) || E(o)) && this.active && this._setActiveState(!1);
  }
  _onfocusout() {
    this.nonInteractive || (this.active && this._setActiveState(!1), z() && (this.focused = !1));
  }
  _onfocusin(o) {
    this.nonInteractive || (p(o, "button"), z() && (this.focused = !0));
  }
  _setActiveState(o) {
    this.fireEvent("_active-state-change", null, !0) && (this.active = o);
  }
  get _hasPopup() {
    var o;
    return (o = this.accessibilityAttributes.hasPopup) == null ? void 0 : o.toLowerCase();
  }
  get hasButtonType() {
    return this.design !== y.Default && this.design !== y.Transparent;
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
    return _.i18nBundle.getText(_.typeTextMappings()[this.design]);
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
    return this.type === h.Submit || this.submits;
  }
  get _isReset() {
    return this.type === h.Reset;
  }
  static async onDefine() {
    _.i18nBundle = await Y("@ui5/webcomponents");
  }
};
d([
  r({ type: y, defaultValue: y.Default })
], n.prototype, "design", void 0);
d([
  r({ type: Boolean })
], n.prototype, "disabled", void 0);
d([
  r()
], n.prototype, "icon", void 0);
d([
  r({ type: Boolean })
], n.prototype, "iconEnd", void 0);
d([
  r({ type: Boolean })
], n.prototype, "submits", void 0);
d([
  r()
], n.prototype, "tooltip", void 0);
d([
  r({ defaultValue: void 0 })
], n.prototype, "accessibleName", void 0);
d([
  r({ defaultValue: "" })
], n.prototype, "accessibleNameRef", void 0);
d([
  r({ type: Object })
], n.prototype, "accessibilityAttributes", void 0);
d([
  r({ type: h, defaultValue: h.Button })
], n.prototype, "type", void 0);
d([
  r({ type: R, defaultValue: R.Button })
], n.prototype, "accessibleRole", void 0);
d([
  r({ type: Boolean })
], n.prototype, "active", void 0);
d([
  r({ type: Boolean })
], n.prototype, "iconOnly", void 0);
d([
  r({ type: Boolean })
], n.prototype, "focused", void 0);
d([
  r({ type: Boolean })
], n.prototype, "hasIcon", void 0);
d([
  r({ type: Boolean })
], n.prototype, "nonInteractive", void 0);
d([
  r({ noAttribute: !0 })
], n.prototype, "buttonTitle", void 0);
d([
  r({ type: Object })
], n.prototype, "_iconSettings", void 0);
d([
  r({ defaultValue: "0", noAttribute: !0 })
], n.prototype, "forcedTabIndex", void 0);
d([
  r({ type: Boolean })
], n.prototype, "_isTouch", void 0);
d([
  O({ type: Node, default: !0 })
], n.prototype, "text", void 0);
n = _ = d([
  P({
    tag: "ui5-button",
    languageAware: !0,
    renderer: I,
    template: ao,
    styles: uo,
    dependencies: [q]
  }),
  f("click"),
  f("_active-state-change")
], n);
n.define();
const H = async (t) => {
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
  $("SAP-icons-v4", H), $("SAP-icons-v5", H);
};
co();
function so(t, o, e) {
  return e ? g`<${B("ui5-button", o, e)} class="udex-button ${a(this.sizeClass)}" ?disabled="${this.disabled}" icon="${a(this.icon)}" ?icon-end="${this.iconEnd}" tooltip="${a(this.tooltip)}" design="${a(this.design)}" ?toggled="${this.toggled}" accessible-name="${a(this.accessibleName)}" accessible-name-ref="${a(this.accessibleNameRef)}" accessible-role="${a(this.accessibleRole)}" .accessibilityAttributes=${a(this.accessibilityAttributes)} @click="${this.onButtonClick}">${this.renderIconOnlyButton ? j.call(this, t, o, e) : void 0}</${B("ui5-button", o, e)}>` : g`<ui5-button class="udex-button ${a(this.sizeClass)}" ?disabled="${this.disabled}" icon="${a(this.icon)}" ?icon-end="${this.iconEnd}" tooltip="${a(this.tooltip)}" design="${a(this.design)}" ?toggled="${this.toggled}" accessible-name="${a(this.accessibleName)}" accessible-name-ref="${a(this.accessibleNameRef)}" accessible-role="${a(this.accessibleRole)}" .accessibilityAttributes=${a(this.accessibilityAttributes)} @click="${this.onButtonClick}">${this.renderIconOnlyButton ? j.call(this, t, o, e) : void 0}</ui5-button>`;
}
function j(t, o, e) {
  return g`<slot></slot>`;
}
m("@ui5/webcomponents-theming", "sap_horizon", async () => L);
m("@udex/web-components", "sap_horizon", async () => X);
const lo = { packageName: "@udex/web-components", fileName: "themes/Button.css.ts", content: `:host{--udex-button-color-transparent: hsla(0, 0%, 0%, 0);--udex-button-padding-small: 5.5px 10px;--udex-button-padding-medium: 9px 10px;--udex-button-padding-large: 12px 14px;--udex-button-small-size: 26px;--udex-button-medium-size: 36px;--udex-button-large-size: 42px;--udex-button-icon-s-size: .875rem;--udex-button-icon-m-size: 1 rem;--udex-button-icon-l-size: 1.125rem;--udexTypographyFontWeightMedium: 500;--udex-button-color-primary-standard-default-background: var(--sapButton_Emphasized_Background, var(--udexCorePrimaryAction));--udex-button-color-primary-standard-default-text-and-icon: var(--sapButton_Emphasized_TextColor, var(--udexCoreTextLight));--udex-button-color-primary-standard-hover-background: var(--sapButton_Emphasized_Hover_Background, var(--udexColorBlue9));--udex-button-color-primary-standard-hover-text-and-icon: var(--sapButton_Emphasized_Hover_TextColor, var(--udexCoreTextLight));--udex-button-color-primary-standard-active-background: var(--sapButton_Emphasized_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-primary-standard-active-border: var(--sapButton_Emphasized_Active_BorderColor, var(--udexColorBlue9));--udex-button-color-primary-standard-active-text-and-icon: var(--sapButton_Emphasized_Active_TextColor, var(--udexColorBlue9));--udex-button-color-primary-standard-disabled-background: var(--sapButton_Emphasized_Background, var(--udexColorBlue9));--udex-button-color-primary-standard-disabled-text-and-icon: var(--sapButton_Emphasized_TextColor, var(--udexCoreTextLight));--udex-button-color-primary-toggled-default-background: var(--sapButton_Emphasized_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-primary-toggled-default-border: var(--udexColorBlue7, #0070F2);--udex-button-color-primary-toggled-default-text-and-icon: var(--sapButton_Emphasized_Active_TextColor, var(--udexColorBlue9));--udex-button-color-primary-toggled-hover-background: var(--udexColorBlue2, #D1EFFF);--udex-button-color-primary-toggled-hover-border: var(--sapButton_Emphasized_Active_BorderColor, var(--udexColorBlue9));--udex-button-color-primary-toggled-hover-text-and-icon: var(--sapButton_Emphasized_Active_TextColor, var(--udexColorBlue9));--udex-button-color-primary-toggled-disabled-background: var(--sapButton_Emphasized_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-primary-toggled-disabled-border: var(--sapButton_Emphasized_Active_BorderColor, var(--udexColorBlue9));--udex-button-color-primary-toggled-disabled-text-and-icon: var(--sapButton_Emphasized_Active_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-standard-default-background: var(--sapButton_Background, var(--udexColorNeutralWhite));--udex-button-color-secondary-standard-default-border: var(--sapButton_BorderColor, var(--udexColorGrey7));--udex-button-color-secondary-standard-default-text-and-icon: var(--sapButton_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-standard-hover-background: var(--sapButton_Hover_Background, var(--udexColorGrey2));--udex-button-color-secondary-standard-hover-border: var(--sapButton_Hover_BorderColor, var(--udexColorGrey7));--udex-button-color-secondary-standard-hover-text-and-icon: var(--sapButton_Hover_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-standard-active-background: var(--sapButton_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-secondary-standard-active-border: var(--sapButton_Active_BorderColor, var(--udexColorBlue9));--udex-button-color-secondary-standard-active-text-and-icon: var(--sapButton_Active_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-standard-disabled-background: var(--sapButton_Background, var(--udexColorNeutralWhite));--udex-button-color-secondary-standard-disabled-border: var(--sapButton_BorderColor, var(--udexColorGrey7));--udex-button-color-secondary-standard-disabled-text-and-icon: var(--sapButton_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-toggled-default-background: var(--sapButton_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-secondary-toggled-default-border: var(--sapButton_Selected_BorderColor, var(--udexColorBlue9));--udex-button-color-secondary-toggled-default-text-and-icon: var(--sapButton_Selected_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-toggled-hover-background: var(--sapButton_Selected_Hover_Background, var(--udexColorBlue2));--udex-button-color-secondary-toggled-hover-border: var(--sapButton_Selected_Hover_BorderColor, var(--udexColorBlue9));--udex-button-color-secondary-toggled-hover-text-and-icon: var(--sapButton_Selected_TextColor, var(--udexColorBlue9));--udex-button-color-secondary-toggled-disabled-background: var(--sapButton_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-secondary-toggled-disabled-border: var(--sapButton_Selected_BorderColor, var(--udexColorBlue9));--udex-button-color-secondary-toggled-disabled-text-and-icon: var(--sapButton_Selected_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-standard-default-background: var(--udex-button-color-transparent, hsla(0, 0%, 0%, 0));--udex-button-color-tertiary-standard-default-border: var(--udex-button-color-transparent, hsla(0, 0%, 0%, 0));--udex-button-color-tertiary-standard-default-text-and-icon: var(--sapButton_Lite_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-standard-hover-background: var(--sapButton_Lite_Hover_Background, var(--udexColorGrey2));--udex-button-color-tertiary-standard-hover-border: var(--sapButton_Lite_Hover_BorderColor, var(--udexColorGrey7));--udex-button-color-tertiary-standard-hover-text-and-icon: var(--sapButton_Lite_Hover_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-standard-active-background: var(--sapButton_Lite_Active_Background, var(--udexColorBlue9));--udex-button-color-tertiary-standard-active-border: var(--sapButton_Lite_Active_BorderColor, var(--udexColorNeutralWhite));--udex-button-color-tertiary-standard-active-text-and-icon: var(--sapButton_Lite_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-standard-disabled-background: var(--udex-button-color-transparent, hsla(0, 0%, 0%, 0));--udex-button-color-tertiary-standard-disabled-border: var(--udex-button-color-transparent, hsla(0, 0%, 0%, 0));--udex-button-color-tertiary-standard-disabled-text-and-icon: var(--sapButton_Lite_Disabled_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-toggled-default-background: var(--sapButton_Lite_Background, var(--udexColorNeutralWhite));--udex-button-color-tertiary-toggled-default-border: var(--sapButton_Lite_BorderColor, var(--udexColorBlue9));--udex-button-color-tertiary-toggled-default-text-and-icon: var(--sapButton_Lite_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-toggled-hover-background: var(--udexColorBlue2, #D1EFFF);--udex-button-color-tertiary-toggled-hover-border: var(--sapButton_Lite_Active_Background, var(--udexColorBlue9));--udex-button-color-tertiary-toggled-hover-text-and-icon: var(--sapButton_Lite_TextColor, var(--udexColorBlue9));--udex-button-color-tertiary-toggled-disabled-background: var(--sapButton_Lite_Background, var(--udexColorNeutralWhite));--udex-button-color-tertiary-toggled-disabled-border: var(--sapButton_Lite_BorderColor, var(--udexColorBlue9));--udex-button-color-tertiary-toggled-disabled-text-and-icon: var(--sapButton_Lite_TextColor, var(--udexColorBlue9));--udex-button-color-positive-standard-default-background: var(--sapButton_Accept_Background, var(--udexCoreSemanticSuccess2));--udex-button-color-positive-standard-default-border: var(--sapButton_Accept_BorderColor, var(--udexCoreSemanticSuccess7));--udex-button-color-positive-standard-default-text-and-icon: var(--sapButton_Accept_TextColor, var(--udexCoreSemanticSuccess8));--udex-button-color-positive-standard-hover-background: var(--sapButton_Accept_Hover_Background, var(--udexCoreSemanticSuccess3));--udex-button-color-positive-standard-hover-border: var(--sapButton_Accept_Hover_BorderColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-standard-hover-text-and-icon: var(--sapButton_Accept_Hover_TextColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-standard-active-background: var(--sapButton_Accept_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-positive-standard-active-border: var(--sapButton_Accept_Active_BorderColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-standard-active-text-and-icon: var(--sapButton_Accept_Active_TextColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-standard-disabled-background: var(--sapButton_Accept_Background, var(--udexCoreSemanticSuccess2));--udex-button-color-positive-standard-disabled-border: var(--sapButton_Accept_BorderColor, var(--udexCoreSemanticSuccess7));--udex-button-color-positive-standard-disabled-text-and-icon: var(--sapButton_Accept_TextColor, var(--udexCoreSemanticSuccess8));--udex-button-color-positive-toggled-default-background: var(--sapButton_Accept_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-positive-toggled-default-border: var(--sapButton_Accept_Selected_BorderColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-toggled-default-text-and-icon: var(--sapButton_Accept_Selected_TextColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-toggled-hover-background: var(--sapButton_Accept_Selected_Hover_Background, var(--udexCoreSemanticSuccess2));--udex-button-color-positive-toggled-hover-border: var(--sapButton_Accept_Selected_Hover_BorderColor, var(--udexCoreSemanticSuccess8));--udex-button-color-positive-toggled-hover-text-and-icon: var(--sapButton_Accept_TextColor, var(--udexCoreSemanticSuccess8));--udex-button-color-positive-toggled-disabled-background: var(--sapButton_Accept_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-positive-toggled-disabled-border: var(--sapButton_Accept_Selected_BorderColor, var(--udexCoreSemanticSuccess10));--udex-button-color-positive-toggled-disabled-text-and-icon: var(--sapButton_Accept_Selected_TextColor, var(--udexCoreSemanticSuccess10));--udex-button-color-negative-standard-default-background: var(--sapButton_Reject_Background, var(--udexCoreSemanticError2));--udex-button-color-negative-standard-default-border: var(--sapButton_Reject_BorderColor, var(--udexCoreSemanticError7));--udex-button-color-negative-standard-default-text-and-icon: var(--sapButton_Reject_TextColor, var(--udexCoreSemanticError8));--udex-button-color-negative-standard-hover-background: var(--sapButton_Reject_Hover_Background, var(--udexCoreSemanticError3));--udex-button-color-negative-standard-hover-border: var(--sapButton_Reject_Hover_BorderColor, var(--udexCoreSemanticError10));--udex-button-color-negative-standard-hover-text-and-icon: var(--sapButton_Reject_Hover_TextColor, var(--udexCoreSemanticError10));--udex-button-color-negative-standard-active-background: var(--sapButton_Reject_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-negative-standard-active-border: var(--sapButton_Reject_Active_BorderColor, var(--udexCoreSemanticError10));--udex-button-color-negative-standard-active-text-and-icon: var(--sapButton_Reject_Active_TextColor, var(--udexCoreSemanticError10));--udex-button-color-negative-standard-disabled-background: var(--sapButton_Reject_Background, var(--udexCoreSemanticError2));--udex-button-color-negative-standard-disabled-border: var(--sapButton_Reject_BorderColor, var(--udexCoreSemanticError7));--udex-button-color-negative-standard-disabled-text-and-icon: var(--sapButton_Reject_TextColor, var(--udexCoreSemanticError8));--udex-button-color-negative-toggled-default-background: var(--sapButton_Reject_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-negative-toggled-default-border: var(--sapButton_Reject_Selected_BorderColor, var(--udexCoreSemanticError10));--udex-button-color-negative-toggled-default-text-and-icon: var(--sapButton_Reject_Selected_TextColor, var(--udexCoreSemanticError10));--udex-button-color-negative-toggled-hover-background: var(--sapButton_Reject_Selected_Hover_Background, var(--udexCoreSemanticError2));--udex-button-color-negative-toggled-hover-border: var(--sapButton_Reject_Selected_Hover_BorderColor, var(--udexCoreSemanticError8));--udex-button-color-negative-toggled-hover-text-and-icon: var(--udexCoreSemanticError8, #AA0808);--udex-button-color-negative-toggled-disabled-background: var(--sapButton_Reject_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-negative-toggled-disabled-border: var(--sapButton_Reject_Selected_BorderColor, var(--udexCoreSemanticError10));--udex-button-color-negative-toggled-disabled-text-and-icon: var(--sapButton_Reject_Selected_TextColor, var(--udexCoreSemanticError10));--udex-button-color-warning-standard-default-background: var(--sapButton_Attention_Background, var(--udexCoreSemanticWarning2));--udex-button-color-warning-standard-default-border: var(--sapButton_Attention_BorderColor, var(--udexCoreSemanticWarning7));--udex-button-color-warning-standard-default-text-and-icon: var(--sapButton_Attention_TextColor, var(--udexCoreSemanticWarning8));--udex-button-color-warning-standard-hover-background: var(--sapButton_Attention_Hover_Background, var(--udexCoreSemanticWarning3));--udex-button-color-warning-standard-hover-border: var(--sapButton_Attention_Hover_BorderColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-standard-hover-text-and-icon: var(--sapButton_Attention_Hover_TextColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-standard-active-background: var(--sapButton_Attention_Active_Background, var(--udexColorNeutralWhite));--udex-button-color-warning-standard-active-border: var(--sapButton_Attention_Active_BorderColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-standard-active-text-and-icon: var(--sapButton_Attention_Active_TextColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-standard-disabled-background: var(--sapButton_Attention_Background, var(--udexCoreSemanticWarning2));--udex-button-color-warning-standard-disabled-border: var(--sapButton_Attention_BorderColor, var(--udexCoreSemanticWarning7));--udex-button-color-warning-standard-disabled-text-and-icon: var(--sapButton_Attention_TextColor, var(--udexCoreSemanticWarning8));--udex-button-color-warning-toggled-default-background: var(--sapButton_Attention_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-warning-toggled-default-border: var(--sapButton_Attention_Selected_BorderColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-toggled-default-text-and-icon: var(--sapButton_Attention_Selected_TextColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-toggled-hover-background: var(--sapButton_Attention_Selected_Hover_Background, var(--udexCoreSemanticWarning2));--udex-button-color-warning-toggled-hover-border: var(--sapButton_Attention_Selected_Hover_BorderColor, var(--udexCoreSemanticWarning8));--udex-button-color-warning-toggled-hover-text-and-icon: var(--sapButton_Attention_Selected_Hover_BorderColor, var(--udexCoreSemanticWarning8));--udex-button-color-warning-toggled-disabled-background: var(--sapButton_Attention_Selected_Background, var(--udexColorNeutralWhite));--udex-button-color-warning-toggled-disabled-border: var(--sapButton_Attention_Selected_BorderColor, var(--udexCoreSemanticWarning10));--udex-button-color-warning-toggled-disabled-text-and-icon: var(--sapButton_Attention_Selected_TextColor, var(--udexCoreSemanticWarning10))}:host{display:inline-block}.udex-button{font-weight:var(--udexTypographyFontWeightMedium)}.udex-button--small{font-size:var(--udexTypographyNavigationMediumMFontSize);height:var(--udex-button-small-size)}.udex-button--small::part(button){padding:var(--udex-button-padding-small)}.udex-button--medium{font-size:1rem;height:var(--udex-button-medium-size)}.udex-button--medium::part(button){padding:var(--udex-button-padding-medium)}.udex-button--large{font-size:1rem;height:var(--udex-button-large-size)}.udex-button--large::part(button){padding:var(--udex-button-padding-large)}.udex-button--small[icon-only]{min-width:auto;width:26px;height:26px}.udex-button--medium[icon-only]{min-width:auto;width:36px;height:36px}.udex-button--large[icon-only]{min-width:auto;width:42px;height:42px}.udex-button--small[icon-only]::part(button){padding:6px}.udex-button--medium[icon-only]::part(button){padding:10px}.udex-button--large[icon-only]::part(button){padding:12px}:host([icon-only][icon-end]) .udex-button::part(icon){margin:0}:host([icon-end]) .udex-button::part(icon){margin-inline-start:8px}.udex-button--small::part(icon){height:var(--udex-button-icon-s-size, 14px);width:var(--udex-button-icon-s-size, 14px)}.udex-button--medium::part(icon),.udex-button--large::part(icon){height:var(--udex-button-icon-l-size, 18px);width:var(--udex-button-icon-l-size, 18px)}.udex-button[design=Primary]{color:var(--udex-button-color-primary-standard-default-text-and-icon);background-color:var(--udex-button-color-primary-standard-default-background);border:1px solid var(--udex-button-color-primary-standard-default-background)}.udex-button[design=Primary]:hover:not([disabled]){color:var(--udex-button-color-primary-standard-hover-text-and-icon);background-color:var(--udex-button-color-primary-standard-hover-background);border:1px solid var(--udex-button-color-primary-standard-hover-background)}.udex-button[design=Primary]:active:not([disabled]){color:var(--udex-button-color-primary-standard-active-text-and-icon);background-color:var(--udex-button-color-primary-standard-active-background);border:1px solid var(--udex-button-color-primary-standard-active-border)}.udex-button[design=Primary]:disabled{color:var(--udex-button-color-primary-standard-disabled-text-and-icon);background-color:var(--udex-button-color-primary-standard-disabled-background);border:1px solid var(--udex-button-color-primary-standard-disabled-background);opacity:var(--sapContent_DisabledOpacity, .4)}.udex-button[design=Primary][toggled]{color:var(--udex-button-color-primary-toggled-default-text-and-icon);background-color:var(--udex-button-color-primary-toggled-default-background);border:1px solid var(--udex-button-color-primary-toggled-default-border)}.udex-button[design=Primary][toggled]:hover:not([disabled]){color:var(--udex-button-color-primary-toggled-hover-text-and-icon);background-color:var(--udex-button-color-primary-toggled-hover-background);border:1px solid var(--udex-button-color-primary-toggled-hover-border)}.udex-button[design=Primary][toggled]:disabled{color:var(--udex-button-color-primary-toggled-disabled-text-and-icon);background-color:var(--udex-button-color-primary-toggled-disabled-background);border:1px solid var(--udex-button-color-primary-toggled-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}.udex-button[design=Secondary]{color:var(--udex-button-color-secondary-standard-default-text-and-icon);background-color:var(--udex-button-color-secondary-standard-default-background);border:1px solid var(--udex-button-color-secondary-standard-default-border)}.udex-button[design=Secondary]:hover:not([disabled]){color:var(--udex-button-color-secondary-standard-hover-text-and-icon);background-color:var(--udex-button-color-secondary-standard-hover-background);border:1px solid var(--udex-button-color-secondary-standard-hover-border)}.udex-button[design=Secondary]:active:not([disabled]){color:var(--udex-button-color-secondary-standard-active-text-and-icon);background-color:var(--udex-button-color-secondary-standard-active-background);border:1px solid var(--udex-button-color-secondary-standard-active-border)}.udex-button[design=Secondary]:disabled{color:var(--udex-button-color-secondary-standard-disabled-text-and-icon);background-color:var(--udex-button-color-secondary-standard-disabled-background);border:1px solid var(--udex-button-color-secondary-standard-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}.udex-button[design=Secondary][toggled]{color:var(--udex-button-color-secondary-toggled-default-text-and-icon);background-color:var(--udex-button-color-secondary-toggled-default-background);border:1px solid var(--udex-button-color-secondary-toggled-default-border)}.udex-button[design=Secondary][toggled]:hover:not([disabled]){color:var(--udex-button-color-secondary-toggled-hover-text-and-icon);background-color:var(--udex-button-color-secondary-toggled-hover-background);border:1px solid var(--sapButton_Selected_Hover_BorderColor)}.udex-button[design=Secondary][toggled]:disabled{color:var(--udex-button-color-secondary-toggled-disabled-text-and-icon);background-color:var(--udex-button-color-secondary-toggled-disabled-background);border:1px solid var(--udex-button-color-secondary-toggled-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}.udex-button[design=Tertiary]{color:var(--udex-button-color-tertiary-standard-default-text-and-icon);background-color:var(--udex-button-color-tertiary-standard-default-background);border:1px solid var(--udex-button-color-tertiary-standard-default-border)}.udex-button[design=Tertiary]:hover:not([disabled]){color:var(--udex-button-color-tertiary-standard-hover-text-and-icon);background-color:var(--udex-button-color-tertiary-standard-hover-background);border:1px solid var(--udex-button-color-tertiary-standard-hover-border)}.udex-button[design=Tertiary]:active:not([disabled]){color:var(--udex-button-color-tertiary-standard-active-text-and-icon);background-color:var(--udex-button-color-tertiary-standard-active-background);border:1px solid var(--udex-button-color-tertiary-standard-active-border)}.udex-button[design=Tertiary]:disabled{color:var(--udex-button-color-tertiary-standard-disabled-text-and-icon);background-color:var(--udex-button-color-tertiary-standard-disabled-background);border:1px solid var(--udex-button-color-tertiary-standard-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}.udex-button[design=Tertiary][toggled]{color:var(--udex-button-color-tertiary-toggled-default-text-and-icon);background-color:var(--udex-button-color-tertiary-toggled-default-background);border:1px solid var(--udex-button-color-tertiary-toggled-default-border)}.udex-button[design=Tertiary][toggled]:hover:not([disabled]){color:var(--udex-button-color-tertiary-toggled-hover-text-and-icon);background-color:var(--udex-button-color-tertiary-toggled-hover-background);border:1px solid var(--udex-button-color-tertiary-toggled-hover-border)}.udex-button[design=Tertiary][toggled]:disabled{color:var(--udex-button-color-tertiary-toggled-disabled-text-and-icon);background-color:var(--udex-button-color-tertiary-toggled-disabled-background);border:1px solid var(--udex-button-color-tertiary-toggled-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}.udex-button[design=Positive]{color:var(--udex-button-color-positive-standard-default-text-and-icon);background-color:var(--udex-button-color-positive-standard-default-background);border:1px solid var(--udex-button-color-positive-standard-default-border)}.udex-button[design=Positive]:hover:not([disabled]){color:var(--udex-button-color-positive-standard-hover-text-and-icon);background-color:var(--udex-button-color-positive-standard-hover-background);border:1px solid var(--udex-button-color-positive-standard-hover-border)}.udex-button[design=Positive]:active:not([disabled]){color:var(--udex-button-color-positive-standard-active-text-and-icon);background-color:var(--udex-button-color-positive-standard-active-background);border:1px solid var(--udex-button-color-positive-standard-active-border)}.udex-button[design=Positive]:disabled{color:var(--udex-button-color-positive-standard-disabled-text-and-icon);background-color:var(--udex-button-color-positive-standard-disabled-background);border:1px solid var(--udex-button-color-positive-standard-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}.udex-button[design=Positive][toggled]{color:var(--udex-button-color-positive-toggled-default-text-and-icon);background-color:var(--udex-button-color-positive-toggled-default-background);border:1px solid var(--udex-button-color-positive-toggled-default-border)}.udex-button[design=Positive][toggled]:hover:not([disabled]){color:var(--udex-button-color-positive-toggled-hover-text-and-icon);background-color:var(--udex-button-color-positive-toggled-hover-background);border:1px solid var(--udex-button-color-positive-toggled-hover-border)}.udex-button[design=Positive][toggled]:disabled{color:var(--udex-button-color-positive-toggled-disabled-text-and-icon);background-color:var(--udex-button-color-positive-toggled-disabled-background);border:1px solid var(--udex-button-color-positive-toggled-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}.udex-button[design=Negative]{color:var(--udex-button-color-negative-standard-default-text-and-icon);background-color:var(--udex-button-color-negative-standard-default-background);border:1px solid var(--udex-button-color-negative-standard-default-border)}.udex-button[design=Negative]:hover:not([disabled]){color:var(--udex-button-color-negative-standard-hover-text-and-icon);background-color:var(--udex-button-color-negative-standard-hover-background);border:1px solid var(--udex-button-color-negative-standard-hover-border)}.udex-button[design=Negative]:active:not([disabled]){color:var(--udex-button-color-negative-standard-active-text-and-icon);background-color:var(--udex-button-color-negative-standard-active-background);border:1px solid var(--udex-button-color-negative-standard-active-border)}.udex-button[design=Negative]:disabled{color:var(--udex-button-color-negative-standard-disabled-text-and-icon);background-color:var(--udex-button-color-negative-standard-disabled-background);border:1px solid var(--udex-button-color-negative-standard-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}.udex-button[design=Negative][toggled]{color:var(--udex-button-color-negative-toggled-default-text-and-icon);background-color:var(--udex-button-color-negative-toggled-default-background);border:1px solid var(--udex-button-color-negative-toggled-default-border)}.udex-button[design=Negative][toggled]:hover:not([disabled]){color:var(--udex-button-color-negative-toggled-hover-text-and-icon);background-color:var(--udex-button-color-negative-toggled-hover-background);border:1px solid var(--udex-button-color-negative-toggled-hover-border)}.udex-button[design=Negative][toggled]:disabled{color:var(--udex-button-color-negative-toggled-disabled-text-and-icon);background-color:var(--udex-button-color-negative-toggled-disabled-background);border:1px solid var(--udex-button-color-negative-toggled-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}.udex-button[design=Warning]{color:var(--udex-button-color-warning-standard-default-text-and-icon);background-color:var(--udex-button-color-warning-standard-default-background);border:1px solid var(--udex-button-color-warning-standard-default-border)}.udex-button[design=Warning]:hover:not([disabled]){color:var(--udex-button-color-warning-standard-hover-text-and-icon);background-color:var(--udex-button-color-warning-standard-hover-background);border:1px solid var(--udex-button-color-warning-standard-hover-border)}.udex-button[design=Warning]:active:not([disabled]){color:var(--udex-button-color-warning-standard-active-text-and-icon);background-color:var(--udex-button-color-warning-standard-active-background);border:1px solid var(--udex-button-color-warning-standard-active-border)}.udex-button[design=Warning]:disabled{color:var(--udex-button-color-warning-standard-disabled-text-and-icon);background-color:var(--udex-button-color-warning-standard-disabled-background);border:1px solid var(--udex-button-color-warning-standard-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}.udex-button[design=Warning][toggled]{color:var(--udex-button-color-warning-toggled-default-text-and-icon);background-color:var(--udex-button-color-warning-toggled-default-background);border:1px solid var(--udex-button-color-warning-toggled-default-border)}.udex-button[design=Warning][toggled]:hover:not([disabled]){color:var(--udex-button-color-warning-toggled-hover-text-and-icon);background-color:var(--udex-button-color-warning-toggled-hover-background);border:1px solid var(--udex-button-color-warning-toggled-hover-border)}.udex-button[design=Warning][toggled]:disabled{color:var(--udex-button-color-warning-toggled-disabled-text-and-icon);background-color:var(--udex-button-color-warning-toggled-disabled-background);border:1px solid var(--udex-button-color-warning-toggled-disabled-border);opacity:var(--sapContent_DisabledOpacity, .4)}
` };
var s = function(t, o, e, u) {
  var l = arguments.length, i = l < 3 ? o : u === null ? u = Object.getOwnPropertyDescriptor(o, e) : u, b;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(t, o, e, u);
  else
    for (var v = t.length - 1; v >= 0; v--)
      (b = t[v]) && (i = (l < 3 ? b(i) : l > 3 ? b(o, e, i) : b(o, e)) || i);
  return l > 3 && i && Object.defineProperty(o, e, i), i;
};
let c = class extends D {
  onButtonClick(o) {
    o.stopPropagation(), this.disabled === !1 && this.fireEvent("click");
  }
  get renderIconOnlyButton() {
    return !this.iconOnly;
  }
  get sizeClass() {
    switch (this.size) {
      case "Small":
        return "udex-button--small";
      case "Medium":
        return "udex-button--medium";
      case "Large":
        return "udex-button--large";
      default:
        return "udex-button--medium";
    }
  }
};
s([
  r({ type: Boolean })
], c.prototype, "disabled", void 0);
s([
  r({ type: String, defaultValue: "Medium" })
], c.prototype, "size", void 0);
s([
  r({ type: String, defaultValue: "" })
], c.prototype, "tooltip", void 0);
s([
  r({ type: String, defaultValue: "Primary" })
], c.prototype, "design", void 0);
s([
  r({ type: String })
], c.prototype, "icon", void 0);
s([
  r({ type: Boolean })
], c.prototype, "iconOnly", void 0);
s([
  r({ type: Boolean })
], c.prototype, "iconEnd", void 0);
s([
  r({ type: Boolean })
], c.prototype, "toggled", void 0);
s([
  r({ type: String })
], c.prototype, "accessibleNameRef", void 0);
s([
  r({ type: String })
], c.prototype, "accessibleName", void 0);
s([
  r({ type: String, defaultValue: "Button" })
], c.prototype, "accessibleRole", void 0);
s([
  r({ type: Object })
], c.prototype, "accessibilityAttributes", void 0);
s([
  O({ type: Node })
], c.prototype, "default", void 0);
c = s([
  P({
    tag: "udex-button",
    renderer: I,
    styles: lo,
    template: so
  }),
  f("click")
], c);
c.define();
