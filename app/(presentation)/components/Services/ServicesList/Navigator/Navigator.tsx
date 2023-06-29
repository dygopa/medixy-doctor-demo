import { ServicesRoutesEnum } from "(presentation)/(routes)/servicesRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Link from "next/link";

export default function Navigator() {
  return (
    <div className="w-full md:flex justify-between items-center">
      <h2 className="lg:mr-5 lg:mb-0 mb-4 text-2xl font-bold truncate">
        Servicios
      </h2>
      <Link href={ServicesRoutesEnum.ServicesCreate}>
        <Button variant="primary" className="w-full md:w-auto">Nuevo servicio</Button>
      </Link>
    </div>
  );
}
