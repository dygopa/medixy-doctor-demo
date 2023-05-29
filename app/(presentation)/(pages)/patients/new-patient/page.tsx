import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import PatientsCreateIndex from "(presentation)/components/Patients/PatientsCreate/PatientsCreateIndex";

export default async function RegisterPatientPage() {
  return (
    <AppLayout showStepsBySteps={false} title="Nuevo paciente" pathname={PatientsRoutesEnum.PatientsCreate}>
      <PatientsCreateIndex/>
    </AppLayout>
  );
}
