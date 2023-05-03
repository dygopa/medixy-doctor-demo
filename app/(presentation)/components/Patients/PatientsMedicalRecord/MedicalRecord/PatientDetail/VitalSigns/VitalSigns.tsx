import clsx from "clsx";

export default function VitalSigns() {
  return (
    <div
      className={clsx([
        "relative zoom-in",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
      style={{ height: "35vh" }}
    >
      <div className="p-5 box" style={{ height: "35vh" }}>
        <div className="flex flex-col items-start w-full h-full">
          <p className="w-full text-left font-semibold text-lg text-slate-900 pb-2">
            Signos vitales
          </p>
          <div className="flex justify-between items-center w-full py-2 mb-1">
            <p className="font-light text-sm text-slate-500">Peso</p>
            <p className="font-semibold text-[14px] text-secondary">1,78cm</p>
          </div>
          <div className="flex justify-between items-center w-full py-2 mb-1">
            <p className="font-light text-sm text-slate-500">Talla</p>
            <p className="font-semibold text-[14px] text-secondary">1,78cm</p>
          </div>
          <div className="flex justify-between items-center w-full py-2 mb-1">
            <p className="font-light text-sm text-slate-500">
              Frecuencia cardiaca
            </p>
            <p className="font-semibold text-[14px] text-secondary">1,78cm</p>
          </div>
          <div className="flex justify-between items-center w-full py-2 mb-1">
            <p className="font-light text-sm text-slate-500">
              Frecuencia respiratoria
            </p>
            <p className="font-semibold text-[14px] text-secondary">1,78cm</p>
          </div>
          <div className="flex justify-between items-center w-full py-2">
            <p className="font-light text-sm text-slate-500">Temperatura</p>
            <p className="font-semibold text-[14px] text-secondary">1,78cm</p>
          </div>
        </div>
      </div>
    </div>
  );
}
