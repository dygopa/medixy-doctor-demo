"use client";

import ScheduleProvider from "./context/ScheduleContext";
import Filters from "./Filters/Filters";
import Popup from "../core/Popup/Popup";
import Navigator from "./Navigator/Navigator";
import CalendarIndex from "./Calendar/CalendarIndex";
import { useState } from "react";
import { IUser } from "domain/core/entities/userEntity";

interface IScheduleIndexProps {
  user: IUser;
}

export default function ScheduleIndex({ user }: IScheduleIndexProps) {
  const [selectedLocality, setSelectedLocality] = useState({
    id: 0,
    title: "",
    description: "",
  });

  return (
    <div className="container pt-8">
      <ScheduleProvider>
        <Navigator selectedLocality={selectedLocality} />
        <Popup user={user} from={"SCHEDULE"} />
        <Filters
          user={user}
          selectedLocality={selectedLocality}
          setSelectedLocality={setSelectedLocality}
        />
        <CalendarIndex user={user} />
      </ScheduleProvider>
    </div>
  );
}
