import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

export const DataSelection = () => {
  return (
    <div className="w-full h-fit flex flex-col justify-start items-start gap-3">
      <div className="w-full flex justify-start items-start gap-5 mb-3">
        <div className="w-[10%] relative flex flex-col justify-start items-center">
          <span className="w-9 h-9 border bg-white text-secondary rounded-md flex flex-col justify-center items-center">
            <Lucide icon="office-building-outline" />
          </span>
        </div>
        <div className="w-[90%] relative flex flex-col justify-start items-start gap-2">
          <div className="">
            <p className="font-medium text-slate-900 text-lg">Consultorio</p>
            <p className="font-light text-slate-500 text-sm">
              Selecciona el consultorio que te convenga más
            </p>
            <div className="my-2">
              <p className="font-medium text-slate-900 text-base"></p>
              <p className="font-light text-slate-500 text-sm mt-2"></p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-start items-start gap-3">
        <div className="w-[10%] relative flex flex-col justify-start items-center">
          <span className="w-9 h-9 border bg-white text-secondary rounded-md flex flex-col justify-center items-center">
            <Lucide icon="medical-bag" />
          </span>
        </div>
        <div className="w-[90%] relative flex flex-col justify-start items-start gap-2">
          <div className="w-full">
            <p className="font-medium text-slate-900 text-lg">Servicio</p>
            <p className="font-light text-slate-500 text-sm">
              Selecciona la razón por la cual necesitas la consulta
            </p>
            <div className="my-2 relative w-full h-fit justify-center items-start bg-white border border-slate-300 rounded-md p-2">
              <p className="font-medium text-slate-900 text-base">Consulta</p>
              <p className="font-light text-slate-500 text-sm mt-2"></p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-3">
        <div className="flex w-full gap-3">
          <div className="w-[10%] relative flex flex-col justify-start items-center">
            <span className="w-9 h-9 border bg-white text-secondary rounded-md flex flex-col justify-center items-center">
              <Lucide icon="calendar-blank" />
            </span>
          </div>
          <div className="w-[90%] relative flex flex-col justify-start items-start gap-2">
            <p className="font-medium text-slate-900 text-lg">Para cuando</p>
            <p className="font-light text-slate-500 text-sm">
              Selecciona la fecha indicada para ti y conoce la disponibilidad
            </p>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex flex-col justify-center items-center text-center gap-2">
        <p className="text-base text-slate-900 font-medium">
          No hay disponibilidad
        </p>
        <p className="text-sm text-slate-500 font-light">
          No hay disponibilidad para esta semana
        </p>
      </div>
    </div>
  );
};
