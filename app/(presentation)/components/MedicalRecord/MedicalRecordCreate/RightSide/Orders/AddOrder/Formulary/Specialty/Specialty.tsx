import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "(presentation)/components/MedicalRecord/MedicalRecordCreate/context/MedicalRecordCreateContext";
import { ISpecialty } from "domain/core/entities/specialtyEntity";
import { IUser } from "domain/core/entities/userEntity";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import { valuesTypes } from "../../AddOrder";

interface ISpecialtyProps {
  user: IUser;
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function Specialty({
  user,
  values,
  setValues,
}: ISpecialtyProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { getSpecialties } = actions;
  const { data: specialties, loading, error, successful } = state.specialties;

  useEffect(() => {
    getSpecialties({ doctorId: user.userId ? parseInt(user.userId, 10) : 0 })(
      dispatch
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <div className="mb-4 w-full">
        <FormSelect
          name="specialty"
          disabled={loading || error !== null || specialties.data?.length === 0}
          value={values.specialty}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setValues({ ...values, [e.target.name]: e.target.value })
          }
          className="w-full"
        >
          <option value="" disabled>
            {loading
              ? "Cargando especialidades"
              : specialties.data?.length === 0
              ? "No se han encontrado especialidades"
              : "Selecciona la especialidad"}
          </option>

          {specialties.data?.length > 0 &&
            specialties.data.map((specialty: ISpecialty) => (
              <option key={specialty.id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
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
