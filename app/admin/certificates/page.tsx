"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Plus, Download, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Certificate {
  _id: string
  title: string
  type: string
  description?: string
  fileUrl: string
  issuer: string
  validUntil?: string
  isActive: boolean
  createdAt: string
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null)

  useEffect(() => {
    fetchCertificates()
  }, [])

  const fetchCertificates = async () => {
    try {
      const response = await fetch("/api/certificates")
      const data = await response.json()
      setCertificates(data.certificates || [])
    } catch (error) {
      console.error("Error fetching certificates:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this certificate?")) return

    try {
      const response = await fetch(`/api/certificates/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setCertificates(certificates.filter((c) => c._id !== id))
      }
    } catch (error) {
      console.error("Error deleting certificate:", error)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Certificates</h1>
          <p className="text-gray-600">Manage your company certifications and awards</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Certificate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Certificate</DialogTitle>
            </DialogHeader>
            <CertificateForm
              onSave={() => {
                fetchCertificates()
                setIsDialogOpen(false)
              }}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Certificates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <Card key={certificate._id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{certificate.title}</CardTitle>
                  <Badge variant="secondary" className="mt-2">
                    {certificate.type}
                  </Badge>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <a href={certificate.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(certificate._id)}>
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-medium">Issuer:</span> {certificate.issuer}
                </div>
                {certificate.validUntil && (
                  <div>
                    <span className="font-medium">Valid Until:</span>{" "}
                    {new Date(certificate.validUntil).toLocaleDateString()}
                  </div>
                )}
                <div>
                  <span className="font-medium">Added:</span> {new Date(certificate.createdAt).toLocaleDateString()}
                </div>
                {certificate.description && (
                  <div>
                    <span className="font-medium">Description:</span>
                    <p className="text-gray-600 mt-1">{certificate.description}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {certificates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No certificates uploaded yet</p>
            <p className="text-gray-400">Upload your first certificate to get started</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

function CertificateForm({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    issuer: "",
    validUntil: "",
  })
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      alert("Please select a file")
      return
    }

    setIsLoading(true)

    try {
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value)
      })
      submitData.append("file", file)

      const response = await fetch("/api/certificates", {
        method: "POST",
        body: submitData,
      })

      if (response.ok) {
        onSave()
      } else {
        throw new Error("Failed to save certificate")
      }
    } catch (error) {
      console.error("Error saving certificate:", error)
      alert("Error saving certificate. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Certificate Title *</Label>
          <Input
            id="title"
            required
            value={formData.title}
            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="ISO 9001:2015"
          />
        </div>

        <div>
          <Label htmlFor="type">Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ISO">ISO</SelectItem>
              <SelectItem value="MSME">MSME</SelectItem>
              <SelectItem value="Export">Export</SelectItem>
              <SelectItem value="Quality">Quality</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="issuer">Issuing Authority *</Label>
        <Input
          id="issuer"
          required
          value={formData.issuer}
          onChange={(e) => setFormData((prev) => ({ ...prev, issuer: e.target.value }))}
          placeholder="Bureau Veritas"
        />
      </div>

      <div>
        <Label htmlFor="validUntil">Valid Until</Label>
        <Input
          id="validUntil"
          type="date"
          value={formData.validUntil}
          onChange={(e) => setFormData((prev) => ({ ...prev, validUntil: e.target.value }))}
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description of the certificate"
        />
      </div>

      <div>
        <Label htmlFor="file">Certificate File *</Label>
        <Input
          id="file"
          type="file"
          required
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
        />
        <p className="text-sm text-gray-500 mt-1">Upload PDF, JPG, or PNG files (Max 10MB)</p>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-orange-600 hover:bg-orange-700" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Save Certificate"}
        </Button>
      </div>
    </form>
  )
}
