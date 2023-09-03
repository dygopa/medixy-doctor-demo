import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { ISubject } from "domain/core/entities/subjectEntity";
import { Dispatch, SetStateAction } from "react";
import CompanionsTable from "./Table/Table";

interface ICompanionListProps {
  patientId: number;
  setCompanionEdit: Dispatch<SetStateAction<ISubject | null>>;
  setShowAddCompanion: Dispatch<SetStateAction<boolean>>;
}

export default function CompanionList({
  patientId,
  setCompanionEdit,
  setShowAddCompanion,
}: ICompanionListProps) {
  return (
    <div>
      <div className="flex justify-end">
        <Button variant="primary" onClick={() => setShowAddCompanion(true)}>
          <Lucide icon="Plus" className="mr-2" />
          Nuevo Contacto
        </Button>
      </div>

      <div className="mt-8">
        <CompanionsTable
          patientId={patientId}
          setCompanionEdit={setCompanionEdit}
        />
      </div>
    </div>
  );
}
