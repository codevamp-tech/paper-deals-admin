import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Product from "@/lib/models/Product"
import { uploadToCloudinary } from "@/lib/cloudinary"
import { getAuthUser } from "@/lib/auth"

export async function GET() {
  try {
    await connectToDatabase()

    const products = await Product.find({}).sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      products,
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch products" }, { status: 500 })
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

    let imageUrl = ""
    if (image && image.size > 0) {
      const uploadResult = (await uploadToCloudinary(image, "products")) as any
      imageUrl = uploadResult.secure_url
    }

    const productData = {
      name,
      description,
      category,
      city,
      price: {
        min: priceMin ? Number.parseInt(priceMin) : undefined,
        max: priceMax ? Number.parseInt(priceMax) : undefined,
      },
      moq,
      image: imageUrl,
      specifications: specifications ? specifications.split(",").map((s) => s.trim()) : [],
      isActive,
    }

    const product = new Product(productData)
    await product.save()

    return NextResponse.json({
      success: true,
      message: "Product created successfully",
      product,
    })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ success: false, message: "Failed to create product" }, { status: 500 })
  }
}
