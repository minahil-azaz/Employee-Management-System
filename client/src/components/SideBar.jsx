import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { dummyProfileData } from '../data/dummyProfileData'
import {
  CalendarIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutGridIcon,
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
      : {
          name: 'Attandance',
          href: '/attandence',
          icon: CalendarIcon,
        },
    { name: 'Leaves', href: '/leaves', icon: FileTextIcon },
    { name: 'Payslips', href: '/payslips', icon: DollarSignIcon },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ]

  const SideBarContent = (
    <>
      {/* sidebar barnd */}
      <div className="px-5 pt-6 ">
        <div className="flex item-center justify-between">
          <div className="flex items-center gap-3">
            <UserIcon className="text-white size-7" />
            <div>
              <p className="font-semibold">Employee MS</p>
              <p>Management System</p>
            </div>
          </div>
          {/* close button on mobile */}
          <button onClick={() => setMobileOpen(false)}>
            <XIcon size={20} />
          </button>
        </div>
      </div>

      {/* user profile card */}

      <div>
        <div>
          <div>
            <span className="text-slate-400 text-xs">
              {UserName && UserName.length > 0
                ? UserName.charAt(0).toUpperCase()
                : ''}
            </span>
          </div>
          <div>
            <p className="text-slate-200 truncate ">{UserName}</p>
            <p className="text-[11px] text-slate-500 truncate">
              {role === 'ADMIN' ? 'Administrator' : 'EMPLOYEE'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigator */}

      <div className="px-5 pt-5 pb-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12rem] text-slate-500 ">
          Navigation
        </p>
      </div>
      {/* navigator list  */}
      <div>
        {navigationItem.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] duration-150 relative ${isActive ? 'bg-indigo-50/12' : 'text-slate-300 hover:text-shadow hover:bg-white/4'}`}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full" />
              )}
              <item.icon
                className={`w-[17px] h-[17px] shrink-0 ${isActive ? 'text-indigo-300' : 'text-indigo-300'}`}
              />
              <span className="flex-1">{item.name}</span>
              {isActive && (
                <ChevronRightIcon className="w-3.5 h-3.5 text-indigo-500/50" />
              )}
            </Link>
          )
        })}
      </div>
    </>
  )

  useEffect(() => {
    setUserName(dummyProfileData.firstName + ' ' + dummyProfileData.lastName)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <>
      {/* mobile button */}
      <button onClick={() => setMobileOpen(true)}>
        <MenuIcon size={20} />
      </button>
      {/* mobile overlay */}
      {mobileOpen && <div onClick={() => setMobileOpen(false)} />}

      {/* sidebar desktop */}
      <aside className="hidden lg:flex">{SideBarContent}</aside>

      {/* sidebae mobile */}

      <aside
        className={`lg:hidden fixed inset-y-0   ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {SideBarContent}
      </aside>
    </>
  )
}

export default SideBar
