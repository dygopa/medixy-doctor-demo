import Button from '(presentation)/components/core/BaseComponents/Button'
import React, { useState } from 'react'

function AppointmentDetail({cancelFuntion, customRef}:{
    cancelFuntion: Function;
    customRef: React.LegacyRef<HTMLDivElement>;
}) {

    const DataSpan = ({label, value}:{
        label: String;
        value: String;
    })=>{
        return(
            <div className='flex flex-col justify-center items-start gap-1 text-left box-border'>
                <p className='font-light text-sm text-slate-500'>{label}</p>
                <p className='font-semibold text-base text-slate-900'>{value}</p>
            </div>
        )
    }

    return (
        <div ref={customRef} className='w-[32%] min-h-[60vh] h-fit max-h-screen flex flex-col justify-between items-start bg-white rounded-md p-6 gap-8'>
            <p className="font-bold text-2xl text-slate-900">Cita</p>
            <div className="w-full flex justify-between items-center gap-2">
                <div className="w-1/4 flex justify-center items-center">
                    <div className='w-20 h-20 rounded-full block overflow-hidden'>
                        <img src='https://handsontek.net/images/SharePoint/ProfilePicture/Outlook.PNG' className='w-full h-full object-cover'/>
                    </div>
                </div>
                <div className="w-3/4 flex flex-col justify-center items-start gap-1 text-left">
                    <p className='font-semibold text-base text-slate-900'>María Fernanda Rondón</p>
                    <p className='font-light text-sm text-slate-500'>Edad: 25 años</p>
                    <p className='font-light text-sm text-slate-500'>CURP: MAHJ230648320</p>
                    <div className="w-full flex justify-start items-center gap-2">
                        <p className='font-light text-sm text-gray-700'>Atendido</p>
                        <span className='w-3 h-3 rounded-full bg-green-500'></span>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col justify-start items-center gap-5">
                <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
                    <DataSpan label={"Tipo de consulta"} value={"Servicio odontológico"} />
                    <DataSpan label={"Consultorio"} value={"Coyoacán"} />
                </div>
                <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
                    <DataSpan label={"Tipo de cita"} value={"Consulta subsecuente"} />
                </div>
                <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
                    <DataSpan label={"Correo electrónico"} value={"pabloaguil21@gmail.com"} />
                    <DataSpan label={"Teléfono"} value={"43430000000"} />
                </div>
                <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
                    <DataSpan label={"Para cuando"} value={"25 de julio de 2023"} />
                    <DataSpan label={"A las"} value={"10:30 am"} />
                </div>
                <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
                    <DataSpan label={"Quien hizo la cita"} value={"Lic. Alejandra Martínez"} />
                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-4">
                <div className="w-full grid grid-cols-2 justify-between items-center gap-3">
                    <Button onClick={()=>{ cancelFuntion() }} variant="outline-primary" type="button" className="w-full">Reprogramar</Button>
                    <Button onClick={()=>{ cancelFuntion() }} variant="primary" type="button" className="w-full">Confirmar la cita</Button>
                </div>
                <p onClick={()=>{ cancelFuntion() }} className='cursor-pointer font-normal text-sm text-primary text-center'>Volver</p>
            </div>
        </div>
    )
}

export default AppointmentDetail