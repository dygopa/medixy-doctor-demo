import AutocompleteInput from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInput";
import AutocompleteInputMedicalProfiles from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputMedicalProfiles/AutocompleteInputMedicalProfiles";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import { IMedicalProfile } from "domain/core/entities/medicalProfileEntity";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { valuesTypes } from "../../AddOrder";

interface IDiagnosisProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function Diagnosis({ values, setValues }: IDiagnosisProps) {
  return (
    <div className="w-full">
      <div className="mb-4 w-full">
        <AutocompleteInputMedicalProfiles
          defaultValue={values.medicalProfile.name}
          placeholder="Escribe el examen a realizarse"
          className="w-full"
          onChange={(item: string) =>
            setValues({
              ...values,
              medicalProfile: {
                id: null,
                name: item,
              } as IMedicalProfile,
            })
          }
          onClick={(item: IMedicalProfile) =>
            setValues({ ...values, medicalProfile: item })
          }
        />
      </div>

      <div className="mb-4 w-full">
        <FormInput
          name="indication"
          type="text"
          value={values.indication}
          placeholder="Indicaciones"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
          className="w-full"
        />
      </div>
    </div>
  );
}
