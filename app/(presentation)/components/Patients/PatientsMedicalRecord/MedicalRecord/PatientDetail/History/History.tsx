import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import clsx from "clsx";
import HistoryTable from "./Table/Table";

export default function History() {
  const { setTitle, setPopupActive, setPopupSectionActive }: any =
    useMedicalRecord();

  return (
    <div
      className={clsx([
        "relative",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
      style={{ height: "27vh" }}
    >
      <div className="p-5 box" style={{ height: "27vh" }}>
        <div>
          <div className="w-full flex justify-between items-center border-b pb-2">
            <p className="font-semibold text-lg text-slate-900">
              Historial de consultas
            </p>

            <p
              onClick={() => {
                setTitle("Historial de consultas"),
                  setPopupActive(true),
                  setPopupSectionActive(0);
              }}
              className="font-sm text-base text-slate-900 cursor-pointer"
            >
              Ver más
            </p>
          </div>
        </div>

        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible z-0">
          <HistoryTable />
        </div>
      </div>
    </div>
  );
}
