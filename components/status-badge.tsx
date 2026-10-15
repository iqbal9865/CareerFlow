import type { ApplicationStatus } from "@/lib/definitions";

export const STATUS_LABELS: Record<ApplicationStatus, string> = {
  PENDING: "Pending",
  INTERVIEW: "Interview",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

const STATUS_STYLES: Record<ApplicationStatus, string> = {
  PENDING: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  INTERVIEW: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300",
  ACCEPTED: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  REJECTED: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
