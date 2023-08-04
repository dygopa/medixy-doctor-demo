import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { ServicesRoutesEnum } from "(presentation)/(routes)/servicesRoutes";
import ServicesCreateIndex from "(presentation)/components/Services/ServicesCreate/ServicesCreateIndex";

export default async function ServicesCreatePage() {
  return (
    <AppLayout showStepsBySteps={false} title="Crear Servicio" pathname={ServicesRoutesEnum.ServicesCreate}>
      <ServicesCreateIndex/>
    </AppLayout>
  );
}
