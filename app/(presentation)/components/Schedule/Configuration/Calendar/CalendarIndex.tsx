import Calendar from '(presentation)/components/core/Calendar'
import React, { useContext, useMemo, useState } from 'react'
import { IScheduleContext, ScheduleContext } from '../../context/ScheduleContext';
import Loading from '(presentation)/components/core/Loading/Loading';
import moment from 'moment';
import { AuthContext, IAuthContext } from '(presentation)/(layouts)/AppLayout/context/AuthContext';
import Button from '(presentation)/components/core/BaseComponents/Button';
import Link from 'next/link';
import { FiBriefcase, FiHome } from 'react-icons/fi';
import { AiFillBuild } from 'react-icons/ai';
import Lucide from '(presentation)/components/core/BaseComponents/Lucide';
import AlertComponent from '(presentation)/components/core/BaseComponents/Alert';

export default function CalendarIndex() {

    const { state: auth} = useContext<IAuthContext>(AuthContext);
    const { data: user, successful: loadedUser} = auth.getUserAuthenticated;  

    const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
    const { getLocalities, getServices} = actions;
    const { data, loading, successful, error } = state.getAttentionWindows;
    const { successful: successfulWindowCreated, error: errorWindowCreated  } = state.createWindowAttention;
    const { data: localities, successful: localitiesSuccessful, loading: localitiesLoading } = state.getLocalities;
    const { data: services, successful: servicesSuccessful, loading: servicesLoading } = state.getServices;
  
    const [windows, setWindows] = useState([])

    function formatHour(value:number){
        let h:string = value.toString()
        let divided = h.split("")
        let hours = divided.length > 3 ? `${divided[0]}${divided[0]}` : `0${divided[0]}`
        let minutes = divided.length > 3 ? `${divided[2]}${divided[3]}` : `${divided[1]}${divided[2]}`
        return {hours, minutes}
    }

    function formatEvent(elem:any){
        let object = {}

        let {hours: startHour , minutes: startMinutes } = formatHour(elem["horaInicio"])
        let {hours: endHour , minutes: endMinutes } = formatHour(elem["horaFin"])

        let start = moment(elem["fechaInicio"]).utc()
        let end = moment(elem["fechaFin"]).utc()

        object = {
            title: elem["Servicios"]["nombre"],
            start: start.format("YYYY-MM-DD HH:mm"),
            end: end.format("YYYY-MM-DD HH:mm"),
            textColor: "#FFF",
            backgroundColor: "#1e2b37",
        }
        return object
    }

    function formatList(){
        let list = []
        list = data.map((elem:any) => formatEvent(elem))
        setWindows(list)
    }
    
    const RowCards = () => {
        return(
            <div className='w-full h-full flex justify-center items-center flex-wrap gap-5'>
                {(localities && ([...(localities as any[])].length === 0)) && <div className='w-1/3 h-fit border rounded-md bg-white shadow-md p-5 flex flex-col justify-center items-center gap-4'>
                    <div className='w-full min-h-16 h-16 max-h-16 flex flex-col justify-center items-center'>
                        <span className='h-16 w-16 rounded-md bg-primary/20 text-primary text-xl overflow-hidden flex flex-col justify-center items-center'>
                            <Lucide icon="Building"/>
                        </span>
                    </div>
                    <div className='w-full h-fit flex flex-col justify-center items-center gap-1 text-center px-2'>
                        <p className='font-semibold text-slate-900 text-base'>No hay consultorios</p>
                        <p className='font-light text-slate-500 text-sm'>Crea tu primer consultorio y empieza a crear los servicios que prestas</p>
                    </div>
                    <Link className="w-full block" href={"/localities/create"}>
                        <Button className="w-full" variant="primary">Crear consultorio</Button>
                    </Link>
                </div>}
                {(services && [...(services as any[])].length === 0) && <div className='w-1/3 h-fit border rounded-md bg-white shadow-md p-5 flex flex-col justify-center items-center gap-4'>
                    <div className='w-full min-h-16 h-16 max-h-16 flex flex-col justify-center items-center'>
                        <span className='h-16 w-16 rounded-md bg-primary/20 text-primary text-xl overflow-hidden flex flex-col justify-center items-center'>
                            <FiBriefcase/>
                        </span>
                    </div>
                    <div className='w-full h-fit flex flex-col justify-center items-center gap-1 text-center px-2'>
                        <p className='font-semibold text-slate-900 text-base'>No hay servicios</p>
                        <p className='font-light text-slate-500 text-sm'>Crea tu primer servicio y empieza a configurar las ventanas de atención para esos servicios</p>
                    </div>
                    <Link className="w-full block" href={"/services/new-service"}>
                        <Button className="w-full" variant="primary">Crear servicio</Button>
                    </Link>
                </div>}
            </div>
        )
    }

    useMemo(()=>{
        if(successful) formatList()
    },[successful])

    useMemo(() => {
        if (loadedUser){
          getServices(user.userId)(dispatch)
          getLocalities(user.userId)(dispatch)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loadedUser]);

    return (
        <div className="mt-8 flex justify-between items-start gap-5">
            <AlertComponent
                variant="error"
                show={errorWindowCreated !== null}
                description={"Ha ocurrido un error creando la ventana de atención"}
            />
            <AlertComponent
                variant="success"
                show={successfulWindowCreated === true}
                description="Ventana de atención creada exitosamente"
            />
            {/* BEGIN: Calendar Content */}
            <div className='w-full h-[64vh]'>
                { ((user !== null && user.userId) && (localities && ([...(localities as any[])].length === 0) && (services && [...(services as any[])].length === 0))) &&
                    <RowCards/>
                }
                { ((user !== null && user.userId) && (localities && ([...(localities as any[])].length > 0) && (services && [...(services as any[])].length > 0))) && 
                    <Calendar handleChangeInWeek={()=>{}} events={windows} initialEvent={""} handleClick={()=>{}}/>
                }
                { loading && <Loading/> }
            </div>
            {/* END: Calendar Content */}
        </div>
    )
}