import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import BasicData from "./BasicData";
import Button from "(presentation)/components/core/BaseComponents/Button";

interface IFormularyProps {
  setShowEditCompanion: Dispatch<SetStateAction<boolean>>;
}

export default function Formulary({ setShowEditCompanion }: IFormularyProps) {
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    motherlastname: "",
    age: "",
    curp: "",
    sex: 0,
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

  const setInitialValues = () => {};

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

    /* const patientEdit: IPatient = {
      patientId: patient?.patientId ?? 0,
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
      createdOn: patient?.createdOn ?? new Date(),
      updatedOn: new Date(),
      deletedOn: null,
    };

    editPatient(patientEdit)(dispatch); */
  };

  /* useEffect(() => {
    if (successful) {
      setTimeout(() => {
        setShowEditPatient(false);
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);  */

  return (
    <div>
      {/* <AlertComponent
        variant="error"
        show={error !== null}
        description={
          "Ha ocurrido un error actualizando al acompañante. Vuelve a intentarlo"
        }
      />
      <AlertComponent
        variant="success"
        show={successful}
        description="Paciente actualizado exitosamente"
      /> */}

      <div className="w-full md:flex block justify-between items-center">
        <div className="lg:w-[50%] flex">
          <div className="mr-4">
            <button
              type="button"
              className="hover:bg-dark hover:bg-opacity-10 w-[35px] h-[35px] rounded-full"
              onClick={() => setShowEditCompanion(false)}
            >
              <i className="fa-solid fa-arrow-left text-xl" />
            </button>
          </div>

          <h2 className="lg:mr-5 text-2xl font-bold truncate">
            Editar acompañante
          </h2>
        </div>
        <Button
          className="my-4 lg:w-auto"
          variant="primary"
          onClick={() => onSubmit()}
        >
          Actualizar acompañante
        </Button>
      </div>
      <div className="w-full relative flex flex-col gap-4 mt-8">
        <BasicData
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
        />
      </div>
    </div>
  );
}
