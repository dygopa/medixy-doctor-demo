import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import React from "react";

function Treatments() {
  const { setPopupActive, setPopupSectionActive, setTitle } =
    useMedicalRecord();

  let listOfTreatments = [{}, {}, {}, {}, {}, {}];

  const TreatmentComponent = ({
    data,
    index,
  }: {
    data: any;
    index: number;
  }) => {
    return (
      <div
        className={`bg-white shadow-md w-[49%] h-[20vh] flex flex-col justify-between items-start  rounded-md p-4 overflow-hidden`}
      >
        ​
        <div className="w-full h-[40%] flex justify-between items-start">
          <div className="flex flex-col justify-between items-start h-full w-full">
            <p className="text-lg font-bold text-primary">Acetaminofen</p>
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
          ​
        </div>
        ​
        <div className="w-full h-[40%] flex justify-between items-center">
          ​
          <div className="flex flex-col justify-center items-start h-full w-[30%]">
            <p className="w-full text-ellipsis overflow-hidden font-bold text-md text-primary">
              02/01/2023
            </p>
            <p className="font-light text-[13px] text-slate-400">Fecha</p>
          </div>
          <div className="flex flex-col justify-center items-start h-full w-[30%]">
            <p className="w-full text-ellipsis overflow-hidden font-bold text-md text-primary">
              2 horas
            </p>
            <p className="font-light text-[13px] text-slate-400">Frecuencia</p>
          </div>
          <div className="flex flex-col justify-center items-start h-full w-[30%]">
            <p className="w-full text-ellipsis overflow-hidden font-bold text-md text-primary">
              2 pas.
            </p>
            <p className="font-light text-[13px] text-slate-400">Cantidad</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-wrap justify-start items-center content-start w-full h-fit gap-3">
      {listOfTreatments.length > 0 ? (
        listOfTreatments.map((date, i) => (
          <TreatmentComponent data={date} index={i} key={i} />
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
