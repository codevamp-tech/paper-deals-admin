import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["wood", "electronics", "textiles"],
    },
    price: {
      min: Number,
      max: Number,
    },
    moq: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    specifications: [String],
    city: {
      type: String,
      required: true,
      enum: ["Bareilly", "Noida", "Delhi"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Product || mongoose.model("Product", ProductSchema)
