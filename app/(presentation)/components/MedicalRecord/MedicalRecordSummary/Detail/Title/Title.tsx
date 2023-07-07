import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { Menu, Transition } from "@headlessui/react";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { Fragment, useContext, useState } from "react";
import { twMerge } from "tailwind-merge";
import QrCodeModal from "./QrCodeModal/QrCodeModal";
import {
  IMedicalRecordSummaryContext,
  MedicalRecordSummaryContext,
} from "../../context/MedicalRecordSummaryContext";

interface ITitleProps {
  medicalConsulty: IMedicalConsulty;
}

export default function Title({ medicalConsulty }: ITitleProps) {
  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: user } = authState.getUserAuthenticated;

  const { state, actions, dispatch } = useContext<IMedicalRecordSummaryContext>(
    MedicalRecordSummaryContext
  );
  const { getMedicalConsultyPDF } = actions;
  const { loading, error } = state.getMedicalConsultyPDF;

  const [showQrCodeModal, setShowQrCodeModal] = useState(false);

  return (
    <>
      <AlertComponent
        variant="error"
        show={error !== null}
        description="Algo ha salido mal. Vuelve a intentarlo"
      />

      <div className="lg:flex md:flex items-center justify-between py-3">
        <div className="flex items-center">
          <div className="lg:text-left md:text-left text-center">
            <div>
              <h1 className="text-slate-900 text-2xl font-bold">
                Fecha de la consulta
              </h1>
            </div>

            {medicalConsulty.consultationDate && (
              <div className="lg:text-left md:text-left text-center">
                <h1 className="text-slate-400 text-lg">
                  {new Date(medicalConsulty.consultationDate).getDate()}/
                  {new Date(medicalConsulty.consultationDate).getMonth()}/
                  {new Date(medicalConsulty.consultationDate).getFullYear()}
                </h1>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="rounded-lg hover:bg-primary hover:bg-opacity-20 p-1 border border-primary">
              <Lucide icon="MoreVertical" className="h-5" />
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
              <Menu.Items className="absolute right-0 z-15 mt-1 w-[250px] origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5">
                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <button
                        type="button"
                        disabled={loading}
                        onClick={() =>
                          getMedicalConsultyPDF({
                            doctor: user,
                            medicalConsulty: medicalConsulty,
                          })(dispatch)
                        }
                        className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100 w-full"
                      >
                        <Lucide icon="FilePlus" size={20} />
                        Generar PDF de la consulta
                      </button>
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <div>
                      <button
                        type="button"
                        onClick={() => setShowQrCodeModal(true)}
                        className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100 w-full"
                      >
                        <Lucide icon="QrCode" size={20} />
                        Ver QR de la consulta
                      </button>
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      <div
        className={twMerge([
          "z-[99] fixed top-0 left-0 w-full h-screen overflow-y-auto bg-gray-900/50 flex flex-col justify-center items-center",
          showQrCodeModal ? "visible" : "hidden",
        ])}
      >
        <div className="w-full md:w-[60%] lg:w-[40%] h-[450px] overflow-y-auto flex flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8">
          <QrCodeModal
            medicalConsulty={medicalConsulty}
            setShowQrCodeModal={setShowQrCodeModal}
          />
        </div>
      </div>
    </>
  );
}
