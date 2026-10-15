// Cookie names and JWT helpers shared by proxy.ts and server code (no server-only import so Proxy can use it)

export const ACCESS_COOKIE = "cf_access";
export const REFRESH_COOKIE = "cf_refresh";

// Matches the backend's 30d refresh token lifetime
export const REFRESH_MAX_AGE = 30 * 24 * 60 * 60;

export const BACKEND_API_URL = process.env.BACKEND_API_URL ?? "http://localhost:5000/api/v1";

// Reads the exp claim without verifying the signature; the backend still verifies every request
export function getTokenExpiry(token: string): number | null {
  try {
    const payload = token.split(".")[1];
    const json = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return typeof json.exp === "number" ? json.exp : null;
  } catch {
    return null;
  }
}

export function isTokenFresh(token: string | undefined, skewSeconds = 10): boolean {
  if (!token) return false;
  const exp = getTokenExpiry(token);
  return exp !== null && exp - skewSeconds > Date.now() / 1000;
}

export function accessCookieMaxAge(token: string): number {
  const exp = getTokenExpiry(token);
  return exp ? Math.max(0, Math.floor(exp - Date.now() / 1000)) : 15 * 60;
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function requestNewAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const res = await fetch(`${BACKEND_API_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const body = (await res.json()) as { accessToken?: string };
    return body.accessToken ?? null;
  } catch {
    return null;
  }
}
