import clsx from "clsx";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../context/MedicalRecordContext";
import RecordList from "./RecordList/RecordList";

interface IRecordsProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
}

export default function Records({
  setIsOpen,
  setPopupSectionActive,
}: IRecordsProps) {
  const { state } = useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { data } = state.medicalRecords;

  return (
    <div
      className={clsx([
        "relative lg:h-[350px] h-auto",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-5 box h-full overflow-y-hidden">
        <div className="flex items-center justify-between pb-1 border-b mb-2 w-full h-[36px]">
          <div>
            <p className="w-full text-left font-bold text-md text-slate-900">
              Antecedentes
            </p>
          </div>

          {data.data?.length > 0 && (
            <div>
              <button
                type="button"
                onClick={() => {
                  setPopupSectionActive(6);
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

        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible z-0">
          <RecordList />
        </div>
      </div>
    </div>
  );
}
