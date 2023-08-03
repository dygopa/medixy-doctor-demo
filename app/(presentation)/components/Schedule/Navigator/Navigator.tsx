import { ScheduleRoutesEnum } from "(presentation)/(routes)/scheduleRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormSelect } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Link from "next/link";

export default function Navigator() {
    return (
      <div className="w-full flex justify-between items-end gap-5">
        <div className="w-full lg:w-2/4 relative flex flex-col justify-between items-start gap-2">
          <h2 className="mr-5 text-2xl font-bold truncate">Mis Agendas</h2>
          <p>Mantén un seguimiento de tus citas médicos y asegúrate de estar preparado para cada consulta</p>
        </div> 
      </div>
    );
  }
  