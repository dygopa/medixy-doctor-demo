import { VALIDATE_EMAIL, VALIDATE_NAMES, VALIDATE_NUMBERS } from "(presentation)/(utils)/errors-validation";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "(presentation)/components/MedicalRecord/MedicalRecord/context/MedicalRecordContext";
import { ISubject } from "domain/core/entities/subjectEntity";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import IntlTelInput from "react-intl-tel-input";
import 'react-intl-tel-input/dist/main.css';
import { twMerge } from "tailwind-merge";

interface ICompanionCreateProps {
  patientId: number;
  companion: ISubject | null;
  setShowEditCompanion: Dispatch<SetStateAction<ISubject | null>>;
}

export default function CompanionCreate({
  patientId,
  companion,
  setShowEditCompanion,
}: ICompanionCreateProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { editSubject } = actions;
  const { loading, error, successful } = state.editSubject;

  const [hasSucessful, setHasSucessful] = useState(false);

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

  const handlename = (value: string) => {
    setValues({ ...values, name: value });
    if (value.length < 2) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          name: "El nombre del paciente es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          name: "El nombre del paciente solo debe incluir letras",
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
          lastname: "El apellido del paciente es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NAMES(value)) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          lastname: "El apellido del paciente solo debe incluir letras",
        };
      });
      return true;
    }
    setErrors({ ...errors, lastname: "" });
    return false;
  };

  const handleage = (value: string) => {
    setValues({ ...values, birthDate: value });
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

  const handlephone = (value: string) => {
    setValues({ ...values, phone: value });
    if (value.length < 2) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone: "El teléfono del paciente es obligatorio",
        };
      });
      return true;
    }
    if (!VALIDATE_NUMBERS(value)) {
      setErrors((previousState) => {
        return {
          ...previousState,
          phone: "El teléfono del paciente solo lleva números",
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

  const setInitialValues = () => {
    setValues({
      ...values,
      name: companion?.name ?? "",
      lastname: companion?.lastName ?? "",
      motherlastname: companion?.motherLastName ?? "",
      curp: companion?.curp ?? "",
      sex: companion?.sex ?? 0,
      gender: companion?.gender ?? 0,
      email: companion?.email ?? "",
      birthDate: companion?.birthDate ?? "",
      phone: companion?.phoneNumber ?? "",
      country: companion?.country ?? "",
      federalEntity: companion?.federativeEntityId ?? 0,
      city: companion?.city ?? "",
      direction: companion?.address ?? "",
    });
  };

  useEffect(() => {
    setInitialValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companion]);

  useEffect(() => {
    if (successful) {
      setHasSucessful(true);

      setTimeout(() => {
        setHasSucessful(false);
        setShowEditCompanion(null);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

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

  const onEditCompanion = (e: any) => {
    const companionEdit: ISubject = {
      subjectId: companion?.subjectId ?? 0,
      name: values.name,
      lastName: values.lastname,
      motherLastName: values.motherlastname,
      curp: values.curp,
      email: values.email,
      sex: values.sex,
      gender: values.gender,
      phoneNumber: values.phone,
      federativeEntityId: values.federalEntity,
      country: values.country,
      state: 0,
      address: values.direction,
      city: values.city,
      pictureUrl: "",
      isPatient: false,
      birthDate: values.birthDate,
      createdOn: companion?.createdOn ?? new Date(),
      updatedOn: new Date(),
      deletedOn: null,
    };

    editSubject(companionEdit)(dispatch);
  };

  return (
    <>
      <AlertComponent
        variant="error"
        show={error !== null}
        description={
          "Ha ocurrido un error al modificar al contacto. Vuelve a intentarlo"
        }
      />

      {hasSucessful && (
        <AlertComponent
          variant="success"
          show={successful}
          description="Contacto modificado exitosamente"
        />
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-4">
            <button
              type="button"
              className="hover:bg-dark hover:bg-opacity-10 w-[35px] h-[35px] rounded-full"
              onClick={() => setShowEditCompanion(null)}
            >
              <i className="fa-solid fa-arrow-left text-xl" />
            </button>
          </div>

          <div className="lg:text-left md:text-left text-center">
            <h1 className="text-slate-900 text-2xl font-bold">
              Modificar contacto
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
            onClick={(e: any) => onEditCompanion(e)}
          >
            {loading ? "Cargando" : "Guardar"}
          </Button>
        </div>
      </div>

      <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-lg text-slate-900 pb-2">
            Modificar contacto
          </p>
        </div>
        <div className="input-group w-full">
          <p className="input-label pb-2">
            Nombre <span className="text-primary font-bold">*</span>
          </p>
          <FormInput
            type="text"
            value={values.name}
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
              Apellido Paterno <span className="text-primary font-bold">*</span>
            </p>
            <FormInput
              type="text"
              value={values.lastname}
              onChange={(e: any) => handlelastname(e.target.value)}
              placeholder="Primer apellido"
            />
            {errors.lastname.length > 0 && (
              <span className="text-red-500">{errors.lastname}</span>
            )}
          </div>
          <div className="input-group mt-3 md:mt-0 md:w-[50%]">
            <p className="input-label py-2">Apellido Materno</p>
            <FormInput
              type="text"
              value={values.motherlastname}
              onChange={(e: any) =>
                setValues({ ...values, motherlastname: e.target.value })
              }
              placeholder="Segundo apellido"
            />
          </div>
        </div>

        <div className="input-group w-full">
          <p className="input-label py-2">
            Fecha de nacimiento{" "}
            <span className="text-primary font-bold">*</span>
          </p>
          <FormInput
            type={"date"}
            min={0}
            value={values.birthDate}
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
            value={values.sex}
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
            value={values.gender}
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
          <IntlTelInput
            preferredCountries={['mx']}
            defaultValue={values.phone}
            //value={values.phone}
            onPhoneNumberChange={(isValid,value, countryData, fullNumber) => handlephone(fullNumber)}
            onPhoneNumberBlur={(e) => console.log(e)}
            inputClassName={twMerge([
              "disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent text-gray-900 w-full",
              "[&[readonly]]:bg-gray-300 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
              "transition duration-200 ease-in-out w-full bg-gray-100 text-sm border-none shadow-sm rounded-md placeholder:text-gray-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-gray-700 dark:focus:ring-opacity-50 dark:placeholder:text-gray-500/80",
            ])}
          />
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
            value={values.curp}
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
