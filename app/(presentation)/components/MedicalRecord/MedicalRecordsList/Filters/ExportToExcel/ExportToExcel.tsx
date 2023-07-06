/* eslint-disable react-hooks/exhaustive-deps */
import { IUser } from "domain/core/entities/userEntity";
import Button from "(presentation)/components/core/BaseComponents/Button";

interface IExportToExcelProps {
  user: IUser;
}

export default function ExportToExcel() {
  return (
    <Button variant="outline-primary" className="w-full mb-3">
      Descargar excel
    </Button>
  );
}
