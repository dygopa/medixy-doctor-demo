import clsx from "clsx";
import { useSearchParams } from "next/navigation";
import NavItem from "./NavItem/NavItem";

export default function Nav() {
  const params = useSearchParams();

  const view = params.get("view");

  const getTitleStep = () => {
    switch (view) {
      case "exploration":
        return "Exploración";
      case "current-consultation":
        return "Consulta actual";
      case "diagnosis":
        return "Diagnóstico";
      case "orders":
        return "Ordenes";
      case "recipe":
        return "Receta";
      case "images":
        return "Imagenes";

      default:
        return "Consulta actual";
    }
  };

  return (
    <div className="flex">
      <div className="relative h-auto">
        <div
          className={clsx([
            "h-[40px] w-[6px] bg-primary absolute z-50 transition-all top-0",
          ])}
        />

        <div className="h-full w-[4px] bg-gray-300 absolute top-0 left-[1px] z-40" />
      </div>

      <div className="ml-8 w-full mt-2">
        <div className="mb-3">
          <h1 className="text-lg font-bold">{getTitleStep()}</h1>
        </div>

        <div>
          <NavItem
            text="Consulta actual"
            isActive={!view || view === "current-consultation"}
            isCompleted={
              view === "exploration" ||
              view === "diagnosis" ||
              view === "orders" ||
              view === "recipe" ||
              view === "images"
            }
          />
        </div>

        <div>
          <NavItem
            text="Exploración física"
            isActive={view === "exploration"}
            isCompleted={
              view === "diagnosis" ||
              view === "orders" ||
              view === "recipe" ||
              view === "images"
            }
            subStep
          />
        </div>

        <div>
          <NavItem
            text="Signos vítales"
            isActive={view === "exploration"}
            isCompleted={
              view === "diagnosis" ||
              view === "orders" ||
              view === "recipe" ||
              view === "images"
            }
            subStep
          />
        </div>

        <div>
          <NavItem
            text="Ordenes"
            isActive={view === "diagnosis" || view === "orders"}
            isCompleted={view === "recipe" || view === "images"}
          />
        </div>

        <div>
          <NavItem
            text="Diagnósticos"
            isActive={view === "diagnosis"}
            isCompleted={
              view === "orders" || view === "recipe" || view === "images"
            }
            subStep
          />
        </div>

        <div>
          <NavItem
            text="Estudios y especialidad"
            isActive={view === "orders"}
            isCompleted={view === "recipe" || view === "images"}
            subStep
          />
        </div>

        <div>
          <NavItem
            text="Receta"
            isActive={view === "recipe"}
            isCompleted={view === "images"}
          />
        </div>

        <div>
          <NavItem text="Imágenes" isActive={view === "images"} finalStep />
        </div>
      </div>
    </div>
  );
}
