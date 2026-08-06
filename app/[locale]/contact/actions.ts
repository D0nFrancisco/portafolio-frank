"use server";

import { getTranslations } from "next-intl/server";
import { getContactFormSchema } from "@/lib/validation";

// Formspree form IDs aren't secret (they're the public POST target of a
// plain HTML form), so a hardcoded fallback is safe — the env var just
// makes it possible to point a preview/staging deploy at a different form
// without a code change.
const FORMSPREE_ENDPOINT = process.env.FORMSPREE_ENDPOINT ?? "https://formspree.io/f/mbdqrqyo";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const [tValidation, tForm] = await Promise.all([
    getTranslations("validation"),
    getTranslations("contactForm"),
  ]);

  // Honeypot: real users never fill a field hidden from view. Bots that
  // fill every input do — quietly accept without sending anything.
  if (formData.get("company")) {
    return { status: "success", message: tForm("sentBody") };
  }

  const parsed = getContactFormSchema(tValidation).safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      message: tForm("fixFields"),
      errors: {
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        message: fieldErrors.message?.[0],
      },
    };
  }

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(parsed.data),
    });

    if (!response.ok) {
      return { status: "error", message: tForm("genericError") };
    }

    return { status: "success", message: tForm("sentBody") };
  } catch {
    return { status: "error", message: tForm("genericError") };
  }
}
