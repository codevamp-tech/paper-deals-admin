import { type NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import { generateToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const { name, email, password } = await request.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    // Check if admin already exists
    const existing = await Admin.findOne({ email });
    if (existing) {
      return NextResponse.json({ success: false, message: "Admin already registered" }, { status: 409 });
    }

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password, // assumed to be hashed via Mongoose pre-save
      role: "admin",
      isActive: true,
      lastLogin: null,
    });

    await newAdmin.save();

    // Generate token
    const token = generateToken({
      id: newAdmin._id,
      email: newAdmin.email,
      role: newAdmin.role,
    });

    const response = NextResponse.json({
      success: true,
      message: "Admin registered successfully",
      user: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });

    // Set cookie
    response.cookies.set("admin-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Admin registration error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
