import Records from "./Records/Records";
import VitalSigns from "./VitalSigns/VitalSigns";
import React, { Dispatch, SetStateAction } from "react";
import PatientDetail from "./PatientDetail/PatientDetail";
import Allergies from "./Allergies/Allergies";
import Treatments from "./Treatments/Treatments";
import History from "./History/History";
import Companion from "./Companion/Companion";
import Patient from "./Patient/Patient";
import clsx from "clsx";
import { IAppointment } from "domain/core/entities/appointmentEntity";
import Orders from "./Orders/Orders";

interface IDetailProps {
  subjectId: number;
  appointment: IAppointment | null;
  popupSectionActive: number;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
}

export default function Detail({
  subjectId,
  appointment,
  popupSectionActive,
  setPopupSectionActive,
}: IDetailProps) {
  let listTabs = [
    "Paciente",
    "Contacto de emergencia",
    "Historial",
    "Alergias",
    "Signos vítales",
    "Tratamientos",
    "Antecedentes",
    "Ordenes",
  ];

  const TabComponentMobile = ({
    title,
    index,
  }: {
    title: string;
    index: number;
  }) => {
    return (
      <button
        onClick={() => {
          setPopupSectionActive(index);
        }}
        className={clsx([
          "h-14 w-[150px] p-2 rounded-full hover:bg-primary hover:text-white cursor-pointer",
          popupSectionActive === index
            ? "text-white bg-primary"
            : "bg-dark bg-opacity-10",
        ])}
      >
        {title}
      </button>
    );
  };

  const TabComponent = ({ title, index }: { title: string; index: number }) => {
    return (
      <div
        onClick={() => {
          setPopupSectionActive(index);
        }}
        className={`flex items-center h-14 lg:text-[0.9rem] font-bold md:text-[0.9rem] text-[12px] px-2 mr-2 py-2 cursor-pointer hover:border-primary hover:border-b-[3px] text-center hover:text-slate-900 hover:font-bold
    ${
      popupSectionActive === index
        ? "border-primary border-b-[3px] font-bold text-slate-900"
        : "text-slate-400 font-bold border-b-[3px] border-transparent"
    }
  `}
      >
        {title}
      </div>
    );
  };

  const getComponentByTabActive = () => {
    switch (popupSectionActive) {
      case 0:
        return <Patient subjectId={subjectId} />;
      case 1:
        return <Companion subjectId={subjectId} />;
      case 2:
        return (
          <History
            subjectId={subjectId}
            appointmentId={appointment?.id ?? null}
          />
        );
      case 3:
        return <Allergies subjectId={subjectId} />;
      case 4:
        return <VitalSigns subjectId={subjectId} />;
      case 5:
        return <Treatments subjectId={subjectId} />;
      case 6:
        return <Records subjectId={subjectId} />;
      case 7:
        return <Orders subjectId={subjectId} />;

      default:
        return <div />;
    }
  };

  return (
    <div className="h-full">
      <div className="relative w-full bg-white h-full">
        <div className="mb-8">
          <PatientDetail subjectId={subjectId} appointment={appointment} />
        </div>

        <div className="w-full flex justify-start items-center overflow-x-auto overflow-y-hidden py-4">
          {listTabs.map((tab, i) => (
            <React.Fragment key={i}>
              <div className="lg:block hidden">
                <TabComponent title={tab} index={i} key={i} />
              </div>

              <div className="lg:hidden block mr-3">
                <TabComponentMobile title={tab} index={i} key={i} />
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="bg-white p-4 h-full">{getComponentByTabActive()}</div>
      </div>
    </div>
  );
}
