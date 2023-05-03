import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { TreatmentsRoutesEnum } from "(presentation)/(routes)/treatmentsRoutes";
import TreatmentsListIndex from "(presentation)/components/Treatments/TreatmentsList/TreatmentsListIndex";

export default async function LocalitiesPage() {
  return (
    <AppLayout title="Tratamientos" pathname={TreatmentsRoutesEnum.Treatments}>
      <TreatmentsListIndex/>
    </AppLayout>
  );
}
