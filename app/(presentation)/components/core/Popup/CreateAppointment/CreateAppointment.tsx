import { AuthContext, IAuthContext } from '(presentation)/(layouts)/AppLayout/context/AuthContext';
import Button from '(presentation)/components/core/BaseComponents/Button'
import { FormInput, FormSelect } from '(presentation)/components/core/BaseComponents/Form'
import Link from 'next/link';
import React, { useContext, useMemo, useState } from 'react'
import { FiBriefcase, FiCheck, FiUser } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import SpecialSearch from '(presentation)/components/core/SpecialSearch/SpecialSearch';
import { IService } from 'domain/core/entities/serviceEntity';
import { ISubject } from 'domain/core/entities/subjectEntity';
import Loading from '(presentation)/components/core/Loading/Loading';
import moment from 'moment';
import 'moment/locale/es';
import { IScheduleContext, ScheduleContext } from '(presentation)/components/Schedule/context/ScheduleContext';

function CreateAppointment({cancelFuntion, customRef}:{
  cancelFuntion: Function;
  customRef: React.LegacyRef<HTMLDivElement>;
}) {

  const { state: auth} = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser} = auth.getUserAuthenticated;

  const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
  const { getServices, getPatients, getAttentionWindowsByService, createAppointment, getAppointments, changeStatusPopup } = actions;
  const { data: services, successful: loadedServices, error: errorServices } = state.getServices;
  const { data: patients, successful: loadedPatients, error: errorPatients } = state.getPatients;
  const { data: windows, loading: loadingWindows, successful: loadedWindows, error: errorWindows } = state.getAttentionWindowsByService;
  const { data: appointmentCreated, loading: loadingCreationAppointment, successful: loadedCreationAppointment, error: errorCreationAppointment } = state.createAppointment;
  const { successful: predifinedReservationSuccessful, data: predifinedReservation } = state.predifinedReservationData;
  const { successful: typeOfAppointmentCreationSuccessful, data: typeOfAppointmentCreation } = state.typeOfAppointmentCreation;

  const [fromCalendar, setFromCalendar] = useState(false)
  const [isNow, setIsNow] = useState(false)
  const [loadedLists, setLoadedLists] = useState(false)

  const [selectedDate, setSelectedDate] = useState("")

  const [listOfPatients, setListOfPatients] = useState([])
  const [listOfServices, setListOfServices] = useState([])

  const [selectedPatient, setSelectedPatient] = useState({
    id: 0,
    title: "",
    description: "",
    type: "PATIENT",
  })
  
  const [selectedService, setSelectedService] = useState({
    id: 0,
    title: "",
    description: "",
    type: "SERVICE",
  })

  const [formData, setFormData] = useState({
    service: "",
    curp: "",
    date: "",
    hour: "",
    windowId: 0,
  })

  function formatHour(value:number){
    let h:string = value.toString()
    let divided = h.split("")
    
    let hours = divided.length > 3 ? `${divided[0]}${divided[1]}` : `0${divided[0]}`
    let minutes = divided.length > 3 ? `${divided[2]}${divided[3]}` : `${divided[1]}${divided[2]}`

    return {hours, minutes}
  }

  const ExampleComponent = ({data}:{data:any}) => {

    let isSelected = formData["windowId"] === data["id"]
    let date = moment(data["fechaInicio"]).locale("es").format("dddd")
    let normalDate = moment(data["fechaInicio"]).format("DD-MM-YYYY")

    let {hours: startHour , minutes: startMinutes } = formatHour(data["horaInicio"])
    let {hours: endHour , minutes: endMinutes } = formatHour(data["horaFin"])
    let isActualHour = data["tipo"] === 2
    return(
      <div 
      onClick={()=>{ setFormData({...formData, windowId: data["id"]}) }}
      className={twMerge([
        'transition cursor-pointer w-full border rounded-md p-3 flex flex-col justify-between items-start h-fit gap-3 relative',
        isSelected ? "border-green-500" : "border-slate-300"
      ])}>
        <div className='w-full flex justify-between items-center'>
          <p className="text-sm font-medium text-slate-900 capitalize">{date} - {normalDate}</p>
          <span className={twMerge([
            "transition w-6 h-6  rounded-full flex justify-center items-center text-white text-sm relative border",
            isSelected ? "bg-green-500 border-green-500" : "bg-transparent border-slate-300"
          ])}>
            {isSelected && <FiCheck/>}
          </span>
        </div>
        <div className='w-full flex justify-between items-center'>
          {fromCalendar ? 
            <p>{`${data["horaInicio"]}`} - {`${data["horaFin"]}`}</p>
            : 
            (isActualHour ? <p>{`${moment(data["fechaInicio"]).utc().format("hh:mm a")}`} - {`${moment(data["fechaFin"]).utc().format("hh:mm a")}`}</p> : <p>{`${startHour}:${startMinutes}`} - {`${endHour}:${endMinutes}`}</p>)
          }
          <span className={twMerge([
            "w-fit h-fit px-5 py-1 rounded font-medium text-xs",
            data["tipo"] === 2 ? "bg-yellow-400/30 text-yellow-800" : "bg-green-400/30 text-green-800"
          ])}>{data["tipo"] === 2 ? "Por espacios" : "Libre"}</span>
        </div>
      </div>
    )
  }

  function handleFormatList(){

    let list_services = services.map((elem:IService) => ({
      id: elem.id,
      title: elem.name,
      description: elem.description,
      type: "SERVICE",
    }))
    setListOfServices(list_services)

    let list_patients = patients.data.map((elem:ISubject) => ({
      id: elem.subjectId,
      title: `${elem.name} ${elem.lastName}`,
      description: `${elem.phoneNumber} ${elem.curp.length > 0 ? `- ${elem.curp}` : "" }`,
      type: "PATIENT",
    }))
    setListOfPatients(list_patients)

    setLoadedLists(true)
  }

  function getDataFromPredifined(){
    
    setSelectedDate(moment(predifinedReservation["date"]).format("YYYY-MM-DD"))
    if(predifinedReservation["serviceId"] !== undefined){
      let findedService = listOfServices.find((elem:IService) => elem.id === predifinedReservation["serviceId"])
      if(findedService !== undefined){
        setSelectedService({
          id: findedService!["id"],
          title: findedService!["title"],
          description: findedService!["description"],
          type: "SERVICE",
        })
        setFormData({...formData, windowId: predifinedReservation["attentionWindowId"] })
      }
    }
  }

  useMemo(()=>{
    if(loadedLists){
      if(predifinedReservation["serviceId"] !== undefined){
        getDataFromPredifined()
        setFromCalendar(true)
      }else{
        setSelectedDate("")
        setSelectedService({
          id: 0,
          title: "",
          description: "",
          type: "SERVICE",
        })
        setFormData({...formData, windowId: 0 })
        setFromCalendar(false)
      }
    }
  },[predifinedReservationSuccessful, predifinedReservation, loadedLists])

  useMemo(()=>{
    if(loadedCreationAppointment){
      if(isNow){
        setTimeout(() => {
          window.location.href = `/medical-record/${appointmentCreated["id"]}/create?type=appointment`;
        }, 1000);
      }else{
        getAppointments(user.userId, moment().format("YYYY-MM-DD"))(dispatch)
        changeStatusPopup(false)(dispatch)
      }
    }
  },[loadedCreationAppointment])

  useMemo(() => {
    if (loadedServices && loadedPatients) handleFormatList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedServices, loadedPatients]);

  useMemo(() => {
    if (loadedUser){
      getServices(user.userId)(dispatch)
      getPatients()(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedUser]);

  return (
    <div ref={customRef} className='w-full md:w-[60%] lg:w-[40%] h-screen  md:min-h-[60vh] md:max-h-[90vh] lg:min-h-[60vh] lg:max-h-[90vh] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 pb-0 gap-8'>
      <p className="font-bold text-2xl text-slate-900">Agendar cita</p>
      <div className="w-full flex flex-col justify-center items-center gap-5">
        {!fromCalendar && <div className="w-full flex flex-col justify-center items-start">
          <p className='font-normal text-sm text-slate-600'>Busca el nombre del paciente</p>
          <SpecialSearch
            customClick={setSelectedPatient}
            customClickEmpty={()=>{}}
            list={listOfPatients} 
            placeholder={"Buscar..."} 
            selectedItem={selectedPatient}
          />
          <div className="w-full flex justify-end items-center">
            <Link href="/patients/new-patient" className='font-light text-sm text-primary underline'>No existe el paciente</Link>
          </div>
          
          {selectedPatient["title"] !== "" && <div className={twMerge([
            "transition w-full h-[10vh] flex justify-between items-center gap-3 bg-white"
          ])}>
            <div className='w-12 h-12 overflow-hidden rounded-lg bg-primary/20 text-primary text-lg flex flex-col justify-center items-center'>
              <FiUser/>
            </div>
            <div className="w-[90%] h-full flex flex-col justify-center items-start">
              <p className='font-semibold text-gray-950 text-[0.9rem]'>Paciente - {selectedPatient["title"]}</p>
              <p className='font-light text-gray-600 text-sm'>{selectedPatient["description"]}</p>
            </div>
          </div>}

        </div>}
        <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Servicio</p>
          {!fromCalendar && <SpecialSearch
            customClick={setSelectedService}
            customClickEmpty={()=>{}}
            list={listOfServices} 
            placeholder={"Buscar..."} 
            selectedItem={selectedService}
          />}
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
        {!fromCalendar && <div className="w-full flex flex-col justify-center items-start gap-2">
          <p className='font-normal text-sm text-slate-600'>Para cuando</p> 
          <div className="w-full grid grid-cols-2 justify-between items-center gap-5">            
            <div className={twMerge([
              "cursor-pointer border py-2 font-light text-sm rounded-md flex justify-center items-center gap-2",
              !isNow ? "bg-green-500 text-white border-green-500" : "bg-transparent text-secondary border-secondary"
            ])} 
            onClick={()=>{ setIsNow(false) }}
            >
              En otro momento
              {!isNow && <FiCheck/>}
            </div>
            
            <div className={twMerge([
              "cursor-pointer border py-2 font-light text-sm rounded-md flex justify-center items-center gap-2",
              isNow ? "bg-green-500 text-white border-green-500" : "bg-transparent text-secondary border-secondary"
            ])} 
            onClick={()=>{ setIsNow(true) }}
            >
              Ahora mismo
              {isNow && <FiCheck/>}
            </div>

          </div>
          { !isNow &&
            <FormInput
              type={"date"}
              min={moment().format("YYYY-MM-DD")}
              disabled={selectedService["title"] === "" || isNow}
              placeholder={""}
              value={selectedDate}
              className="form-control mt-3"
              onChange={(e)=>{ getAttentionWindowsByService(selectedService.id, e.target.value)(dispatch); setSelectedDate(e.target.value) }}
            />
          }
        </div>}
        {!isNow &&
          <div className="w-full flex flex-col justify-center items-start gap-2">
            <p className='font-normal text-sm text-slate-600'>Ventanas de atención</p>
            {fromCalendar ? 
              <ExampleComponent data={{
                id: predifinedReservation["attentionWindowId"],
                fechaInicio: predifinedReservation["date"],
                horaInicio: moment(predifinedReservation["date"]).utc().format("hh:mm a"),
                horaFin: moment(predifinedReservation["dateEnd"]).utc().format("hh:mm a"),
                tipo: predifinedReservation["type"] === "WINDOW" ? 1 : 2,
              }} />
            : <div className="w-full flex flex-col justify-start items-center gap-6">
              {(!loadedWindows && !loadingWindows) && 
                <div className="w-full h-fit flex flex-col justify-center items-center text-center gap-2">
                  <p className="text-base text-slate-900 font-medium">Nada por aquí</p>
                  <p className='text-sm text-slate-500 font-light'>Seleccina una servicio seguido de una fecha para conocer la disponibilidad</p>
                </div>
              }
              {(loadedWindows && windows.length === 0) && 
                <div className="w-full h-fit flex flex-col justify-center items-center text-center gap-2">
                  <p className="text-base text-slate-900 font-medium">Sin ventanas de atención</p>
                  <p className='text-sm text-slate-500 font-light'>No hay ventanas de atención disponibles para esta fecha y este servicio</p>
                </div>
              }
              {loadingWindows && <Loading/>}
              {(loadedWindows && windows.length > 0) && windows.map((elem:any) => <ExampleComponent data={elem} />)}
            </div>}
          </div>
        }
        {fromCalendar && <div className="w-full flex flex-col justify-center items-start">
          <p className='font-normal text-sm text-slate-600'>Busca el nombre del paciente</p>
          <SpecialSearch
            customClick={setSelectedPatient}
            customClickEmpty={()=>{}}
            list={listOfPatients} 
            placeholder={"Buscar..."} 
            selectedItem={selectedPatient}
          />
          <div className="w-full flex justify-end items-center">
            <Link href="/schedule" className='font-light text-sm text-primary underline'>No existe el paciente</Link>
          </div>
          
          {selectedPatient["title"] !== "" && <div className={twMerge([
            "transition w-full h-[10vh] flex justify-between items-center gap-3 bg-white"
          ])}>
            <div className='w-12 h-12 overflow-hidden rounded-lg bg-primary/20 text-primary text-lg flex flex-col justify-center items-center'>
              <FiUser/>
            </div>
            <div className="w-[90%] h-full flex flex-col justify-center items-start">
              <p className='font-semibold text-gray-950 text-[0.9rem]'>Paciente - {selectedPatient["title"]}</p>
              <p className='font-light text-gray-600 text-sm'>{selectedPatient["description"]}</p>
            </div>
          </div>}

        </div>}
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white">
        <Button 
        disabled={
          selectedPatient.id === 0 ||
          selectedService.id === 0 ||
          (!isNow && (selectedDate === "" ||
          formData.windowId === 0)) ||
          loadingCreationAppointment
        }
        onClick={()=>{ createAppointment({
          id: formData.windowId,
          fechaReserva: selectedDate,
          servicioId: selectedService.id,
          pacienteId: selectedPatient.id,
          doctorId: user.userId,
        }, isNow)(dispatch) }} variant="primary" type="button" className="w-full">{loadingCreationAppointment ? "Agendando..." : "Guardar"}</Button>
        <p onClick={()=>{ cancelFuntion() }} className='cursor-pointer font-normal text-sm text-primary text-center'>Cancelar</p>
      </div>
    </div>
  )
}

export default CreateAppointment