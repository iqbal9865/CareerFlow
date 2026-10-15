"use client";

import { login, register } from "@/app/actions/auth";
import { Field, FormMessage, SubmitButton, useFormAction } from "@/components/ui";

export function LoginForm({ next }: { next?: string }) {
  const { state, pending, onSubmit } = useFormAction(login);
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormMessage state={state} />
      {next && <input type="hidden" name="next" value={next} />}
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <Field label="Password" name="password" type="password" autoComplete="current-password" required />
      <div className="pt-2 [&>button]:w-full">
        <SubmitButton pending={pending} pendingText="Signing in…">Sign in</SubmitButton>
      </div>
    </form>
  );
}

export function RegisterForm() {
  const { state, pending, onSubmit } = useFormAction(register);
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormMessage state={state} />
      <Field label="Full name" name="fullName" autoComplete="name" required minLength={2} />
      <Field label="Email" name="email" type="email" autoComplete="email" required />
      <Field
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        minLength={8}
        hint="At least 8 characters with uppercase, lowercase, a number and one of @$!%*?&"
      />
      <Field label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" required />
      <div className="pt-2 [&>button]:w-full">
        <SubmitButton pending={pending} pendingText="Creating account…">Create account</SubmitButton>
      </div>
    </form>
  );
}
