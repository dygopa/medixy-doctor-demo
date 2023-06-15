import { IOrderMedical } from "domain/core/entities/orderEntity";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState<IOrderMedical[]>([]);

  const setValueFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) return;

    const valuesJSON = JSON.parse(valuesStorage ?? "");
    setOrders(valuesJSON.orders);
  };

  useEffect(() => {
    setValueFromLocalStorage();
  }, []);

  if (orders.length === 0) return <div />;

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">
          Estudios y estudios con especialistas requeridos
        </h3>
      </div>

      <div>
        {orders.map((order: IOrderMedical) => (
          <div key={order.orderId} className="mb-1">
            <h1 className="text-slate-900 font-bold text-lg">
              {order.specialty ? order.specialty : order.medicalProfile.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
