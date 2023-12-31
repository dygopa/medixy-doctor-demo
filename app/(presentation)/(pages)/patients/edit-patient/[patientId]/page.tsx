import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import PatientsEditIndex from "(presentation)/components/Patients/PatientsEdit/PatientsEditIndex";
import { IUser } from "domain/core/entities/userEntity";
import Providers from "./providers";

export default async function EditPatientPage({
  params,
}: {
  params: { patientId: string };
}) {
  return (
    <AppLayout
      user={{} as IUser}
      title="Informacion del Paciente"
      pathname={PatientsRoutesEnum.PatientsEdit}
      showStepsBySteps={false}
    >
      <Providers>
        <PatientsEditIndex patientId={parseInt(params.patientId, 10)} />
      </Providers>
    </AppLayout>
  );
}
