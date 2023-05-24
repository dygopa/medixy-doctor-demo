import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

interface IOrderTypeProps {
  orderType: number | null;
  setOrderType: Dispatch<SetStateAction<number | null>>;
}

export default function OrderType({
  orderType,
  setOrderType,
}: IOrderTypeProps) {
  return (
    <div className="xl:w-[300px]">
      <div className="mb-5">
        <FormSelect
          defaultValue={orderType ? orderType.toString() : ""}
          value={orderType ? orderType.toString() : ""}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setOrderType(parseInt(e.target.value, 10))
          }
        >
          <option value="" disabled>
            Tipo de orden
          </option>
          <option value="1">Laboratorio</option>
          <option value="2">Estudios diagnósticos</option>
          <option value="3">Especialista (interconsulta)</option>
          <option value="4">Justificante médico</option>
          <option value="5">Certificado médico</option>
          <option value="6">Hospitalización</option>
          <option value="7">Abierta</option>
        </FormSelect>
      </div>

      <div className="mb-4">
        <p className="text-md text-slate-400">
          Selecciona el tipo de orden médica que vas indicarle al paciente.
        </p>
      </div>

      {/* <div className="flex items-center justify-between">
        <div>
          <p className="text-md text-slate-900">Incluir diagnóstico</p>
        </div>

        <div className="mr-3 w-[25px] h-[25px]">
          <FormInput type="checkbox" className="w-[25px] h-[25px]" />
        </div>
        </div> */}
    </div>
  );
}
