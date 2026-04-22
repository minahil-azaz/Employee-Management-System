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
        <div className='flex items-start mb-6 text-sm border rounded bg-rose-50 text-rose-200 '>
          <div/>
            
          
        </div>
      )}


    </form>
  )
}

export default ProfileFrom
