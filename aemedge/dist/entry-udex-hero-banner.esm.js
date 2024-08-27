import { r as h, i as v, e as i, l as a, s as m, a as _, b as H, c as C, p as c, d as $, U as w, f as V, g as I } from "./parameters-bundle.css-umy6yUJ9.js";
import { s as p } from "./slot-n2SAeQik.js";
const q = "media-play", k = "M433.5 246q8 5 8 13.5t-8 13.5l-314 203q-8 4-17 4-13 0-22.5-9t-9.5-23V64q0-14 9.5-23t22.5-9q7 0 17 5zm-96 13l-203-135v266z", M = !0, P = "SAP-icons-v4", S = "@ui5/webcomponents-icons";
h(q, { pathData: k, ltr: M, collection: P, packageName: S });
const z = "media-play", y = "M122 480q-11 0-18.5-7.5T96 454V58q0-11 7.5-18.5T122 32q7 0 15 5l269 198q10 8 10 21t-10 21L137 475q-8 5-15 5zm25-372v296l200-148z", N = !0, D = "SAP-icons-v5", L = "@ui5/webcomponents-icons";
h(z, { pathData: y, ltr: N, collection: D, packageName: L });
v();
const T = "media-pause", B = "M160 64q0-14 9.5-23t22.5-9q14 0 23 9t9 23v385q0 13-9 22.5t-23 9.5q-13 0-22.5-9.5T160 449V64zm128 0q0-14 9.5-23t22.5-9q14 0 23 9t9 23v385q0 13-9 22.5t-23 9.5q-13 0-22.5-9.5T288 449V64z", j = !1, A = "SAP-icons-v4", E = "@ui5/webcomponents-icons";
h(T, { pathData: B, ltr: j, collection: A, packageName: E });
const R = "media-pause", f = "M358 480h-33q-11 0-18.5-7.5T299 454V58q0-11 7.5-18.5T325 32h33q11 0 18.5 7.5T384 58v396q0 11-7.5 18.5T358 480zm-171 0h-33q-11 0-18.5-7.5T128 454V58q0-11 7.5-18.5T154 32h33q11 0 18.5 7.5T213 58v396q0 11-7.5 18.5T187 480z", W = !1, O = "SAP-icons-v5", Z = "@ui5/webcomponents-icons";
h(R, { pathData: f, ltr: W, collection: O, packageName: Z });
v();
function U(t, e, n) {
  return i`<div class="${a(this.heroBannerClasses)}" part="wrapper" style="background-color: ${a(this.wrapperBackgroundColor)}">${this.hasCustomBackgroundPicture ? F.call(this, t, e, n) : K.call(this, t, e, n)}${this.hasBackgroundVideo ? G.call(this, t, e, n) : J.call(this, t, e, n)}</div> `;
}
function F(t, e, n) {
  return i`<slot name="backgroundPicture"></slot>`;
}
function K(t, e, n) {
  return i`${this.hasBackgroundImage ? X.call(this, t, e, n) : void 0}`;
}
function X(t, e, n) {
  return i`<picture><img loading="${a(this.backgroundImageLoadingStrategy)}" src="${a(this.backgroundImage)}" part="background-image" class="udex-hero-banner__background-image" alt="${a(this.backgroundImageLabel)}" /></picture>`;
}
function G(t, e, n) {
  return n ? i`<div class="udex-hero-banner__background-video-wrapper" tabindex="0" @keydown=${this._handleKeydown}><video autoplay muted loop playsinline part="background-video" class="udex-hero-banner__background-video" alt="${a(this.backgroundVideoLabel)}"><source src="${a(this.backgroundVideo)}" type="video/mp4" /></video><div class="udex-hero-banner__background-video-overlay"></div><slot id="udex-hero-banner__content" name="content" part="content"></slot>${this.hasAdditionalContent ? x.call(this, t, e, n) : void 0}<button class="udex-hero-banner__media-button" aria-label="Play / Pause button" role="button" @click=${this._toggleMediaButton}><${m("ui5-icon", e, n)} name=${a(this.mediaButtonIconName)}></${m("ui5-icon", e, n)}></button></div>` : i`<div class="udex-hero-banner__background-video-wrapper" tabindex="0" @keydown=${this._handleKeydown}><video autoplay muted loop playsinline part="background-video" class="udex-hero-banner__background-video" alt="${a(this.backgroundVideoLabel)}"><source src="${a(this.backgroundVideo)}" type="video/mp4" /></video><div class="udex-hero-banner__background-video-overlay"></div><slot id="udex-hero-banner__content" name="content" part="content"></slot>${this.hasAdditionalContent ? x.call(this, t, e, n) : void 0}<button class="udex-hero-banner__media-button" aria-label="Play / Pause button" role="button" @click=${this._toggleMediaButton}><ui5-icon name=${a(this.mediaButtonIconName)}></ui5-icon></button></div>`;
}
function x(t, e, n) {
  return i`<slot id="udex-hero-banner__additionalContent" name="additionalContent" part="additionalContent"></slot>`;
}
function J(t, e, n) {
  return i`<slot id="udex-hero-banner__content" name="content" part="content"></slot>${this.hasAdditionalContent ? Q.call(this, t, e, n) : void 0}`;
}
function Q(t, e, n) {
  return i`<slot id="udex-hero-banner__additionalContent" name="additionalContent" part="additionalContent"></slot>`;
}
_("@ui5/webcomponents-theming", "sap_horizon", async () => H);
_("@udex/web-components", "sap_horizon", async () => C);
const Y = { packageName: "@udex/web-components", fileName: "themes/HeroBanner.css.ts", content: `:host{--udexHeroBannerMinHeight: 200px;--udexHeroBannerBackgroundImageObjectFit: contain;--udexHeroBannerVerticalLayoutBackgroundImageAlignment: bottom right;--udexHeroBannerHorizontalLayoutBackgroundImageAlignment: top right;--udexHeroBannerBackroundImageZIndex: 1;--udexHeroBannerBackroundVideoZIndex: 1;--udexHeroBannerContentZIndex: 2;--udexHeroBannerContentPaddingHorizontal: var(--udexGridXSMargins, 24px);--udexHeroBannerContentPaddingVertical: var(--udexGridXSMargins, 24px);--udexHeroBannerBackgroundVideoColor: var(--udexColorNeutralBlack);--udexHeroBannerSlotMaxWidth: calc( 50% - (2 * var(--udexHeroBannerContentPaddingVertical)) );--udexHeroBannerSlotMaxHeight: calc( 100% - (2 * var(--udexHeroBannerContentPaddingHorizontal)) )}.udex-hero-banner{container-type:inline-size;position:relative;display:flex;flex-wrap:wrap;min-height:var(--udexHeroBannerMinHeight, 200px)}.udex-hero-banner--video{color:var(--udexColorNeutralWhite);justify-content:center}.udex-hero-banner__background-image{position:absolute;width:100%;height:100%;object-fit:var(--udexHeroBannerBackgroundImageObjectFit, contain);object-position:var( --udexHeroBannerVerticalLayoutBackgroundImageAlignment, bottom right );z-index:var(--udexHeroBannerBackroundImageZIndex, 1)}.udex-hero-banner__background-video-wrapper{position:relative;width:100%;max-width:100rem;height:100%}.udex-hero-banner__media-button:dir(rtl){left:0;right:initial}.udex-hero-banner__media-button:hover{cursor:pointer;background:var(--udexColorNeutralBlack70)}.udex-hero-banner__media-button ui5-icon{color:var(--udexColorNeutralWhite);display:flex;align-items:center;justify-content:center;height:1.5rem;width:1.5rem}.udex-hero-banner__background-image:dir(rtl),.udex-hero-banner__background-video-overlay:dir(rtl){transform:scaleX(-1)}.udex-hero-banner__background-video,.udex-hero-banner__background-video-overlay,.udex-hero-banner__media-button{display:none}#udex-hero-banner__content,#udex-hero-banner__additionalContent{display:flex;max-height:var(--udexHeroBannerSlotMaxHeight);flex-basis:100%;flex-grow:1;z-index:var(--udexHeroBannerContentZIndex, 2);padding:var(--udexHeroBannerContentPaddingVertical) var(--udexHeroBannerContentPaddingHorizontal)}@container (min-width: 640px){.udex-hero-banner--video{height:28.125rem;background-color:var(--udexHeroBannerBackgroundVideoColor)!important}.udex-hero-banner__media-button{border:3px solid var(--udexColorNeutralWhite);color:var(--udexColorNeutralWhite);background:var(--udexColorNeutralBlack40);display:flex;justify-content:center;align-items:center;border-radius:50%;padding:0;width:3rem;height:3rem;position:absolute;bottom:0;right:0;margin:var(--udexHeroBannerContentPaddingHorizontal);z-index:3}.udex-hero-banner__background-video{position:absolute;display:block;width:100%;object-fit:cover;object-position:center;height:100%}.udex-hero-banner__background-video-overlay{position:absolute;display:block;width:100%;height:100%;background:linear-gradient(90deg,rgba(18,23,28,.765) 0%,rgba(18,23,28,.09) 100%)}.udex-hero-banner__background-image{object-position:var( --udexHeroBannerHorizontalLayoutBackgroundImageAlignment, top right )}#udex-hero-banner__content,#udex-hero-banner__additionalContent{max-width:var(--udexHeroBannerSlotMaxWidth);flex-basis:var(--udexHeroBannerSlotMaxWidth)}}
` };
var r = function(t, e, n, u) {
  var l = arguments.length, d = l < 3 ? e : u === null ? u = Object.getOwnPropertyDescriptor(e, n) : u, s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    d = Reflect.decorate(t, e, n, u);
  else
    for (var b = t.length - 1; b >= 0; b--)
      (s = t[b]) && (d = (l < 3 ? s(d) : l > 3 ? s(e, n, d) : s(e, n)) || d);
  return l > 3 && d && Object.defineProperty(e, n, d), d;
}, g;
(function(t) {
  t.eager = "eager", t.lazy = "lazy";
})(g || (g = {}));
let o = class extends w {
  constructor() {
    super(...arguments), this._isHTMLDivElement = (e) => e.tagName === "DIV";
  }
  get hasBackgroundImage() {
    return !!this.backgroundImage;
  }
  get hasBackgroundVideo() {
    return !!this.backgroundVideo;
  }
  get wrapperBackgroundColor() {
    return this.backgroundColor ? this.backgroundColor : "transparent";
  }
  get heroBannerClasses() {
    const e = ["udex-hero-banner"];
    return this.hasBackgroundVideo && e.push("udex-hero-banner--video"), e.join(" ");
  }
  get hasAdditionalContent() {
    var e;
    return !!((e = this.additionalContent) != null && e.length);
  }
  get hasCustomBackgroundPicture() {
    var e;
    return !!((e = this.backgroundPicture) != null && e.length);
  }
  get mediaButtonIconName() {
    return this._isVideoRunning ? "media-pause" : "media-play";
  }
  get _video() {
    var e;
    return (e = this.shadowRoot) == null ? void 0 : e.querySelector("video");
  }
  _toggleMediaButton() {
    var e, n, u;
    (e = this._video) != null && e.paused ? (n = this._video) == null || n.play() : (u = this._video) == null || u.pause(), this._calculateMediaButtonState();
  }
  _calculateMediaButtonState() {
    var e;
    this._isVideoRunning = !((e = this._video) != null && e.paused);
  }
  _handleKeydown(e) {
    const n = e.target;
    this._isHTMLDivElement(n) && V(e) && this._toggleMediaButton();
  }
  onEnterDOM() {
    var e;
    this.backgroundVideo && ((e = this._video) == null || e.addEventListener("play", () => {
      this._calculateMediaButtonState();
    }));
  }
};
r([
  c({ type: String })
], o.prototype, "backgroundImage", void 0);
r([
  c({ type: g, defaultValue: g.eager })
], o.prototype, "backgroundImageLoadingStrategy", void 0);
r([
  c({ type: String })
], o.prototype, "backgroundImageLabel", void 0);
r([
  c({ type: String })
], o.prototype, "backgroundVideo", void 0);
r([
  c({ type: String })
], o.prototype, "backgroundVideoLabel", void 0);
r([
  c({ type: String })
], o.prototype, "backgroundColor", void 0);
r([
  c({ type: Boolean, noAttribute: !0 })
], o.prototype, "_isVideoRunning", void 0);
r([
  p()
], o.prototype, "content", void 0);
r([
  p()
], o.prototype, "additionalContent", void 0);
r([
  p()
], o.prototype, "backgroundPicture", void 0);
o = r([
  $({
    tag: "udex-hero-banner",
    renderer: I,
    styles: Y,
    template: U
  })
], o);
o.define();
