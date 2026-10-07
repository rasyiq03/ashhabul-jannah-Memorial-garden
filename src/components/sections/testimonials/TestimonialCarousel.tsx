"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/cn";

export function TestimonialCarousel({ testimonials, label }: { testimonials: Testimonial[]; label: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndex = testimonials.length - 1;

  function scrollToSlide(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: index * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function syncActiveSlide() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        onScroll={syncActiveSlide}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.name}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} dari ${testimonials.length}`}
            aria-hidden={index !== activeIndex}
            className="w-full shrink-0 snap-center px-1"
          >
            <figure>
            <blockquote>
              <p className="mx-auto max-w-[38ch] text-center font-serif text-2xl leading-snug text-ink sm:text-3xl md:text-[2.15rem]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-8 text-center">
              <span className="block font-semibold text-forest">{testimonial.name}</span>
              <span className="text-ink-soft">{testimonial.context}</span>
            </figcaption>
            </figure>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          onClick={() => scrollToSlide(Math.max(0, activeIndex - 1))}
          disabled={activeIndex === 0}
          aria-label="Cerita sebelumnya"
          className="flex size-11 items-center justify-center rounded-sm border border-forest text-forest transition-colors hover:bg-forest hover:text-cream disabled:cursor-not-allowed disabled:border-line disabled:text-line-strong disabled:hover:bg-transparent"
        >
          <ChevronLeft aria-hidden="true" className="size-5" />
        </button>
        <div className="flex items-center gap-1">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => scrollToSlide(index)}
              aria-label={`Tampilkan cerita ${index + 1}: ${testimonial.name}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className="group flex size-11 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-1 rounded-full transition-all duration-200",
                  index === activeIndex ? "w-8 bg-forest" : "w-4 bg-line-strong group-hover:bg-ink-soft",
                )}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => scrollToSlide(Math.min(lastIndex, activeIndex + 1))}
          disabled={activeIndex === lastIndex}
          aria-label="Cerita berikutnya"
          className="flex size-11 items-center justify-center rounded-sm border border-forest text-forest transition-colors hover:bg-forest hover:text-cream disabled:cursor-not-allowed disabled:border-line disabled:text-line-strong disabled:hover:bg-transparent"
        >
          <ChevronRight aria-hidden="true" className="size-5" />
        </button>
      </div>
    </div>
  );
}
