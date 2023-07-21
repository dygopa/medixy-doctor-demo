"use client";

import { IUser } from "domain/core/entities/userEntity";
import {useContext, useState} from "react"
import ScheduleProvider from "../context/ScheduleContext";
import Calendar from "(presentation)/components/core/Calendar";
import Navigator from "./Navigator/Navigator";
import CalendarIndex from "./Calendar/CalendarIndex";
import Popup from "(presentation)/components/core/Popup/Popup";


export default function ConfigurationIndex() {

  return (
    <div className="container pt-8">
      <ScheduleProvider>
        <Navigator/>
        <Popup/>
        <CalendarIndex/>
      </ScheduleProvider>
    </div>
  );
}
