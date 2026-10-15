import type { Metadata } from "next";
import { updateApplication } from "@/app/actions/applications";
import { ApplicationForm } from "@/components/application-form";
import { getApplication } from "@/lib/dal";

export const metadata: Metadata = { title: "Edit application" };

export default async function EditApplicationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const application = await getApplication(id);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">Edit application</h1>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <ApplicationForm
          action={updateApplication.bind(null, id)}
          application={application}
          cancelHref={`/applications/${id}`}
        />
      </div>
    </div>
  );
}
