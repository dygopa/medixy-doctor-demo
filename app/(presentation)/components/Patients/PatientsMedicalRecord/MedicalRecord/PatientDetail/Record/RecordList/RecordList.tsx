export default function RecordList() {
  return (
    <div className="mt-4">
      <div className="mb-1">
        <p className="text-base text-slate-500 font-normal">
          Antecedentes personales
        </p>
      </div>

      <div>
        <div className="mb-1">
          <p className="text-slate-900 text-lg font-medium">Asma</p>
        </div>

        <div className="mb-1">
          <p className="text-slate-900 text-lg font-medium">
            Problemas gastrointestinales
          </p>
        </div>

        <div className="mb-1">
          <p className="text-slate-900 text-lg font-medium">Hepatitis</p>
        </div>
      </div>

      <div className="mb-1 mt-8">
        <p className="text-base text-slate-500 font-normal">
          Antecedentes familiares
        </p>
      </div>

      <div>
        <div className="mb-1">
          <p className="text-slate-900 text-lg font-medium">Cáncer - Abuelo</p>
        </div>

        <div className="mb-1">
          <p className="text-slate-900 text-lg font-medium">Diábetes - Madre</p>
        </div>
      </div>
    </div>
  );
}
