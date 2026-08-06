import { routing } from "@/i18n/routing";
import { siteUrl } from "@/lib/site";

// Builds the `alternates.languages` map Next's metadata API expects, so
// every page correctly tells search engines where its other-language
// version lives (hreflang). `path` is locale-agnostic, e.g. "/work/sysguard"
// or "" for the home page.
export function localeAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${siteUrl}/${locale}${path}`;
  }
  return languages;
}
