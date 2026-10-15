"use server";

import { redirect } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { readOptionalFields, readString, toIsoDate } from "@/lib/form";
import type { Application, FormState } from "@/lib/definitions";

const OPTIONAL_FIELDS = ["location", "salaryRange", "jobUrl", "source", "notes", "followUpAt"] as const;

function buildPayload(formData: FormData, isCreate: boolean) {
  const payload: Record<string, unknown> = {
    companyName: readString(formData, "companyName") ?? "",
    position: readString(formData, "position") ?? "",
    status: readString(formData, "status") ?? "PENDING",
    ...readOptionalFields(formData, OPTIONAL_FIELDS, isCreate),
  };
  if ("followUpAt" in payload) payload.followUpAt = toIsoDate(payload.followUpAt as string | null);
  // appliedAt is non-nullable on the backend; omit it to keep the default / existing value
  const appliedAt = readString(formData, "appliedAt");
  if (appliedAt) payload.appliedAt = toIsoDate(appliedAt);
  return payload;
}

export async function createApplication(_state: FormState, formData: FormData): Promise<FormState> {
  let created: Application;
  try {
    const { data } = await apiFetch<{ data: Application }>("/applications", {
      method: "POST",
      body: buildPayload(formData, true),
    });
    created = data;
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    throw error;
  }
  redirect(`/applications/${created.id}`);
}

export async function updateApplication(id: string, _state: FormState, formData: FormData): Promise<FormState> {
  try {
    await apiFetch(`/applications/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: buildPayload(formData, false),
    });
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    throw error;
  }
  redirect(`/applications/${id}`);
}

export async function deleteApplication(id: string) {
  await apiFetch(`/applications/${encodeURIComponent(id)}`, { method: "DELETE" });
  redirect("/dashboard");
}
