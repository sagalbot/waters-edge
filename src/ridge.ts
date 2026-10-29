// The North Shore skyline as nested contour lines: the Lions on the left, Grouse and
// Fromme in the middle, Seymour on the right. Line 0 is the ridge; each line below it
// is a lower contour, flatter and closer to the water.
//
// The lines move like a shoreline: two slow swells travelling in opposite directions
// plus a gentle tidal rise and fall. The mountain line barely stirs and each lower
// contour moves a little more. Motion is a pure function of time, so a ridgeline that
// persists across page navigations simply carries on where it was.
type Point = [number, number];

const RIDGE: Point[] = [
  [-20, 150], [90, 130], [160, 104], [208, 80], [234, 92], [258, 76], [310, 100],
  [380, 112], [470, 86], [560, 60], [640, 72], [720, 98], [800, 90], [880, 66],
  [960, 54], [1040, 76], [1120, 102], [1200, 84], [1290, 72], [1370, 98], [1460, 120],
];

const TAU = Math.PI * 2;

/** Points for contour `k` at time `t` (seconds), with the motion scaled by `swell` (0–1). */
function contour(k: number, t: number, swell: number): Point[] {
  const amp = swell * (0.8 + 1.6 * k);
  return RIDGE.map(([x, y]) => {
    const base = 175 + k * 12 - (175 - y) * (1 - 0.24 * k);
    const wave =
      0.55 * Math.sin((TAU * x) / 760 - (TAU * t) / 15 + k * 0.9) +
      0.3 * Math.sin((TAU * x) / 470 + (TAU * t) / 23 + k * 1.7) +
      0.35 * Math.sin((TAU * t) / 19 + k * 0.6);
    return [x, base + amp * wave];
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
