import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jose from "jose";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
async function verifyToken(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload; // contains decoded JWT data
  } catch (e) {
    console.error("verify error:", e);
    return null;
  }
}
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/";
  const isDashboardRoute = pathname.startsWith("/admin");
  const token = request.cookies.get("token")?.value;
  const isAuthenticated = token && (await verifyToken(token));
  console.log("isauth", isAuthenticated);
  if (isDashboardRoute && !isLoginPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/admin/:path*"],
};