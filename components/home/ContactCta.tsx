import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { profile } from "@/content/profile";

export function ContactCta() {
  return (
    <section className="py-20">
      <Container className="max-w-2xl text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            Have something that needs building?
          </h2>
          <p className="mt-3 text-base leading-relaxed text-fg-muted">
            I&apos;m open to backend, systems, or full-stack roles. The fastest way to reach me is email —
            I read every message.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              Get in touch
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a
              href={profile.social.email.href}
              className="text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              {profile.email}
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
