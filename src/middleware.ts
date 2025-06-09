import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ACCESS_TOKEN } from '@/constants/tokens';
import { jwtDecode } from 'jwt-decode';

// Define public routes that don't require authentication
const publicRoutes = ['/auth/Login', '/auth/Signup', '/api/auth', '/Chat'];

// Function to check if a token is expired
function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the requested path is a public route
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    console.log('Public route', pathname);

    // Allow access to public routes
    return NextResponse.next();
  }

  // Static files and API routes (other than auth APIs) should be allowed
  if (pathname.includes('/_next') || pathname.includes('/public') || (pathname.startsWith('/api') && !pathname.startsWith('/api/auth'))) {
    return NextResponse.next();
  }

  // Get authentication tokens from cookies
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;
  
  // We don't use the refresh token in middleware,
  // but we'll keep it commented for future reference
  // const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value;

  // If no access token exists or it's expired, redirect to login
  if (!accessToken || isTokenExpired(accessToken)) {
    // We don't attempt to refresh here, we'll let the client handle refresh
    // when it makes API calls
    
    // Redirect to login page with original URL as callback
    const url = new URL('/auth/Login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(request.url));
    return NextResponse.redirect(url);
  }

  // If token exists and is valid, allow access to protected routes
  return NextResponse.next();
}

// Match all routes except public ones
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}; 