// Business facts shared by the header, footer, pages, and structured data (from content/).
export const NAME = "Water's Edge Massage Therapy";
export const BOOKING_URL = "https://watersedgemassagetherapy.janeapp.com/";
// Jane's treatment picker, one step closer to a booked appointment than BOOKING_URL.
export const BOOK_ONLINE_URL = "https://watersedgemassagetherapy.janeapp.com/locations/water-s-edge-massage-therapy/book";
export const EMAIL = "alexispenner.rmt@gmail.com";
export const PHONE = "(604) 754-4886";
export const PHONE_SMS = "sms:+16047544886";
export const MAP_URL = "https://g.co/kgs/QwZML7Z";
// The Google Business Profile ("Water's Edge Massage Therapy- Alexis Penner RMT"), by its
// stable Maps ID.
export const GOOGLE_PROFILE_URL = "https://maps.google.com/?cid=14944221951252644095";
// Alexis's licence in the College of Complementary Health Professionals of BC registry.
export const REGISTRY_URL = "https://cchpbc.alinityapp.com/Client/PublicDirectory/Registrant/28fcb201-3135-f111-9952-000d3ae97b99";
// The postal code is left out until Alexis confirms it (V7M 3H8 on Google, V7M 1A4 on Jane).
// Every page shows the address in this one form (consistent NAP for local search).
export const ADDRESS = {
  street: "500-224 West Esplanade",
  locality: "North Vancouver",
  region: "BC",
  country: "CA",
  lat: 49.3131151,
  lng: -123.0834664,
};
export const ADDRESS_LINE = `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.region}`;

export const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/rates", label: "Rates" },
  { href: "/contact", label: "Contact" },
];

export const RATES = [
  { length: "45 Minutes", minutes: 45, price: "$110 + GST", amount: 110, note: "Returning clients only" },
  { length: "60 Minutes", minutes: 60, price: "$135 + GST", amount: 135 },
  { length: "75 Minutes", minutes: 75, price: "$160 + GST", amount: 160 },
];

export const PREGNANCY_RATES = [
  { length: "60 Minutes", minutes: 60, price: "$135 + GST", amount: 135 },
  { length: "75 Minutes", minutes: 75, price: "$160 + GST", amount: 160 },
];

// From Jane, where clients agree to it when they book.
export const CANCELLATION_POLICY =
  "Please give 24 hours' notice to cancel. If you cancel or don't show up within 24 hours of your appointment, you will be billed the full amount.";
