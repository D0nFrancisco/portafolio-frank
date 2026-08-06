import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { ContactCta } from "@/components/home/ContactCta";
import type { AppLocale } from "@/i18n/routing";

export default async function Home({ params }: { params: Promise<{ locale: AppLocale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <About locale={locale} />
      <FeaturedWork locale={locale} />
      <ContactCta locale={locale} />
    </>
  );
}
