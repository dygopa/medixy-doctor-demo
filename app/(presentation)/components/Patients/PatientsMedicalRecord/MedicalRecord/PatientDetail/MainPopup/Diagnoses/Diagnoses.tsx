import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import React from "react";

function Diagnoses() {
  const { setPopupActive, setPopupSectionActive, setTitle }: any =
    useMedicalRecord();

  let listOfDiagnoses: any = [];

  const DiagnosisComponent = ({ data, index }: any) => {
    return (
      <div
        className={`bg-white border shadow-md w-[49%] h-[20vh] flex flex-col justify-between items-start gap-3 rounded-md p-[2%] overflow-hidden`}
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
            <p className="font-light text-[13px] text-slate-400">Frecuencia</p>
          </div>
          <div className="flex flex-col justify-center items-start h-full w-[30%]">
            <p className="w-full text-ellipsis overflow-hidden font-medium text-md text-primary">
              2 pas.
            </p>
            <p className="font-light text-[13px] text-slate-400">Cantidad</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`flex flex-wrap  ${
        listOfDiagnoses.length === 0
          ? "justify-center"
          : "justify-start content-start"
      } items-center w-full h-full gap-3`}
    >
      {listOfDiagnoses.length > 0 ? (
        listOfDiagnoses.map((date: any, i: any) => (
          <DiagnosisComponent data={date} index={i} key={i} />
        ))
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center text-center px-[15%]">
          <p className="font-semibold text-lg text-primary">
            No hay diagnosticos
          </p>
          <p className="font-light text-sm text-slate-400">
            Este paciente no tiene diagnosticos previos
          </p>
        </div>
      )}
    </div>
  );
}

export default Diagnoses;
