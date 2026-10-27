import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationBoard } from "@/components/application-board";
import { StatCard } from "@/components/stat-card";
import { STATUS_LABELS } from "@/components/status-badge";
import { getApplications } from "@/lib/dal";
import { APPLICATION_STATUSES, type ApplicationStatus } from "@/lib/definitions";

export const metadata: Metadata = { title: "Applications" };

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const applications = await getApplications();

  const counts = Object.fromEntries(
    APPLICATION_STATUSES.map((s) => [s, applications.filter((a) => a.status === s).length])
  ) as Record<ApplicationStatus, number>;

  const query = q?.trim().toLowerCase() ?? "";
  const filtered = applications.filter(
    (a) => !query || a.companyName.toLowerCase().includes(query) || a.position.toLowerCase().includes(query)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">Applications</h1>
          <p className="text-sm text-zinc-500">Drag a card to another column to change its status.</p>
        </div>
        <Link
          href="/applications/new"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          + New application
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <StatCard label="Total" value={applications.length} />
        {APPLICATION_STATUSES.map((s) => (
          <StatCard key={s} label={STATUS_LABELS[s]} value={counts[s]} />
        ))}
      </div>

      <form className="flex gap-2" action="/dashboard">
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
        <p className="py-12 text-center text-sm text-zinc-500">No applications match your search.</p>
      ) : (
        <ApplicationBoard applications={filtered} />
      )}
    </div>
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
