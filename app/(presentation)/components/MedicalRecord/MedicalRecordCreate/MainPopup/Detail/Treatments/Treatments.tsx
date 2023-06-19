import TreatmentsTable from "./Table/Table";

interface ITreatmentsProps {
  subjectId: number;
}

export default function Treatments({ subjectId }: ITreatmentsProps) {
  return (
    <div>
      <TreatmentsTable subjectId={subjectId} />
    </div>
  );
}
