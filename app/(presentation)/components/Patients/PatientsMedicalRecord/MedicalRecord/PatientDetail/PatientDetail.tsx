import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import AboutPatient from "./AboutPatient/AboutPatient";
import History from "./History/History";
import MainPopup from "./MainPopup/MainPopup";
import Treatments from "./Treatments/Treatments";
import VitalSigns from "./VitalSigns/VitalSigns";

export default function PatientDetails() {
  const { popupActive }: any = useMedicalRecord();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8 intro-y mb-6">
        <AboutPatient />
      </div>

      <div className="col-span-4 intro-y mb-6">
        <VitalSigns />
      </div>

      <div className="col-span-8 intro-y mb-6">
        <History />
      </div>

      <div className="col-span-4 intro-y mb-6">
        <Treatments />
      </div>

      {popupActive && <MainPopup />}
    </div>
  );
}
