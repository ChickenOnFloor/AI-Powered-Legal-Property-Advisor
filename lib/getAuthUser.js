// lib/getAuthUser.js
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

// Note: Next.js expands `$VAR` inside .env values, so a secret containing `$` gets truncated
if ((process.env.JWT_SECRET || "").length < 32) {
  console.warn("⚠️  JWT_SECRET is missing or shorter than 32 characters; tokens can be forged. Use a long random hex string.")
}

export async function getAuthUser() {
  // Keep cookies() outside the try: Next.js signals dynamic rendering by throwing here
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) return null

  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch {
    // Expired or tampered token: treat as logged out
    return null
  }
}
