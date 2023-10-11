import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { IUser } from "domain/core/entities/userEntity";
import { Dispatch, SetStateAction } from "react";
import Diagnosis from "./Diagnosis/Diagnosis";
import Orders from "./Orders/Orders";
import Physical from "./Physical/Physical";
import Reason from "./Reason/Reason";
import Recipes from "./Recipes/Recipes";
import Records from "./Records/Records";
import Title from "./Title/Title";
import VitalSigns from "./VitalSigns/VitalSigns";

interface IDetailProps {
  user: IUser;
  medicalConsulty: IMedicalConsulty;
  setMedicalConsulty: Dispatch<SetStateAction<IMedicalConsulty | null>>;
  appointmentId: string | null;
}

export default function Detail({
  user,
  medicalConsulty,
  setMedicalConsulty,
  appointmentId,
}: IDetailProps) {
  return (
    <div>
      <div className="mb-4 border-b">
        <Title
          user={user}
          medicalConsulty={medicalConsulty}
          setMedicalConsulty={setMedicalConsulty}
          appointmentId={appointmentId}
        />
      </div>

      <div className="mb-4">
        <Reason medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Diagnosis medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Records medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Physical medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <VitalSigns medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Recipes user={user} medicalConsulty={medicalConsulty} />
      </div>

      <div>
        <Orders user={user} medicalConsulty={medicalConsulty} />
      </div>
    </div>
  );
}
