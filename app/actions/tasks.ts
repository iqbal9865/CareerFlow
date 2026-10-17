"use server";

import { refresh } from "next/cache";
import { apiFetch, ApiError } from "@/lib/api";
import { readOptionalFields, readString, toEndOfDayIso } from "@/lib/form";
import type { FormState, TaskStatus } from "@/lib/definitions";

// Status is never part of this payload: the backend only changes it through PUT /tasks/:id/status
function buildPayload(formData: FormData, isCreate: boolean) {
  return {
    title: readString(formData, "title") ?? "",
    deadline: toEndOfDayIso(readString(formData, "deadline")) ?? "",
    ...readOptionalFields(formData, ["description"], isCreate),
  };
}

// Tasks live on the dashboard, so mutations re-render the current page instead of redirecting
async function mutate(run: () => Promise<unknown>, success?: string): Promise<FormState> {
  try {
    await run();
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    throw error;
  }
  refresh();
  return { success };
}

export async function createTask(_state: FormState, formData: FormData): Promise<FormState> {
  return mutate(() => apiFetch("/tasks", { method: "POST", body: buildPayload(formData, true) }), "Task added");
}

export async function updateTask(id: string, _state: FormState, formData: FormData): Promise<FormState> {
  return mutate(
    () => apiFetch(`/tasks/${encodeURIComponent(id)}`, { method: "PUT", body: buildPayload(formData, false) }),
    "Task updated"
  );
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<FormState> {
  return mutate(() => apiFetch(`/tasks/${encodeURIComponent(id)}/status`, { method: "PUT", body: { status } }));
}

export async function deleteTask(id: string): Promise<FormState> {
  return mutate(() => apiFetch(`/tasks/${encodeURIComponent(id)}`, { method: "DELETE" }));
}
