import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import ConfigurationIndex from "(presentation)/components/Configuration/ConfigurationIndex";

export default async function LocalitiesPage() {
  return (
    <AppLayout title="Configuración" pathname={"/settings"}>
      <ConfigurationIndex/>
    </AppLayout>
  );
}