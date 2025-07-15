import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/unauthorized",
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public pages without auth
  if (isPublicRoute(req)) return;

  //  Check auth
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    // ✅ Redirect to Clerk sign-in if unauthenticated
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  const role = sessionClaims?.role;
  console.log("User role:", role);

  // if (req.nextUrl.pathname.startsWith("/dashboard")) {
  //   if (role !== "admin") {
  //     return NextResponse.redirect(new URL("/unauthorized", req.url));
  //   }
  // }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|favicon.ico).*)",
    "/(api|trpc)(.*)",
  ],
};
