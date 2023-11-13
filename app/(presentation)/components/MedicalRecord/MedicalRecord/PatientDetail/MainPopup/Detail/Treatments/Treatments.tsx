import TreatmentsTable from "./Table/Table";

interface ITreatmentsProps {
  subjectId: number;
}

export default function Treatments({ subjectId }: ITreatmentsProps) {
  return (
    <div>
      <div className="mb-3">
        <p className="text-lg font-bold">Tratamientos</p>
      </div>

      <div>
        <TreatmentsTable subjectId={subjectId} />
      </div>
    </div>
  );
}
