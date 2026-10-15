"use client";

import { updateEmail, updateName, updateProfile } from "@/app/actions/profile";
import { Field, FormMessage, Select, SubmitButton, TextArea, useFormAction } from "@/components/ui";
import { GENDERS, type Profile } from "@/lib/definitions";
import { toDateInputValue } from "@/lib/form";

const genderOptions = [
  { value: "", label: "Prefer not to say" },
  ...GENDERS.map((g) => ({ value: g, label: g.charAt(0) + g.slice(1).toLowerCase() })),
];

export function ProfileForm({ profile }: { profile: Profile }) {
  const { state, pending, onSubmit } = useFormAction(updateProfile);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <FormMessage state={state} />
      <TextArea label="Bio" name="bio" minLength={10} placeholder="A short summary about you (10+ characters)" defaultValue={profile.bio ?? ""} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Avatar URL" name="avatarUrl" type="url" placeholder="https://" defaultValue={profile.avatarUrl ?? ""} />
        <Field label="Phone number" name="phoneNumber" type="tel" defaultValue={profile.phoneNumber ?? ""} />
        <Field label="Date of birth" name="dateOfBirth" type="date" defaultValue={toDateInputValue(profile.dateOfBirth)} />
        <Select label="Gender" name="gender" options={genderOptions} defaultValue={profile.gender ?? ""} />
        <Field label="City" name="city" defaultValue={profile.city ?? ""} />
        <Field label="Country" name="country" defaultValue={profile.country ?? ""} />
        <Field label="Portfolio" name="portfolioUrl" type="url" placeholder="https://" defaultValue={profile.portfolioUrl ?? ""} />
        <Field label="LinkedIn" name="linkedinUrl" type="url" placeholder="https://linkedin.com/in/…" defaultValue={profile.linkedinUrl ?? ""} />
        <Field label="GitHub" name="githubUrl" type="url" placeholder="https://github.com/…" defaultValue={profile.githubUrl ?? ""} />
      </div>
      <SubmitButton pending={pending}>Save profile</SubmitButton>
    </form>
  );
}

export function NameForm({ fullName }: { fullName: string }) {
  const { state, pending, onSubmit } = useFormAction(updateName);
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormMessage state={state} />
      <Field label="Full name" name="fullName" required minLength={2} defaultValue={fullName} autoComplete="name" />
      <SubmitButton pending={pending}>Update name</SubmitButton>
    </form>
  );
}

export function EmailForm({ email }: { email: string }) {
  const { state, pending, onSubmit } = useFormAction(updateEmail);
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormMessage state={state} />
      <p className="text-sm text-zinc-500">
        Current email: <span className="font-medium text-zinc-800 dark:text-zinc-200">{email}</span>
      </p>
      <Field label="New email" name="newEmail" type="email" required autoComplete="email" />
      <Field label="Current password" name="currentPassword" type="password" required autoComplete="current-password" />
      <SubmitButton pending={pending}>Update email</SubmitButton>
    </form>
  );
}
