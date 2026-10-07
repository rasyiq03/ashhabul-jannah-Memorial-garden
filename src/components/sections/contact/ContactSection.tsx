import { Mail, MessageCircle, Phone } from "lucide-react";
import { ambulanceTelHref, site } from "@/config/site";
import { contactContent } from "@/content/contact";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LazyContactForm } from "@/components/forms/LazyForms";
import { businessWhatsAppUrl } from "@/lib/whatsapp";

const directContacts = [
  { icon: Phone, label: contactContent.directLabels.emergency, value: site.contact.ambulancePhoneDisplay, href: ambulanceTelHref },
  { icon: MessageCircle, label: contactContent.directLabels.whatsapp, value: site.contact.whatsappDisplay, href: businessWhatsAppUrl(), external: true },
  { icon: Mail, label: contactContent.directLabels.email, value: site.contact.email, href: `mailto:${site.contact.email}` },
];

export function ContactSection() {
  return (
    <Section id="hubungi" labelledBy="hubungi-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <SectionHeading id="hubungi-title" title={contactContent.title} lead={contactContent.lead} />
          <p className="mt-6 max-w-prose border-l-2 border-gold pl-4 leading-relaxed text-ink">{contactContent.emergencyNote}</p>
          <ul className="mt-10 space-y-5">
            {directContacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <li key={contact.label}>
                  <a
                    href={contact.href}
                    {...(contact.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group inline-flex items-center gap-4"
                  >
                    <Icon aria-hidden="true" className="size-6 text-forest" strokeWidth={1.5} />
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm text-ink-soft">{contact.label}</span>
                      <span className="text-lg font-semibold text-ink underline-offset-4 group-hover:underline">
                        {contact.value}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <LazyContactForm />
      </div>
    </Section>
  );
}
