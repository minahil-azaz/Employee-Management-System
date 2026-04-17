import React, { useState, useEffect, useCallback } from 'react'
import { dummyAttendanceData } from "../data/assets"

import CheckInButton from "../components/attandence/checkInButton"
import AttendanceStat from "../components/attandence/attandenceStat"
import AttandenceHistory from "../components/attandence/attandenceHistory"

const Attandence = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDelete] = useState(false)

  // FETCH DATA
  const fetchData = useCallback(() => {
    setHistory(dummyAttendanceData)
    setTimeout(() => setLoading(false), 500)
  }, [])

  useEffect(() => {
    fetchData()
    console.log("Attendance component loaded")
    console.log("Dummy Data:", dummyAttendanceData)
  }, [fetchData])

  // LOADING UI
  if (loading) {
    return (
      <div className="flex justify-center p-10">
        <div className="w-8 h-8 border-2 border-indigo-600 rounded-full animate-spin border-t-transparent" />
      </div>
    )
  }

  // TODAY DATE
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // SAFE FILTER
  const todayRecords = history.filter(record => {
    if (!record?.date) return false

    const [day, month, year] = record.date.split("/")
    const recordDate = new Date(year, month - 1, day)

    return recordDate.toDateString() === today.toDateString()
  })

  const todayRecord = todayRecords[0] || null

  return (
    <div className="mx-6 animate-fade-in">

      {/* HEADER */}
      <div className="page-header">
        <h1 className=" page-title">Attendance</h1>
        <p className="page-subtitle">
          View and manage attendance records
        </p>
      </div>

      {/* DELETE WARNING */}
      {isDelete && (
        <div className="p-6 mb-8 text-center border rounded-2xl bg-rose-50 border-rose-200">
          <p className="text-rose-600">
            You can no longer clock in or out because your employment record has been marked as deleted
          </p>
        </div>
      )}

      {/* CHECK-IN BUTTON */}
      {!isDelete && (
        <div className="mb-8">
          <CheckInButton
            todayRecord={todayRecord}
            onAction={fetchData}
          />
        </div>
      )}

      {/* STATS */}
      <AttendanceStat history={history} />

      {/* HISTORY */}
      <AttandenceHistory history={history} />

    </div>
  )
}

export default Attandence