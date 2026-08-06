"use server";

import { contactFormSchema } from "@/lib/validation";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mbdqrqyo";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "email" | "message", string>>;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real users never fill a field hidden from view. Bots that
  // fill every input do — quietly accept without sending anything.
  if (formData.get("company")) {
    return { status: "success", message: "Thanks — I'll get back to you soon." };
  }

  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      status: "error",
      message: "Please fix the fields below.",
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
      return {
        status: "error",
        message: "Something went wrong sending that. Try emailing me directly instead.",
      };
    }

    return { status: "success", message: "Thanks — I'll get back to you soon." };
  } catch {
    return {
      status: "error",
      message: "Something went wrong sending that. Try emailing me directly instead.",
    };
  }
}
