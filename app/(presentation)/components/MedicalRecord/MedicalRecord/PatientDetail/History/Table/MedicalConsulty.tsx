import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import clsx from "clsx";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../../context/MedicalRecordContext";

interface IMedicalConsultyProps {
  medicalConsulty: IMedicalConsulty;
}

export default function MedicalConsulty({
  medicalConsulty,
}: IMedicalConsultyProps) {
  const { state } = useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { data: subject } = state.subject;
  const { data: appointment } = state.appointment;

  const router = useRouter();

  const getRedirectMedicalRecord = () => {
    if (appointment.data?.id) {
      return (
        MedicalRecordRoutesEnum.MedicalRecord +
        appointment.data.id +
        `?type=appointment&view_medical_record=true&medical_record_id=${medicalConsulty.id}`
      );
    }

    return (
      MedicalRecordRoutesEnum.MedicalRecord +
      subject?.subjectId +
      `?view_medical_record=true&medical_record_id=${medicalConsulty.id}`
    );
  };

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      key={medicalConsulty.id}
      className="intro-x cursor-pointer lg:flex md:flex sm:flex justify-between rounded-md items-center p-4 bg-white hover:bg-primary shadow-[20px_3px_20px_#0000000b] "
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => router.push(getRedirectMedicalRecord())}
    >
      <div className="flex items-center overflow-y-hidden">
        <div className="lg:block md:block hidden lg:mr-10 md:mr-10 mr-0">
          <p
            className={clsx([
              " lg:text-md",
              isHover ? "text-white" : "text-slate-900",
            ])}
          >
            {moment(medicalConsulty.consultationDate).format("YYYY/MM/DD")}
          </p>
        </div>

        {medicalConsulty.diagnose && medicalConsulty.diagnose?.length > 0 && (
          <div>
            <div>
              <p className={clsx([isHover ? "text-white" : "text-slate-500"])}>
                Diagnóstico
              </p>
            </div>

            <div>
              <p
                className={clsx([
                  "lg:text-md",
                  isHover ? "text-white" : "text-slate-900",
                ])}
                style={{
                  display: "block",
                  textOverflow: "ellipsis",
                  wordWrap: "break-word",
                  overflow: "hidden",
                  maxHeight: "3.6rem",
                  maxWidth: "450px",
                }}
              >
                {medicalConsulty.diagnose[0].description}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="lg:mt-0 md:mt-0 sm:mt-0 mt-4 lg:block md:block hidden">
        <div>
          <div>
            <p className={clsx([isHover ? "text-white" : "text-slate-500"])}>
              Servicio de atención
            </p>
          </div>

          <div>
            <p
              className={clsx([
                "lg:text-md",
                isHover ? "text-white" : "text-slate-900",
              ])}
            >
              Consulta externa general
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
