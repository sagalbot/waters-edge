#!/usr/bin/env bash
# Builds brand/og-image.jpg, the 1200×630 link-preview image: the stacked cream logo on
# cedar beside the coastal photo. Requires ImageMagick and uv (for cairosvg).
set -euo pipefail
cd "$(dirname "$0")/.."
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

uvx cairosvg brand/logo/logo-stacked-cream.svg --output-width 380 -o "$tmp/logo.png"
magick -size 1200x630 xc:'#2E4236' \
  \( content/images/PXL_20230807_151930193_Original.jpg -resize 640x -gravity center -crop 640x630+0-60 +repage \) \
  -gravity east -composite \
  "$tmp/logo.png" -gravity west -geometry +90+0 -composite \
  -quality 85 brand/og-image.jpg
