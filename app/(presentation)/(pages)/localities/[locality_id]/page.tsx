import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import LocalityCreateIndex from "(presentation)/components/Localities/LocalitiesCreate/LocalityCreateIndex";
import LocalityUpdateIndex from "(presentation)/components/Localities/LocalitiesUpdate/LocalityUpdateIndex";

export default async function LocalityCreatePage({params}:{params:{locality_id:string}}) {
  console.log(params);
  return (
    <AppLayout showStepsBySteps={false} title="Actualizar Consultorio" pathname={LocalitiesRoutesEnum.LocalitiesView}>
      <LocalityUpdateIndex localityId={parseInt(params.locality_id.toString())}/>
    </AppLayout>
  );
}
