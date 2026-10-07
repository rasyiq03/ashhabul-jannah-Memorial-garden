import { mapsSearchUrl, site } from "@/config/site";
import { faqItems } from "@/content/faq";

const ALL_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/**
 * schema.org belum punya tipe FuneralHome, jadi bisnis ditandai sebagai LocalBusiness
 * sekaligus Cemetery, dengan jam buka 24 jam untuk layanan jenazah.
 */
export function buildBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "Cemetery"],
    "@id": `${site.url}/#organisasi`,
    name: site.name,
    alternateName: site.shortName,
    description: site.description,
    url: site.url,
    telephone: site.contact.ambulancePhone,
    email: site.contact.email,
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/icon.svg`,
    priceRange: "Rp",
    currenciesAccepted: "IDR",
    areaServed: ["Kota Bandung", "Kabupaten Bandung", "Kabupaten Bandung Barat", "Kota Cimahi"],
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.district,
      addressRegion: site.address.province,
      postalCode: site.address.postalCode,
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    hasMap: mapsSearchUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ALL_DAYS,
        opens: "00:00",
        closes: "23:59",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "emergency",
        telephone: site.contact.ambulancePhone,
        availableLanguage: ["id"],
        hoursAvailable: { "@type": "OpeningHoursSpecification", dayOfWeek: ALL_DAYS, opens: "00:00", closes: "23:59" },
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+${site.contact.whatsapp}`,
        availableLanguage: ["id"],
      },
    ],
    sameAs: site.social.map((account) => account.href),
  };
}

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** JSON aman untuk disisipkan di <script>: tanda < di-escape agar tidak menutup tag. */
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
