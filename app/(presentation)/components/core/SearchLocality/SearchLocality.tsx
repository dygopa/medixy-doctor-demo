import React, { MouseEventHandler, useState } from 'react'
import { FiCheck, FiPlus } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { Variants, motion } from 'framer-motion';
import { FormInput } from '../BaseComponents/Form';

interface SearchLocalityProps {
    selectedItem: string;
    customClick: any;
    customClickEmpty: any;
    list: string[];
    placeholder?: string | any;
}

interface ValueOnListProps {
    isSelected: Boolean; 
    data: string;
    customClick: any;
}

interface EmptyStateProps {
    customClickEmpty: any;
}

const ValueOnList = ({customClick, data, isSelected}:ValueOnListProps) => {
    return(
        <div onClick={()=>{ customClick(data) }} className={twMerge([
            "transition w-full h-[10vh] cursor-pointer flex justify-between items-center gap-3 p-3 bg-white hover:bg-slate-200"
        ])}>
            <div className='w-12 h-12 overflow-hidden rounded-lg'>
                <img className='w-full h-full object-cover' src='https://lh3.googleusercontent.com/p/AF1QipOomBD5VxbeoFKUsFx-BpnuAzKKHxIv9kF2YWK4=w768-h768-n-o-v1' />
            </div>
            <div className="w-[75%] h-full flex flex-col justify-center items-start">
                <p className='font-semibold text-gray-950 text-[0.9rem]'>Hospital Nro. 1</p>
                <p className='font-light text-gray-600 text-sm'>Av. La gracias, Calle 4, Ciudad de México, México</p>
            </div>
            <div className="w-[10%] h-full flex flex-col justify-center items-center">
                <span className={twMerge([
                    'transition w-8 h-8 border rounded-full flex flex-col justify-center items-center bg-transparent text-transparent',
                    isSelected && "bg-green-600 text-white"
                ])}>
                    <FiCheck/>
                </span>
            </div>
        </div>
    )
}

const EmptyList = ({
    customClickEmpty
    }:EmptyStateProps) => {
    return(
        <div className='w-full text-center h-full flex flex-col justify-center items-center gap-2 p-4'>
            <p className='font-semibold text-lg text-slate-950 w-[50%]'>Sin resultados</p>
            <p className='font-light text-sm text-slate-500 w-[70%]'>Tal parece que tu centro médico no existe en nuestra plataforma, lo sentimos</p>
            <div 
            onClick={customClickEmpty}
            className='w-full hover:bg-slate-200 transition py-2 bg-white rounde-md cursor-pointer font-normal text-base text-primary flex justify-center items-center gap-2'>
                <p>Agregar mi nuevo consultorio</p>
                <FiPlus/>
            </div>
        </div>
    )
}
  
const SearchLocality = ({
        customClick,
        customClickEmpty,
        list,
        placeholder,
        selectedItem
    }:SearchLocalityProps) => {

    const [active, setActive] = useState(false)
    const searchbox: Variants = {
        active: { translateY: 0, opacity: 1, visibility: "visible"},
        disabled: { translateY: 10, opacity: 0, visibility: "hidden"}
    };

    return (
        <div className={twMerge([
            "w-[70%] h-full relative block" 
        ])}>
            <FormInput
                type='text'
                onBlur={() => setActive(false)}
                onFocus={() => setActive(true)}
                className="w-full form-control" 
                placeholder={placeholder} 
                onChange={(e)=>{ console.log(e.target.value) }} 
            />
            <motion.div 
            variants={searchbox}
            animate={active ? "active" : "disabled"}
            className={twMerge([
                "absolute top-10 right-0 w-[30rem] bg-white border rounded-md border-slate-100 shadow-md"
            ])}>
                <div className="max-h-[30vh] min-h-[10vh] h-fit overflow-y-auto">
                    {list.length === 0 ? <EmptyList customClickEmpty={customClickEmpty} /> : list.map((value, i) => <ValueOnList data={value} isSelected={selectedItem === value} customClick={customClick} /> )}
                </div>
                {list.length > 0 && 
                    <div 
                    onClick={customClickEmpty}
                    className={twMerge([
                        "transition w-full flex justify-end items-center p-4 border-t border-slate-200 hover:bg-slate-200"
                    ])}>
                        <p className='font-light text-sm text-primary cursor-pointer'>No encuentro mi centro médico</p>
                    </div>
                }
            </motion.div>
        </div>
    )
}

export default SearchLocality