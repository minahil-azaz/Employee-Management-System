import { useEffect, useState } from "react"
import { dummyEmployeeDashboardData } from "../data/dummyEmployeeDashboardData"
import { dummyAdminDashboardData } from "../data/dummyAdminDashboardData" 
import Loading from "../components/Loading"
import EmployeeDashboard from "../components/EmployeeDashboard"
import AdminDashboard from "../components/AdminDashboard"

const Dashboard = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(dummyAdminDashboardData) // or employee
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loading />

  if (!data) {
    return (
      <div className="p-6 text-center text-slate-500">
        Failed to load dashboard
      </div>
    )
  }

  return (
    <div className="p-6">
      {data.role === "ADMIN" ? (
        <AdminDashboard data={data} />
      ) : (
        <EmployeeDashboard data={data} />
      )}
    </div>
  )
}

export default Dashboard