import mongoose from "mongoose"

const CertificateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["ISO", "MSME", "Export", "Quality", "Other"],
    },
    description: {
      type: String,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    issuer: {
      type: String,
      required: true,
    },
    validUntil: {
      type: Date,
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

export default mongoose.models.Certificate || mongoose.model("Certificate", CertificateSchema)
