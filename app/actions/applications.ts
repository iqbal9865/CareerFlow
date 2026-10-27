"use server";

import { refresh } from "next/cache";
import { redirect } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { readOptionalFields, readString, toIsoDate } from "@/lib/form";
import type { Application, ApplicationStatus, FormState } from "@/lib/definitions";

const OPTIONAL_FIELDS = ["location", "salaryRange", "jobUrl", "source", "notes", "followUpAt"] as const;

function buildPayload(formData: FormData, isCreate: boolean) {
  const payload: Record<string, unknown> = {
    companyName: readString(formData, "companyName") ?? "",
    position: readString(formData, "position") ?? "",
    status: readString(formData, "status") ?? "PENDING",
    ...readOptionalFields(formData, OPTIONAL_FIELDS, isCreate),
  };
  if ("followUpAt" in payload) payload.followUpAt = toIsoDate(payload.followUpAt as string | null);
  // The backend rejects a reason on any other status and clears it itself when leaving REJECTED
  if (payload.status === "REJECTED") {
    Object.assign(payload, readOptionalFields(formData, ["rejectionReason"], isCreate));
  }
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

// Used by the dashboard board: moves a card between columns and re-renders in place.
// Name and position go along because the update schema requires them; everything else is kept.
export async function updateApplicationStatus(
  application: Pick<Application, "id" | "companyName" | "position">,
  status: ApplicationStatus,
  rejectionReason?: string
): Promise<FormState> {
  const body: Record<string, unknown> = { companyName: application.companyName, position: application.position, status };
  if (status === "REJECTED") body.rejectionReason = rejectionReason?.trim() || null;
  try {
    await apiFetch(`/applications/${encodeURIComponent(application.id)}`, { method: "PUT", body });
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    throw error;
  }
  refresh();
  return {};
}

export async function deleteApplication(id: string) {
  await apiFetch(`/applications/${encodeURIComponent(id)}`, { method: "DELETE" });
  redirect("/dashboard");
}
