// app/admin/inquiries/help/page.tsx

export default function HelpPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">profile enquiry</h2>
      <p className="text-gray-300">
        Welcome to the Help Center. Here you can find answers to common questions and contact our support team if needed.
      </p>

      <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-2">FAQs</h3>
        <ul className="list-disc list-inside text-gray-400 space-y-1">
          <li>How to respond to inquiries?</li>
          <li>How to manage inquiry status?</li>
          <li>What to do when a buyer doesn’t respond?</li>
        </ul>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-2">Need More Help?</h3>
        <p className="text-gray-400 mb-2">You can contact our support team for assistance.</p>
        <button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-white text-sm font-medium">
          Contact Support
        </button>
      </div>
    </div>
  )
}
