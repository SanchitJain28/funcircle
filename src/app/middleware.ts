import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/supabase/middleware";

// Helper for CORS
const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
});

export async function middleware(request: NextRequest) {
  // Handle preflight OPTIONS request for CORS
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      headers: corsHeaders(
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://www.funcircleapp.com"
      ),
    });
  }

  // Update user's auth session (your existing Supabase logic)
  const response = await updateSession(request);

  // Add CORS headers to all API responses
  if (request.nextUrl.pathname.startsWith("/api")) {
    response.headers.set(
      "Access-Control-Allow-Origin",
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://www.funcircleapp.com"
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      "GET,POST,PUT,DELETE,OPTIONS"
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
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
