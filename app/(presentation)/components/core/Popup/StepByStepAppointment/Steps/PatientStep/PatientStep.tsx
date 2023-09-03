import { AuthContext, IAuthContext } from '(presentation)/(layouts)/AppLayout/context/AuthContext';
import React, { useContext, useState, Dispatch, SetStateAction, useMemo, useEffect } from 'react'
import { IStepByStepAppointmentContext, StepByStepAppointmentContext } from '../../context/StepByStepAppointmentContext';
import Button from '(presentation)/components/core/BaseComponents/Button';
import SpecialSearch from '(presentation)/components/core/SpecialSearch/SpecialSearch';
import { twMerge } from 'tailwind-merge';
import { FiUser, FiX } from 'react-icons/fi';
import { ISubject } from 'domain/core/entities/subjectEntity';
import moment from 'moment';
import { FormInput } from '(presentation)/components/core/BaseComponents/Form';

const PatientStep = ({
  appointment,
  setAppointment
}:{
  appointment: any;
  setAppointment: Dispatch<SetStateAction<{}>>
}) => {

  const { state: auth } = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser } = auth.getUserAuthenticated;

  const { state, actions, dispatch } =
    useContext<IStepByStepAppointmentContext>(StepByStepAppointmentContext);
  const {
    setStep,
    getPatients
  } = actions;
  const {
    data: patients,
    successful: loadedPatients,
    error: errorPatients,
  } = state.patients;

  const [patientNotFound, setPatientNotFound] = useState(false)

  const [listOfPatients, setListOfPatients] = useState([])

  const [patient, setPatient] = useState({
    name: "",
    firstName: "",
    dateBirth: "",
    email: ""
  })

  const [selectedPatient, setSelectedPatient] = useState({
    id: 0,
    title: "",
    description: ""
  })

  const [loadedDataFromAppointment, setLoadedDataFromAppointment] = useState(false)

  useEffect(()=>{
    if(!loadedDataFromAppointment){
      if(appointment["patient"]){
        setSelectedPatient(appointment["patient"])
      }
      setLoadedDataFromAppointment(true)
    }
  },[loadedDataFromAppointment])

  useMemo(() => {
    if (loadedPatients){
      let list_patients = patients.data.map((elem: ISubject) => ({
        id: elem.subjectId,
        title: `${elem.name} ${elem.lastName}`,
        description: `${elem.phoneNumber} ${
          elem.curp.length > 0 ? `- ${elem.curp}` : ""
        }`,
        type: "PATIENT",
      }));
      setListOfPatients(list_patients as []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedPatients]);

  useMemo(() => {
    if (loadedUser) {
      getPatients({
        userId: user.userId,
      })(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedUser]);
  
  return (
    <div className={"w-full h-fit relative flex flex-col gap-4"}>
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <p className="font-normal text-sm text-slate-600">
          Busca el nombre del paciente
        </p>
        <SpecialSearch
          customClick={(value: any) => { 
            setPatientNotFound(false)
            setSelectedPatient(value);
            setAppointment({
              ...appointment, 
              patientId: value["id"],
              patient: value
            })
          }}
          customClickEmpty={() => { console.log("Empty") }}
          list={listOfPatients}
          placeholder={"Buscar..."}
          selectedItem={selectedPatient}
        />
        {selectedPatient["title"] !== "" && (
          <div
            className={twMerge([
              "w-full h-fit flex justify-between items-center gap-3 bg-white",
            ])}
          >
            <div className="w-12 h-12 overflow-hidden rounded-lg bg-primary/20 text-primary text-lg flex flex-col justify-center items-center">
              <FiUser />
            </div>
            <div className="w-[90%] h-full flex flex-col justify-center items-start">
              <p className="font-semibold text-gray-950 text-[0.9rem]">
                Paciente - {selectedPatient["title"]}
              </p>
              <p className="font-light text-gray-600 text-sm">
                {selectedPatient["description"]}
              </p>
            </div>
            <div 
            onClick={()=>{ 
              setAppointment({
                ...appointment, 
                patientId: 0,
                patient: null
              })
              setSelectedPatient({
                id: 0,
                title: "",
                description: ""
              })
            }}
            className="cursor-pointer w-8 h-8 overflow-hidden rounded-lg bg-red-500/20 text-red-500 text-lg flex flex-col justify-center items-center">
              <FiX />
            </div>
          </div>
        )}
        
        <div className='w-full flex flex-col justify-start items-center gap-4 mt-4 relative'>
          <div className="w-full flex flex-col justify-center items-start text-left gap-1">
            <p className="font-medium text-base text-slate-900">Nuevo paciente</p>
            <p className="font-light text-sm text-slate-500">Registra la información necesaria de tu paciente para agendar la cita a su cuenta</p>
          </div>
          <div className='w-full flex flex-col justify-start items-center gap-3 relative'>
            
            <div className="grid grid-cols-2 gap-2 w-full">
              
              <div className="input-group">
                <p className="input-label pb-2">
                  Nombre <span className="text-primary font-bold">*</span>
                </p>
                <FormInput
                  type="text"
                  onChange={(e: any) => { setPatient({
                    ...patient,
                    name: e.target.value
                  })}}
                  placeholder="Nombre"
                />
              </div>
              <div className="input-group">
                <p className="input-label pb-2">
                  Primer apellido <span className="text-primary font-bold">*</span>
                </p>
                <FormInput
                  type="text"
                  onChange={(e: any) => { setPatient({
                    ...patient,
                    firstName: e.target.value
                  })}}
                  placeholder="Primer apellido"
                />
              </div>

            </div>

            <div className="input-group w-full">
              <p className="input-label py-2">
                Fecha de nacimiento <span className="text-primary font-bold">*</span>
              </p>
              <FormInput
                type={"date"}
                max={moment().format("YYYY-MM-DD")}
                onChange={(e: any) => setPatient({
                  ...patient,
                  dateBirth: e.target.value
                })}
                className="form-control w-full"
              />
            </div>

            <div className="input-group w-full">
              <p className="input-label py-2">
                Email <span className="text-primary font-bold">*</span>
              </p>
              <FormInput
                type="email"
                onChange={(e) => { setPatient({
                  ...patient,
                  email: e.target.value
                })}}
                placeholder="Email"
              />
            </div>

          </div>
        </div>

      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white">
        <Button
          disabled={
            selectedPatient.id === 0 
            && 
            (
              patient.name === "" ||
              patient.firstName === "" ||
              patient.dateBirth === "" ||
              patient.email === ""
            )
          }
          onClick={() => {
            setAppointment({
              ...appointment, 
              patient
            })
            setStep(3)(dispatch)
          }}
          variant="primary"
          type="button"
          className="w-full"
        >
          Continuar
        </Button>
        <p
          onClick={() => { setStep(1)(dispatch) }}
          className="cursor-pointer font-normal text-sm text-primary text-center"
        >
          Regresar
        </p>
      </div>
    </div>
  )
}

export default PatientStep