import Link from "next/link";

// Renders as a filter link when given an href, otherwise as a plain tile
export function StatCard({ label, value, href, active = false }: { label: string; value: number; href?: string; active?: boolean }) {
  const className = `rounded-2xl border bg-white p-4 transition dark:bg-zinc-900 ${
    active ? "border-indigo-500 ring-2 ring-indigo-500/20" : "border-zinc-200 dark:border-zinc-800"
  } ${href ? "hover:border-indigo-300" : ""}`;
  const content = (
    <>
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-zinc-900 dark:text-white">{value}</p>
    </>
  );

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
