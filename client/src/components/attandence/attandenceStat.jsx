import React from 'react'
import { CalendarIcon, ClockIcon, AlertCircleIcon } from 'lucide-react'

const AttandenceStat = ({ history = [] }) => {
  const totalPresent = history.filter(
    h => h.status === "PRESENT" || h.status === "LATE"
  ).length

  const totalLate = history.filter(
    h => h.status === "LATE"
  ).length

  const stats = [
    {
      label: "Total Days Present",
      value: totalPresent,
      icon: CalendarIcon,
    },
    {
      label: "Total Days Late",
      value: totalLate,
      icon: AlertCircleIcon,
    },
    {
      label: "Avg. Work Hours",
      value: "8.5",
      icon: ClockIcon,
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 mx-4 mb-8 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex items-center gap-4 p-5 bg-white border shadow-sm rounded-2xl"
        >
          {/* ICON FIX */}
          <stat.icon className="w-6 h-6 text-indigo-600" />

          <div>
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="text-lg font-semibold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AttandenceStat