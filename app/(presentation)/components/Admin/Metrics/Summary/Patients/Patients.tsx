import SummaryItem from "../SummaryItem/SummaryItem";

export default function Patients({steps}:{steps: number;}) {

  return (
    <SummaryItem 
      title="Pacientes" 
      quantity={"1515"} 
      icon="Users" 
      active={steps === 3} 
    />
  );
}
