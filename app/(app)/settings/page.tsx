import type { Metadata } from "next";
import { EmailForm, NameForm } from "@/components/profile-forms";
import { getProfile } from "@/lib/dal";

export const metadata: Metadata = { title: "Settings" };

export default async function SettingsPage() {
  const { user } = await getProfile();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">Account settings</h1>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">Name</h2>
        <NameForm fullName={user.fullName} />
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">Email address</h2>
        <EmailForm email={user.email} />
      </section>
    </div>
  );
}
