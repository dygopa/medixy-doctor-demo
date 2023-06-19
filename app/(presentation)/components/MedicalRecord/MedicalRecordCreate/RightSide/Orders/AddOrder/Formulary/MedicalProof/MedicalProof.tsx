import { FormTextarea } from "(presentation)/components/core/BaseComponents/Form";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { valuesTypes } from "../../AddOrder";

interface IMedicalProofProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function MedicalProof({
  values,
  setValues,
}: IMedicalProofProps) {
  return (
    <div className="w-full">
      <div className="mb-4 w-full">
        <FormTextarea
          name="indication"
          value={values.indication}
          placeholder="Escribe el justificativo médico"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
          className="w-full"
          rows={6}
        />
      </div>
    </div>
  );
}
