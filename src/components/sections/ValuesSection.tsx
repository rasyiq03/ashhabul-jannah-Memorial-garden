import { values, valuesIntro } from "@/content/values";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ValuesSection() {
  return (
    <Section id="keunggulan" labelledBy="keunggulan-title" tone="sand">
      <SectionHeading id="keunggulan-title" title={valuesIntro.title} lead={valuesIntro.lead} />

      <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <li key={value.title} className="border-t-2 border-forest pt-6">
              <Icon aria-hidden="true" strokeWidth={1.5} className="size-7 text-gold-ink" />
              <h3 className="mt-4 font-serif text-3xl text-forest">{value.title}</h3>
              <p className="mt-4 leading-relaxed text-ink-soft">{value.body}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
