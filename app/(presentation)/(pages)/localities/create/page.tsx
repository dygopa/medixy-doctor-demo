import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import LocalityCreateIndex from "(presentation)/components/Localities/LocalitiesCreate/LocalityCreateIndex";

export default async function LocalityCreatePage() {
  return (
    <AppLayout showStepsBySteps={false} title="Nuevo Consultorio" pathname={LocalitiesRoutesEnum.LocalitiesCreate}>
      <LocalityCreateIndex/>
    </AppLayout>
  );
}
