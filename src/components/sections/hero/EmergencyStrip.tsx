import { Clock, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { ambulanceTelHref, site } from "@/config/site";
import { emergencyStripContent } from "@/content/hero";
import { Container } from "@/components/ui/Section";
import { businessWhatsAppUrl } from "@/lib/whatsapp";

function StripContact({ href, external, icon, caption, value }: {
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
      className="group flex items-center gap-3 rounded-sm py-1 pr-2"
    >
      <span className="flex size-10 items-center justify-center rounded-sm border border-cream/30 text-gold-soft transition-colors group-hover:border-gold-soft">
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm text-sage-200">{caption}</span>
        <span className="text-lg font-semibold text-cream underline-offset-4 group-hover:underline">{value}</span>
      </span>
    </a>
  );
}

export function EmergencyStrip() {
  return (
    <div className="on-dark border-t-2 border-gold bg-forest text-cream">
      <Container className="flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div>
          <p className="font-serif text-2xl">{emergencyStripContent.prompt}</p>
          <p className="mt-1 text-[0.9375rem] text-sage-200">{emergencyStripContent.detail}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8">
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
          <p className="flex items-center gap-3 py-1">
            <span className="flex size-10 items-center justify-center rounded-sm border border-cream/30 text-gold-soft">
              <Clock aria-hidden="true" className="size-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-sm text-sage-200">{site.hours.pilgrimage.label}</span>
              <span className="text-lg font-semibold">{site.hours.pilgrimage.value}</span>
            </span>
          </p>
        </div>
      </Container>
    </div>
  );
}
