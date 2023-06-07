import Records from "./Records/Records";
import VitalSigns from "./VitalSigns/VitalSigns";
import { Dispatch, SetStateAction } from "react";
import PatientDetail from "./PatientDetail/PatientDetail";
import Allergies from "./Allergies/Allergies";
import Treatments from "./Treatments/Treatments";
import History from "./History/History";

interface IDetailProps {
  patientId: number;
  popupSectionActive: number;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
}

export default function Detail({
  patientId,
  popupSectionActive,
  setPopupSectionActive,
}: IDetailProps) {
  let listTabs = [
    "Historial de consultas",
    "Alergias",
    "Signos vítales",
    "Tratamientos",
    "Antecedentes",
  ];

  const TabComponent = ({ title, index }: { title: string; index: number }) => {
    return (
      <div
        onClick={() => {
          setPopupSectionActive(index);
        }}
        className={`lg:text-[0.9rem] md:text-[0.9rem] text-[12px] w-fit p-4 cursor-pointer hover:border-primary hover:border-b-[3px] text-center hover:text-slate-900 hover:font-bold
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

  const getComponentByTabActive = () => {
    switch (popupSectionActive) {
      case 0:
        return <History />;
      case 1:
        return <Allergies />;
      case 2:
        return <VitalSigns />;
      case 3:
        return <Treatments />;
      case 4:
        return <Records />;

      default:
        return <div />;
    }
  };

  return (
    <div className="h-screen">
      <div>
        <PatientDetail patientId={patientId} />
      </div>

      <div className="relative w-full bg-white h-full">
        <div className="w-full flex justify-start items-center overflow-x-auto overflow-y-hidden">
          {listTabs.map((tab, i) => (
            <TabComponent title={tab} index={i} key={i} />
          ))}
        </div>

        <div className="bg-white p-4 h-full">{getComponentByTabActive()}</div>
      </div>
    </div>
  );
}
