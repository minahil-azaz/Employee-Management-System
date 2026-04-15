import { Plus, Search, X } from "lucide-react"
import React, { useCallback, useEffect, useState } from 'react'
import { dummyEmployeeData } from "../data/dummyEmployeeData"
import { DEPARTMENTS } from "../data/DEPARTMENTS"
import EmployeeCard from "../components/EmployeeCard"
import EmployeeForm from "../components/EmployeeForm"

const Employee = () => {
  const [employee, setEmployee] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectDept, setSelectDept] = useState("")
  const [editEmployee, setEditEmployee] = useState(null)
  const [showCreateModel, setShowCreateModel] = useState(false)

  const fetchEmployees = useCallback(() => {
    setLoading(true)

    const filteredData = dummyEmployeeData.filter((emp) =>
      selectDept ? emp.department === selectDept : true
    )

    setEmployee(filteredData)

    setTimeout(() => setLoading(false), 500)
  }, [selectDept])

  const filtered = employee.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  return (
    <div className="animate-fade-in">

      {/* HEADER */}
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team member</p>
        </div>

        <button
          onClick={() => setShowCreateModel(true)}
          className="flex items-center justify-center w-full gap-2 btn-primary sm:w-auto"
        >
          <Plus size={16} /> Add Employee
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="mb-6">
        <div className="relative flex flex-col gap-3 mb-6 sm:flex-row">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />

          <input
            placeholder="Search employees..."
            className="w-full py-2 pl-10 border rounded-lg"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <select
          value={selectDept}
          onChange={(e) => setSelectDept(e.target.value)}
          className="px-3 py-2 border rounded-lg max-w-40"
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {/* EMPLOYEE CARDS */}
      {loading ? (
        <div className="flex justify-center p-12">
          <div className="w-8 h-8 border-2 border-indigo-600 rounded-full animate-spin border-t-transparent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-5">
          {filtered.length === 0 ? (
            <p className="py-16 text-center bg-white border border-dashed col-span-full text-slate-400 rounded-2xl">
              No Employee Found
            </p>
          ) : (
            filtered.map((emp) => (
              <EmployeeCard
                key={emp.id}
                employee={emp}
                onDelete={fetchEmployees}
                onEdit={(e) => setEditEmployee(e)}
              />
            ))
          )}
        </div>
      )}

      {/* CREATE MODAL */}
      {showCreateModel && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowCreateModel(false)}
        >
          <div
            className="w-full max-w-4xl p-6 bg-white shadow-2xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowCreateModel(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <EmployeeForm
              initialEmployee={null}   // ✅ IMPORTANT FIX
              onSuccess={() => {
                setShowCreateModel(false)
                fetchEmployees()
              }}
              onCancel={() => setShowCreateModel(false)}
            />
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editEmployee && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setEditEmployee(null)}
        >
          <div
            className="w-full max-w-4xl p-6 bg-white shadow-2xl rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <div className="flex justify-end">
              <button
                onClick={() => setEditEmployee(null)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* FORM */}
            <EmployeeForm
              initialEmployee={editEmployee}
              onSuccess={() => {
                setEditEmployee(null)
                fetchEmployees()
              }}
              onCancel={() => setEditEmployee(null)}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default Employee