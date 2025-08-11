import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Product from "@/lib/models/Product"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { getAuthUser } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const formData = await request.formData()
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const category = formData.get("category") as string
    const city = formData.get("city") as string
    const priceMin = formData.get("priceMin") as string
    const priceMax = formData.get("priceMax") as string
    const moq = formData.get("moq") as string
    const specifications = formData.get("specifications") as string
    const isActive = formData.get("isActive") === "true"
    const image = formData.get("image") as File

    const updateData: any = {
      name,
      description,
      category,
      city,
      price: {
        min: priceMin ? Number.parseInt(priceMin) : undefined,
        max: priceMax ? Number.parseInt(priceMax) : undefined,
      },
      moq,
      specifications: specifications ? specifications.split(",").map((s) => s.trim()) : [],
      isActive,
    }

    if (image && image.size > 0) {
      const uploadResult = (await uploadToCloudinary(image, "products")) as any
      updateData.image = uploadResult.secure_url
    }

    const product = await Product.findByIdAndUpdate(params.id, updateData, { new: true })

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      product,
    })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ success: false, message: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authUser = await getAuthUser()
    if (!authUser) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    const product = await Product.findByIdAndDelete(params.id)

    if (!product) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ success: false, message: "Failed to delete product" }, { status: 500 })
  }
}
