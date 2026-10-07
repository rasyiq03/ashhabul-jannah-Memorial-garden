import { ambulanceTelHref, fullAddress, site } from "@/config/site";
import { footerContent, footerNav } from "@/content/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { Container } from "@/components/ui/Section";
import { CurrentYear } from "@/components/layout/CurrentYear";
import { businessWhatsAppUrl } from "@/lib/whatsapp";

const linkClasses = "text-sage-200 underline-offset-4 transition-colors hover:text-cream hover:underline";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-forest-deep pb-24 text-cream md:pb-0">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,4fr)] lg:gap-16">
        <div>
          <div className="flex items-center gap-3">
            <BrandMark className="h-10 w-8" />
            <p className="font-serif text-2xl">{site.name}</p>
          </div>
          <p className="mt-5 max-w-sm leading-relaxed text-sage-200">
            {footerContent.managedBy} {site.license.label} No. {site.license.number},{" "}
            {site.license.issuer}.
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2" aria-label="Media sosial">
            {site.social.map((account) => (
              <li key={account.label}>
                <a href={account.href} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                  {account.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Menu bawah">
          <h2 className="font-sans text-sm font-semibold text-gold-soft">{footerContent.menuHeading}</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5 lg:grid-cols-1">
            {footerNav.map((item) => (
              <li key={item.sectionId}>
                <a href={`#${item.sectionId}`} className={linkClasses}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-semibold text-gold-soft">{footerContent.contactHeading}</h2>
          <dl className="mt-4 space-y-4">
            <div>
              <dt className="text-sm text-sage-200">{footerContent.emergencyLabel}</dt>
              <dd>
                <a href={ambulanceTelHref} className="text-lg font-semibold underline-offset-4 hover:underline">
                  {site.contact.ambulancePhoneDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-sage-200">{footerContent.whatsappLabel}</dt>
              <dd>
                <a
                  href={businessWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold underline-offset-4 hover:underline"
                >
                  {site.contact.whatsappDisplay}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-sage-200">{footerContent.emailLabel}</dt>
              <dd>
                <a href={`mailto:${site.contact.email}`} className="underline-offset-4 hover:underline">
                  {site.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-sage-200">{footerContent.addressLabel}</dt>
              <dd>
                <address className="not-italic leading-relaxed">{fullAddress}</address>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
      <div className="border-t border-cream/15">
        <Container className="flex flex-col gap-2 py-6 text-sm text-sage-200 sm:flex-row sm:justify-between">
          <p>
            &copy; <CurrentYear buildYear={new Date().getFullYear()} /> {site.nazhir}. {footerContent.rights}
          </p>
          <p>{footerContent.waqfNote}</p>
        </Container>
      </div>
    </footer>
  );
}
