import {
  PatientsMedicalRecordRoutesEnum,
  PatientsRoutesEnum,
} from "(presentation)/(routes)/patientsRoutes";
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
import { IPatient } from "domain/core/entities/patientEntity";
import Paginate from "(presentation)/components/core/Paginate/Paginate";

export default function PatientsTable() {
  const { state, actions, dispatch } =
    useContext<IPatientsListContext>(PatientsListContext);
  const { data: patients, loading, successful, error } = state.getPatients;
  const { getPatients } = actions;

  const router = useRouter();
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

              <Table.Th className="text-center border-b-0 whitespace-nowrap">
                Opciones
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody className="z-0">
            {patients.data?.length > 0 &&
              patients.data.map((patient: IPatient) => (
                <Table.Tr
                  key={patient.patientId}
                  className="hover:cursor-pointer"
                >
                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                    onClick={() =>
                      router.push(
                        PatientsRoutesEnum.PatientsEdit + patient.patientId
                      )
                    }
                  >
                    <Link
                      href={{
                        pathname:
                          PatientsRoutesEnum.PatientsEdit + patient.patientId,
                      }}
                    >
                      {patient.name} {patient.lastName}
                    </Link>
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                    onClick={() =>
                      router.push(
                        PatientsRoutesEnum.PatientsEdit + patient.patientId
                      )
                    }
                  >
                    {patient.curp}
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                    onClick={() =>
                      router.push(
                        PatientsRoutesEnum.PatientsEdit + patient.patientId
                      )
                    }
                  >
                    {patient.phoneNumber}
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                    onClick={() =>
                      router.push(
                        PatientsRoutesEnum.PatientsEdit + patient.patientId
                      )
                    }
                  >
                    <div className="w-full flex justify-start items-center gap-2">
                      <span className="rounded-full w-[12px] h-[12px] bg-success"></span>
                      <p className="text-sm font-medium text-slate-900">
                        Activo
                      </p>
                    </div>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                    <div className="flex items-center justify-center">
                      <Link
                        className="flex items-center mr-3"
                        href={{
                          pathname:
                            PatientsRoutesEnum.PatientsView +
                            patient.patientId +
                            PatientsMedicalRecordRoutesEnum.MedicalRecord,
                        }}
                      >
                        <Button
                          variant="outline-primary"
                          className="p-3 text-center"
                        >
                          <Lucide icon="FileText" className="w-4 h-4" />
                        </Button>
                      </Link>
                      {/*<Link
                        className="flex items-center"
                        href={{
                          pathname:
                            PatientsRoutesEnum.PatientsEdit + patient.patientId,
                        }}
                      >
                        <Button
                          variant="outline-primary"
                          className="px-5 text-center"
                        >
                          <Lucide icon="Edit" className="w-5 h-5 mr-1" />
                        </Button>
                      </Link>*/}
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
              Cargando tus servicios.
            </p>
          </div>
        )}

        {successful && [...(patients.data as Array<IPatient>)].length === 0 && (
          <div className="w-full flex flex-col justify-center items-center text-center">
            <p className="font-bold text-slate-900 text-lg">
              Vaya, no tienes servicios aún
            </p>
            <p className="font-light text-slate-500 text-base text-center">
              Lo sentimos, pero no tienes servicios agregados todavia.
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
