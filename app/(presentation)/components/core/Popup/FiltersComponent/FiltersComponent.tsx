import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import Button from "(presentation)/components/core/BaseComponents/Button";
import SpecialSearch from "(presentation)/components/core/SpecialSearch/SpecialSearch";
import React, { useContext, useMemo, useState } from "react";
import { IService } from "domain/core/entities/serviceEntity";
import { FiBriefcase, FiHome } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { ILocality } from "domain/core/entities/localityEntity";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import { IUser } from "domain/core/entities/userEntity";

export default function FiltersComponent({
  user,
  cancelFuntion,
  customRef,
}: {
  user: IUser;
  cancelFuntion: Function;
  customRef: React.LegacyRef<HTMLDivElement>;
}) {
  const params = useSearchParams();
  const pathname = usePathname();

  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const {
    getServices,
    getLocalities,
    getAttentionWindows,
    activeLocality,
    activeService,
  } = actions;
  const { data: services, successful: loadedServices } = state.getServices;
  const { data: localities, successful: loadedLocalities } =
    state.getLocalities;

  const router = useRouter();

  const [selectedService, setSelectedService] = useState({
    id: 0,
    title: "",
    description: "",
    type: "SERVICE",
  });

  const [selectedLocality, setSelectedLocality] = useState({
    id: 0,
    title: "",
    description: "",
    type: "LOCALITY",
  });

  const [listOfServices, setListOfServices] = useState([]);
  const [listOfLocalities, setListOfLocalities] = useState([]);

  function filterFunction() {
    let listOfQuerys = [];
    let path = pathname!.toString();

    if (selectedService.id > 0 || selectedLocality.id > 0) path = path + "?";

    if (selectedService.id > 0)
      listOfQuerys.push(`service=${selectedService.id}`);
    if (selectedLocality.id > 0)
      listOfQuerys.push(`locality=${selectedLocality.id}`);

    path = path + listOfQuerys.join("&");

    router.replace(path);
    cancelFuntion();
  }

  function handleFormatList() {
    let list_services = services.map((elem: IService) => ({
      id: elem.id,
      title: elem.name,
      description: elem.description,
      type: "SERVICE",
    }));

    setListOfServices(list_services);

    let list = localities.map((elem: ILocality) => ({
      id: elem.id,
      title: elem.name,
      description: elem.address.address,
      type: "LOCALITY",
    }));

    setListOfLocalities(list);
  }

  useMemo(() => {
    if (selectedService.id > 0) {
      getAttentionWindows(selectedService.id, "")(dispatch);
    }
  }, [selectedService]);

  useMemo(() => {
    if (selectedLocality.id > 0) activeLocality(selectedLocality)(dispatch);
    if (selectedService.id > 0) activeService(selectedService)(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocality, selectedService]);

  useMemo(() => {
    if (user) {
      getServices(user.userId)(dispatch);
      getLocalities(user.userId)(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useMemo(() => {
    if (loadedServices && loadedLocalities) handleFormatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedServices, loadedLocalities]);

  return (
    <div
      ref={customRef}
      className="w-full md:w-[60%] lg:w-[40%] h-screen md:min-h-[20vh] md:max-h-[70vh] lg:min-h-[20vh] lg:max-h-[70vh] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8"
    >
      <div className="w-full flex flex-col justify-start items-start gap-5">
        <p className="font-bold text-2xl text-slate-900">Filtrar</p>
        <div className="relative w-full h-fit flex flex-col justify-start items-start gap-1">
          <p className="font-light text-sm text-slate-500">Consultorios</p>
          <SpecialSearch
            customClick={setSelectedLocality}
            customClickEmpty={() => {}}
            list={listOfLocalities}
            placeholder={"Buscar..."}
            selectedItem={selectedLocality}
          />
          {selectedLocality["title"] !== "" && (
            <div
              className={twMerge([
                "transition w-full h-[10vh] flex justify-between items-center gap-3 p-3 bg-white",
              ])}
            >
              <div className="w-12 h-12 overflow-hidden rounded-lg bg-primary/20 text-primary text-lg flex flex-col justify-center items-center">
                <FiHome />
              </div>
              <div className="w-[90%] h-full flex flex-col justify-center items-start">
                <p className="font-semibold text-gray-950 text-[0.9rem]">
                  {selectedLocality["title"]}
                </p>
                <p className="font-light text-gray-600 text-sm">
                  {selectedLocality["description"]}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="relative w-full h-fit flex flex-col justify-start items-start gap-1">
          <p className="font-light text-sm text-slate-500">Servicio</p>
          <SpecialSearch
            customClick={setSelectedService}
            customClickEmpty={() => {}}
            list={listOfServices}
            placeholder={"Buscar..."}
            selectedItem={selectedService}
          />
          {selectedService["title"] !== "" && (
            <div
              className={twMerge([
                "transition w-full h-[10vh] flex justify-between items-center gap-3 p-3 bg-white",
              ])}
            >
              <div className="w-12 h-12 overflow-hidden rounded-lg bg-primary/20 text-primary text-lg flex flex-col justify-center items-center">
                <FiBriefcase />
              </div>
              <div className="w-[90%] h-full flex flex-col justify-center items-start">
                <p className="font-semibold text-gray-950 text-[0.9rem]">
                  {selectedService["title"]}
                </p>
                <p className="font-light text-gray-600 text-sm">
                  {selectedService["description"]}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <Button
          onClick={() => {
            filterFunction();
          }}
          variant="primary"
          type="button"
          className="w-full"
        >
          Filtrar
        </Button>
        <p
          onClick={() => {
            cancelFuntion();
          }}
          className="cursor-pointer font-normal text-sm text-primary text-center"
        >
          Cancelar
        </p>
      </div>
    </div>
  );
}
