import { useContext, useEffect } from "react";
import SummaryItem from "../SummaryItem/SummaryItem";

export default function Patients() {

  return (
    <SummaryItem title="Cantidad de pacientes" quantity={""} icon="Users" />
  );
}
