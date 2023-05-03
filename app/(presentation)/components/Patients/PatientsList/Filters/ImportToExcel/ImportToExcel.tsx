/* eslint-disable react-hooks/exhaustive-deps */
import { IUser } from "domain/core/entities/userEntity";
import Button from "(presentation)/components/core/BaseComponents/Button";

export default function ImportToExcel() {
  return (
    <Button variant="outline-primary" className="w-full mb-3">
      Importar citas
    </Button>
  );
}
