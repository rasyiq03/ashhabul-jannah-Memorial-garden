import { CircleCheck } from "lucide-react";
import {
  ambulanceFlow,
  ambulanceIntro,
  ambulanceSubheadings,
  bookingFormCopy,
  familyChecklist,
} from "@/content/ambulance";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Timeline } from "@/components/ui/Timeline";
import { formAnchors } from "@/content/navigation";
import { LazyAmbulanceBookingForm } from "@/components/forms/LazyForms";
import { EmergencyBanner } from "@/components/sections/ambulance/EmergencyBanner";
import { FleetCards } from "@/components/sections/ambulance/FleetCards";

export function AmbulanceSection() {
  return (
    <Section id="ambulans" labelledBy="ambulans-title">
      <SectionHeading id="ambulans-title" title={ambulanceIntro.title} lead={ambulanceIntro.lead} />

      <div className="mt-12">
        <EmergencyBanner />
      </div>

      <div className="mt-20">
        <h3 className="font-serif text-3xl text-forest">{ambulanceSubheadings.fleet}</h3>
        <div className="mt-8">
          <FleetCards />
        </div>
      </div>

      <div className="mt-20">
        <h3 className="font-serif text-3xl text-forest">{ambulanceSubheadings.flow}</h3>
        <Timeline steps={ambulanceFlow} orientation="horizontal" label="Alur pemesanan ambulans" className="mt-10" />
      </div>

      <div className="mt-20 grid gap-8 rounded-sm bg-sand p-6 sm:p-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12">
        <div>
          <h3 className="font-serif text-3xl text-forest">{ambulanceSubheadings.checklistTitle}</h3>
          <p className="mt-3 leading-relaxed text-ink-soft">{ambulanceSubheadings.checklistLead}</p>
        </div>
        <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {familyChecklist.map((entry) => (
            <li key={entry.item} className="flex items-start gap-3">
              <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-forest" strokeWidth={1.75} />
              <div>
                <p className="font-semibold leading-snug text-ink">{entry.item}</p>
                {entry.note ? <p className="mt-1 text-sm leading-snug text-ink-soft">{entry.note}</p> : null}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div id={formAnchors.ambulance} data-anchor className="mt-24">
        <div className="max-w-3xl">
          <h3 className="font-serif text-4xl text-forest">{bookingFormCopy.title}</h3>
          <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-soft">{bookingFormCopy.lead}</p>
        </div>
        <div className="mt-10">
          <LazyAmbulanceBookingForm />
        </div>
      </div>
    </Section>
  );
}
