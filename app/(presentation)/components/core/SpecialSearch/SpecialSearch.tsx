import React, { MouseEventHandler, useState } from 'react'
import { FiBriefcase, FiCheck, FiHome, FiPlus, FiUser } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { Variants, motion } from 'framer-motion';
import { FormInput } from '../BaseComponents/Form';

interface SpecialSearchProps {
    selectedItem: any;
    customClick: Function;
    customClickEmpty: any;
    list: any[];
    placeholder?: string | any;
}

interface ValueOnListProps {
    isSelected: Boolean; 
    data: any;
    customClick: Function;
}

interface EmptyStateProps {
    customClickEmpty: any;
}

const ValueOnList = ({customClick, data, isSelected}:ValueOnListProps) => {
    return(
        <div onClick={()=>{ customClick(data) }} className={twMerge([
            "transition w-full h-[10vh] cursor-pointer flex justify-between items-center gap-3 p-3 bg-white hover:bg-slate-200"
        ])}>
            <div className='w-12 h-12 overflow-hidden rounded-lg bg-primary/20 text-primary text-lg flex flex-col justify-center items-center'>
                {data["type"] === "SERVICE" && <FiBriefcase/>}
                {data["type"] === "PATIENT" && <FiUser/>}
                {data["type"] === "LOCALITY" && <FiHome/>}
            </div>
            <div className="w-[90%] h-full flex flex-col justify-center items-start">
                <p className='font-semibold text-gray-950 text-[0.9rem]'>{data["title"]}</p>
                <p className='font-light text-gray-600 text-sm'>{data["description"]}</p>
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
            <p className='font-light text-sm text-slate-500 w-[70%]'>Tal parece que no hay resultados en tu busqueda, lo sentimos</p>
        </div>
    )
}
  
export default function SpecialSearch({
    customClick,
    customClickEmpty,
    list,
    placeholder,
    selectedItem
}:SpecialSearchProps){

    const [active, setActive] = useState(false)
    const searchbox: Variants = {
        active: { translateY: 0, opacity: 1, visibility: "visible"},
        disabled: { translateY: 10, opacity: 0, visibility: "hidden"}
    };

    let [searchedList, setSearchedList] = useState([...list as any[]])

    function handleSearch(value:string){
        if(value !== ""){
            let l = list
            l = l.filter(elem => elem["title"].toLowerCase().includes(value.toLocaleLowerCase()) )
            setSearchedList(l)
        }else{
            setSearchedList(list)
        }
    }

    return (
        <div className={twMerge([
            "w-full h-full relative block" 
        ])}>
            <FormInput
                type='text'
                onBlur={() => setTimeout(() => {
                    setActive(false)
                }, 500)}
                onFocus={() => setActive(true)}
                className="w-full form-control" 
                placeholder={placeholder} 
                onChange={(e)=>{ handleSearch(e.target.value) }} 
            />
            <motion.div 
            variants={searchbox}
            animate={active ? "active" : "disabled"}
            className={twMerge([
                "absolute top-10 right-0 w-full bg-white border rounded-md border-slate-100 shadow-md z-[20]"
            ])}>
                <div className="max-h-[30vh] min-h-[10vh] h-fit overflow-y-auto">
                    {searchedList.length === 0 ? <EmptyList customClickEmpty={customClickEmpty} /> : searchedList.map((elem, i) => <ValueOnList data={elem} isSelected={selectedItem === elem} customClick={customClick} /> )}
                </div>
            </motion.div>
        </div>
    )
}