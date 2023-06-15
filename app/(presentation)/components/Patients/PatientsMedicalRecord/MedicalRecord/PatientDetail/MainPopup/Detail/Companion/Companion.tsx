import { useState } from "react";
import CompanionDetail from "./CompanionDetail/CompanionDetail";
import EditCompanion from "./EditCompanion/EditCompanion";

export default function Companion() {
  const [showEditCompanion, setShowEditCompanion] = useState(false);

  return (
    <div>
      {showEditCompanion ? (
        <EditCompanion setShowEditCompanion={setShowEditCompanion} />
      ) : (
        <CompanionDetail setShowEditCompanion={setShowEditCompanion} />
      )}
    </div>
  );
}
