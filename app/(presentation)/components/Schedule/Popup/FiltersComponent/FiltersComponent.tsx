import SpecialSearch from '(presentation)/components/core/SpecialSearch/SpecialSearch'
import React from 'react'

export default function FiltersComponent() {
  return (
    <div className='w-full h-fit flex flex-col justify-start items-start gap-4'>
      <div className='relative w-full flex flex-col justify-start items-start gap-1'>
        <p className='font-light text-sm text-slate-500'>Localidad</p>
        <SpecialSearch 
          customClick={()=>{}} 
          customClickEmpty={()=>{}} 
          list={[]} 
          placeholder={"Buscar..."} 
          selectedItem={""}
        />
      </div>
      <div className='relative w-full flex flex-col justify-start items-start gap-1'>
        <p className='font-light text-sm text-slate-500'>Servicio</p>
        <SpecialSearch 
          customClick={()=>{}} 
          customClickEmpty={()=>{}} 
          list={[]} 
          placeholder={"Buscar..."} 
          selectedItem={""}
        />
      </div>
    </div>
  )
}