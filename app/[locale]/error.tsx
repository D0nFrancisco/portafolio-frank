"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container as="section" className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-sm text-fg-subtle">{t("eyebrow")}</p>
      <h1 className="text-2xl font-semibold text-fg">{t("title")}</h1>
      <p className="max-w-sm text-sm text-fg-muted">{t("body")}</p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
      >
        {t("tryAgain")}
      </button>
    </Container>
  );
}
