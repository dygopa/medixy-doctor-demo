import { useSearchParams } from "next/navigation";
import Step from "./Step/Step";

export default function StepsMobile() {
  const params = useSearchParams();

  const view = params.get("view");

  return (
    <div className="flex w-full">
      <div>
        <Step
          index={1}
          text="Consulta actual"
          isActive={
            !view || view === "current-consultation" || view === "exploration"
          }
          isCompleted={
            view === "diagnosis" ||
            view === "orders" ||
            view === "recipe" ||
            view === "images"
          }
        />
      </div>

      <div>
        <Step
          index={2}
          text="Diagnósticos"
          isActive={view === "diagnosis"}
          isCompleted={
            view === "orders" || view === "recipe" || view === "images"
          }
        />
      </div>

      <div>
        <Step
          index={3}
          text="Ordenes"
          isActive={view === "orders"}
          isCompleted={view === "recipe" || view === "images"}
        />
      </div>

      <div>
        <Step
          index={4}
          text="Receta"
          isActive={view === "recipe"}
          isCompleted={view === "images"}
        />
      </div>

      <div>
        <Step
          index={5}
          text="Imágenes"
          isActive={view === "images"}
          finalStep
        />
      </div>
    </div>
  );
}
