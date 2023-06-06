import AutocompleteInputCIE10 from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputCIE10";
import { FormTextarea } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import { useSearchParams } from "next/navigation";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../../../context/MedicalRecordCreateContext";
import TableDiagnosis from "./Table/Table";

type valuesTypes = {
  consultationDate: string;
  referredBy: string;
  consultationReason: string;
  sufferingDate: string;
  generalInspection: string;
  respiratorySystem: string;
  digestiveSystem: string;
  cardiovascularSystem: string;
  reproductiveSystem: string;
  urinarySystem: string;
  ophthalmologicalSystem: string;
  locomotorSystem: string;
  earInspection: string;
  neurologicalInspection: string;
  skinInspection: string;
  size: string;
  weight: string;
  temperature: string;
  respiratoryFrequency: string;
  oximetry: string;
  muscleMass: string;
  glicemy: string;
  diagnose: ICIE10[];
  observations: string;
};

interface IDiagnosisProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function Diagnosis({ values, setValues }: IDiagnosisProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { getCIE10 } = actions;
  const { data: cie10, loading, successful, error } = state.cie10;

  const [showBody, setShowBody] = useState(false);
  const [value, setValue] = useState("");
  const [diagnoseError, setDiagnoseError] = useState(false);

  const params = useSearchParams();

  const diagnose = params.get("diagnose");

  useEffect(() => {
    if (diagnose === "true") {
      setDiagnoseError(true);
      setShowBody(true);
    }
  }, [diagnose]);

  useEffect(() => {
    getCIE10()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button
        type="button"
        onClick={() => setShowBody(!showBody)}
        className="w-full flex justify-between items-center border-b mb-5 pb-2"
      >
        <div>
          <p className="font-bold text-lg text-slate-900">Diagnóstico</p>
        </div>

        <div>
          <Lucide
            icon={showBody ? "Minus" : "Plus"}
            color="#22345F"
            size={30}
          />
        </div>
      </button>

      <div className={clsx([showBody ? "block" : "hidden"])}>
        <div className="xl:flex items-center justify-between mb-4 w-full">
          <div className="xl:flex items-center w-full">
            <div className="xl:mr-5 mb-1 xl:w-[305px] w-full">
              <p className="text-lg">Diagnóstico</p>
            </div>

            <div className="w-full">
              {error ? (
                <p>Algo no ha salido bien. Vuelve a intentarlo</p>
              ) : (
                <>
                  <AutocompleteInputCIE10
                    disabled={loading || error !== null}
                    defaultValue={
                      loading ? "Obteniendo enfermedades CIE10" : value
                    }
                    items={
                      successful && cie10.data.length > 0 ? cie10.data : []
                    }
                    itemsAdded={values.diagnose}
                    placeholder="Nombre de la enfermedad - CIE10"
                    className={clsx([
                      "h-[50px] w-full",
                      diagnoseError && "border-danger",
                    ])}
                    onClick={(item: ICIE10) => {
                      if (
                        values.diagnose.findIndex(
                          (itemFind) => itemFind.id === item.id
                        ) < 0
                      ) {
                        setValues({
                          ...values,
                          diagnose: [...values.diagnose, item],
                        });
                        setDiagnoseError(false);
                        setValue("");
                      }
                    }}
                  />

                  {diagnoseError && (
                    <p className="text-danger mt-1">
                      Debe agregar los diagnósticos
                    </p>
                  )}

                  <div className="max-w-full overflow-x-auto mt-3">
                    <TableDiagnosis
                      cie10={values.diagnose}
                      values={values}
                      setValues={setValues}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="xl:flex items-center justify-between mb-4 w-full">
          <div className="xl:flex items-center w-full">
            <div className="xl:mr-5 mb-1 xl:w-[305px] w-full">
              <p className="text-lg">Observaciones</p>
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
    </div>
  );
}
