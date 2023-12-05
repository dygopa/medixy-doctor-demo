import { useContext, useEffect } from "react";
import {
  DashboardContext,
  IDashboardContext,
} from "../../context/DashboardContext";
import SummaryItem from "../SummaryItem/SummaryItem";

export default function Patients() {
  const { state, actions, dispatch } =
    useContext<IDashboardContext>(DashboardContext);
  const { getTotalSubjects } = actions;
  const { data, loading, error } = state.totalSubjects;

  useEffect(() => {
    getTotalSubjects()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || error) return <div />;

  return (
    <SummaryItem
      title="Cantidad de pacientes"
      quantity={data}
      icon="account-group"
    />
  );
}
