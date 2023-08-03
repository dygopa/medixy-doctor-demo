import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Link from "next/link";

export default function Navigator() {
  return (
    <div className="md:flex justify-between align-middle items-center">
      <div className="relative w-auto">
        <h2 className="mr-5 text-2xl font-bold">Mis Pacientes</h2>
      </div>
      <div className="mb-3">
        <Link href={PatientsRoutesEnum.PatientsCreate}>
          <Button variant="primary" className="w-auto">
            <Lucide icon="Plus" className="mr-2" />
            Nuevo paciente
          </Button>
        </Link>
      </div>
    </div>
  );
}
