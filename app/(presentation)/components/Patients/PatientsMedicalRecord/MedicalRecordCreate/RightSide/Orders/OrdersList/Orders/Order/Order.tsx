import { ordersTypeEnToEsEnEnum } from "(presentation)/(enum)/orders/ordersEnum";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IOrderMedical } from "domain/core/entities/orderEntity";
import { Dispatch, SetStateAction } from "react";

interface IOrderProps {
  orders: IOrderMedical[];
  order: IOrderMedical;
  setOrders: Dispatch<SetStateAction<IOrderMedical[]>>;
  orderEdit: IOrderMedical | null;
  setOrderEdit: Dispatch<SetStateAction<IOrderMedical | null>>;
}

export default function Order({
  orders,
  order,
  setOrders,
  orderEdit,
  setOrderEdit,
}: IOrderProps) {
  return (
    <div className="flex items-center bg-gray-400 p-3 rounded-md bg-opacity-10">
      <div className="w-[200px]">
        <p className="text-md text-slate-900 font-normal">
          {new Date().getDate()}/{new Date().getMonth() + 1}/
          {new Date().getFullYear()}
        </p>
      </div>

      <div className="w-[400px]">
        <p className="text-md text-slate-900 font-normal">
          {ordersTypeEnToEsEnEnum[order.orderType]}
        </p>
      </div>

      <div className="w-[400px]">
        <p className="text-md text-slate-900 font-normal">
          {order.orderType.toLowerCase() === "specialty"
            ? order.specialty
            : order.medicalExam.length > 0
            ? order.medicalExam
            : order.indications}
        </p>
      </div>

      <div className="text-center flex items-center justify-center">
        <div className="mr-3">
          <button
            type="button"
            onClick={
              orderEdit && orderEdit.orderId === order.orderId
                ? () => setOrderEdit(null)
                : () => setOrderEdit(order)
            }
            className="text-center flex justify-center w-full"
          >
            <div className="flex items-center">
              <div>
                <Lucide
                  icon="Pencil"
                  color={
                    orderEdit && orderEdit.orderId === order.orderId
                      ? "#059669"
                      : "#22345F"
                  }
                  size={25}
                />
              </div>

              {orderEdit && orderEdit.orderId === order.orderId && (
                <div className="ml-2">
                  <p>Editando...</p>
                </div>
              )}
            </div>
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={() => {
              if (orderEdit && orderEdit.orderId === order.orderId) {
                setOrderEdit(null);
              }

              setOrders(
                orders.filter(
                  (orderFilter) => orderFilter.orderId !== order.orderId
                )
              );
            }}
            className="text-center flex justify-center w-full"
          >
            <Lucide icon="Trash2" color="#e11d48" size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
