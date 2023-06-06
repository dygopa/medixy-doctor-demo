import {
  PatientsMedicalRecordRoutesEnum,
  PatientsRoutesEnum,
} from "(presentation)/(routes)/patientsRoutes";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Link from "next/link";
import { Fragment, useContext, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  IPatientsListContext,
  PatientsListContext,
} from "../context/PatientsListContext";
import { IPatient } from "domain/core/entities/patientEntity";
import Paginate from "(presentation)/components/core/Paginate/Paginate";
import { useSearchParams } from "next/navigation";

export default function TableResponsive() {
  const { state, actions, dispatch } =
    useContext<IPatientsListContext>(PatientsListContext);
  const { data: patients, loading, successful, error } = state.getPatients;
  const { getPatients } = actions;

  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const searchQuery = searchParams.get("search_query");

  useEffect(() => {
    getPatients({
      page: page && page?.length > 0 ? parseInt(page.toString(), 10) : "1",
      searchQuery: searchQuery,
      limit: 10,
    })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          Cargando tus Pacientes.
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

  if (successful && patients.data && patients.data?.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no tienes pacientes aún
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero no tienes pacientes agregados todavia.
        </p>
      </div>
    );
  }

  return (
    <>
      {patients.data?.length > 0 &&
        patients.data.map((patient: IPatient) => (
          <div
            key={patient.patientId}
            className="mt-2 overflow-auto bg-white border rounded-lg p-4 flex flex-col justify-between items-start gap-4"
          >
            <div className="w-full flex justify-between items-center gap-4">
              <Link
                href={{
                  pathname: PatientsRoutesEnum.PatientsEdit + patient.patientId,
                }}
                className="w-full flex items-center gap-4 cursor-pointer"
              >
                <div className="w-12 h-12 bg-primary/40 text-primary flex justify-center items-center rounded-md text-xl">
                  <Lucide icon="User" />
                </div>

                <div className="relative flex flex-col justify-center items-start">
                  <p className="font-semibold text-xl text-gray-950">
                    {patient.name} {patient.lastName}
                  </p>
                  <p className="font-light text-sm text-slate-500">
                    {patient.curp}
                  </p>
                </div>
              </Link>
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="rounded-lg hover:bg-gray-100 -mt-5 p-2">
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
                  <Menu.Items className="absolute right-0 z-15 mt-1 w-36 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5">
                    <Menu.Item>
                      {({ active }) => (
                        <div>
                          <Link
                            className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100"
                            href={{
                              pathname:
                                PatientsRoutesEnum.PatientsView +
                                patient.patientId +
                                PatientsMedicalRecordRoutesEnum.MedicalRecord,
                            }}
                          >
                            <Lucide icon="FileText" className="w-5 h-5" />
                            Expediente
                          </Link>
                        </div>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <div>
                          <Link
                            className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100"
                            href={{
                              pathname:
                                PatientsRoutesEnum.PatientsEdit +
                                patient.patientId,
                            }}
                          >
                            <Lucide icon="Edit" className="w-5 h-5" />
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
                <p className="font-light text-gray-500 text-sm">Teléfono</p>
                <p className="font-normal text-gray-950 text-base">
                  {patient.phoneNumber}
                </p>
              </div>
              <div className="flex flex-col justify-start items-center gap-2 text-left">
                <p className="font-light text-gray-500 text-sm">Estatus</p>
                <p className="font-normal text-gray-950 text-base">
                  <span className="rounded-full w-[12px] h-[12px] bg-success"></span>
                  <p className="text-sm font-medium text-slate-900">Activo</p>
                </p>
              </div>
            </div>
          </div>
        ))}

      <div className="flex justify-center mt-8 overflow-x-hidden">
        <Paginate
          page={page ? page.toString() : "1"}
          limit={patients.metadata?.limit ?? 0}
          total={patients.metadata?.total}
        />
      </div>
    </>
  );
}
