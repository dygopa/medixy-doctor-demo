import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { DoctorsRoutesEnum } from "(presentation)/(routes)/admin/doctorsRoutes";
import DoctorsListIndex from "(presentation)/components/Admin/Doctors/DoctorsList/DoctorsListIndex";

export default async function DoctorsListPage() {
  return (
    <AppLayout title="Doctores" pathname={DoctorsRoutesEnum.DoctorsView}>
      <DoctorsListIndex />
    </AppLayout>
  );
}
