import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { verifyToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  return NextResponse.next(); // Just allow everything
}

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const isLoginPage = pathname === "/admin/login";
//   const isSignupPage = pathname === "/admin/signup"; // optional: if you have signup page
//   const isDashboardRoute = pathname.startsWith("/admin");

//   const token = request.cookies.get("admin-token")?.value;
//   const isAuthenticated = token && verifyToken(token);

//   // ✅ Redirect unauthenticated users trying to access protected admin routes
//   if (isDashboardRoute && !isLoginPage && !isSignupPage && !isAuthenticated) {
//     return NextResponse.redirect(new URL("/admin/login", request.url));
//   }

//   // ✅ Redirect authenticated users trying to access login or signup
//   if ((isLoginPage || isSignupPage) && isAuthenticated) {
//     return NextResponse.redirect(new URL("/admin/dashboard", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };
export const config = {
  matcher: [],
};
