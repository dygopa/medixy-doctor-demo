import { IOrderMedical } from "domain/core/entities/orderEntity";
import { Dispatch, SetStateAction } from "react";
import Head from "./Head/Head";
import Orders from "./Orders/Orders";

interface IOrdersListProps {
  orders: IOrderMedical[];
  setOrders: Dispatch<SetStateAction<IOrderMedical[]>>;
  orderEdit: IOrderMedical | null;
  setOrderEdit: Dispatch<SetStateAction<IOrderMedical | null>>;
}

export default function OrdersList({
  orders,
  setOrders,
  orderEdit,
  setOrderEdit,
}: IOrdersListProps) {
  if (orders.length === 0) return <div />;

  return (
    <div>
      <div className="mb-3 lg:block md:block hidden">
        <Head />
      </div>

      <div className="mb-3">
        <Orders
          orders={orders}
          setOrders={setOrders}
          orderEdit={orderEdit}
          setOrderEdit={setOrderEdit}
        />
      </div>
    </div>
  );
}
