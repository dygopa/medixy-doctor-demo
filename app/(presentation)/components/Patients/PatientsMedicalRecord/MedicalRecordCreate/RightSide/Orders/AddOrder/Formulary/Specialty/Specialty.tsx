import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { valuesTypes } from "../../AddOrder";

interface ISpecialtyProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function Specialty({ values, setValues }: ISpecialtyProps) {
  return (
    <div className="w-full">
      <div className="mb-4 w-full">
        <FormSelect
          name="specialty"
          value={values.specialty}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
          className="w-full"
        >
          <option value="" disabled>
            Selecciona la especialidad
          </option>
          <option value="Oftalmologia">Oftalmologia</option>
        </FormSelect>
      </div>

      <div className="mb-4 w-full">
        <FormInput
          name="doctor"
          type="text"
          value={values.doctor}
          placeholder="Nombre del médico (opcional)"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
          className="w-full"
        />
      </div>

      <div className="mb-4 w-full">
        <FormInput
          name="otherDoctor"
          type="text"
          value={values.otherDoctor}
          placeholder="Otro médico (opcional)"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
          className="w-full"
        />
      </div>
    </div>
  );
}
