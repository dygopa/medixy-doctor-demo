import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";

interface ISummaryItemProps {
  title: string;
  quantity: string | number;
  icon: any;
}

export default function SummaryItem({
  title,
  quantity,
  icon,
}: ISummaryItemProps) {
  return (
    <div
      className={clsx([
        "relative zoom-in h-auto md:h-[180px]",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
    >
      <div className="px-4 py-8 box h-full overflow-y-hidden">
        <div className="flex">
          <div className="mr-6">
            <Lucide icon={icon} color="#216AD9" size={50} />
          </div>

          <div>
            <div className="mb-3">
              <h1 className="font-normal text-lg">{title}</h1>
            </div>

            <div>
              <h1 className="font-bold text-slate-900 text-xl">{quantity}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
