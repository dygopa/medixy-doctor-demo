import Diagnosis from "./Diagnosis/Diagnosis";
import Orders from "./Orders/Orders";
import Physical from "./Physical/Physical";
import Reason from "./Reason/Reason";
import Recipes from "./Recipes/Recipes";
import Records from "./Records/Records";
import VitalSigns from "./VitalSigns/VitalSigns";
import Date from "./Date/Date";

export default function Detail() {
  return (
    <div>
      <div className="mb-4">
        <Reason />
      </div>

      <div className="mb-4">
        <Date />
      </div>

      <div className="mb-4">
        <Records />
      </div>

      <div className="mb-4">
        <Diagnosis />
      </div>

      <div className="mb-4">
        <Physical />
      </div>

      <div className="mb-4">
        <VitalSigns />
      </div>

      <div className="mb-4">
        <Recipes />
      </div>

      <div>
        <Orders />
      </div>
    </div>
  );
}
