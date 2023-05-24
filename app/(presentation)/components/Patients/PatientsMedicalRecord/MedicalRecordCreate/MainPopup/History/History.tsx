import React from "react";

function History() {
  let listOfDates = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

  const DateComponent = ({ data, index }: { data: any; index: number }) => {
    return (
      <div className="relative w-full flex justify-center items-center h-fit">
        <div className="relative w-[8%] h-[12vh] flex flex-col justify-start items-center">
          <span
            className={`h-[40%] w-[4px] ${
              index === 0 ? "bg-white" : "bg-secondary"
            }`}
          ></span>
          <span className="h-[20px] w-[20px] rounded-full border-4 border-secondary bg-white"></span>
          <span
            className={`h-[40%] w-[4px] ${
              index === listOfDates.length - 1 ? "bg-white" : "bg-secondary"
            }`}
          ></span>
        </div>
        <div
          className={`transition hover:bg-slate-100 bg-white w-[92%] h-[10vh] cursor-pointer flex justify-start items-center gap-3 rounded-md p-[2%_2%] overflow-hidden`}
        >
          <div className="flex flex-col justify-start items-start w-[30%]">
            <p className="font-medium text-[1.2rem] text-primary">
              {data["date"] ?? "03/01/2023"}
            </p>
            <p className="font-light text-[0.8rem] text-slate-400">12:00 PM</p>
          </div>
          <div className="flex flex-col justify-start items-start w-[20%]">
            <p className="font-light text-[0.8rem] text-slate-400">
              Diagnostico
            </p>
            <p className="font-semibold text-[0.9rem] text-slate-900 whitespace-nowrap w-full overflow-hidden text-ellipsis">
              {data["date"] ?? "Coronavirus"}
            </p>
          </div>
          <div className="flex flex-col justify-start items-start w-[20%]">
            <p className="font-light text-[0.8rem] text-slate-400">Centro</p>
            <p className="font-semibold text-[0.9rem] text-slate-900 whitespace-nowrap w-full overflow-hidden text-ellipsis">
              {data["date"] ?? "Centro de salud"}
            </p>
          </div>
          <div className="flex flex-col justify-start items-start w-[30%]">
            <p className="font-light text-[0.8rem] text-slate-400">
              Servicio atención
            </p>
            <p className="font-semibold text-[0.9rem] text-slate-900 whitespace-nowrap w-full overflow-hidden text-ellipsis">
              {data["date"] ?? "CONSULTA EXTERNA GENERAL"}
            </p>
          </div>
        </div>
        ​
      </div>
    );
  };

  return (
    <>
      {listOfDates.length > 0 ? (
        listOfDates.map((date, i) => (
          <DateComponent data={date} index={i} key={i} />
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
