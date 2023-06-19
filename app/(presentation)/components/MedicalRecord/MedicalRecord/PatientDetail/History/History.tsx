import clsx from "clsx";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../context/MedicalRecordContext";
import HistoryTable from "./Table/Table";

interface IHistoryProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
}

export default function History({
  setIsOpen,
  setPopupSectionActive,
}: IHistoryProps) {
  const { state } = useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { data } = state.medicalConsulties;

  return (
    <div
      className={clsx([
        "relative lg:h-[350px] h-auto",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-4 box h-full overflow-y-hidden">
        <div>
          <div className="flex items-center justify-between pb-1 border-b mb-2 w-full h-[36px]">
            <div>
              <p className="w-full text-left font-bold text-md text-slate-900">
                Historial de consultas
              </p>
            </div>

            {data.data?.length > 0 && (
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setPopupSectionActive(2);
                    setIsOpen(true);
                  }}
                  className="hover:bg-dark hover:bg-opacity-10 px-2 py-1 rounded-md"
                >
                  <p className="font-normal text-[13px] text-slate-500 cursor-pointer">
                    Ver más
                  </p>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible z-0">
          <HistoryTable />
        </div>
      </div>
    </div>
  );
}
