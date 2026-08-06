"use client";

import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LangSwitcher() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("langSwitcher");
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function selectLocale(next: AppLocale) {
    setOpen(false);
    if (next !== locale) router.replace(pathname, { locale: next });
  }

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("label")}
        className="inline-flex h-9 items-center gap-1 rounded-lg border border-border px-3 font-mono text-xs font-medium uppercase text-fg-muted transition-colors hover:text-fg"
      >
        {locale}
        <ChevronDown className="h-3 w-3" aria-hidden="true" />
      </button>

      {open ? (
        <ul
          role="listbox"
          aria-label={t("label")}
          className="absolute right-0 top-full z-50 mt-2 min-w-32 overflow-hidden rounded-lg border border-border bg-bg py-1 shadow-lg"
        >
          {routing.locales.map((option) => (
            <li key={option} role="option" aria-selected={option === locale}>
              <button
                type="button"
                onClick={() => selectLocale(option)}
                className={cn(
                  "flex w-full items-center px-3 py-2 text-left text-sm transition-colors hover:bg-bg-subtle",
                  option === locale ? "font-medium text-fg" : "text-fg-muted",
                )}
              >
                {t(option)}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
