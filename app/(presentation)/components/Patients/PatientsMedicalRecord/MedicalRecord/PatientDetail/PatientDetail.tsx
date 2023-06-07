import { useState } from "react";
import MedicalRecordProvider from "../context/MedicalRecordContext";
import AboutPatient from "./AboutPatient/AboutPatient";
import Allergies from "./Allergies/Allergies";
import History from "./History/History";
import MainPopup from "./MainPopup/MainPopup";
import Orders from "./Orders/Orders";
import Record from "./Record/Record";
import Treatments from "./Treatments/Treatments";
import VitalSigns from "./VitalSigns/VitalSigns";

interface IPatientDetailsProps {
  patientId: number;
}

export default function PatientDetails({ patientId }: IPatientDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [popupSectionActive, setPopupSectionActive] = useState(0);

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="xl:col-span-7 col-span-12 intro-y mb-6">
          <AboutPatient />
        </div>

        <div className="xl:col-span-2 lg:col-span-6 md:col-span-6 col-span-12 intro-y mb-6">
          <Allergies
            setIsOpen={setIsOpen}
            setPopupSectionActive={setPopupSectionActive}
          />
        </div>

        <div className="xl:col-span-3 lg:col-span-6 md:col-span-6 col-span-12 intro-y mb-6">
          <VitalSigns
            setIsOpen={setIsOpen}
            setPopupSectionActive={setPopupSectionActive}
          />
        </div>

        <div className="xl:col-span-7 col-span-12 intro-y mb-6">
          <History
            setIsOpen={setIsOpen}
            setPopupSectionActive={setPopupSectionActive}
          />
        </div>

        <div className="xl:col-span-5 col-span-12 intro-y mb-6">
          <Orders />
        </div>

        <div className="xl:col-span-7 col-span-12 intro-y mb-6">
          <Treatments
            setIsOpen={setIsOpen}
            setPopupSectionActive={setPopupSectionActive}
          />
        </div>

        <div className="xl:col-span-5 col-span-12 intro-y mb-6">
          <Record
            setIsOpen={setIsOpen}
            setPopupSectionActive={setPopupSectionActive}
          />
        </div>
      </div>

      <MedicalRecordProvider>
        <MainPopup
          patientId={patientId}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          popupSectionActive={popupSectionActive}
          setPopupSectionActive={setPopupSectionActive}
        />
      </MedicalRecordProvider>
    </>
  );
}
