import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export function generateToken(payload: any) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET)
  } catch (error) {
    return null
  }
}

export async function getAuthUser() {
  try {
    const cookieStore = cookies()
    const token = (await cookieStore).get("admin-token")?.value

    if (!token) return null

    const decoded = verifyToken(token)
    return decoded
  } catch (error) {
    return null
  }
}
