import Table from "(presentation)/components/core/BaseComponents/Table";
import Link from "next/link";
import { useContext, useEffect } from "react";
import {
  IMedicalCentersListContext,
  MedicalCentersListContext,
} from "../context/MedicalCentersListContext";
import { useRouter } from "next/navigation";
import { AdminMedicalCentersRoutesEnum } from "(presentation)/(routes)/admin/medicalCentersRoutes";
import { ISupplier } from "domain/core/entities/supplierEntity";

export default function MedicalCentersTable() {
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

  const router = useRouter();

  useEffect(() => {
    getMedicalCenters()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toDateString = (date: Date) => {
    const stringDate: string = new Date(date).toLocaleDateString();

    return stringDate;
  };

  return (
    <>
      <div className="col-span-12 overflow-auto lg:overflow-visible z-0 ">
        <Table className="border-spacing-y-[10px] border-separate">
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Nombre
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Número institucional
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Correo institucional
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Fecha de registro
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody className="z-0">
            {medicalCenters.data?.length > 0 &&
              medicalCenters.data.map((medicalCenter: ISupplier) => (
                <Table.Tr
                  key={medicalCenter.supplierId}
                  className="hover:cursor-pointer"
                >
                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                    <Link
                      href={{
                        pathname:
                          AdminMedicalCentersRoutesEnum.MedicalCentersView +
                          medicalCenter.supplierId +
                          "/edit",
                      }}
                    >
                      {medicalCenter.name}
                    </Link>
                  </Table.Td>

                  <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                    {medicalCenter.phoneNumber ?? "No especificado"}
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                    onClick={() =>
                      router.push(
                        AdminMedicalCentersRoutesEnum.MedicalCentersView +
                          medicalCenter.supplierId +
                          "/edit"
                      )
                    }
                  >
                    {medicalCenter.email ?? "No especificado"}
                  </Table.Td>

                  <Table.Td
                    className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5"
                    onClick={() =>
                      router.push(
                        AdminMedicalCentersRoutesEnum.MedicalCentersView +
                          medicalCenter.supplierId +
                          "/edit"
                      )
                    }
                  >
                    {toDateString(medicalCenter.createdOn)}
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
              Cargando centros médicos.
            </p>
          </div>
        )}

        {successful && medicalCenters.data.length === 0 && (
          <div className="w-full flex flex-col justify-center items-center text-center">
            <p className="font-bold text-slate-900 text-lg">
              No hay centros médicos
            </p>
            <p className="font-light text-slate-500 text-base text-center">
              No se han creado centros médicos actualmente
            </p>
          </div>
        )}
      </div>
    </>
  );
}
