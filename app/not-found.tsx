import Link from "next/link";

// Fallback for the rare case a request reaches the router without a valid
// locale segment at all (e.g. a malformed path the middleware didn't
// rewrite). The real, translated 404 that visitors normally see is
// app/[locale]/not-found.tsx — this one can't know the locale, so it stays
// minimal and in English, and links to the fixed default-locale home
// rather than the locale-aware Link wrapper (there's no locale here to be
// aware of).
export default function RootNotFound() {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", padding: "4rem 1.5rem", textAlign: "center" }}>
        <p>Page not found.</p>
        <Link href="/en">Back to home</Link>
      </body>
    </html>
  );
}
