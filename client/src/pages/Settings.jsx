import React from 'react'
import { useState, useEffect } from 'react'

import { dummyProfileData } from "../data/assets"
import ProfileFrom from '../components/ProfileFrom'
import Loading from '../components/Loading'
import { Lock } from "lucide-react"
import ChangePasswordModel from '../components/ChangePasswordModel'



const Settings = () => {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const fetchProfile = async () => {
    setProfile(dummyProfileData)
    setTimeout(() => {
      setLoading(false)
    },1000)

  }
  useEffect(() => {
    fetchProfile()
  }, [])

  if(loading)
    return <Loading />

  
  return (
    <div className = "mx-8 animate-fade-in">
      <div className="page-header">
        <h1 className="text-2xl font-bold text-slate-900">
          Settings
        </h1>

        <p className="page-subtitle">
          Manage your account settings and preferences.
        </p>
       </div>
        {profile && <ProfileFrom initialData = {profile} onSuccess = {fetchProfile} />}
       
       <div className="flex flex-col items-center gap-6 p-6 bg-white border shadow-sm rounded-2xl">
        <div className='flex items-center gap-3'>
          <div>
            <Lock className="w-6 h-6 text-slate-400" />
          </div>
          <div>
            <p className='font-medium text-slate-900'>password</p>
            <p className='font-sm text-slate-600'>Update your acc password </p>
          </div>
        </div>
        <button onClick={() => setShowPassword(true)} className="px-4 py-2 text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"  >
          Change Password
        </button>
       </div >

      <ChangePasswordModel open={showPassword} onClose={() => setShowPassword(false)}/>
       
      </div>
    
    
  )
}

export default Settings