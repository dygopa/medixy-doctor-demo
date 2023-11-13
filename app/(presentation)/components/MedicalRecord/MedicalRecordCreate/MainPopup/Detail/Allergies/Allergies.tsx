import AllergiesList from "./AllergiesList/AllergiesList";

interface IAllergiesProps {
  subjectId: number;
}

export default function Allergies({ subjectId }: IAllergiesProps) {
  return (
    <div>
      <div className="mb-3">
        <p className="text-lg font-bold">Alergías</p>
      </div>

      <div>
        <AllergiesList subjectId={subjectId} />
      </div>
    </div>
  );
}
