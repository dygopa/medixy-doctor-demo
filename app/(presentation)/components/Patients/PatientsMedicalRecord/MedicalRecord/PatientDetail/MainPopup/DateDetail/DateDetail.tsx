import React from "react";

function DateDetail() {
  return (
    <div className="flex flex-wrap justify-between items-start content-start w-full h-fit gap-3">
      <div className="w-full h-fit flex justify-between items-center pb-5">
        <p className="font-semibold text-lg text-primary">Consulta nro. 2</p>
        <p className="font-medium text-base text-primary">02/01/2023</p>
      </div>

      <div className="w-[48%] gap-4 mb-4">
        <p className="w-full font-medium text-[1rem] text-primary text-left mb-2">
          Diagnostico:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-slate-400 text-[1rem]  text-left">
            COVID 19
          </p>
        </div>
      </div>
      <div className="w-[48%] gap-4 mb-4">
        <p className="w-full font-medium text-[1rem] text-primary text-left mb-2">
          Codigo CIE diagnostico:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-slate-400 text-[1rem]  text-left">
            C19
          </p>
        </div>
      </div>
      <div className="w-[48%] gap-4 mb-4">
        <p className="w-full font-medium text-[1rem] text-primary text-left mb-2">
          Peso:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-slate-400 text-[1rem]  text-left">
            60kg
          </p>
        </div>
      </div>
      <div className="w-[48%] gap-4 mb-4">
        <p className="w-full font-medium text-[1rem] text-primary text-left mb-2">
          Talla:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-slate-400 text-[1rem] text-left">
            41cm
          </p>
        </div>
      </div>
      <div className="w-[48%] gap-4 mb-4">
        <p className="w-full font-medium text-[1rem] text-primary text-left mb-2">
          Temperatura:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-slate-400 text-[1rem] text-left">
            39 c.
          </p>
        </div>
      </div>
      <div className="w-[48%] gap-4 mb-4">
        <p className="w-full font-medium text-[1rem] text-primary text-left mb-2">
          Saturación oxigeno:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-slate-400 text-[1rem] text-left">
            39 c.
          </p>
        </div>
      </div>
      <div className="w-[48%] gap-4 mb-4">
        <p className="w-full font-medium text-[1rem] text-primary text-left mb-2">
          Primera vez anio:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-slate-400 text-[1rem] text-left">
            Sí
          </p>
        </div>
      </div>
      <div className="w-[48%] gap-4 mb-4">
        <p className="w-full font-medium text-[1rem] text-primary text-left mb-2">
          Frecuencia cardiaca:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-slate-400 text-[1rem] text-left">
            20 bps
          </p>
        </div>
      </div>
      <div className="w-[48%] gap-4 mb-4">
        <p className="w-full font-medium text-[1rem] text-primary text-left mb-2">
          Grado dificultad:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-slate-400 text-[1rem] text-left">
            Medio
          </p>
        </div>
      </div>
      <div className="w-[48%] gap-4 mb-4">
        <p className="w-full font-medium text-[1rem] text-primary text-left mb-2">
          Migrante:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-slate-400 text-[1rem] text-left">
            No
          </p>
        </div>
      </div>
      <div className="w-[48%] gap-4 mb-4">
        <p className="w-full font-medium text-[1rem] text-primary text-left mb-2">
          Riesgo:
        </p>
        <div className="w-fit max-w-[50%] break-words">
          <p className="w-full font-medium text-slate-400 text-[1rem] text-left">
            Bajo
          </p>
        </div>
      </div>
    </div>
  );
}

export default DateDetail;
