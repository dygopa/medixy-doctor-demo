import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import LocalityCreateIndex from "(presentation)/components/Localities/LocalitiesCreate/LocalityCreateIndex";
import LocalityUpdateIndex from "(presentation)/components/Localities/LocalitiesUpdate/LocalityUpdateIndex";

export default async function LocalityCreatePage() {
  return (
    <AppLayout title="Actualizar consultorio" pathname={LocalitiesRoutesEnum.LocalitiesView}>
      <LocalityUpdateIndex/>
    </AppLayout>
  );
}
