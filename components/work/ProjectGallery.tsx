import { getTranslations } from "next-intl/server";
import { GalleryImage } from "@/components/work/GalleryImage";
import type { ProjectImage } from "@/content/projects";
import type { AppLocale } from "@/i18n/routing";

export async function ProjectGallery({
  images,
  locale,
}: {
  images: ProjectImage[] | undefined;
  locale: AppLocale;
}) {
  if (!images || images.length === 0) return null;

  const [preview, ...rest] = images;
  const t = await getTranslations({ locale, namespace: "caseStudy" });

  return (
    <section className="border-b border-border py-10">
      <h2 className="text-sm font-mono uppercase tracking-widest text-fg-subtle">{t("screenshots")}</h2>

      <div className="mt-4 overflow-hidden rounded-xl border border-border">
        <GalleryImage image={preview} priority />
      </div>

      {rest.length > 0 ? (
        <div className="mt-6 divide-y divide-border overflow-hidden rounded-xl border border-border">
          {rest.map((image) => (
            <GalleryImage key={image.src} image={image} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
