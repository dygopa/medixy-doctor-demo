import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { IOrderMedical } from "domain/core/entities/orderEntity";
import { IUser } from "domain/core/entities/userEntity";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddOrder from "./AddOrder/AddOrder";
import OrdersList from "./OrdersList/OrdersList";

interface IOrdersProps {
  user: IUser;
}

export default function Orders({ user }: IOrdersProps) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const view = params.get("view");
  const type = params.get("type");

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
    <div>
      <div
        className={clsx([
          "h-auto relative z-40 w-full",
          "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="p-4 box h-full">
          <button type="button" className="w-full">
            <div className="w-full flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-bold text-lg text-slate-900">Ordenes</p>
              </div>
            </div>
          </button>

          <form>
            <div className="py-4 border-b">
              <AddOrder
                user={user}
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

      <div className="w-full lg:flex md:flex justify-end mt-14">
        <div className="lg:mr-2 md:mr-2 mr-0 lg:mb-0 md:mb-0 mb-4">
          <Button
            variant="outline-primary"
            className="h-[46px] lg:w-[150px] md:w-[150px] w-full"
            onClick={() => {
              router.replace(
                `${pathname}?view=diagnosis&type=${type ?? "medical-record"}`
              );
            }}
          >
            Volver
          </Button>
        </div>

        <div>
          <Button
            variant="primary"
            className="h-[46px] lg:w-[250px] md:w-[250px] w-full"
            onClick={() => {
              router.replace(
                `${pathname}?view=recipe&type=${type ?? "medical-record"}`
              );
            }}
          >
            <div className="flex items-center">
              <div className="mr-2">Receta</div>

              <div>
                <Lucide icon="ArrowRight" color="#fff" size={25} />
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
