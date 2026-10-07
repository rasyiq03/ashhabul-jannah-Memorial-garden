import {
  careCommitments,
  careStages,
  funeralCareIntro,
  funeralFormCopy,
  funeralSubheadings,
  istirja,
} from "@/content/funeral-care";
import { formAnchors } from "@/content/navigation";
import { Section } from "@/components/ui/Section";
import { Timeline } from "@/components/ui/Timeline";
import { CarePackages } from "@/components/sections/funeral-care/CarePackages";
import { FamilyGuide } from "@/components/sections/funeral-care/FamilyGuide";
import { LazyFuneralCareForm } from "@/components/forms/LazyForms";

const stageSteps = careStages.map((stage) => ({
  title: stage.title,
  body: stage.body,
  meta: `Sekitar ${stage.duration}`,
  icon: stage.icon,
}));

export function FuneralCareSection() {
  return (
    <Section id="pemulasaraan" labelledBy="pemulasaraan-title" tone="sage">
      <figure className="mx-auto max-w-3xl text-center">
        <p lang="ar" dir="rtl" className="text-4xl leading-loose text-forest sm:text-5xl">
          {istirja.arabic}
        </p>
        <figcaption className="mt-4">
          <span className="block font-serif text-2xl text-ink">{istirja.latin}</span>
          <span className="mt-2 block text-ink-soft">{istirja.meaning}</span>
        </figcaption>
      </figure>

      <div aria-hidden="true" className="mx-auto my-14 h-px w-24 bg-gold" />

      <div className="max-w-3xl">
        <h2 id="pemulasaraan-title" className="font-serif text-4xl leading-[1.1] text-forest md:text-5xl">
          {funeralCareIntro.title}
        </h2>
        <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-soft">{funeralCareIntro.lead}</p>
      </div>

      <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <Timeline steps={stageSteps} orientation="vertical" label="Empat tahap pemulasaraan jenazah" />

        <aside aria-labelledby="komitmen-title" className="self-start border-t-2 border-forest pt-6 lg:sticky lg:top-24">
          <h3 id="komitmen-title" className="font-serif text-2xl text-forest">
            {funeralSubheadings.commitments}
          </h3>
          <dl className="mt-6 space-y-6">
            {careCommitments.map((commitment) => (
              <div key={commitment.title}>
                <dt className="font-semibold text-ink">{commitment.title}</dt>
                <dd className="mt-1 leading-relaxed text-ink-soft">{commitment.body}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <div className="mt-24">
        <h3 className="font-serif text-3xl text-forest sm:text-4xl">{funeralSubheadings.packagesTitle}</h3>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">{funeralSubheadings.packagesLead}</p>
        <div className="mt-12">
          <CarePackages />
        </div>
      </div>

      <div className="mt-24">
        <FamilyGuide />
      </div>

      <div id={formAnchors.funeralCare} data-anchor className="mt-24 rounded-sm bg-cream p-6 sm:p-10 lg:p-14">
        <div className="max-w-3xl">
          <h3 className="font-serif text-4xl text-forest">{funeralFormCopy.title}</h3>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">{funeralFormCopy.lead}</p>
          <div className="mt-10">
            <LazyFuneralCareForm />
          </div>
        </div>
      </div>
    </Section>
  );
}
