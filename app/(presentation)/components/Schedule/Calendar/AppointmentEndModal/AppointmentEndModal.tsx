import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { Dispatch, SetStateAction } from "react";

interface AppointmentEndModalProps {
  setShowAppointmentEndModal: Dispatch<SetStateAction<boolean>>;
}

export default function AppointmentEndModal({
  setShowAppointmentEndModal,
}: AppointmentEndModalProps) {
  return (
    <div className="w-full px-4">
      <div className="mb-14">
        <p className="font-bold text-2xl text-slate-900">Cupo vencido</p>
      </div>

      <div className="mb-5 text-center">
        <div className="flex justify-center text-center mb-6">
          <Lucide icon="Info" color="#216AD9" size={60} />
        </div>

        <p className="font-normal">
          Este cupo ya se encuentra vencido actualmente y no puede ser reservado
          para almacenar una cita.
        </p>
      </div>

      <div className="lg:flex items-center text-center justify-center">
        <div className="lg:mr-6 lg:mb-0 mb-4">
          <Button
            variant="primary"
            className="w-[275px]"
            onClick={() => setShowAppointmentEndModal(false)}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
