import { useContext, useEffect } from "react";
import SummaryItem from "../SummaryItem/SummaryItem";

export default function Appointments() {

  return (
    <SummaryItem title="Total de citas" quantity={""} icon="CalendarCheck" />
  );
}
