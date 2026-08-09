"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { iconButtonBase } from "@/lib/styles";
import type { ProjectImage } from "@/content/projects";

// Screenshots (especially the tall report ones) are shown scaled to the
// content column here, then reopened at native pixel size in a scrollable
// modal — the column is too narrow to show them full-size inline without
// either cropping or blowing up the layout.
export function GalleryImage({ image, priority }: { image: ProjectImage; priority?: boolean }) {
  const t = useTranslations("caseStudy");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${image.alt} — ${t("viewFullSize")}`}
        className="block w-full cursor-zoom-in"
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          sizes="(min-width: 40rem) 70rem, 100vw"
          className="h-auto w-full"
        />
      </button>

      {open && mounted
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={image.alt}
              className="fixed inset-0 z-50 flex items-center justify-center bg-bg/90 p-4 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            >
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("closeImage")}
                className={cn(iconButtonBase, "absolute right-4 top-4 border-border-strong bg-surface text-fg")}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
              <div
                className="max-h-[90vh] max-w-[90vw] overflow-auto rounded-xl border border-border-strong"
                onClick={(event) => event.stopPropagation()}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="block max-w-none"
                />
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
