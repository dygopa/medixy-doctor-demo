import { IUser } from "domain/core/entities/userEntity";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import Table from "(presentation)/components/core/BaseComponents/Table";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Link from "next/link";

export default function PatientsTable() {
  return (
    <>
      <div className="col-span-12 overflow-auto intro-y lg:overflow-visible z-0">
        <Table className="border-spacing-y-[10px] border-separate -mt-2">
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Paciente
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                CURP
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Fecha
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Hora
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Unidad Médica
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Operador
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Estatus
              </Table.Th>

              <Table.Th className="text-center border-b-0 whitespace-nowrap">
                Opciones
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            <Table.Tr className="intro-x">
              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                Jose Hernandez
              </Table.Td>

              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                ACV32
              </Table.Td>

              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                12/12/2022
              </Table.Td>

              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                12:00
              </Table.Td>

              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                Centro de salud
              </Table.Td>

              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                Dylan Gonzalez
              </Table.Td>

              <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
                <div className="w-full flex justify-start items-center gap-2">
                  <span className="rounded-full w-[12px] h-[12px] bg-success"></span>
                  <p className="text-sm font-medium text-slate-900">Activo</p>
                </div>
              </Table.Td>

              <Table.Td className="first:rounded-l-md last:rounded-r-md w-56 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400">
                <div className="flex items-center justify-center">
                  <Link
                    className="flex items-center mr-3"
                    href={{
                      pathname: PatientsRoutesEnum.PatientsView + "ACV32JH",
                    }}
                  >
                    <Lucide icon="Eye" className="w-4 h-4 mr-1" />
                    Ver
                  </Link>
                </div>
              </Table.Td>
            </Table.Tr>
          </Table.Tbody>
        </Table>
      </div>
    </>
  );
}
