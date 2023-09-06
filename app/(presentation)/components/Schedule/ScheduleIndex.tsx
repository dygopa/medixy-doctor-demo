"use client";

import ScheduleProvider from "./context/ScheduleContext";
import Filters from "./Filters/Filters";
import Popup from "../core/Popup/Popup";
import Navigator from "./Navigator/Navigator";
import CalendarIndex from "./Calendar/CalendarIndex";
import { useContext, useState } from "react";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";

export default function ScheduleIndex() {
  const { state } = useContext<IAuthContext>(AuthContext);
  const { data: user } = state.getUserAuthenticated;

  const [selectedLocality, setSelectedLocality] = useState({
    id: 0,
    title: "",
    description: "",
  });

  if (!user?.userId) return <div />;

  return (
    <div className="container pt-8">
      <ScheduleProvider>
        <Navigator selectedLocality={selectedLocality} />
        <Popup />
        <Filters
          selectedLocality={selectedLocality}
          setSelectedLocality={setSelectedLocality}
        />
        <CalendarIndex />
      </ScheduleProvider>
    </div>
  );
}
