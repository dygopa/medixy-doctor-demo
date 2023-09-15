import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import React, {
  useContext,
  useState,
  SetStateAction,
  Dispatch,
  useMemo,
  useEffect,
} from "react";
import {
  IStepByStepAppointmentContext,
  StepByStepAppointmentContext,
} from "../../context/StepByStepAppointmentContext";
import SpecialSearch, {
  SpecialSelect,
} from "(presentation)/components/core/SpecialSearch/SpecialSearch";
import { FiBriefcase, FiHome } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import Loading from "(presentation)/components/core/Loading/Loading";

const LocalityServiceStep = ({
  appointment,
  setAppointment,
}: {
  appointment: any;
  setAppointment: Dispatch<SetStateAction<{}>>;
}) => {
  const { state: auth } = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser } = auth.getUserAuthenticated;

  const {
    state: stateSchedule,
    actions: actionsSchedule,
    dispatch: dispatchSchedule,
  } = useContext<IScheduleContext>(ScheduleContext);

  const { changeStatusPopup } = actionsSchedule;
  const { data: statusPopup } = stateSchedule.statusPopup;

  const { data: status } = stateSchedule.statusPopup;
  const { data: locality } = stateSchedule.activeLocality;
  const { data: service } = stateSchedule.activeService;
  const { data: predifinedReservationData } =
    stateSchedule.predifinedReservationData;

  const {
    data: localities,
    successful: loadedLocalities,
    loading: loadingLocalities,
  } = stateSchedule.getLocalities;
  const {
    data: servicesFromCalendar,
    successful: loadedServicesFromCalendar,
    loading: loadingServicesFromCalendar,
  } = stateSchedule.getServicesByLocality;

  const { state, actions, dispatch } =
    useContext<IStepByStepAppointmentContext>(StepByStepAppointmentContext);
  const { setStep, getLocalities, getServices, createAppointmentInitialState } =
    actions;

  const {
    data: services,
    successful: loadedServices,
    loading: loadingServices,
  } = state.services;

  const [listOfLocalities, setListOfLocalities] = useState([]);
  const [listOfServices, setListOfServices] = useState([]);
  const [fromCalendar, setFromCalendar] = useState(false);

  const [selectedLocality, setSelectedLocality] = useState({
    id: 0,
    title: "",
    description: "",
  });
  const [selectedService, setSelectedService] = useState({
    id: 0,
    title: "",
    description: "",
  });

  const [loadedAppointment, setLoadedAppointment] = useState(false);
  const [loadedDataFromAppointment, setLoadedDataFromAppointment] =
    useState(false);

  useEffect(() => {
    if (!loadedDataFromAppointment) {
      if (appointment["locality"]) {
        setSelectedLocality(appointment["locality"]);
        getServices({
          userId: user.userId,
          localityId: appointment["localityId"],
        })(dispatch);
      }
      if (appointment["service"]) {
        setSelectedService(appointment["service"]);
      }
      setLoadedDataFromAppointment(true);
    }
  }, [loadedDataFromAppointment]);

  function formatServicesList() {
    let list_services = [];

    if (!loadedServices && loadedServicesFromCalendar) {
      list_services = servicesFromCalendar!.map((elem: any) => ({
        id: elem.id,
        title: elem.name,
        description: elem["service_category"]["name"],
      }));
    }

    if (loadedServices && loadedServicesFromCalendar) {
      list_services = services!.map((elem: any) => ({
        id: elem.id,
        title: elem.name,
        description: elem["service_category"]["name"],
      }));
    }

    if (loadedServices && !loadedServicesFromCalendar) {
      list_services = services!.map((elem: any) => ({
        id: elem.id,
        title: elem.name,
        description: elem["service_category"]["name"],
      }));
    }

    if (list_services.length > 0 && !service["id"]) {
      setSelectedService(list_services[0]);
      setAppointment({
        ...appointment,
        serviceId: list_services[0]["id"],
        service: list_services[0],
      });
    }

    if (list_services.length > 0 && service["id"]) {
      setSelectedService(service);
      setAppointment({
        ...appointment,
        serviceId: locality["id"],
        service: service,
      });
    }

    setListOfServices(list_services as []);
  }

  useMemo(() => {
    formatServicesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingServices, loadingServicesFromCalendar, services]);

  useMemo(() => {
    if (loadedLocalities) {
      let list_localities = localities!.map((elem: any) => ({
        id: elem.id,
        title: elem.name,
        description: `${
          elem.address.municipality ? elem.address.municipality.name : "Sin dirección"
        } ${elem.address.country_location ? `- ${elem.address.country_location.name}` : ""}`,
      }));

      if (list_localities.length > 0 && !locality["id"]) {
        getServices({
          userId: user.userId,
          localityId: list_localities[0]["id"],
        })(dispatch);
        setSelectedLocality(list_localities[0]);
        setAppointment({
          ...appointment,
          localityId: list_localities[0]["id"],
          locality: list_localities[0],
        });
      }
      if (list_localities.length > 0 && locality["id"]) {
        //getServices({
        //  userId: user.userId,
        //  localityId: locality["id"],
        //})(dispatch);
        setSelectedLocality(locality);
        setAppointment({
          ...appointment,
          localityId: locality["id"],
          locality: locality,
        });
      }

      setListOfLocalities(list_localities as []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingLocalities]);

  useMemo(() => {
    createAppointmentInitialState()(dispatch);

    if (locality?.id) {
      setSelectedLocality({
        id: locality.id,
        title: locality.title,
        description: locality.description,
      });
    }

    if (service?.id) {
      setSelectedService({
        id: service.id,
        title: service.title,
        description: service.description,
      });
    }

    if (locality?.id) {
      setAppointment({
        localityId: locality.id,
        locality: locality,
        serviceId: service.id,
        service: service,
      });
    }

    if (locality?.id) {
      getServices({
        userId: user.userId,
        localityId: locality["id"],
      })(dispatch);
    }
  }, [statusPopup]);

  useMemo(() => {
    if (predifinedReservationData["localityId"] !== undefined) {
      setFromCalendar(true);
    } else {
      setFromCalendar(false);
    }
  }, [predifinedReservationData]);

  useMemo(() => {
    if (user && localities.length === 0)
      getLocalities(user.userId)(dispatchSchedule);
  }, [user]);

  return (
    <div className="w-full h-fit flex flex-col gap-5">
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <p className="font-normal text-sm text-slate-600">Consultorio</p>
        <SpecialSelect
          emptySelectedValue={{
            title: "Consultorio",
            description: "Selecciona un consultorio de la lista",
          }}
          customClick={(value: any) => {
            getServices({
              userId: user.userId,
              localityId: value["id"],
            })(dispatch);
            setSelectedLocality(value);
            setSelectedService({
              id: 0,
              title: "",
              description: "",
            });
            setAppointment({
              ...appointment,
              localityId: value["id"],
              locality: value,
              serviceId: 0,
              service: null,
            });
            setListOfServices([]);
          }}
          selectedItem={selectedLocality}
          disabled={fromCalendar}
          list={listOfLocalities}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <p className="font-normal text-sm text-slate-600">Servicio</p>
        <SpecialSelect
          emptySelectedValue={{
            title: "Servicio",
            description: "Selecciona un servicio de la lista",
          }}
          customClick={(value: any) => {
            setSelectedService(value);
            setAppointment({
              ...appointment,
              serviceId: value["id"],
              service: value,
            });
          }}
          selectedItem={selectedService}
          list={listOfServices}
        />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white">
        <Button
          disabled={
            !appointment["localityId"] ||
            !appointment["serviceId"] ||
            appointment["service"]["id"] === "ALL"
          }
          onClick={() => {
            setStep(1)(dispatch);
          }}
          variant="primary"
          type="button"
          className="w-full"
        >
          Continuar
        </Button>
        <p
          onClick={() => {
            changeStatusPopup(false)(dispatchSchedule);
          }}
          className="cursor-pointer font-normal text-sm text-primary text-center"
        >
          Cancelar
        </p>
      </div>
    </div>
  );
};

export default LocalityServiceStep;
