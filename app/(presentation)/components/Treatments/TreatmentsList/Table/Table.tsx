import { IOrder } from "domain/core/entities/orderEntity";
import { IUser } from "domain/core/entities/userEntity";
import { OrdersRoutesEnum } from "(presentation)/(routes)/ordersRoutes";
import Paginate from "(presentation)/components/core/Paginate/Paginate";
import Table from "(presentation)/components/core/BaseComponents/Table";
import Link from "next/link";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

export default function TableOrders() {
  return (
    <>
      <div className="col-span-12 overflow-auto intro-y lg:overflow-visible z-0">
        <Table className="border-spacing-y-[10px] border-separate -mt-2">
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Beneficiario
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Nombre
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                CURP
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Tratamiento
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Operador
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Fecha
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody></Table.Tbody>
        </Table>
      </div>
    </>
  );
}
