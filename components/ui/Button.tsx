import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors duration-150 px-5 py-2.5 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-accent-fg hover:opacity-90",
  secondary: "border border-border-strong text-fg hover:bg-bg-subtle",
  ghost: "text-fg-muted hover:text-fg",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type LinkButtonProps = CommonProps & {
  href: string;
  external?: boolean;
};

type NativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", className, children } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- destructured only to exclude from `rest`
  const { variant: _variant, className: _cls, children: _children, ...rest } = props;

  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}
