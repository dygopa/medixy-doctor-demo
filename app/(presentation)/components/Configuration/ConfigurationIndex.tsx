import Link from 'next/link';
import React from 'react'
import { FiCalendar } from 'react-icons/fi';

export default function ConfigurationIndex() {

    const ConfigurationCard = ({children, title, description, path}:{children: any; title: string; description: string; path: string}) => {
        return(
            <Link href={path} target='_blank' className='cursor-pointer bg-white border rounded-md overflow-hidden h-fit px-3 py-5 flex justify-between items-start gap-2'>
                <div className='w-1/4 h-fit flex flex-col justify-start items-center'>
                    <div className='w-12 h-12 bg-primary/20 text-primary text-lg flex flex-col justify-center items-center rounded-md overflow-hidden'>
                        {children}
                    </div>
                </div>
                <div className='w-3/4 h-fit flex flex-col justify-start items-start gap-2'>
                    <p className='font-semibold text-base text-slate-900'>{title}</p>
                    <p className='font-light text-sm text-slate-500'>{description}</p>
                </div>
            </Link>
        )
    }

    return (
        <div className="container pt-8">
            <div className="w-full flex justify-between items-end gap-5">
                <div className="w-full lg:w-2/4 relative flex flex-col justify-between items-start gap-2">
                    <h2 className="mr-5 text-2xl font-bold truncate">Configuración</h2>
                    <p>En la plataforma puedes configurar multiples módulos para que se adapten a tu manera de administrar tu negocio o flujo de trabajo</p>
                </div> 
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 overflow-auto lg:overflow-visible pt-6">
                <ConfigurationCard path={"/schedule/configuration"} title={"Configuración de la agenda"} description={"Configura los posibles horarios de atención o ventanas de atención para un servicio o varios"}>
                    <FiCalendar/>
                </ConfigurationCard>
            </div>
        </div>
    )
}