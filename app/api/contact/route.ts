import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const inquiryData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      category: formData.get("category") as string,
      message: formData.get("message") as string,
      file: formData.get("file") as File | null,
      timestamp: new Date().toISOString(),
    }

    // Here you would typically:
    // 1. Save to MongoDB
    // 2. Send email notification
    // 3. Upload file to Cloudinary if present

    console.log("New inquiry received:", inquiryData)

    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
    })
  } catch (error) {
    console.error("Error processing inquiry:", error)
    return NextResponse.json({ success: false, message: "Failed to submit inquiry" }, { status: 500 })
  }
}
