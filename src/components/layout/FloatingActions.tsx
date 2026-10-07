import { MessageCircle, Phone } from "lucide-react";
import { ambulanceTelHref, site } from "@/config/site";
import { headerContent } from "@/content/navigation";
import { businessWhatsAppUrl } from "@/lib/whatsapp";

const floatingWhatsAppUrl = businessWhatsAppUrl(headerContent.whatsappMessage);

export function FloatingActions() {
  return (
    <>
      <a
        href={ambulanceTelHref}
        className="fixed bottom-4 left-4 z-30 inline-flex min-h-12 items-center gap-2 rounded-full border border-forest bg-paper px-4 font-semibold text-forest-deep shadow-lg shadow-forest-deep/15 transition-colors hover:bg-sage-soft md:hidden"
      >
        <Phone aria-hidden="true" className="size-5" />
        {headerContent.emergencyLabel}
        <span className="sr-only">, telepon {site.contact.ambulancePhoneDisplay}</span>
      </a>
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Hubungi kami lewat WhatsApp"
        className="fixed bottom-4 right-4 z-30 inline-flex size-14 items-center justify-center gap-2 rounded-full border-2 border-cream bg-forest text-cream shadow-lg shadow-forest-deep/25 transition-colors hover:bg-forest-deep md:bottom-6 md:right-6 md:h-14 md:w-auto md:px-6"
      >
        <MessageCircle aria-hidden="true" className="size-6" />
        <span aria-hidden="true" className="hidden font-semibold md:inline">
          WhatsApp
        </span>
      </a>
    </>
  );
}
