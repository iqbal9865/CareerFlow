import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth-forms";

export const metadata: Metadata = { title: "Sign in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const { next } = await searchParams;
  return (
    <>
      <h1 className="mb-1 text-2xl font-semibold text-zinc-900 dark:text-white">Welcome back</h1>
      <p className="mb-6 text-sm text-zinc-500">Sign in to track your job applications.</p>
      <LoginForm next={next} />
      <p className="mt-6 text-center text-sm text-zinc-500">
        New to CareerFlow?{" "}
        <Link href="/register" className="font-medium text-indigo-600 hover:underline">
          Create an account
        </Link>
      </p>
    </>
  );
}
