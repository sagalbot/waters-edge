// View transitions between pages (keyframes live in styles/global.css).
// The hero recedes or rises like a tide to its new height; its headline washes out and
// the next one is revealed. The ridgeline is never redrawn: the live element rides the
// hero's edge, still moving, while its outgoing snapshot quietly dissolves.
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
const TIDE = "900ms";

const both = <T>(anim: T) => ({ forwards: anim, backwards: anim });

export const wash = both({
  old: { name: "washOut", duration: "560ms", easing: EASE, fillMode: "both" },
  new: { name: "washIn", duration: "700ms", delay: "180ms", easing: EASE, fillMode: "both" },
});

export const tide = both({
  old: { name: "tideOut", duration: TIDE, easing: EASE, fillMode: "both" },
  new: { name: "tideIn", duration: TIDE, easing: EASE, fillMode: "both" },
});

export const ridge = both({
  old: { name: "tideOut", duration: "360ms", easing: "ease-out", fillMode: "both" },
  new: { name: "tideHold", duration: TIDE, fillMode: "both" },
});
