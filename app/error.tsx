"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container as="section" className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-sm text-fg-subtle">Error</p>
      <h1 className="text-2xl font-semibold text-fg">Something went wrong</h1>
      <p className="max-w-sm text-sm text-fg-muted">
        That page hit an unexpected error. You can try again, or head back home.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </Container>
  );
}
