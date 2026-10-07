import { services, servicesIntro } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ServicesSection() {
  return (
    <Section id="layanan" labelledBy="layanan-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="layanan-title" title={servicesIntro.title} lead={servicesIntro.lead} />
        </div>

        <ul className="border-t border-line">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <li key={service.title} className="grid grid-cols-[2.5rem_1fr] gap-x-5 border-b border-line py-8 sm:grid-cols-[3rem_1fr] sm:gap-x-7">
                <Icon aria-hidden="true" strokeWidth={1.5} className="mt-1 size-8 text-forest sm:size-9" />
                <div>
                  <h3 className="font-serif text-2xl text-ink sm:text-3xl">{service.title}</h3>
                  <p className="mt-2 max-w-prose leading-relaxed text-ink-soft">{service.description}</p>
                  <a
                    href={service.link.href}
                    {...(service.link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="mt-3 inline-flex min-h-11 items-center font-semibold text-forest underline decoration-forest/35 underline-offset-4 transition-colors hover:decoration-forest"
                  >
                    {service.link.label}
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
