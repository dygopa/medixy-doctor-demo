import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction, useContext } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../context/MedicalRecordContext";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { getFirstLetter } from "(presentation)/(helper)/strings/strings";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import { MedicalRecordStatusEnum } from "(presentation)/(enum)/medicalRecord/medicalRecordEnums";

export default function AboutPatient() {
  const { state } = useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { data: subject } = state.subject;
  const { data: appointment } = state.appointment;

  const router = useRouter();

  const getRedirectMedicalRecord = () => {
    if (appointment.data?.id) {
      return (
        MedicalRecordRoutesEnum.MedicalRecord +
        appointment.data.id +
        "?type=appointment"
      );
    }

    return (
      MedicalRecordRoutesEnum.MedicalRecord +
      subject?.subjectId +
      "?type=medical-record"
    );
  };

  return (
    <div
      className={clsx([
        "relative zoom-in xl:h-[300px] h-auto",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-4 box h-full">
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

            {appointment.data?.id && (
              <div>
                <div className="w-full flex justify-center items-center gap-2">
                  <p
                    className={clsx([
                      "font-medium p-[1.0%_7%] rounded text-sm",
                      appointment.data.status ===
                      MedicalRecordStatusEnum.COMPLETE
                        ? "bg-green-400 text-white"
                        : "text-yellow-800 bg-yellow-300",
                    ])}
                  >
                    {appointment.data.status ===
                    MedicalRecordStatusEnum.COMPLETE
                      ? "Atendido"
                      : "Por atención"}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="lg:pl-8 w-full overflow-y-hidden lg:mt-0 mt-8">
            <div className="w-full flex justify-end">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="rounded-lg hover:bg-gray-100 p-1">
                  <Lucide icon="dots-vertical" className="h-5" />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-15 mt-1 w-40 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5">
                    <Menu.Item>
                      {({ active }) => (
                        <div>
                          <button
                            type="button"
                            className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100 w-full"
                            onClick={() => {
                              router.push(
                                getRedirectMedicalRecord() +
                                  `&view_edit_subject=true`
                              );
                            }}
                          >
                            <Lucide icon="square-edit-outline" size={20} />
                            Editar
                          </button>
                        </div>
                      )}
                    </Menu.Item>

                    <Menu.Item>
                      {({ active }) => (
                        <div>
                          <button
                            type="button"
                            className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100 w-full"
                            onClick={() => {
                              router.push(
                                getRedirectMedicalRecord() +
                                  `&view_companion=true`
                              );
                            }}
                          >
                            <div>
                              <Lucide icon="account" size={20} />
                            </div>

                            <div>Contactos</div>
                          </button>
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            <div className="grid grid-cols-12 gap-4">
              <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6">
                <p className="font-normal text-slate-500 mb-1 text-[13px]">
                  Nombre(s)
                </p>

                <p className="font-medium text-[14px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {subject?.name}
                </p>
              </div>

              <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6">
                <p className="font-normal text-slate-500 mb-1 text-[13px]">
                  Primer Apellido
                </p>

                <p className="font-medium text-[14px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {subject?.lastName}
                </p>
              </div>

              <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6">
                <p className="font-normal text-slate-500 mb-1 text-[13px]">
                  Segundo Apellido
                </p>

                <p className="font-medium text-[14px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {subject && subject.motherLastName?.length > 0
                    ? subject?.motherLastName
                    : "No especificado"}
                </p>
              </div>

              <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6">
                <p className="font-normal text-slate-500 mb-1 text-[13px]">
                  Edad
                </p>

                <p className="font-medium text-[14px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {subject?.age
                    ? subject.age > 1
                      ? `${subject.age} ${
                          subject?.ageType === "years"
                            ? "años"
                            : subject.ageType === "days"
                            ? "días"
                            : "meses"
                        }`
                      : `${subject.age} ${
                          subject?.ageType === "years"
                            ? "año"
                            : subject.ageType === "days"
                            ? "día"
                            : "mes"
                        }`
                    : "No especificado"}
                </p>
              </div>

              <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-6">
                <p className="font-normal text-slate-500 mb-1 text-[13px]">
                  CURP
                </p>

                <p className="font-medium text-[14px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {subject && subject.curp?.length > 0
                    ? subject?.curp
                    : "No especificado"}
                </p>
              </div>

              <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                <p className="font-normal text-slate-500 mb-1 text-[13px]">
                  Teléfono
                </p>

                <p className="font-medium text-[14px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {subject?.phoneNumber}
                </p>
              </div>

              <div className="lg:col-span-4 md:col-span-4 sm:col-span-6 col-span-12">
                <p className="font-normal text-slate-500 mb-1 text-[13px]">
                  Correo Electrónico
                </p>

                <p className="font-medium text-[14px] text-ellipsis overflow-hidden whitespace-nowrap">
                  {subject && subject.email?.length > 0
                    ? subject?.email
                    : "No especificado"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
