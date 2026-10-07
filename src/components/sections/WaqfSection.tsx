import { site } from "@/config/site";
import { waqfBenefits, waqfHadith, waqfIntro, waqfOffer, waqfPrograms, waqfProgramsIntro } from "@/content/waqf";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatRupiah } from "@/lib/format";
import { businessWhatsAppUrl } from "@/lib/whatsapp";

export function WaqfSection() {
  return (
    <Section id="manfaat-wakaf" labelledBy="manfaat-wakaf-title" tone="forest">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
        <div>
          <SectionHeading id="manfaat-wakaf-title" title={waqfIntro.title} lead={waqfIntro.lead} inverse />

          <dl className="mt-12 divide-y divide-cream/15 border-y border-cream/15">
            {waqfBenefits.map((benefit) => (
              <div key={benefit.title} className="grid gap-2 py-6 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-8">
                <dt className="font-serif text-xl text-gold-soft sm:text-2xl">{benefit.title}</dt>
                <dd className="leading-relaxed text-sage-200">{benefit.body}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-sage-200">Kontribusi wakaf</p>
              <p className="font-serif text-4xl tabular-nums text-cream sm:text-5xl">
                {formatRupiah(site.waqf.plotContribution)}
              </p>
              <p className="mt-1 text-sage-200">{waqfOffer.priceNote}</p>
            </div>
            <ButtonLink
              href={businessWhatsAppUrl(waqfOffer.ctaMessage)}
              external
              variant="inverse"
              size="lg"
              className="shrink-0 whitespace-nowrap"
            >
              {waqfOffer.ctaLabel}
            </ButtonLink>
          </div>
        </div>

        <ArchFrame
          className="mx-auto w-full max-w-sm self-start lg:sticky lg:top-24"
          strokeClassName="text-gold"
          fillClassName="text-forest-deep"
        >
          <figure className="px-8 pb-12 pt-32 sm:px-10 sm:pt-36">
            <blockquote>
              <p className="font-serif text-2xl leading-snug text-cream sm:text-[1.65rem]">
                &ldquo;{waqfHadith.text}&rdquo;
              </p>
            </blockquote>
            <figcaption className="mt-6 text-gold-soft">{waqfHadith.source}</figcaption>
          </figure>
        </ArchFrame>
      </div>

      <div className="mt-24">
        <SectionHeading id="program-wakaf-title" level="h3" title={waqfProgramsIntro.title} lead={waqfProgramsIntro.lead} inverse />
        <ul
          aria-labelledby="program-wakaf-title"
          className="mt-10 grid gap-px overflow-hidden rounded-sm border border-cream/15 bg-cream/15 sm:grid-cols-2 lg:grid-cols-3"
        >
          {waqfPrograms.map((program) => {
            const Icon = program.icon;
            return (
              <li key={program.title} className="flex gap-4 bg-forest p-6">
                <Icon aria-hidden="true" strokeWidth={1.5} className="mt-0.5 size-7 shrink-0 text-gold-soft" />
                <div>
                  <h4 className="font-semibold text-cream">{program.title}</h4>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-sage-200">{program.body}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
