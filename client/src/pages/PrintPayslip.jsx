import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyEmployeeData } from "../data/dymmyPaySlipData";
import { Loader } from 'lucide-react';
import { format } from 'date-fns';

const Printpayslip = () => {
  const{id} = useParams();
  const[paySlip,setPaySlip] = useState(null)
  const[loading,setLoading] = useState(true)


  useEffect(() =>{
    setPaySlip(dymmyPaySlipData.find((slip) =>slip._id === id))
    setTimeout(()=>{
      setLoading(false)
    },1000)
  },[id])

  if (loading) return <Loading />
  if(!paySlip) return <p className='py-12 text-center text-slate-400'>Payslip not found</p>


  return (
    <div></div>
  )
}

export default Printpayslip