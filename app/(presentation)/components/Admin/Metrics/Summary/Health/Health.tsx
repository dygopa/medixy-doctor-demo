import { useContext, useEffect } from "react";
import SummaryItem from "../SummaryItem/SummaryItem";

export default function Health({steps}:{steps: number;}) {

  return (
    <SummaryItem 
      title="Salud" 
      quantity={""} 
      icon="HeartPulse" 
      active={steps === 2} 
    />
  );
}
