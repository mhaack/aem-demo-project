const o = (e) => (n, r) => {
  const d = n.constructor;
  Object.prototype.hasOwnProperty.call(d, "metadata") || (d.metadata = {});
  const a = d.metadata;
  a.slots || (a.slots = {});
  const t = a.slots;
  if (e && e.default && t.default)
    throw new Error("Only one slot can be the default slot.");
  const f = e && e.default ? "default" : r;
  e = e || { type: HTMLElement }, e.type || (e.type = HTMLElement), t[f] || (t[f] = e), e.default && (delete t.default.default, t.default.propertyName = r), d.metadata.managedSlots = !0;
};
export {
  o as s
};
