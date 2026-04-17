import { CheckIcon, Loader2Icon, LogOutIcon } from 'lucide-react'
import React, { useState } from 'react'

const CheckInButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false)

  const handleAttendance = () => {
    setLoading(true)

    setTimeout(() => {
      onAction?.()
      setLoading(false)
    }, 1000)
  }

  // If already checked out
  if (todayRecord?.checkOut) {
    return (
      <div className="fixed z-50 max-w-sm p-4 text-center border shadow-lg bottom-6 right-6 bg-slate-50 border-slate-200 rounded-2xl">
        <h3 className="text-lg font-semibold text-slate-900">
          Work day completed!
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Great job. See you tomorrow!
        </p>
      </div>
    )
  }

  const isCheckedIn = !!todayRecord?.checkIn

  return (
    <div className="fixed z-50 bottom-6 right-6">
      <button
        onClick={handleAttendance}
        disabled={loading}
        className={`flex items-center justify-center gap-3 px-5 py-4 rounded-2xl text-white shadow-lg transition-all ${
          isCheckedIn
            ? 'bg-slate-700 hover:bg-slate-800'
            : 'bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800'
        }`}
      >
        {/* ICON */}
        {loading ? (
          <Loader2Icon className="w-6 h-6 animate-spin" />
        ) : isCheckedIn ? (
          <LogOutIcon className="w-6 h-6" />
        ) : (
          <CheckIcon className="w-6 h-6" />
        )}

        {/* TEXT */}
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold">
            {loading
              ? "Processing..."
              : isCheckedIn
              ? "Check Out"
              : "Clock In"}
          </span>

          <span className="text-xs opacity-80">
            {isCheckedIn
              ? "Click to check out"
              : "Start your work day"}
          </span>
        </div>
      </button>
    </div>
  )
}

export default CheckInButton