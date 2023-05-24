import Button from '(presentation)/components/core/BaseComponents/Button'
import { FormInput } from '(presentation)/components/core/BaseComponents/Form'
import Lucide from '(presentation)/components/core/BaseComponents/Lucide'
import React, { useContext } from 'react'
import { IScheduleContext, ScheduleContext } from '../context/ScheduleContext';
import Link from 'next/link';
import { ScheduleRoutesEnum } from '(presentation)/(routes)/scheduleRoutes';
import { IPopupContext, PopupContext } from '(presentation)/components/core/BaseComponents/Popup/context/PopupContext';
import FiltersComponent from '../Popup/FiltersComponent/FiltersComponent';

function Filters() {
    
    const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
    const { changeTypePopup, changeStatusPopup } = actions;

    const { actions: actionsPopup, dispatch: dispatchPopup } = useContext<IPopupContext>(PopupContext);
    const { changeChildrenPopup, changeStatusPopup: showPopup } = actionsPopup;

    return (
        <div className="w-full h-[5vh] flex justify-between items-center mt-4">
            <div className="w-[50%] grid grid-cols-2 items-center gap-2 h-full">
                <FormInput
                type={"text"}
                placeholder="Buscar por nombre del paciente..."
                value={""}
                className="form-control"
                onChange={(e)=> console.log(e.target.value)}
                />
                <Button variant="primary" type="button" className="w-fit">
                    <Lucide icon="Search" className="w-5 h-5" />
                </Button>
            </div>
            <div className="w-fit flex justify-end items-center gap-2 h-full">
                <Button onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(0)(dispatch) }} variant="primary" type="button" className="">
                    <Lucide icon="Plus" className="w-5 h-5 mr-2" />Nueva cita
                </Button>
                <Button variant="outline-primary" type="button" onClick={()=>{
                    showPopup(true)(dispatchPopup)
                    changeChildrenPopup({
                        component: 0,
                        title: "Filtros",
                    })(dispatchPopup)
                }} className="">
                    <Lucide icon={"Filter"} className="w-5 h-5 mr-2" />
                </Button>
            </div>
        </div>
    )
}

export default Filters