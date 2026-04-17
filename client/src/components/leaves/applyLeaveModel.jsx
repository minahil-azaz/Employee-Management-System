import React, { useState } from 'react'
import { CalendarIcon, FileText, Loader2Icon, X, Send } from 'lucide-react'

const ApplyLeaveModel = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false)

  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() + 1)

  const minDate = tomorrow.toISOString().split("T")[0]

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      onSuccess?.()
      onClose()
    }, 1000)
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg p-6 bg-white shadow-2xl rounded-2xl animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Apply for Leave
          </h2>
          <p className="text-sm text-gray-600">
            Please fill out the form below to apply for leave.
          </p>
        </div>

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute p-2 transition rounded-full top-4 right-4 hover:bg-gray-200"
        >
          <X className="w-5 h-5 text-gray-500 hover:text-gray-700" />
        </button>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* LEAVE TYPE */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700">
              <FileText className="w-4 h-4 text-slate-400" />
              Leave Type
            </label>
            <select className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none">
              <option value="ANNUAL">Annual Leave</option>
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
            </select>
          </div>

          {/* DURATION */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700">
              <CalendarIcon className="w-4 h-4 text-slate-400" />
              Duration
            </label>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block mb-1 text-xs text-slate-400">
                  From
                </span>
                <input
                  type="date"
                  min={minDate}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <span className="block mb-1 text-xs text-slate-400">
                  To
                </span>
                <input
                  type="date"
                  min={minDate}
                  required
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* REASON */}
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-slate-700">
              <FileText className="w-4 h-4 text-slate-400" />
              Reason
            </label>
            <textarea
              rows="3"
              placeholder="Write your reason..."
              className="w-full p-2.5 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ApplyLeaveModel