import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Dynamically import the page module to check for the `public` property
  const pathname = req.nextUrl.pathname;
  const isPublicPage = await isPagePublic(pathname);

  // If the page is public or the user is authenticated, allow access
  if (isPublicPage || token) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the login page
  const loginUrl = new URL("/login", req.url);
  return NextResponse.redirect(loginUrl);
}

async function isPagePublic(pathname: string): Promise<boolean> {
  if (pathname === "/login") {
    return true;
  }

  try {
    // Dynamically import the page module
    const pageModule = await import(`./pages${pathname}`);
    return pageModule.default?.public === true;
  } catch (error) {
    // If the page doesn't exist or doesn't have a `public` property, return false
    return false;
  }
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico).*)"], // Apply middleware to all pages except API routes and static files
};
