import React from "react";
import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import Detail from "./Detail/Detail";
import Header from "./Header/Header";
import clsx from "clsx";

function MainPopup() {
  const { isOpen } = useMedicalRecord();

  return (
    <div
      className={clsx([
        "fixed w-full h-screen overflow-hidden z-[100] top-0 right-0 bg-slate-900/50 justify-end items-start box-border",
        isOpen ? "flex" : "hidden",
      ])}
    >
      <div className="bg-white w-1/2 h-screen block relative box-border ">
        <div>
          <Header />
        </div>

        <div className="p-4">
          <Detail />
        </div>
      </div>
    </div>
  );
}
export default MainPopup;
