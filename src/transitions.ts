// View transitions between pages (keyframes live in styles/global.css).
// The hero headline washes out like a receding wave and the new one is revealed
// behind it; the ridgeline flows sideways while the hero resizes.
const EASE = "cubic-bezier(0.65, 0, 0.35, 1)";

const both = <T>(anim: T) => ({ forwards: anim, backwards: anim });

export const wash = both({
  old: { name: "washOut", duration: "520ms", easing: EASE, fillMode: "both" },
  new: { name: "washIn", duration: "640ms", delay: "140ms", easing: EASE, fillMode: "both" },
});

export const flow = both({
  old: { name: "ridgeFlowOut", duration: "700ms", easing: EASE, fillMode: "both" },
  new: { name: "ridgeFlowIn", duration: "700ms", easing: EASE, fillMode: "both" },
});
