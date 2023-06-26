import AppLayout from "(presentation)/(layouts)/AppLayout/AppLayout";
import { DoctorsRoutesEnum } from "(presentation)/(routes)/admin/doctorsRoutes";
import DoctorViewIndex from "(presentation)/components/Admin/Doctors/DoctorsView/DoctorsViewIndex";
import Providers from "./providers";

export default async function DoctorViewPage({
  params,
}: {
  params: { doctorId: string };
}) {
  console.log(params)
  return (
    <AppLayout
      title="Informacion del doctor"
      pathname={DoctorsRoutesEnum.DoctorsView}
      showStepsBySteps={false}
    >
      <Providers>
        <DoctorViewIndex doctorId={parseInt(params.doctorId, 10)} />
      </Providers>
    </AppLayout>
  );
}
