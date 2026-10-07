import type { Metadata } from "next";
import { site } from "@/config/site";
import { AmbulanceSection } from "@/components/sections/ambulance/AmbulanceSection";
import { ContactSection } from "@/components/sections/contact/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FuneralCareSection } from "@/components/sections/funeral-care/FuneralCareSection";
import { GallerySection } from "@/components/sections/gallery/GallerySection";
import { Hero } from "@/components/sections/hero/Hero";
import { LocationSection } from "@/components/sections/LocationSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/testimonials/TestimonialsSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { WaqfSection } from "@/components/sections/WaqfSection";
import { buildFaqJsonLd, serializeJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <ValuesSection />
      <AmbulanceSection />
      <FuneralCareSection />
      <WaqfSection />
      <TestimonialsSection />
      <GallerySection />
      <FaqSection />
      <LocationSection />
      <ContactSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildFaqJsonLd()) }} />
    </>
  );
}
