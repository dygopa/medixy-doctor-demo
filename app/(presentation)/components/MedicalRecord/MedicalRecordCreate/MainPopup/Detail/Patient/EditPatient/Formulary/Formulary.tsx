import React, { useState, useEffect, useContext } from "react";
import BasicData from "./BasicData";
import Direction from "./Direction";
import Button from "(presentation)/components/core/BaseComponents/Button";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { ISubject } from "domain/core/entities/subjectEntity";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "(presentation)/components/MedicalRecord/MedicalRecordCreate/context/MedicalRecordCreateContext";

export default function Formulary() {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { editSubject } = actions;
  const { data: subject } = state.subject;
  const { loading, successful, error } = state.editSubject;

  const [hasSucessful, setHasSucessful] = useState(false);

  const [values, setValues] = useState({
    name: "",
    lastname: "",
    motherlastname: "",
    age: "",
    curp: "",
    sex: 0,
    phone: "",
    gender: 0,
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

  const setInitialValues = () => {
    setValues({
      ...values,
      name: subject?.name ?? "",
      lastname: subject?.lastName ?? "",
      motherlastname: subject?.motherLastName ?? "",
      curp: subject?.curp ?? "",
      gender: subject?.gender ?? 0,
      sex: subject?.sex ?? 0,
      email: subject?.email ?? "",
      birthDate: subject?.birthDate
        ? `${new Date(subject.birthDate).getFullYear()}-${
            new Date(subject.birthDate).getMonth() + 1 < 10
              ? `0${new Date(subject.birthDate).getMonth() + 1}`
              : new Date(subject.birthDate).getMonth() + 1
          }-${new Date(subject.birthDate).getDate()}`
        : "",
      phone: subject?.phoneNumber ?? "",
      country: subject?.country ?? "",
      federalEntity: subject?.federativeEntityId ?? 0,
      city: subject?.city ?? "",
      direction: subject?.address ?? "",
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

    return errorsFieldsCount;
  };

  const onSubmit = () => {
    const hasErrorsCount = validForm();

    if (hasErrorsCount > 0) return;

    const subjectEdit: ISubject = {
      subjectId: subject?.subjectId ?? 0,
      name: values.name,
      lastName: values.lastname,
      motherLastName: values.motherlastname,
      curp: values.curp,
      email: values.email,
      sex: values.sex,
      phoneNumber: values.phone,
      federativeEntityId: values.federalEntity,
      country: values.country,
      state: 0,
      address: values.direction,
      city: values.city,
      pictureUrl: "",
      birthDate:
        values.birthDate.length > 0 ? new Date(values.birthDate) : null,
      createdOn: subject?.createdOn ?? new Date(),
      updatedOn: new Date(),
      deletedOn: null,
      gender: values.gender,
      isPatient: true,
    };

    editSubject(subjectEdit)(dispatch);
  };

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
    <div>
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
          className="my-4 lg:w-auto"
          variant="primary"
          disabled={
            loading ||
            values.name === "" ||
            values.lastname === "" ||
            values.birthDate === "" ||
            values.phone === ""
          }
          onClick={() => onSubmit()}
        >
          {loading ? "Actualizando paciente..." : "Actualizar paciente"}
        </Button>
      </div>

      <div className="w-full relative flex flex-col gap-4 mt-4">
        <BasicData
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
        />
        {/*<Credentials />*/}
        <Direction values={values} setValues={setValues} />
      </div>
    </div>
  );
}
