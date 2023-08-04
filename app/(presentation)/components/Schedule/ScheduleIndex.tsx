"use client";

import ScheduleProvider from "./context/ScheduleContext";
import Filters from "./Filters/Filters";
import Popup from "../core/Popup/Popup";
import Navigator from "./Navigator/Navigator";
import CalendarIndex from "./Calendar/CalendarIndex";
import { useState } from "react";

export default function ScheduleIndex() {
  const [selectedLocality, setSelectedLocality] = useState({
    id: 0,
    title: "",
    description: "",
  });
  return (
    <div className="container pt-8">
      <ScheduleProvider>
        <Navigator selectedLocality={selectedLocality} />
        <Popup/>
        <Filters selectedLocality={selectedLocality} setSelectedLocality={setSelectedLocality}/>
        <CalendarIndex/>
      </ScheduleProvider>
    </div>
  );
}
