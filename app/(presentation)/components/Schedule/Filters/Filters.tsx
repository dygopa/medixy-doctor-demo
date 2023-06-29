import Button from '(presentation)/components/core/BaseComponents/Button'
import { FormInput } from '(presentation)/components/core/BaseComponents/Form'
import Lucide from '(presentation)/components/core/BaseComponents/Lucide'
import React, { useContext, useMemo, useState } from 'react'
import { IScheduleContext, ScheduleContext } from '../context/ScheduleContext';
import Link from 'next/link';
import { ScheduleRoutesEnum } from '(presentation)/(routes)/scheduleRoutes';
import { IPopupContext, PopupContext } from '(presentation)/components/core/BaseComponents/Popup/context/PopupContext';
import FiltersComponent from '../Popup/FiltersComponent/FiltersComponent';
import { FiBriefcase, FiHome } from 'react-icons/fi';
import { IService } from 'domain/core/entities/serviceEntity';
import { ILocality } from 'domain/core/entities/localityEntity';

function Filters() {
    
    const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
    const { changeTypePopup, changeStatusPopup, predifinedReservationData } = actions;
    const { data: locality, successful: loadedLocality } = state.activeLocality;
    const { data: service, successful: loadedService } = state.activeService;
 
    return (
        <div className="w-full h-fit mt-4 flex flex-col justify-center items-start gap-4">
            <div className="w-full lg:h-[5vh] flex flex-col lg:flex-row flex-wrap lg:flex-nowrap justify-between items-center lg:gap-0 gap-3">
                <div className="w-full flex flex-col lg:w-[50%] lg:grid lg:grid-cols-2 items-center gap-2 lg:h-full">
                    {(locality["title"] !== "" && loadedLocality) && <div className='w-fit h-fit px-4 py-2 flex justify-center items-center gap-2 bg-white text-slate-900 border shadow-sm rounded-md'>
                        <p>{locality["title"]}</p>
                        <FiHome/>
                    </div>}
                    {(service["title"] !== "" && loadedService) && <div className='w-fit h-fit px-4 py-2 flex justify-center items-center gap-2 bg-white text-slate-900 border shadow-sm rounded-md'>
                        <p>{service["title"]}</p>
                        <FiBriefcase/>
                    </div>}
                </div>
                <div className="w-full lg:w-fit flex flex-row justify-center flex-wrap lg:flex-nowrap lg:justify-end items-center gap-2 h-full">
                    <Button onClick={()=>{ predifinedReservationData({})(dispatch); changeStatusPopup(true)(dispatch); changeTypePopup(0)(dispatch) }} variant="primary" type="button" className="w-[85%] lg:w-fit">
                        <Lucide icon="Plus" className="w-5 h-5 mr-2" />Nueva cita
                    </Button>
                    <div onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(4)(dispatch)  }} className="cursor-pointer w-10 h-10 flex flex-col justify-center items-center bg-primary/10 hover:bg-primary/20 transition rounded-md">
                        <Lucide icon={"Filter"} className="w-5 h-5" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Filters