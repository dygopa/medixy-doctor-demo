import clsx from "clsx";
import { usePathname, useSearchParams } from "next/navigation";
import NavItem from "./NavItem/NavItem";

export default function Nav() {
  const params = useSearchParams();
  const pathname = usePathname();

  const view = params.get("view");
  const type = params.get("type");

  const getTopLineByView = (): string => {
    switch (view?.toLowerCase()) {
      case "vital-signs":
        return "top-0";
      case "records":
        return "top-16";
      case "current-consultation":
        return "top-32";
      case "diagnosis":
        return "top-52";
      case "orders":
        return "top-64";
      case "recipe":
        return "top-[375px]";

      default:
        return "top-0";
    }
  };

  const getNavIsActive = (viewNav: string): boolean => {
    if (viewNav.toLowerCase() === view?.toLowerCase()) return true;

    return false;
  };

  return (
    <div className="flex">
      <div className="relative h-auto">
        <div
          className={clsx([
            "h-[40px] w-[6px] bg-primary absolute z-50 transition-all",
            getTopLineByView(),
          ])}
        />

        <div className="h-full w-[4px] bg-gray-300 absolute top-0 left-[1px] z-40" />
      </div>

      <div className="ml-8 w-full">
        <div className="py-1">
          <NavItem
            text="Signos vítales"
            href={`${pathname}?view=vital-signs&type=${
              type ?? "medical-record"
            }`}
            isActive={getNavIsActive("vital-signs")}
          />
        </div>

        <div className="py-1">
          <NavItem
            text="Antecedentes"
            href={`${pathname}?view=records&type=${type ?? "medical-record"}`}
            isActive={getNavIsActive("records")}
          />
        </div>

        <div className="w-full">
          <NavItem
            text="Consulta actual"
            href={`${pathname}?view=current-consultation&type=${
              type ?? "medical-record"
            }`}
            subItems={[
              {
                text: "Exploración física",
              },
            ]}
            isActive={getNavIsActive("current-consultation")}
          />
        </div>

        <div className="w-full">
          <NavItem
            text="Diagnóstico"
            href={`${pathname}?view=diagnosis&type=${type ?? "medical-record"}`}
            isActive={getNavIsActive("diagnosis")}
          />
        </div>

        <div className="w-full">
          <NavItem
            text="Ordenes"
            href={`${pathname}?view=orders&type=${type ?? "medical-record"}`}
            subItems={[
              {
                text: "Estudios",
              },
              { text: "Especialidad" },
            ]}
            isActive={getNavIsActive("orders")}
          />
        </div>

        <div className="w-full">
          <NavItem
            text="Receta"
            href={`${pathname}?view=recipe&type=${type ?? "medical-record"}`}
            isActive={getNavIsActive("recipe")}
          />
        </div>
      </div>
    </div>
  );
}