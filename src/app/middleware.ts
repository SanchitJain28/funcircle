import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

// Helper for CORS headers
const corsHeaders = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie, X-Requested-With",
  "Access-Control-Allow-Credentials": "true", // Important for auth cookies
});

// Parameters to persist throughout the app
const persistentParams = ['utm_source', 'utm_medium', 'utm_campaign', 'ref', 'theme', 'app_version', 'source', 'headhide'];

function handleQueryParamPersistence(request: NextRequest): NextResponse | null {
  const url = request.nextUrl.clone();
  const currentParams = new URLSearchParams(url.search);
  
  // Get the referer to extract params from previous page
  const referer = request.headers.get('referer');
  
  // Skip param persistence for API routes
  if (url.pathname.startsWith('/api')) {
    return null;
  }
  
  // If this is navigation within the app and we have a referer
  if (referer && referer.includes(url.origin)) {
    try {
      const refererUrl = new URL(referer);
      const refererParams = new URLSearchParams(refererUrl.search);
      let hasUpdates = false;
      
      // Check each persistent parameter
      persistentParams.forEach(param => {
        const currentValue = currentParams.get(param);
        const refererValue = refererParams.get(param);
        
        // If current URL doesn't have the param but referer does, add it
        if (!currentValue && refererValue) {
          currentParams.set(param, refererValue);
          hasUpdates = true;
        }
      });
      
      // If we added parameters, redirect to include them
      if (hasUpdates) {
        url.search = currentParams.toString();
        const response = NextResponse.redirect(url);
        
        // Add CORS headers if needed
        if (url.pathname.startsWith("/api")) {
          const headers = corsHeaders();
          Object.entries(headers).forEach(([key, value]) => {
            response.headers.set(key, value);
          });
        }
        
        return response;
      }
    } catch (error) {
      // If referer URL parsing fails, continue normally
      console.log('Referer URL parsing failed:', error);
    }
  }
  
  return null;
}

export async function middleware(request: NextRequest) {
  // Handle preflight OPTIONS request immediately
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders(),
    });
  }

  // Handle query parameter persistence first
  const paramResponse = handleQueryParamPersistence(request);
  if (paramResponse) {
    return paramResponse;
  }

  // Don't let updateSession redirect OPTIONS or unauthenticated API routes
  let response: NextResponse;
  if (request.nextUrl.pathname.startsWith("/api")) {
    // Skip redirect for APIs
    response = NextResponse.next();
  } else {
    response = await updateSession(request);
  }

  // Always attach CORS for API routes
  if (request.nextUrl.pathname.startsWith("/api")) {
    const headers = corsHeaders();
    Object.entries(headers).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - image extensions
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};