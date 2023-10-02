import React from 'react'
import { twMerge } from 'tailwind-merge';

function ClientNotes() {

  return (
    <div className="w-full h-fit relative bg-white flex flex-col justify-start items-start rounded-md shadow-xl">
      <div className='w-full pb-2 border-b flex justify-between items-center p-2'>
        <p className='font-bold text-slate-900 text-sm'>Notas del cliente</p>
      </div>
      <div className='w-full flex flex-col justify-center items-center px-2 py-5'>
        <p className='text-center text-slate-900 text-sm font-light'>No hay notas del cliente.</p>
      </div>
    </div>
  )
}

export default ClientNotes