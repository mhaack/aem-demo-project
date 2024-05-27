import { e as i, l, r as h, s as m, a as b, p as s, b as x, c as f, U as B, d as k } from "./parameters-bundle.css-D8cwbzFi.js";
function y(n, e, t) {
  return i`<div class="udex-hero-banner" part="wrapper" style="background-color: ${l(this.wrapperBackgroundColor)}">${this.hasCustomBackgroundPicture ? H.call(this, n, e, t) : v.call(this, n, e, t)}<slot name="content" part="content"></slot>${this.hasAdditionalContent ? I.call(this, n, e, t) : void 0}</div>`;
}
function H(n, e, t) {
  return i`<slot name="backgroundPicture"></slot>`;
}
function v(n, e, t) {
  return i`${this.hasBackgroundImage ? C.call(this, n, e, t) : void 0}`;
}
function C(n, e, t) {
  return i`<picture><img loading="${l(this.backgroundImageLoadingStrategy)}" src="${l(this.backgroundImage)}" part="background-image" class="udex-hero-banner__background-image" alt="${l(this.backgroundImageLabel)}" /></picture>`;
}
function I(n, e, t) {
  return i`<slot name="additionalContent" part="additionalContent"></slot>`;
}
h("@ui5/webcomponents-theming", "sap_horizon", async () => m);
h("@udex/web-components", "sap_horizon", async () => b);
const _ = { packageName: "@udex/web-components", fileName: "themes/HeroBanner.css.ts", content: `:host{--udexHeroBannerMinHeight: 200px;--udexHeroBannerSlotMaxWidth: calc(50% - (2 * var(--udexHeroBannerContentPaddingVertical, 24px)));--udexHeroBannerBackgroundImageObjectFit: contain;--udexHeroBannerVerticalLayoutBackgroundImageAlignment: bottom right;--udexHeroBannerHorizontalLayoutBackgroundImageAlignment: top right;--udexHeroBannerBackroundImageZIndex: 1;--udexHeroBannerContentZIndex: 2;--udexHeroBannerContentPaddingHorizontal: var(--udexGridXSMargins, 24px);--udexHeroBannerContentPaddingVertical: var(--udexGridXSMargins, 24px)}.udex-hero-banner{container-type:inline-size;position:relative;display:flex;flex-wrap:wrap;min-height:var(--udexHeroBannerMinHeight, 200px)}.udex-hero-banner__background-image{position:absolute;width:100%;height:100%;object-fit:var(--udexHeroBannerBackgroundImageObjectFit, contain);object-position:var(--udexHeroBannerVerticalLayoutBackgroundImageAlignment, bottom right);z-index:var(--udexHeroBannerBackroundImageZIndex, 1)}.udex-hero-banner__background-image:dir(rtl){transform:scaleX(-1)}.udex-hero-banner slot[name=content],.udex-hero-banner slot[name=additionalContent]{display:flex;flex-basis:100%;flex-grow:1;z-index:var(--udexHeroBannerContentZIndex, 2);padding:var(--udexHeroBannerContentPaddingVertical, 24px) var(--udexHeroBannerContentPaddingHorizontal, 24px)}@container (min-width: 640px){.udex-hero-banner__background-image{object-position:var(--udexHeroBannerHorizontalLayoutBackgroundImageAlignment, top right)}.udex-hero-banner slot[name=content],.udex-hero-banner slot[name=additionalContent]{max-width:var(--udexHeroBannerSlotMaxWidth);flex-basis:var(--udexHeroBannerSlotMaxWidth)}}
` };
var o = function(n, e, t, d) {
  var u = arguments.length, r = u < 3 ? e : d === null ? d = Object.getOwnPropertyDescriptor(e, t) : d, c;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    r = Reflect.decorate(n, e, t, d);
  else
    for (var p = n.length - 1; p >= 0; p--)
      (c = n[p]) && (r = (u < 3 ? c(r) : u > 3 ? c(e, t, r) : c(e, t)) || r);
  return u > 3 && r && Object.defineProperty(e, t, r), r;
}, g;
(function(n) {
  n.eager = "eager", n.lazy = "lazy";
})(g || (g = {}));
let a = class extends B {
  get hasBackgroundImage() {
    return !!this.backgroundImage;
  }
  get wrapperBackgroundColor() {
    return this.backgroundColor ? this.backgroundColor : "transparent";
  }
  get hasAdditionalContent() {
    var e;
    return !!((e = this.additionalContent) != null && e.length);
  }
  get hasCustomBackgroundPicture() {
    var e;
    return !!((e = this.backgroundPicture) != null && e.length);
  }
};
o([
  s({ type: String })
], a.prototype, "backgroundImage", void 0);
o([
  s({ type: g, defaultValue: g.eager })
], a.prototype, "backgroundImageLoadingStrategy", void 0);
o([
  s({ type: String })
], a.prototype, "backgroundImageLabel", void 0);
o([
  s({ type: String })
], a.prototype, "backgroundColor", void 0);
o([
  x()
], a.prototype, "content", void 0);
o([
  x()
], a.prototype, "additionalContent", void 0);
o([
  x()
], a.prototype, "backgroundPicture", void 0);
a = o([
  f({
    tag: "udex-hero-banner",
    renderer: k,
    styles: _,
    template: y
  })
], a);
a.define();
