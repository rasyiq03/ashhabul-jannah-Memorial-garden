import { MessageCircle } from "lucide-react";
import { faqIntro, faqItems } from "@/content/faq";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { businessWhatsAppUrl } from "@/lib/whatsapp";

const accordionEntries = faqItems.map((item) => ({ title: item.question, body: item.answer }));

export function FaqSection() {
  return (
    <Section id="faq" labelledBy="faq-title">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading id="faq-title" title={faqIntro.title} lead={faqIntro.lead} />
          <ButtonLink
            href={businessWhatsAppUrl(faqIntro.whatsappMessage)}
            external
            variant="secondary"
            className="mt-8"
          >
            <MessageCircle aria-hidden="true" className="size-5" />
            {faqIntro.whatsappLabel}
          </ButtonLink>
        </div>
        <Accordion entries={accordionEntries} />
      </div>
    </Section>
  );
}
