import RecordList from "./RecordList/RecordList";

interface IRecordsProps {
  subjectId: number;
}

export default function Records({ subjectId }: IRecordsProps) {
  return (
    <div>
      <RecordList subjectId={subjectId} />
    </div>
  );
}
