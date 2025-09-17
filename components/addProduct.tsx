"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Upload } from "lucide-react"
import { getUserFromToken } from "@/hooks/use-token"

interface Category {
  id: number | string
  name: string
}

interface StockFormData {
  category_id: string
  product_name: string
  sub_product: string
  gsm: string
  bf: string
  brightness: string
  shade: string
  grain: string
  sheet: string
  w_l: string
  no_of_bundle: string
  no_of_rim: string
  rim_weight: string
  size: string
  stock_in_kg: string
  quantity_in_kg: string
  price_per_kg: string
  weight: string
  hsn_no: string
  other: string
  image: File | null
  approved: string
  request: string
}

export default function StockManagementPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const user = getUserFromToken();
  const sellerId = user?.user_id
  const userRole = user?.user_role

  const [formData, setFormData] = useState<StockFormData>({
    category_id: "",
    product_name: "",
    sub_product: "",
    gsm: "",
    bf: "",
    brightness: "",
    shade: "",
    grain: "",
    sheet: "",
    w_l: "",
    no_of_bundle: "",
    no_of_rim: "",
    rim_weight: "",
    size: "",
    stock_in_kg: "",
    quantity_in_kg: "",
    price_per_kg: "",
    weight: "",
    hsn_no: "",
    other: "",
    image: null,
    approved: "0",
    request: "0",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof StockFormData, string>>>({})

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true)
      const response = await fetch("https://paper-deal-server.onrender.com/api/categiry")
      const data = await response.json()
      const formatted = (data.categories || [])
        .filter((c: any) => c.status === 1 && c.name?.trim())
        .map((c: any) => ({ id: String(c.id), name: c.name }))
      setCategories(formatted)
    } catch (err) {
      toast({ title: "Error", description: "Failed to fetch categories", variant: "destructive" })
    } finally {
      setCategoriesLoading(false)
    }
  }

  const handleInputChange = (field: keyof StockFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, image: file }))
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof StockFormData, string>> = {}
    if (!formData.category_id) newErrors.category_id = "Category is required"
    if (!formData.product_name) newErrors.product_name = "Product name is required"
    if (!formData.sub_product) newErrors.sub_product = "Sub product is required"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      toast({ title: "Validation Error", description: "Please fix the errors in the form", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const submitData = new FormData()
      // append all fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          submitData.append("image", value)
        } else {
          submitData.append(key, value as string)
        }
      })
      // append seller + user info
      submitData.append("seller_id", String(sellerId))
      submitData.append("user_type", String(userRole))

      const response = await fetch("https://paper-deal-server.onrender.com/api/stocks", {
        method: "POST",
        body: submitData,
      })

      if (!response.ok) throw new Error("Failed to save product")

      toast({ title: "Success", description: "Stock item created successfully" })

      setFormData({
        category_id: "",
        product_name: "",
        sub_product: "",
        gsm: "",
        bf: "",
        brightness: "",
        shade: "",
        grain: "",
        sheet: "",
        w_l: "",
        no_of_bundle: "",
        no_of_rim: "",
        rim_weight: "",
        size: "",
        stock_in_kg: "",
        quantity_in_kg: "",
        price_per_kg: "",
        weight: "",
        hsn_no: "",
        other: "",
        image: null,
        approved: "0",
        request: "0",
      })

    } catch (err) {
      toast({ title: "Error", description: err instanceof Error ? err.message : "Failed to submit stock", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div>
          <div>


            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Category, Product, Sub-product */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => handleInputChange("category_id", value)}
                    disabled={categoriesLoading}
                  >
                    <SelectTrigger className={errors.category_id ? "border-red-500" : ""}>
                      <SelectValue placeholder={categoriesLoading ? "Loading..." : "Select Category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={String(category.id)}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>

                  </Select>
                  {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
                </div>

                <div>
                  <Label>Product Name *</Label>
                  <Input
                    value={formData.product_name}
                    onChange={(e) => handleInputChange("product_name", e.target.value)}
                    placeholder="Enter Product Name"
                  />
                  {errors.product_name && <p className="text-red-500 text-sm">{errors.product_name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sub_product">Sub-product *</Label>
                  <Input
                    id="sub_product"
                    value={formData.sub_product}
                    onChange={(e) => handleInputChange("sub_product", e.target.value)}
                    placeholder="Enter Sub Product"
                    className={errors.sub_product ? "border-red-500" : ""}
                  />
                  {errors.sub_product && <p className="text-sm text-red-500">{errors.sub_product}</p>}
                </div>
              </div>

              {/* Row 2: Gsm, BF, Brightness */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gsm">Gsm</Label>
                  <Input
                    id="gsm"
                    value={formData.gsm}
                    onChange={(e) => handleInputChange("gsm", e.target.value)}
                    placeholder="Enter Gsm"
                    type="number"
                    className={errors.gsm ? "border-red-500" : ""}
                  />
                  {errors.gsm && <p className="text-sm text-red-500">{errors.gsm}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bf">BF</Label>
                  <Input
                    id="bf"
                    value={formData.bf}
                    onChange={(e) => handleInputChange("bf", e.target.value)}
                    placeholder="Enter BF"
                    type="number"
                    className={errors.bf ? "border-red-500" : ""}
                  />
                  {errors.bf && <p className="text-sm text-red-500">{errors.bf}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brightness">Brightness</Label>
                  <Input
                    id="brightness"
                    value={formData.brightness}
                    onChange={(e) => handleInputChange("brightness", e.target.value)}
                    placeholder="Enter Brightness"
                    type="number"
                    className={errors.brightness ? "border-red-500" : ""}
                  />
                  {errors.brightness && <p className="text-sm text-red-500">{errors.brightness}</p>}
                </div>
              </div>

              {/* Row 3: Shade, Item No., Grain */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shade">Shade</Label>
                  <Input
                    id="shade"
                    value={formData.shade}
                    onChange={(e) => handleInputChange("shade", e.target.value)}
                    placeholder="Enter Shade"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item_no">HSN No.</Label>
                  <Input
                    id="hsn_no"
                    value={formData.hsn_no}
                    onChange={(e) => handleInputChange("hsn_no", e.target.value)}
                    placeholder="Enter Item No."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grain">Grain</Label>
                  <Input
                    id="grain"
                    value={formData.grain}
                    onChange={(e) => handleInputChange("grain", e.target.value)}
                    placeholder="Enter Grain"
                  />
                </div>
              </div>

              {/* Row 4: Sheet, W, No of Bundle */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sheet">Sheet</Label>
                  <Input
                    id="sheet"
                    value={formData.sheet}
                    onChange={(e) => handleInputChange("sheet", e.target.value)}
                    placeholder="Enter Sheet"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="w">W*L</Label>
                  <Input
                    id="w"
                    value={formData.w_l}
                    onChange={(e) => handleInputChange("w_l", e.target.value)}
                    placeholder="Enter W L"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="no_of_bundle">No of Bundle</Label>
                  <Input
                    id="no_of_bundle"
                    value={formData.no_of_bundle}
                    onChange={(e) => handleInputChange("no_of_bundle", e.target.value)}
                    placeholder="Enter No of Bundle"
                    type="number"
                    className={errors.no_of_bundle ? "border-red-500" : ""}
                  />
                  {errors.no_of_bundle && <p className="text-sm text-red-500">{errors.no_of_bundle}</p>}
                </div>
              </div>

              {/* Row 5: No of Rim, Rim Weight, Size in Inch */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="no_of_rim">No of Rim</Label>
                  <Input
                    id="no_of_rim"
                    value={formData.no_of_rim}
                    onChange={(e) => handleInputChange("no_of_rim", e.target.value)}
                    placeholder="Enter No of Rim"
                    type="number"
                    className={errors.no_of_rim ? "border-red-500" : ""}
                  />
                  {errors.no_of_rim && <p className="text-sm text-red-500">{errors.no_of_rim}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rim_weight">Rim Weight</Label>
                  <Input
                    id="rim_weight"
                    value={formData.rim_weight}
                    onChange={(e) => handleInputChange("rim_weight", e.target.value)}
                    placeholder="Enter Rim Weight"
                    type="number"
                    step="0.01"
                    className={errors.rim_weight ? "border-red-500" : ""}
                  />
                  {errors.rim_weight && <p className="text-sm text-red-500">{errors.rim_weight}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="size_in_inch">Size in Inch</Label>
                  <Input
                    id="size_in_inch"
                    value={formData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                    placeholder="Enter Size in Inch"
                  />
                </div>
              </div>

              {/* Row 6: Stock in Kg, Quantity in Kg, Price in Kg */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stock_in_kg">Stock in Kg</Label>
                  <Input
                    id="stock_in_kg"
                    value={formData.stock_in_kg}
                    onChange={(e) => handleInputChange("stock_in_kg", e.target.value)}
                    placeholder="Enter Stock in Kg"
                    type="number"
                    step="0.01"
                    className={errors.stock_in_kg ? "border-red-500" : ""}
                  />
                  {errors.stock_in_kg && <p className="text-sm text-red-500">{errors.stock_in_kg}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity_in_kg">Quantity in Kg</Label>
                  <Input
                    id="quantity_in_kg"
                    value={formData.quantity_in_kg}
                    onChange={(e) => handleInputChange("quantity_in_kg", e.target.value)}
                    placeholder="Enter Quantity in Kg"
                    type="number"
                    step="0.01"
                    className={errors.quantity_in_kg ? "border-red-500" : ""}
                  />
                  {errors.quantity_in_kg && <p className="text-sm text-red-500">{errors.quantity_in_kg}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price_in_kg">Price in Kg</Label>
                  <Input
                    id="price_in_kg"
                    value={formData.price_per_kg}
                    onChange={(e) => handleInputChange("price_per_kg", e.target.value)}
                    placeholder="Enter Price in Kg"
                    type="number"
                    step="0.01"
                    className={errors.price_per_kg ? "border-red-500" : ""}
                  />
                  {errors.price_per_kg && <p className="text-sm text-red-500">{errors.price_per_kg}</p>}
                </div>
              </div>

              {/* Row 7: Document, Other */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="document">Document</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      id="document"
                      type="file"
                      onChange={handleFileChange}
                      className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                    />
                    <Upload className="h-4 w-4 text-muted-foreground" />
                  </div>
                  {formData.image && (
                    <p className="text-sm text-muted-foreground">Selected: {formData.image.name}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="other">Other</Label>
                  <Textarea
                    id="other"
                    value={formData.other}
                    onChange={(e) => handleInputChange("other", e.target.value)}
                    placeholder="Enter other details"
                    rows={3}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <Button type="submit" disabled={loading || categoriesLoading} className="w-full md:w-auto px-8 py-2">
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Add Stock"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
