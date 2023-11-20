import { FormInput } from '(presentation)/components/core/BaseComponents/Form'
import moment from 'moment'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import RequestedByDoctors from './Graphs/RequestedByDoctors'
import RequestedMadeInClinic from './Graphs/RequestedMadeInClinic'
import List from './Lists/List'

function ServicesBody() {
  return (
    <div className='md:grid grid-cols-2 gap-4'>
      <div className='col-span-2 flex justify-end my-1 items-center gap-2'>
        <p className="text-left font-bold text-md text-slate-900">Fecha</p>
        <FormInput
          type={"date"}
          name="fromDate"
          max={moment().format("YYYY-MM-DD")}
          className="w-fit bg-white"
        />
      </div>
      <div
        className={twMerge([
          "relative h-auto cursor-default",
          "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="px-4 py-2 box h-full overflow-y-hidden">
          <div className="flex items-center justify-between pb-1 border-b mb-2 w-full h-[36px]">
            <div>
              <p className="w-full text-left font-bold text-md text-slate-900">
                Solicitados por médicos
              </p>
            </div>
          </div>

          <div className="mt-4 w-full h-[30vh]">
            <RequestedByDoctors/>
          </div>
        </div>
      </div>

      <div
        className={twMerge([
          "relative h-auto cursor-default",
          "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="px-4 py-2 box h-full overflow-y-hidden">
          <div className="flex items-center justify-between pb-1 border-b mb-2 w-full h-[36px]">
            <div>
              <p className="w-full text-left font-bold text-md text-slate-900">
                Solicitados vs realizados en clínica
              </p>
            </div>
          </div>

          <div className="mt-4 h-[30vh]">
            <RequestedMadeInClinic/>
          </div>
        </div>
      </div>

      <div
        className={twMerge([
          "relative h-auto cursor-default col-span-2",
          "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="px-4 py-2 box h-full w-full overflow-y-hidden">
          <div className="flex items-center justify-between pb-1 border-b mb-2 w-full h-[36px]">
            <div>
              <p className="w-full text-left font-bold text-md text-slate-900">
                Detalles
              </p>
            </div>
          </div>

          <div className="mt-4 h-[30vh]">
            <List />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServicesBody