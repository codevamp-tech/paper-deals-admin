"use client"

import { Button } from "@/components/ui/button"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import "jspdf-autotable"

interface ExportActionsProps {
  data: any[]
  fileName?: string
}

export default function ExportActions({ data, fileName = "export" }: ExportActionsProps) {
  // Extract headers dynamically
  const getHeaders = () => {
    if (!data.length) return []
    return Object.keys(data[0])
  }

  // Copy to clipboard
  const copyToClipboard = () => {
    if (!data.length) return
    const headers = getHeaders()
    const text = [
      headers.join("\t"),
      ...data.map((row) => headers.map((h) => row[h] ?? "").join("\t")),
    ].join("\n")
    navigator.clipboard.writeText(text)
  }

  // Export to CSV
  const exportToCSV = () => {
    if (!data.length) return
    const headers = getHeaders()
    const csvContent = [
      headers.join(","),
      ...data.map((row) => headers.map((h) => `"${row[h] ?? ""}"`).join(",")),
    ].join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${fileName}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  // Export to Excel
  const exportToExcel = () => {
    if (!data.length) return
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data")
    XLSX.writeFile(workbook, `${fileName}.xlsx`)
  }

  // Export to PDF
  // Export to PDF
  const exportToPDF = () => {
    if (!data.length) return

    const doc = new jsPDF()

    const headers = getHeaders() // ["id","subject","name","phone","email",...]
    const rows = data.map((row) => headers.map((h) => row[h] ?? ""))

    doc.text(`${fileName} Report`, 14, 10)

      // 👇 Proper call to autoTable
      (doc as any).autoTable({
        head: [headers],  // must be nested array
        body: rows,       // array of arrays
        startY: 20,       // start table below the title
      })

    doc.save(`${fileName}.pdf`)
  }


  // Print
  const printTable = () => {
    if (!data.length) return
    const headers = getHeaders()
    const rows = data.map((row) => headers.map((h) => row[h] ?? "").join("\t")).join("\n")
    const win = window.open("", "", "width=800,height=600")
    win?.document.write(`<pre>${headers.join("\t")}\n${rows}</pre>`)
    win?.document.close()
    win?.print()
  }

  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="sm" onClick={copyToClipboard}>Copy</Button>
      <Button variant="secondary" size="sm" onClick={exportToCSV}>CSV</Button>
      <Button variant="secondary" size="sm" onClick={exportToExcel}>Excel</Button>
      <Button variant="secondary" size="sm" onClick={exportToPDF}>PDF</Button>
      <Button variant="secondary" size="sm" onClick={printTable}>Print</Button>
    </div>
  )
}
