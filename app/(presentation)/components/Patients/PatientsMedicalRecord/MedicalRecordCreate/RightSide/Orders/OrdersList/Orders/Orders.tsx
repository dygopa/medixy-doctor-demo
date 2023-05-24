import { IOrderMedical } from "domain/core/entities/orderEntity";
import { Dispatch, SetStateAction } from "react";
import Order from "./Order/Order";
import OrderMobile from "./Order/OrderMobile";

interface IOrdersProps {
  orders: IOrderMedical[];
  setOrders: Dispatch<SetStateAction<IOrderMedical[]>>;
  orderEdit: IOrderMedical | null;
  setOrderEdit: Dispatch<SetStateAction<IOrderMedical | null>>;
}

export default function Orders({
  orders,
  setOrders,
  orderEdit,
  setOrderEdit,
}: IOrdersProps) {
  return (
    <div>
      {orders.map((order: IOrderMedical) => (
        <div key={order.orderId} className="mb-3">
          <div className="lg:block md:block hidden">
            <Order
              order={order}
              orders={orders}
              setOrders={setOrders}
              orderEdit={orderEdit}
              setOrderEdit={setOrderEdit}
            />
          </div>

          <div className="lg:hidden md:hidden block">
            <OrderMobile
              order={order}
              orders={orders}
              setOrders={setOrders}
              orderEdit={orderEdit}
              setOrderEdit={setOrderEdit}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
