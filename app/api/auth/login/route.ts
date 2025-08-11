  import { type NextRequest, NextResponse } from "next/server"
  import { connectToDatabase } from "@/lib/mongodb"
  import Admin from "@/lib/models/Admin"
  import { generateToken } from "@/lib/auth"

  export async function POST(request: NextRequest) {
    try {
      await connectToDatabase()

      const { email, password } = await request.json()

      // For demo purposes, allow hardcoded admin
      if (email === "admin@indiamanufacture.com" && password === "admin123") {
        const token = generateToken({ id: "demo", email, role: "admin" })

        console.log("token",token)
        const response = NextResponse.json({
          success: true,
          message: "Login successful",
          user: { email, role: "admin" },
        })

        response.cookies.set("admin-token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
          maxAge: 7 * 24 * 60 * 60, // 7 days
        })

        return response
      }

      // Check database for admin
      const admin = await Admin.findOne({ email, isActive: true })

      if (!admin || !(await admin.comparePassword(password))) {
        return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
      }

      // Update last login
      admin.lastLogin = new Date()
      await admin.save()

      const token = generateToken({
        id: admin._id,
        email: admin.email,
        role: admin.role,
      })

      const response = NextResponse.json({
        success: true,
        message: "Login successful",
        user: {
          id: admin._id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        },
      })

      response.cookies.set("admin-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      })

      return response
    } catch (error) {
      console.error("Login error:", error)
      return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
    }
  }
