"use client";

import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";
import { iconButtonBase } from "@/lib/styles";

// data-theme on <html> is true external state (set by the pre-hydration
// script in <head>, and potentially by another mounted ThemeToggle — the
// mobile nav has its own instance). useSyncExternalStore keeps every
// instance in sync with it, and with each other, without an effect.
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle() {
  const t = useTranslations("themeToggle");
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next = isDark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t("toLight") : t("toDark")}
      className={cn(iconButtonBase, "text-fg-muted transition-colors hover:text-fg")}
    >
      {isDark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    </button>
  );
}
