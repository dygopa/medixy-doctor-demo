import AdminAppLayout from "(presentation)/(layouts)/AdminAppLayout/AdminAppLayout";
import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { AdminDoctorsRoutesEnum } from "(presentation)/(routes)/admin/doctorsRoutes";
import DoctorViewIndex from "(presentation)/components/Admin/Doctors/DoctorsView/DoctorsViewIndex";
import Providers from "./providers";

export default async function DoctorViewPage({
  params,
}: {
  params: { doctorId: string };
}) {
  return (
    <AdminAppLayout
      title="Informacion del doctor"
      pathname={AdminDoctorsRoutesEnum.DoctorsView}
    >
      <Providers>
        <DoctorViewIndex doctorId={parseInt(params.doctorId, 10)} />
      </Providers>
    </AdminAppLayout>
  );
}
