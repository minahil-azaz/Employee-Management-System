import React, { useState } from "react"
import { format } from "date-fns"
import { Loader2Icon, CheckIcon, XIcon } from "lucide-react"

const LeavesHistory = ({ leaves = [], isAdmin = false, onUpdate }) => {
  const [processing, setProcessing] = useState(null)

  const handleStatusUpdate = async (leaveId, newStatus) => {
    setProcessing(leaveId)

    try {
      await onUpdate?.(leaveId, newStatus)
    } catch (error) {
      console.error("Update failed:", error)
    }

    setProcessing(null)
  }

  return (
    <div className="mx-4 overflow-hidden bg-white border rounded-2xl">

      <div className="overflow-x-auto">
        <table className="w-full">

          {/* HEADER */}
          <thead className="text-sm text-left text-slate-600">
            <tr>
              {isAdmin && <th className="p-3">Employee</th>}
              <th className="p-3">Type</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
              {isAdmin && <th className="p-3 text-center">Actions</th>}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 4}
                  className="p-10 text-center text-slate-500"
                >
                  No Application found
                </td>
              </tr>
            ) : (
              leaves.map((leave) => {
                const emp = Array.isArray(leave.employee)
                  ? leave.employee[0]
                  : leave.employee

                return (
                  <tr
                    key={leave._id || leave.id}
                    className="border-t"
                  >
                    {/* Employee */}
                    {isAdmin && (
                      <td className="p-3 text-slate-900">
                        {emp
                          ? `${emp.firstName} ${emp.lastName}`
                          : "—"}
                      </td>
                    )}

                    {/* Type */}
                    <td className="p-3">
                      <span className="px-2 py-1 text-xs rounded bg-slate-100 text-slate-600">
                        {leave.type}
                      </span>
                    </td>

                    {/* Dates */}
                    <td className="p-3 text-slate-600">
                      {format(new Date(leave.startDate), "dd MMM yyyy")} -{" "}
                      {format(new Date(leave.endDate), "dd MMM yyyy")}
                    </td>

                    {/* Reason */}
                    <td className="p-3 text-slate-600">
                      {leave.reason}
                    </td>

                    {/* Status */}
                    <td className="p-3">
                      <span
                        className={`font-medium ${
                          leave.status === "APPROVED"
                            ? "text-green-600"
                            : leave.status === "REJECTED"
                            ? "text-red-600"
                            : leave.status === "PENDING"
                            ? "text-yellow-600"
                            : "text-slate-500"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    {/* Actions */}
                    {isAdmin && (
                      <td className="p-3">
                        {leave.status === "PENDING" && (
                          <div className="flex justify-center gap-2">

                            {/* APPROVE */}
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  leave._id || leave.id,
                                  "APPROVED"
                                )
                              }
                              disabled={!!processing}
                              className="p-2 text-green-600 rounded bg-green-50 hover:bg-green-100"
                            >
                              {processing === (leave._id || leave.id) ? (
                                <Loader2Icon className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckIcon className="w-4 h-4" />
                              )}
                            </button>

                            {/* REJECT */}
                            <button
                              onClick={() =>
                                handleStatusUpdate(
                                  leave._id || leave.id,
                                  "REJECTED"
                                )
                              }
                              disabled={!!processing}
                              className="p-2 text-red-600 rounded bg-red-50 hover:bg-red-100"
                            >
                              {processing === (leave._id || leave.id) ? (
                                <Loader2Icon className="w-4 h-4 animate-spin" />
                              ) : (
                                <XIcon className="w-4 h-4" />
                              )}
                            </button>

                          </div>
                        )}
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>

        </table>
      </div>
    </div>
  )
}

export default LeavesHistory