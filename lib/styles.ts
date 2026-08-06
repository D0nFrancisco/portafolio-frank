// Class fragments repeated verbatim across enough files to be worth one
// source of truth. Callers compose these with `cn()` alongside whatever
// varies at each call site (color, hover state, layout) — nothing here
// changes what was already rendered, it just stops re-typing it.

export const iconButtonBase =
  "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border";

export const cardHoverClass =
  "rounded-xl border border-border p-6 transition-colors hover:border-border-strong";
