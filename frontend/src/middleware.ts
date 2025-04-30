import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const pathname = req.nextUrl.pathname;

  // Allow access to public pages or if the user is authenticated
  if (pathname === '/login' || token) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users to the login page
  const loginUrl = new URL('/login', req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'] // Apply middleware to all pages except API routes and static files
};
