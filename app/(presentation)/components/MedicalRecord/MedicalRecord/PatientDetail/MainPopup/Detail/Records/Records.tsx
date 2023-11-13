import RecordList from "./RecordList/RecordList";

interface IRecordsProps {
  subjectId: number;
}

export default function Records({ subjectId }: IRecordsProps) {
  return (
    <div>
      <div className="mb-3">
        <p className="text-lg font-bold">Antecedentes</p>
      </div>

      <div>
        <RecordList subjectId={subjectId} />
      </div>
    </div>
  );
}
