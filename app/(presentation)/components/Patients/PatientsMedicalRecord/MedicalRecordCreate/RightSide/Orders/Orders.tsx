import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { IOrderMedical } from "domain/core/entities/orderEntity";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddOrder from "./AddOrder/AddOrder";
import OrdersList from "./OrdersList/OrdersList";

export default function Orders() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const view = params.get("view");

  const [showBody, setShowBody] = useState(false);
  const [orders, setOrders] = useState<IOrderMedical[]>([]);
  const [orderEdit, setOrderEdit] = useState<IOrderMedical | null>(null);

  const [initialRender, setInitialRender] = useState(true);

  const saveOrdersInLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    let valuesJSON = JSON.parse(valuesStorage ?? "");

    let ordersStorage = valuesJSON.orders;
    ordersStorage = orders;

    valuesJSON.orders = ordersStorage;

    localStorage.setItem(
      "prosit.storage.medical-record-create",
      JSON.stringify(valuesJSON)
    );
  };

  const setOrdersFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    const valuesJSON = JSON.parse(valuesStorage ?? "");

    setOrders(valuesJSON.orders);
  };

  useEffect(() => {
    if (!initialRender) saveOrdersInLocalStorage();

    setInitialRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  useEffect(() => {
    setOrdersFromLocalStorage();
  }, []);

  useEffect(() => {
    if (view === "orders") {
      setShowBody(true);
    } else {
      setShowBody(false);
    }
  }, [view]);

  return (
    <div
      className={clsx([
        "h-auto relative z-40 w-full",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="p-4 box h-full">
        <button
          type="button"
          onClick={() => {
            setShowBody(!showBody);
            router.push(`${pathname}?view=orders`);
          }}
          className="w-full"
        >
          <div className="w-full flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-bold text-lg text-slate-900">Ordenes</p>
            </div>

            <div>
              <Lucide
                icon={showBody ? "Minus" : "Plus"}
                color="#22345F"
                size={30}
              />
            </div>
          </div>
        </button>

        <form className={clsx([showBody ? "block" : "hidden"])}>
          <div className="py-4 border-b">
            <AddOrder
              orders={orders}
              setOrders={setOrders}
              orderEdit={orderEdit}
              setOrderEdit={setOrderEdit}
            />
          </div>

          <div className="py-4">
            <OrdersList
              orders={orders}
              setOrders={setOrders}
              orderEdit={orderEdit}
              setOrderEdit={setOrderEdit}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
