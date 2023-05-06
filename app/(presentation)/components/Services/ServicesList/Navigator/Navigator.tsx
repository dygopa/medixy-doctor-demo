import { ServicesRoutesEnum } from "(presentation)/(routes)/servicesRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Link from "next/link";

export default function Navigator() {
    return (
      <div className="w-full flex justify-between items-center">
        <h2 className="mr-5 text-2xl font-bold truncate">Servicios</h2>
        <Link href={ServicesRoutesEnum.ServicesCreate}>
          <Button variant="primary">Nuevo servicio</Button>
        </Link>
      </div>
    );
  }
  