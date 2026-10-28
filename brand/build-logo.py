"""Redraw the Water's Edge logo as SVG.

Usage: python build-logo.py content/images/Waters_LOGO-B1.png FONT_DIR brand/logo

The ripple mark is measured from the original logo PNG: each ring's outline is
low-pass filtered (Fourier) to keep its organic shape without the hand-drawn jitter.
The wordmark is set as outlines from two Google Fonts (OFL) variable fonts, saved in FONT_DIR:
  Cormorant.ttf  https://github.com/google/fonts/raw/main/ofl/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf
  Jost.ttf       https://github.com/google/fonts/raw/main/ofl/jost/Jost%5Bwght%5D.ttf
Requires: fonttools uharfbuzz numpy scipy pillow cairosvg
"""
import sys, os
import numpy as np
from PIL import Image
from scipy import ndimage
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import cairosvg

SRC, FONTS, OUT = sys.argv[1:4]
os.makedirs(OUT, exist_ok=True)

CEDAR = "#2E4236"
CREAM = "#F4EFE6"


# ---------- mark: extract the five rings and redraw them as smooth curves ----------
def extract_rings(path, n_rings=5, samples=360):
    alpha = np.array(Image.open(path).convert("RGBA"))[..., 3] > 128
    lab, n = ndimage.label(alpha)
    sizes = ndimage.sum(alpha, lab, range(1, n + 1))
    # the rings are the largest components above the wordmark
    objs = ndimage.find_objects(lab)
    top = min(o[0].start for o in objs if o is not None and o[0].start > alpha.shape[0] * 0.55)
    ids = [i + 1 for i in np.argsort(-sizes) if objs[i][0].stop < top][:n_rings]
    rings = []
    for i in ids:
        ys, xs = np.nonzero(lab == i)
        cx, cy = xs.mean(), ys.mean()
        ang = np.arctan2(ys - cy, xs - cx)
        rad = np.hypot(xs - cx, ys - cy)
        bins = ((ang + np.pi) / (2 * np.pi) * samples).astype(int) % samples
        r = np.bincount(bins, rad, samples) / np.maximum(np.bincount(bins, minlength=samples), 1)
        # low-pass: keep the organic shape, drop the hand-drawn jitter
        f = np.fft.rfft(r)
        keep = 9 if r.mean() > 60 else 5
        f[keep:] = 0
        r = np.fft.irfft(f, samples)
        t = np.linspace(-np.pi, np.pi, samples, endpoint=False) + np.pi / samples
        rings.append(np.c_[cx + r * np.cos(t), cy + r * np.sin(t)])
    return rings


def closed_path(pts, step=6):
    p = pts[::step]
    n = len(p)
    d = [f"M{p[0][0]:.2f} {p[0][1]:.2f}"]
    for i in range(n):  # Catmull-Rom -> cubic Bezier
        p0, p1, p2, p3 = p[i - 1], p[i], p[(i + 1) % n], p[(i + 2) % n]
        c1 = p1 + (p2 - p0) / 6
        c2 = p2 - (p3 - p1) / 6
        d.append(f"C{c1[0]:.2f} {c1[1]:.2f} {c2[0]:.2f} {c2[1]:.2f} {p2[0]:.2f} {p2[1]:.2f}")
    return "".join(d) + "Z"


rings = extract_rings(SRC)
allp = np.vstack(rings)
x0, y0 = allp.min(0)
x1, y1 = allp.max(0)
MARK = 100.0  # mark is normalised to 100 units wide
k = MARK / (x1 - x0)
rings = [(r - [x0, y0]) * k for r in rings]
MARK_H = (y1 - y0) * k
STROKE = 2.6  # uniform stroke, a touch heavier than the original's ~2.3


def mark_group(ox, oy, scale=1.0, stroke=STROKE, which=None):
    rs = rings if which is None else [rings[i] for i in which]
    paths = "".join(f'<path d="{closed_path(r)}"/>' for r in rs)
    return (f'<g transform="translate({ox:.2f} {oy:.2f}) scale({scale:.4f})" fill="none" '
            f'stroke="currentColor" stroke-width="{stroke / scale:.3f}" '
            f'stroke-linecap="round" stroke-linejoin="round">{paths}</g>')


# ---------- wordmark: real glyph outlines, shaped with kerning ----------
class Face:
    def __init__(self, file, wght):
        self.tt = TTFont(file)
        self.upm = self.tt["head"].unitsPerEm
        self.gs = self.tt.getGlyphSet(location={"wght": wght})
        self.order = self.tt.getGlyphOrder()
        blob = hb.Blob.from_file_path(file)
        self.hbfont = hb.Font(hb.Face(blob))
        self.hbfont.set_variations({"wght": wght})
        self.cap = self.tt["OS/2"].sCapHeight

    def shape(self, text):
        buf = hb.Buffer()
        buf.add_str(text)
        buf.guess_segment_properties()
        hb.shape(self.hbfont, buf, {"kern": True, "liga": False})
        return [(self.order[i.codepoint], p.x_advance) for i, p in zip(buf.glyph_infos, buf.glyph_positions)]

    def width(self, text, size, track):
        g = self.shape(text)
        s = size / self.upm
        return sum(a for _, a in g) * s + track * size * (len(g) - 1)

    def path(self, text, size, track, ox, baseline):
        s = size / self.upm
        pen = SVGPathPen(self.gs, ntos=lambda v: f"{v:.2f}".rstrip("0").rstrip("."))
        x = ox
        for name, adv in self.shape(text):
            self.gs[name].draw(TransformPen(pen, (s, 0, 0, -s, x, baseline)))
            x += adv * s + track * size
        return pen.getCommands()


serif = Face(f"{FONTS}/Cormorant.ttf", 560)
sans = Face(f"{FONTS}/Jost.ttf", 400)
NAME, SUB = "WATER\u2019S EDGE", "MASSAGE THERAPY"
NAME_TRACK, SUB_TRACK = 0.10, 0.46


def lockup(name_w):
    """Return (name_size, sub_size, sub_track) so the subline matches the name's width."""
    name_size = name_w / serif.width(NAME, 1, NAME_TRACK)
    # size the subline so both lines share the same measure at a fixed tracking
    sub_size = name_w / sans.width(SUB, 1, SUB_TRACK)
    return name_size, sub_size, SUB_TRACK


def svg(w, h, body, color, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" '
            f'role="img" aria-label="{title}" style="color:{color}">'
            f'{body}</svg>\n')


TITLE = "Water\u2019s Edge Massage Therapy"


def stacked():
    pad = 4
    name_w = MARK * 2.15
    ns, ss, st = lockup(name_w)
    W = name_w + pad * 2
    mark_x = (W - MARK) / 2
    y = pad
    body = mark_group(mark_x, y)
    y += MARK_H + MARK * 0.22 + serif.cap * ns / serif.upm
    body += f'<path fill="currentColor" d="{serif.path(NAME, ns, NAME_TRACK, pad, y)}"/>'
    y += ns * 0.42 + sans.cap * ss / sans.upm
    body += f'<path fill="currentColor" d="{sans.path(SUB, ss, st, pad, y)}"/>'
    return W, y + pad, body


def horizontal():
    pad = 4
    m = 0.62  # mark scale relative to text block
    name_w = MARK * 2.15
    ns, ss, st = lockup(name_w)
    text_h = serif.cap * ns / serif.upm + ns * 0.42 + sans.cap * ss / sans.upm
    mark_h = MARK_H * m
    H = max(mark_h, text_h) + pad * 2
    body = mark_group(pad, (H - mark_h) / 2, m, STROKE * 0.8)
    tx = pad + MARK * m + MARK * 0.18
    y = (H - text_h) / 2 + serif.cap * ns / serif.upm
    body += f'<path fill="currentColor" d="{serif.path(NAME, ns, NAME_TRACK, tx, y)}"/>'
    y += ns * 0.42 + sans.cap * ss / sans.upm
    body += f'<path fill="currentColor" d="{sans.path(SUB, ss, st, tx, y)}"/>'
    return tx + name_w + pad, H, body


def mark_only():
    pad = STROKE
    return MARK + pad * 2, MARK_H + pad * 2, mark_group(pad, pad)


def favicon():
    # simplified to three rings with a heavier stroke so it survives 16-32px
    s = 64
    m = (s * 0.70) / MARK
    ox, oy = (s - MARK * m) / 2, (s - MARK_H * m) / 2
    g = mark_group(ox, oy, m, 4.0, which=[0, 2, 4])
    body = f'<rect width="{s}" height="{s}" rx="14" fill="{CEDAR}"/>' + g
    return svg(s, s, body, CREAM, TITLE)


files = {}
for name, fn in [("logo-stacked", stacked), ("logo-horizontal", horizontal), ("mark", mark_only)]:
    w, h, body = fn()
    files[f"{name}-cedar.svg"] = svg(w, h, body, CEDAR, TITLE)
    files[f"{name}-cream.svg"] = svg(w, h, body, CREAM, TITLE)
files["favicon.svg"] = favicon()

for fname, data in files.items():
    with open(f"{OUT}/{fname}", "w") as f:
        f.write(data)

fav = files["favicon.svg"].encode()
for px, fname in [(32, "favicon-32.png"), (180, "apple-touch-icon.png"), (512, "icon-512.png")]:
    cairosvg.svg2png(bytestring=fav, write_to=f"{OUT}/{fname}", output_width=px, output_height=px)
print("\n".join(sorted(os.listdir(OUT))))
