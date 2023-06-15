import clsx from "clsx";
import { Dispatch, SetStateAction, useContext } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../context/MedicalRecordContext";
import TreatmentsTable from "./Table/Table";

interface ITreatmentsProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
}

export default function Treatments({
  setIsOpen,
  setPopupSectionActive,
}: ITreatmentsProps) {
  const { state } = useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { data } = state.treatments;

  return (
    <div
      className={clsx([
        "relative zoom-in lg:h-[350px] h-auto zoom",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-5 box h-full w-full overflow-y-hidden">
        <div className="flex items-center justify-between pb-1 border-b mb-2 w-full h-[36px]">
          <div>
            <p className="w-full text-left font-bold text-md text-slate-900">
              Tratamientos
            </p>
          </div>

          {data.data?.length > 0 && (
            <div>
              <button
                type="button"
                onClick={() => {
                  setPopupSectionActive(5);
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

        <div className="col-span-12 intro-y z-0 w-full">
          <TreatmentsTable />
        </div>
      </div>
    </div>
  );
}
