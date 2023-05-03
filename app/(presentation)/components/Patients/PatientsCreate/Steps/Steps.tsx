import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { FiCheck } from "react-icons/fi";
import Formulary from "./Formulary/Formulary";

export default function Steps() {
  const [stepActive, setStepActive] = useState(0);

  const [listOfSteps, setListOfSteps] = useState([
    { label: "Información del paciente", status: false, step: 0 },
    { label: "Selecciona el centro", status: false, step: 1 },
    { label: "Selecciona el dia y la hora", status: false, step: 2 },
  ]);

  const [dateData, setDateData] = useState({
    day: "",
    hour: "",
  });

  const [patient, setPatient] = useState({
    nombreUsuario: "",
    dadsLastName: "",
    momsLastName: "",
    identificacion: "",
    telefono: "",
    direccion: "",
    edad: "",
    password: "",
    email: "",
    uid: "",
    lat: "",
    lon: "",
    codPostal: "",
  });

  const changeStep = () => setStepActive(stepActive + 1);

  function updateSteps() {
    let list = [...listOfSteps];
    list[stepActive]["status"] = true;
    changeStep();
    setListOfSteps(list);
  }

  return (
    <div className="w-full flex items-start gap-5">
      <div className="h-fit relative flex flex-col justify-start items-start gap-10">
        <p className="text-slate-900 text-sm font-light">
          Crear un nuevo paciente te permitira agendar citas y acceder a su
          expediente médico entre otras cosas.
        </p>
        <div className="relative flex flex-col justify-start items-start gap-7">
          {listOfSteps.map((prv, i) => (
            <div key={i} className={`flex justify-start items-center gap-3`}>
              <span
                className={`rounded-full w-[45px] h-[45px] flex flex-col justify-center items-center
                ${
                  prv["status"]
                    ? "bg-success shadow-lg shadow-success/70"
                    : prv["step"] === stepActive
                    ? "bg-primary text-white shadow-lg shadow-primary/50 font-bold"
                    : "bg-white text-primary shadow-lg border border-primary/10"
                }
                `}
              >
                {prv["status"] ? <FiCheck color={"#FFF"} /> : prv["step"] + 1}
              </span>
              <p
                className={`${
                  prv["step"] === stepActive ? "font-semibold" : "font-light"
                } text-primary text-base`}
              >
                {prv["label"]}
              </p>
            </div>
          ))}
        </div>
        {stepActive < 3 && (
          <Button onClick={updateSteps} variant="primary" className="w-full">
            Siguiente
          </Button>
        )}
        {stepActive === 3 && (
          <Link href={PatientsRoutesEnum.PatientsList} className="w-full">
            <Button variant="primary" className="w-full">
              Finalizar
            </Button>
          </Link>
        )}
      </div>

      <div className="relative h-fit w-full flex flex-col justify-start items-center gap-10 px-5">
        <div
          className={clsx([
            "relative",
            "before:content-[''] before:w-[90%] w-full before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
          ])}
        >
          <div className="p-5 box">
            <Formulary patient={patient} setPatient={setPatient} />
          </div>
        </div>
      </div>
    </div>
  );
}
