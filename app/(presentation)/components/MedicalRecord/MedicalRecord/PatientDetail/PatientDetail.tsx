import { IGetAppointmentResponse } from "domain/core/response/appointmentsResponse";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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
  subjectId: number;
  appointment: IGetAppointmentResponse;
}

export default function PatientDetails({
  subjectId,
  appointment,
}: IPatientDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [popupSectionActive, setPopupSectionActive] = useState(0);

  const searchParams = useSearchParams();
  const viewMedicalRecord = searchParams.get("view_medical_record");
  const viewEditSubject = searchParams.get("view_edit_subject");
  const viewCompanion = searchParams.get("view_companion");

  useEffect(() => {
    if (viewMedicalRecord === "true") {
      setPopupSectionActive(2);
      setIsOpen(true);
    }

    if (viewEditSubject === "true") {
      setPopupSectionActive(0);
      setIsOpen(true);
    }

    if (viewCompanion === "true") {
      setPopupSectionActive(1);
      setIsOpen(true);
    }
  }, [viewMedicalRecord, viewEditSubject, viewCompanion]);

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

      {isOpen && (
        <MedicalRecordProvider>
          <MainPopup
            subjectId={subjectId}
            appointment={appointment.data}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            popupSectionActive={popupSectionActive}
            setPopupSectionActive={setPopupSectionActive}
          />
        </MedicalRecordProvider>
      )}
    </>
  );
}
