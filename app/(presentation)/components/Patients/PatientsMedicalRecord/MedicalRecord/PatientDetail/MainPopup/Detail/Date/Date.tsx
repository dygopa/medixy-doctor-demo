import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";

export default function Diagnosis() {
  const { medicalConsulty } = useMedicalRecord();

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Fecha de la consulta</h3>
      </div>

      <div>
        <h1 className="text-slate-900 font-bold text-lg">
          {new Date(medicalConsulty.consultationDate).getDate()}/
          {new Date(medicalConsulty.consultationDate).getMonth()}/
          {new Date(medicalConsulty.consultationDate).getFullYear()}
        </h1>
      </div>
    </div>
  );
}
