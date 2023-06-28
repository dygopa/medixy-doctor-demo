import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormSelect } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useContext, useEffect, useMemo } from "react";
import { IScheduleContext, ScheduleContext } from "../../context/ScheduleContext";
import { IPopupContext, PopupContext } from "(presentation)/components/core/BaseComponents/Popup/context/PopupContext";
import { AuthContext, IAuthContext } from "(presentation)/(layouts)/AppLayout/context/AuthContext";

export default function Navigator() {
     
  const { state: auth} = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser} = auth.getUserAuthenticated;

  const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
  const { changeTypePopup, changeStatusPopup, getLocalities, getServices} = actions;
  const { data } = state.typePopupActive;
  const { data: localities, successful: localitiesSuccessful, loading: localitiesLoading } = state.getLocalities;
  const { data: services, successful: servicesSuccessful, loading: servicesLoading } = state.getServices;

  const { actions: actionsPopup, dispatch: dispatchPopup } = useContext<IPopupContext>(PopupContext);
  const { changeChildrenPopup, changeStatusPopup: showPopup } = actionsPopup;

  useMemo(() => {
    if (loadedUser){
      getServices(user.userId)(dispatch)
      getLocalities(user.userId)(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedUser]);

  return (
    <div className="w-full flex flex-col lg:flex-row flex-wrap lg:flex-nowrap justify-between items-end gap-5">
      <div className="w-full lg:w-2/4 relative flex flex-col justify-between items-start gap-2">
        <h2 className="mr-5 text-2xl font-bold truncate">Configuración de la agenda</h2>
        <p>Mantén un seguimiento de tus citas médicos y asegúrate de estar preparado para cada consulta</p>
      </div>
      <div className="w-full lg:w-fit flex flex-col lg:flex-row justify-start flex-wrap lg:flex-nowrap lg:justify-end items-center gap-2 h-full">
        {(localities && ([...(localities as any[])].length > 0) && (services && [...(services as any[])].length > 0)) && <>
          <Button onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(1)(dispatch) }} variant="primary" type="button" className="w-full lg:w-fit">
            <Lucide icon="Plus" className="w-5 h-5 mr-2" />Nueva venta de atención
          </Button>
          <div onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(4)(dispatch)  }} className="cursor-pointer w-10 h-10 flex flex-col justify-center items-center bg-primary/10 hover:bg-primary/20 transition rounded-md">
            <Lucide icon={"Filter"} className="w-5 h-5" />
          </div>
        </>}
      </div>
    </div>
  );
}
