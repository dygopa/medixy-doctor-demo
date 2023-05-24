import React from "react";

function DateDetail() {
  return (
    <div className="flex flex-wrap justify-between items-start content-start w-full h-fit gap-3">
      <div className="w-full h-fit flex justify-between items-center border-b pb-5">
        <p className="font-semibold text-2xl text-primary">Consulta nro. 2</p>
        <p className="font-medium text-base text-primary">02/01/2023</p>
      </div>
      ​
      <div className="flex justify-between items-start w-[48%] gap-4 mb-4">
        <p className="w-1/2 font-light text-[0.9rem] text-slate-400">
          Diagnostico:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-[1rem] text-primary text-left">
            COVID 19
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start w-[48%] gap-4 mb-4">
        <p className="w-1/2 font-light text-[0.9rem] text-slate-400">
          Codigo CIE diagnostico:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-[1rem] text-primary text-left">
            C19
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start w-[48%] gap-4 mb-4">
        <p className="w-1/2 font-light text-[0.9rem] text-slate-400">Peso:</p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-[1rem] text-primary text-left">
            60kg
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start w-[48%] gap-4 mb-4">
        <p className="w-1/2 font-light text-[0.9rem] text-slate-400">Talla:</p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-[1rem] text-primary text-left">
            41cm
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start w-[48%] gap-4 mb-4">
        <p className="w-1/2 font-light text-[0.9rem] text-slate-400">
          Temperatura:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-[1rem] text-primary text-left">
            39 c.
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start w-[48%] gap-4 mb-4">
        <p className="w-1/2 font-light text-[0.9rem] text-slate-400">
          Saturación oxigeno:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-[1rem] text-primary text-left">
            39 c.
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start w-[48%] gap-4 mb-4">
        <p className="w-1/2 font-light text-[0.9rem] text-slate-400">
          Primera vez anio:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-[1rem] text-primary text-left">
            Sí
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start w-[48%] gap-4 mb-4">
        <p className="w-1/2 font-light text-[0.9rem] text-slate-400">
          Frecuencia cardiaca:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-[1rem] text-primary text-left">
            20 bps
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start w-[48%] gap-4 mb-4">
        <p className="w-1/2 font-light text-[0.9rem] text-slate-400">
          Grado dificultad:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-[1rem] text-primary text-left">
            Medio
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start w-[48%] gap-4 mb-4">
        <p className="w-1/2 font-light text-[0.9rem] text-slate-400">
          Migrante:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-[1rem] text-primary text-left">
            No
          </p>
        </div>
      </div>
      <div className="flex justify-between items-start w-[48%] gap-4 mb-4">
        <p className="w-1/2 font-light text-[0.9rem] text-slate-400">Riesgo:</p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-[1rem] text-primary text-left">
            Bajo
          </p>
        </div>
      </div>
    </div>
  );
}

export default DateDetail;
