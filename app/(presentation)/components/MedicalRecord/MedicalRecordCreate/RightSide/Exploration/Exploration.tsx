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
        </div>
      </div>

      <div className="w-full lg:flex md:flex justify-end mt-14">
        <div className="lg:mr-2 md:mr-2 mr-0 lg:mb-0 md:mb-0 mb-4">
          <Button
            variant="outline-primary"
            className="h-[43px] lg:w-[150px] md:w-[150px] w-full"
            onClick={() => {
              router.replace(
                `${pathname}?view=current-consultation&type=${
                  type ?? "medical-record"
                }`
              );
            }}
          >
            Volver
          </Button>
        </div>

        <div>
          <Button
            variant="primary"
            className="lg:w-[250px] md:w-[250px] w-full"
            onClick={() => {
              router.replace(
                `${pathname}?view=diagnosis&type=${type ?? "medical-record"}`
              );
            }}
          >
            <div className="flex items-center">
              <div className="mr-2">Diagnóstico</div>

              <div>
                <Lucide icon="arrow-right" color="#fff" size={25} />
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
