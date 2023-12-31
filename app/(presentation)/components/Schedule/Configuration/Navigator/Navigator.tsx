import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useContext, useMemo, useState } from "react";
import {
  IScheduleContext,
  ScheduleContext,
} from "../../context/ScheduleContext";
import {
  IPopupContext,
  PopupContext,
} from "(presentation)/components/core/BaseComponents/Popup/context/PopupContext";
import {
  SpecialSelect,
  SpecialSelectSchedule,
} from "(presentation)/components/core/SpecialSearch/SpecialSearch";
import { useRouter, useSearchParams } from "next/navigation";
import moment from "moment";
import { ColorsEnum } from "(presentation)/(enum)/colors/colorsEnum";
import { IUser } from "domain/core/entities/userEntity";

function formatHour(value: number) {
  let h: string = value.toString();
  let divided = h.split("");

  let hours =
    divided.length > 3 ? `${divided[0]}${divided[1]}` : `0${divided[0]}`;
  let minutes =
    divided.length > 3
      ? `${divided[2]}${divided[3]}`
      : `${divided[1]}${divided[2]}`;

  return { hours, minutes };
}

interface INavigatorProps {
  user: IUser;
}

export default function Navigator({ user }: INavigatorProps) {
  let router = useRouter();
  const params = useSearchParams();

  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    activeLocality,
    getAttentionWindowsByLocalities,
    getAttentionWindows,
    changeTypePopup,
    changeStatusPopup,
    getLocalities,
    getBaseAttentionWindowsByLocality,
    getBaseAttentionWindows,
    setListOfColors,
  } = actions;
  const { data: locality } = state.activeLocality;
  const { data } = state.typePopupActive;
  const {
    data: localities,
    successful: localitiesSuccessful,
    loading: localitiesLoading,
  } = state.getLocalities;
  const {
    data: services,
    successful: servicesSuccessful,
    loading: servicesLoading,
  } = state.getServices;

  const {
    data: baseAttentionWindows,
    successful: baseAttentionWindowsSuccessful,
    loading: baseAttentionWindowsLoading,
  } = state.getBaseAttentionWindowsByLocality;

  const { actions: actionsPopup, dispatch: dispatchPopup } =
    useContext<IPopupContext>(PopupContext);
  const { changeChildrenPopup, changeStatusPopup: showPopup } = actionsPopup;

  const [listOfLocalities, setListOfLocalities] = useState([]);
  const [listOfBaseAttentionWindows, setListOfBaseAttentionWindows] = useState(
    []
  );

  const [selectedLocality, setSelectedLocality] = useState<{
    id: string | number;
    title: string;
    description: string;
  }>({
    id: "",
    title: "",
    description: "",
  });
  const [selectedBaseAttentionWindow, setSelectedBaseAttentionWindow] =
    useState({
      id: "",
      title: "",
      description: "",
    });

  function handleFormatList() {
    let list_localities = localities.map((elem: any) => ({
      id: elem.id,
      title: elem.name,
      description:
        elem["address"] && elem["address"]["postal_code"]
          ? elem["address"]["postal_code"]
          : "Sin dirección",
    }));

    list_localities.unshift({
      id: "ALL",
      title: "Todos los consultorios",
      description: "Filtrar por todos los consultorios disponibles",
    });

    setListOfLocalities(list_localities);
  }

  function handleFormatListAttentionWindows() {
    let list_base_attention_windows = baseAttentionWindows.map(
      (elem: any, i: number) => {
        let { hours: startHour, minutes: startMinutes } = formatHour(
          elem["VentanasAtencionBase"]["horaInicio"]
        );
        let { hours: endHour, minutes: endMinutes } = formatHour(
          elem["VentanasAtencionBase"]["horaFin"]
        );

        let startDate = moment(
          elem["VentanasAtencionBase"]["fechaInicio"]
        ).format("DD-MM-YYYY");
        let endDate = moment(elem["VentanasAtencionBase"]["fechaFin"]).format(
          "DD-MM-YYYY"
        );

        return {
          id: elem["ventanaAtencionBaseId"],
          title: `Horario: ${startHour}:${startMinutes} - ${endHour}:${endMinutes}`,
          description: `${startDate} - ${endDate}`,
          color: ColorsEnum[i],
        };
      }
    );

    list_base_attention_windows.push({
      id: "ALL",
      title: "Todos los horarios",
      description: "Filtrar por todos los horarios disponibles",
    });

    setListOfColors(
      list_base_attention_windows.map((elem: any) => ({
        ventanaAtencionBaseId: elem["id"],
        color: elem["color"],
      }))
    )(dispatch);
    setSelectedBaseAttentionWindow({
      id: "ALL",
      title: "Todos los horarios",
      description: "Filtrar por todos los horarios disponibles",
    });

    setListOfBaseAttentionWindows(list_base_attention_windows);

    if (localities && localities.length > 0) {
      const localitiesIds = localities.map((locality: any) => locality.id);

      getAttentionWindowsByLocalities(
        selectedLocality.id !== "ALL" ? [selectedLocality.id] : localitiesIds
      )(dispatch);
    }
  }

  useMemo(() => {
    setSelectedBaseAttentionWindow({
      id: "",
      title: "",
      description: "",
    });
    activeLocality(selectedLocality)(dispatch);
    if (selectedLocality.id === "ALL") {
      getBaseAttentionWindows(
        user.userId,
        moment().format("YYYY-MM-DD")
      )(dispatch);
    } else if (selectedLocality.id > 0) {
      getBaseAttentionWindowsByLocality(selectedLocality.id)(dispatch);
    }

    //setTimeout(() => {
    //  router.replace(`/schedule/configuration?service=${selectedLocality.id}`)
    //}, 0);
  }, [selectedLocality]);

  useMemo(() => {
    if (localitiesSuccessful && localities.length > 0) {
      handleFormatList();
      let localityFinded = {
        id: "ALL",
        name: "Todos los consultorios",
        description: "Selecciona un consultorio de la lista",
        type: "LOCALITY",
      };

      if (params.get("locality")) {
        let id = params.get("locality")?.toString();
        const localityFindedItem = [...localities].find(
          (elem: any) => elem["id"] === parseInt(id!)
        );
        if (localityFindedItem)
          localityFinded = {
            ...localityFindedItem,
            description:
              localityFindedItem["address"] &&
              localityFindedItem["address"]["postal_code"]
                ? localityFindedItem["address"]["postal_code"]
                : "Sin dirección",
          };
      }
      activeLocality({
        id: localityFinded["id"],
        title: localityFinded["name"],
        description: localityFinded["description"],
        type: "LOCALITY",
      })(dispatch);
      setSelectedLocality({
        id: localityFinded["id"],
        title: localityFinded["name"],
        description: localityFinded["description"],
      });
    }
  }, [params.get("locality"), localities]);

  useMemo(() => {
    if (baseAttentionWindowsSuccessful) handleFormatListAttentionWindows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseAttentionWindowsLoading]);

  useMemo(() => {
    if (user) {
      getLocalities(user.userId)(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="w-full flex flex-col flex-wrap justify-start items-start gap-5">
      <div className="w-full md:flex flex-row justify-between items-center gap-2 sticky top-[67px] z-[50]  bg-slate-100 py-3">
        <div className="w-full md:w-[50%]">
          <h2 className="mr-5 text-2xl font-bold truncate">
            Configuración de la agenda
          </h2>
          <p>
            Mantén un seguimiento de tus citas médicos y asegúrate de estar
            preparado para cada consulta
          </p>
        </div>
        {localities && [...(localities as any[])].length > 0 && (
          <Button
            onClick={() => {
              changeStatusPopup(true)(dispatch);
              changeTypePopup(1)(dispatch);
            }}
            variant="primary"
            type="button"
            className="w-full mt-2 md:mt-0 md:w-auto"
          >
            <Lucide icon="plus" color="#fff" className="w-5 h-5 mr-2" />
            Nueva ventana de atención
          </Button>
        )}
      </div>
      <div className="w-full flex flex-row justify-center flex-wrap lg:justify-start items-center gap-2 h-full">
        {localities && [...(localities as any[])].length > 0 && (
          <>
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
          </>
        )}
        {baseAttentionWindowsSuccessful &&
          [...(baseAttentionWindows as any[])].length > 0 &&
          localities &&
          [...(localities as any[])].length > 0 && (
            <div className="w-full flex lg:w-[25%] lg:h-full">
              <SpecialSelectSchedule
                emptySelectedValue={{
                  title: "Horario",
                  description: "Selecciona un horario de la lista",
                }}
                customClick={(value: any) => {
                  setSelectedBaseAttentionWindow(value);
                  console.log(value);
                  const localitiesIds = localities.map(
                    (locality: any) => locality.id
                  );
                  if (value["id"] === "ALL") {
                    getAttentionWindowsByLocalities(localitiesIds)(dispatch);
                  } else {
                    getAttentionWindows([value["id"]])(dispatch);
                  }
                }}
                selectedItem={selectedBaseAttentionWindow}
                list={listOfBaseAttentionWindows}
              />
            </div>
          )}
      </div>
    </div>
  );
}
