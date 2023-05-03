import React from "react";
import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import TitlePopup from "./Title/Title";
import History from "./History/History";
import Treatments from "./Treatments/Treatments";
import Diagnoses from "./Diagnoses/Diagnoses";
import DateDetail from "./DateDetail/DateDetail";
import clsx from "clsx";
import Patient from "./Patient/Patient";

function MainPopup() {
  const {
    popupActive,
    setPopupActive,
    popupSectionActive,
    setPopupSectionActive,
    setTitle,
  }: any = useMedicalRecord();

  let listTabs = ["Historial de consultas", "Tratamientos", "Diagnosticos"];

  const TabComponent = ({ title, index }: any) => {
    return (
      <div
        onClick={() => {
          setPopupSectionActive(index), setTitle(title);
        }}
        className={`w-fit text-slate-900 font-semibold text-[0.9rem] p-[1%_4%] cursor-pointer 
        ${popupSectionActive === index && "border-secondary border-b-[3px]"}
      `}
      >
        {title}
      </div>
    );
  };

  return (
    <div
      className="fixed w-full h-screen overflow-hidden z-20 top-0 right-0 bg-slate-900/50 flex justify-end items-start box-border"
      style={{ zIndex: 99 }}
    >
      <div
        className="bg-slate-100 h-screen mb-8 block relative"
        style={{ width: "600px" }}
      >
        <div className={`px-[5%] w-full`}>
          <div className="mb-8">
            <TitlePopup />
          </div>

          <div>
            <Patient />
          </div>
        </div>

        {popupSectionActive !== 4 ? (
          <div className="relative h-[70%] w-full bg-white">
            <div className="w-full px-[5%] flex justify-start items-center border-b border-slate-200 bg-slate-100 h-fit">
              {listTabs.map((tab, i) => (
                <TabComponent title={tab} index={i} key={i} />
              ))}
            </div>
            <div className="h-full bg-white overflow-y-auto p-[2.5%_5%]">
              {popupSectionActive === 0 && <History />}
              {popupSectionActive === 1 && <Treatments />}
              {popupSectionActive === 2 && <Diagnoses />}
            </div>
          </div>
        ) : (
          <div className="h-full bg-white overflow-y-auto p-[2.5%_5%]">
            <DateDetail />
          </div>
        )}
      </div>
    </div>
  );
}

export default MainPopup;
