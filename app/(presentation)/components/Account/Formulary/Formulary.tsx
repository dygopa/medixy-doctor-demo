import React, { useState, useEffect, useContext, useMemo } from "react";
import BasicData from "./BasicData";
import Credentials from "./Credentials";
import Contact from "./Contact";
import AboutMe from "./AboutMe";
import { IUser } from "domain/core/entities/userEntity";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { IUserContext, UserContext } from "../context/UserContext";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { StickyNavbar } from "(presentation)/components/core/StickyNavbar/StickyNavbar";

interface IFormularyProps {
  account: IUser;
  setAccount: any;
}

export default function Formulary({ account, setAccount }: IFormularyProps) {
  const { state, actions, dispatch } = useContext<IUserContext>(UserContext);
  const { updateUserData } = actions;

  const { loading, successful, error } = state.updateUserData;
  
  const [errors, setErrors] = useState({
    global: "",
    name: "",
    lastname: "",
    age: '',
  });

  const validForm = () => {
    let errorsFieldsCount = 0;

    if (errors.global.length > 0) errorsFieldsCount++;

    if (errors.name.length > 0) errorsFieldsCount++;

    if (errors.lastname.length > 0) errorsFieldsCount++;
    
    if (errors.age.length > 0) errorsFieldsCount++;

    return errorsFieldsCount;
  };

  const updateAccount = () => {

    const hasErrorsCount = validForm();

    if (hasErrorsCount > 0) return;

    let obj = {
      id: account.userId,
      names: account.names ?? "",
      first_lastname: account.firstName ?? "",
      second_lastname: account.lastName ?? "",
      curp: account.curp ?? "",
      phone_number: account.phone ?? "",
      birthdate: account.birthDate ?? null,
      birth_country: account.country ?? "",
      sex: account.sex ?? 0,
      person_type: account.personType ?? 0,
      about_me: account.aboutMe ?? "",
      website_url: account.websiteUrl ?? "",
      address: account.address ?? "",
      pwa_profression_id: account.pwaProfressionId ?? "",
      professional_license: account.professionalLicense ?? "",
      professional_license_institution: account.professionalLicenseInstitution ?? "",
    };
    updateUserData(obj)(dispatch);
  };

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
      <AlertComponent
        variant="success"
        show={successful === true}
        description="Cuenta actualizada exitosamente"
      />
      <div className="md:grid grid-cols-2 gap-5 w-full lg:flex justify-between items-center sticky top-[67px] z-[50] border-b bg-slate-100 pt-2">
        <div className="lg:w-[70%]">
          <h2 className="lg:mr-5 text-2xl font-bold truncate">Mi cuenta</h2>
          <p className="font-light text-slate-500 text-base my-3">
            Completa la información de tu cuenta para poder desbloquear otras
            funciones dentro de la plataforma
          </p>
        </div>
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
      </div>
      <div className="w-full relative flex flex-col gap-4 mt-8">
        <BasicData account={account} setAccount={setAccount} errors={errors} setErrors={setErrors} />
        <Credentials account={account} setAccount={setAccount} />
        <Contact account={account} setAccount={setAccount} />
        <AboutMe account={account} setAccount={setAccount} />
      </div>
    </div>
  );
}
