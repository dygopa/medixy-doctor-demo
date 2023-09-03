import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../context/MedicalRecordContext";
import VitalSignsList from "./VitalSignsList/VitalSignsList";

interface IVitalSignsProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
}

export default function VitalSigns({
  setIsOpen,
  setPopupSectionActive,
}: IVitalSignsProps) {
  const { state } = useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { data } = state.medicalMeasures;

  return (
    <div
      className={clsx([
        "relative zoom-in lg:h-[300px] md:h-[250px] h-auto",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="px-4 py-2 box h-full">
        <div className="flex items-center justify-between pb-1 border-b mb-2 w-full h-[36px]">
          <div>
            <p className="w-full text-left font-bold text-md text-slate-900">
              Signos Vítales
            </p>
          </div>

          {data.data?.length > 0 && (
            <div>
              <button
                type="button"
                onClick={() => {
                  setPopupSectionActive(4);
                  setIsOpen(true);
                }}
                className="hover:bg-dark hover:bg-opacity-10 px-2 py-1 rounded-md"
              >
                <p className="font-normal text-[13px] text-slate-500 cursor-pointer">
                  <Lucide icon="Eye" className="w-5 h-5" />
                </p>
              </button>
            </div>
          )}
        </div>

        <VitalSignsList />
      </div>
    </div>
  );
}
