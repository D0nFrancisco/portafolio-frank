import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileNav } from "@/components/layout/MobileNav";
import { navLinks } from "@/lib/nav-links";
import { profile } from "@/content/profile";

export function Header() {
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
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
