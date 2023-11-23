import { ScheduleRoutesEnum } from "(presentation)/(routes)/scheduleRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormSelect } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, useContext } from "react";
import { IScheduleContext, ScheduleContext } from "../context/ScheduleContext";

interface ISelectedLocality {
  id: number;
  title: string;
  description: string;
}

export default function Navigator({
  selectedLocality,
}: {
  selectedLocality: ISelectedLocality;
}) {
  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const { changeTypePopup, changeStatusPopup, predifinedReservationData } =
    actions;
  return (
    <div className="w-full md:flex justify-between items-start gap-5 lg:static md:static sticky top-[67px] z-[69] bg-slate-100">
      <div className="w-full lg:w-2/4 relative flex flex-col justify-between items-start gap-2">
        <h2 className="mr-5 lg:text-[22px] md:text-[22px] text-lg font-bold truncate">
          Mi agenda
        </h2>
        <p className="lg:block md:block hidden">
          Mantén un seguimiento de tus citas médicos y asegúrate de estar
          preparado para cada consulta
        </p>
      </div>
      <div className="w-full mt-3 md:mt-0 lg:w-fit flex flex-row justify-start flex-wrap lg:flex-nowrap lg:justify-end items-center gap-2 h-full">
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
                      href={
                        selectedLocality.id === 0
                          ? `/schedule/configuration`
                          : `/schedule/configuration?locality=${selectedLocality["id"]}`
                      }
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
  );
}
