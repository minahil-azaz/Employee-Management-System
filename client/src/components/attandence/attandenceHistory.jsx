import React from "react"
import { format } from "date-fns"
import { getDayTypeDisplay } from "../../data/assets"

const AttandenceHistory = ({ history = [] }) => {
  return (
    <div className="mx-4 overflow-hidden bg-white border rounded-2xl">

      {/* HEADER */}
      <div className="p-4 px-6 border-b bg-slate-100">
        <h3 className="font-semibold text-slate-900">
          Recent Activity
        </h3>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="text-sm text-left text-slate-600">
              <th className="p-3">Date</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Check Out</th>
              <th className="p-3">Working Hours</th>
              <th className="p-3">Day Type</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {history.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-10 text-center text-slate-500"
                >
                  No record found
                </td>
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record)

                return (
                  <tr
                    key={record._id || record.id}
                    className="border-t"
                  >

                    {/* DATE */}
                    <td className="p-3 font-medium text-slate-900">
                      {record.date
                        ? format(new Date(record.date), "dd MMM, yyyy")
                        : "-"}
                    </td>

                    {/* CHECK IN */}
                    <td className="p-3 text-slate-600">
                      {record.checkIn
                        ? format(new Date(record.checkIn), "hh:mm a")
                        : "-"}
                    </td>

                    {/* CHECK OUT */}
                    <td className="p-3 text-slate-600">
                      {record.checkOut
                        ? format(new Date(record.checkOut), "hh:mm a")
                        : "-"}
                    </td>

                    {/* WORK HOURS */}
                    <td className="p-3 text-slate-600">
                      {record.workingHours || "-"}
                    </td>

                    {/* DAY TYPE (IMPORTANT FIX: object safe render) */}
                    <td className="p-3 text-slate-600">
                      {dayType?.label || "-"}
                    </td>

                    {/* STATUS (FIXED) */}
                    <td
                      className={`p-3 font-medium ${
                        record.status === "PRESENT"
                          ? "text-green-600"
                          : record.status === "LATE"
                          ? "text-yellow-600"
                          : "text-slate-500"
                      }`}
                    >
                      {record.status || "-"}
                    </td>

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

export default AttandenceHistory