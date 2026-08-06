import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-border bg-bg-subtle px-2.5 py-1 text-xs font-medium text-fg-muted",
        className,
      )}
    >
      {children}
    </span>
  );
}
