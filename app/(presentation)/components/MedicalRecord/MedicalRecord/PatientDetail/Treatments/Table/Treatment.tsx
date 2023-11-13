import { treatmentDosisTypeEnum } from "(presentation)/(enum)/treatment/treatmentEnums";
import {
  ITreatment,
  ITreatmentMedicine,
} from "domain/core/entities/treatmentEntity";

interface ITreatmentProps {
  treatment: ITreatment;
}

export default function Tretament({ treatment }: ITreatmentProps) {
  return (
    <div className="overflow-x-auto w-full">
      <div className="flex items-center justify-between gap-3 rounded-md p-[2%_0%] lg:w-full md:w-full w-[500px]">
        <div className="flex flex-col justify-start items-start ">
          <p className="font-normal lg:text-[0.9rem] md:text-[0.9rem] text-xs text-slate-500 mb-3 h-[15px]">
            Estado
          </p>
          {treatment?.status == 1 ? (
            <p className="font-normal py-1 px-2 w-[75px] text-center rounded lg:text-[0.9rem] md:text-[0.9rem] text-xs  bg-green-400 text-white">
              Activo
            </p>
          ) : (
            <p className="font-normal py-1 px-2 w-[75px] text-center rounded lg:text-[0.9rem] md:text-[0.9rem] text-xs  bg-slate-600 text-white">
              Inactivo
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start items-start lg:w-[400px] md:w-[375px] sm:w-[300px] w-[300px]">
          <p className="font-normal lg:text-[0.9rem] md:text-[0.9rem] text-xs text-slate-500 mb-3 h-[15px]">
            Tratamiento
          </p>
          {treatment.treatmentMedicines.length > 1 ? (
            <p className="text-slate-900 lg:text-[14px] md:text-[14px] text-xs">
              {treatment.treatmentMedicines[0].medicine}{" "}
              {treatment.treatmentMedicines.length > 0 &&
                `- ${treatment.treatmentMedicines.length - 1} medicamentos más`}
            </p>
          ) : (
            <p className="text-slate-900 lg:text-[14px] md:text-[14px] text-xs">
              {treatment.treatmentMedicines[0].medicine}
            </p>
          )}
        </div>

        <div className="flex flex-col justify-start items-start">
          <p className="font-normal lg:text-[0.9rem] md:text-[0.9rem] text-xs text-slate-500 mb-3 h-[15px]">
            Cantidad
          </p>
          <p className="text-slate-900 lg:text-[14px] md:text-[14px] text-xs">
            {treatment.treatmentMedicines[0].dosisQuantity}{" "}
            {treatmentDosisTypeEnum[
              treatment.treatmentMedicines[0].dosisType
            ].toLowerCase()}
          </p>
        </div>
      </div>
    </div>
  );
}
