import AutocompleteInput from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInput";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
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
        <AutocompleteInput
          defaultValue={values.category}
          setDefaultValue
          items={["Rayos X de Tórax"]}
          placeholder="Escribe el examen a realizarse"
          className="w-full"
          onChange={(item: string) => setValues({ ...values, category: item })}
          onClick={(item: string) => setValues({ ...values, category: item })}
          onKeyDown={(item: string) => setValues({ ...values, category: item })}
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
