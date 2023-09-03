import { getFirstLetter } from "(presentation)/(helper)/strings/strings";
import Image from "next/image";
import { useContext, useEffect } from "react";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../../../context/MedicalRecordCreateContext";

interface IPatientDetailProps {
  subjectId: number;
}

export default function PatientDetail({ subjectId }: IPatientDetailProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { getSubjectById } = actions;
  const { data: subject, loading, successful, error } = state.subject;
  const { successful: editSubjectSuccessful } = state.editSubject;

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getSubjectById(subjectId)(dispatch);

    return () => {
      isCleanup = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editSubjectSuccessful]);

  if (error)
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, algo no ha salido como se esperaba
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, algo no ha salido bien. Vuelve a intentarlo
        </p>
      </div>
    );

  if (!subject?.subjectId && successful) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, se ha encontrado el paciente
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero no hemos encontrado el paciente
        </p>
      </div>
    );
  }

  if (!subject?.subjectId && !successful) return <div className="mt-5" />;

  return (
    <div className="mt-6">
      <div className="lg:flex block">
        <div className="text-center lg:border-r border-grey">
          <div className="flex w-full justify-center mb-4 mr-24">
            {subject && subject?.pictureUrl.length > 0 ? (
              <div className="relative w-[100px] h-[100px]">
                <Image
                  className="object-cover rounded-full"
                  src={subject.pictureUrl}
                  alt=""
                  fill
                />
              </div>
            ) : (
              <div className="w-[60px] h-[60px] bg-primary rounded-full flex justify-center items-center">
                <span className="text-white font-semibold text-2xl">
                  {getFirstLetter(subject?.name ?? "").toUpperCase()}
                </span>
              </div>
            )}
          </div>

          <div>
            <div className="w-full flex justify-center items-center gap-2">
              <p className="font-medium p-[1.0%_7%] rounded text-sm text-yellow-800 bg-yellow-300">
                Por atención
              </p>
            </div>
          </div>
        </div>

        <div className="lg:pl-8 w-full flex justify-between xl:mt-0 mt-4">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-2 gap-8">
            <div>
              <p className="font-normal text-slate-500 mb-1">Nombre(s)</p>

              <span className="font-medium text-[16px]">
                {subject?.name} {subject?.lastName}
              </span>
            </div>
            <div>
              <p className="font-normal text-slate-500 mb-1">Edad</p>

              <span className="font-medium text-[16px]">
                {subject?.age
                  ? subject.age > 1
                    ? `${subject.age} ${
                        subject?.ageType === "years" ? "años" : "meses"
                      }`
                    : `${subject.age} ${
                        subject?.ageType === "years" ? "año" : "mes"
                      }`
                  : "No especificado"}{" "}
              </span>
            </div>

            <div>
              <p className="font-normal text-slate-500 mb-1">Primer Apellido</p>

              <span className="font-medium text-[16px]">
                {subject?.lastName}
              </span>
            </div>

            <div>
              <p className="font-normal text-slate-500 mb-1">
                Segundo Apellido
              </p>

              <span className="font-medium text-[16px]">
                {subject && subject.motherLastName?.length > 0
                  ? subject.motherLastName
                  : "No especificado"}
              </span>
            </div>

            <div>
              <p className="font-normal text-slate-500 mb-1">CURP</p>

              <span className="font-medium text-[16px]">
                {subject && subject.curp?.length > 0
                  ? subject.curp
                  : "No especificado"}
              </span>
            </div>

            <div>
              <p className="font-normal text-slate-500 mb-1">Teléfono</p>

              <span className="font-medium text-[16px]">
                {subject && subject.phoneNumber?.length > 0
                  ? subject.phoneNumber
                  : "No especificado"}
              </span>
            </div>

            <div>
              <p className="font-normal text-slate-500 mb-1">
                Correo Electrónico
              </p>

              <span className="font-medium text-[16px]">
                {subject && subject.email?.length > 0
                  ? subject.email
                  : "No especificado"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
