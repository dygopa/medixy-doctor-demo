import { Dispatch, SetStateAction } from "react";
import Formulary from "./Formulary/Formulary";

interface IEditCompanionProps {
  setShowEditCompanion: Dispatch<SetStateAction<boolean>>;
}

export default function EditCompanion({
  setShowEditCompanion,
}: IEditCompanionProps) {
  return (
    <div>
      <div>
        <Formulary setShowEditCompanion={setShowEditCompanion} />
      </div>
    </div>
  );
}
