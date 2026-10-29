import type { Metadata, Viewport } from "next";
import {
  Fraunces,
  IBM_Plex_Mono,
  IBM_Plex_Sans_Arabic,
  Rubik,
} from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Chrome } from "@/components/site/chrome";
import { site } from "@/lib/site";

const plexAr = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-ar",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

/* Display face: Rubik (geometric, rounded warmth) — headings + wordmark.
   One variable feeds every `font-display` usage in the project. */
const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mazag.eg"),
  title: {
    default: "أكله بمزاج — منقل وكوشة وبخار",
    template: "%s · أكله بمزاج",
  },
  description:
    "مطبخ توصيل في المهندسين: برجر على الفحم، دامبلنغ على البخار، وبيتزا من الكوشة. بنطبخ بعد ما تطلب، والدفع عند الاستلام.",
  keywords: [
    "مطعم توصيل",
    "برجر",
    "بيتزا",
    "دامبلنغ",
    "المهندسين",
    "دفع عند الاستلام",
  ],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    siteName: "أكله بمزاج",
    title: "أكله بمزاج — تلات مناقل. مطبخ واحد.",
    description:
      "منقل، بخار، وكوشة في مطبخ واحد في المهندسين. بنوصّل سخن في ٣٥ دقيقة.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#faf4e8",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "أكله بمزاج",
  alternateName: "Mazag Kitchen",
  servesCuisine: ["Burger", "Pizza", "Asian", "Grill"],
  priceRange: "$$",
  telephone: `+${site.phone}`,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "١٢ شارع سوريا، المهندسين",
    addressLocality: "الجيزة",
    addressCountry: "EG",
  },
  openingHours: "Mo-Su 12:00-02:00",
  acceptsReservations: false,
  paymentAccepted: "Cash",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      data-scroll-behavior="smooth"
      className={`${plexAr.variable} ${rubik.variable} ${fraunces.variable} ${plexMono.variable}`}
    >
      <body className="min-h-dvh bg-cream text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CartProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-cream"
          >
            تخطَّ إلى المحتوى
          </a>
          <Chrome header={<SiteHeader />} footer={<SiteFooter />}>
            {children}
          </Chrome>
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
