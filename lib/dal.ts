import "server-only";
import { cache } from "react";
import { notFound } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { TASK_STATUSES, type Application, type Profile, type Task, type TaskStats, type TaskStatus } from "@/lib/definitions";

// Data Access Layer: all reads from the backend go through here.
// cache() dedupes calls within a single render pass (e.g. layout + page both need the profile).

export const getProfile = cache(async () => {
  const { profile } = await apiFetch<{ profile: Profile }>("/profile");
  return profile;
});

export const getApplications = cache(async () => {
  const { data } = await apiFetch<{ data: Application[] }>("/applications");
  return data;
});

export const getApplication = cache(async (id: string) => {
  try {
    const { data } = await apiFetch<{ data: Application }>(`/applications/${encodeURIComponent(id)}`);
    return data;
  } catch (error) {
    // The backend answers 403 for other users' applications; don't reveal they exist
    if (error instanceof ApiError && (error.status === 404 || error.status === 403)) notFound();
    throw error;
  }
});

// Accept the status in any case so labels and grouping never silently miss
const toTaskStatus = (value: string) => value.toUpperCase() as TaskStatus;

export const getTasks = cache(async () => {
  const { data } = await apiFetch<{ data: Task[] }>("/tasks");
  return data.map((t) => ({ ...t, status: toTaskStatus(t.status) }));
});

export const getTaskStats = cache(async () => {
  const { data } = await apiFetch<{ data: TaskStats }>("/tasks/stats");
  const byStatus = Object.fromEntries(TASK_STATUSES.map((s) => [s, 0])) as Record<TaskStatus, number>;
  for (const [s, n] of Object.entries(data.byStatus ?? {})) byStatus[toTaskStatus(s)] = n;
  return { ...data, byStatus };
});
