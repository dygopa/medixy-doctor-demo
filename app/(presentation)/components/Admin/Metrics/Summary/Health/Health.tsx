import { useContext, useEffect } from "react";
import SummaryItem from "../SummaryItem/SummaryItem";

export default function Health({steps}:{steps: number;}) {

  return (
    <SummaryItem title="Cantidad de pacientes" quantity={""} icon="Users" />
  );
}
