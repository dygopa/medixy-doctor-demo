import React, { useState, useEffect, useContext, useMemo } from "react";
import BasicData from "./BasicData";
import Credentials from "./Credentials";
import Contact from "./Contact";
import AboutMe from "./AboutMe";
import { IUser } from "domain/core/entities/userEntity";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { IUserContext, UserContext } from "../context/UserContext";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";

interface IFormularyProps {
  account: IUser;
  setAccount: any;
}

export default function Formulary({ account, setAccount }: IFormularyProps) {
  const { state, actions, dispatch } = useContext<IUserContext>(UserContext);
  const { updateUserData } = actions;

  const { loading, successful, error } = state.updateUserData;

  const updateAccount = () => {
    let obj = {
      id: account.userId,
      names: account.names ?? "",
      first_lastname: account.firstName ?? "",
      second_lastname: account.lastName ?? "",
      curp: account.curp ?? "",
      phone_number: account.phone ?? "",
      birthdate: "2023-04-29",
      birth_country: account.country ?? "",
      sex: account.sex ?? 0,
      person_type: account.personType ?? 0,
      about_me: account.aboutMe ?? "",
      website_url: account.websiteUrl ?? "",
      address: account.address ?? "",
    };
    updateUserData(obj)(dispatch);
  };

  useMemo(() => {
    if (account.userId) setAccount({ ...account, userId: account.userId });
  }, [account.userId]);

  return (
    <div>
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

      <div className="w-full lg:flex justify-between items-center">
        <div className="lg:w-[50%]">
          <h2 className="lg:mr-5 text-2xl font-bold truncate">Mi cuenta</h2>
          <p className="font-light text-slate-500 text-base my-3">
            Completa la información de tu cuenta para poder desbloquear otras
            funciones dentro de la plataforma
          </p>
        </div>
        <Button
          variant="primary"
          disabled={loading}
          onClick={() => {
            updateAccount();
          }}
        >
          Actualizar
        </Button>
      </div>
      <div className="w-full relative flex flex-col gap-4 mt-8">
        <BasicData account={account} setAccount={setAccount} />
        <Credentials account={account} setAccount={setAccount} />
        <Contact account={account} setAccount={setAccount} />
        <AboutMe account={account} setAccount={setAccount} />
      </div>
    </div>
  );
}
