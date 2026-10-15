import "server-only";
import { redirect } from "next/navigation";
import { BACKEND_API_URL } from "@/lib/tokens";
import { getAccessToken } from "@/lib/session";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  auth?: boolean;
};

// Single entry point for talking to the backend. Proxy keeps the access token fresh,
// so a 401 here means the session is truly gone and the user must log in again.
export async function apiFetch<T>(path: string, { method = "GET", body, auth = true }: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";

  if (auth) {
    const token = await getAccessToken();
    if (!token) redirect("/login");
    headers.Authorization = `Bearer ${token}`;
  }

  let res: Response;
  try {
    res = await fetch(`${BACKEND_API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: "no-store",
    });
  } catch {
    throw new ApiError(503, "Cannot reach the CareerFlow server. Please try again shortly.");
  }

  const data = await res.json().catch(() => ({}));

  if (res.status === 401 && auth) redirect("/login");
  if (!res.ok) throw new ApiError(res.status, data?.message ?? "Something went wrong");

  return data as T;
}
