import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  // Every route is locale-prefixed (/en/..., /es/...), including the
  // default — this is what makes the selected language a real, bookmarkable,
  // indexable URL instead of hidden client state.
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];

// Locale-aware Link/useRouter/usePathname/redirect — used everywhere instead
// of the plain next/navigation equivalents so navigation never drops the
// current locale.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
