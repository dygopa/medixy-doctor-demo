export default function TreatmentsTable() {
  return (
    <div className="overflow-auto w-full">
      <div className="w-full cursor-pointer flex items-center justify-between gap-3 rounded-md p-[2%_0%] overflow-hidden">
        <div className="flex flex-col justify-start items-start ">
          <p className="font-normal text-[0.9rem] text-slate-500 mb-3 h-[15px]">
            Estado
          </p>
          <p className="font-normal py-1 px-3 w-[85px] text-center text-md rounded  bg-green-400 text-white">
            Activo
          </p>
        </div>

        <div className="flex flex-col justify-start items-start lg:w-[400px] md:w-[375px] sm:w-[300px] w-[300px]">
          <p className="font-normal text-[0.9rem] text-slate-500 mb-3 h-[15px]">
            Tratamiento
          </p>
          <p className="text-slate-900 lg:text-lg">Acetaminofén en tabletas</p>
        </div>

        <div className="flex flex-col justify-start items-start">
          <p className="font-normal text-[0.9rem] text-slate-500 mb-3 h-[15px]">
            Cantidad
          </p>
          <p className="text-slate-900 lg:text-lg">300 mg</p>
        </div>

        <div className="flex flex-col justify-start items-start">
          <p className="font-normal text-[0.9rem] text-slate-500 mb-3 h-[15px]">
            Durante
          </p>
          <p className="text-slate-900 lg:text-lg">2 sem.</p>
        </div>
      </div>

      <div className="w-full cursor-pointer flex items-center justify-between gap-3 rounded-md p-[2%_0%] overflow-hidden">
        <div className="flex flex-col justify-start items-start">
          <p className="font-normal text-[0.9rem] text-slate-500 mb-3 h-[15px]">
            Estado
          </p>
          <p className="font-normal py-1 px-3 w-[85px] text-center text-md rounded  bg-green-400 text-white">
            Activo
          </p>
        </div>

        <div className="flex flex-col justify-start items-start lg:w-[400px] md:w-[375px] sm:w-[300px] w-[300px]">
          <p className="font-normal text-[0.9rem] text-slate-500 mb-3 h-[15px]">
            Tratamiento
          </p>
          <p className="text-slate-900 lg:text-lg">Naproxeno sódico</p>
        </div>

        <div className="flex flex-col justify-start items-start">
          <p className="font-normal text-[0.9rem] text-slate-500 mb-3 h-[15px]">
            Cantidad
          </p>
          <p className="text-slate-900 lg:text-lg">550 mg</p>
        </div>

        <div className="flex flex-col justify-start items-start">
          <p className="font-normal text-[0.9rem] text-slate-500 mb-3 h-[15px]">
            Durante
          </p>
          <p className="text-slate-900 lg:text-lg">2 sem.</p>
        </div>
      </div>

      <div className="w-full cursor-pointer flex items-center justify-between gap-3 rounded-md p-[2%_0%] overflow-hidden">
        <div className="flex flex-col justify-start items-start">
          <p className="font-normal text-[0.9rem] text-slate-500 mb-3 h-[15px]">
            Estado
          </p>
          <p className="font-normal py-1 px-3 w-[85px] text-center text-md rounded bg-gray-400 text-slate-900">
            Inactivo
          </p>
        </div>

        <div className="flex flex-col justify-start items-start lg:w-[400px] md:w-[375px] sm:w-[300px] w-[300px]">
          <p className="font-normal text-[0.9rem] text-slate-500 mb-3 h-[15px]">
            Tratamiento
          </p>
          <p className="text-slate-900 lg:text-lg">Amoxicilina en suspensión</p>
        </div>

        <div className="flex flex-col justify-start items-start">
          <p className="font-normal text-[0.9rem] text-slate-500 mb-3 h-[15px]">
            Cantidad
          </p>
          <p className="text-slate-900 lg:text-lg">250 ml</p>
        </div>

        <div className="flex flex-col justify-start items-start">
          <p className="font-normal text-[0.9rem] text-slate-500 mb-3 h-[15px]">
            Durante
          </p>
          <p className="text-slate-900 lg:text-lg">3 días</p>
        </div>
      </div>
    </div>
  );
}
