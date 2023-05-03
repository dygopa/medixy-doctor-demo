export default function TreatmentsTable() {
  return (
    <div className="w-full cursor-pointer flex justify-start items-center gap-3 rounded-md p-[2%_0%] overflow-hidden">
      <div className="flex flex-col justify-start items-start w-[15%]">
        <p className="font-semibold text-[0.9rem] text-slate-900 mb-3">
          Estado
        </p>
        <p className="font-semibold p-[3%_3%] text-center text-[0.7rem] rounded text-green-900 bg-green-400 w-full">
          Activo
        </p>
      </div>

      <div className="flex flex-col justify-start items-start w-[40%]">
        <p className="font-semibold text-[0.9rem] text-slate-900 mb-3">
          Tratamiento
        </p>
        <p className="font-light text-[0.8rem] text-slate-400">Acetaminofen</p>
      </div>

      <div className="flex flex-col justify-start items-start w-[30%]">
        <p className="font-semibold text-[0.9rem] text-slate-900 mb-3">
          Cantidad
        </p>
        <p className="font-light text-[0.8rem] text-slate-400">300mg</p>
      </div>

      <div className="flex flex-col justify-start items-start w-[15%]">
        <p className="font-semibold text-[0.9rem] text-slate-900 mb-3">
          Durante
        </p>
        <p className="font-light text-[0.8rem] text-slate-400">2 sem.</p>
      </div>
    </div>
  );
}
