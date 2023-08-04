import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import clsx from "clsx";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import Formulary from "./Formulary/Formulary";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import {
  ICreatePatientContext,
  CreatePatientContext,
} from "../context/CreatePatientContext";
import { useRouter } from "next/navigation";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

export default function Steps() {
  const { state, actions, dispatch } =
    useContext<ICreatePatientContext>(CreatePatientContext);
  const { createSubject } = actions;

  const { data, loading, error, successful } = state.createSubject;

  const [loadedUser, setLoadedUser] = useState(false);

  const router = useRouter();

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
    municipality: 0,
    municipalityCatalogId: 0,
    countryLocation: 0,
    city: "",
    direction: "",
    street: "",
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
    federalEntity: "",
  });

  const validForm = () => {
    let errorsFieldsCount = 0;

    if (errors.global.length > 0) errorsFieldsCount++;

    if (errors.name.length > 0) errorsFieldsCount++;

    if (errors.lastname.length > 0) errorsFieldsCount++;

    if (errors.motherlastname.length > 0) errorsFieldsCount++;

    if (errors.age.length > 0) errorsFieldsCount++;

    if (errors.curp.length > 0) errorsFieldsCount++;

    if (errors.sex.length > 0) errorsFieldsCount++;

    if (errors.email.length > 0) errorsFieldsCount++;

    if (errors.phone.length > 0) errorsFieldsCount++;

    return errorsFieldsCount;
  };

  const onSubmit = () => {
    const hasErrorsCount = validForm();

    if (hasErrorsCount > 0) return;

    const patient = {
      name: values.name.trim(),
      lastName: values.lastname.trim(),
      motherLastName: values.motherlastname.trim(),
      curp: values.curp.trim(),
      email: values.email.trim(),
      sex: values.sex,
      gender: values.gender,
      phoneNumber: values.phone.trim(),
      federativeEntityId: values.federalEntity,
      municipalityId: values.municipality !== 0 ? values.municipality : null,
      countryLocationId:
        values.countryLocation !== 0 ? values.countryLocation : null,
      street: values.street.trim(),
      country: values.country.trim(),
      state: 0,
      address: values.direction.trim(),
      city: values.city.trim(),
      pictureUrl: "",
      isPatient: true,
      birthDate: values.age.length > 0 ? new Date(values.age) : null,
      createdOn: new Date(),
      updatedOn: new Date(),
      deletedOn: null,
    };

    createSubject(patient)(dispatch);
  };

  const onClickButtonPrincipal: Function = () => {
    router.push(PatientsRoutesEnum.PatientsList);
  };

  return (
    <div className="gap-5">
      <AlertComponent
        variant="error"
        show={error !== null}
        description={
          "Ha ocurrido un error creando al paciente. Vuelve a intentarlo"
        }
      />
      <SuccessfulComponent
        tittle="Agregado con exito"
        show={successful}
        description={"Paciente creado exitosamente"}
        textButtonPrincipal={"Ir a lista de pacientes"}
        onClickButtonPrincipal={onClickButtonPrincipal}
      />
      <div className="md:grid md:grid-cols-2 py-3 sticky top-[67px] z-[50] bg-slate-100 pt-2">
        <div className="gap-4">
          <div className=" my-3">
            <h2 className="mr-5 text-2xl font-bold truncate">Nuevo Paciente</h2>
          </div>
          {/*<p className="text-slate-900 text-sm font-light">
            Crear un nuevo paciente te permitira agendar citas y acceder a su
            expediente médico entre otras cosas.
          </p>*/}
        </div>
        <div className="flex justify-end items-center">
          <Button
            className=" w-[100%] md:w-auto"
            variant="primary"
            disabled={
              loading ||
              values.name === "" ||
              values.lastname === "" ||
              values.age === "" ||
              values.phone === "" ||
              validForm() > 0
            }
            onClick={() => onSubmit()}
          >
            <Lucide icon="Plus" className="mr-2" />
            {loading ? "Creando paciente..." : "Crear paciente"}
          </Button>
        </div>
      </div>
      <div className="gap-10 md:mt-0">
        <div className="mt-5 flex justify-center">
          <Formulary
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
          />
        </div>
      </div>
    </div>
  );
}
