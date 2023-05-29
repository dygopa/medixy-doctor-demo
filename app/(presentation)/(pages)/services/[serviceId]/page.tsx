import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { ServicesRoutesEnum } from "(presentation)/(routes)/servicesRoutes";
import ServicesCreateIndex from "(presentation)/components/Services/ServicesCreate/ServicesCreateIndex";
import ServiceViewIndex from "(presentation)/components/Services/ServicesView/ServiceViewIndex";

export default async function ServicesViewPage() {
  return (
    <AppLayout showStepsBySteps={false} title="Servicio" pathname={ServicesRoutesEnum.ServicesView}>
      <ServiceViewIndex/>
    </AppLayout>
  );
}
