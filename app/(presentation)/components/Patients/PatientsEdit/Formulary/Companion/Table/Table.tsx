import { PatientsMedicalRecordRoutesEnum, PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Table from "(presentation)/components/core/BaseComponents/Table";
import Paginate from "(presentation)/components/core/Paginate/Paginate";
import { ISubject } from "domain/core/entities/subjectEntity";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { CompanionsListContext, ICompanionsListContext } from "../context/companionListContext";

export default function CompanionsTable ({patientId} : {patientId:number | undefined}) {

  const { state, actions, dispatch } =
    useContext<ICompanionsListContext>(CompanionsListContext);
  const { data: companions, loading, successful, error } = state.getCompanions;
  const { getCompanions} = actions;

  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page");
  const searchQuery = searchParams.get("search_query");

  useEffect(() => {
    getCompanions({
      page: page && page?.length > 0 ? parseInt(page.toString(), 10) : "1",
      searchQuery: searchQuery,
      limit: 10,
      patientId: patientId,
    })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchQuery]);

  return(
    <div className="col-span-12 overflow-auto lg:overflow-visible z-0 ">
      <Table className="border-spacing-y-[10px] border-separate">
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="border-b-0 whitespace-nowrap text-base">
              Acompañante
            </Table.Th>

            <Table.Th className="border-b-0 whitespace-nowrap text-base">
              CURP
            </Table.Th>

            <Table.Th className="border-b-0 whitespace-nowrap text-base">
              Teléfono
            </Table.Th>

            <Table.Th className="border-b-0 whitespace-nowrap text-base text-center">
              Opciones
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody className="z-0">
          {companions.data?.length > 0 &&
            companions.data.map((companion: ISubject) => (
              <Table.Tr
                key={companion.subjectId}
                className="hover:cursor-pointer"
              >
                <Table.Td
                  className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                  /*onClick={() =>
                    router.push(
                      PatientsRoutesEnum.PatientsEditCompanions + companion.companionId
                    )
                  }*/
                >
                  {companion.name} {companion.lastName}
                </Table.Td>

                <Table.Td
                  className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                  /*onClick={() =>
                    router.push(
                      PatientsRoutesEnum.PatientsEdit + companion.companionId
                    )
                  }*/
                >
                  {companion.curp}
                </Table.Td>

                <Table.Td
                  className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                  /*onClick={() =>
                    router.push(
                      PatientsRoutesEnum.PatientsEdit + companion.companionId
                    )
                  }*/
                >
                  {companion.phoneNumber}
                </Table.Td>

                <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                  <div className="flex items-center justify-center">
                    <Button
                      variant="primary"
                      className="p-2 text-center"
                    >
                      <Lucide icon="Edit" className="w-4 h-4" />
                    </Button>
                    {/*<Link
                      className="flex items-center"
                      href={{
                        pathname:
                          PatientsRoutesEnum.PatientsEdit + companion.companionId,
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
            Cargando los acompañantes.
          </p>
        </div>
      )}

      {successful && [...(companions.data as Array<ISubject>)].length === 0 && (
        <div className="w-full flex flex-col justify-center items-center text-center">
          <p className="font-bold text-slate-900 text-lg">
            Vaya, no tienes acompañantes aún
          </p>
          <p className="font-light text-slate-500 text-base text-center">
            Lo sentimos, pero no tienes acompañantes agregados todavia.
          </p>
        </div>
      )}
      {error && (
        <div className="w-full flex flex-col justify-center items-center">
          <p className="font-bold text-slate-900 text-lg text-center">
            A ocurrido un error
          </p>
          <p className="font-light text-slate-500 text-base text-center">
            Algo no ha salido bien, por favor vuelva a intentarlo.
          </p>
        </div>
      )}
      <div className="flex justify-end mt-8 overflow-x-hidden">
        <Paginate
          page={page ? page.toString() : "1"}
          limit={companions.metadata?.limit ?? 0}
          total={companions.metadata?.total}
        />
      </div>
    </div>
  )
}