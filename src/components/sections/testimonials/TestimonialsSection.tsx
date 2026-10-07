import { site } from "@/config/site";
import { testimonials, testimonialsIntro } from "@/content/testimonials";
import { Section } from "@/components/ui/Section";
import { TestimonialCarousel } from "@/components/sections/testimonials/TestimonialCarousel";

export function TestimonialsSection() {
  return (
    <Section id="testimoni" labelledBy="testimoni-title">
      <h2 id="testimoni-title" className="text-center font-serif text-4xl text-forest md:text-5xl">
        {testimonialsIntro.title}
      </h2>
      <div aria-hidden="true" className="mx-auto mt-6 h-px w-16 bg-gold" />
      <div className="mt-12">
        <TestimonialCarousel testimonials={testimonials} label={testimonialsIntro.title} />
      </div>
      {site.showSampleContentNotice ? (
        <p className="mx-auto mt-10 max-w-md text-center text-sm text-ink-soft">{testimonialsIntro.sampleNotice}</p>
      ) : null}
    </Section>
  );
}
