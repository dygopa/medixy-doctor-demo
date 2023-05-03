import Button from '(presentation)/components/core/BaseComponents/Button'
import { FormInput } from '(presentation)/components/core/BaseComponents/Form'
import Lucide from '(presentation)/components/core/BaseComponents/Lucide'
import React, { useContext } from 'react'
import { IScheduleContext, ScheduleContext } from '../context/ScheduleContext';

function Filters() {
    
  const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
  const { changeTypePopup, changeStatusPopup } = actions;
  const { data } = state.typePopupActive;

    return (
        <div className="w-full h-[5vh] flex justify-between items-center mt-4">
        <div className="w-[50%] grid grid-cols-3 items-center gap-2 h-full">
            <FormInput
            type={"text"}
            placeholder="Buscar por nombre del paciente..."
            value={""}
            className="form-control"
            onChange={(e)=> console.log(e.target.value)}
            />
            <FormInput
            type={"text"}
            placeholder="CURP"
            value={""}
            className="form-control"
            onChange={(e)=> console.log(e.target.value)}
            />
            <Button variant="primary" type="button" className="w-fit">
                <Lucide icon="Search" className="w-5 h-5" />
            </Button>
        </div>
        <div className="w-[45%] grid grid-cols-3 items-center gap-2 h-full">
            <Button variant="primary" type="button" className="">
                <Lucide icon="Plus" className="w-5 h-5 mr-2" />Nuevo paciente
            </Button>
            <Button onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(0)(dispatch) }} variant="primary" type="button" className="">
                <Lucide icon="Plus" className="w-5 h-5 mr-2" />Nueva cita
            </Button>
            <Button onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(1)(dispatch) }} variant="outline-primary" type="button" className="">
                <Lucide icon="Plus" className="w-5 h-5 mr-2" />Nueva agenda
            </Button>
        </div>
        </div>
    )
}

export default Filters