export default function Diagnosis() {
  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Fecha de la consulta</h3>
      </div>

      <div>
        <h1 className="text-slate-900 font-bold text-lg">
          {new Date().getDate()}/{new Date().getMonth() + 1}/
          {new Date().getFullYear()}
        </h1>
      </div>
    </div>
  );
}
