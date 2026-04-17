import React, { useState, useEffect, useCallback } from 'react'
import { dummyLeaveData } from "../data/assets"
import { PalmtreeIcon, Plus, ThermometerIcon, UmbrellaIcon } from 'lucide-react'
import Loading from "../components/Loading"
import LeavesHistory from "../components/leaves/leavesHistory" 
import ApplyLeaveModel from "../components/leaves/ApplyLeaveModel"

const Leaves = () => {
  const [leave, setLeave] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDelete, setIsDelete] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const isAdmin = false

  // ✅ FETCH DATA
  const fetchLeaves = useCallback(() => {
    setLeave(dummyLeaveData)

    setTimeout(() => {
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    fetchLeaves()
  }, [fetchLeaves])

  // ✅ LOADING STATE
  if (loading) {
    return <Loading />
  }

  // ✅ FILTER USING "type"
  const sickLeaves = leave.filter((l) => l.type === "SICK")
  const casualLeaves = leave.filter((l) => l.type === "CASUAL")
  const annualLeaves = leave.filter((l) => l.type === "ANNUAL")

  const leaveStats = [
    {
      label: "Sick Leaves",
      value: sickLeaves.length,
      icon: ThermometerIcon,
    },
    {
      label: "Casual Leaves",
      value: casualLeaves.length,
      icon: UmbrellaIcon,
    },
    {
      label: "Annual Leaves",
      value: annualLeaves.length,
      icon: PalmtreeIcon,
    },
  ]

  return (
    <div className="mx-8 animate-fade-in">

      {/* HEADER */}
      <div className="flex flex-col items-start justify-between gap-4 mb-8 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Leaves Management</h1>
          <p className="text-slate-500">
            {isAdmin
              ? "View and manage leave applications"
              : "Your leave history and requests"}
          </p>
        </div>

        {!isAdmin && !isDelete && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center w-full gap-2 btn-primary sm:w-auto"
          >
            Apply for Leave
            <Plus className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* STATS */}
      {!isAdmin && (
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-3 sm:gap-5">
          {leaveStats.map((s) => (
            <div
              key={s.label}
              className="relative flex items-center gap-4 p-5 bg-white border shadow-sm rounded-2xl hover:shadow-md"
            >
              {/* LEFT BORDER */}
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-r-full" />

              {/* ICON */}
              <div className="p-3 rounded-lg bg-slate-100">
                <s.icon className="w-5 h-5 text-indigo-600" />
              </div>

              {/* TEXT */}
              <div>
                <p className="text-sm text-slate-500">{s.label}</p>
                <p className="text-xl font-semibold text-slate-900">
                  {s.value}
                  <span className="ml-1 text-sm text-slate-400">taken</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* HISTORY TABLE */}
      <LeavesHistory
        leaves={leave}
        isAdmin={isAdmin}
        onUpdate={fetchLeaves}   // ✅ FIXED prop name
      />
      <ApplyLeaveModel open={showModal} onClose={() => setShowModal(false)} onSucesss={fetchLeaves} /> 
    </div>
  )
}

export default Leaves