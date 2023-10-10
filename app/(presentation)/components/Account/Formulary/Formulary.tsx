import React, { useState, useContext, useMemo } from "react";
import BasicData from "./BasicData";
import Credentials from "./Credentials";
import Contact from "./Contact";
import AboutMe from "./AboutMe";
import { IUser } from "domain/core/entities/userEntity";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { IUserContext, UserContext } from "../context/UserContext";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import Steps from "./Steps/Steps";
import Security from "./Security/Security";

interface IFormularyProps {
  user: IUser;
  user: IUser;
  account: IUser;
  setAccount: any;
}

export default function Formulary({ account, setAccount }: IFormularyProps) {
  const {
    state: stateAuth,
    actions: actionsAuth,
    dispatch: dispatchAuth,
  } = useContext<IAuthContext>(AuthContext);
  const { getUserAuthenticated } = actionsAuth;

  const { state, actions, dispatch } = useContext<IUserContext>(UserContext);
  const { updateUserData, updatePassword } = actions;

  const { loading, successful, error } = state.updateUserData;
  const {
    loading: loadingSecurity,
    successful: successfulSecurity,
    error: errorSecurity,
  } = state.changePasswords;

  const [steps, setSteps] = useState(0);

  const [errorsSecurity, setErrorsSecurity] = useState({
    global: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    password: "",
  });

  const getComponentByTabActive = () => {
    switch (steps) {
      case 0:
        return (
          <div className="w-full relative flex flex-col gap-4 mt-8">
            <BasicData
              user={user}
              account={account}
              setAccount={setAccount}
              errors={errors}
              setErrors={setErrors}
            />
            <Credentials account={account} setAccount={setAccount} />
            <Contact account={account} setAccount={setAccount} />
            <AboutMe
              account={account}
              setAccount={setAccount}
              errors={errors}
              setErrors={setErrors}
            />
          </div>
        );
      case 1:
        return (
          <Security
            account={account}
            formData={formData}
            setFormData={setFormData}
            errors={errorsSecurity}
            setErrors={setErrorsSecurity}
          />
        );
      default:
        return <div />;
    }
  };

  const [errors, setErrors] = useState({
    global: "",
    name: "",
    lastname: "",
    secondLastname: "",
    age: "",
    shortDescription: "",
    curp: "",
  });

  const validForm = () => {
    let errorsFieldsCount = 0;

    if (errors.global.length > 0) errorsFieldsCount++;

    if (errors.name.length > 0) errorsFieldsCount++;

    if (errors.lastname.length > 0) errorsFieldsCount++;

    if (errors.secondLastname.length > 0) errorsFieldsCount++;

    if (errors.age.length > 0) errorsFieldsCount++;

    if (errors.curp.length > 0) errorsFieldsCount++;

    if (errors.shortDescription.length > 0) errorsFieldsCount++;

    return errorsFieldsCount;
  };

  const validFormSecurity = () => {
    let errorsFieldsCount = 0;

    if (errorsSecurity.global.length > 0) errorsFieldsCount++;

    if (errorsSecurity.password.length > 0) errorsFieldsCount++;

    return errorsFieldsCount;
  };

  const updateAccount = () => {
    const hasErrorsCount = validForm();

    if (hasErrorsCount > 0) return;

    let obj = {
      id: account.userId,
      names: account.names.trim() ?? "",
      first_lastname: account.firstName.trim() ?? "",
      second_lastname: account.lastName.trim() ?? "",
      curp: account.curp.trim() ?? "",
      phone_number: account.phone.trim() ?? "",
      birthdate:
        account.birthDate && account.birthDate.length > 0
          ? account.birthDate
          : null,
      birth_country: account.country.trim() ?? "",
      sex: account.sex ?? 0,
      person_type: account.personType ?? 0,
      about_me: account.aboutMe ?? "",
      short_description: account.shortDescription
        ? account.shortDescription.trim()
        : "",
      website_url: account.websiteUrl.trim() ?? "",
      address: account.address.trim() ?? "",
      pwa_profession_id: account.pwaProfressionId ?? "",
      professional_license: account.professionalLicense.trim() ?? "",
      professional_license_institution:
        account.professionalLicenseInstitution.trim() ?? "",
    };

    console.log(obj);

    updateUserData(obj)(dispatch);
  };

  useMemo(() => {
    if (successful) getUserAuthenticated()(dispatchAuth);
  }, [successful]);

  useMemo(() => {
    if (account.userId) setAccount({ ...account, userId: account.userId });
  }, [account.userId]);

  return (
    <div className="w-full h-full relative">
      <AlertComponent
        variant="error"
        show={error !== null}
        description={"Ha ocurrido un error actualizando la cuenta"}
      />
      <SuccessfulComponent
        tittle="Actualizado con exito"
        show={successful}
        description={"Cuenta actualizada exitosamente"}
      />
      <div className="md:grid grid-cols-2 gap-5 w-full lg:flex justify-between items-center sticky top-[67px] z-[50] border-b bg-slate-100 pt-2">
        <div className="lg:w-[70%]">
          <h2 className="lg:mr-5 text-2xl font-bold truncate">Mi Cuenta</h2>
          <p className="font-light text-slate-500 text-base my-3">
            Completa la información de tu cuenta para poder desbloquear otras
            funciones dentro de la plataforma
          </p>
        </div>
        {steps === 0 ? (
          <Button
            variant="primary"
            disabled={
              loading ||
              account.names === "" ||
              account.firstName === "" ||
              validForm() > 0
            }
            onClick={() => {
              updateAccount();
            }}
            className="px-16 mb-2 md:mb-0"
          >
            Actualizar
          </Button>
        ) : (
          <Button
            variant="primary"
            disabled={
              loadingSecurity ||
              formData.password === "" ||
              validFormSecurity() > 0
            }
            onClick={() => {
              updatePassword(formData.password)(dispatch);
            }}
            className="px-16 mt-3 md:mt-0 w-full md:w-fit"
          >
            Actualizar contraseña
          </Button>
        )}
      </div>
      <div>
        <Steps steps={steps} setSteps={setSteps} user={account} />
      </div>
      <div>{getComponentByTabActive()}</div>
    </div>
  );
}
