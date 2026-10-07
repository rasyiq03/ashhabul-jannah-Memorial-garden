import { galleryImages, galleryIntro } from "@/content/gallery";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GalleryGrid } from "@/components/sections/gallery/GalleryGrid";

export function GallerySection() {
  return (
    <Section id="galeri" labelledBy="galeri-title" tone="sand">
      <SectionHeading id="galeri-title" title={galleryIntro.title} lead={galleryIntro.lead} />
      <div className="mt-12">
        <GalleryGrid images={galleryImages} />
      </div>
    </Section>
  );
}
