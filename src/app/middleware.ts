import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";
// import { updateSession } from "./utils/supabase/middleware";

// Helper for CORS headers
const corsHeaders = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie, X-Requested-With",
  "Access-Control-Allow-Credentials": "true", // Important for auth cookies
});

export async function middleware(request: NextRequest) {
  // Handle preflight OPTIONS request immediately
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: corsHeaders(),
    });
  }

  // Don’t let updateSession redirect OPTIONS or unauthenticated API routes
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