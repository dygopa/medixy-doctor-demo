import AutocompleteInput from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInput";
import {
  FormInput,
  FormTextarea,
} from "(presentation)/components/core/BaseComponents/Form";
import { ICIE10 } from "domain/core/entities/cie10Entity";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
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
  diagnose: string;
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
    getCIE10()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="xl:flex items-center justify-between mb-4 w-full">
        <div className="xl:flex items-center w-full">
          <div className="xl:mr-5 mb-1 xl:w-[250px] w-full">
            <p className="text-slate-900 font-lighter text-lg">Diagnóstico</p>
          </div>

          <div className="w-full">
            {error ? (
              <p>Algo no ha salido bien. Vuelve a intentarlo</p>
            ) : (
              <AutocompleteInput
                disabled={loading || error !== null}
                defaultValue={
                  loading ? "Obteniendo enfermedades CIE10" : values.diagnose
                }
                setDefaultValue
                items={
                  successful && cie10.data.length > 0 ? getCIE10List() : []
                }
                placeholder="Nombre de la enfermedad - CIE10"
                className="h-[50px] w-full"
                onlyItemsAdd
                onChange={(item: string) => {
                  if (item.length === 0) setValues({ ...values, diagnose: "" });
                }}
                onClick={(item: string) => {
                  setValues({ ...values, diagnose: item });
                }}
                onKeyDown={(item: string) =>
                  setValues({ ...values, diagnose: item })
                }
              />
            )}
          </div>
        </div>
      </div>

      <div className="xl:flex items-center justify-between mb-4 w-full">
        <div className="xl:flex items-center w-full">
          <div className="xl:mr-5 mb-1 xl:w-[250px] w-full">
            <p className="text-slate-900 font-lighter text-lg">Observaciones</p>
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
