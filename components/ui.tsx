"use client";

import { startTransition, useActionState, type ComponentProps, type SubmitEvent, type ReactNode } from "react";
import type { FormState } from "@/lib/definitions";

export const inputClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100";

export function Field({
  label,
  name,
  hint,
  className,
  ...props
}: { label: string; name: string; hint?: ReactNode } & ComponentProps<"input">) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <input id={name} name={name} className={inputClass} {...props} />
      {hint && <p className="mt-1 text-xs text-zinc-500">{hint}</p>}
    </div>
  );
}

export function TextArea({ label, name, className, ...props }: { label: string; name: string } & ComponentProps<"textarea">) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <textarea id={name} name={name} rows={4} className={inputClass} {...props} />
    </div>
  );
}

export function Select({
  label,
  name,
  options,
  className,
  ...props
}: { label: string; name: string; options: readonly { value: string; label: string }[] } & ComponentProps<"select">) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <select id={name} name={name} className={inputClass} {...props}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// useActionState wrapper that submits via onSubmit instead of <form action>. React resets
// uncontrolled forms after an action runs, which would wipe the user's input on a validation error.
export function useFormAction(action: (state: FormState, formData: FormData) => Promise<FormState>) {
  const [state, dispatch, pending] = useActionState(action, undefined);
  const onSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => dispatch(formData));
  };
  return { state, pending, onSubmit };
}

export function SubmitButton({
  children,
  pending,
  pendingText = "Saving…",
}: {
  children: ReactNode;
  pending: boolean;
  pendingText?: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? pendingText : children}
    </button>
  );
}

export function FormMessage({ state }: { state: FormState }) {
  if (state?.error) {
    return (
      <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950/50 dark:text-red-300">
        {state.error}
      </p>
    );
  }
  if (state?.success) {
    return (
      <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
        {state.success}
      </p>
    );
  }
  return null;
}
