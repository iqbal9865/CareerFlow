import type { Metadata } from "next";
import { createApplication } from "@/app/actions/applications";
import { ApplicationForm } from "@/components/application-form";

export const metadata: Metadata = { title: "New application" };

export default function NewApplicationPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold text-zinc-900 dark:text-white">New application</h1>
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <ApplicationForm action={createApplication} cancelHref="/dashboard" />
      </div>
    </div>
  );
}
