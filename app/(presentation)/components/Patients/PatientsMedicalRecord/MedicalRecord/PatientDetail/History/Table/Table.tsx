import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import Table from "(presentation)/components/core/BaseComponents/Table";

export default function HistoryTable() {
  const { setTitle, setPopupActive, setPopupSectionActive }: any =
    useMedicalRecord();

  return (
    <Table className="border-spacing-y-[10px] border-separate">
      <Table.Thead>
        <Table.Tr>
          <Table.Th className="border-b-0 whitespace-nowrap text-base">
            Fecha
          </Table.Th>

          <Table.Th className="border-b-0 whitespace-nowrap text-base">
            Diagnostico
          </Table.Th>

          <Table.Th className="border-b-0 whitespace-nowrap text-base">
            Centro
          </Table.Th>

          <Table.Th className="border-b-0 whitespace-nowrap text-base">
            Servicio atención
          </Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        <Table.Tr
          className="intro-x cursor-pointer"
          onClick={() => {
            setTitle("Detalle de consulta");
            setPopupActive(true);
            setPopupSectionActive(4);
          }}
        >
          <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
            03/01/2023 - 12:00 PM
          </Table.Td>

          <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
            Coronavirus
          </Table.Td>

          <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
            Centro médico
          </Table.Td>

          <Table.Td className="first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-5">
            Consulta externa
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
}
