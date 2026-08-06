"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "@/i18n/routing";
import { navLinks } from "@/lib/nav-links";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LangSwitcher } from "@/components/layout/LangSwitcher";
import { cn } from "@/lib/cn";
import { iconButtonBase } from "@/lib/styles";

export function MobileNav() {
  const t = useTranslations("mobileNav");
  const tNav = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // The header has backdrop-blur, which — like any CSS filter — creates a
  // new containing block for `position: fixed` descendants. That silently
  // shrank this panel to the header's own box instead of the viewport, so
  // it's portaled to <body> to escape that ancestor entirely. `document`
  // doesn't exist during SSR, so the portal target is only available after
  // mount — this is the standard React pattern for that, not state that
  // belongs in a render.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        openButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        ref={openButtonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t("openMenu")}
        aria-expanded={open}
        className={cn(iconButtonBase, "text-fg")}
      >
        <Menu className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && mounted
        ? createPortal(
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={t("menu")}
              className="fixed inset-0 z-50 bg-bg"
            >
              <div className="flex items-center justify-between px-6 py-4">
                <span className="font-mono text-sm text-fg-muted">{t("menu")}</span>
                <div className="flex items-center gap-3">
                  <LangSwitcher />
                  <ThemeToggle />
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label={t("closeMenu")}
                    className={cn(iconButtonBase, "text-fg")}
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <nav className="flex flex-col gap-1 px-6 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-lg font-medium text-fg hover:bg-bg-subtle"
                  >
                    {tNav(link.key)}
                  </Link>
                ))}
              </nav>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
