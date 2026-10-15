import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge, STATUS_LABELS } from "@/components/status-badge";
import { getApplications } from "@/lib/dal";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/definitions";
import { formatDate } from "@/lib/form";

export const metadata: Metadata = { title: "Applications" };

function isStatus(value: string | undefined): value is ApplicationStatus {
  return APPLICATION_STATUSES.includes(value as ApplicationStatus);
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const { status, q } = await searchParams;
  const applications = await getApplications();

  const counts = Object.fromEntries(
    APPLICATION_STATUSES.map((s) => [s, applications.filter((a) => a.status === s).length])
  ) as Record<ApplicationStatus, number>;

  const query = q?.trim().toLowerCase() ?? "";
  const filtered = applications.filter(
    (a) =>
      (!isStatus(status) || a.status === status) &&
      (!query || a.companyName.toLowerCase().includes(query) || a.position.toLowerCase().includes(query))
  );

  const filterHref = (s?: ApplicationStatus) => {
    const params = new URLSearchParams();
    if (s) params.set("status", s);
    if (q) params.set("q", q);
    const str = params.toString();
    return str ? `/dashboard?${str}` : "/dashboard";
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">Applications</h1>
          <p className="text-sm text-zinc-500">Keep every opportunity in one place.</p>
        </div>
        <Link
          href="/applications/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          + New application
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatCard label="Total" value={applications.length} href={filterHref()} active={!isStatus(status)} />
        {APPLICATION_STATUSES.map((s) => (
          <StatCard key={s} label={STATUS_LABELS[s]} value={counts[s]} href={filterHref(s)} active={status === s} />
        ))}
      </div>

      <form className="flex gap-2" action="/dashboard">
        {isStatus(status) && <input type="hidden" name="status" value={status} />}
        <input
          name="q"
          defaultValue={q}
          placeholder="Search company or position…"
          aria-label="Search applications"
          className="w-full max-w-sm rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        <button className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
          Search
        </button>
      </form>

      {applications.length === 0 ? (
        <EmptyState />
      ) : filtered.length === 0 ? (
        <p className="py-12 text-center text-sm text-zinc-500">No applications match your filters.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900">
              <tr>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Position</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Location</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">Applied</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filtered.map((a) => (
                <tr key={a.id} className="group relative hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-white">
                    <Link href={`/applications/${a.id}`} className="after:absolute after:inset-0">
                      {a.companyName}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">{a.position}</td>
                  <td className="hidden px-4 py-3 text-zinc-500 md:table-cell">{a.location ?? "—"}</td>
                  <td className="hidden px-4 py-3 text-zinc-500 sm:table-cell">{formatDate(a.appliedAt)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={a.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, href, active }: { label: string; value: number; href: string; active: boolean }) {
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

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-white py-16 text-center dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">No applications yet</h2>
      <p className="mt-1 text-sm text-zinc-500">Add your first application to start tracking your pipeline.</p>
      <Link
        href="/applications/new"
        className="mt-6 inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Add application
      </Link>
    </div>
  );
}
