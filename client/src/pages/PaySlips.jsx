import React, { useState, useEffect, useCallback } from 'react'
import { dummyPayslipData } from "../data/assets"
import Loading from '../components/Loading'
import PaySlip from "../components/payslip/PaySlip"
import { dummyEmployeeData } from "../data/assets"
import GeneratePaySlipForm from '../components/payslip/GeneratePaySlipForm'

const Payslips = () => {

  const [payslips, setPayslips] = useState([])
  const [loading, setLoading] = useState(true)
  const [employee, setEmployee] = useState([])
  const isAdmin = true // ✅ FIXED (True → true)

  const fetchPayslips = useCallback(() => {
    setLoading(true)
    setPayslips(dummyPayslipData)

    setTimeout(() => {
      setLoading(false)
    }, 800)
  }, [])

  useEffect(() => {
    fetchPayslips()
  }, [fetchPayslips])

  useEffect(() => {
    if (isAdmin) {setEmployee(dummyEmployeeData)}
  }, [isAdmin])

  const handleGenerate = () => {
    console.log("Generate Payslip clicked")
    // later API call here
  }

  if (loading) return <Loading />

  return (
    <div className="px-6 py-6 space-y-6 animate-fade-in">

      {/* HEADER */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Payslips
          </h1>

          <p className="text-sm text-slate-500">
            {isAdmin
              ? "Generate and manage payslips for all employees."
              : "View your payslips."}
          </p>
          {/* only admin see the generate form */}
        </div>
           {isAdmin && < GeneratePaySlipForm  employee={employee} onSuccess={fetchPayslips}/> }
      </div>

      {/* TABLE */}
      <div className="overflow-hidden bg-white border shadow-sm rounded-2xl">
        <PaySlip payslips={payslips} isAdmin={isAdmin} />
      </div>

      {/* FOOTER */}
      <div className="flex justify-between text-sm text-slate-500">
        <p>Showing {payslips.length} payslips</p>
      </div>

    </div>
  )
}

export default Payslips