import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { getAuthUser } from "@/lib/auth"

// Simple media model (you can create a proper Mongoose model if needed)
const MediaFile = {
  async create(data: any) {
    const client = await connectToDatabase()
    const db = client.connection.db
    const result = await db.collection("mediafiles").insertOne({
      ...data,
      createdAt: new Date(),
    })
    return { _id: result.insertedId, ...data }
  },

  async findAll() {
    const client = await connectToDatabase()
    const db = client.connection.db
    return await db.collection("mediafiles").find({}).sort({ createdAt: -1 }).toArray()
  },

  async deleteById(id: string) {
    const client = await connectToDatabase()
    const db = client.connection.db
    const { ObjectId } = require("mongodb")
    return await db.collection("mediafiles").deleteOne({ _id: new ObjectId(id) })
  },
}

export async function GET() {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const files = await MediaFile.findAll()

    return NextResponse.json({
      success: true,
      files,
    })
  } catch (error) {
    console.error("Error fetching media files:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch media files" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file || file.size === 0) {
      return NextResponse.json({ success: false, message: "File is required" }, { status: 400 })
    }

    const uploadResult = (await uploadToCloudinary(file, "media")) as any

    const mediaData = {
      filename: file.name,
      url: uploadResult.secure_url,
      type: file.type,
      size: file.size,
    }

    const mediaFile = await MediaFile.create(mediaData)

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      file: mediaFile,
    })
  } catch (error) {
    console.error("Error uploading file:", error)
    return NextResponse.json({ success: false, message: "Failed to upload file" }, { status: 500 })
  }
}
