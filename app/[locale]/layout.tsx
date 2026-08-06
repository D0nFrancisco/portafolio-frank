import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeSync } from "@/components/layout/ThemeSync";
import { themeInitScript } from "@/lib/theme-script";
import { getProfile } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import { localeAlternates } from "@/lib/alternates";
import { personJsonLd } from "@/lib/structured-data";
import { routing, type AppLocale } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const ogLocale: Record<AppLocale, string> = { en: "en_US", es: "es_CO" };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const profile = getProfile(locale);

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${profile.name} — ${profile.role}`,
      template: `%s — ${profile.name}`,
    },
    description: profile.tagline,
    alternates: { languages: localeAlternates("") },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      siteName: profile.name,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/*
          next/script (not a raw <script> tag) on purpose: switching locale
          is a client-side transition through this same layout, and React
          warns when a plain <script> is reconciled into an already-live DOM
          on the client instead of parsed from the initial HTML. next/script
          tracks each script by id and skips re-injecting it, which is right
          for JSON-LD (it only needs to be accurate in the server-rendered
          HTML a crawler actually requests) — theme correctness on later
          navigations is handled separately by <ThemeSync>, not by this
          script re-running.
        */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
        >
          {JSON.stringify(personJsonLd(locale))}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider>
          <ThemeSync />
          <a
            href="#main-content"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-accent focus-visible:px-4 focus-visible:py-2 focus-visible:text-accent-fg"
          >
            {t("skipToContent")}
          </a>
          <Header locale={locale} />
          <main id="main-content">{children}</main>
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
