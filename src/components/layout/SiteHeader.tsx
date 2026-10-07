"use client";

import { Menu, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ambulanceTelHref, site } from "@/config/site";
import { headerContent, primaryNav } from "@/content/navigation";
import { BrandMark } from "@/components/ui/BrandMark";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { businessWhatsAppUrl } from "@/lib/whatsapp";

const headerWhatsAppUrl = businessWhatsAppUrl(headerContent.whatsappMessage);

function useActiveSection(sectionIds: string[]): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    if (sections.length === 0 || !("IntersectionObserver" in window)) return;

    const intersecting = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        }
        setActiveId(sectionIds.find((id) => intersecting.has(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}

const navSectionIds = primaryNav.map((item) => item.sectionId);

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const activeId = useActiveSection(navSectionIds);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const closeOnDesktop = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <BrandMark className="h-9 w-7 shrink-0" />
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-serif text-lg text-forest sm:text-xl">{site.shortName}</span>{" "}
            <span className="hidden text-xs text-ink-soft sm:block">Memorial Park</span>
          </span>
        </Link>

        <nav aria-label="Menu utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={`#${item.sectionId}`}
                  aria-current={activeId === item.sectionId ? "location" : undefined}
                  className={cn(
                    "relative inline-flex min-h-11 items-center px-2.5 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:text-forest xl:px-3",
                    "aria-[current=location]:text-forest",
                    "after:absolute after:inset-x-2.5 after:bottom-2 after:h-px after:bg-gold after:opacity-0 after:transition-opacity aria-[current=location]:after:opacity-100",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ButtonLink href={headerWhatsAppUrl} external>
              <MessageCircle aria-hidden="true" className="size-4" />
              {headerContent.whatsappLabel}
            </ButtonLink>
          </div>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-seluler"
            className="flex size-11 items-center justify-center rounded-sm border border-line-strong text-forest transition-colors hover:border-forest lg:hidden"
          >
            {menuOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            <span className="sr-only">{menuOpen ? headerContent.menuClose : headerContent.menuOpen}</span>
          </button>
        </div>
      </div>

      <div
        id="menu-seluler"
        inert={!menuOpen}
        className={cn(
          "grid border-line bg-cream transition-[grid-template-rows] duration-300 ease-out lg:hidden",
          menuOpen ? "grid-rows-[1fr] border-t" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <nav aria-label="Menu seluler" className="mx-auto max-w-6xl px-4 pb-6 pt-2 sm:px-6">
            <ul className="divide-y divide-line">
              {primaryNav.map((item) => (
                <li key={item.sectionId}>
                  <a
                    href={`#${item.sectionId}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={activeId === item.sectionId ? "location" : undefined}
                    className="flex min-h-12 items-center font-serif text-xl text-ink aria-[current=location]:text-forest"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <ButtonLink href={headerWhatsAppUrl} external size="lg">
                <MessageCircle aria-hidden="true" className="size-5" />
                {headerContent.whatsappLabel}
              </ButtonLink>
              <ButtonLink href={ambulanceTelHref} variant="secondary" size="lg">
                <Phone aria-hidden="true" className="size-5" />
                Telepon {site.contact.ambulancePhoneDisplay}
              </ButtonLink>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
