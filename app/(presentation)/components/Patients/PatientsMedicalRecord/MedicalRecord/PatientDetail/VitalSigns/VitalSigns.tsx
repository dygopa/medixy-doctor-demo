import clsx from "clsx";

export default function VitalSigns() {
  return (
    <div
      className={clsx([
        "relative zoom-in lg:h-[27vh] md:h-[30vh] h-auto",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-4 box h-full">
        <div className="flex flex-col items-start w-full h-full">
          <p className="w-full text-left font-normal text-md text-slate-500 pb-2 border-b mb-2">
            Signos vítales
          </p>
          <div className="flex justify-between items-center w-full mb-1">
            <p className="font-light text-lg text-slate-500">Peso</p>
            <p className="font-semibold text-lg text-secondary">0,00kg</p>
          </div>
          <div className="flex justify-between items-center w-full mb-1">
            <p className="font-light text-lg text-slate-500">Talla</p>
            <p className="font-semibold text-lg text-secondary">0,00cm</p>
          </div>
          <div className="flex justify-between items-center w-full mb-1">
            <p className="font-light text-lg text-slate-500">
              Frecuencia cardíaca
            </p>
            <p className="font-semibold text-lg text-secondary">000</p>
          </div>
          <div className="flex justify-between items-center w-full mb-1">
            <p className="font-light text-lg text-slate-500">
              Frecuencia respiratoria
            </p>
            <p className="font-semibold text-lg text-secondary">000</p>
          </div>
          <div className="flex justify-between items-center w-full mb-1">
            <p className="font-light text-lg text-slate-500">Temperatura</p>
            <p className="font-semibold text-lg text-secondary">00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
