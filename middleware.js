import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/** 🟢 Define public routes (no auth required) */
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

/** 🔐 Protect everything else */
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth().protect(); // will redirect to Clerk sign-in
  }
});

/** ⚙️ Match only these routes for middleware */
export const config = {
  matcher: [
    // Skip static assets & internals
    "/((?!_next|.*\\..*).*)",
    // Always apply to API routes
    "/(api|trpc)(.*)",
  ],
};
