import Link from "next/link";

export function StatCard({ label, value, href, active }: { label: string; value: number; href: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`rounded-2xl border bg-white p-4 transition hover:border-indigo-300 dark:bg-zinc-900 ${
        active ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-zinc-200 dark:border-zinc-800"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">{value}</p>
    </Link>
  );
}
