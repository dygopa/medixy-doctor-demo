import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import PatientsEditIndex from "(presentation)/components/Patients/PatientsEdit/PatientsEditIndex";
import Providers from "./providers";

export default async function EditPatientPage({
  params,
}: {
  params: { patientId: string };
}) {
  return (
    <AppLayout
      title="Informacion del paciente"
      pathname={PatientsRoutesEnum.PatientsEdit}
    >
      <Providers>
        <PatientsEditIndex patientId={parseInt(params.patientId, 10)} />
      </Providers>
    </AppLayout>
  );
}
