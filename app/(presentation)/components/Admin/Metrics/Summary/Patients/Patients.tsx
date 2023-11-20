import { useContext, useEffect } from "react";
import SummaryItem from "../SummaryItem/SummaryItem";

export default function Patients({steps}:{steps: number;}) {

  return (
    <SummaryItem title="Cantidad de pacientes" quantity={""} icon="Users" />
  );
}
