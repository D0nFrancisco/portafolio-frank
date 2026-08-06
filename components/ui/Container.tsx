import { cn } from "@/lib/cn";
import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

export function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[70rem] px-6", className)}>
      {children}
    </Tag>
  );
}
