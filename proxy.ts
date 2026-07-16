import { type NextRequest, NextResponse } from "next/server";
import { verifyJwt, getAuthFromCookies } from "@/services/auth";

const protectedRoutes = ["/admin"];
const authRoutes = ["/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if path needs auth protection
  const isProtected = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // If not a protected or auth route, continue
  if (!isProtected && !isAuthRoute) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = getAuthFromCookies(request.cookies);
  const user = token ? await verifyJwt(token) : null;

  // Protect admin routes — redirect to login if not authenticated
  if (isProtected && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated and trying to access login, redirect to admin
  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Static assets (images, fonts, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|json)$).*)",
  ],
};
