import Link from 'next/link';
import React from 'react'
import { FiCalendar } from 'react-icons/fi'

export default function GridLinks() {

    const LinkComponent = ({title, description, link, children}:
        {title: string; description: string; link: string; children:any;}) => {
        return(
            <Link target="_blank" href={link} className='min-h-[20vh] h-fit border shadow-md bg-white rounded-md overflow-hidden flex justify-between items-start p-4 gap-4'>
                <div className='h-full w-[20%] flex flex-col justify-start items-center'>
                    <span className='w-12 h-12 rounded-md bg-primary/30 text-primary text-xl flex flex-col justify-center items-center'>
                        {children}
                    </span>
                </div>
                <div className='w-[80%] h-full flex flex-col justify-start items-start gap-2'>
                    <p className='text-base text-slate-900 font-medium'>{title}</p>
                    <p className='text-sm text-slate-500 font-light'>{description}</p>
                </div>
            </Link>
        )
    }

  return (
    <div className="w-full h-full relative">
        <div className="w-full lg:flex justify-between items-center sticky top-[67px] z-[50] border-b bg-slate-100 pt-2">
            <div className="lg:w-[50%]">
                <h2 className="lg:mr-5 text-2xl font-bold truncate">Configuración</h2>
                <p className="font-light text-slate-500 text-base my-3">Configura las opciones primordiales y necesarias en tu cuenta para empezar a operar
                </p>
            </div>
        </div>
        <div className="w-full relative flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 gap-4 mt-8 items-center">
            <LinkComponent title="Configuración de la agenda" link="/schedule/configuration" description="Registra tus ventanas de atención u horarios para tus servicios">
                <FiCalendar/>
            </LinkComponent>
        </div>
    </div>
  )
}