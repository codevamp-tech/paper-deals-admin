import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Inquiry from "@/lib/models/Inquiry"
import { getAuthUser } from "@/lib/auth"
import { uploadToCloudinary } from "@/lib/cloudinary" // Declare the uploadToCloudinary variable

export async function GET() {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      inquiries,
    })
  } catch (error) {
    console.error("Error fetching inquiries:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch inquiries" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()

    const formData = await request.formData()
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const company = formData.get("company") as string
    const category = formData.get("category") as string
    const message = formData.get("message") as string
    const file = formData.get("file") as File

    let fileUrl = ""
    if (file && file.size > 0) {
      const uploadResult = (await uploadToCloudinary(file, "inquiries")) as any
      fileUrl = uploadResult.secure_url
    }

    const inquiryData = {
      name,
      email,
      phone,
      company,
      category,
      message,
      fileUrl,
    }

    const inquiry = new Inquiry(inquiryData)
    await inquiry.save()

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
      inquiry,
    })
  } catch (error) {
    console.error("Error creating inquiry:", error)
    return NextResponse.json({ success: false, message: "Failed to submit inquiry" }, { status: 500 })
  }
}
