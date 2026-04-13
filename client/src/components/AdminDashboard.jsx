import React from 'react'
import {
  Building2Icon,
  FileTextIcon,
  UserIcon,
  ArrowLeftRightIcon
} from 'lucide-react'
import { Link } from 'react-router-dom'

const AdminDashboard = ({ data }) => {

  const stats = [
    {
      icon: UserIcon,
      value: data?.totalEmployees || 0,
      label: "Total Employees",
      subtitle: "Active workforce",
    },
    {
      icon: Building2Icon,
      value: data?.totalDepartments || 0,
      label: "Departments",
      subtitle: "Organization Units",
    },
    {
      icon: FileTextIcon,
      value: data?.pendingLeaves || 0,
      label: "Pending Leaves",
      subtitle: "Waiting for approval",
    },
  ]

  return (
    <div className="animate-fade-in space-y-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold">
          Welcome Back, Admin 👋
        </h1>

        <p className="text-slate-300 mt-1 text-sm">
          Here is your dashboard overview
        </p>
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((s, index) => {
          const Icon = s.icon

          return (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 border border-slate-100
                         shadow-sm hover:shadow-xl hover:-translate-y-1
                         transition-all duration-300"
            >
              <div className="flex items-center gap-4">

                <div className="p-3 rounded-xl bg-indigo-50 group-hover:bg-indigo-100 transition">
                  <Icon className="text-indigo-600 w-6 h-6" />
                </div>

                <div>
                  <p className="text-2xl font-bold text-slate-900">
                    {s.value}
                  </p>
                  <p className="text-sm font-medium text-slate-700">
                    {s.label}
                  </p>
                  <p className="text-xs text-slate-400">
                    {s.subtitle}
                  </p>
                </div>

              </div>
            </div>
          )
        })}
      </div>

      

    </div>
  )
}

export default AdminDashboard