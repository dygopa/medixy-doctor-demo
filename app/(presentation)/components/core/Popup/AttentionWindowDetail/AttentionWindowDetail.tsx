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
import { FiBriefcase, FiCheck, FiHome, FiLock, FiUnlock, FiUser } from "react-icons/fi";
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
import { useSearchParams, useRouter } from "next/navigation";
import SlotComponent from "./Slot/Slot";
import Reschedule from "./Reschedule/Reschedule";

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
  const { 
    data: deleteData, 
    loading: deleteLoading, 
    successful: successfulDelete, 
    error: errorDelete 
  } = state.deleteAppointment;
  const { 
    loading: rescheduleLoading, 
    successful: rescheduleSuccessful,
  } = state.rescheduleAppointment;
  const { data: statusPopup } = state.statusPopup;

  const searchParams = useSearchParams()
  const router = useRouter()

  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [appointment, setAppointment] = useState({});

  useMemo(() => {
    if (searchParams.get("attentionWindowId")) {
      getSlotsByAttentionWindow(searchParams.get("attentionWindowId"))(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  useMemo(() => {
    if (rescheduleSuccessful) {
      getSlotsByAttentionWindow(searchParams.get("attentionWindowId"))(dispatch)
      setShowRescheduleModal(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rescheduleSuccessful]);

  useMemo(()=>{
    if(successfulDelete && searchParams.get("attentionWindowId")){
      getSlotsByAttentionWindow(searchParams.get("attentionWindowId"))(dispatch)
    }
  },[successfulDelete])

  useMemo(()=>{
    if(!statusPopup){
      router.replace(`/schedule/configuration`)
    }
  },[statusPopup])

  return (
    <div
      ref={customRef}
      className="w-full md:w-[60%] lg:w-[40%] h-screen  md:min-h-[60vh] md:max-h-[90vh] lg:min-h-[60vh] lg:max-h-[90vh] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 pb-0 gap-8"
    >
      {!showRescheduleModal ?
        <>
          <div className="w-full flex flex-col justify-start items-start">
            <p className="font-bold text-2xl text-slate-900">Ventana de atención</p>
            <p className="font-light text-sm text-slate-500">Si necesitas bloquear un cupo especifico en esta ventana de atención puedes hacerlo aquí.</p>
          </div>

          {loading && <div className="w-full flex flex-col justify-center items-center gap-2">
            <Loading />
            <p className="text-center font-normal text-base text-slate-500">Cargando los slots de atención de este horario...</p>
          </div>}

          {(!loading && [...(data as any[])].length > 0) && <div className="w-full flex flex-col justify-start items-center gap-2">
            {[...(data as any[])].map((elem: any, i: number) => 
              <SlotComponent
                rescheduleClick={()=>{ setAppointment(elem); setShowRescheduleModal(true) }}
                key={i}
                data={elem}
              />
            )}
          </div>}

          <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white">
            <Button
              disabled={false}
              onClick={() => { cancelFuntion() }}
              variant="primary"
              type="button"
              className="w-full"
            >
              Regresar
            </Button>
          </div>
        </>
        : 
        <Reschedule
          appointment={appointment}
          showRescheduleModal={showRescheduleModal}
          setShowRescheduleModal={setShowRescheduleModal}
        />
      }
    </div>
  );
}

export default AttentionWindowDetail;
