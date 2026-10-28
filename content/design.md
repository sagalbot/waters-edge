# Current visual design: colors, fonts, logo

Taken from the site's Squarespace theme variables (`site.css`) and computed styles in a live browser. Full-page screenshots of each page (1280px wide) are in `screenshots/`.

## Color palette

| Role (Squarespace variable) | HSL | Hex | Used for |
|---|---|---|---|
| Light accent / page background (`--lightAccent-hsl`) | 46.67, 14.75%, 88.04% | `#E5E3DC` | Page and header background (warm off-white / sand) |
| Black / body text (`--black-hsl`) | 180, 5.88%, 20% | `#303636` | Headings, body text, nav |
| Accent (`--accent-hsl`) | 17.24, 50.29%, 66.08% | `#D4967D` | All buttons ("Book now"), links, "Rates and Pricing" heading (terracotta / clay) |
| Dark accent (`--darkAccent-hsl`) | 172.94, 10.43%, 31.96% | `#495A58` | Dark section background (Services page "dark-bold" section) (slate green-grey) |
| White (`--white-hsl`) | 0, 0%, 100% | `#FFFFFF` | Button text, text on dark sections, logo |

## Typography (Google Fonts, loaded via Squarespace)

- **Headings and site title:** Marcellus, 400. Slight negative letter-spacing (−0.02em). H1 is about 62px on desktop.
- **Body, nav, buttons, meta:** PT Serif, 400, 16px.

## UI details

- Buttons: filled `#D4967D`, white PT Serif text, about 15px border radius, generous padding.
- Header: sticky, light, with a soft drop shadow; text title left, links and CTA right.
- Home "What We Offer" image is an arch / rounded-rectangle crop with the heading overlaid.
- Overall mood: calm, nature and coastal (ocean rocks, coastline trees, mountain lake).

## Logo assets

- `images/Waters_LOGO-B1.png`: 2001×2000 PNG, **white on transparent** (an invisible-on-white asset; display on `#495A58` or a photo). It shows a hand-drawn concentric "ripple / topographic" mark above the wordmark "WATER'S EDGE" (thin geometric caps) with "Massage Therapy" below in a spaced-out light sans. It appears only on the Services page; the header uses a plain text title instead.
- No dark/colour logo variant, no SVG, and no custom favicon were found on the site. Ask the owner for the original vector logo files.
