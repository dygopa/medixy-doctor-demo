import AllergiesList from "./AllergiesList/AllergiesList";

interface IAllergiesProps {
  subjectId: number;
}

export default function Allergies({ subjectId }: IAllergiesProps) {
  return (
    <div>
      <AllergiesList subjectId={subjectId} />
    </div>
  );
}
