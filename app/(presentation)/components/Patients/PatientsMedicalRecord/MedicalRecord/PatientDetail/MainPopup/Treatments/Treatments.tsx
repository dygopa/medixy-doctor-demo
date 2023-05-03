import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import clsx from "clsx";
import React from "react";

function Treatments() {
  const { setPopupActive, setPopupSectionActive, setTitle }: any =
    useMedicalRecord();

  let listOfTreatments = [{}, {}, {}, {}, {}, {}];

  const TreatmentComponent = ({ data, index }: any) => {
    return (
      <div
        className={clsx([
          "relative zoom-in",
          "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="p-5 box h-[20vh] ">
          <div
            className={`w-full flex flex-col justify-between items-start gap-3 overflow-hidden`}
          >
            <div className="w-full h-[40%] flex justify-between items-start">
              <div className="flex flex-col justify-between items-start h-full w-[30%]">
                <p className="font-medium text-lg text-primary">Acetaminofen</p>
                <p className="font-light text-sm text-slate-400">Medicamento</p>
              </div>
              <div
                className={`font-semibold text-sm text-center rounded p-[2px_15px] ${
                  index === 0
                    ? "bg-green-200 text-green-800"
                    : "bg-yellow-200 text-yellow-800"
                }`}
              >
                {index === 0 ? "Activo" : "Completado"}
              </div>
            </div>

            <div className="w-full h-[40%] flex justify-between items-center">
              <div className="flex flex-col justify-center items-start h-full w-[30%]">
                <p className="w-full text-ellipsis overflow-hidden font-medium text-md text-primary">
                  02/01/2023
                </p>
                <p className="font-light text-[13px] text-slate-400">Fecha</p>
              </div>
              <div className="flex flex-col justify-center items-start h-full w-[30%]">
                <p className="w-full text-ellipsis overflow-hidden font-medium text-md text-primary">
                  2 horas
                </p>
                <p className="font-light text-[13px] text-slate-400">
                  Frecuencia
                </p>
              </div>
              <div className="flex flex-col justify-center items-start h-full w-[30%]">
                <p className="w-full text-ellipsis overflow-hidden font-medium text-md text-primary">
                  2 pas.
                </p>
                <p className="font-light text-[13px] text-slate-400">
                  Cantidad
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-fit">
      {listOfTreatments.length > 0 ? (
        listOfTreatments.map((date, i) => (
          <div key={i} className="mb-8 w-full">
            <TreatmentComponent data={date} index={i} key={i} />
          </div>
        ))
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center text-center px-[15%]">
          <p className="font-semibold text-lg text-primary">
            No hay tratamientos
          </p>
          <p className="font-light text-sm text-slate-400">
            Este paciente no tiene tratamientos previos
          </p>
        </div>
      )}
    </div>
  );
}

export default Treatments;
