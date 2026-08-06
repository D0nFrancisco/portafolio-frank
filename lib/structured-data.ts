import { getProfile } from "@/content/profile";
import { siteUrl } from "@/lib/site";
import type { AppLocale } from "@/i18n/routing";

export function personJsonLd(locale: AppLocale) {
  const profile = getProfile(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    sameAs: [profile.social.github.href, profile.social.linkedin.href],
  };
}
