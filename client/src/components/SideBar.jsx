import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import { dummyProfileData } from '../../../my-env/client/src/App';
import { MenuIcon } from 'lucide-react'

const SideBar = () => {
    const {pathname} = useLocation()
    const [UserName,setUserName] = useState('')
    const[mobileOpen, setMobileOpen] = useState(false)
    const SideBarContent = (
        <></>
    )

    useEffect (()=>{
        setUserName(dummyProfileData.firstName + " " + dummyProfileData.lastName),[]
    })
    useEffect (()=>{
        setMobileOpen,[pathname]
    })
  return (
    <>
    {/* mobile button */}
    <button onClick={()=> setMobileOpen(true)}>
        <MenuIcon size={20}/>
    </button>
    {/* mobile overlay */}
    {mobileOpen && <div onClick={()=>setMobileOpen(false)}/>}

        {/* sidebar desktop */}
        <aside className="hidden lg:flex">
            {SideBarContent}
        </aside>

        {/* sidebae mobile */}

        <aside className={`lg:hidden fixed inset-y-0   ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        {SideBarContent}
        </aside>
    </>
  )
}

export default SideBar