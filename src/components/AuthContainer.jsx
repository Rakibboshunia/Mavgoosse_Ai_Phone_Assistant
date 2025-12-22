import React from 'react'

export default function AuthContainer({children}) {
  return (
    <div className='w-screen h-screen bg-linear-to-br from-[#020618] via-[#162456] to-[#0F172B] flex items-center justify-center'>
      {children}
    </div>
  )
}
