"use server";

import { redirect } from "next/navigation";
import { apiFetch, ApiError } from "@/lib/api";
import { clearSession, getRefreshToken, setSession } from "@/lib/session";
import type { AuthTokens, FormState } from "@/lib/definitions";
import { readString } from "@/lib/form";

// Only allow same-origin relative paths to avoid open redirects via ?next=
function safeNext(value: string | null) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";
}

export async function login(_state: FormState, formData: FormData): Promise<FormState> {
  const email = readString(formData, "email");
  const password = readString(formData, "password");
  if (!email || !password) return { error: "Email and password are required" };

  try {
    const { data } = await apiFetch<{ data: AuthTokens }>("/auth/login", {
      method: "POST",
      body: { email, password },
      auth: false,
    });
    await setSession(data);
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    throw error;
  }

  redirect(safeNext(readString(formData, "next")));
}

export async function register(_state: FormState, formData: FormData): Promise<FormState> {
  const fullName = readString(formData, "fullName");
  const email = readString(formData, "email");
  const password = readString(formData, "password");
  const confirmPassword = readString(formData, "confirmPassword");

  if (!fullName || !email || !password) return { error: "All fields are required" };
  if (password !== confirmPassword) return { error: "Passwords do not match" };

  try {
    const { data } = await apiFetch<{ data: AuthTokens }>("/auth/register", {
      method: "POST",
      body: { fullName, email, password },
      auth: false,
    });
    await setSession(data);
  } catch (error) {
    if (error instanceof ApiError) return { error: error.message };
    throw error;
  }

  redirect("/dashboard");
}

export async function logout() {
  const refreshToken = await getRefreshToken();
  if (refreshToken) {
    // Revoke server-side; local cookies are cleared regardless of the outcome
    await apiFetch("/auth/logout", { method: "POST", body: { refreshToken }, auth: false }).catch(() => {});
  }
  await clearSession();
  redirect("/login");
}
