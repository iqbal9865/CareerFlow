import type { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "@/components/auth-forms";

export const metadata: Metadata = { title: "Create account" };

export default function RegisterPage() {
  return (
    <>
      <h1 className="mb-1 text-2xl font-semibold text-zinc-900 dark:text-white">Create your account</h1>
      <p className="mb-6 text-sm text-zinc-500">Start organizing your job search in minutes.</p>
      <RegisterForm />
      <p className="mt-6 text-center text-sm text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-indigo-600 hover:underline">
          Sign in
        </Link>
      </p>
    </>
  );
}
