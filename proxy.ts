import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Run on everything except Next internals and the site-wide (not
  // per-locale) metadata routes at the true root: robots.txt, sitemap.xml,
  // the web manifest, and the favicon/apple-icon, plus any file with an
  // extension as a general static-asset fallback.
  matcher: [
    "/((?!api|_next|_vercel|robots.txt|sitemap.xml|manifest.webmanifest|icon|apple-icon|.*\\..*).*)",
  ],
};
