import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { getProjectSlugParams } from "@/content/projects";
import { localeAlternates } from "@/lib/alternates";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/work",
    "/contact",
    ...getProjectSlugParams().map((project) => `/work/${project.slug}`),
  ];

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
      alternates: { languages: localeAlternates(path) },
    })),
  );
}
