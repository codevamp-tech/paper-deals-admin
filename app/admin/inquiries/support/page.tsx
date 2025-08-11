export default function SupportPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-white">Customer Support</h2>
      <p className="text-gray-300">
        Facing issues or need assistance? Our support team is here to help you 24/7.
      </p>

      <div className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700">
        <h3 className="text-lg font-medium text-white mb-2">Contact Support</h3>
        <form className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          />
          <textarea
            placeholder="Your Message"
            rows={4}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400"
          ></textarea>
          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded text-sm font-medium"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
