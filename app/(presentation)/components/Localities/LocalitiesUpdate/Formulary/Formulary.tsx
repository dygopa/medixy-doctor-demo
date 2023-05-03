import { ClassicEditor } from "(presentation)/components/core/BaseComponents/Ckeditor";
import {
    FormInput,
    FormSelect,
    FormTextarea,
    FormSwitch
  } from "(presentation)/components/core/BaseComponents/Form";
import SearchLocality from "(presentation)/components/core/SearchLocality/SearchLocality";
import { useState, useEffect, SetStateAction, useContext, useMemo } from "react";
import { FiCheck, FiCheckCircle, FiX } from "react-icons/fi";
import { BiBuildingHouse } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { ILocalitiesContext, LocalitiesContext } from "../../context/LocalitiesContext";
import { ILocality } from "domain/core/entities/localityEntity";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { usePathname, useRouter } from "next/navigation";
  
export default function Formulary({userId}:{
    userId:string;
}) {

    const pathname = usePathname();
  
    const { state, actions, dispatch } = useContext<ILocalitiesContext>(LocalitiesContext);
    const { gettingUserLocality, updateUserLocality} = actions
    const { 
      data, 
      loading, 
      successful, 
      error 
    } = state.gettingUserLocality;
    const { 
      data: dataUpdate, 
      loading: loadingUpdate, 
      successful: successfulUpdate, 
      error: errorUpdate 
    } = state.updateUserLocality;  
  
    let [formData, setFormData] = useState({} as ILocality)
  
    useMemo(() => {
      if(userId){
        const url = pathname?.split("/")
        let id = url![url!.length - 1]
        gettingUserLocality(parseInt(id), userId)(dispatch)
      }
    }, [userId, pathname]);
  
    useMemo(()=> setFormData(data as unknown as ILocality),[successful])

    return (
        <>
            <AlertComponent variant="error" show={errorUpdate !== null} description="Ha ocurrido un error inesperado en la actualización" />
            <AlertComponent variant="success" show={successfulUpdate} description="Tu consultorio se ha actualizado exitosamente" />

            <div className="w-full flex justify-between items-start">
                <h2 className="mr-5 text-2xl font-bold truncate">Actualizar consultorio</h2>
                <div className="w-[20%] flex justify-center items-center">
                <Button disabled={loadingUpdate} onClick={()=>{
                    updateUserLocality({...formData, state: formData.state.name})(dispatch)
                    //console.log(formData)
                }} variant="primary" className="w-full">{loadingUpdate ? "Actualizando..." : "Actualizar"}</Button>
                </div>
            </div>
            <div className="flex mt-5">
                <div className="relative flex justify-center items-start gap-4 w-full">
                    <div className="bg-white w-[70%] shadow-xl shadow-slate-100 rounded-md h-fit p-5">
                        
                        <div className="border w-full rounded-md p-5 flex">
                            <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
                                <div className="w-full border-b mb-2">
                                    <p className="font-medium text-base text-slate-900 pb-2">Definición del consultorio</p>
                                </div>
                                <div className="flex justify-between items-start relative w-full gap-3">
                                    <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">Nombre del consultorio</p>
                                    <FormInput
                                        type={"text"}
                                        placeholder="Escribe el nombre del consultorio..."
                                        min={0}
                                        value={formData?.name}
                                        className="form-control w-[70%]"
                                        onChange={(e:any) => {
                                            setFormData({...formData, name: e.target.value})
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between items-start relative w-full gap-3">
                                    <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">Nro. de consultorio</p>
                                    <FormInput
                                        type={"text"}
                                        placeholder="Escribe el número del consultorio..."
                                        min={0}
                                        value={formData?.code}
                                        className="form-control w-[70%]"
                                        onChange={(e:any) => {
                                            setFormData({...formData, code: e.target.value})
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between items-start relative w-full gap-3">
                                    <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">CLUES</p>
                                    <FormInput
                                        type={"text"}
                                        placeholder="Escribe el CLUES del consultorio..."
                                        min={0}
                                        value={formData?.clues}
                                        className="form-control w-[70%]"
                                        onChange={(e:any) => {
                                            setFormData({...formData, clues: e.target.value})
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between items-start relative w-full gap-3">
                                    <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">Dirección</p>
                                    <FormInput
                                        type={"text"}
                                        placeholder="Escribe la dirección del consultorio..."
                                        min={0}
                                        value={formData?.address}
                                        className="form-control w-[70%]"
                                        onChange={(e:any) => {
                                            setFormData({...formData, address: e.target.value})
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between items-center relative w-full gap-3">
        
                                </div>
                                <div className="flex justify-between items-start relative w-full gap-3">
                                    <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">Cargar imagen
                                        <span className="text-primary font-bold">*</span>
                                    </p>
                                    <FormInput
                                        type="file"
                                        className="form-control w-[70%]"
                                    />
                                </div>
                            </div>
                        </div>
        
                    </div>
                
                </div>
            </div>
        </>
    );
  }
  