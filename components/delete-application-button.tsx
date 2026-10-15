"use client";

import { useTransition } from "react";
import { deleteApplication } from "@/app/actions/applications";

export function DeleteApplicationButton({ id, label }: { id: string; label: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => {
        if (confirm(`Delete your application to ${label}? This cannot be undone.`)) {
          startTransition(() => deleteApplication(id));
        }
      }}
      className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60 dark:border-red-900 dark:hover:bg-red-950/40"
    >
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
