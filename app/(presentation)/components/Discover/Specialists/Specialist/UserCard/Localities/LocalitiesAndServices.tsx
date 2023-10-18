import { twMerge } from "tailwind-merge";
import { BsCheckLg } from "react-icons/bs";
import { Specialist } from "domain/core/entities/specialists/specialist";
import { useContext, useMemo } from "react";
import {
  ISpecialistsContext,
  SpecialistsContext,
} from "../../../context/SpecialistsContext";

function LocalitiesComponent({ specialist }: { specialist: Specialist }) {
  const { state, actions, dispatch } =
    useContext<ISpecialistsContext>(SpecialistsContext);
  const { getSpecialistLocalities } = actions;
  const {
    data: localities,
    loading: loadingLocalities,
    successful: loadedLocalities,
    error: errorLocalities,
  } = state.getSpecialistLocalities;

  useMemo(() => {
    getSpecialistLocalities(specialist.userId)(dispatch);
  }, []);

  const localityComponent = ({ elem }: { elem: any }) => {
    return (
      <>
        <div
          className={twMerge([
            "w-full flex justify-start items-center gap-3 bg-primary bg-opacity-30 rounded-md p-3",
          ])}
        >
          <div className="w-[8%] h-full relative flex flex-col justify-center items-center">
            <span
              className={twMerge([
                "w-7 h-7 border-[3px] border-secondary text-white text-[12px] rounded-full flex flex-col justify-center items-center",
              ])}
            >
              <BsCheckLg />
            </span>
          </div>
          <div className="w-[92%] flex flex-col justify-center items-start gap-2">
            <p className="paragraph text-slate-900">
              <b>{elem["name"]}</b>
            </p>
            <p className="paragraph">
              {elem.address.postal_code.length > 0
                ? elem.address.postal_code
                : "Ubicacion no especificada"}
            </p>
          </div>
        </div>
        <div
          className={twMerge([
            "w-full px-10 h-fit rounded-md shadow-md drop-shadow-xl",
          ])}
        ></div>
      </>
    );
  };

  return (
    <div className="w-full relative h-fit flex flex-col justify-start items-start gap-6">
      <div className="w-full flex flex-col justify-center items-start gap-2">
        <p className="text-lg text-slate-900 font-semibold">Consultorios</p>
        <div className="w-full bg-slate-300 h-px block relative"></div>
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-4">
        {loadingLocalities ? (
          <div className="w-full h-fit py-6 flex flex-col justify-center items-center gap-2 text-center">
            <p className="text-slate-900 text-base font-medium">Cargando...</p>
            <p className="text-slate-500 text-sm font-light">
              Obteniendo tus consultorios
            </p>
          </div>
        ) : localities.length > 0 ? (
          localities.map((elem: any) => localityComponent({ elem }))
        ) : (
          <div className="w-full h-fit py-6 flex flex-col justify-center items-center gap-2 text-center">
            <p className="text-slate-900 text-base font-medium">
              Nada por aquí
            </p>
            <p className="text-slate-500 text-sm font-light">
              No posees consultorios en este momento
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LocalitiesComponent;
