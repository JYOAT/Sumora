// import { clerkMiddleware } from "@clerk/nextjs/server";

// // export default clerkMiddleware();

// export default clerkMiddleware((auth, req) => {
//   console.log("✅ Clerk middleware running for:", req.nextUrl.pathname);
// });

// // export const config = {
// //   matcher: [
// //     // Skip Next.js internals and all static files, unless found in search params
// //     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
// //     // Always run for API routes
// //     "/(api|trpc)(.*)",
// //   ],
// // };

// export const config = {
//   matcher: ["/((?!.*\\..*).*)"],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/summaries(.*)",
  "/upload(.*)",
  "/settings(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Protect all routes except static files, Next internals, and webhooks
    "/((?!.+\\.[\\w]+$|_next|api/webhooks).*)",
  ],
};
