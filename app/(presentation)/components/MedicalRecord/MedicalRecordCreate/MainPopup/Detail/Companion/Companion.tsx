import { ISubject } from "domain/core/entities/subjectEntity";
import { useState } from "react";
import AddCompanion from "./AddCompanion/AddCompanion";
import CompanionList from "./CompanionList/CompanionList";
import EditCompanion from "./EditCompanion/EditCompanion";

interface ICompanionProps {
  subjectId: number;
}

export default function Companion({ subjectId }: ICompanionProps) {
  const [showAddCompanion, setShowAddCompanion] = useState(false);
  const [showEditCompanion, setShowEditCompanion] = useState<ISubject | null>(
    null
  );

  const getComponentByState = () => {
    if (showAddCompanion) {
      return (
        <AddCompanion
          patientId={subjectId}
          setShowAddCompanion={setShowAddCompanion}
        />
      );
    }

    if (showEditCompanion) {
      return (
        <EditCompanion
          patientId={subjectId}
          companion={showEditCompanion}
          setShowEditCompanion={setShowEditCompanion}
        />
      );
    }

    return (
      <CompanionList
        patientId={subjectId}
        setCompanionEdit={setShowEditCompanion}
        setShowAddCompanion={setShowAddCompanion}
      />
    );
  };

  return <div>{getComponentByState()}</div>;
}
