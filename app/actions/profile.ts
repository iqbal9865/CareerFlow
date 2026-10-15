"use server";

import { refresh } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";
import { readOptionalFields, readString, toIsoDate } from "@/lib/form";
import type { FormState } from "@/lib/definitions";

const PROFILE_FIELDS = [
  "bio",
  "avatarUrl",
  "phoneNumber",
  "dateOfBirth",
  "gender",
  "city",
  "country",
  "portfolioUrl",
  "linkedinUrl",
  "githubUrl",
] as const;

async function submit(path: string, method: "PUT", body: unknown, success: string): Promise<FormState> {
  try {
    await apiFetch(path, { method, body });
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    throw error;
  }
  // Re-render server components so the header and page show the new values
  refresh();
  return { success };
}

export async function updateProfile(_state: FormState, formData: FormData): Promise<FormState> {
  // Blank fields are sent as null so users can clear them
  const payload = readOptionalFields(formData, PROFILE_FIELDS);
  payload.dateOfBirth = toIsoDate(payload.dateOfBirth);
  return submit("/profile", "PUT", payload, "Profile updated");
}

export async function updateName(_state: FormState, formData: FormData): Promise<FormState> {
  const fullName = readString(formData, "fullName");
  if (!fullName) return { error: "Full name is required" };
  return submit("/auth/name", "PUT", { fullName }, "Name updated");
}

export async function updateEmail(_state: FormState, formData: FormData): Promise<FormState> {
  const newEmail = readString(formData, "newEmail");
  const currentPassword = readString(formData, "currentPassword");
  if (!newEmail || !currentPassword) return { error: "New email and current password are required" };
  return submit("/auth/email", "PUT", { newEmail, currentPassword }, "Email updated");
}
