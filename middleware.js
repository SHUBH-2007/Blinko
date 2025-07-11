import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/** Define routes that don't need auth */
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect(); // ✅ No parentheses here
  }
});

/** Don't run on _next/static files */
export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)', // skip static assets
    '/(api|trpc)(.*)',        // always run on APIs
  ],
};
