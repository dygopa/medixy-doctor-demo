import { IUser } from "domain/core/entities/userEntity";
import Button from "(presentation)/components/core/BaseComponents/Button";

export default function ExportToExcel() {
  return (
    <Button variant="primary" className="w-full mb-3">
      Descargar excel
    </Button>
  );
}
