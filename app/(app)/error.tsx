"use client";

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Something went wrong</h2>
      <p className="mt-2 text-sm text-zinc-500">
        {process.env.NODE_ENV === "development" ? error.message : "We couldn't load this page. Please try again."}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Try again
      </button>
    </div>
  );
}
