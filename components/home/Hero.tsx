import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="border-b border-border">
      <Container className="flex min-h-[70vh] flex-col justify-center gap-6 py-20">
        <p className="font-mono text-sm text-fg-subtle">{profile.role}</p>
        <h1 className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-5xl">
          {profile.tagline}
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-fg-muted">
          Based in {profile.location} — open to remote roles. I build small,
          complete systems end to end — the automation, the API, and the
          interface in front of it — and document how each one actually
          works.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            View work
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border-strong px-5 py-2.5 text-sm font-medium text-fg transition-colors hover:bg-bg-subtle"
          >
            Get in touch
          </Link>
        </div>
      </Container>
    </section>
  );
}
