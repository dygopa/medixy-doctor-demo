import { AdminMedicalCentersRoutesEnum } from "(presentation)/(routes)/admin/medicalCentersRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Link from "next/link";

export default function Navigator() {
  return (
    <div className="md:flex justify-between align-middle items-center">
      <div className="relative w-auto">
        <h2 className="mr-5 text-2xl font-bold">Centros médicos</h2>
      </div>
      <div className="mb-3 mt-2 md:mt-0">
        <Link href={AdminMedicalCentersRoutesEnum.MedicalCentersCreate}>
          <Button variant="primary" className="md:w-auto w-full">
            <Lucide icon="plus" color="#fff" className="mr-2" />
            Nuevo centro médico
          </Button>
        </Link>
      </div>
    </div>
  );
}
