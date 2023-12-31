import { getCountriesDialCodeES } from "(presentation)/(helper)/intl/intlHelper";
import {
  VALIDATE_EMAIL,
  VALIDATE_NAMES,
  VALIDATE_NUMBERS,
} from "(presentation)/(utils)/errors-validation";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import PhoneNumberInput from "(presentation)/components/core/BaseComponents/Inputs/PhoneNumberInput/PhoneNumberInput";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "(presentation)/components/MedicalRecord/MedicalRecord/context/MedicalRecordContext";
import { ISubject } from "domain/core/entities/subjectEntity";
import moment from "moment";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";

interface ICompanionCreateProps {
  patientId: number;
  setShowAddCompanion: Dispatch<SetStateAction<boolean>>;
}

export default function CompanionCreate({
  patientId,
  setShowAddCompanion,
}: ICompanionCreateProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { createCompanion } = actions;
  const { loading, error, successful } = state.createCompanion;

  const [values, setValues] = useState({
    name: "",
    lastname: "",
    motherlastname: "",
    age: "",
    curp: "",
    sex: 0,
    gender: 0,
    phone: "",
    country: "",
    email: "",
    birthDate: "",
    federalEntity: 0,
    city: "",
    direction: "",
  });

  const [errors, setErrors] = useState({
    global: "",
    name: "",
    lastname: "",
    motherlastname: "",
    age: "",
    curp: "",
    sex: "",
    country: "",
    email: "",
    phone: "",
  });

  const [hasSucessful, setHasSucessful] = useState(false);

  const handlename = (value: string) => {
    setValues({ ...values, name: value });
    if (value.length < 2) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          name: "El nombre del contacto es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          name: "El nombre del contacto solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, name: "" });
    return false;
  };

  const handlelastname = (value: string) => {
    setValues({ ...values, lastname: value });
    if (value.length < 2) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          lastname: "El apellido del contacto es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          lastname: "El apellido del contacto solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, lastname: "" });
    return false;
  };

  const handleSecondLastname = (value: string) => {
    setValues({ ...values, motherlastname: value });
    if (value.length > 0 && !VALIDATE_NAMES(value)) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          motherlastname: "El apellido del paciente solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, motherlastname: "" });
    return false;
  };

  const handleage = (value: string) => {
    setValues({ ...values, birthDate: value });
    let day = new Date();
    let birthdate = new Date(value);
    let age = day.getFullYear() - birthdate.getFullYear();
    let month = day.getMonth() - birthdate.getMonth();

    if (month < 0 || (month === 0 && day.getDate() < birthdate.getDate())) {
      age--;
    }

    if (age <= 15) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          age: "El contacto debe tener al menos 15 años",
        };
      });
      return true;
    }
    if (moment().isBefore(new Date(value))) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          age: "La fecha no debe ser mayor a la fecha actual",
        };
      });
      return true;
    }
    if (value.length < 2) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          age: "La fecha de nacimiento es obligatorio",
        };
      });
      return true;
    }
    setErrors({ ...errors, age: "" });
    return false;
  };

  const handlephone = (value: string, isValid: boolean) => {
    setValues({ ...values, phone: value });
    if (value.length < 2) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone: "El teléfono del contacto es obligatorio",
        };
      });
      return true;
    }
    if (!isValid) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone: "El teléfono del contacto no es correcto",
        };
      });
      return true;
    }
    if (!VALIDATE_NUMBERS(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone: "El teléfono del contacto solo lleva números",
        };
      });
      return true;
    }
    setErrors({ ...errors, phone: "" });
    return false;
  };

  const handleEmail = (value: string) => {
    setValues({ ...values, email: value });
    if (values.email.length > 1) {
      if (!VALIDATE_EMAIL(values.email)) {
        setErrors({ ...errors, email: "El email debe ser correcto" });
        return true;
      }
    }
    setErrors({ ...errors, email: "" });
    return false;
  };

  const validForm = () => {
    let errorsFieldsCount = 0;

    if (errors.global.length > 0) errorsFieldsCount++;

    if (errors.name.length > 0) errorsFieldsCount++;

    if (errors.lastname.length > 0) errorsFieldsCount++;

    if (errors.motherlastname.length > 0) errorsFieldsCount++;

    if (errors.age.length > 0) errorsFieldsCount++;

    if (errors.curp.length > 0) errorsFieldsCount++;

    if (errors.sex.length > 0) errorsFieldsCount++;

    if (errors.country.length > 0) errorsFieldsCount++;

    if (errors.email.length > 0) errorsFieldsCount++;

    if (errors.phone.length > 0) errorsFieldsCount++;

    return errorsFieldsCount;
  };

  const onNewCompanion = (e: any) => {
    const companionNew: ISubject = {
      name: values.name.trim(),
      lastName: values.lastname.trim(),
      motherLastName: values.motherlastname.trim(),
      curp: values.curp.trim(),
      email: values.email.trim(),
      sex: values.sex,
      gender: values.gender,
      phoneNumber: values.phone.trim(),
      federativeEntityId: values.federalEntity,
      country: values.country.trim(),
      state: 0,
      address: values.direction.trim(),
      city: values.city.trim(),
      pictureUrl: "",
      isPatient: false,
      birthDate: values.birthDate,
      createdOn: new Date(),
      updatedOn: null,
      deletedOn: null,
      subjectId: 0,
      postalCode: "",
    };

    createCompanion(patientId, companionNew)(dispatch);
  };

  useEffect(() => {
    if (successful) {
      setHasSucessful(true);

      setTimeout(() => {
        setHasSucessful(false);
        setShowAddCompanion(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  return (
    <>
      <AlertComponent
        variant="error"
        show={error !== null}
        description={
          "Ha ocurrido un error al crear al contacto. Vuelve a intentarlo"
        }
      />

      {hasSucessful && (
        <AlertComponent
          variant="success"
          show={successful}
          description="Contacto creado exitosamente"
        />
      )}

      <div className="lg:flex md:flex block items-center justify-between sticky top-[0px] bg-white">
        <div className="flex items-center">
          <div className="mr-4">
            <button
              type="button"
              className="hover:bg-dark hover:bg-opacity-10 w-[35px] h-[35px] rounded-full"
              onClick={() => setShowAddCompanion(false)}
            >
              <i className="fa-solid fa-arrow-left text-xl" />
            </button>
          </div>

          <div className="lg:text-left md:text-left text-center">
            <h1 className="text-slate-900 text-2xl font-bold">
              Crear Contacto
            </h1>
          </div>
        </div>

        <div>
          <Button
            disabled={
              loading ||
              validForm() > 0 ||
              values.name === "" ||
              values.lastname === "" ||
              values.phone === "" ||
              values.birthDate === ""
            }
            className="my-4 w-[100%] lg:w-auto"
            variant="primary"
            onClick={(e: any) => onNewCompanion(e)}
          >
            {loading ? "Cargando" : "Agregar contacto"}
          </Button>
        </div>
      </div>

      <div className="w-full rounded-md h-fit p-7">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-lg text-slate-900 pb-2">
            Nuevo Contacto
          </p>
        </div>
        <div className="input-group w-full">
          <p className="input-label pb-2">
            Nombre <span className="text-primary font-bold">*</span>
          </p>
          <FormInput
            type="text"
            onChange={(e: any) => handlename(e.target.value)}
            placeholder="Nombre"
          />
          {errors.name.length > 0 && (
            <span className="text-red-500">{errors.name}</span>
          )}
        </div>
        <div className="md:flex gap-3 w-full">
          <div className="input-group md:w-[50%]">
            <p className="input-label py-2">
              Primer Apellido <span className="text-primary font-bold">*</span>
            </p>
            <FormInput
              type="text"
              onChange={(e: any) => handlelastname(e.target.value)}
              placeholder="Primer Apellido"
            />
            {errors.lastname.length > 0 && (
              <span className="text-red-500">{errors.lastname}</span>
            )}
          </div>
          <div className="input-group mt-3 md:mt-0 md:w-[50%]">
            <p className="input-label py-2">Segundo Apellido</p>
            <FormInput
              type="text"
              onChange={(e: any) => handleSecondLastname(e.target.value)}
              placeholder="Segundo Apellido"
            />
            {errors.motherlastname.length > 0 && (
              <span className="text-red-500">{errors.motherlastname}</span>
            )}
          </div>
        </div>

        <div className="input-group w-full">
          <p className="input-label py-2">
            Fecha de Nacimiento{" "}
            <span className="text-primary font-bold">*</span>
          </p>
          <FormInput
            type={"date"}
            max={moment().format("YYYY-MM-DD")}
            onChange={(e: any) => handleage(e.target.value)}
            className="form-control w-full"
          />
          {errors.age.length > 0 && (
            <span className="text-red-500">{errors.age}</span>
          )}
        </div>

        <div className="input-group w-full">
          <p className="input-label py-2">Sexo</p>
          <FormSelect
            className="form-control"
            onChange={(e) => setValues({ ...values, sex: +e.target.value })}
          >
            <option value={0}>No Especificado</option>
            <option value={1}>Masculino</option>
            <option value={2}>Femenino</option>
          </FormSelect>
        </div>

        <div className="input-group w-full">
          <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
            Género
          </p>
          <FormSelect
            value={values?.gender}
            className="form-control w-full"
            onChange={(e) => setValues({ ...values, gender: +e.target.value })}
          >
            <option value={0}>No especificado</option>
            <option value={1}>Masculino</option>
            <option value={2}>Femenino</option>
            <option value={3}>Transegénero</option>
            <option value={4}>Transexual</option>
            <option value={5}>Travesti</option>
            <option value={6}>Intersexial</option>
            <option value={7}>Otro</option>
          </FormSelect>
        </div>

        <div className="input-group w-full">
          <p className="input-label py-2">
            Teléfono <span className="text-primary font-bold">*</span>
          </p>
          <div className="w-full">
            <PhoneNumberInput
              defaultSelectedCountry="mx"
              onPhoneNumberChange={(values) => {
                handlephone(values.fullPhoneNumber, true);
              }}
              isDark
            />
          </div>
          {errors.phone.length > 0 && (
            <span className="text-red-500">{errors.phone}</span>
          )}
        </div>

        <div className="input-group w-full">
          <p className="input-label py-2">Email</p>
          <FormInput
            type="email"
            onChange={(e) => handleEmail(e.target.value)}
            placeholder="Email"
          />
          {errors.email.length > 0 && (
            <span className="text-red-500">{errors.email}</span>
          )}
        </div>

        <div className="input-group w-full">
          <p className="input-label py-2">CURP</p>
          <FormInput
            type="text"
            onChange={(e: any) =>
              setValues({ ...values, curp: e.target.value })
            }
            placeholder="CURP"
          />
        </div>

        <div className="input-group w-full"></div>
      </div>
    </>
  );
}
