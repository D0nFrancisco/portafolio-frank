import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/icons/BrandIcons";
import { BackToTop } from "@/components/layout/BackToTop";
import { getProfile } from "@/content/profile";
import { cn } from "@/lib/cn";
import { iconButtonBase } from "@/lib/styles";
import type { AppLocale } from "@/i18n/routing";

const socialIcons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  email: Mail,
} as const;

export async function Footer({ locale }: { locale: AppLocale }) {
  const profile = getProfile(locale);
  const t = await getTranslations({ locale, namespace: "footer" });
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <Container className="flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-fg">{profile.name}</p>
          <p className="text-sm text-fg-muted">{profile.role}</p>
        </div>

        <div className="flex items-center gap-4">
          {(Object.keys(profile.social) as Array<keyof typeof profile.social>).map((key) => {
            const Icon = socialIcons[key];
            const link = profile.social[key];
            return (
              <a
                key={key}
                href={link.href}
                target={key === "email" ? undefined : "_blank"}
                rel={key === "email" ? undefined : "noopener noreferrer"}
                aria-label={link.label}
                className={cn(iconButtonBase, "text-fg-muted transition-colors hover:text-fg")}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </Container>
      <Container className="flex flex-col gap-2 border-t border-border py-6 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {profile.name}. {t("rights")}</p>
        <BackToTop label={t("backToTop")} />
      </Container>
    </footer>
  );
}
