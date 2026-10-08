import { Clock, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ambulanceTelHref, site } from "@/config/site";
import { emergencyStripContent } from "@/content/hero";
import { Container } from "@/components/ui/Section";
import { businessWhatsAppUrl } from "@/lib/whatsapp";

function StripContact({
  href,
  external,
  icon,
  caption,
  value,
}: {
  href: string;
  external?: boolean;
  icon: ReactNode;
  caption: string;
  value: string;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex items-center gap-3 rounded-sm py-1 pr-2 transition-opacity hover:opacity-95"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-cream/30 text-gold-soft transition-colors group-hover:border-gold-soft">
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-xs sm:text-sm text-sage-200">{caption}</span>
        <span className="text-base sm:text-lg font-semibold text-cream underline-offset-4 group-hover:underline whitespace-nowrap">
          {value}
        </span>
      </span>
    </a>
  );
}

export function EmergencyStrip() {
  return (
    <aside
      aria-label="Kontak darurat dan jam ziarah"
      className="relative z-10 isolate on-dark border-t-2 border-gold bg-forest text-cream"
    >
      <Container className="flex flex-col gap-6 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-xl">
          <p className="font-serif text-2xl sm:text-[1.65rem]">{emergencyStripContent.prompt}</p>
          <p className="mt-1 text-sm sm:text-[0.9375rem] text-sage-200">{emergencyStripContent.detail}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-4 sm:gap-x-8">
          <StripContact
            href={ambulanceTelHref}
            icon={<Phone aria-hidden="true" className="size-5" />}
            caption={emergencyStripContent.callLabel}
            value={site.contact.ambulancePhoneDisplay}
          />
          <StripContact
            href={businessWhatsAppUrl(emergencyStripContent.whatsappMessage)}
            external
            icon={<MessageCircle aria-hidden="true" className="size-5" />}
            caption={emergencyStripContent.whatsappLabel}
            value={site.contact.whatsappDisplay}
          />
          <div className="flex items-center gap-3 py-1">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-sm border border-cream/30 text-gold-soft">
              <Clock aria-hidden="true" className="size-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-xs sm:text-sm text-sage-200">{site.hours.pilgrimage.label}</span>
              <span className="text-base sm:text-lg font-semibold text-cream whitespace-nowrap">
                {site.hours.pilgrimage.value}
              </span>
            </span>
          </div>
        </div>
      </Container>
    </aside>
  );
}
