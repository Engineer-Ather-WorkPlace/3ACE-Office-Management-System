'use client'
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // List of protected routes
  const protectedRoutes = [
    "/",
    "/AdminDashboard",
    "/EmployeeDashboard",
    "/SalesPersonDashboard",
    "/DeveloperDashBoard",
    "/GraphicsDesignerDashBoard",
  ];

  // Check if the current route is protected
  if (protectedRoutes.includes(pathname)) {
    // Get token from cookies (server-side)
    const token = request.cookies.get("token")?.value;

    // If no token, redirect to login
    if (!token) {
      console.log("No token found, redirecting to /login");
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Allow the request to continue
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    "/",
    "/AdminDashboard",
    "/EmployeeDashboard",
    "/SalesPersonDashboard",
    "/DeveloperDashBoard",
    "/GraphicsDesignerDashBoard",
  ],
};
