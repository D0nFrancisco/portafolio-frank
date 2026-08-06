function resolveSiteUrl(): string {
  // Set explicitly once the final domain is known (custom domain or the
  // Vercel-assigned one) — takes priority over everything else.
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;

  // Vercel sets this automatically on every deploy; no manual config
  // needed to get a correct URL immediately after connecting the repo.
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
