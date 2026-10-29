// The North Shore skyline as nested contour lines: the Lions on the left, Grouse and
// Fromme in the middle, Seymour on the right. Line 0 is the ridge; each line below it
// is a lower contour, flatter and closer to the water.
//
// The lines move like a shoreline. The ridge (land) barely breathes; the contours below
// it are water: a long swell rolls along them, a smaller ripple runs back against it, and
// every few seconds a set washes up toward the ridge and slowly drains back, reaching the
// lowest line first. Motion is a pure function of time, so a ridgeline that persists
// across page navigations simply carries on where it was.
type Point = [number, number];

const RIDGE: Point[] = [
  [-20, 150], [90, 130], [160, 104], [208, 80], [234, 92], [258, 76], [310, 100],
  [380, 112], [470, 86], [560, 60], [640, 72], [720, 98], [800, 90], [880, 66],
  [960, 54], [1040, 76], [1120, 102], [1200, 84], [1290, 72], [1370, 98], [1460, 120],
];

// The ridge, densely resampled along its Catmull-Rom curve so the shorter waves have
// enough points to stay smooth.
const SHORE: Point[] = RIDGE.slice(0, -1).flatMap((p1, i) => {
  const p0 = RIDGE[Math.max(i - 1, 0)], p2 = RIDGE[i + 1], p3 = RIDGE[Math.min(i + 2, RIDGE.length - 1)];
  const steps = Math.max(2, Math.round((p2[0] - p1[0]) / 22));
  return Array.from({ length: steps }, (_, s): Point => {
    const u = s / steps, u2 = u * u, u3 = u2 * u;
    const cr = (a: number, b: number, c: number, d: number) =>
      0.5 * (2 * b + (c - a) * u + (2 * a - 5 * b + 4 * c - d) * u2 + (3 * b - a - 3 * c + d) * u3);
    return [cr(p0[0], p1[0], p2[0], p3[0]), cr(p0[1], p1[1], p2[1], p3[1])];
  });
}).concat([RIDGE[RIDGE.length - 1]]);

const TAU = Math.PI * 2;
const LAP_PERIOD = 7; // seconds between sets washing up
const LAP_RISE = 0.32; // share of each lap spent washing up; the rest drains back

const smoothstep = (u: number) => u * u * (3 - 2 * u);

/** 0 → 1 → 0 once per lap: a quicker wash up, a long slow drain. */
function lap(phase: number) {
  const p = phase - Math.floor(phase);
  return p < LAP_RISE ? smoothstep(p / LAP_RISE) : 1 - smoothstep((p - LAP_RISE) / (1 - LAP_RISE));
}

/** Vertical offset (viewBox units) of contour `k` at `x`, time `t` seconds. */
function water(k: number, x: number, t: number) {
  const swell = k === 0 ? 1 : 2.2 + 2.4 * k;
  const roll =
    0.62 * Math.sin(TAU * (x / 760 - t / 9) + k * 0.55) +
    0.38 * Math.sin(TAU * (x / 380 + t / 6.5) + k * 0.9);
  // Small chop on the water lines only.
  const chop = 0.5 * k * Math.sin(TAU * (x / 170 - t / 3.6) + k * 1.3);
  // Sets sweep along the shore from the left and reach lower lines a moment sooner.
  const up = lap((t + k * 0.35) / LAP_PERIOD - x / 2900) - 0.5;
  return swell * roll + chop - 2.2 * k * up;
}

/** Points for contour `k` at time `t` (seconds), with the motion scaled by `swell` (0–1). */
function contour(k: number, t: number, swell: number): Point[] {
  return SHORE.map(([x, y]) => {
    const base = 175 + k * 12 - (175 - y) * (1 - 0.24 * k);
    return [x, base + swell * water(k, x, t)];
  });
}

// Catmull-Rom -> cubic Bezier for an open polyline.
function smooth(pts: Point[]) {
  const f = (n: number) => n.toFixed(1);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(i - 1, 0)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(i + 2, pts.length - 1)];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d;
}

export const contourPath = (k: number, t = 0, swell = 0) => smooth(contour(k, t, swell));
export const fillPath = (ridgePath: string) => `${ridgePath}L1460 240L-20 240Z`;
