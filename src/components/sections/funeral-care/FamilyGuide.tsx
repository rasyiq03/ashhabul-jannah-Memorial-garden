import { FileText } from "lucide-react";
import { familyGuideIntro, familyGuideSteps, funeralSubheadings, requiredDocuments } from "@/content/funeral-care";

export function FamilyGuide() {
  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
      <div>
        <h3 className="font-serif text-3xl text-forest sm:text-4xl">{familyGuideIntro.title}</h3>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">{familyGuideIntro.lead}</p>
        <ol className="mt-10 space-y-7">
          {familyGuideSteps.map((step, index) => (
            <li key={step.title} className="grid grid-cols-[2.25rem_1fr] gap-x-4">
              <span aria-hidden="true" className="font-serif text-3xl leading-none text-gold-ink">
                {index + 1}
              </span>
              <div>
                <p className="text-lg font-semibold leading-snug text-ink">{step.title}</p>
                <p className="mt-1.5 max-w-prose leading-relaxed text-ink-soft">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <aside aria-labelledby="dokumen-title" className="self-start rounded-sm border border-line bg-paper p-6 sm:p-8 lg:sticky lg:top-24">
        <div className="flex items-center gap-3">
          <FileText aria-hidden="true" className="size-6 text-forest" strokeWidth={1.5} />
          <h3 id="dokumen-title" className="font-serif text-2xl text-forest">
            {funeralSubheadings.documentsTitle}
          </h3>
        </div>
        <ul className="mt-6 divide-y divide-line">
          {requiredDocuments.map((documentName) => (
            <li key={documentName} className="py-3 leading-snug text-ink first:pt-0 last:pb-0">
              {documentName}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-ink-soft">{funeralSubheadings.documentsNote}</p>
      </aside>
    </div>
  );
}
