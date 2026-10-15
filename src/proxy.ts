import { getSessionCookie } from "better-auth/cookies";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/", "/library"];
const publicRoutes = ["/signin", "/signup"];

function matchesRoute(path: string, routes: string[]) {
  return routes.some((route) => path === route || (route !== "/" && path.startsWith(`${route}/`)));
}

export default function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = matchesRoute(path, protectedRoutes);
  const isPublicRoute = matchesRoute(path, publicRoutes);

  const sessionCookie = getSessionCookie(request);
  const isAuthenticated = Boolean(sessionCookie);

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg$).*)"],
};
