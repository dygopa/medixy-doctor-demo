import React, { useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import { IStepsContext, StepsContext } from './context/StepsContext';

export default function Steps() {

    const { state, actions, dispatch } = useContext<IStepsContext>(StepsContext);
    const { changeStep } = actions;
    const { data: active } = state.step;

    let steps_list = [
        {
            title: "¿Cuál es tú CURP?",
            value: 0
        },
        {
            title: "¿Qué tipo de proveedor eres?",
            value: 1
        },
        {
            title: "Vamos a crear tu cuenta",
            value: 2
        }
    ]

    const StepComponent = (data:{title: string, value: number}) => {
        return(
            <div 
            onClick={()=>{ active > data.value && changeStep(data.value - 1)(dispatch) }}
            className='flex flex-col justify-center items-center gap-2 text-center'>
                <p className={twMerge([
                    active > data.value && "cursor-pointer",
                    'text-base block relative text-gray-950',
                    active === data.value ? "font-normal" : "font-light"
                ])}>
                    {data.title}
                </p>
                <span className={twMerge([
                    'w-full h-1 block transition',
                    active === data.value ? "bg-primary" :
                    active > data.value ? "bg-green-500" : 
                    "bg-slate-300",
                ])}></span>
            </div>
        )
    }

    return (
        <div className="w-full h-fit">
            <div className="w-full grid grid-cols-3 items-center gap-[2px]">
                {steps_list.map((s, i) => <StepComponent title={s.title} value={s.value} key={i}/> )}
            </div>
        </div>
    )
}
