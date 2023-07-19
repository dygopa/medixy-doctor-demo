import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormSelect } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useContext, useEffect, useMemo, useState } from "react";
import { IScheduleContext, ScheduleContext } from "../../context/ScheduleContext";
import { IPopupContext, PopupContext } from "(presentation)/components/core/BaseComponents/Popup/context/PopupContext";
import { AuthContext, IAuthContext } from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import { SpecialSelect } from "(presentation)/components/core/SpecialSearch/SpecialSearch";
import { IService } from "domain/core/entities/serviceEntity";
import { useRouter } from "next/navigation";

export default function Navigator() {
     
  let router = useRouter()

  const { state: auth} = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser} = auth.getUserAuthenticated;

  const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
  const { activeService, getAttentionWindows, changeTypePopup, changeStatusPopup, getLocalities, getServices} = actions;
  const { data: service } = state.activeService;
  const { data } = state.typePopupActive;
  const { data: localities, successful: localitiesSuccessful, loading: localitiesLoading } = state.getLocalities;
  const { data: services, successful: servicesSuccessful, loading: servicesLoading } = state.getServices;

  const { actions: actionsPopup, dispatch: dispatchPopup } = useContext<IPopupContext>(PopupContext);
  const { changeChildrenPopup, changeStatusPopup: showPopup } = actionsPopup;

  const [listOfServices, setListOfServices] = useState([]);

  const [selectedService, setSelectedService] = useState({
    id: 0,
    title: "",
    description: "",
  });

  function handleFormatList() {
    let list_services = services.map((elem: IService) => ({
      id: elem.id,
      title: elem.name,
      description: elem.locality ? elem.locality.address : "Sin consultorio",
    }));

    setListOfServices(list_services);
  }

  useMemo(() => {
    if (selectedService.id > 0) {
      activeService(selectedService)(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedService]);
  
  useMemo(() => {
    if (selectedService.id > 0) {
      getAttentionWindows(selectedService.id, "")(dispatch);
      setTimeout(() => {
        router.replace(`/schedule/configuration?service=${selectedService.id}`)
      }, 0);
    }
  }, [selectedService]);

  useMemo(() => {
    if (servicesSuccessful) handleFormatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servicesSuccessful]);

  useMemo(() => {
    if (loadedUser){
      getServices(user.userId)(dispatch)
      getLocalities(user.userId)(dispatch)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedUser]);

  return (
    <div className="w-full flex flex-col flex-wrap justify-start items-start gap-5">
      <div className="w-full lg:w-2/4 relative flex flex-col justify-between items-start gap-2">
        <h2 className="mr-5 text-2xl font-bold truncate">Configuración de la agenda</h2>
        <p>Mantén un seguimiento de tus citas médicos y asegúrate de estar preparado para cada consulta</p>
      </div>
      <div className="w-full flex flex-row justify-center flex-wrap lg:justify-between items-center gap-2 h-full">
        {(localities && ([...(localities as any[])].length > 0) && (services && [...(services as any[])].length > 0)) && <>
          <div className="w-full flex lg:w-[25%] lg:h-full">
            <SpecialSelect
              emptySelectedValue={{
                title: "Servicio",
                description: "Selecciona un servicio de la lista",
              }}
              customClick={(value: any) => {
                setSelectedService(value);
              }}
              selectedItem={service}
              list={listOfServices}
            />
          </div>
          <Button onClick={()=>{ changeStatusPopup(true)(dispatch); changeTypePopup(1)(dispatch) }} variant="primary" type="button" className="w-[85%] lg:w-fit">
            <Lucide icon="Plus" className="w-5 h-5 mr-2" />Nueva venta de atención
          </Button>
        </>}
      </div>
    </div>
  );
}
