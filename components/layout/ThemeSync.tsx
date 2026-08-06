"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "@/i18n/routing";

// `data-theme` on <html> is set imperatively (by the pre-hydration script
// on first load, and by ThemeToggle after that) — it's never part of
// React's own render output for <html>. A client-side navigation that
// swaps the [locale] segment reconstructs <html> from that render output
// alone and drops any attribute React doesn't know about, silently
// resetting the theme to the light-mode default. Re-applying it on every
// navigation (not just on mount) is what makes it survive that reset.
export function ThemeSync() {
  const pathname = usePathname();
  const locale = useLocale();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [pathname, locale]);

  return null;
}
