import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Table from "(presentation)/components/core/BaseComponents/Table";
import Paginate from "(presentation)/components/core/Paginate/Paginate";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "(presentation)/components/MedicalRecord/MedicalRecord/context/MedicalRecordContext";
import { IRelationSubject, ISubject } from "domain/core/entities/subjectEntity";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useEffect } from "react";

interface ITableProps {
  setCompanionEdit: Dispatch<SetStateAction<ISubject | null>>;
  patientId: number;
}

export default function CompanionsTable({
  patientId,
  setCompanionEdit,
}: ITableProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { data: companions, loading, successful, error } = state.companions;
  const { getCompanions } = actions;
  useEffect(() => {
    getCompanions({
      patientId: patientId,
    })(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg text-center">
          Un momento...
        </p>
        <p className="font-light text-slate-500 text-base text-center">
          Cargando los contactos.
        </p>
      </div>
    );
  }

  if (successful && companions.data.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center text-center">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no tienes contactos aún
        </p>
        <p className="font-light text-slate-500 text-base text-center">
          Lo sentimos, pero no tienes contactos agregados todavia.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg text-center">
          A ocurrido un error
        </p>
        <p className="font-light text-slate-500 text-base text-center">
          Algo no ha salido bien, por favor vuelva a intentarlo.
        </p>
      </div>
    );
  }

  return (
    <div className="col-span-12 overflow-auto lg:overflow-visible z-0 ">
      <Table className="border-spacing-y-[10px] border-separate">
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="border-b-0 whitespace-nowrap text-base">
              Contacto
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
            companions.data.map((companion: IRelationSubject) => (
              <Table.Tr key={companion.id} className="hover:cursor-pointer">
                <Table.Td
                  className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                  /*onClick={() =>
                    router.push(
                      PatientsRoutesEnum.PatientsEditCompanions + companion.companionId
                    )
                  }*/
                >
                  {companion.subjectSecondary.name}{" "}
                  {companion.subjectSecondary.lastName}
                </Table.Td>

                <Table.Td
                  className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                  /*onClick={() =>
                    router.push(
                      PatientsRoutesEnum.PatientsEdit + companion.companionId
                    )
                  }*/
                >
                  {companion.subjectSecondary.curp}
                </Table.Td>

                <Table.Td
                  className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                  /*onClick={() =>
                    router.push(
                      PatientsRoutesEnum.PatientsEdit + companion.companionId
                    )
                  }*/
                >
                  {companion.subjectSecondary.phoneNumber}
                </Table.Td>

                <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                  <div
                    className="flex items-center justify-center"
                    onClick={() => setCompanionEdit(companion.subjectSecondary)}
                  >
                    <Button variant="primary" className="p-2 text-center">
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
    </div>
  );
}
