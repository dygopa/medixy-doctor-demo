import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import React, { Fragment, useContext, useMemo, useState } from "react";
import { IScheduleContext, ScheduleContext } from "../context/ScheduleContext";
import Link from "next/link";
import { ScheduleRoutesEnum } from "(presentation)/(routes)/scheduleRoutes";
import {
  IPopupContext,
  PopupContext,
} from "(presentation)/components/core/BaseComponents/Popup/context/PopupContext";
import { Menu, Transition } from "@headlessui/react";
import { FiBriefcase, FiHome } from "react-icons/fi";
import { IService } from "domain/core/entities/serviceEntity";
import { ILocality } from "domain/core/entities/localityEntity";
import { SpecialSelect } from "(presentation)/components/core/SpecialSearch/SpecialSearch";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import moment from "moment";

function Filters() {
  const { state: auth } = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: loadedUser } = auth.getUserAuthenticated;

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
  } = actions;
  const { data: locality } = state.activeLocality;

  const { data: localities, successful: loadedLocalities } = state.getLocalities;
  const { data: activeDay, successful: changedActiveDay} = state.activeDay;

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
      description: elem.address,
    }));

    setListOfLocalities(list_localities);
  }

  useMemo(() => {
    if (selectedLocality.id > 0) {
      activeLocality(selectedLocality)(dispatch);
      getCalendarEvents(user.userId, selectedLocality.id, moment(activeDay).format('YYYY-MM-DD'), moment(activeDay, "YYYY-MM-DD").add(5, 'days').format('YYYY-MM-DD'))(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLocality]);

  useMemo(() => {
    if (loadedLocalities && localities.length > 0){
      getCalendarEvents(user.userId, localities[0].id, moment(activeDay).format('YYYY-MM-DD'), moment(activeDay, "YYYY-MM-DD").add(5, 'days').format('YYYY-MM-DD'))(dispatch);
      setSelectedLocality({
        id: localities[0].id,
        title: localities[0].name,
        description: localities[0].address,
      })
    }
  }, [loadedLocalities, localities]);

  useMemo(() => {
    if (loadedLocalities) handleFormatList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedLocalities]);

  useMemo(() => {
    if (loadedUser) {
      getLocalities(user.userId)(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedUser]);

  return (
    <div className="w-full h-fit mt-4 flex flex-col justify-center items-start gap-4">
      <div className="w-full lg:h-[5vh] flex flex-col lg:flex-row flex-wrap lg:flex-nowrap justify-between items-center lg:gap-0 gap-3">
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
        <div className="w-full lg:w-fit flex flex-row justify-center flex-wrap lg:flex-nowrap lg:justify-end items-center gap-2 h-full">
          <Button
            onClick={() => {
              predifinedReservationData({})(dispatch);
              changeStatusPopup(true)(dispatch);
              changeTypePopup(0)(dispatch);
            }}
            variant="primary"
            type="button"
            className="w-[85%] lg:w-fit"
          >
            <Lucide icon="Plus" className="w-5 h-5 mr-2" />
            Nueva cita
          </Button>

          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="cursor-pointer w-10 h-10 flex flex-col justify-center items-center bg-primary/10 hover:bg-primary/20 transition rounded-md">
              <Lucide icon="MoreVertical" className="h-5" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-15 mt-1 w-[200px] origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5">
                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <Link
                        className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100"
                        href={ selectedLocality["id"] === 0 ? `/schedule/configuration` : `/schedule/configuration?locality=${selectedLocality["id"]}`}
                      >
                        <Lucide icon="Settings" className="w-5 h-5" />
                        Configurar agenda
                      </Link>
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </div>
  );
}

export default Filters;
