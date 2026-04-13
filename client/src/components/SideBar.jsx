import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { dummyProfileData } from "../data/dummyProfileData"
import {
  CalendarIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
  XIcon,
} from 'lucide-react'

const toSidebarRole = (value) => {
  if (value == null || value === '') return null
  const u = String(value).toUpperCase()
  if (u === 'ADMIN') return 'ADMIN'
  return 'EMPLOYEE'
}

const SideBar = ({ role: roleProp }) => {
  const { pathname } = useLocation()
  const [UserName, setUserName] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  const role =
    toSidebarRole(roleProp) ??
    toSidebarRole(dummyProfileData.role) ??
    'EMPLOYEE'

  const navigationItem = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutGridIcon },
    role === 'ADMIN'
      ? { name: 'Employees', href: '/employee', icon: UserIcon }
      : { name: 'Attandance', href: '/attandence', icon: CalendarIcon },
    { name: 'Leaves', href: '/leaves', icon: FileTextIcon },
    { name: 'Payslips', href: '/payslips', icon: DollarSignIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ]

  const handlelogout = () => {
    window.location.href = '/login'
  }

  const SideBarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-white w-64">

      {/* BRAND */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserIcon className="size-7 text-indigo-400" />
            <div>
              <p className="font-semibold">Employee MS</p>
              <p className="text-xs text-slate-400">Management System</p>
            </div>
          </div>

          {/* mobile close */}
          <button className="lg:hidden" onClick={() => setMobileOpen(false)}>
            <XIcon size={20} />
          </button>
        </div>
      </div>

      {/* PROFILE */}
      <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
          <span className="text-sm font-semibold text-indigo-300">
            {UserName && UserName.length > 0
              ? UserName.charAt(0).toUpperCase()
              : ''}
          </span>
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{UserName}</p>
          <p className="text-xs text-slate-400 truncate">
            {role === 'ADMIN' ? 'Administrator' : 'Employee'}
          </p>
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Navigation
        </p>
      </div>

      <div className="flex-1 px-3 space-y-1">
        {navigationItem.map((item) => {
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="flex-1">{item.name}</span>

              {isActive && (
                <ChevronRightIcon className="w-4 h-4 text-indigo-400" />
              )}
            </Link>
          )
        })}
      </div>

      {/* LOGOUT */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handlelogout}
          className="flex items-center gap-2 text-sm text-slate-300 hover:text-red-400 transition"
        >
          <LogOutIcon size={16} />
          Log out
        </button>
      </div>
    </div>
  )

  useEffect(() => {
    setUserName(dummyProfileData.firstName + ' ' + dummyProfileData.lastName)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        className="lg:hidden p-2"
        onClick={() => setMobileOpen(true)}
      >
        <MenuIcon size={20} />
      </button>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 z-30">
        {SideBarContent}
      </aside>

      {/* MOBILE SIDEBAR */}
      <aside
        className={`lg:hidden fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {SideBarContent}
      </aside>
    </>
  )
}

export default SideBar