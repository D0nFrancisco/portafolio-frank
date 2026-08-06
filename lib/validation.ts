import { z } from "zod";

// Decoupled from next-intl on purpose: this module only needs "something
// that maps a message key to translated text," not the translator's full
// type. The Server Action passes next-intl's `t`; anything with the same
// shape works.
type Translate = (key: string) => string;

export function getContactFormSchema(t: Translate) {
  return z.object({
    name: z.string().trim().min(2, t("nameRequired")).max(100, t("nameTooLong")),
    email: z.string().trim().min(1, t("emailRequired")).email(t("emailInvalid")),
    message: z
      .string()
      .trim()
      .min(10, t("messageTooShort"))
      .max(2000, t("messageTooLong")),
  });
}
