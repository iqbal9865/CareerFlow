import type { Metadata } from "next";
import { ProfileForm } from "@/components/profile-forms";
import { getProfile } from "@/lib/dal";

export const metadata: Metadata = { title: "Profile" };

export default async function ProfilePage() {
  const profile = await getProfile();
  const initials = profile.user.fullName
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center gap-4">
        {profile.avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- arbitrary user-hosted avatar URLs
          <img src={profile.avatarUrl} alt="" className="h-16 w-16 rounded-full object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-xl font-semibold text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
            {initials}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">{profile.user.fullName}</h1>
          <p className="text-sm text-zinc-500">{profile.user.email}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">About you</h2>
        <ProfileForm profile={profile} />
      </div>
    </div>
  );
}
