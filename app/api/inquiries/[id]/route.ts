import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import { getAuthUser } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const { status, isRead } = await request.json()

    const inquiry = await Inquiry.findByIdAndUpdate(params.id, { status, isRead }, { new: true })

    if (!inquiry) {
      return NextResponse.json({ success: false, message: "Inquiry not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry updated successfully",
      inquiry,
    })
  } catch (error) {
    console.error("Error updating inquiry:", error)
    return NextResponse.json({ success: false, message: "Failed to update inquiry" }, { status: 500 })
  }
}
