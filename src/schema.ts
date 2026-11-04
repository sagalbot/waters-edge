// schema.org JSON-LD for search engines and AI assistants, built from the facts in site.ts.
import { ADDRESS, BOOKING_URL, EMAIL, MAP_URL, NAME, PREGNANCY_RATES, RATES } from "./site";

export const businessId = (site: URL) => new URL("/#business", site).href;

const offers = (name: string, rates: { minutes: number; amount: number }[]) =>
  rates.map((r) => ({
    "@type": "Offer",
    name: `${r.minutes} minute ${name}`,
    price: r.amount,
    priceCurrency: "CAD",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: r.amount,
      priceCurrency: "CAD",
      valueAddedTaxIncluded: false,
    },
    url: BOOKING_URL,
  }));

export const reserveAction = {
  "@type": "ReserveAction",
  target: { "@type": "EntryPoint", urlTemplate: BOOKING_URL },
};

export function business(site: URL, urls: { image: string; logo: string; photo: string }) {
  return {
    "@type": ["MedicalBusiness", "HealthAndBeautyBusiness"],
    "@id": businessId(site),
    name: NAME,
    url: site.href,
    image: urls.image,
    logo: urls.logo,
    description:
      "Trauma-informed registered massage therapy in North Vancouver for anxiety, chronic pain, sports injuries, pregnancy, and TMJ dysfunction.",
    email: EMAIL,
    telephone: "+1-604-754-4886",
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.street,
      addressLocality: ADDRESS.locality,
      addressRegion: ADDRESS.region,
      addressCountry: ADDRESS.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: ADDRESS.lat, longitude: ADDRESS.lng },
    hasMap: MAP_URL,
    areaServed: { "@type": "City", name: "North Vancouver" },
    priceRange: "$110–$160 + GST",
    currenciesAccepted: "CAD",
    employee: {
      "@type": "Person",
      name: "Alexis Penner",
      jobTitle: "Registered Massage Therapist",
      image: urls.photo,
      url: new URL("/about", site).href,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Massage therapy",
      itemListElement: [
        ...offers("Registered Massage Therapy", RATES),
        ...offers("Pregnancy Massage", PREGNANCY_RATES),
      ],
    },
    potentialAction: reserveAction,
  };
}
