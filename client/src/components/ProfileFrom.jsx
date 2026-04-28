import React from 'react'
import {User} from 'lucide-react'

const ProfileFrom = () => {
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [message, setMessage] = React.useState(null)

  const handlesubmit = async (e) =>{
    e.preventDefault();
  }
  
  return (
    <form onSubmit={handlesubmit} className='p-5 mb-6 card sm:p-6'>
      <h2 className='flex items-center gap-2 pb-4 mb-4 text-base font-medium border-b text-slate-900 border-slate-100'>
        <User className="w-5 h-5 text-slate-400"/>public Profile
      </h2>
      {error && (
        <div className='flex items-start gap-3 mb-6 text-sm border rounded bg-rose-50 text-rose-200'>
          <div className='w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5 '/>
            
          {error}
        </div>
      )}
      {message && (
        <div className='flex items-start gap-3 mb-6 text-sm border rounded-xl bg-emerald-50 text-emerald-700 border-emerald-200' p-4>
          <div className='w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5 '/>
            
          {message}
        </div>
      )}


    </form>
  )
}

export default ProfileFrom
