import Button from '(presentation)/components/core/BaseComponents/Button'
import { FormInput, FormSelect } from '(presentation)/components/core/BaseComponents/Form'
import React, { useContext, useState } from 'react'
import { FiCheck, FiHelpCircle } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge'
import { IScheduleContext, ScheduleContext } from '../../context/ScheduleContext';

function CreateAgenda({cancelFuntion, customRef}:{
  cancelFuntion: Function;
  customRef: React.LegacyRef<HTMLDivElement>;
}) {

  const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
  const { changeTypePopup, changeStatusPopup } = actions;
  const { data } = state.typePopupActive;

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

  const [daysRepeatedList, setDaysRepeatedList] = useState<Array<any>>([])

  let type_of_ends:any[] = [
    {
      value: 0,
      title: "Nunca",
      description: "La agenda no tiene fecha de culminación"
    },
    {
      value: 1,
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

  function handleAddInDay(day:any){
    let list = [...daysRepeatedList]
    let alreadyExists = list.filter(elem => elem["value"] === day["value"]).length > 0

    if(alreadyExists){
      list = list.filter(elem => elem["value"] !== day["value"])
    }else{
      list.push(day)
    }
    setDaysRepeatedList(list)
  }

  const RepitedDayComponent = ({elem, index}:{elem:any; index:number;}) => {
    let isInList = daysRepeatedList.find(v => v["value"] === elem["value"])
    return(
      <div className={twMerge([
        "cursor-pointer w-8 h-8 flex flex-col justify-center items-center text-center border font-light text-sm rounded-full",
        isInList ? "bg-green-500 text-white border-green-500" : "bg-transparent text-secondary border-secondary"
      ])}
      onClick={()=>{ handleAddInDay(elem) }}
      key={index}>
        {elem["title"]}
      </div>
    )
  }

  const TypeEndComponent = ({elem, index}:{elem:any; index:number;}) => {
    let isSelected = formData["typeEnd"] === elem["value"]
    return(
      <div 
      onClick={()=>{ setFormData({...formData, typeEnd: elem["value"]}) }}
      className={twMerge([
        "transition cursor-pointer w-1/2 h-[10vh] p-3 flex flex-col justify-center items-start border rounded-md relative",
        isSelected ? "border-green-500" : "border-slate-300"
      ])}
      key={index}>
        {isSelected && <span className='w-5 h-5 bg-green-500 rounded-full flex justify-center items-center text-white text-xs absolute top-2 right-2'><FiCheck/></span>}
        <p className="font-medium text-sm text-slate-900">{elem["title"]}</p>
        <p className="font-medium text-xs text-slate-500">{elem["description"]}</p>
      </div>
    )
  }

  return (
    <div ref={customRef} className='w-full md:w-[60%] lg:w-[40%] h-screen  md:min-h-[60vh] md:max-h-[90vh] lg:min-h-[60vh] lg:max-h-[90vh] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8'>
      <div className="w-full flex justify-between items-center">
        <p className="font-bold text-2xl text-slate-900">Nueva venta de atención</p>
        <div onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(3)(dispatch) }} className='cursor-pointer text-primary rounded-md w-fit h-fit flex justify-center items-center text-sm font-normal gap-2'>
          <p>Necesito ayuda</p>
          <FiHelpCircle/>
        </div>
      </div>
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
            <FormSelect
              value={""}
              className="form-control"
              onChange={(e)=> console.log(e.target.value)}
            >
              <option>60:00</option>
            </FormSelect>
          </div>
          <div className="w-1/5">
            <FormSelect
              value={""}
              className="form-control"
              onChange={(e)=> console.log(e.target.value)}
            >
              <option>Minutos</option>
            </FormSelect>
          </div>
        </div>
        <div className="w-full flex gap-3 justify-start items-center">
          <div className="w-3/5 flex flex-col justify-center items-start gap-2">
            <p className='font-normal text-sm text-slate-600'>Apartir de</p>
            <FormInput
              type={"date"}
              value={formData.date}
              min={Date.now()}
              className="form-control"
              onChange={(e)=> setFormData({...formData, date: e.target.value})}
            />
          </div>
          <div className="w-1/5 flex flex-col justify-center items-start gap-2">
            <p className='font-normal text-sm text-slate-600'>Desde</p>
            <FormSelect
              value={""}
              className="form-control"
              onChange={(e)=> console.log(e.target.value)}
            >
              <option>10:00 AM</option>
            </FormSelect>
          </div>
          <div className="w-1/5 flex flex-col justify-center items-start gap-2">
            <p className='font-normal text-sm text-slate-600'>Hasta</p>
            <FormSelect
              value={""}
              className="form-control"
              onChange={(e)=> console.log(e.target.value)}
            >
              <option>08:00 PM</option>
            </FormSelect>
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Se repite los</p>
          <div className="w-full flex justify-between items-center gap-3">
            {days_in_week.map((elem, i) => <RepitedDayComponent elem={elem} index={i}/> )}
          </div>
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Termina</p>
          <div className="w-full flex justify-between items-center gap-3">
            {type_of_ends.map((elem, i) => <TypeEndComponent elem={elem} index={i}/>)}
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