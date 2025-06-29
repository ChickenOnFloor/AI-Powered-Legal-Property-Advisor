// app/auth/login/page.jsx
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"
import LoginPage from "./LoginPage"

export default async function LoginRoute() {
  const cookieStore = await cookies() // ✅ No need to await in Server Components (Next.js 14+)
  const token = cookieStore.get("token")?.value

  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET)

      if (user?.userType === "admin") {
        throw redirect("/admin/dashboard")
      }
      if (user?.userType === "lawyer") {
        throw redirect("/lawyer/dashboard")
      }

      throw redirect("/client/dashboard")
    } catch (err) {
      // ✅ Catch redirect to avoid swallowing
      if (!err.digest?.startsWith("NEXT_REDIRECT")) {
        console.error("JWT Error:", err)
      }
    }
  }

  return <LoginPage />
}
