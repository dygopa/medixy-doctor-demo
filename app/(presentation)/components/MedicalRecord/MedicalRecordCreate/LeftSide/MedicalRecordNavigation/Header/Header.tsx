import { useContext } from "react";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../../../context/MedicalRecordCreateContext";

export default function Header() {
  const { state } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { data: appointment } = state.appointment;

  return (
    <div className="w-full">
      <div className="lg:flex items-center justify-between">
        <div>
          <div className="mb-3">
            <div className="mr-4">
              <p className="text-slate-500 text-md">Consultorio</p>
            </div>

            <div>
              <p className="text-slate-900 font-bold text-md">
                {appointment?.data && appointment.data.service.location
                  ? appointment.data.service.location.name
                  : ""}
              </p>
            </div>
          </div>

          <div className="mb-2">
            <h2 className="font-bold text-2xl truncate">Consulta actual</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
