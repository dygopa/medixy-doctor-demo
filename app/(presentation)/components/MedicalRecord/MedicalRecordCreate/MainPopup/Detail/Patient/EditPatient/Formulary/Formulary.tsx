import React, {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import BasicData from "./BasicData";
import Direction from "./Direction";
import Button from "(presentation)/components/core/BaseComponents/Button";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { ISubject } from "domain/core/entities/subjectEntity";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "(presentation)/components/MedicalRecord/MedicalRecordCreate/context/MedicalRecordCreateContext";
import { useSearchParams } from "next/navigation";

export default function Formulary() {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { editSubject } = actions;
  const { data: subject } = state.subject;
  const { loading, successful, error } = state.editSubject;

  const [hasSucessful, setHasSucessful] = useState(false);

  const [values, setValues] = useState({
    id: 0,
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
    countryLocation: 0,
    municipalityCatalogId: 0,
    city: "",
    direction: "",
    street: "",
    pictureUrl: "",
    postalCode: "",
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
    postalCode: "",
  });

  const setInitialValues = () => {

    setValues({
      ...values,
      id: subject?.subjectId ?? 0,
      name: subject?.name ?? "",
      lastname: subject?.lastName ?? "",
      motherlastname: subject?.motherLastName ?? "",
      curp: subject?.curp ?? "",
      sex: subject?.sex ?? 0,
      gender: subject?.gender ?? 0,
      email: subject?.email ?? "",
      birthDate: subject?.birthDate ?? "",
      phone: subject?.phoneNumber ?? "",
      country: subject?.country ?? "",
      federalEntity: subject?.federativeEntityId ?? 0,
      municipality: subject?.municipalityId ?? 0,
      countryLocation: subject?.countryLocationId ?? 0,
      city: subject?.city ?? "",
      street: subject?.street ?? "",
      direction: subject?.address ?? "",
      pictureUrl: subject?.pictureUrl ?? "",
      postalCode: subject?.postalCode ?? "",
    });
  };

  useEffect(() => {
    setInitialValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    if (errors.federalEntity.length > 0) errorsFieldsCount++;

    if (errors.postalCode.length > 0) errorsFieldsCount++;

    return errorsFieldsCount;
  };

  const onSubmit = () => {
    const hasErrorsCount = validForm();

    if (hasErrorsCount > 0) return;

    const subjectEdit = {
      subjectId: subject?.subjectId ?? 0,
      name: values.name.trim(),
      lastName: values.lastname.trim(),
      motherLastName: values.motherlastname.trim(),
      curp: values.curp.trim(),
      email: values.email.trim(),
      sex: values.sex,
      gender: values.gender,
      phoneNumber: values.phone.trim(),
      federativeEntityId: values.federalEntity,
      municipalityId: values.municipality !== 0
        ? values.municipality
        : null,
      countryLocationId: values.countryLocation !== 0
       ? values.countryLocation
       : null,
      street: values.street.trim(),
      country: values.country.trim(),
      state: 0,
      address: values.direction.trim(),
      city: values.city.trim(),
      isPatient: true,
      birthDate: values.birthDate ?? null,
      createdOn: subject?.createdOn ?? new Date(),
      updatedOn: new Date(),
      deletedOn: null,
      postalCode: values.postalCode,
    };

    editSubject(subjectEdit)(dispatch);
  };

  const searchParams = useSearchParams();

  const type = searchParams.get("edit_subject");

  useEffect(() => {
    if (successful) {
      setHasSucessful(true);

      setTimeout(() => {
        setHasSucessful(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  return (
    <div className="pb-10">
      <AlertComponent
        variant="error"
        show={error !== null}
        description={
          "Ha ocurrido un error actualizando al paciente. Vuelve a intentarlo"
        }
      />

      {hasSucessful && (
        <AlertComponent
          variant="success"
          show={successful}
          description="Paciente actualizado exitosamente"
        />
      )}

      <div className="w-full md:flex block justify-end items-center">
        <Button
          className="lg:w-auto"
          variant="primary"
          disabled={
            loading ||
            values.name === "" ||
            values.lastname === "" ||
            values.birthDate === "" ||
            values.phone === "" ||
            validForm() > 0 
          }
          onClick={() => onSubmit()}
        >
          {loading ? "Actualizando paciente..." : "Actualizar paciente"}
        </Button>
      </div>

      <div className="w-full relative flex flex-col gap-4 my-4">
        <BasicData
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
        />
        {/*<Credentials />*/}
        <Direction 
          values={values} 
          setValues={setValues} 
          errors={errors}
          setErrors={setErrors}
        />
      </div>
    </div>
  );
}
