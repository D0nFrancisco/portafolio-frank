import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100, "That name is too long."),
  email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(10, "Say a bit more — at least 10 characters.")
    .max(2000, "That message is too long."),
});
