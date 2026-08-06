import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { Mail, MapPin } from "lucide-react";
import { profile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { iconButtonBase } from "@/lib/styles";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${profile.name}.`,
};

const channels = [
  { label: "Email", value: profile.email, href: profile.social.email.href, external: false, Icon: Mail },
  {
    label: "GitHub",
    value: profile.social.github.href.replace("https://", ""),
    href: profile.social.github.href,
    external: true,
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: profile.social.linkedin.href.replace("https://", ""),
    href: profile.social.linkedin.href,
    external: true,
    Icon: LinkedinIcon,
  },
  { label: "Location", value: profile.location, href: null, external: false, Icon: MapPin },
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
          {channels.map(({ label, value, href, external, Icon }) => (
            <li key={label} className="flex items-center gap-4 rounded-xl border border-border p-4">
              <span className={cn(iconButtonBase, "flex-none text-fg-muted")}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs text-fg-subtle">{label}</p>
                {href ? (
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
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
