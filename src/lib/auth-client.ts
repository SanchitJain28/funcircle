import { auth } from "./firebase";
import { User } from "firebase/auth";

export async function setAuthToken(user: User | null) {
  if (user) {
    try {
      const token = await user.getIdToken();

      // Send token to server to set httpOnly cookie
      await fetch("/api/auth/set-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
    } catch (error) {
      console.error("Failed to set auth token:", error);
    }
  } else {
    // Clear token on logout
    await fetch("/api/auth/logout", {
      method: "POST",
    });
  }
}

export async function refreshAuthToken() {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken(true); // Force refresh

    await fetch("/api/auth/set-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  }
}
