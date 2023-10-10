import { IUser } from "domain/core/entities/userEntity";
import EditPatient from "./EditPatient/EditPatient";

interface IPatientProps {
  subjectId: number;
}

export default function Patient({ subjectId }: IPatientProps) {
  return (
    <div>
      <EditPatient subjectId={subjectId} />
    </div>
  );
}
