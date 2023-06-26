import Table from "(presentation)/components/core/BaseComponents/Table";
import { ISubject } from "domain/core/entities/subjectEntity";
import { useContext, useEffect } from "react";
import {
  DashboardContext,
  IDashboardContext,
} from "../../context/DashboardContext";

export default function PatientsTable() {
  const { state, actions, dispatch } =
    useContext<IDashboardContext>(DashboardContext);
  const { getSubjects } = actions;
  const { data: patients, loading, successful, error } = state.subjects;

  useEffect(() => {
    getSubjects()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          Cargando pacientes
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, algo ha salido mal
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, algo no ha salido como se esperaba.
        </p>
      </div>
    );
  }

  if (successful && patients.data.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no hay pacientes aún
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero en la plataforma no hay pacientes actualmente.
        </p>
      </div>
    );
  }

  if (!patients.data) return <div />;

  return (
    <div className="col-span-12 overflow-auto lg:overflow-visible z-0 ">
      <Table className="border-spacing-y-[10px] border-separate">
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="border-b-0 whitespace-nowrap text-base">
              Paciente
            </Table.Th>

            <Table.Th className="border-b-0 whitespace-nowrap text-base">
              CURP
            </Table.Th>

            <Table.Th className="border-b-0 whitespace-nowrap text-base">
              Teléfono
            </Table.Th>

            <Table.Th className="border-b-0 whitespace-nowrap text-base">
              Estatus
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody className="z-0">
          {patients.data.map((patient: ISubject) => (
            <Table.Tr key={patient.subjectId} className="hover:cursor-pointer">
              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                {patient.name} {patient.lastName}
              </Table.Td>

              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                {patient.curp}
              </Table.Td>

              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                {patient.phoneNumber}
              </Table.Td>

              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                <div className="w-full flex justify-start items-center gap-2">
                  <span className="rounded-full w-[12px] h-[12px] bg-success"></span>
                  <p className="text-sm font-medium text-slate-900">Activo</p>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
