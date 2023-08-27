import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import Link from "next/link";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FiBriefcase, FiCheck, FiHome, FiLock, FiUser } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import SpecialSearch from "(presentation)/components/core/SpecialSearch/SpecialSearch";
import { IService } from "domain/core/entities/serviceEntity";
import { ISubject } from "domain/core/entities/subjectEntity";
import Loading from "(presentation)/components/core/Loading/Loading";
import moment from "moment";
import "moment/locale/es";
import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import { ILocality } from "domain/core/entities/localityEntity";
import { useSearchParams } from "next/navigation";

function AttentionWindowDetail({
  cancelFuntion,
  customRef,
}: {
  cancelFuntion: Function;
  customRef: React.LegacyRef<HTMLDivElement>;
}) {

  const { state: auth } = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser } = auth.getUserAuthenticated;

  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    getSlotsByAttentionWindow
  } = actions;
  const {
    data,
    loading,
    successful,
    error
  } = state.slotsByAttentionWindow;

  const searchParams = useSearchParams()

  const SlotComponent = ({data}:{data:any}) => {
    
    let isFree = !data["Sujetos"]

    return(
      <div onClick={()=>{}} className="w-full border border-slate-200 bg-white relative flex flex-col p-3 rounded">
        <div className="w-full flex justify-between items-center">
          <p className="text-slate-900 text-base font-semibold">{isFree ? "Disponible" : `${data["Sujetos"]["nombre"]}`}</p>
          <div className={twMerge([
            "transition w-fit h-fit flex justify-center items-center gap-2 text-sm px-5 py-1 cursor-pointer",
            "rounded border text-slate-900 bg-white",
            "hover:bg-slate-200"
          ])}>
            <FiLock/>
            <p>Bloquear</p>
          </div>
        </div>
        <div className="w-full flex justify-between items-start">
          <p>{moment(data["fechaReserva"]).utc().format("hh:mm a")} - {moment(data["fechaFinReserva"]).utc().format("hh:mm a")}</p>
        </div>
      </div>
    )
  }

  useMemo(() => {
    if (searchParams.get("attentionWindowId")) {
      getSlotsByAttentionWindow(searchParams.get("attentionWindowId"))(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div
      ref={customRef}
      className="w-full md:w-[60%] lg:w-[40%] h-screen  md:min-h-[60vh] md:max-h-[90vh] lg:min-h-[60vh] lg:max-h-[90vh] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 pb-0 gap-8"
    > 
      <div className="w-full flex flex-col justify-start items-start">
        <p className="font-bold text-2xl text-slate-900">Ventana de atención</p>
        <p className="font-light text-sm text-slate-500">Si necesitas bloquear un cupo especifico en esta ventana de atención puedes hacerlo aquí.</p>
      </div>

      {loading && <div className="w-full flex flex-col justify-center items-center gap-2">
        <Loading />
        <p className="text-center font-normal text-base text-slate-500">Cargando los slots de atención de este horario...</p>
      </div>}

      {(!loading && [...(data as any[])].length > 0) && <div className="w-full flex flex-col justify-start items-center gap-2">
        {[...(data as any[])].map((elem: any, i:number) => <SlotComponent key={i} data={elem} />)}
      </div>}

      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white">
        <Button
          disabled={false}
          onClick={() => { }}
          variant="primary"
          type="button"
          className="w-full"
        >
          Guardar
        </Button>
        <p
          onClick={() => { }}
          className="cursor-pointer font-normal text-sm text-primary text-center"
        >
          Cancelar
        </p>
      </div>
    </div>
  );
}

export default AttentionWindowDetail;
