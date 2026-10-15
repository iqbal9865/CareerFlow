import { StatusBadge } from "@/components/status-badge";
import type { ApplicationStatus } from "@/lib/definitions";

// Static mockup of the real dashboard (same StatusBadge as the app) — swap for a screenshot when available
const SAMPLE_ROWS: { company: string; position: string; applied: string; status: ApplicationStatus }[] = [
  { company: "Northwind", position: "Frontend Engineer", applied: "Oct 12", status: "INTERVIEW" },
  { company: "Lumen Labs", position: "Product Designer", applied: "Oct 9", status: "PENDING" },
  { company: "Acme Cloud", position: "Full-stack Developer", applied: "Oct 3", status: "ACCEPTED" },
  { company: "Brightside", position: "UI Engineer", applied: "Sep 28", status: "REJECTED" },
];

const SAMPLE_STATS = [
  { label: "Total", value: 24 },
  { label: "Interview", value: 5 },
  { label: "Accepted", value: 2 },
];

export function ProductPreview() {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent blur-2xl" />
      <div
        role="img"
        aria-label="CareerFlow dashboard showing application stats and a list of job applications with Interview, Pending, Accepted and Rejected statuses"
        className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-primary/10 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="flex items-center gap-1.5 border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 rounded-md bg-white px-3 py-0.5 text-[11px] text-zinc-400 dark:bg-zinc-900">careerflow.app/dashboard</span>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="grid grid-cols-3 gap-3">
            {SAMPLE_STATS.map((s) => (
              <div key={s.label} className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
                <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">{s.label}</p>
                <p className="mt-0.5 text-xl font-semibold text-zinc-900 dark:text-white">{s.value}</p>
              </div>
            ))}
          </div>

          <ul className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {SAMPLE_ROWS.map((row) => (
              <li key={row.company} className="flex items-center justify-between gap-3 px-3 py-2.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-xs font-bold text-primary-text">
                    {row.company[0]}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">{row.company}</p>
                    <p className="truncate text-xs text-zinc-500">
                      {row.position} · {row.applied}
                    </p>
                  </div>
                </div>
                <StatusBadge status={row.status} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute -right-3 -top-7 hidden items-center gap-3 rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-lg sm:flex dark:border-zinc-800 dark:bg-zinc-900"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300">🔔</span>
        <div>
          <p className="text-xs font-semibold text-zinc-900 dark:text-white">Follow up with Lumen Labs</p>
          <p className="text-[11px] text-zinc-500">Due tomorrow</p>
        </div>
      </div>
    </div>
  );
}
