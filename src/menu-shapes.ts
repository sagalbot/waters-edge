// Shapes for the mobile menu, drawn on the server for the resting state and redrawn
// each frame while the menu opens or closes (see components/MobileMenu.astro).

const f = (n: number) => n.toFixed(2);
const smoothstep = (p: number) => p * p * (3 - 2 * p);

/** One toggle line at progress p (0 = straight bar, 1 = arm of the X). s is -1 (top) or 1 (bottom).
 *  On the way the line ripples like a disturbed waterline, then settles. */
export function toggleLine(s: -1 | 1, p: number) {
  const e = smoothstep(p);
  const ripple = 2.4 * Math.sin(Math.PI * p);
  const pts: string[] = [];
  for (let i = 0; i <= 12; i++) {
    const u = i / 6 - 1;
    const x = 9 * u + (6.5 * u - 9 * u) * e;
    const y = 3.5 * s + (-6.5 * s * u - 3.5 * s) * e + ripple * Math.sin(Math.PI * 2 * u + p * 5 + s);
    pts.push(`${i ? "L" : "M"}${f(x)} ${f(y)}`);
  }
  return pts.join("");
}

/** The drawer's leading edge. k is the opening progress: the edge washes in with a
 *  travelling ripple that dies away, leaving a still, gently curved shoreline at k = 1. */
export function edgePath(k = 1) {
  const swell = 9 * (1 - k) * (1 - k);
  const pts: string[] = ["M40 0"];
  for (let i = 0; i <= 40; i++) {
    const y = (i / 40) * 100;
    const x = 18 + 9 * Math.sin((Math.PI * 2 * y) / 140 + 0.6) + swell * Math.sin((Math.PI * 2 * y) / 38 - k * 9);
    pts.push(`L${f(x)} ${f(y)}`);
  }
  return pts.join("") + "L40 100Z";
}
