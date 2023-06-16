"use client";

import ScheduleProvider from "./context/ScheduleContext";
import Filters from "./Filters/Filters";
import Popup from "./Popup/Popup";
import PopupIndex from "../core/BaseComponents/Popup/PopupIndex";
import Navigator from "./Navigator/Navigator";
import CalendarIndex from "./Calendar/CalendarIndex";

export default function ScheduleIndex() {
  return (
    <div className="container pt-8">
      <ScheduleProvider>
        <PopupIndex/>
        <Navigator/>
        <Popup/>
        <Filters/>
        <CalendarIndex/>
      </ScheduleProvider>
    </div>
  );
}
