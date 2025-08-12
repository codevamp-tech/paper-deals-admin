"use client"

export default function DealProcessReportPage() {
  const data = [
    {
      id: 1,
      buyer: "DEMO BUYER",
      seller: "DEMO SELLER",
      contactPerson: "DEMO SELLER",
      mobile: "9654715385",
      email: "demoseller@gmail.com",
      productDescription: "jk",
      dealSize: 1000000,
      commission: 11111,
    },
    {
      id: 2,
      buyer: "abhisheky ty",
      seller: "pawan Singh",
      contactPerson: "Richa",
      mobile: "9799498789",
      email: "richa22@gmail.com",
      productDescription: "We deal in Matt Paper",
      dealSize: 8,
      commission: 100,
    },
    {
      id: 3,
      buyer: "Aggarwal pack products",
      seller: "pawan Singh",
      contactPerson: "Richa",
      mobile: "9799498789",
      email: "Abhidem0@gmail.com",
      productDescription: "Matt Paper",
      dealSize: 2000,
      commission: 100,
    },
  ]

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Deal Process Report</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full table-auto border">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">ID</th>
              <th className="px-4 py-2 border text-left">Buyer</th>
              <th className="px-4 py-2 border text-left">Seller</th>
              <th className="px-4 py-2 border text-left">Contact Person</th>
              <th className="px-4 py-2 border text-left">Mobile No.</th>
              <th className="px-4 py-2 border text-left">Email Id</th>
              <th className="px-4 py-2 border text-left">Product Description</th>
              <th className="px-4 py-2 border text-left">Deal Size</th>
              <th className="px-4 py-2 border text-left">Commission</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 border">{row.id}</td>
                <td className="px-4 py-2 border">{row.buyer}</td>
                <td className="px-4 py-2 border">{row.seller}</td>
                <td className="px-4 py-2 border">{row.contactPerson}</td>
                <td className="px-4 py-2 border">{row.mobile}</td>
                <td className="px-4 py-2 border">{row.email}</td>
                <td className="px-4 py-2 border">{row.productDescription}</td>
                <td className="px-4 py-2 border">{row.dealSize}</td>
                <td className="px-4 py-2 border">{row.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
