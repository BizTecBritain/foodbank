import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

import { siteConfig } from "./config/site";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    // Manage the route protection
    const isAuth = await getToken({ req });
    const isLoginPage = pathname.startsWith("/login");

    const isAccessingSensitiveRoutes = siteConfig.navItems.some(
      (route) =>
        pathname.startsWith(route.href) && route.requires.includes("login"),
    );

    const isAccessingAdminRoutes = siteConfig.navItems.some(
      (route) =>
        pathname.startsWith(route.href) && route.requires.includes("admin"),
    );

    if (isLoginPage && isAuth) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (!isAuth && isAccessingSensitiveRoutes) {
      return NextResponse.redirect(new URL("/404", req.url));
    }

    if (!isAuth?.admin && isAccessingAdminRoutes) {
      return NextResponse.redirect(new URL("/404", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  },
);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - 404 (404 page)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|404).*)",
  ],
};
