import React from 'react'
import { twMerge } from 'tailwind-merge'
import Age from './Graphs/Age'
import ByInsurance from './Graphs/ByInsurance'
import BySex from './Graphs/BySex'
import DistributionPerMonth from './Graphs/DistributionPerMonth'

function PatientesBody() {
  return (
    <div className='md:grid grid-cols-2 gap-4'>
      <div
        className={twMerge([
          "relative zoom-in h-auto cursor-default",
          "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="px-4 py-2 box h-full overflow-y-hidden">
          <div className="flex items-center justify-between pb-1 border-b mb-2 w-full h-[36px]">
            <div>
              <p className="w-full text-left font-bold text-md text-slate-900">
                Edad
              </p>
            </div>
          </div>

          <div className="mt-4 w-full h-[30vh]">
            <Age/>
          </div>
        </div>
      </div>

      <div
        className={twMerge([
          "relative zoom-in h-auto cursor-default",
          "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="px-4 py-2 box h-full overflow-y-hidden">
          <div className="flex items-center justify-between pb-1 border-b mb-2 w-full h-[36px]">
            <div>
              <p className="w-full text-left font-bold text-md text-slate-900">
                Por Sexo
              </p>
            </div>
          </div>

          <div className="mt-4 h-[30vh]">
            <BySex/>
          </div>
        </div>
      </div>

      <div
        className={twMerge([
          "relative zoom-in h-auto cursor-default",
          "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="px-4 py-2 box h-full overflow-y-hidden">
          <div className="flex items-center justify-between pb-1 border-b mb-2 w-full h-[36px]">
            <div>
              <p className="w-full text-left font-bold text-md text-slate-900">
                Distribución por meses
              </p>
            </div>
          </div>

          <div className="mt-4 h-[30vh]">
            <DistributionPerMonth/>
          </div>
        </div>
      </div>

      <div
        className={twMerge([
          "relative zoom-in h-auto cursor-default",
          "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="px-4 py-2 box h-full overflow-y-hidden">
          <div className="flex items-center justify-between pb-1 border-b mb-2 w-full h-[36px]">
            <div>
              <p className="w-full text-left font-bold text-md text-slate-900">
                Por Aseguradora
              </p>
            </div>
          </div>

          <div className="mt-4 h-[30vh]">
            <ByInsurance/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientesBody