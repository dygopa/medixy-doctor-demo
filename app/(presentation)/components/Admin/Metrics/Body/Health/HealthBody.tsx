import React from 'react'
import { twMerge } from 'tailwind-merge'
import Diabetes from './Graphs/Diabetes'
import MostCommonDiagnoses from './Graphs/MostCommonDiagnoses'

function HealthBody() {
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
                Diagnósticos más comúnes
              </p>
            </div>
          </div>

          <div className="mt-4 w-full h-[30vh]">
            <MostCommonDiagnoses/>
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
                Diabetes
              </p>
            </div>
          </div>

          <div className="mt-4 h-[30vh]">
            <Diabetes/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthBody