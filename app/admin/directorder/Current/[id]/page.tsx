"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useParams } from "next/navigation"

interface Buyer {
  id: string
  name: string
}

interface Seller {
  id: string
  name: string
}
// helper: backend → frontend
const mapApiToForm = (data: any) => ({
  dealId: data.deal_id,
  buyerId: data.buyer_id,
  sellerId: data.seller_id,
  contactPerson: data.contact_person,
  mobile: data.mobile_no,
  email: data.email_id,
  remarks: data.remarks,
  category: data.category,
  product: data.product_description,
  subProduct: data.sub_product,
  brightness: data.brightness,
  gsm: data.gsm,
  bf: data.bf,
  shade: data.shade,
  hsnNo: data.hsn,
  grain: data.grain,
  sheet: data.sheat, // API typo "sheat"
  wl: data.w_l,
  noOfBundle: data.no_of_bundle,
  noOfRim: data.no_of_rim,
  rimWeight: data.rim_weight,
  sizeInch: data.deal_size,
  stockKg: data.stock_in_kg,
  quantityKg: data.quantity_in_kg,
  priceKg: data.price_per_kg,
  totalAmount: data.deal_amount,
  technicalDataSheet: data.tds,
})

// helper: frontend → backend
const mapFormToApi = (form: any) => ({
  deal_id: form.dealId,
  buyer_id: form.buyerId,
  seller_id: form.sellerId,
  contact_person: form.contactPerson,
  mobile_no: form.mobile,
  email_id: form.email,
  remarks: form.remarks,
  category: form.category,
  product_description: form.product,
  sub_product: form.subProduct,
  brightness: form.brightness,
  gsm: form.gsm,
  bf: form.bf,
  shade: form.shade,
  hsn: form.hsnNo,
  grain: form.grain,
  sheat: form.sheet,
  w_l: form.wl,
  no_of_bundle: form.noOfBundle,
  no_of_rim: form.noOfRim,
  rim_weight: form.rimWeight,
  deal_size: form.sizeInch,
  stock_in_kg: form.stockKg,
  quantity_in_kg: form.quantityKg,
  price_per_kg: form.priceKg,
  deal_amount: form.totalAmount,
  tds: form.technicalDataSheet,
})

export default function DealForm() {
  const params = useParams()
  const dealId = params?.id as string

  const [form, setForm] = useState<any>({})
  const [buyers, setBuyers] = useState<Buyer[]>([])
  const [sellers, setSellers] = useState<Seller[]>([])

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (endpoint: string) => {
    try {
      const payload = mapFormToApi(form)
      const res = await fetch(`https://paper-deal-server.onrender.com/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      alert(`Updated successfully: ${endpoint}`)
      console.log(data)
    } catch (error) {
      console.error("Error:", error)
      alert(`Failed to update: ${endpoint}`)
    }
  }

  const fetchDeal = async () => {
    try {
      const res = await fetch(`https://paper-deal-server.onrender.com/api/dashboard/dealbyid/${dealId}`)
      const data = await res.json()
      setForm(mapApiToForm(data))
    } catch (error) {
      console.error("Error fetching deal:", error)
    }
  }

  const [categories, setCategories] = useState<any[]>([])

  const fetchCategories = async () => {
    try {
      const res = await fetch("https://paper-deal-server.onrender.com/api/categiry")
      const data = await res.json()
      setCategories(data.data || data) // adjust if API wraps in .data
    } catch (error) {
      console.error("Error fetching categories:", error)
    }
  }


  const fetchBuyersAndSellers = async () => {
    try {
      const [buyerRes, sellerRes] = await Promise.all([
        fetch("https://paper-deal-server.onrender.com/api/users/getBuyer"),
        fetch("https://paper-deal-server.onrender.com/api/users/getallsellers?user_type=2"),
      ])
      const buyersData = await buyerRes.json()
      const sellersData = await sellerRes.json()
      setBuyers(buyersData.data)
      setSellers(sellersData.data)
    } catch (error) {
      console.error("Error fetching buyers/sellers:", error)
    }
  }

  useEffect(() => {
    fetchDeal()
    fetchBuyersAndSellers()
    fetchCategories()
  }, [dealId])


  return (
    <div className="p-6">
      <Accordion type="single" collapsible className="w-full">

        {/* Deal Details */}
        {/* Deal Details */}
        <AccordionItem value="deal-details">
          <AccordionTrigger>Deal Details</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-4">

              {/* Existing fields */}
              <div>
                <label>Deal Id</label>
                <Input
                  value={form.dealId || ""}
                  onChange={(e) => handleChange("dealId", e.target.value)}
                />
              </div>

              {/* Buyer */}
              <div>
                <label>Buyer</label>
                <Select
                  value={form.buyerId || ""}
                  onValueChange={(v) => handleChange("buyerId", v)}
                >
                  <SelectTrigger><SelectValue placeholder="Select Buyer" /></SelectTrigger>
                  <SelectContent>
                    {buyers.map((b) => (
                      <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Seller */}
              <div>
                <label>Seller</label>
                <Select
                  value={form.sellerId || ""}
                  onValueChange={(v) => handleChange("sellerId", v)}
                >
                  <SelectTrigger><SelectValue placeholder="Select Seller" /></SelectTrigger>
                  <SelectContent>
                    {sellers.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label>Contact Person</label>
                <Input
                  value={form.contactPerson || ""}
                  onChange={(e) => handleChange("contactPerson", e.target.value)}
                />
              </div>

              <div>
                <label>Mobile Number</label>
                <Input
                  value={form.mobile || ""}
                  onChange={(e) => handleChange("mobile", e.target.value)}
                />
              </div>

              <div>
                <label>Email</label>
                <Input
                  value={form.email || ""}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div>
                <label>Remarks</label>
                <Input
                  value={form.remarks || ""}
                  onChange={(e) => handleChange("remarks", e.target.value)}
                />
              </div>

              <div>
                <label>Technical Data Sheet</label>
                <Input
                  type="file"
                  onChange={(e) => handleChange("technicalDataSheet", e.target.files?.[0])}
                />
              </div>

              {/* ✅ Category Dropdown */}
              <div>
                <label>Category</label>
                <Select
                  value={form.category || ""}
                  onValueChange={(v) => handleChange("category", v)}
                >
                  <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label>Product</label>
                <Input
                  value={form.product || ""}
                  onChange={(e) => handleChange("product", e.target.value)}
                />
              </div>

              <div>
                <label>Sub Product</label>
                <Input
                  value={form.subProduct || ""}
                  onChange={(e) => handleChange("subProduct", e.target.value)}
                />
              </div>

              {/* rest fields stay same... */}

            </div>
            <Button className="mt-4" onClick={() => handleSubmit("dashboard")}>Update</Button>
          </AccordionContent>
        </AccordionItem>



        {/* Sampling */}
        <AccordionItem value="sampling">
          <AccordionTrigger>Sampling</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Date of Sample</label>
                <Input type="date" onChange={(e) => handleChange("dov", e.target.value)} />
              </div>
              <div>
                <label>Sample Verification</label>
                <Input onChange={(e) => handleChange("sampleVerification", e.target.value)} />
              </div>
              <div>
                <label>Lab Report Date</label>
                <Input type="date" onChange={(e) => handleChange("labReport", e.target.value)} />
              </div>
              <div>
                <label>Remarks</label>
                <Input onChange={(e) => handleChange("remarks", e.target.value)} />
              </div>
              <div>
                <label>Status</label>
                <Input onChange={(e) => handleChange("status", e.target.value)} />
              </div>
            </div>
            <Button className="mt-4" onClick={() => handleSubmit("samplings")}>Update</Button>
          </AccordionContent>
        </AccordionItem>

        {/* Verification */}
        <AccordionItem value="verification">
          <AccordionTrigger>Verification</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Date of Validation</label>
                <Input type="date" onChange={(e) => handleChange("dov", e.target.value)} />
              </div>
              <div>
                <label>Sample</label>
                <Input onChange={(e) => handleChange("sample", e.target.value)} />
              </div>
              <div>
                <label>Stock Approved</label>
                <Input onChange={(e) => handleChange("stockApproved", e.target.value)} />
              </div>
            </div>
            <Button className="mt-4" onClick={() => handleSubmit("validation")}>Update</Button>
          </AccordionContent>
        </AccordionItem>

        {/* Order Confirmation */}
        <AccordionItem value="order-confirmation">
          <AccordionTrigger>Order Confirmation</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Clearance Date</label>
                <Input type="date" onChange={(e) => handleChange("clearanceDate", e.target.value)} />
              </div>
              <div>
                <label>Product Price</label>
                <Input onChange={(e) => handleChange("productPrice", e.target.value)} />
              </div>
              <div>
                <label>Remarks</label>
                <Input onChange={(e) => handleChange("remarks", e.target.value)} />
              </div>
            </div>
            <Button className="mt-4" onClick={() => handleSubmit("clearance")}>Update</Button>
          </AccordionContent>
        </AccordionItem>

        {/* Payment */}
        <AccordionItem value="payment">
          <AccordionTrigger>Payment</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Transaction Date</label>
                <Input type="date" onChange={(e) => handleChange("transactionDate", e.target.value)} />
              </div>
              <div>
                <label>Transaction Id</label>
                <Input onChange={(e) => handleChange("transactionId", e.target.value)} />
              </div>
              <div>
                <label>Detail</label>
                <Input onChange={(e) => handleChange("detail", e.target.value)} />
              </div>
              <div>
                <label>Account Number</label>
                <Input onChange={(e) => handleChange("accountNumber", e.target.value)} />
              </div>
              <div>
                <label>Bank</label>
                <Input onChange={(e) => handleChange("bank", e.target.value)} />
              </div>
              <div>
                <label>Branch</label>
                <Input onChange={(e) => handleChange("branch", e.target.value)} />
              </div>
              <div>
                <label>Amount</label>
                <Input onChange={(e) => handleChange("amount", e.target.value)} />
              </div>
            </div>
            <Button className="mt-4" onClick={() => handleSubmit("payment")}>Update</Button>
          </AccordionContent>
        </AccordionItem>

        {/* Transportation */}
        <AccordionItem value="transportation">
          <AccordionTrigger>Transportation</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Transportation Date</label>
                <Input type="date" onChange={(e) => handleChange("transportationDate", e.target.value)} />
              </div>
              <div>
                <label>Transporter Name</label>
                <Input onChange={(e) => handleChange("transporterName", e.target.value)} />
              </div>
              <div>
                <label>Mode Of Transport</label>
                <Input onChange={(e) => handleChange("modeOfTransport", e.target.value)} />
              </div>
              <div>
                <label>Vehicle No</label>
                <Input onChange={(e) => handleChange("vehicleNo", e.target.value)} />
              </div>
              <div>
                <label>Freight</label>
                <Input onChange={(e) => handleChange("freight", e.target.value)} />
              </div>
              <div>
                <label>Bill/Lading/LR No</label>
                <Input onChange={(e) => handleChange("billNo", e.target.value)} />
              </div>
              <div>
                <label>Distance</label>
                <Input onChange={(e) => handleChange("distance", e.target.value)} />
              </div>
            </div>
            <Button className="mt-4" onClick={() => handleSubmit("transportation")}>Update</Button>
          </AccordionContent>
        </AccordionItem>

        {/* Closed */}
        <AccordionItem value="closed">
          <AccordionTrigger>Closed</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label>Closed Date</label>
                <Input type="date" onChange={(e) => handleChange("closedDate", e.target.value)} />
              </div>
              <div>
                <label>Product</label>
                <Input onChange={(e) => handleChange("product", e.target.value)} />
              </div>
              <div>
                <label>Remarks</label>
                <Input onChange={(e) => handleChange("remarks", e.target.value)} />
              </div>
              <div>
                <label>Product Received By</label>
                <Input onChange={(e) => handleChange("productReceivedBy", e.target.value)} />
              </div>
              <div>
                <label>Commission (Amount)</label>
                <Input onChange={(e) => handleChange("commission", e.target.value)} />
              </div>
            </div>
            <Button className="mt-4" onClick={() => handleSubmit("close")}>Update</Button>
          </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  )
}
