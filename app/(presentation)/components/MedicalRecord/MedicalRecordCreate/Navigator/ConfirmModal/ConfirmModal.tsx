import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { Dispatch, SetStateAction } from "react";

interface ConfirmModal {
  setShowConfirmModal: Dispatch<SetStateAction<boolean>>;
  onCreateMedicalRecord: () => void;
}

export default function ConfirmModal({
  setShowConfirmModal,
  onCreateMedicalRecord,
}: ConfirmModal) {
  return (
    <div className="w-full px-4">
      <div className="mb-14">
        <p className="font-bold text-2xl text-slate-900">Finalizar consulta</p>
      </div>

      <div className="flex justify-center text-center mb-6">
        <Lucide icon="Info" color="#216AD9" size={60} />
      </div>

      <div className="flex justify-center text-center mb-14">
        <p className="font-normal text-md text-slate-900">
          Al finalizar la consulta, se generara un resumen de la consulta. Al
          guardar la consulta, la misma no podrá ser modificada a posterior.
          ¿Estás seguro de finalizar la consulta?
        </p>
      </div>

      <div className="lg:flex items-center text-center justify-center">
        <div className="lg:mr-6 lg:mb-0 mb-4">
          <Button
            variant="primary"
            className="w-[275px]"
            onClick={() => {
              onCreateMedicalRecord();
              setShowConfirmModal(false);
            }}
          >
            Finalizar consulta
          </Button>
        </div>

        <div>
          <Button
            variant="outline-primary"
            className="w-[275px]"
            onClick={() => setShowConfirmModal(false)}
          >
            No, gracias
          </Button>
        </div>
      </div>
    </div>
  );
}
