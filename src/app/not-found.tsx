import { Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ambulanceTelHref } from "@/config/site";
import { notFoundContent } from "@/content/contact";
import { ArchFrame } from "@/components/ui/ArchFrame";
import { ButtonLink, buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Halaman tidak ditemukan",
  description: notFoundContent.body,
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="tidak-ditemukan-title" className="py-20 md:py-28">
      <Container className="grid items-center gap-14 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div>
          <p className="font-serif text-2xl text-gold-ink">404</p>
          <h1 id="tidak-ditemukan-title" className="mt-3 font-serif text-5xl text-forest md:text-6xl">
            {notFoundContent.title}
          </h1>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-soft">{notFoundContent.body}</p>
          <p className="mt-6 max-w-prose border-l-2 border-gold pl-4 leading-relaxed text-ink">{notFoundContent.emergency}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className={buttonClasses({ size: "lg" })}>
              {notFoundContent.homeLabel}
            </Link>
            <ButtonLink href={ambulanceTelHref} variant="secondary" size="lg">
              <Phone aria-hidden="true" className="size-5" />
              {notFoundContent.callLabel}
            </ButtonLink>
          </div>
        </div>
        <ArchFrame className="mx-auto hidden aspect-[100/130] w-full max-w-xs md:block" fillClassName="text-sage-soft">
          <div aria-hidden="true" className="pattern-girih absolute inset-x-6 bottom-6 top-24 bg-sage" />
        </ArchFrame>
      </Container>
    </section>
  );
}
