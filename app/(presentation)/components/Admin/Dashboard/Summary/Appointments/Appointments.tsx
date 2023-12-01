import { useContext, useEffect } from "react";
import {
  DashboardContext,
  IDashboardContext,
} from "../../context/DashboardContext";
import SummaryItem from "../SummaryItem/SummaryItem";

export default function Appointments() {
  const { state, actions, dispatch } =
    useContext<IDashboardContext>(DashboardContext);
  const { getTotalAppointments } = actions;
  const { data, loading, error } = state.totalAppointments;

  useEffect(() => {
    getTotalAppointments()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading || error) return <div />;

  return (
    <SummaryItem title="Total de citas" quantity={data} icon="calendar-blank" />
  );
}
