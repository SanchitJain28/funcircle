import { adminAuth } from "./firebase-admin";
import { NextRequest } from "next/server";

export interface DecodedToken {
  uid: string;
  email?: string;
  phone_number?: string;
  [key: string]: unknown;
}

//TOKEN -> DECODED -> VERIFIED

export async function verifyIdToken(
  token: string
): Promise<DecodedToken | null> {
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}

//GET TOKEN FROM REQUEST (Header or Cookies)
export function getTokenFromRequest(request: NextRequest): string | null {
  // Try to get token from Authorization header
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }

  // Try to get token from cookie
  const tokenCookie = request.cookies.get("token");
  if (tokenCookie) {
    return tokenCookie.value;
  }

  return null;
}

//JUST GET USER FROM THE TOKEN FROM THE COOKIES
export async function getUserFromRequest(
  request: NextRequest
): Promise<DecodedToken | null> {
  const token = getTokenFromRequest(request);
  if (!token) return null;

  return await verifyIdToken(token);
}
