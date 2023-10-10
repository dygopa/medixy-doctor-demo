import Table from "(presentation)/components/core/BaseComponents/Table";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Paginate from "(presentation)/components/core/Paginate/Paginate";
import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import {
  IMedicalRecordsListContext,
  MedicalRecordsListContext,
} from "../context/MedicalRecordsListContext";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { IUser } from "domain/core/entities/userEntity";

interface IPatientsTableProps {
  user: IUser;
}

export default function PatientsTable({ user }: IPatientsTableProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordsListContext>(
    MedicalRecordsListContext
  );
  const {
    data: medicalConsulties,
    loading,
    successful,
    error,
  } = state.medicalConsulties;
  const { getMedicalConsulties } = actions;

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const searchQuery = searchParams.get("search_query");
  const sinceAt = searchParams.get("since_at");
  const untilAt = searchParams.get("until_at");

  useEffect(() => {
    getMedicalConsulties({
      doctorId: user.userId ? parseInt(user.userId, 10) : 0,
      searchQuery: searchQuery && searchQuery.length > 0 ? searchQuery : null,
      sinceAt: sinceAt ? new Date(sinceAt) : null,
      untilAt: untilAt ? new Date(untilAt) : null,
      page: page && page?.length > 0 ? parseInt(page.toString(), 10) : 1,
      limit: 10,
    })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sinceAt, untilAt, searchQuery]);

  return (
    <>
      <div className="col-span-12 overflow-auto lg:overflow-visible z-0 ">
        <Table className="border-spacing-y-[10px] border-separate">
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Fecha
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Mótivo de la consulta
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Diagnóstico
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Paciente
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                CURP
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody className="z-0">
            {medicalConsulties.data?.length > 0 &&
              medicalConsulties.data.map(
                (medicalConsulty: IMedicalConsulty) => (
                  <Table.Tr
                    key={medicalConsulty.id}
                    className="hover:cursor-pointer"
                  >
                    <Table.Td
                      className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                      onClick={() =>
                        router.push(
                          MedicalRecordRoutesEnum.MedicalRecord +
                            medicalConsulty.id +
                            MedicalRecordRoutesEnum.MedicalRecordSummary
                        )
                      }
                    >
                      <Link
                        href={{
                          pathname:
                            MedicalRecordRoutesEnum.MedicalRecord +
                            medicalConsulty.id +
                            MedicalRecordRoutesEnum.MedicalRecordSummary,
                        }}
                      >
                        {new Date(medicalConsulty.consultationDate).getDate()}/
                        {new Date(medicalConsulty.consultationDate).getMonth()}/
                        {new Date(
                          medicalConsulty.consultationDate
                        ).getFullYear()}
                      </Link>
                    </Table.Td>

                    <Table.Td
                      className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                      onClick={() =>
                        router.push(
                          MedicalRecordRoutesEnum.MedicalRecord +
                            medicalConsulty.id +
                            MedicalRecordRoutesEnum.MedicalRecordSummary
                        )
                      }
                    >
                      {medicalConsulty.consultationReason}
                    </Table.Td>

                    <Table.Td
                      className="first:rounded-l-md last:rounded-r-md max-w-[10px] bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5 text-ellipsis whitespace-nowrap overflow-hidden"
                      onClick={() =>
                        router.push(
                          MedicalRecordRoutesEnum.MedicalRecord +
                            medicalConsulty.id +
                            MedicalRecordRoutesEnum.MedicalRecordSummary
                        )
                      }
                    >
                      {medicalConsulty.diagnose &&
                      medicalConsulty.diagnose.length > 0
                        ? medicalConsulty.diagnose[0].description
                        : ""}
                    </Table.Td>

                    <Table.Td
                      className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                      onClick={() =>
                        router.push(
                          MedicalRecordRoutesEnum.MedicalRecord +
                            medicalConsulty.id +
                            MedicalRecordRoutesEnum.MedicalRecordSummary
                        )
                      }
                    >
                      {medicalConsulty.subject.name}{" "}
                      {medicalConsulty.subject.lastName}
                    </Table.Td>

                    <Table.Td
                      className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                      onClick={() =>
                        router.push(
                          MedicalRecordRoutesEnum.MedicalRecord +
                            medicalConsulty.id +
                            MedicalRecordRoutesEnum.MedicalRecordSummary
                        )
                      }
                    >
                      {medicalConsulty.subject.curp &&
                      medicalConsulty.subject.curp.length > 0
                        ? medicalConsulty.subject.curp
                        : "No especificado"}
                    </Table.Td>
                  </Table.Tr>
                )
              )}
          </Table.Tbody>
        </Table>

        {loading && (
          <div className="w-full flex flex-col justify-center items-center">
            <p className="font-bold text-slate-900 text-lg text-center">
              Un momento...
            </p>
            <p className="font-light text-slate-500 text-base text-center">
              Cargando tus consultas médicas.
            </p>
          </div>
        )}

        {error && (
          <div className="w-full flex flex-col justify-center items-center">
            <p className="font-bold text-slate-900 text-lg text-center">
              Algo no ha salido como se esperaba.
            </p>
            <p className="font-light text-slate-500 text-base text-center">
              Lo sentimos, algo no ha salido bien. Vuelve a intentarlo.
            </p>
          </div>
        )}

        {successful &&
          [...(medicalConsulties.data as Array<IMedicalConsulty>)].length ===
            0 && (
            <div className="w-full flex flex-col justify-center items-center text-center">
              <p className="font-bold text-slate-900 text-lg">
                Vaya, no tienes consultas médicas aún
              </p>
              <p className="font-light text-slate-500 text-base text-center">
                Lo sentimos, pero no tienes consultas médicas realizadas
                todavia.
              </p>
            </div>
          )}
      </div>

      <div className="flex justify-end mt-8 overflow-x-hidden">
        <Paginate
          page={page ? page.toString() : "1"}
          limit={medicalConsulties.metadata?.limit ?? 0}
          total={medicalConsulties.metadata?.total}
        />
      </div>
    </>
  );
}
