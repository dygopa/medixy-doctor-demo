import { ordersTypeEnToEsEnEnum } from "(presentation)/(enum)/orders/ordersEnum";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IOrderMedical } from "domain/core/entities/orderEntity";
import { Dispatch, SetStateAction } from "react";

interface IOrderMobileProps {
  orders: IOrderMedical[];
  order: IOrderMedical;
  setOrders: Dispatch<SetStateAction<IOrderMedical[]>>;
  orderEdit: IOrderMedical | null;
  setOrderEdit: Dispatch<SetStateAction<IOrderMedical | null>>;
}

export default function OrderMobile({
  orders,
  order,
  setOrders,
  orderEdit,
  setOrderEdit,
}: IOrderMobileProps) {
  return (
    <div className="mt-2 overflow-auto intro-x bg-white border rounded-lg p-4 flex flex-col justify-between items-start gap-4">
      <div className="w-full flex justify-between items-center gap-4">
        <div className="w-full flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/40 text-primary flex justify-center items-center rounded-md text-xl">
            <Lucide icon="Activity" color="#22345F" size={25} />
          </div>

          <div className="relative flex flex-col justify-center items-start">
            <p className="font-semibold text-xl text-gray-950">
              {ordersTypeEnToEsEnEnum[order.orderType]}
            </p>
            <p className="font-light text-sm text-slate-500">
              {" "}
              {order.orderType.toLowerCase() === "specialty"
                ? order.specialty
                : order.medicalExam.length > 0
                ? order.medicalExam
                : order.indications}
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex">
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
