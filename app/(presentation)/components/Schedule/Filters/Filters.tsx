import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { IScheduleContext, ScheduleContext } from "../context/ScheduleContext";
import { SpecialSelect } from "(presentation)/components/core/SpecialSearch/SpecialSearch";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { IUser } from "domain/core/entities/userEntity";

interface IFiltersProps {
  user: IUser;
  selectedLocality: {
    id: number;
    title: string;
    description: string;
  };
  setSelectedLocality: Dispatch<
    SetStateAction<{
      id: number;
      title: string;
      description: string;
    }>
  >;
}

function Filters({
  user,
  selectedLocality,
  setSelectedLocality,
}: IFiltersProps) {
  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    changeTypePopup,
    getCalendarEvents,
    changeStatusPopup,
    predifinedReservationData,
    getLocalities,
    getAttentionWindows,
    activeLocality,
    activeService,
    getServicesByLocality,
  } = actions;
  const { data: locality } = state.activeLocality;
  const { data: service } = state.activeService;

  const { data: localities, successful: loadedLocalities } =
    state.getLocalities;
  const {
    data: services,
    loading: loadingServices,
    successful: loadedServices,
  } = state.getServicesByLocality;
  const { data: activeDay, successful: changedActiveDay } = state.activeDay;

  const params = useSearchParams();

  const [listOfLocalities, setListOfLocalities] = useState([]);
  const [listOfServices, setListOfServices] = useState([]);

  const [selectedService, setSelectedService] = useState({
    id: "",
    title: "",
    description: "",
  });

  function handleFormatList() {
    let list_localities = localities.map((elem: any) => ({
      id: elem.id,
      title: elem.name,
      description: `${
        elem.address.municipality
          ? elem.address.municipality.name
          : "Sin dirección"
      } ${
        elem.address.country_location
          ? `- ${elem.address.country_location.name}`
          : ""
      }`,
    }));

    setListOfLocalities(list_localities);
  }
  function handleFormatListServices() {
    let list_services = services.map((elem: any) => ({
      id: elem.id,
      title: elem.name,
      description: elem.service_category.name,
    }));

    list_services.push({
      id: "ALL",
      title: "Todos los Servicios",
      description: "Filtrar por todos los servicios disponibles",
    });

    setSelectedService({
      id: "ALL",
      title: "Todos los Servicios",
      description: "Filtrar por todos los servicios disponibles",
    });

    setListOfServices(list_services);
  }

  useMemo(() => {
    if (loadedLocalities && localities.length > 0) {
      if (params.get("locality")) {
        let id = params.get("locality")?.toString();
        let localityFinded = [...localities].find(
          (elem: any) => elem["id"] === parseInt(id!)
        );
        if (localityFinded) {
          setSelectedLocality({
            id: localityFinded["id"],
            title: localityFinded["name"],
            description: localityFinded["address"],
          });
        }
        getServicesByLocality(user.userId, params.get("locality"))(dispatch);
      } else {
        setSelectedLocality({
          id: localities[0]["id"],
          title: localities[0]["name"],
          description: localities[0]["address"],
        });
        getServicesByLocality(user.userId, localities[0].id)(dispatch);
      }
    }
  }, [loadedLocalities, localities]);

  useMemo(() => {
    if (loadedLocalities) handleFormatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedLocalities]);

  useMemo(() => {
    if (loadedServices) {
      handleFormatListServices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services]);

  useMemo(() => {
    if (user) {
      getLocalities(user.userId)(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="w-full h-fit mt-4 flex flex-col justify-center items-start gap-4">
      <div className="w-full lg:h-[5vh] flex flex-col lg:flex-row flex-wrap lg:flex-nowrap items-center lg:gap-0 gap-3">
        <div className="w-full flex lg:w-[25%] lg:h-full">
          <SpecialSelect
            emptySelectedValue={{
              title: "Consultorio",
              description: "Selecciona un consultorio de la lista",
            }}
            customClick={(value: any) => {
              setListOfServices([]);
              setSelectedService({
                id: "",
                title: "",
                description: "",
              });
              setSelectedLocality(value);
              activeLocality(value)(dispatch);
              getServicesByLocality(user.userId, value["id"])(dispatch);
              getCalendarEvents(
                user.userId,
                value["id"],
                moment(activeDay["start"]).format("YYYY-MM-DD"),
                moment(activeDay["end"], "YYYY-MM-DD").format("YYYY-MM-DD")
              )(dispatch);
            }}
            selectedItem={locality}
            list={listOfLocalities}
          />
        </div>
        <div className="w-full flex lg:w-[25%] lg:h-full md:ml-3">
          <SpecialSelect
            emptySelectedValue={{
              title: "Servicio",
              description: "Selecciona un servicio de la lista",
            }}
            customClick={(value: any) => {
              setSelectedService(value);
              activeService(value)(dispatch);
              if (value["id"] === "ALL") {
                getCalendarEvents(
                  user.userId,
                  selectedLocality.id,
                  moment(activeDay["start"]).format("YYYY-MM-DD"),
                  moment(activeDay["end"], "YYYY-MM-DD").format("YYYY-MM-DD")
                )(dispatch);
              } else {
                getCalendarEvents(
                  user.userId,
                  selectedLocality.id,
                  moment(activeDay["start"]).format("YYYY-MM-DD"),
                  moment(activeDay["end"], "YYYY-MM-DD").format("YYYY-MM-DD"),
                  parseInt(value["id"])
                )(dispatch);
              }
            }}
            selectedItem={selectedService}
            list={listOfServices}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
