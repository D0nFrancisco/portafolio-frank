"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { submitContactForm, type ContactFormState } from "@/app/[locale]/contact/actions";

const initialState: ContactFormState = { status: "idle" };

const inputClasses =
  "w-full rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-fg outline-none transition-colors focus-visible:border-accent";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  if (state.status === "success") {
    return (
      <div role="status" aria-live="polite" className="rounded-xl border border-border p-10 text-center">
        <p className="text-lg font-medium text-fg">{t("sentTitle")}</p>
        <p className="mt-2 text-sm text-fg-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {/* Honeypot — hidden from sighted and screen-reader users, bots fill it anyway. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-fg">
          {t("name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          aria-invalid={Boolean(state.errors?.name)}
          aria-describedby={state.errors?.name ? "name-error" : undefined}
          className={inputClasses}
        />
        {state.errors?.name ? (
          <p id="name-error" className="mt-1.5 text-sm text-danger">
            {state.errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-fg">
          {t("email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          aria-invalid={Boolean(state.errors?.email)}
          aria-describedby={state.errors?.email ? "email-error" : undefined}
          className={inputClasses}
        />
        {state.errors?.email ? (
          <p id="email-error" className="mt-1.5 text-sm text-danger">
            {state.errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-fg">
          {t("message")}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          aria-invalid={Boolean(state.errors?.message)}
          aria-describedby={state.errors?.message ? "message-error" : undefined}
          className={`${inputClasses} resize-none`}
        />
        {state.errors?.message ? (
          <p id="message-error" className="mt-1.5 text-sm text-danger">
            {state.errors.message}
          </p>
        ) : null}
      </div>

      {state.status === "error" && state.message ? (
        <p role="alert" className="text-sm text-danger">
          {state.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-accent-fg transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {isPending ? t("sending") : t("send")}
      </button>
    </form>
  );
}
