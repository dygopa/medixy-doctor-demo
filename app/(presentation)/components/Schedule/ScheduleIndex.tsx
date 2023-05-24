"use client";

import { IUser } from "domain/core/entities/userEntity";
import {useContext, useState} from "react"
import Button from "../core/BaseComponents/Button";
import Lucide from "../core/BaseComponents/Lucide";
import Calendar from "../core/Calendar";
import Side from "./Side/Side";
import { FormInput } from "../core/BaseComponents/Form";
import ScheduleProvider, { IScheduleContext, ScheduleContext } from "./context/ScheduleContext";
import Filters from "./Filters/Filters";
import Popup from "./Popup/Popup";
import PopupIndex from "../core/BaseComponents/Popup/PopupIndex";
import Navigator from "./Navigator/Navigator";

export default function ScheduleIndex() {
  return (
    <div className="container pt-8">
      <ScheduleProvider>
        <PopupIndex/>
        <Navigator/>
        <Popup/>
        <Filters/>
        <div className="mt-8 flex justify-between items-start gap-5">
          {/* BEGIN: Calendar Content */}
          <div className='w-2/3 h-[64vh]'>
            <Calendar initialEvent={""} handleClick={()=>{}}/>
          </div>
          {/* END: Calendar Content */}
          {/* BEGIN: Calendar Side Menu */}
          <Side/>
          {/* END: Calendar Side Menu */}
        </div>
      </ScheduleProvider>
    </div>
  );
}
