import {
  get12HoursFormat,
  getFullDate,
} from "(presentation)/(helper)/dates/datesHelper";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { EventClickArg } from "@fullcalendar/core";
import { Dispatch, SetStateAction } from "react";

interface AttentionWindowModalProps {
  setShowAttentionWindow: Dispatch<SetStateAction<boolean>>;
  eventSelected: EventClickArg;
}

export default function AttentionWindowModal({
  setShowAttentionWindow,
  eventSelected,
}: AttentionWindowModalProps) {
  return (
    <div className="w-full px-4">
      <div className="mb-14">
        <p className="font-bold text-2xl text-slate-900">Ventana de atención</p>
      </div>

      <div className="mb-8">
        <div>
          <p className="font-bold text-lg text-slate-900">Servicio</p>
        </div>

        <div>
          <p className="font-normal text-lg text-slate-900">
            {eventSelected.event._def.title}
          </p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mb-14 mr-14 w-[200px]">
          <div>
            <p className="font-bold text-lg text-slate-900">Fecha inicio</p>
          </div>

          <div>
            <p className="font-normal text-lg text-slate-900">
              {getFullDate(
                eventSelected.event._instance?.range.start ?? new Date()
              )}
            </p>
          </div>
        </div>

        <div className="mb-14">
          <div>
            <p className="font-bold text-lg text-slate-900">
              Fecha culminación
            </p>
          </div>

          <div>
            <p className="font-normal text-lg text-slate-900">
              {getFullDate(
                eventSelected.event._instance?.range.end ?? new Date()
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mb-14 mr-14 w-[200px]">
          <div>
            <p className="font-bold text-lg text-slate-900">Hora inicio</p>
          </div>

          <div>
            <p className="font-normal text-lg text-slate-900">
              {get12HoursFormat(
                eventSelected.event._instance?.range.start ?? new Date()
              )}
            </p>
          </div>
        </div>

        <div className="mb-14">
          <div>
            <p className="font-bold text-lg text-slate-900">Hora culminación</p>
          </div>

          <div>
            <p className="font-normal text-lg text-slate-900">
              {get12HoursFormat(
                eventSelected.event._instance?.range.end ?? new Date()
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="lg:flex items-center text-center justify-center">
        <div className="lg:mr-6 lg:mb-0 mb-4">
          <Button
            variant="primary"
            className="w-[275px]"
            onClick={() => setShowAttentionWindow(false)}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
