import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import clsx from "clsx";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import Formulary from "./Formulary/Formulary";
import { AuthContext, IAuthContext } from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import { ICreatePatientContext, CreatePatientContext } from "../context/CreatePatientContext";
import { useRouter } from "next/navigation";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";

export default function Steps() {

  const { state, actions, dispatch } = useContext<ICreatePatientContext>(CreatePatientContext);
  const { createPatient } = actions;

  const { data, loading, error, successful } = state.createPatient;

  const [loadedUser, setLoadedUser] = useState(false);

  const router = useRouter();

  const [values, setValues] = useState({
    name:"",
    lastname: "",
    motherlastname: "",
    age: '',
    curp: "",
    sex: 0,
    phone: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    global: "",
    name: "",
    lastname: "",
    motherlastname: "",
    age: '',
    curp: "",
    sex: "",
    phone: "",
    email: "",
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
      name: values.name,
      lastName: values.lastname,
      motherLastName: values.motherlastname,
      curp: values.curp,
      email: values.email,
      sex: values.sex,
      phoneNumber: values.phone,
      state: 0,
      pictureUrl: "",
      birthDate:
        values.age.length > 0 ? new Date(values.age) : null,
      createdOn: new Date(),
      updatedOn: new Date(),
      deletedOn: null,
    };

    createPatient(patient)(dispatch);
  };

  useEffect(() => {
    if (successful) {
      setTimeout(() => {
        router.push(PatientsRoutesEnum.PatientsList);
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  return (
    <div className="gap-5">
      <AlertComponent
        variant="error"
        show={error !== null}
        description={
          "Ha ocurrido un error creando al paciente. Vuelve a intentarlo"
        }
      />
      <AlertComponent
        variant="success"
        show={successful}
        description="Paciente creado exitosamente"
      />
      <div className="md:grid md:grid-cols-2 py-3 sticky top-[67px] z-[50] bg-slate-100 pt-2">
        <div className="gap-4">
          <div className=" my-3">
            <h2 className="mr-5 text-2xl font-bold truncate">Nuevo paciente</h2>
          </div>
          {/*<p className="text-slate-900 text-sm font-light">
            Crear un nuevo paciente te permitira agendar citas y acceder a su
            expediente médico entre otras cosas.
          </p>*/}
        </div>
        <div className="flex justify-end items-center">
          <Button className=" w-[100%] md:w-56" variant="primary" disabled={
            loading || 
            values.name === "" ||
            values.lastname === "" ||
            values.age === "" ||
            values.phone === ""
           } onClick={() => onSubmit()}>
            {loading ? "Creando paciente..." : "Crear paciente"}
          </Button>
        </div>
      </div>
      <div className="gap-10 md:mt-0">
          <div className="mt-5">
            <Formulary values={values} setValues={setValues} errors={errors} setErrors={setErrors} />
          </div>
      </div>
    </div>
  );
}
