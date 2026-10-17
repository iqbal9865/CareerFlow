import "server-only";
import { cache } from "react";
import { notFound } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import type { Application, Profile, Task, TaskStats } from "@/lib/definitions";

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

export const getTasks = cache(async () => {
  const { data } = await apiFetch<{ data: Task[] }>("/tasks");
  return data;
});

export const getTaskStats = cache(async () => {
  const { data } = await apiFetch<{ data: TaskStats }>("/tasks/stats");
  return data;
});
