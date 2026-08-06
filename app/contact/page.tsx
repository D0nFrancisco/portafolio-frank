import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { Mail, MapPin } from "lucide-react";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
};

const channels = [
  { label: "Email", value: profile.email, href: profile.social.email.href, Icon: Mail },
  {
    label: "GitHub",
    value: profile.social.github.href.replace("https://", ""),
    href: profile.social.github.href,
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: profile.social.linkedin.href.replace("https://", ""),
    href: profile.social.linkedin.href,
    Icon: LinkedinIcon,
  },
  { label: "Location", value: profile.location, href: null, Icon: MapPin },
];

export default function ContactPage() {
  return (
    <Container as="section" className="py-20">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        description="Tell me a bit about the role or the problem — I'll reply from this same address."
      />

      <div className="mt-12 grid gap-12 sm:grid-cols-[1fr_1.4fr]">
        <ul className="flex flex-col gap-4">
          {channels.map(({ label, value, href, Icon }) => (
            <li key={label} className="flex items-center gap-4 rounded-xl border border-border p-4">
              <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-border text-fg-muted">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs text-fg-subtle">{label}</p>
                {href ? (
                  <a
                    href={href}
                    target={label === "Email" ? undefined : "_blank"}
                    rel={label === "Email" ? undefined : "noopener noreferrer"}
                    className="text-sm font-medium text-fg transition-colors hover:text-accent"
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-fg">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <ContactForm />
      </div>
    </Container>
  );
}
