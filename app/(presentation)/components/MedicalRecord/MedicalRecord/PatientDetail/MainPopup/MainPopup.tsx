import React, { Dispatch, SetStateAction } from "react";
import Detail from "./Detail/Detail";
import Header from "./Header/Header";
import clsx from "clsx";
import { IAppointment } from "domain/core/entities/appointmentEntity";
import { IUser } from "domain/core/entities/userEntity";

interface IMainPopupProps {
  user: IUser;
  subjectId: number;
  appointment: IAppointment | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  popupSectionActive: number;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
}

function MainPopup({
  user,
  subjectId,
  appointment,
  isOpen,
  setIsOpen,
  popupSectionActive,
  setPopupSectionActive,
}: IMainPopupProps) {
  return (
    <div
      className={clsx([
        "fixed w-full h-screen overflow-hidden z-[100] top-0 right-0 bg-slate-900/50 justify-end items-start box-border",
        isOpen ? "flex" : "hidden",
      ])}
    >
      <div className="bg-white xl:w-[900px] lg:w-[1000px] md:w-[700px] w-full h-full block relative box-border overflow-y-auto">
        <div className="w-full justify-between items-center sticky top-[0px] z-[50] border-b bg-slate-100">
          <Header
            subjectId={subjectId}
            appointmentId={appointment?.id ?? null}
            setIsOpen={setIsOpen}
          />
        </div>

        <div className="p-4 h-full">
          <Detail
            user={user}
            subjectId={subjectId}
            appointment={appointment}
            popupSectionActive={popupSectionActive}
            setPopupSectionActive={setPopupSectionActive}
          />
        </div>
      </div>
    </div>
  );
}
export default MainPopup;
