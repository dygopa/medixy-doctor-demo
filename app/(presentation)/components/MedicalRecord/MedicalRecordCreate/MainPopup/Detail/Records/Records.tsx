import { useState } from "react";
import RecordsForm from "./RecordsForm/RecordsForm";
import RecordList from "./RecordsList/RecordsList";

interface IRecordsProps {
  subjectId: number;
}

export default function Records({ subjectId }: IRecordsProps) {
  const [showRecordsForm, setShowRecordsForm] = useState(false);

  if (showRecordsForm)
    return <RecordsForm setShowRecordsForm={setShowRecordsForm} />;

  return (
    <RecordList subjectId={subjectId} setShowRecordsForm={setShowRecordsForm} />
  );
}
