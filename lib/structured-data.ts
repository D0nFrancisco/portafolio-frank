import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";

export function personJsonLd() {
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
