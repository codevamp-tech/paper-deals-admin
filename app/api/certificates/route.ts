import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Certificate from "@/lib/models/Certificate"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { getAuthUser } from "@/lib/auth"

export async function GET() {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const certificates = await Certificate.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      certificates,
    })
  } catch (error) {
    console.error("Error fetching certificates:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch certificates" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const formData = await request.formData()
    const title = formData.get("title") as string
    const type = formData.get("type") as string
    const description = formData.get("description") as string
    const issuer = formData.get("issuer") as string
    const validUntil = formData.get("validUntil") as string
    const file = formData.get("file") as File

    if (!file || file.size === 0) {
      return NextResponse.json({ success: false, message: "File is required" }, { status: 400 })
    }

    const uploadResult = (await uploadToCloudinary(file, "certificates")) as any
    const fileUrl = uploadResult.secure_url

    const certificateData = {
      title,
      type,
      description,
      issuer,
      validUntil: validUntil ? new Date(validUntil) : undefined,
      fileUrl,
    }

    const certificate = new Certificate(certificateData)
    await certificate.save()

    return NextResponse.json({
      success: true,
      message: "Certificate uploaded successfully",
      certificate,
    })
  } catch (error) {
    console.error("Error creating certificate:", error)
    return NextResponse.json({ success: false, message: "Failed to upload certificate" }, { status: 500 })
  }
}
