import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { MobileNav } from "@/components/layout/MobileNav";
import { navLinks } from "@/lib/nav-links";
import { getProfile } from "@/content/profile";
import type { AppLocale } from "@/i18n/routing";

export async function Header({ locale }: { locale: AppLocale }) {
  const profile = getProfile(locale);
  const t = await getTranslations({ locale, namespace: "nav" });

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-fg">
          {profile.name}
        </Link>

        <nav className="hidden items-center gap-8 sm:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-fg-muted transition-colors hover:text-fg"
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 sm:flex">
            <LangSwitcher />
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
