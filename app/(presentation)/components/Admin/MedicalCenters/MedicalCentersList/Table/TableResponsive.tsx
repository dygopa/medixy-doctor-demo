import Link from "next/link";
import { Fragment, useContext, useEffect } from "react";
import {
  IMedicalCentersListContext,
  MedicalCentersListContext,
} from "../context/MedicalCentersListContext";
import { AdminMedicalCentersRoutesEnum } from "(presentation)/(routes)/admin/medicalCentersRoutes";
import { ISupplier } from "domain/core/entities/supplierEntity";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { Menu, Transition } from "@headlessui/react";

export default function MedicalCentersTableResponsive() {
  const { state, actions, dispatch } = useContext<IMedicalCentersListContext>(
    MedicalCentersListContext
  );
  const {
    data: medicalCenters,
    loading,
    successful,
    error,
  } = state.medicalCenters;
  const { getMedicalCenters } = actions;

  useEffect(() => {
    getMedicalCenters()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          Cargando centros médicos.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, algo no ha salido como se esperaba
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, algo no ha salido bien. Vuelve a intentarlo
        </p>
      </div>
    );
  }

  if (successful && medicalCenters.data && medicalCenters.data?.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no hay centros médicos aún.
        </p>
        <p className="font-light text-slate-500 text-base">
          No se han creado centros médicos actualmente.
        </p>
      </div>
    );
  }

  return (
    <>
      {medicalCenters.data?.length > 0 &&
        medicalCenters.data.map((medicalCenter: ISupplier) => (
          <div
            key={medicalCenter.supplierId}
            className="mt-2 overflow-auto bg-white border rounded-lg p-4 flex flex-col justify-between items-start gap-4"
          >
            <div className="w-full flex justify-between items-center gap-4">
              <Link
                href={{
                  pathname:
                    AdminMedicalCentersRoutesEnum.MedicalCentersView +
                    medicalCenter.supplierId,
                }}
                className="w-full flex items-center gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/40 text-primary flex justify-center items-center rounded-md text-xl">
                  <Lucide icon="office-building-outline" />
                </div>

                <div className="relative flex flex-col justify-center items-start">
                  <p className="font-semibold text-xl text-gray-950">
                    {medicalCenter.name}
                  </p>
                  <p className="font-light text-sm text-slate-500">
                    {medicalCenter.email ?? "-"}
                  </p>
                </div>
              </Link>
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="rounded-lg hover:bg-gray-100 -mt-5 p-2">
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
                  <Menu.Items className="absolute right-0 z-15 mt-1 w-36 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5">
                    <Menu.Item>
                      {({ active }) => (
                        <div>
                          <Link
                            className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100"
                            href={{
                              pathname:
                                AdminMedicalCentersRoutesEnum.MedicalCentersView +
                                medicalCenter.supplierId,
                            }}
                          >
                            <Lucide icon="pencil" className="w-5 h-5" />
                            Editar
                          </Link>
                        </div>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
            <div className="w-full grid grid-cols-2 gap-1">
              <div className="flex flex-col justify-start items-start gap-2 text-left">
                <p className="font-light text-gray-500 text-sm">
                  Teléfono institucional
                </p>
                <p className="font-normal text-gray-950 text-base">
                  {medicalCenter.phoneNumber ?? "No especificado"}
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
