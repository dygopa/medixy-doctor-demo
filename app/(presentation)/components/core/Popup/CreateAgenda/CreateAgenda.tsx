import Button from '(presentation)/components/core/BaseComponents/Button'
import { FormInput, FormSelect } from '(presentation)/components/core/BaseComponents/Form'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FiBriefcase, FiCheck, FiHelpCircle, FiHome } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge'
import { AuthContext, IAuthContext } from '(presentation)/(layouts)/AppLayout/context/AuthContext';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';
import { IScheduleContext, ScheduleContext } from '(presentation)/components/Schedule/context/ScheduleContext';
import SpecialSearch from '(presentation)/components/core/SpecialSearch/SpecialSearch';
import { IService } from 'domain/core/entities/serviceEntity';
import { ILocality } from 'domain/core/entities/localityEntity';

function CreateAgenda({cancelFuntion, customRef}:{
  cancelFuntion: Function;
  customRef: React.LegacyRef<HTMLDivElement>;
}) {

  const { state: auth} = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser} = auth.getUserAuthenticated;

  const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
  const { changeTypePopup, changeStatusPopup, getServices, getLocalities, createWindowAttention, getAttentionWindows} = actions;
  const { data: services, successful: loadedServices } = state.getServices;
  const { data: localities, successful: loadedLocalities } = state.getLocalities;
  const { loading, successful, error,  } = state.createWindowAttention;
  const { data: activeService, successful: changedActiveService  } = state.activeService;
  const { data: activeLocality, successful: changedActiveLocality  } = state.activeLocality;

  const params = useSearchParams();

  let type_agenda = [
    {
      title: "Por espacio",
      value: 2
    }
  ]

  let days_in_week = [
    {
      title: "L",
      value: 1
    },
    {
      title: "M",
      value: 2
    },
    {
      title: "X",
      value: 4
    },
    {
      title: "J",
      value: 8
    },
    {
      title: "V",
      value: 16
    },
    {
      title: "S",
      value: 32
    },
    {
      title: "D",
      value: 64
    }
  ]

  const [loadedLists, setLoadedLists] = useState<boolean>(false)

  const [listOfLocalities, setListOfLocalities] = useState<Array<any>>([])
  const [listOfServices, setListOfServices] = useState<Array<any>>([])
  const [daysRepeatedList, setDaysRepeatedList] = useState<Array<any>>([])
  const [listOfHours, setListOfHours] = useState<Array<any>>([])

  let type_of_ends:any[] = [
    {
      value: 1,
      title: "Nunca",
      description: "La agenda no tiene fecha de culminación"
    },
    {
      value: 2,
      title: "El",
      description: "31 de Abril 2023"
    },
  ]

  const [selectedService, setSelectedService] = useState({
    id: 0,
    title: "",
    description: "",
    type: "SERVICE",
  })

  const [selectedLocality, setSelectedLocality] = useState({
    id: 0,
    title: "",
    description: "",
    type: "LOCALITY",
  })

  let [formData, setFormData] = useState({
    typeEnd: 1,
    daysRepeated: daysRepeatedList,
    type: 2,
    serviceId: 0,
    localityId: 0,
    availableSpots: 0,
    startDate: moment().format("YYYY-MM-DD"),
    until: moment().add(1, "month").format("YYYY-MM-DD"),
    spanTime: 0,
    fromHour: "",
    toHour: ""
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

  function formatHoursFromSpan(){
    let list = []

    let endOfDay = moment().utc().add(1, "day").startOf("day")
    let start = moment().utc().startOf("day")

    start = start.add(formData.spanTime, "minutes")
    list.push({
      value: parseInt(start.format("HH:mm").split(":").join("")),
      label: start.format("hh:mm a")
    })

    do {
      start = start.add(formData.spanTime, "minutes")
      list.push({
        value: parseInt(start.format("HH:mm").split(":").join("")),
        label: start.format("hh:mm a")
      })
    } while (start.isBefore(endOfDay));

    setListOfHours(list)
  }

  function handleFormatList(){

    let list_services = services.map((elem:IService) => ({
      id: elem.id,
      title: elem.name,
      description: elem.description,
      type: "SERVICE",
    }))
    setListOfServices(list_services)

    let list_localities = localities.map((elem:ILocality) => ({
      id: elem.id,
      title: elem.name,
      description: elem.address,
      type: "LOCALITY",
    }))
    setListOfLocalities(list_localities)

    setLoadedLists(true)
  }

  function getDataFromPredifined(){
    let findedService = listOfServices.find((elem:IService) => elem.id === parseInt(params.get("service")!))
    if(findedService !== undefined){
      setSelectedService({
        id: findedService!["id"],
        title: findedService!["title"],
        description: findedService!["description"],
        type: "SERVICE",
      })
    }
  }

  useMemo(()=>{
    if(selectedLocality["title"] !== ""){
      let id:number = selectedLocality.id
      setFormData({...formData, localityId: id })
      console.log(selectedLocality["id"])
    }
  },[selectedLocality])

  useMemo(()=>{
    if(selectedService["title"] !== ""){
      let id:number = selectedService.id
      setFormData({...formData, serviceId: id })
      console.log(selectedService["id"])
    }
  },[selectedService])

  useMemo(() => {
    if (loadedServices && loadedLocalities) handleFormatList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedServices, loadedLocalities]);

  useMemo(()=>{
    if(successful){
      getAttentionWindows(formData.serviceId, "")(dispatch)
      setTimeout(() => {
        changeStatusPopup(false)(dispatch)
      }, 2000);
    }
  },[successful])

  useMemo(()=>{
    if(formData.spanTime > 0) formatHoursFromSpan()
  },[formData.spanTime])

  useMemo(() => {
    if (loadedUser){
      getServices(user.userId)(dispatch)
      getLocalities(user.userId)(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedUser]);

  useMemo(()=>{
    if(params.get("service") !== null && loadedServices){
      setFormData({...formData, serviceId: parseInt(params.get("service")!) })
      getDataFromPredifined()
    }
  },[loadedServices, params])

  return (
    <div ref={customRef} className='w-full md:w-[60%] lg:w-[40%] h-screen  md:min-h-[60vh] md:max-h-[90vh] lg:min-h-[60vh] lg:max-h-[90vh] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 pb-0 gap-8'>
      <div className="w-full flex justify-between items-center">
        <p className="font-bold text-2xl text-slate-900">Nueva ventana de atención</p>
        <div onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(3)(dispatch) }} className='cursor-pointer text-primary rounded-md w-fit h-fit flex justify-end items-center text-sm font-normal gap-2'>
          <p className='text-end'>Necesito ayuda</p>
          <FiHelpCircle/>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>En que consultorio</p>
          <SpecialSearch
            customClick={setSelectedLocality}
            customClickEmpty={()=>{}}
            list={listOfLocalities} 
            placeholder={"Buscar..."} 
            selectedItem={selectedLocality}
          />
          {selectedLocality["title"] !== "" && <div className={twMerge([
            "transition w-full h-[10vh] flex justify-between items-center gap-3 bg-white"
          ])}>
            <div className='w-12 h-12 overflow-hidden rounded-lg bg-primary/20 text-primary text-lg flex flex-col justify-center items-center'>
              <FiHome/>
            </div>
            <div className="w-[90%] h-full flex flex-col justify-center items-start">
              <p className='font-semibold text-gray-950 text-[0.9rem]'>Consultorio - {selectedLocality["title"]}</p>
              <p className='font-light text-gray-600 text-sm'>{selectedLocality["description"]}</p>
            </div>
          </div>}
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Para que servicio</p>
          <SpecialSearch
            customClick={setSelectedService}
            customClickEmpty={()=>{}}
            list={listOfServices} 
            placeholder={"Buscar..."} 
            selectedItem={selectedService}
          />
          {selectedService["title"] !== "" && <div className={twMerge([
            "transition w-full h-[10vh] flex justify-between items-center gap-3 bg-white"
          ])}>
            <div className='w-12 h-12 overflow-hidden rounded-lg bg-primary/20 text-primary text-lg flex flex-col justify-center items-center'>
              <FiBriefcase/>
            </div>
            <div className="w-[90%] h-full flex flex-col justify-center items-start">
              <p className='font-semibold text-gray-950 text-[0.9rem]'>Servicio - {selectedService["title"]}</p>
              <p className='font-light text-gray-600 text-sm'>{selectedService["description"]}</p>
            </div>
          </div>}
        </div>
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Tipo</p>
          <div className="w-full flex justify-start items-center gap-3">
            {type_agenda.map((elem, i) => <div className={twMerge([
              "cursor-pointer w-fit border px-5 py-2 font-light text-sm rounded-md flex justify-center items-center gap-2",
              formData["type"] === elem["value"] ? "bg-green-500 text-white border-green-500" : "bg-transparent text-secondary border-secondary"
            ])} 
            onClick={()=>{ setFormData({...formData, type: elem["value"]}) }}
            key={i}>
              {elem["title"]}
              {formData["type"] === elem["value"] && <FiCheck/>}
            </div>
            )}
          </div>
        </div>
        { formData["type"] === 1 ? 
          <div className="w-full flex justify-between items-center gap-2">
            <div className="w-3/5">
              <p className='font-normal text-sm text-slate-600'>Cupos disponibles</p>
            </div>
            <div className="w-1/5">
              <FormInput
                type='number'
                value={formData.availableSpots}
                className="form-control"
                onChange={(e)=> setFormData({...formData, availableSpots: +e.target.value }) }
              />
            </div>
            <div className="w-1/5">
              <p className='text-sm font-light text-slate-500'>Disponibles</p>
            </div>
          </div>
        : 
          <div className="w-full flex justify-between items-center gap-2">
            <div className="w-3/5">
              <p className='font-normal text-sm text-slate-600'>Tiempo promedio de atención</p>
            </div>
            <div className="w-1/5">
              <FormSelect
                value={formData.spanTime}
                className="form-control"
                onChange={(e)=> setFormData({...formData, spanTime: +e.target.value }) }
              >
                <option>-</option>
                <option value={15}>15</option>
                <option value={30}>30</option>
                <option value={45}>45</option>
                <option value={60}>60</option>
                <option value={90}>90</option>
              </FormSelect>
            </div>
            <div className="w-1/5">
              <p className='text-sm font-light text-slate-500'>Minutos</p>
            </div>
          </div>
        }
        <div className="w-full flex gap-3 justify-start items-center">
          <div className="w-3/5 flex flex-col justify-center items-start gap-2">
            <p className='font-normal text-sm text-slate-600'>Apartir de</p>
            <FormInput
              type={"date"}
              value={formData.startDate}
              min={Date.now()}
              className="form-control"
              onChange={(e)=> setFormData({...formData, startDate: e.target.value})}
            />
          </div>
          <div className="w-1/5 flex flex-col justify-center items-start gap-2">
            <p className='font-normal text-sm text-slate-600'>Desde</p>
            <FormSelect
              value={formData.fromHour}
              className="form-control"
              onChange={(e)=> setFormData({...formData, fromHour: e.target.value}) }
            >
              <option value={0}>-</option>
              {listOfHours.map((elem:any)=> <option value={elem["value"]}>{elem["label"]}</option> ) }
            </FormSelect>
          </div>
          <div className="w-1/5 flex flex-col justify-center items-start gap-2">
            <p className='font-normal text-sm text-slate-600'>Hasta</p>
            <FormSelect
              value={formData.toHour}
              className="form-control"
              onChange={(e)=> setFormData({...formData, toHour: e.target.value}) }
            >
              <option value={0}>-</option>
              {listOfHours.filter(elem => elem["value"] > formData.fromHour).map((elem:any)=> <option value={elem["value"]}>{elem["label"]}</option> ) }
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
            {type_of_ends.map((elem, i) => {

              let isSelected = formData["typeEnd"] === elem["value"]
              return(
                <div 
                onClick={()=>{ setFormData({...formData, typeEnd: elem["value"]}) }}
                className={twMerge([
                  "transition cursor-pointer w-1/2 h-[10vh] p-3 flex flex-col justify-center items-start border rounded-md relative",
                  isSelected ? "border-green-500" : "border-slate-300"
                ])}
                key={i}>
                  {isSelected && <span className='w-5 h-5 bg-green-500 rounded-full flex justify-center items-center text-white text-xs absolute top-2 right-2'><FiCheck/></span>}
                  <p className="font-medium text-sm text-slate-900">{elem["title"]}</p>
                  {elem["value"] === 2 ? 
                    <FormInput type={"date"} className="form-control" onChange={(e)=>{ setFormData({...formData, until: e.target.value}) }}/>
                  : 
                    <p className="font-medium text-xs text-slate-500">{elem["description"]}</p>
                  }
                </div>
              )
              
            })}
          </div>
        </div>

      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white">
        <Button disabled={
          loading ||
          daysRepeatedList.length === 0 ||
          formData.localityId === 0 ||
          formData.serviceId === 0 ||
          formData.startDate === "" ||
          formData.fromHour === "" ||
          formData.toHour === ""
        } onClick={()=>{ createWindowAttention({...formData, daysRepeated: daysRepeatedList})(dispatch) }} variant="primary" type="button" className="w-full">{loading ? "Creando..." : "Guardar"}</Button>
        <p onClick={()=>{ cancelFuntion() }} className='cursor-pointer font-normal text-sm text-primary text-center'>Cancelar</p>
      </div>
    </div>
  )
}

export default CreateAgenda