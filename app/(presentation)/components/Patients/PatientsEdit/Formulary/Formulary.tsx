import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import BasicData from "./BasicData";
import Credentials from "./Credentials";
import Direction from "./Direction";
import { IUser } from "domain/core/entities/userEntity";
import Button from "(presentation)/components/core/BaseComponents/Button";
/*import { IUserContext, UserContext } from "../context/UserContext";*/
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import {
  EditPatientContext,
  IEditPatientContext,
} from "../context/EditPatientContext";
import { useRouter } from "next/navigation";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import { ISubject } from "domain/core/entities/subjectEntity";

export default function Formulary() {
  const { state, actions, dispatch } =
    useContext<IEditPatientContext>(EditPatientContext);
  const { editSubject } = actions;
  const { data: patient } = state.subject;
  const { loading, successful, error } = state.editSubject;

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
      name: patient?.name ?? "",
      lastname: patient?.lastName ?? "",
      motherlastname: patient?.motherLastName ?? "",
      curp: patient?.curp ?? "",
      sex: patient?.sex ?? 0,
      gender: patient?.gender ?? 0,
      email: patient?.email ?? "",
      birthDate: patient?.birthDate
        ? `${new Date(patient.birthDate).getFullYear()}-${
            new Date(patient.birthDate).getMonth() + 1 < 10
              ? `0${new Date(patient.birthDate).getMonth() + 1}`
              : new Date(patient.birthDate).getMonth() + 1
          }-${new Date(patient.birthDate).getDate()}`
        : "",
      phone: patient?.phoneNumber ?? "",
      country: patient?.country ?? "",
      federalEntity: patient?.federativeEntityId ?? 0,
      city: patient?.city ?? "",
      direction: patient?.address ?? "",
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

    const patientEdit: ISubject = {
      subjectId: patient?.subjectId ?? 0,
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
      isPatient: true,
      birthDate:
        values.birthDate.length > 0 ? new Date(values.birthDate) : null,
      createdOn: patient?.createdOn ?? new Date(),
      updatedOn: new Date(),
      deletedOn: null,
    };

    editSubject(patientEdit)(dispatch);
  };

  useEffect(() => {
    if (successful) {
      setTimeout(() => {
        router.push(PatientsRoutesEnum.PatientsList);
      }, 3500);
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
      <AlertComponent
        variant="success"
        show={successful}
        description="Paciente actualizado exitosamente"
      />

      <div className="w-full md:flex justify-between items-center sticky top-[67px] z-[50]  bg-slate-100 pt-2">
        <div className="lg:w-[50%]">
          <h2 className="lg:mr-5 text-2xl font-bold truncate">
            {patient?.name} {patient?.lastName}
          </h2>
          {/*<p className="font-light text-slate-500 text-base my-3 lg:block md:block hidden">
            Completa la información de tu paciente para registrar todos sus
            datos.
          </p>*/}
        </div>
        <Button className="my-4 w-[100%] lg:w-auto" variant="primary" disabled={
          loading || 
          values.name === "" ||
          values.lastname === "" ||
          values.birthDate === "" ||
          values.phone === ""
          } onClick={() => onSubmit()}>
          {loading ? "Actualizando paciente..." : "Actualizar paciente"}
        </Button>
      </div>
      <div className="w-full relative flex flex-col gap-4 mt-8">
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
