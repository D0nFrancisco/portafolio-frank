import type { MetadataRoute } from "next";
import { getProfile } from "@/content/profile";
import { routing } from "@/i18n/routing";

export default function manifest(): MetadataRoute.Manifest {
  // A single manifest for the whole site (not per-locale — "add to home
  // screen" metadata doesn't need its own translation), using the default
  // locale's content.
  const profile = getProfile(routing.defaultLocale);

  return {
    name: `${profile.name} — ${profile.role}`,
    short_name: profile.name,
    description: profile.tagline,
    start_url: `/${routing.defaultLocale}`,
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0b",
    icons: [{ src: "/icon", sizes: "any", type: "image/png" }],
  };
}
