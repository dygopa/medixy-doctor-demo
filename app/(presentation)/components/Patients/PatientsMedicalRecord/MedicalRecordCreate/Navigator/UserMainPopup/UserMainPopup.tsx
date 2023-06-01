import React, { Dispatch, SetStateAction } from "react";
import clsx from "clsx";
import Header from "./Header/Header";
import Patient from "./Patient/Patient";

interface IUserMainPopupProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function UserMainPopup({ isOpen, setIsOpen }: IUserMainPopupProps) {
  return (
    <div
      className={clsx([
        "fixed  h-screen overflow-hidden z-[100] top-0 right-0 bg-slate-900/50  xl:justify-end lg:justify-end md:justify-end items-start box-border transition-all",
        isOpen ? "flex w-full" : "w-[0px]",
      ])}
    >
      <div className="bg-white xl:w-1/2 lg:w-1/2 md:w-[700px] w-full h-screen block relative box-border">
        <div>
          <Header setIsOpen={setIsOpen} />
        </div>

        <div className="px-4">
          <Patient />
        </div>
      </div>
    </div>
  );
}
export default UserMainPopup;
