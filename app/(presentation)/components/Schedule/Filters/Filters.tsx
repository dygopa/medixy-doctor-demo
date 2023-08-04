import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import React, { Dispatch, Fragment, SetStateAction, useContext, useMemo, useState } from "react";
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

interface IFiltersProps {
  selectedLocality: {
    id: number,
    title: string,
    description: string,
  };
  setSelectedLocality: Dispatch<
    SetStateAction<{
      id: number,
      title: string,
      description: string,
    }>
  >;
}

function Filters({selectedLocality, setSelectedLocality}: IFiltersProps) {
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

  function handleFormatList() {
    let list_localities = localities.map((elem: any) => ({
      id: elem.id,
      title: elem.name,
      description: `${elem.municipality ? elem.municipality.name : "Sin dirección"} ${elem.country_location ? `- ${elem.country_location.name}` : ""}`,
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
      </div>
    </div>
  );
}

export default Filters;
