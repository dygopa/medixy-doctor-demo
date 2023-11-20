import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";

interface ISummaryItemProps {
  title: string;
  quantity: string | number;
  icon: any;
  active?: boolean;
}

export default function SummaryItem({
  title,
  quantity,
  icon,
  active = false,
}: ISummaryItemProps) {
  return (
    <div
      className={clsx([
        "relative h-auto md:h-[150px] transition-all",
        "bg-slate-50 hover:border-primary hover:border-2 hover:rounded-md hover:scale-105",
        active && "scale-105 border-primary border-2 rounded-md",
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
