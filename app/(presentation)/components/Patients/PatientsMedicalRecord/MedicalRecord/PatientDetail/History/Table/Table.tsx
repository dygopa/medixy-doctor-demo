import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import Table from "(presentation)/components/core/BaseComponents/Table";
import clsx from "clsx";
import { useState } from "react";

export default function HistoryTable() {
  const { setIsOpen } = useMedicalRecord();

  const [isHover, setIsHover] = useState(false);

  return (
    <Table className="border-spacing-y-[10px] border-separate">
      <Table.Thead className="h-0">
        <Table.Tr>
          <Table.Th
            className="border-b-0 whitespace-nowrap h-0"
            style={{ padding: "0", height: "0" }}
          ></Table.Th>

          <Table.Th
            className="border-b-0 whitespace-nowrap h-0"
            style={{ padding: "0", height: "0" }}
          ></Table.Th>

          <Table.Th
            className="border-b-0 whitespace-nowrap h-0"
            style={{ padding: "0", height: "0" }}
          ></Table.Th>

          <Table.Th
            className="border-b-0 whitespace-nowrap h-0"
            style={{ padding: "0", height: "0" }}
          ></Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        <Table.Tr
          className="intro-x cursor-pointer bg-white hover:bg-primary shadow-[20px_3px_20px_#0000000b] "
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={() => setIsOpen(true)}
        >
          <Table.Td className="first:rounded-l-md last:rounded-r-md border-b-0 dark:bg-darkmode-600 py-5">
            <div>
              <div className="mb-2">
                <p
                  className={clsx([
                    " lg:text-lg",
                    isHover ? "text-white" : "text-slate-900",
                  ])}
                >
                  03/04/2023
                </p>
              </div>

              <div>
                <p
                  className={clsx([
                    "lg:text-base",
                    isHover ? "text-white" : "text-slate-500",
                  ])}
                >
                  8:30 am
                </p>
              </div>
            </div>
          </Table.Td>

          <Table.Td className="first:rounded-l-md last:rounded-r-md  border-b-0 dark:bg-darkmode-600 py-5">
            <div>
              <div>
                <p
                  className={clsx([
                    "lg:text-base",
                    isHover ? "text-white" : "text-slate-500",
                  ])}
                >
                  Diagnóstico
                </p>
              </div>

              <div>
                <p
                  className={clsx([
                    "lg:text-lg",
                    isHover ? "text-white" : "text-slate-900",
                  ])}
                >
                  Dolor de cabeza
                </p>
              </div>
            </div>
          </Table.Td>

          <Table.Td className="first:rounded-l-md last:rounded-r-md  border-b-0 dark:bg-darkmode-600 py-5">
            <div>
              <div>
                <p
                  className={clsx([
                    "lg:text-base",
                    isHover ? "text-white" : "text-slate-500",
                  ])}
                >
                  Centro
                </p>
              </div>

              <div>
                <p
                  className={clsx([
                    "lg:text-lg",
                    isHover ? "text-white" : "text-slate-900",
                  ])}
                >
                  Tlalnepantia
                </p>
              </div>
            </div>
          </Table.Td>

          <Table.Td className="first:rounded-l-md last:rounded-r-md  border-b-0 dark:bg-darkmode-600 py-5">
            <div>
              <div>
                <p
                  className={clsx([
                    "lg:text-base",
                    isHover ? "text-white" : "text-slate-500",
                  ])}
                >
                  Servicio de atención
                </p>
              </div>

              <div>
                <p
                  className={clsx([
                    "lg:text-lg",
                    isHover ? "text-white" : "text-slate-900",
                  ])}
                >
                  Consulta externa general
                </p>
              </div>
            </div>
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
