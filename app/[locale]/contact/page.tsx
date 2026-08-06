import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/contact/ContactForm";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { Mail, MapPin } from "lucide-react";
import { getProfile } from "@/content/profile";
import { localeAlternates } from "@/lib/alternates";
import { cn } from "@/lib/cn";
import { iconButtonBase } from "@/lib/styles";
import type { AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: AppLocale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const profile = getProfile(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription", { name: profile.name }),
    alternates: { languages: localeAlternates("/contact") },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: AppLocale }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const profile = getProfile(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  const channels = [
    { label: t("channelEmail"), value: profile.email, href: profile.social.email.href, external: false, Icon: Mail },
    {
      label: t("channelGithub"),
      value: profile.social.github.href.replace("https://", ""),
      href: profile.social.github.href,
      external: true,
      Icon: GithubIcon,
    },
    {
      label: t("channelLinkedin"),
      value: profile.social.linkedin.href.replace("https://", ""),
      href: profile.social.linkedin.href,
      external: true,
      Icon: LinkedinIcon,
    },
    { label: t("channelLocation"), value: profile.location, href: null, external: false, Icon: MapPin },
  ];

  return (
    <Container as="section" className="py-20">
      <SectionHeading eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

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
