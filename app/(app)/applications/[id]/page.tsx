import type { Metadata } from "next";
import Link from "next/link";
import { DeleteApplicationButton } from "@/components/delete-application-button";
import { StatusBadge } from "@/components/status-badge";
import { getApplication } from "@/lib/dal";
import { formatDate } from "@/lib/form";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const application = await getApplication(id);
  return { title: `${application.position} at ${application.companyName}` };
}

export default async function ApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const a = await getApplication(id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
        ← Back to applications
      </Link>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">{a.position}</h1>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">{a.companyName}</p>
          </div>
          <StatusBadge status={a.status} />
        </div>

        <dl className="mt-6 grid gap-x-6 gap-y-4 border-t border-zinc-100 pt-6 text-sm sm:grid-cols-2 dark:border-zinc-800">
          <Detail label="Location" value={a.location} />
          <Detail label="Salary range" value={a.salaryRange} />
          <Detail label="Source" value={a.source} />
          <Detail
            label="Job posting"
            value={
              // The backend doesn't validate URLs, so only link http(s) to rule out javascript: URLs
              a.jobUrl && (/^https?:\/\//i.test(a.jobUrl) ? (
                <a href={a.jobUrl} target="_blank" rel="noopener noreferrer" className="break-all text-indigo-600 hover:underline">
                  {a.jobUrl}
                </a>
              ) : (
                <span className="break-all">{a.jobUrl}</span>
              ))
            }
          />
          <Detail label="Applied on" value={formatDate(a.appliedAt)} />
          <Detail label="Follow up on" value={a.followUpAt && formatDate(a.followUpAt)} />
        </dl>

        {a.status === "REJECTED" && (
          <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <h2 className="text-sm font-medium text-zinc-500">Rejection reason</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200">{a.rejectionReason}</p>
          </div>
        )}

        {a.notes && (
          <div className="mt-6 border-t border-zinc-100 pt-6 dark:border-zinc-800">
            <h2 className="text-sm font-medium text-zinc-500">Notes</h2>
            <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-800 dark:text-zinc-200">{a.notes}</p>
          </div>
        )}

        <div className="mt-8 flex gap-3">
          <Link
            href={`/applications/${a.id}/edit`}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Edit
          </Link>
          <DeleteApplicationButton id={a.id} label={a.companyName} />
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-zinc-500">{label}</dt>
      <dd className="mt-0.5 text-zinc-900 dark:text-zinc-100">{value || "—"}</dd>
    </div>
  );
}
