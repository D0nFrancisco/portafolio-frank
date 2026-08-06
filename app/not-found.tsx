import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container as="section" className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <p className="font-mono text-sm text-fg-subtle">404</p>
      <h1 className="text-2xl font-semibold text-fg">Page not found</h1>
      <p className="max-w-sm text-sm text-fg-muted">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex items-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
      >
        Back to home
      </Link>
    </Container>
  );
}
