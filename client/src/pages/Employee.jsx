import { Plus, Search } from "lucide-react"
import React, { useCallback, useEffect, useState } from 'react'
import { dummyEmployeeData } from "../data/dummyEmployeeData"
import { DEPARTMENTS } from "../data/DEPARTMENTS"
import EmployeeCard from "../components/EmployeeCard"

const Employee = () => {
  const [employee, setEmployee] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selectDept, setSelectDept] = useState("")
  const [editEmployee, setEditEmployee] = useState(null)
  const [showcreateModel, setShowCreateModel] = useState(false)

  const fetchEmployees = useCallback(() => {
    setLoading(true)

    const filteredData = dummyEmployeeData.filter((emp) =>
      selectDept ? emp.department === selectDept : true
    )

    setEmployee(filteredData)

    setTimeout(() => {
      setLoading(false)
    }, 1000)
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-subtitle">Manage your team member</p>
        </div>

        <button className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus size={16} /> Add Employees
        </button>
      </div>

      {/* SEARCH + FILTER */}
      <div className="mb-6">
        <div className="relative flex flex-col sm:flex-row gap-3 mb-6">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />

          <input
            placeholder="Search employees..."
            className="w-full pl-10 py-2 border rounded-lg"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        </div>

        <select
          value={selectDept}
          onChange={(e) => setSelectDept(e.target.value)}
          className="max-w-40 border rounded-lg px-3 py-2"
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
          <div className="animate-spin h-8 w-8 border-2 border-indigo-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">

          {filtered.length === 0 ? (
            <p className="col-span-full text-center py-16 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
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
    </div>
  )
}

export default Employee