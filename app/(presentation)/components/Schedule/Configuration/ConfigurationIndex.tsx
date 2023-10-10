"use client";

import { IUser } from "domain/core/entities/userEntity";
import ScheduleProvider from "../context/ScheduleContext";
import Navigator from "./Navigator/Navigator";
import CalendarIndex from "./Calendar/CalendarIndex";
import Popup from "(presentation)/components/core/Popup/Popup";

interface IConfigurationIndexProps {
  user: IUser;
}

export default function ConfigurationIndex({ user }: IConfigurationIndexProps) {
  return (
    <div className="container pt-8">
      <ScheduleProvider>
        <Navigator user={user} />
        <Popup user={user} />
        <CalendarIndex user={user} />
      </ScheduleProvider>
    </div>
  );
}
