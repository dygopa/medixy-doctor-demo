import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import Table from "(presentation)/components/core/BaseComponents/Table";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Link from "next/link";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { useContext, useEffect } from "react";
import {
  IPatientsListContext,
  PatientsListContext,
} from "../context/PatientsListContext";
import { useRouter, useSearchParams } from "next/navigation";
import { ISubject } from "domain/core/entities/subjectEntity";
import Paginate from "(presentation)/components/core/Paginate/Paginate";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import { IAuthContext, AuthContext } from "(presentation)/(layouts)/AppLayout/context/AuthContext";

export default function PatientsTable() {

  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: user, successful: successfulUser } = authState.getUserAuthenticated;

  const { state, actions, dispatch } =
    useContext<IPatientsListContext>(PatientsListContext);
  const { data: patients, loading, successful, error } = state.getSubjects;
  const { getSubjects } = actions;

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const searchQuery = searchParams.get("search_query");

  useEffect(() => {
    if (successfulUser) {
      getSubjects({
        userId: user.userId,
        page: page && page?.length > 0 ? parseInt(page.toString(), 10) : "1",
        searchQuery: searchQuery,
        limit: 10,
      })(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery, user]);

  return (
    <>
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
            {patients.data?.length > 0 &&
              patients.data.map((patient: ISubject) => (
                <Table.Tr
                  key={patient.subjectId}
                  className="hover:cursor-pointer"
                  onClick={() =>
                    router.push(
                      MedicalRecordRoutesEnum.MedicalRecord + patient.subjectId
                    )
                  }
                >
                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                    
                  >
                    {patient.name} {patient.lastName}
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                    
                  >
                    {patient.curp}
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                    
                  >
                    {patient.phoneNumber}
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                    
                  >
                    <div className="w-full flex justify-start items-center gap-2">
                      <span className="rounded-full w-[12px] h-[12px] bg-success"></span>
                      <p className="text-sm font-medium text-slate-900">
                        Activo
                      </p>
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>
        {loading && (
          <div className="w-full flex flex-col justify-center items-center">
            <p className="font-bold text-slate-900 text-lg text-center">
              Un momento...
            </p>
            <p className="font-light text-slate-500 text-base text-center">
              Cargando tus pacientes.
            </p>
          </div>
        )}

        {successful && [...(patients.data as Array<ISubject>)].length === 0 && (
          <div className="w-full flex flex-col justify-center items-center text-center">
            <p className="font-bold text-slate-900 text-lg">
              Vaya, no tienes Pacientes aún
            </p>
            <p className="font-light text-slate-500 text-base text-center">
              Lo sentimos, pero no tienes pacientes agregados todavia.
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-8 overflow-x-hidden">
        <Paginate
          page={page ? page.toString() : "1"}
          limit={patients.metadata?.limit ?? 0}
          total={patients.metadata?.total}
        />
      </div>
    </>
  );
}
