# Water's Edge Massage Therapy: content capture for the rebuild

Source: <https://www.watersedgemassage.com/> (Squarespace 7.1). Captured 2026-10-28 from the live site, its `sitemap.xml`, and the linked Jane App booking site.

## Site map

The sitemap lists 5 pages. Crawling internal links found no others. Common paths (`/faq`, `/policies`, `/blog`, `/testimonials`, `/booking`, `/book`, `/gallery`) all return 404.

| Page | URL | File | Title tag | Meta description |
|---|---|---|---|---|
| Home | `/` (also `/home`) | [home.md](home.md) | Water's Edge Massage Therapy \| Registered Massage Therapist in North Vancouver | Trauma-informed massage therapy in North Vancouver for anxiety, chronic pain, and sports injuries. Book a session with Alexis, RMT, today. |
| About | `/about` | [about.md](about.md) | Water's Edge Massage Therapy \| RMT in North Vancouver | Alexis Penner is a Registered Massage Therapist with over 10 years of experience. |
| Services | `/services` | [services.md](services.md) | Water's Edge Massage Therapy \| RMT in North Vancouver | _(none)_ |
| Rates | `/rates` | [rates.md](rates.md) | Water's Edge Massage Therapy \| RMT in North Vancouver | _(none)_ |
| Contact | `/contact` | [contact.md](contact.md) | Water's Edge Massage Therapy \| RMT in North Vancouver | _(none)_ |
| External booking (Jane App) | <https://watersedgemassagetherapy.janeapp.com/> | [booking-janeapp.md](booking-janeapp.md) | Book Online \| Water's Edge Massage Therapy | n/a |

Other files:
- [_site-chrome.md](_site-chrome.md): shared header nav, footer (land acknowledgement), favicon, tracking
- [design.md](design.md): color palette, fonts, logo, UI notes
- [images/README.md](images/README.md) and `images/_manifest.json`: all images, with source page and alt text
- `screenshots/`: full-page 1280px screenshots of each page as it looks today

## Key business facts

- **Business:** Water's Edge Massage Therapy, a solo Registered Massage Therapy practice in North Vancouver, B.C.
- **Therapist:** Alexis Penner, RMT, practising since 2015. Special interests: anxiety, persistent/chronic pain, TMJ dysfunction. Also sports injuries, pregnancy, and stress-related tension. Approach: trauma-informed, evidence-informed, patient-centred, with home care and strength training. Bio in [about.md](about.md) (an older variant is on Jane).
- **Address:** Suite 500, 224 West Esplanade (Harbour Quay Building), North Vancouver, BC. The lobby and clinic are on the 5th floor. Map pin: lat 49.3131151, lng −123.0834664. Google link: <https://g.co/kgs/QwZML7Z>.
- **Email:** alexispenner.rmt@gmail.com
- **Phone:** (604) 754-4886, **text only**
- **Booking:** Jane App, <https://watersedgemassagetherapy.janeapp.com/>. All Book buttons link here. Gift cards: <https://watersedgemassagetherapy.janeapp.com/online_gift_cards/new>
- **Parking:** 2 free guest stalls, #13 and #14 only, marked "HBC Guest 1 hour". They are on P3 behind the building, reached from the alley between Semisch and Chesterfield. Other stalls risk towing. Paid street parking (Passport Parking app) is on Esplanade, Semisch, Chesterfield, 1st and 2nd St. More paid parking is under Sailor Hagar's Pub and Fresh St. Market.
- **Hours:** not on the site or Jane. Google Business Profile shows Wednesday 9 AM–5 PM; the other days weren't visible. Confirm with the owner.
- **Social links:** none on the site.
- **Testimonials / reviews:** none on the site. Off-site finds: a 5.0 ★ Google rating (about 5 reviews, text not captured) and 3 Reddit recommendations. See [testimonials.md](testimonials.md).
- **Previous clinic:** Mountain Health and Performance, 100-223 Mountain Hwy. Some directories (Medimap, Cortico) still list that address.
- **FAQ page:** none.
- **Land acknowledgement (footer):** Sḵwx̱wú7mesh, Tsleil-Waututh, and Musqueam Nations.

## Services and pricing

All prices are plus GST. Durations and prices from the Rates page match the Jane booking data.

| Service | Duration | Price | Notes |
|---|---|---|---|
| Registered Massage Therapy | 60 min | $135 | Required first visit. Includes assessment, treatment, home care |
| Registered Massage Therapy, **subsequent visits only** | 45 min | $110 | Brief re-assessment plus treatment |
| Registered Massage Therapy | 75 min | $160 | Assessment, treatment, home care |
| Pregnancy (prenatal) massage | 60 min | $135 | Listed **only on Jane**, not on the website |
| Pregnancy (prenatal) massage | 75 min | $160 | Listed **only on Jane**, not on the website |

Initial appointments include a health history intake and assessment, setting treatment goals and consent, treatment, and home exercise.

## Policies

- **Cancellation (from Jane only):** 24 hours' notice. Cancelling or not showing up within 24 hours of the appointment is billed at the full amount.
- **Direct billing:** see the inconsistencies below.
- **ICBC:** accepting new ICBC cases. The owner chose Jane as the source of truth; the Rates page's "not accepting" is out of date.
- **WorkSafeBC:** not billed or accepted. The site's "WSCB" is a typo for WorkSafeBC; use "WorkSafeBC" in the rebuild.

## Forms (fields only)

All three are Squarespace forms with the same fields.

| Page | Fields | Submit label | Notes |
|---|---|---|---|
| Home | Name (First + Last, required), Email (required), Message (required) | Send | |
| About | Name (First + Last, required), Email (required), Message (required) | Submit | Email has a mailing-list opt-in |
| Contact | Name (First + Last, required), Email (required), Message (required) | SEND | |

Every form shows the success message "Thank you!"

## Inconsistencies to resolve with the owner

Resolved by the owner: **ICBC** follows Jane (accepting new cases), and **"WSCB"** is a typo for WorkSafeBC.

1. **Direct billing list:** the Rates page lists Pacific Blue Cross, Telus Health, Sunlife, Empire Life, GreenShield. Jane lists Pacific Blue Cross, Canada Life, Sunlife Financial, Manulife, Desjardins, GroupHEALTH, Johnsons Groups, Industrial Alliance, GreenShield, Empire Life "and more". Telus Health appears only on the site.
2. **Postal code:** V7M 3H8 on the site map embed and on Google, V7M 1A4 on Jane.
3. **Hours:** only Wednesday 9 AM–5 PM was visible (on Google). Get the full weekly schedule.
4. **Google reviews:** copy the review text while signed in to Google, with permission to quote it.
5. The Rates page doesn't say that 45 min is for returning clients only, or that pregnancy massage is offered.
6. **SEO:** 4 of 5 pages have no meta description and share one generic title. There is no og:image, no custom favicon, and the LocalBusiness structured data is empty.
7. **Images:** no image has alt text. Three landscape photos are soft/blurry even at original resolution.
