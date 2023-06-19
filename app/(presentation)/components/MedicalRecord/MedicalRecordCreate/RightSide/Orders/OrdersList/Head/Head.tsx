export default function Head() {
  return (
    <div className="flex items-center px-3">
      <div className="w-[200px]">
        <p className="text-md text-slate-900 font-bold">Fecha</p>
      </div>

      <div className="w-[400px]">
        <p className="text-md text-slate-900 font-bold">Tipo de orden</p>
      </div>

      <div className="w-[400px]">
        <p className="text-md text-slate-900 font-bold">
          Estudio o especialidad
        </p>
      </div>

      <div className="text-end">
        <p className="text-md text-slate-900 font-bold">Acciones rápidas</p>
      </div>
    </div>
  );
}
