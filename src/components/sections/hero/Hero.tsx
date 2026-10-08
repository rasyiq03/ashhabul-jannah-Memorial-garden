import { BadgeCheck, Phone } from "lucide-react";
import Image from "next/image";
import { ambulanceTelHref, site } from "@/config/site";
import { heroContent } from "@/content/hero";
import { ButtonLink } from "@/components/ui/Button";
import { ARCH_PATH } from "@/components/ui/ArchFrame";
import { Container } from "@/components/ui/Section";
import { EmergencyStrip } from "@/components/sections/hero/EmergencyStrip";
import { businessWhatsAppUrl } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="bg-cream">
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pattern-girih pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-sage-200/70 lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 bg-linear-to-r from-cream to-cream/0 lg:block"
        />

        <Container className="relative z-10 grid items-center gap-12 pb-16 pt-10 sm:pt-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-16 lg:pb-24 lg:pt-20">
          <div>
            <p className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 rounded-sm border border-gold/70 bg-paper px-3 py-1.5 text-sm">
              <BadgeCheck aria-hidden="true" className="size-4 text-forest" strokeWidth={2} />
              <span className="font-semibold text-forest">{heroContent.licenseLabel}</span>
              <span className="text-ink-soft">
                {site.license.label} No. {site.license.number}
              </span>
            </p>

            <h1
              id="hero-title"
              className="mt-7 max-w-[15ch] font-serif text-4xl leading-[1.08] text-forest sm:text-6xl sm:leading-[1.05] lg:text-7xl"
            >
              {heroContent.title}
            </h1>
            <p className="mt-7 max-w-[36rem] text-lg leading-relaxed text-ink-soft sm:text-xl">
              {heroContent.lead}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={businessWhatsAppUrl(heroContent.waqfCta.message)} external size="lg">
                {heroContent.waqfCta.label}
              </ButtonLink>
              <ButtonLink href={ambulanceTelHref} variant="secondary" size="lg">
                <Phone aria-hidden="true" className="size-5" />
                {heroContent.ambulanceCtaLabel}
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[23rem] lg:max-w-[26rem]">
            <svg
              aria-hidden="true"
              viewBox="0 0 100 130"
              preserveAspectRatio="none"
              className="absolute -right-3 top-3 h-full w-full overflow-visible text-gold sm:-right-5 sm:top-5"
            >
              <path d={ARCH_PATH} fill="none" stroke="currentColor" strokeWidth={1.25} vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="hero-dawn relative">
              <Image
                src="/illustrations/hero-taman.svg"
                alt={heroContent.illustrationAlt}
                width={480}
                height={624}
                priority
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 23rem, 20rem"
                className="h-auto w-full"
              />
            </div>
          </div>
        </Container>
      </div>

      <EmergencyStrip />
    </section>
  );
}
