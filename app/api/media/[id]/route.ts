import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { getAuthUser } from "@/lib/auth"

const MediaFile = {
  async deleteById(id: string) {
    const client = await connectToDatabase()
    const db = client.connection.db
    const { ObjectId } = require("mongodb")
    return await db.collection("mediafiles").deleteOne({ _id: new ObjectId(id) })
  },
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const result = await MediaFile.deleteById(params.id)

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "File not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting file:", error)
    return NextResponse.json({ success: false, message: "Failed to delete file" }, { status: 500 })
  }
}
