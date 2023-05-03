import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { ServicesRoutesEnum } from "(presentation)/(routes)/servicesRoutes";
import ServicesListIndex from "(presentation)/components/Services/ServicesList/ServicesListIndex";

export default async function ServicesPage() {
  return (
    <AppLayout title="Servicios" pathname={ServicesRoutesEnum.Services}>
      <ServicesListIndex/>
    </AppLayout>
  );
}
