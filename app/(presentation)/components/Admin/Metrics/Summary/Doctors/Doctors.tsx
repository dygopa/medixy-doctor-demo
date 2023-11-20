import { useContext, useEffect } from "react";
import SummaryItem from "../SummaryItem/SummaryItem";

export default function Doctors() {

  return (
    <SummaryItem
      title="Cantidad de doctores"
      quantity={"1515"}
      icon="HeartPulse"
    />
  );
}
