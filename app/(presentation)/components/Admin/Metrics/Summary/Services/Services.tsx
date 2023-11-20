import { useContext, useEffect } from "react";
import SummaryItem from "../SummaryItem/SummaryItem";

export default function Services({steps}:{steps: number;}) {

  return (
    <SummaryItem
      title="Servicios"
      quantity={"1515"}
      icon="HeartPulse"
    />
  );
}
