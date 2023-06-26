import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import BasicData from "./BasicData";
import { IUser } from "domain/core/entities/userEntity";
import Button from "(presentation)/components/core/BaseComponents/Button";
/*import { IUserContext, UserContext } from "../context/UserContext";*/
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import {
  DoctorViewContext,
  IDoctorViewContext,
} from "../context/DoctorViewContext";
import Contact from "./Contact";
import AboutMe from "./AboutMe";

export default function Formulary() {
  const { state, actions, dispatch } =
    useContext<IDoctorViewContext>(DoctorViewContext);
  const { data: doctor } = state.getDoctorById;
  const { data: specialities } = state.getUserMedicalSpecialities;

  console.log(doctor)
  console.log(specialities)

  return (
    <div>
      <div className="w-full sticky top-[67px] z-[50]  bg-slate-100 pt-2">
        <div className="md:flex justify-start items-center">
          <div className="lg:w-[50%]">
            <h2 className="lg:mr-5 text-2xl font-bold truncate">
              {doctor?.names} {doctor?.lastName}
            </h2>
            {/*<p className="font-light text-slate-500 text-base my-3 lg:block md:block hidden">
              Completa la información de tu paciente para registrar todos sus
              datos.
            </p>*/}
          </div>
        </div>
      </div>
      <div className="w-full relative flex flex-col gap-4 mt-8">
        <BasicData
          doctor={doctor}
        />
        <Contact doctor={doctor} />
        <AboutMe doctor= {doctor} />
      </div>
    </div>
  );
}
