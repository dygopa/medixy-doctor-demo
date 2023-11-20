import { useContext, useEffect } from "react";
import SummaryItem from "../SummaryItem/SummaryItem";

export default function Income({steps}:{steps: number;}) {

  return (
    <SummaryItem title="Ingresos" quantity={""} icon="CalendarCheck" active={steps === 3} />
  );
}
