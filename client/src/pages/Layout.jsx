import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'

const Layout = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30">

      
      <SideBar role="EMPLOYEE" />

      <main className="flex-1 ml-40 overflow-y-auto ">
        <div className="max-w-6xl p-4 pt-16 mx-auto sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>

    </div>
  )
}

export default Layout