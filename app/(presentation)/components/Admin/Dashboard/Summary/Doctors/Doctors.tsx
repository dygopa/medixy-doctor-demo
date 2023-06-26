import { useContext, useEffect } from "react";
import {
  DashboardContext,
  IDashboardContext,
} from "../../context/DashboardContext";
import SummaryItem from "../SummaryItem/SummaryItem";

export default function Doctors() {
  const { state, actions, dispatch } =
    useContext<IDashboardContext>(DashboardContext);
  const { getTotalDoctors } = actions;
  const { data, loading, error } = state.totalDoctors;

  useEffect(() => {
    getTotalDoctors()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || error) return <div />;

  return (
    <SummaryItem
      title="Cantidad de doctores"
      quantity={data}
      icon="HeartPulse"
    />
  );
}
