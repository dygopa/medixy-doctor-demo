"use client";

import { IUser } from "domain/core/entities/userEntity";
import {useContext, useState} from "react"
import Popup from "../Popup/Popup";
import ScheduleProvider from "../context/ScheduleContext";
import Calendar from "(presentation)/components/core/Calendar";
import Navigator from "./Navigator/Navigator";


export default function ConfigurationIndex() {

  return (
    <div className="container pt-8">
      <ScheduleProvider>
        <Navigator/>
        <Popup/>
        <div className="mt-8 flex justify-between items-start gap-5">
          {/* BEGIN: Calendar Content */}
          <div className='w-full h-[64vh]'>
            <Calendar initialEvent={""} handleClick={()=>{}}/>
          </div>
          {/* END: Calendar Content */}
        </div>
      </ScheduleProvider>
    </div>
  );
}
