import { format } from 'date-fns'
import { Download } from 'lucide-react'
import React from 'react'

const PaySlip = ({ payslips = [], isAdmin }) => {
  return (
    <div className="mx-4 overflow-hidden bg-white border shadow-sm rounded-2xl">

      <div className="overflow-x-auto">
        <table className="w-full">

          {/* HEADER */}
          <thead className="text-sm text-left text-slate-600 bg-slate-50">
            <tr>
              {isAdmin && <th className="p-3 font-medium">Employee</th>}
              <th className="p-3 font-medium">Period</th>
              <th className="p-3 font-medium">Basic Salary</th>
              <th className="p-3 font-medium">Net Salary</th>
              <th className="p-3 font-medium text-center">Actions</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {payslips.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="p-10 text-center text-slate-500"
                >
                  No Payslips found
                </td>
              </tr>
            ) : (
              payslips.map((payslip) => {

                // ✅ HANDLE employee (array or object)
                const emp = Array.isArray(payslip.employee)
                  ? payslip.employee[0]
                  : payslip.employee

                return (
                  <tr
                    key={payslip._id || payslip.id}
                    className="transition border-t hover:bg-slate-50"
                  >

                    {/* EMPLOYEE */}
                    {isAdmin && (
                      <td className="p-3 text-slate-900">
                        {emp
                          ? `${emp.firstName || ""} ${emp.lastName || ""}`
                          : "—"}
                      </td>
                    )}

                    {/* PERIOD */}
                    <td className="p-3 text-slate-500">
                      {payslip.startDate
                        ? format(new Date(payslip.startDate), "MMM yyyy")
                        : "—"}
                    </td>

                    {/* BASIC SALARY */}
                    <td className="p-3 text-slate-600">
                      ${payslip.basicSalary?.toLocaleString() || "0"}
                    </td>

                    {/* NET SALARY */}
                    <td className="p-3 font-medium text-slate-900">
                      ${payslip.netSalary?.toLocaleString() || "0"}
                    </td>

                    {/* DOWNLOAD */}
                    <td className="p-3 text-center">
                      <button
                        onClick={() =>
                          window.open(
                            `/print/payslips/${payslip._id || payslip.id}`,
                            "_blank"
                          )
                        }
                        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
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

export default PaySlip