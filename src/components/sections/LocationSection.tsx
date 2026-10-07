import { MapPin, Navigation } from "lucide-react";
import { fullAddress, mapsEmbedUrl, mapsSearchUrl, site } from "@/config/site";
import { locationContent } from "@/content/location";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const hours = [site.hours.emergency, site.hours.pilgrimage, site.hours.office];

export function LocationSection() {
  return (
    <Section id="lokasi" labelledBy="lokasi-title" tone="sage">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14">
        <div className="relative min-h-80 overflow-hidden rounded-sm border border-line bg-sand lg:min-h-[32rem]">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <MapPin aria-hidden="true" className="size-8 text-forest" strokeWidth={1.5} />
            <p className="max-w-xs text-ink-soft">{locationContent.mapFallback}</p>
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center font-semibold text-forest underline underline-offset-4"
            >
              {locationContent.openMapsLabel}
            </a>
          </div>
          <iframe
            src={mapsEmbedUrl}
            title={locationContent.mapTitle}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>

        <div className="flex flex-col">
          <SectionHeading id="lokasi-title" title={locationContent.title} lead={locationContent.lead} />

          <div className="mt-10 space-y-8">
            <div className="flex gap-4">
              <MapPin aria-hidden="true" className="mt-1 size-6 shrink-0 text-forest" strokeWidth={1.5} />
              <div>
                <h3 className="font-sans font-semibold text-ink">{locationContent.addressHeading}</h3>
                <address className="mt-1 not-italic leading-relaxed text-ink-soft">{fullAddress}</address>
              </div>
            </div>
            <div className="flex gap-4">
              <Navigation aria-hidden="true" className="mt-1 size-6 shrink-0 text-forest" strokeWidth={1.5} />
              <div>
                <h3 className="font-sans font-semibold text-ink">{locationContent.landmarkHeading}</h3>
                <p className="mt-1 leading-relaxed text-ink-soft">{site.address.landmark}</p>
              </div>
            </div>
            <div>
              <h3 className="font-sans font-semibold text-ink">{locationContent.hoursHeading}</h3>
              <dl className="mt-3 divide-y divide-line border-y border-line">
                {hours.map((entry) => (
                  <div key={entry.label} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:justify-between sm:gap-6">
                    <dt className="text-ink-soft">{entry.label}</dt>
                    <dd className="font-medium text-ink sm:text-right">{entry.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <ButtonLink href={mapsSearchUrl} external size="lg" className="mt-10 self-start">
            <MapPin aria-hidden="true" className="size-5" />
            {locationContent.openMapsLabel}
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
