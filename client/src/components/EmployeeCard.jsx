import React from 'react'
import { PencilIcon, Trash2Icon } from 'lucide-react'

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  if (!employee) return null

  const initials = `${employee.firstName?.[0] || ""}${employee.lastName?.[0] || ""}`

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return
    onDelete?.(employee.id)
  }

  return (
    <div className="relative items-center overflow-hidden transition-all duration-300 bg-white border shadow-sm group rounded-2xl hover:shadow-lg hover:-translate-y-1">

      {/* AVATAR */}
      <div className="relative w-full overflow-hidden aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-50">
        <div className="flex items-center justify-center w-full h-full">

          <div className="flex items-center justify-center w-20 h-20 text-lg font-semibold rounded-full shadow-inner bg-gradient-to-br from-indigo-100 to-slate-100 text-slate-700">
            {initials || "NA"}
          </div>

        </div>
      </div>

      {/* BADGES */}
      <div className="absolute flex gap-2 top-3 left-3">
        <span className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white/90 backdrop-blur rounded-lg shadow-sm">
          {employee.department || "Remote"}
        </span>

        {employee.isDeleted && (
          <span className="px-2.5 py-1 text-xs font-semibold text-white bg-red-500 rounded-lg shadow-sm">
            Deleted
          </span>
        )}
      </div>

      {/* ACTION BUTTONS */}
      {!employee.isDeleted && (
        <div className="absolute inset-0 flex items-end justify-center gap-3 pb-6 transition-all duration-300 opacity-0 bg-gradient-to-t from-black/10 via-transparent to-transparent group-hover:opacity-100">

          <button
            onClick={() => onEdit?.(employee)}
            title="Edit Employee"
            className="p-2.5 rounded-full bg-white shadow hover:text-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-300"
          >
            <PencilIcon className="w-4 h-4" />
          </button>

          <button
            onClick={handleDelete}
            title="Delete Employee"
            className="p-2.5 rounded-full bg-white shadow hover:text-red-500 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            <Trash2Icon className="w-4 h-4" />
          </button>

        </div>
      )}

      {/* INFO */}
      <div className="p-5 space-y-1">
        <p className="text-sm font-semibold truncate text-slate-900">
          {employee.firstName} {employee.lastName}
        </p>

        <p className="text-xs truncate text-slate-500">
          {employee.position || "No Position"}
        </p>
      </div>

    </div>
  )
}

export default EmployeeCard