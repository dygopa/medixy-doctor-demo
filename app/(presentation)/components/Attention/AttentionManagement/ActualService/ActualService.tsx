import { MedicalRecordStatusEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";
import {
  get12HoursFormat,
  getFullDate,
} from "(presentation)/(helper)/dates/datesHelper";
import Button from "(presentation)/components/core/BaseComponents/Button";
import React, { useContext } from "react";
import {
  AttentionContext,
  IAttentionContext,
} from "../context/AttentionContext";
import { TextGroup } from "../TextGroup/TextGroup";

function ActualService() {
  const { state } = useContext<IAttentionContext>(AttentionContext);
  const { data: appointment } = state.appointment;

  return (
    <div className="w-full h-fit relative bg-white flex flex-col justify-start items-start rounded-md shadow-xl">
      <div className="w-full pb-2 border-b flex justify-between items-center p-2">
        <p className="font-bold text-slate-900 text-sm">Servicio actual</p>
        {appointment.data.status !== MedicalRecordStatusEnum.COMPLETE && (
          <Button
            variant="outline-primary"
            onClick={() => {
              console.log("");
            }}
          >
            <p>En proceso</p>
          </Button>
        )}
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-6 text-left px-2 py-4">
        <p className="text-xl text-slate-900 font-bold">
          {appointment.data.service.name ?? ""}
        </p>
        <div className="w-full grid grid-cols-3 gap-2 relative">
          <TextGroup
            label={"Fecha"}
            data={getFullDate(new Date(appointment.data.bookingDate))}
          />
          <TextGroup
            label={"Hora"}
            data={get12HoursFormat(new Date(appointment.data.bookingDate))}
          />
        </div>
      </div>
    </div>
  );
}

export default ActualService;
