import Link from "next/link";

export function Logo({ href = "/", className = "" }: { href?: string; className?: string }) {
  return (
    <Link href={href} className={`inline-flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-white ${className}`}>
      <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white shadow-sm">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <path d="M4 17l5-5 4 4 7-8" />
          <path d="M15 8h5v5" />
        </svg>
      </span>
      <span>
        Career<span className="text-primary-text">Flow</span>
      </span>
    </Link>
  );
}
