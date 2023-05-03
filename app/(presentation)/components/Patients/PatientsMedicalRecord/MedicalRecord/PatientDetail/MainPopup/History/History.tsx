import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import clsx from "clsx";
import React from "react";

function History() {
  const { setPopupActive, setPopupSectionActive, setTitle }: any =
    useMedicalRecord();

  let listOfDates = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

  const DateComponent = ({ data, index }: any) => {
    return (
      <div
        className={clsx([
          "relative zoom-in",
          "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="p-5 box">
          <div className="relative w-full flex justify-center items-center h-fit">
            <div className="flex flex-col justify-start items-start w-[22%]">
              <p className="font-semibold">{data["date"] ?? "03/01/2023"}</p>
              <p className="font-light text-[0.8rem] text-slate-400 whitespace-nowrap w-full overflow-hidden text-ellipsis">
                12:00 PM
              </p>
            </div>

            <div className="flex flex-col justify-start items-start w-[20%]">
              <p className="font-semibold mb-2">Diagnostico</p>
              <p className="font-light text-[0.8rem] text-slate-400 whitespace-nowrap w-full overflow-hidden text-ellipsis">
                {data["date"] ?? "Coronavirus"}
              </p>
            </div>

            <div className="flex flex-col justify-start items-start w-[20%]">
              <p className="font-semibold mb-2">Centro</p>
              <p className="font-light text-[0.8rem] text-slate-400 whitespace-nowrap w-full overflow-hidden text-ellipsis">
                {data["date"] ?? "Centro de salud"}
              </p>
            </div>

            <div className="flex flex-col justify-start items-start w-[30%]">
              <p className="font-semibold mb-2">Servicio atención</p>
              <p className="font-light text-[0.8rem] text-slate-400 whitespace-nowrap w-full overflow-hidden text-ellipsis">
                {data["date"] ?? "CONSULTA EXTERNA GENERAL"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {listOfDates.length > 0 ? (
        listOfDates.map((date, i) => (
          <div key={i} className="mb-8">
            <DateComponent data={date} index={i} />
          </div>
        ))
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center text-center px-[15%]">
          <p className="font-semibold text-lg text-primary">No hay citas</p>
          <p className="font-light text-sm text-slate-400">
            Este paciente no tiene citas previas
          </p>
        </div>
      )}
    </>
  );
}

export default History;
