import { IAutocompleteValue } from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInput";
import AutocompleteInputCIE10 from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputCIE10/AutocompleteInputCIE10";
import { FormTextarea } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import TableDiagnosis from "./Table/Table";

type valuesTypes = {
  diagnose: ICIE10[];
  observations: string;
};

interface IDiagnosisProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
  diagnoseError: boolean;
  setDiagnoseError: Dispatch<SetStateAction<boolean>>;
}

export default function DiagnosisDetail({
  values,
  setValues,
  diagnoseError,
  setDiagnoseError,
}: IDiagnosisProps) {
  const [showBody, setShowBody] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div>
      <div className="xl:flex items-center justify-between mb-4 w-full">
        <div className="xl:flex items-center w-full">
          <div className="xl:mr-5 mb-1 lg:w-[300px] w-full">
            <p className="text-md">
              Diagnóstico <span className="text-primary font-bold">*</span>
            </p>
          </div>

          <div className="w-full">
            <AutocompleteInputCIE10
              placeholder="Nombre de la enfermedad - CIE10"
              className={clsx([
                "h-[50px] w-full",
                diagnoseError && "border-danger",
              ])}
              onClick={(item: IAutocompleteValue) => {
                if (
                  values.diagnose.findIndex(
                    (itemFind) => itemFind.id === item.id
                  ) < 0
                ) {
                  const cie10: ICIE10 = {
                    id: item.id,
                    code3: "",
                    description3: "",
                    code4: "",
                    description4: item.name,
                    isPrincipal: values.diagnose.length === 0 ? true : false,
                  };

                  setValues({
                    ...values,
                    diagnose: [...values.diagnose, cie10],
                  });
                  setDiagnoseError(false);
                  setValue("");
                }
              }}
            />

            {diagnoseError && (
              <p className="text-danger mt-1">Debe agregar los diagnósticos</p>
            )}

            <div className="max-w-full overflow-x-auto mt-3">
              <TableDiagnosis
                cie10={values.diagnose}
                values={values}
                setValues={setValues}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="xl:flex items-center justify-between mb-4 w-full">
        <div className="xl:flex items-center w-full">
          <div className="xl:mr-5 mb-1 lg:w-[300px] w-full">
            <p className="text-md">Observaciones</p>
          </div>

          <div className="w-full">
            <FormTextarea
              value={values.observations}
              name="observations"
              placeholder="Notas"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              className="h-[50px] w-full"
              rows={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
