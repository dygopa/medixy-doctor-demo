import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import React, { useContext, useState } from "react";
import { twMerge } from "tailwind-merge";

function CreateAgendaHelp({
  cancelFuntion,
  customRef,
}: {
  cancelFuntion: Function;
  customRef: React.LegacyRef<HTMLDivElement>;
}) {
  const { state, actions, dispatch } =
    useContext<IScheduleContext>(ScheduleContext);
  const { changeTypePopup, changeStatusPopup } = actions;
  const { data } = state.typePopupActive;

  let examples = [
    {
      title: "Ventana de atencion #1",
      service: "Consulta general",
      dates: "Lunes, Miércoles y Viernes",
      from: "10:30AM",
      to: "04:00PM",
    },
    {
      title: "Ventana de atencion #2",
      service: "Consulta general",
      dates: "Martes y Jueves",
      from: "08:00AM",
      to: "12:00PM",
    },
    {
      title: "Ventana de atencion #3",
      service: "Consulta general",
      dates: "Martes y Jueves",
      from: "04:00PM",
      to: "08:00PM",
    },
  ];

  const ExampleComponent = ({ data }: { data: any }) => {
    return (
      <div className="w-full border rounded-md p-3 flex flex-col justify-between items-start h-fit gap-5">
        <div className="w-full flex justify-between items-center">
          <p>{data["service"]}</p>
          <p>{data["title"]}</p>
        </div>
        <div className="w-full flex justify-between items-center">
          <p>{data["dates"]}</p>
          <p>
            {data["from"]} - {data["to"]}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={customRef}
      className="w-full md:w-[60%] lg:w-[40%] h-screen  md:min-h-[60vh] md:max-h-[90vh] lg:min-h-[60vh] lg:max-h-[90vh] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 pb-0 gap-8"
    >
      <p className="font-bold text-2xl text-slate-900">Ayuda</p>
      <div className="w-full flex flex-col justify-start items-start gap-5">
        <div className="w-full flex flex-col justify-start items-center gap-3">
          <div className="w-full flex flex-col justify-start items-start gap-1 border-b pb-3">
            <p className="font-semibold text-sm text-slate-900">
              Qué es una ventana de atención
            </p>
            <p className="font-normal text-sm text-slate-900">
              Tu <b>ventana de atención</b> es el rango de horas en la cual los
              clientes podrán realizar citas
            </p>
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-1 border-b pb-3">
            <p className="font-semibold text-sm text-slate-900">
              Qué pasa si tengo varios horarios
            </p>
            <p className="font-normal text-sm text-slate-900">
              Si tienes <b>varios horarios</b> para un servicio puedes crear
              otra <b>ventana de atención</b>
            </p>
          </div>

          <div className="w-full flex flex-col justify-start items-start gap-1 border-b pb-3">
            <p className="font-semibold text-sm text-slate-900">
              Qué es un tiempo promedio de atención
            </p>
            <p className="font-normal text-sm text-slate-900">
              Si tienes <b>varios horarios</b> para un servicio puedes crear
              otra <b>ventana de atención</b>
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-center gap-4">
          <p className="font-normal text-sm text-slate-900">
            Ejemplo practico de <b>varios horarios</b> de un servicio creados
            cómo <b>ventanas de atención</b>
          </p>
          {examples.map((elem) => (
            <ExampleComponent data={elem} />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white">
        <Button
          onClick={() => {
            changeStatusPopup(true)(dispatch);
            changeTypePopup(1)(dispatch);
          }}
          variant="primary"
          type="button"
          className="w-full"
        >
          Regresar
        </Button>
      </div>
    </div>
  );
}

export default CreateAgendaHelp;
