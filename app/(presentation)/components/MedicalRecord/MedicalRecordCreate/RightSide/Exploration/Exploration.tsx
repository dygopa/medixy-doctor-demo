import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PhysicalExploration from "./PhysicalExploration/PhysicalExploration";
import VitalSigns from "./VitalSigns/VitalSigns";

export default function Exploration() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const type = searchParams.get("type");

  return (
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
              <p className="font-bold text-lg text-slate-900">Exploración</p>
            </div>
          </div>
        </button>

        <form>
          <div className="py-4">
            <VitalSigns />
          </div>

          <div className="py-4">
            <PhysicalExploration />
          </div>
        </form>

        <div className="w-full flex justify-end">
          <Button
            variant="primary"
            onClick={() => {
              router.replace(
                `${pathname}?view=current-consultation&type=${
                  type ?? "medical-record"
                }`
              );
            }}
          >
            <div className="flex items-center">
              <div className="mr-2">Consulta actual</div>

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
