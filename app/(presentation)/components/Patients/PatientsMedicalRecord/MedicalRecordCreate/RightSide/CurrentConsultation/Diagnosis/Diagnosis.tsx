import AutocompleteInput from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInput";
import {
  FormInput,
  FormTextarea,
} from "(presentation)/components/core/BaseComponents/Form";
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
  diagnose: string[];
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

  const getCIE10List = (): string[] => {
    const cie10List: string[] = [];

    if (cie10.data.length > 0) {
      cie10.data.forEach((cie10Item: ICIE10) => {
        cie10List.push(cie10Item.description4);
      });
    }

    return cie10List;
  };

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
                  <AutocompleteInput
                    disabled={loading || error !== null}
                    defaultValue={
                      loading ? "Obteniendo enfermedades CIE10" : value
                    }
                    items={
                      successful && cie10.data.length > 0 ? getCIE10List() : []
                    }
                    itemsAdded={values.diagnose}
                    placeholder="Nombre de la enfermedad - CIE10"
                    className={clsx([
                      "h-[50px] w-full",
                      diagnoseError && "border-danger",
                    ])}
                    onlyItemsAdd
                    onClick={(item: string) => {
                      if (values.diagnose.indexOf(item) < 0) {
                        setValues({
                          ...values,
                          diagnose: [...values.diagnose, item],
                        });
                        setDiagnoseError(false);
                        setValue("");
                      }
                    }}
                    onKeyDown={(item: string) => {
                      if (values.diagnose.indexOf(item) < 0) {
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

                  <div className="max-w-full overflow-x-auto">
                    {values.diagnose.length > 0 &&
                      values.diagnose.map((value: string, i: number) => (
                        <button
                          type="button"
                          key={i}
                          className="mt-3 mb-3 mr-3"
                          onClick={() => {
                            setValues({
                              ...values,
                              diagnose: values.diagnose.filter(
                                (valueDiagnoseFilter) =>
                                  valueDiagnoseFilter !== value
                              ),
                            });
                          }}
                        >
                          <div className="bg-primary px-2 py-1 w-auto rounded-md flex justify-between items-center">
                            <div className="mr-2">
                              <p className="text-white text-md font-semibold">
                                {value}
                              </p>
                            </div>

                            <div className="mt-1">
                              <Lucide icon="XCircle" color="#fff" size={20} />
                            </div>
                          </div>
                        </button>
                      ))}
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
