import "server-only";
import { cookies } from "next/headers";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  REFRESH_MAX_AGE,
  accessCookieMaxAge,
  cookieOptions,
} from "@/lib/tokens";
import type { AuthTokens } from "@/lib/definitions";

// Cookie writes are only allowed in Server Actions and Route Handlers

export async function setSession({ accessToken, refreshToken }: AuthTokens) {
  const store = await cookies();
  store.set(ACCESS_COOKIE, accessToken, { ...cookieOptions, maxAge: accessCookieMaxAge(accessToken) });
  store.set(REFRESH_COOKIE, refreshToken, { ...cookieOptions, maxAge: REFRESH_MAX_AGE });
}

export async function clearSession() {
  const store = await cookies();
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

export async function getAccessToken() {
  return (await cookies()).get(ACCESS_COOKIE)?.value;
}

export async function getRefreshToken() {
  return (await cookies()).get(REFRESH_COOKIE)?.value;
}
