import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DEPARTMENTS } from '../data/DEPARTMENTS'

const EmployeeForm = ({ initialEmployee, onSuccess, onCancel }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const isEditMode = !!initialEmployee

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const data = Object.fromEntries(new FormData(e.target).entries())

    setTimeout(() => {
      setLoading(false)
      onSuccess?.(data)
    }, 800)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* 🔹 HEADER (FIXED YOUR MAIN ISSUE) */}
      <div className="pb-4 border-b">
        <h2 className="text-xl font-semibold text-slate-900">
          {isEditMode ? "Edit Employee" : "Add Employee"}
        </h2>
        <p className="text-sm text-slate-500">
          {isEditMode
            ? "Update employee profile"
            : "Create a new employee profile"}
        </p>
      </div>

      {/* 🔹 PERSONAL */}
      <div className="p-6 space-y-4 bg-white border rounded-xl">
        <h3 className="font-semibold text-slate-800">Personal Information</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input name="firstName" defaultValue={initialEmployee?.firstName || ""} placeholder="First Name" className="input" required />
          <input name="lastName" defaultValue={initialEmployee?.lastName || ""} placeholder="Last Name" className="input" required />
          <input name="phone" defaultValue={initialEmployee?.phone || ""} placeholder="Phone" className="input" required />

          <input
            type="date"
            name="joinDate"
            defaultValue={
              initialEmployee?.joinDate
                ? new Date(initialEmployee.joinDate).toISOString().split("T")[0]
                : ""
            }
            className="input"
            required
          />

          <textarea
            name="bio"
            defaultValue={initialEmployee?.bio || ""}
            placeholder="Brief description..."
            className="input sm:col-span-2"
          />
        </div>
      </div>

      {/* 🔹 EMPLOYMENT */}
      <div className="p-6 space-y-4 bg-white border rounded-xl">
        <h3 className="font-semibold text-slate-800">Employment Details</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <select name="department" defaultValue={initialEmployee?.department || ""} className="input" required>
            <option value="">Select Department</option>
            {DEPARTMENTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <input name="position" defaultValue={initialEmployee?.position || ""} placeholder="Position" className="input" required />

          <input type="number" name="basicSalary" defaultValue={initialEmployee?.basicSalary || 0} placeholder="Salary" className="input" />
          <input type="number" name="allowance" defaultValue={initialEmployee?.allowance || 0} placeholder="Allowance" className="input" />
          <input type="number" name="deduction" defaultValue={initialEmployee?.deduction || 0} placeholder="Deduction" className="input" />
        </div>
      </div>

      {/* 🔹 ACCOUNT */}
      <div className="p-6 space-y-4 bg-white border rounded-xl">
        <h3 className="font-semibold text-slate-800">Account Setup</h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input name="email" defaultValue={initialEmployee?.email || ""} placeholder="Work Email" className="input sm:col-span-2" required />

          {!isEditMode ? (
            <input name="temporaryPassword" placeholder="Temporary Password" className="input" required />
          ) : (
            <input name="changePassword" placeholder="Leave blank to keep current" className="input" />
          )}

          <select name="systemRole" defaultValue={initialEmployee?.systemRole || "EMPLOYEE"} className="input">
            <option value="EMPLOYEE">Employee</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>

      {/* 🔹 BUTTONS */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
          className="px-4 py-2 border rounded-md text-slate-600 hover:bg-slate-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>

    </form>
  )
}

export default EmployeeForm