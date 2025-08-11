import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Certificate from "@/lib/models/Certificate"
import { getAuthUser } from "@/lib/auth"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const certificate = await Certificate.findByIdAndDelete(params.id)

    if (!certificate) {
      return NextResponse.json({ success: false, message: "Certificate not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Certificate deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting certificate:", error)
    return NextResponse.json({ success: false, message: "Failed to delete certificate" }, { status: 500 })
  }
}
