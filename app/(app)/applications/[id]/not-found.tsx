import Link from "next/link";

export default function ApplicationNotFound() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">Application not found</h1>
      <p className="mt-2 text-sm text-zinc-500">It may have been deleted, or the link is incorrect.</p>
      <Link href="/dashboard" className="mt-6 inline-block text-sm font-medium text-indigo-600 hover:underline">
        Back to applications
      </Link>
    </div>
  );
}
