import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormSelect } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useContext, useEffect, useMemo, useState } from "react";
import { IScheduleContext, ScheduleContext } from "../../context/ScheduleContext";
import { IPopupContext, PopupContext } from "(presentation)/components/core/BaseComponents/Popup/context/PopupContext";
import { AuthContext, IAuthContext } from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import { SpecialSelect } from "(presentation)/components/core/SpecialSearch/SpecialSearch";
import { useRouter } from "next/navigation";
import { ILocality } from "domain/core/entities/localityEntity";

export default function Navigator() {
     
  let router = useRouter()

  const { state: auth} = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser} = auth.getUserAuthenticated;

  const { state, actions, dispatch } = useContext<IScheduleContext>(ScheduleContext);
  const { activeLocality, getAttentionWindows, changeTypePopup, changeStatusPopup, getLocalities} = actions;
  const { data: locality } = state.activeLocality;
  const { data } = state.typePopupActive;
  const { data: localities, successful: localitiesSuccessful, loading: localitiesLoading } = state.getLocalities;

  const { actions: actionsPopup, dispatch: dispatchPopup } = useContext<IPopupContext>(PopupContext);
  const { changeChildrenPopup, changeStatusPopup: showPopup } = actionsPopup;

  const [listOfLocalities, setListOfLocalities] = useState([]);

  const [selectedLocality, setSelectedLocality] = useState({
    id: 0,
    title: "",
    description: "",
  });

  function handleFormatList() {
    let list_localities = localities.map((elem: ILocality) => ({
      id: elem.id,
      title: elem.name,
      description: elem.address ? elem.address : "Sin dirección",
    }));

    setListOfLocalities(list_localities);
  }

  useMemo(() => {
    if (selectedLocality.id > 0) {
      activeLocality(selectedLocality)(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocality]);
  
  useMemo(() => {
    if (selectedLocality.id > 0) {
      getAttentionWindows(selectedLocality.id, "LOCALITY")(dispatch);
      //setTimeout(() => {
      //  router.replace(`/schedule/configuration?service=${selectedLocality.id}`)
      //}, 0);
    }
  }, [selectedLocality]);

  useMemo(() => {
    if (localitiesSuccessful) handleFormatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localitiesSuccessful]);

  useMemo(() => {
    if (loadedUser){
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
        {(localities && ([...(localities as any[])].length > 0)) && <>
          <div className="w-full flex lg:w-[25%] lg:h-full">
            <SpecialSelect
              emptySelectedValue={{
                title: "Consultorio",
                description: "Selecciona un consultorio de la lista",
              }}
              customClick={(value: any) => {
                setSelectedLocality(value);
              }}
              selectedItem={locality}
              list={listOfLocalities}
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
