import Calendar from '(presentation)/components/core/Calendar'
import React, { useContext, useMemo, useState } from 'react'
import { IScheduleContext, ScheduleContext } from '../../context/ScheduleContext';
import Loading from '(presentation)/components/core/Loading/Loading';
import moment from 'moment';

export default function CalendarIndex() {

    const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
    const { data, loading, successful, error } = state.getAttentionWindows;

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
            start: start.format("YYYY-MM-DD HH:MM"),
            end: end.format("YYYY-MM-DD HH:MM"),
            textColor: "#FFF",
            backgroundColor: "#1e2b37",
        }
        return object
    }

    function formatList(){
        let list = []
        list = data.map((elem:any) => formatEvent(elem))
        console.log(list)
        setWindows(list)
    }

    useMemo(()=>{
        if(successful) formatList()
    },[successful])

    return (
        <div className="mt-8 flex justify-between items-start gap-5">
            {/* BEGIN: Calendar Content */}
            <div className='w-full h-[64vh]'>
                {loading ? 
                    <Loading/>
                : 
                    <Calendar handleChangeInWeek={()=>{}} events={windows} initialEvent={""} handleClick={()=>{}}/>
                }
            </div>
            {/* END: Calendar Content */}
        </div>
    )
}