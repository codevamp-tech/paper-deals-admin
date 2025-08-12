"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Menu, X, Star } from "lucide-react"

export default function CreateDealPage() {
  const [formData, setFormData] = useState({
    enquiryId: "",
    buyer: "",
    seller: "",
    buyerContactPerson: "",
    sellerContactPerson: "",
    brightness: "",
    buyerMobile: "",
    sellerMobile: "",
    productDescription: "",
    buyerEmail: "",
    sellerEmail: "",
    technicalDataSheet: null as File | null,
    remarks: "",
    price: "",
    quantity: "",
    totalAmount: ""
  })

  const [fileName, setFileName] = useState("No file chosen")

  // Auto-calculate total amount
  useEffect(() => {
    const price = parseFloat(formData.price) || 0
    const quantity = parseFloat(formData.quantity) || 0
    const total = price * quantity
    setFormData(prev => ({
      ...prev,
      totalAmount: total.toFixed(2)
    }))
  }, [formData.price, formData.quantity])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null
    setFormData({ ...formData, technicalDataSheet: file })
    setFileName(file ? file.name : "No file chosen")
  }

  const handleSubmit = () => {
    console.log("Form Submitted:", formData)
  }

  const getCurrentDate = () => {
    return new Date().toISOString().split("T")[0]
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button className="p-2">
                <Menu className="w-6 h-6" />
              </button>
              <span className="ml-4 text-gray-700 font-medium">Home</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-500">
                <X className="w-6 h-6" />
              </button>
              <button className="p-2 text-red-500">
                <Star className="w-6 h-6 fill-current" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Create Deal</h1>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Blue Header */}
          <div className="bg-blue-500 text-white px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center">
              <span className="font-medium">Enquiry Id :</span>
              <Input
                name="enquiryId"
                value={formData.enquiryId}
                onChange={handleChange}
                className="ml-2 px-3 py-1 border-0 text-gray-900 focus:ring-2 focus:ring-blue-300 w-auto"
              />
            </div>
            <div>
              <span className="font-medium">Creation Date : {getCurrentDate()}</span>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Buyer */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Buyer</Label>
                <Input
                  name="buyer"
                  value={formData.buyer}
                  onChange={handleChange}
                  placeholder="Buyer"
                />
              </div>

              {/* Seller */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Seller</Label>
                <select
                  name="seller"
                  value={formData.seller}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">--Select Seller--</option>
                  <option value="seller1">Seller 1</option>
                  <option value="seller2">Seller 2</option>
                  <option value="seller3">Seller 3</option>
                </select>
              </div>

              {/* Buyer Contact Person */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Buyer Contact Person</Label>
                <Input
                  name="buyerContactPerson"
                  value={formData.buyerContactPerson}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Seller Contact Person */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Seller Contact Person</Label>
                <Input
                  name="sellerContactPerson"
                  value={formData.sellerContactPerson}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>

              {/* Brightness */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Brightness</Label>
                <Input
                  name="brightness"
                  value={formData.brightness}
                  onChange={handleChange}
                  placeholder="Brightness"
                />
              </div>

              {/* Buyer Mobile Number */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Buyer Mobile Number:</Label>
                <Input
                  type="tel"
                  name="buyerMobile"
                  value={formData.buyerMobile}
                  onChange={handleChange}
                  placeholder="Buyer Mobile Number"
                />
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Seller Mobile Number */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Seller Mobile Number</Label>
                <Input
                  type="tel"
                  name="sellerMobile"
                  value={formData.sellerMobile}
                  onChange={handleChange}
                  placeholder="Seller Mobile Number"
                />
              </div>

              {/* Product */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Product</Label>
                <Textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  placeholder="Product Description"
                  rows={3}
                  className="resize-none"
                />
              </div>

              {/* Buyer Email */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Buyer Email</Label>
                <Input
                  type="email"
                  name="buyerEmail"
                  value={formData.buyerEmail}
                  onChange={handleChange}
                  placeholder="Buyer Email"
                />
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Seller Email */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Seller Email</Label>
                <Input
                  type="email"
                  name="sellerEmail"
                  value={formData.sellerEmail}
                  onChange={handleChange}
                  placeholder="Seller Email"
                />
              </div>

              {/* Technical Data Sheet */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Technical Data Sheet</Label>
                <div className="flex items-center">
                  <input
                    type="file"
                    id="technical-data"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="technical-data"
                    className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-l-md cursor-pointer hover:bg-gray-300 transition-colors"
                  >
                    Choose File
                  </label>
                  <span className="px-3 py-2 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md text-gray-500 flex-1 text-sm">
                    {fileName}
                  </span>
                </div>
              </div>

              {/* Remarks */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Remarks</Label>
                <Textarea
                  name="remarks"
                  value={formData.remarks}
                  onChange={handleChange}
                  placeholder="Enter Remarks"
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Price */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Price ( in Kg )</Label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price ( in Kg )"
                  step="0.01"
                />
              </div>

              {/* Quantity */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Quantity ( in Kg )</Label>
                <Input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Quantity ( in Kg )"
                  step="0.01"
                />
              </div>

              {/* Total Amount */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">Total Amount</Label>
                <Input
                  type="number"
                  name="totalAmount"
                  value={formData.totalAmount}
                  placeholder="Deal Amount"
                  className="bg-gray-100"
                  readOnly
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-start">
              <Button
                onClick={handleSubmit}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}