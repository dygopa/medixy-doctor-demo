import Button from '(presentation)/components/core/BaseComponents/Button'
import { FormInput } from '(presentation)/components/core/BaseComponents/Form'
import React, { useState } from 'react'

function CreateAppointment({cancelFuntion}:{
  cancelFuntion: Function
}) {

  const [formData, setFormData] = useState({
    service: "",
    curp: "",
    date: "",
    hour: ""
  })

  return (
    <div className='w-[30%] min-h-[60vh] h-fit max-h-screen flex flex-col justify-between items-start bg-white rounded-md p-6 gap-8'>
      <p className="font-bold text-2xl text-slate-900">Agendar cita</p>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Busca el nombre del paciente</p>
          <FormInput
            type={"text"}
            placeholder={"Escribe el nombre del paciente..."}
            value={""}
            className="form-control"
            onChange={(e)=> console.log(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Servicio</p>
          <FormInput
            type={"text"}
            placeholder={"Servicio de odontología..."}
            value={""}
            className="form-control"
            onChange={(e)=> console.log(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Para cuando</p>
          <div className="w-full flex justify-between items-center gap-6">
            <FormInput
              type={"date"}
              placeholder={""}
              value={""}
              className="form-control w-2/3"
              onChange={(e)=> console.log(e.target.value)}
            />
            <FormInput
              type={"time"}
              placeholder={""}
              value={""}
              className="form-control w-1/3"
              onChange={(e)=> console.log(e.target.value)}
            />

          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <Button onClick={()=>{ cancelFuntion() }} variant="primary" type="button" className="w-full">Guardar</Button>
        <p onClick={()=>{ cancelFuntion() }} className='cursor-pointer font-normal text-sm text-primary text-center'>Cancelar</p>
      </div>
    </div>
  )
}

export default CreateAppointment