import Table from "(presentation)/components/core/BaseComponents/Table";
import { IUser } from "domain/core/entities/userEntity";
import { useContext, useEffect } from "react";
import {
  DashboardContext,
  IDashboardContext,
} from "../../context/DashboardContext";

export default function PatientsTable() {
  const { state, actions, dispatch } =
    useContext<IDashboardContext>(DashboardContext);
  const { getDoctors } = actions;
  const { data: doctors, loading, successful, error } = state.doctors;

  useEffect(() => {
    getDoctors()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">Cargando doctores</p>
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

  if (successful && doctors.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no hay doctores aún
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero en la plataforma no hay doctores actualmente.
        </p>
      </div>
    );
  }

  if (doctors.length === 0) return <div />;

  return (
    <div className="col-span-12 overflow-auto lg:overflow-visible z-0 ">
      <Table className="border-spacing-y-[10px] border-separate">
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="border-b-0 whitespace-nowrap text-base">
              Doctor
            </Table.Th>

            <Table.Th className="border-b-0 whitespace-nowrap text-base">
              CURP
            </Table.Th>

            <Table.Th className="border-b-0 whitespace-nowrap text-base">
              Teléfono
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody className="z-0">
          {doctors.map((doctor: IUser) => (
            <Table.Tr key={doctor.userId} className="hover:cursor-pointer">
              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                {doctor.names}
              </Table.Td>

              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                {doctor.curp}
              </Table.Td>

              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                {doctor.phone}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
