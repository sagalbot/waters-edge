// View transitions between pages (keyframes live in styles/global.css).
// The hero recedes or rises like a tide to its new height; its headline washes out and
// the next one is revealed. The ridgeline is never redrawn: it is carried over to the
// next page (transition:persist) and only its live self is shown, still moving, as it
// rides the hero's edge. Its outgoing snapshot is a frozen copy, so it is never shown.
const EASE = "var(--tide-ease)"; // see styles/global.css
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
  old: { name: "tideGone", duration: TIDE, fillMode: "both" },
  new: { name: "tideHold", duration: TIDE, fillMode: "both" },
});
