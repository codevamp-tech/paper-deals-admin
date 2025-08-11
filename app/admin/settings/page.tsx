"use client"

import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    siteName: "My Factory Website",
    email: "admin@example.com",
    phone: "+91-9876543210",
    theme: "dark",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated settings:", settings)
    alert("Settings saved!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">General Settings</h2>
        <p className="text-gray-400">Update your website information and preferences.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 border border-gray-700 p-6 rounded-lg space-y-4"
      >
        <div>
          <label className="block text-sm mb-1 text-white">Site Name</label>
          <input
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-white">Admin Email</label>
          <input
            name="email"
            type="email"
            value={settings.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-white">Phone Number</label>
          <input
            name="phone"
            value={settings.phone}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-sm mb-1 text-white">Theme</label>
          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-sm font-medium"
        >
          Save Settings
        </button>
      </form>
    </div>
  )
}
