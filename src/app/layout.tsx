import type { Metadata, Viewport } from "next";
import { Figtree, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import { brandColors } from "@/config/brand-colors";
import { site } from "@/config/site";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { buildBusinessJsonLd, serializeJsonLd } from "@/lib/structured-data";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-newsreader",
});

const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

const defaultTitle = `${site.name}: Pemakaman Muslim Berbasis Wakaf, Ambulans dan Pemulasaraan Jenazah`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
    template: `%s | ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "pemakaman muslim",
    "makam wakaf",
    "kavling makam Bandung",
    "ambulans jenazah 24 jam",
    "mobil jenazah Bandung",
    "pemulasaraan jenazah",
    "memandikan jenazah",
    "makam dhuafa",
  ],
  authors: [{ name: site.nazhir }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: brandColors.forest,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${newsreader.variable} ${figtree.variable}`}>
      <body>
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-forest focus:px-4 focus:py-3 focus:font-semibold focus:text-cream"
        >
          Lewati ke konten utama
        </a>
        <SiteHeader />
        <main id="konten">{children}</main>
        <SiteFooter />
        <FloatingActions />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildBusinessJsonLd()) }}
        />
      </body>
    </html>
  );
}
