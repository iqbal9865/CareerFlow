import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  accessCookieMaxAge,
  cookieOptions,
  isTokenFresh,
  requestNewAccessToken,
} from "@/lib/tokens";

const protectedPrefixes = ["/dashboard", "/applications", "/tasks", "/profile", "/settings"];
const authRoutes = ["/login", "/register"];

// Optimistic auth: decides redirects from cookies alone and silently renews an expired
// access token using the refresh token. The backend remains the real authority.
export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const isProtected = protectedPrefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const isAuthRoute = authRoutes.includes(pathname);

  const accessToken = request.cookies.get(ACCESS_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_COOKIE)?.value;

  let renewedToken: string | null = null;
  let refreshFailed = false;
  if (!isTokenFresh(accessToken) && refreshToken) {
    renewedToken = await requestNewAccessToken(refreshToken);
    refreshFailed = !renewedToken;
  }

  const isAuthenticated = isTokenFresh(accessToken) || !!renewedToken;

  let response: NextResponse;
  if (isProtected && !isAuthenticated) {
    const loginUrl = new URL("/login", request.nextUrl);
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    response = NextResponse.redirect(loginUrl);
  } else if (isAuthRoute && isAuthenticated) {
    response = NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  } else if (renewedToken) {
    // Forward the new token to this request's Server Components / Actions as well
    request.cookies.set(ACCESS_COOKIE, renewedToken);
    response = NextResponse.next({ request: { headers: request.headers } });
  } else {
    response = NextResponse.next();
  }

  if (renewedToken) {
    response.cookies.set(ACCESS_COOKIE, renewedToken, { ...cookieOptions, maxAge: accessCookieMaxAge(renewedToken) });
  } else if (refreshFailed) {
    response.cookies.delete(ACCESS_COOKIE);
    response.cookies.delete(REFRESH_COOKIE);
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
