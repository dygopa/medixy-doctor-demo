import React from "react";
import History from "./History/History";
import Treatments from "./Treatments/Treatments";
import Diagnoses from "./Diagnoses/Diagnoses";
import DateDetail from "./DateDetail/DateDetail";
import Header from "./Header/Header";
import Orders from "./Orders/Orders";
import PatientDetail from "./PatientDetail/PatientDetail";
import useMedicalRecordCreate from "(presentation)/(hooks)/useMedicalRecordCreate";
import clsx from "clsx";

function MainPopup() {
  const { isOpen, setPopupSectionActive, setTitle, popupSectionActive } =
    useMedicalRecordCreate();

  let listTabs = [
    "Historial de consultas",
    "Tratamientos",
    "Diagnosticos",
    "Ordenes",
  ];

  const TabComponent = ({ title, index }: { title: string; index: number }) => {
    return (
      <div
        onClick={() => {
          setPopupSectionActive(index), setTitle(title);
        }}
        className={`w-fit text-[0.9rem] p-4 cursor-pointer hover:border-primary hover:border-b-[3px] text-center hover:text-slate-900 hover:font-bold
        ${
          popupSectionActive === index
            ? "border-primary border-b-[3px] font-bold text-slate-900"
            : "text-slate-400 font-normal border-b-[3px] border-transparent"
        }
      `}
      >
        {title}
      </div>
    );
  };
  return (
    <div
      className={clsx([
        "fixed w-full h-screen overflow-hidden z-[100] top-0 right-0 bg-slate-900/50  justify-end items-start box-border",
        isOpen ? "flex" : "hidden",
      ])}
    >
      <div className="bg-white w-1/2 h-screen block relative box-border">
        <div className="h-[10vh]">
          <Header />
        </div>

        <div className="h-[15vh]">
          <PatientDetail />
        </div>

        {popupSectionActive !== 4 ? (
          <div className="relative w-full  bg-white h-[85vh]">
            <div className="w-full flex justify-start items-center h-[5vh]">
              {listTabs.map((tab, i) => (
                <TabComponent title={tab} index={i} key={i} />
              ))}
            </div>
            <div className="bg-white p-4 h-[80vh] overflow-y-auto">
              {popupSectionActive === 0 && <History />}
              {popupSectionActive === 1 && <Treatments />}
              {popupSectionActive === 2 && <Diagnoses />}
              {popupSectionActive === 3 && <Orders />}
            </div>
          </div>
        ) : (
          <div className="h-full bg-white overflow-y-auto p-4">
            <DateDetail />
          </div>
        )}
      </div>
    </div>
  );
}
export default MainPopup;
