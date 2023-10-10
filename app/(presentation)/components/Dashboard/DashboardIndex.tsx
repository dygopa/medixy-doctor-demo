"use client";

import { IUser } from "domain/core/entities/userEntity";
import DoctorsCase from "./DoctorsCase/DoctorsCase";
import DashboardProvider from "./DoctorsCase/context/DashboardContext";
import ScheduleProvider from "../Schedule/context/ScheduleContext";
import Popup from "../core/Popup/Popup";

interface IDashboardIndexProps {
  user: IUser;
}

export default function DashboardIndex({ user }: IDashboardIndexProps) {
  return (
    <div className="py-8">
      <DashboardProvider>
        <ScheduleProvider>
          <Popup user={user} />
          <DoctorsCase account={user} />
        </ScheduleProvider>
      </DashboardProvider>
    </div>
  );
}
