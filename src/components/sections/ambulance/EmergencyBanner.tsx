import { MessageCircle, Phone } from "lucide-react";
import { ambulanceTelHref, site } from "@/config/site";
import { emergencyBanner } from "@/content/ambulance";
import { ButtonLink } from "@/components/ui/Button";
import { businessWhatsAppUrl } from "@/lib/whatsapp";

export function EmergencyBanner() {
  return (
    <div className="on-dark relative isolate overflow-hidden rounded-sm bg-forest-deep text-cream">
      <div aria-hidden="true" className="pattern-girih absolute inset-0 -z-10 bg-forest" />
      <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
        <div>
          <h3 className="font-serif text-3xl text-gold-soft sm:text-4xl">{emergencyBanner.title}</h3>
          <p className="mt-3 max-w-[46ch] leading-relaxed text-sage-200">{emergencyBanner.body}</p>
        </div>
        <div className="flex flex-col gap-4">
          <a
            href={ambulanceTelHref}
            className="font-serif text-4xl tabular-nums text-cream underline-offset-8 hover:underline sm:text-5xl"
          >
            {site.contact.ambulancePhoneDisplay}
          </a>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={ambulanceTelHref} variant="inverse" size="lg">
              <Phone aria-hidden="true" className="size-5" />
              {emergencyBanner.callLabel}
            </ButtonLink>
            <ButtonLink
              href={businessWhatsAppUrl(emergencyBanner.whatsappMessage)}
              external
              variant="inverse-outline"
              size="lg"
            >
              <MessageCircle aria-hidden="true" className="size-5" />
              {emergencyBanner.whatsappLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
