import React from "react"
import {
  DollarSignIcon,
  FileTextIcon,
  CalendarIcon,
  ArrowLeftRightIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

const EmployeeDashboard = ({ data }) => {
  const emp = data?.employee

  const cards = [
    {
      icon: CalendarIcon,
      value: data?.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This Month",
    },
    {
      icon: FileTextIcon,
      value: data?.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Waiting for approval",
    },
    {
      icon: DollarSignIcon,
      value: data?.latestPayslip
        ? `$${data.latestPayslip.netSalary?.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent payslip",
    },
  ]

  return (
    <div className="animate-fade-in space-y-8">

      {/* HEADER */}
      <div className="page-header bg-gradient-to from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold">
          Welcome, {emp?.firstName || "User"}!
        </h1>

        <p className="text-slate-300 mt-1 text-sm">
          {emp?.position} - {emp?.department || "No Department"}
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon

          return (
            <div
              key={index}
              className="group bg-white  p-6 border border-slate-100
                         shadow-sm hover:shadow-xl hover:-translate-y-1
                         transition-all duration-300"
            >
              <div className="flex items-center gap-4">

                <div className="p-3 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition">
                  <Icon className="text-indigo-600 w-6 h-6" />
                </div>

                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {card.value}
                  </p>
                  <p className="text-sm font-medium text-slate-700">
                    {card.title}
                  </p>
                  <p className="text-xs text-slate-400">
                    {card.subtitle}
                  </p>
                </div>

              </div>
            </div>
          )
        })}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex flex-col sm:flex-row gap-3">

        <Link
          to="/attandence"
          className="btn-primary text-center inline-flex items-center justify-center gap-2"
        >
          Mark Attendance
          <ArrowLeftRightIcon className="w-4 h-4" />
        </Link>

        <Link
          to="/leaves"
          className="btn-secondary text-center inline-flex items-center justify-center"
        >
          Apply for Leaves
        </Link>

      </div>

    </div>
  )
}

export default EmployeeDashboard