import { useContext, useEffect } from "react";
import SummaryItem from "../SummaryItem/SummaryItem";

export default function Services({steps}:{steps: number;}) {

  return (
    <SummaryItem
      title="Servicios"
      quantity={""}
      icon="Briefcase"
      active={steps === 1} 
    />
  );
}
