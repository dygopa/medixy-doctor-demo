import CreateAgendaHelp from "(presentation)/components/Schedule/Popup/CreateAgendaHelp/CreateAgendaHelp";
import React, { useContext, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { IPopupContext, PopupContext } from "./context/PopupContext";
import Button from "../Button";
import FiltersComponent from "(presentation)/components/Schedule/Popup/FiltersComponent/FiltersComponent";
import Lucide from "../Lucide";

export default function PopupIndex() {
  const { state, actions, dispatch } = useContext<IPopupContext>(PopupContext);
  const { changeStatusPopup } = actions;
  const { data: change } = state.changeChildrenPopup;
  const { data: status } = state.statusPopup;

  const wrapperRef = useRef(null);

  function useOutsideAlerter(ref: React.MutableRefObject<any>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target)) {
          console.log("Click");
          changeStatusPopup(false)(dispatch);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  return (
    <div
      className={twMerge([
        "z-[52] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/30 flex flex-col justify-center items-end",
        status ? "visible" : "hidden",
      ])}
    >
      <div
        ref={wrapperRef}
        className="w-full md:w-[50%] lg:w-[30%] min-h-screen max-h-screen overflow-y-auto h-screen flex flex-col justify-between items-start bg-white p-6 gap-8"
      >
        <div className="w-full h-[90%] relative flex flex-col justify-start items-center gap-3">
          <div className="w-full flex justify-between items-center">
            <p className="text-lg text-slate-900 font-semibold">
              {change.title}
            </p>
            <div
              className="cursor-pointer text-xl text-slate-900"
              onClick={() => {
                changeStatusPopup(false)(dispatch);
              }}
            >
              <Lucide icon="at" />
            </div>
          </div>
          <p className="text-base text-slate-500 font-light">
            Filtra la agenda por localidad y servicio para una mejor experiencia
          </p>
          {change.component === 0 && <FiltersComponent />}
        </div>
      </div>
    </div>
  );
}
