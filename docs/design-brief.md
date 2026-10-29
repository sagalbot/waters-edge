# Water's Edge Massage Therapy: Redesign Brief

Source content: `content/` (scraped from watersedgemassage.com and the Jane booking site).

## Core idea

**Where land meets water, on the North Shore.** The site should feel grounded in place: unmistakably North Vancouver and coastal, with mountains meeting Burrard Inlet. It should not read as a generic spa.

## Themes

- **Place**: North Shore forest, inlet, and mountains, on Coast Salish territory.
- **Sanctuary**: spacious, slow, and safe, in line with Alexis's trauma-informed approach.
- **Grounded expertise**: an RMT since 2015, evidence-informed, with an active outdoor life (trail running, biking).

## Motifs

- **Topographic and contour lines (primary)**: mountains meeting the inlet. These carry over from the ripple and contour mark in the existing logo (`content/images/Waters_LOGO-B1.png`).
- **Abstract organic curves**: soft shoreline edges between sections, where land meets water.
- **Line art**: contour and landscape illustrations, used with photography rather than replacing it.

## Imagery

A blend of three sources: real photos of Alexis and the clinic, local landscape photography (Burrard Inlet and the North Shore), and line art. Three of the current landscape photos are blurry and should be replaced.

## Palette (West Coast forest)

Cedar green, moss, warm stone, and cream, with a **terracotta/clay accent kept for continuity** (the current accent is `#D4967D`). The current dark slate green `#495A58` is a natural bridge colour.

## Typography

An elegant serif for headings with a clean sans for body text: editorial and refined. The current site uses Marcellus and PT Serif. The proposed pairing is **Cormorant Garamond** for headings and **Jost** for body text, the same pair used in the logo.

## Logo

Redrawn as SVG in `brand/logo/`. The files are regenerated with `brand/build-logo.py`.

- **Mark**: the original five-ring ripple/contour mark, measured from the PNG and smoothed with a uniform stroke.
- **Wordmark**: "WATER’S EDGE" in Cormorant Garamond (wght 560, +0.10em tracking), with "MASSAGE THERAPY" in Jost (400, +0.46em tracking) set to the same width. Both are converted to outlines.
- **Lockups**: stacked, horizontal (for the header), and mark-only, each in cedar `#2E4236` and cream `#F4EFE6`.
- **Favicon**: three rings on a cedar tile (`favicon.svg`, 32 px, 180 px, and 512 px PNGs).

## Layout and interaction

- **Pacing**: spacious and slow, with lots of whitespace, a few large images, and unhurried scrolling.
- **Booking**: prominent. A persistent "Book" button in the header and a booking CTA on every page, linking to Jane (`https://watersedgemassagetherapy.janeapp.com/`).
- **Motion**: subtle. Slow fades, gently drifting contour lines, and soft parallax. Respect `prefers-reduced-motion`.
- **Land acknowledgement**: in the footer on every page, as now.

## References

West Coast outdoor and hospitality brands: Tofino resorts and Arc'teryx editorial.

## Copy

- **Keep the existing copy verbatim** and do not generate new marketing copy. Only restructure it, fix clear errors, and reconcile facts with Alexis.
- **Voice**: keep each passage as written. The practice copy uses "we", the About bio is third person, and the contact note is in Alexis's first person.
- **Audience**: taken from the content. Anxiety, chronic pain, TMJ, sports injuries, and pregnancy, all through a trauma-informed lens.

## Open questions for Alexis

- **ICBC**: the website says "not accepting new ICBC patients", but Jane says "accepting".
- **Direct-billing insurers**: the website and Jane list different providers.
- **Postal code**: V7M 3H8 on the website vs V7M 1A4 on Jane.
- **"WSCB"**: probably meant to be WorkSafeBC.
- **Missing content**: business hours, social links, and testimonials.
- **Logo**: original vector files, if any exist.
- **Photos**: new photos of Alexis and the clinic.
- **Contact form**: the old forms ran on Squarespace. The new form posts to a Cloudflare Worker (`worker.ts`) that checks Turnstile and emails Alexis through Cloudflare Email Sending.
- **Pregnancy massage and cancellation policy**: both appear only on Jane. Should they go on the site?
