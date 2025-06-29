// app/client/dashboard/page.jsx
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { redirect } from "next/navigation"
import ClientDashboardUI from "./ClientDashboardUI"

export default async function ClientDashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value
  if (!token) redirect("/auth/login")

  let user = null
  try {
    user = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    console.error("Invalid token", err)
    redirect("/auth/login")
  }

  return <ClientDashboardUI user={user} />
}
