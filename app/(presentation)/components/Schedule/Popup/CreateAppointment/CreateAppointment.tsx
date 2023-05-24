import Button from '(presentation)/components/core/BaseComponents/Button'
import { FormInput, FormSelect } from '(presentation)/components/core/BaseComponents/Form'
import Link from 'next/link';
import React, { useState } from 'react'
import { FiCheck } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

function CreateAppointment({cancelFuntion, customRef}:{
  cancelFuntion: Function;
  customRef: React.LegacyRef<HTMLDivElement>;
}) {

  const [formData, setFormData] = useState({
    service: "",
    curp: "",
    date: "",
    hour: "",
    typeAttentionWindow: null,
  })

  let list_attention_windows = [
    {
      value: 0,
      type: 1,
      dates: "Lunes, Miércoles y Viernes",
      timeSpan: "30 Minutos",
      from: "10:30AM",
      to: "04:00PM",
    },
    {
      value: 1,
      type: 2,
      dates: "Martes y Jueves",
      timeSpan: "30 Minutos",
      from: "08:00AM",
      to: "12:00PM",
    },
    {
      value: 2,
      type: 1,
      dates: "Martes y Jueves",
      timeSpan: "30 Minutos",
      from: "04:00PM",
      to: "08:00PM",
    },
  ]

  const ExampleComponent = ({data}:{data:any}) => {
    let isSelected = formData["typeAttentionWindow"] === data["value"]
    return(
      <div 
      onClick={()=>{ setFormData({...formData, typeAttentionWindow: data["value"]}) }}
      className={twMerge([
        'transition cursor-pointer w-full border rounded-md p-3 flex flex-col justify-between items-start h-fit gap-3 relative',
        isSelected ? "border-green-500" : "border-slate-300"
      ])}>
        <div className='w-full flex justify-between items-center'>
          <p className="text-sm font-medium text-slate-900">{data["dates"]}</p>
          <span className={twMerge([
            "transition w-6 h-6  rounded-full flex justify-center items-center text-white text-sm relative border",
            isSelected ? "bg-green-500 border-green-500" : "bg-transparent border-slate-300"
          ])}>
            {isSelected && <FiCheck/>}
          </span>
        </div>
        <div className='w-full flex justify-between items-center'>
          <p>{data["from"]} - {data["to"]}</p>
          <span className={twMerge([
            "w-fit h-fit px-5 py-1 rounded font-medium text-xs",
            data["type"] === 1 ? "bg-yellow-400/30 text-yellow-800" : "bg-green-400/30 text-green-800"
          ])}>{data["type"] === 1 ? "Por espacios" : "Libre"}</span>
        </div>
      </div>
    )
  }

  return (
    <div ref={customRef} className='w-[40%] min-h-[60vh] max-h-[90vh] overflow-y-auto h-fit flex flex-col justify-between items-start bg-white rounded-md p-6 gap-8'>
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
          <div className="w-full flex justify-end items-center">
            <Link href="/schedule" className='font-light text-sm text-primary underline'>No existe el paciente</Link>
          </div>
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
              className="form-control w-full"
              onChange={(e)=> console.log(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Ventanas de atención</p>
          <div className="w-full flex flex-col justify-start items-center gap-6">
            {list_attention_windows.map(elem => <ExampleComponent data={elem} />)}
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>A las</p>
          <div className="w-full flex justify-between items-center">
            <FormSelect
              value={""}
              className="form-control w-full"
              onChange={(e)=> console.log(e.target.value)}
            >
              <option>12:00 PM</option>
            </FormSelect>
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