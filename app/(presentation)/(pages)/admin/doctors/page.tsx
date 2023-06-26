import AdminAppLayout from "(presentation)/(layouts)/AdminAppLayout/AdminAppLayout";
import { AdminDoctorsRoutesEnum } from "(presentation)/(routes)/admin/doctorsRoutes";
import DoctorsListIndex from "(presentation)/components/Admin/Doctors/DoctorsList/DoctorsListIndex";

export default async function DoctorsListPage() {
  return (
    <AdminAppLayout
      title="Doctores"
      pathname={AdminDoctorsRoutesEnum.DoctorsView}
    >
      <DoctorsListIndex />
    </AdminAppLayout>
  );
}
