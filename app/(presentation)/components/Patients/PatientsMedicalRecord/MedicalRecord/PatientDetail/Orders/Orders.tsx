import clsx from "clsx";
import OrdersList from "./OrdersList/OrdersList";

export default function Orders() {
  return (
    <div
      className={clsx([
        "relative",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
      style={{ height: "33vh" }}
    >
      <div className="p-5 box" style={{ height: "33vh" }}>
        <div>
          <div className="w-full flex justify-between items-center border-b pb-2">
            <p className="font-bold text-lg text-slate-900">Órdenes</p>

            <p className="font-normal text-[15px] text-slate-500 cursor-pointer">
              Ver más
            </p>
          </div>
        </div>

        <div className="col-span-12 overflow-auto intro-y lg:overflow-visible z-0">
          <OrdersList />
        </div>
      </div>
    </div>
  );
}
