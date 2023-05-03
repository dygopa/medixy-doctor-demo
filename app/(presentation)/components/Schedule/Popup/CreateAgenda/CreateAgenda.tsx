import Button from '(presentation)/components/core/BaseComponents/Button'
import { FormInput } from '(presentation)/components/core/BaseComponents/Form'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

function CreateAgenda({cancelFuntion}:{
  cancelFuntion: Function
}) {

  let type_agenda = [
    {
      title: "Por espacio",
      value: 0
    },
    {
      title: "Libre",
      value: 1
    },
  ]

  let days_in_week = [
    {
      title: "L",
      value: 0
    },
    {
      title: "M",
      value: 1
    },
    {
      title: "X",
      value: 2
    },
    {
      title: "J",
      value: 3
    },
    {
      title: "V",
      value: 4
    },
    {
      title: "S",
      value: 5
    },
    {
      title: "D",
      value: 6
    }
  ]

  let daysRepeatedList: number[] = []
  let type_of_ends:any[] = [
    {
      title: "Nunca",
      description: "La agenda no tiene fecha de culminación"
    },
    {
      title: "El",
      description: "31 de Abril 2023"
    },
  ]

  let [formData, setFormData] = useState({
    typeEnd: 0,
    daysRepeated: daysRepeatedList,
    type: 0,
    service: "",
    curp: "",
    date: "",
    hour: ""
  })

  return (
    <div className='w-[30%] min-h-[60vh] h-fit max-h-screen flex flex-col justify-between items-start bg-white rounded-md p-6 gap-8'>
      <p className="font-bold text-2xl text-slate-900">Nuevo horario</p>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Para que servicio</p>
          <FormInput
            type={"text"}
            placeholder={"Servicio de odontología..."}
            value={""}
            className="form-control"
            onChange={(e)=> console.log(e.target.value)}
          />
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Tipo</p>
          <div className="w-full flex justify-start items-center gap-3">
            {type_agenda.map((elem, i) => <div className={twMerge([
              "cursor-pointer w-fit border border-secondary px-5 py-2 font-light text-sm rounded-md",
              formData["type"] === elem["value"] ? "bg-secondary text-white" : "bg-transparent text-secondary"
            ])} 
            onClick={()=>{ setFormData({...formData, type: elem["value"]}) }}
            key={i}>
              {elem["title"]}
            </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-2">
          <div className="w-3/5">
            <p className='font-normal text-sm text-slate-600'>Tiempo promedio de atención</p>
          </div>
          <div className="w-1/5">
            <FormInput
              type={"text"}
              placeholder={"60:00"}
              value={""}
              className="form-control"
              onChange={(e)=> console.log(e.target.value)}
            />
          </div>
          <div className="w-1/5">
            <FormInput
              type={"text"}
              placeholder={"Minutos"}
              value={""}
              className="form-control"
              onChange={(e)=> console.log(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex gap-3 justify-start items-center">
          <div className="w-3/5 flex flex-col justify-center items-start gap-2">
            <p className='font-normal text-sm text-slate-600'>Apartir de</p>
            <FormInput
              type={"date"}
              placeholder={""}
              value={""}
              className="form-control"
              onChange={(e)=> console.log(e.target.value)}
            />
          </div>
          <div className="w-1/5 flex flex-col justify-center items-start gap-2">
            <p className='font-normal text-sm text-slate-600'>Desde</p>
            <FormInput
              type={"time"}
              placeholder={""}
              value={""}
              className="form-control"
              onChange={(e)=> console.log(e.target.value)}
            />
          </div>
          <div className="w-1/5 flex flex-col justify-center items-start gap-2">
            <p className='font-normal text-sm text-slate-600'>Hasta</p>
            <FormInput
              type={"time"}
              placeholder={""}
              value={""}
              className="form-control"
              onChange={(e)=> console.log(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Se repite los</p>
          <div className="w-full flex justify-between items-center gap-3">
            {days_in_week.map((elem, i) => <div className={twMerge([
              "cursor-pointer w-8 h-8 flex flex-col justify-center items-center text-center border border-secondary font-light text-sm rounded-full",
              daysRepeatedList.includes(elem["value"]) ? "bg-secondary text-white" : "bg-transparent text-secondary"
            ])}
            key={i}>
              {elem["title"]}
            </div>
            )}
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Termina</p>
          <div className="w-full flex justify-between items-center gap-3">
            {type_of_ends.map((elem, i) => 
              <div 
              className={twMerge([
                "cursor-pointer w-1/2 h-[10vh] p-3 flex flex-col justify-center items-start border rounded-md",
                formData["typeEnd"] === elem["value"] ? "border-primary" : "border-slate-500"
              ])}
              key={i}>
                <p className="font-medium text-sm text-slate-900">{elem["title"]}</p>
                <p className="font-medium text-xs text-slate-500">{elem["description"]}</p>
              </div>
            )}
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

export default CreateAgenda