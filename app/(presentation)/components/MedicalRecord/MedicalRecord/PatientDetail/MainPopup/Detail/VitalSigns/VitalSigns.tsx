import VitalSignsList from "./VitalSignsList/VitalSignsList";

interface IVitalSignsProps {
  subjectId: number;
}

export default function VitalSigns({ subjectId }: IVitalSignsProps) {
  return (
    <div>
      <VitalSignsList subjectId={subjectId} />
    </div>
  );
}
