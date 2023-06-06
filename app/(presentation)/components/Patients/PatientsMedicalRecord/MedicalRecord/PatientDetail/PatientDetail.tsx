import AboutPatient from "./AboutPatient/AboutPatient";
import Allergies from "./Allergies/Allergies";
import History from "./History/History";
import MainPopup from "./MainPopup/MainPopup";
// import MainPopup from "./MainPopup/MainPopup";
import Orders from "./Orders/Orders";
import Record from "./Record/Record";
import Treatments from "./Treatments/Treatments";
import VitalSigns from "./VitalSigns/VitalSigns";

export default function PatientDetails() {
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="xl:col-span-7 col-span-12 intro-y mb-6">
          <AboutPatient />
        </div>

        <div className="xl:col-span-2 lg:col-span-6 md:col-span-6 col-span-12 intro-y mb-6">
          <Allergies />
        </div>

        <div className="xl:col-span-3 lg:col-span-6 md:col-span-6 col-span-12 intro-y mb-6">
          <VitalSigns />
        </div>

        <div className="xl:col-span-7 col-span-12 intro-y mb-6">
          <History />
        </div>

        <div className="xl:col-span-5 col-span-12 intro-y mb-6">
          <Orders />
        </div>

        <div className="xl:col-span-7 col-span-12 intro-y mb-6">
          <Treatments />
        </div>

        <div className="xl:col-span-5 col-span-12 intro-y mb-6">
          <Record />
        </div>
      </div>

      {/*<MainPopup />*/}
    </>
  );
}
