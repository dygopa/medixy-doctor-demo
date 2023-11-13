import VitalSignsList from "./VitalSignsList/VitalSignsList";

interface IVitalSignsProps {
  subjectId: number;
}

export default function VitalSigns({ subjectId }: IVitalSignsProps) {
  return (
    <div>
      <div className="mb-3">
        <p className="text-lg font-bold">Signos vítales</p>
      </div>

      <div>
        <VitalSignsList subjectId={subjectId} />
      </div>
    </div>
  );
}
