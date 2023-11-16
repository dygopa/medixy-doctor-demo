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
    <div className="w-[80%] sm:w-[40%] h-fit overflow-y-auto flex flex-col justify-between items-center bg-white rounded-md p-6 gap-10">
      
      <div className="w-full text-left flex justify-start items-center">
        <p className="font-bold text-2xl text-slate-900">Finalizar consulta</p>
      </div>

      <div className="w-full h-fit flex flex-col justify-center items-center gap-2 text-center">
        <Lucide icon="Info" color="#216AD9" size={60} />
        <p className="font-normal text-md text-slate-900">
          Al finalizar la consulta, se generara un resumen de la consulta. Al
          guardar la consulta, la misma no podrá ser modificada a posterior.
          <br/>
          <b>¿Estás seguro de finalizar la consulta?</b>
        </p>
      </div>


      <div className="w-full flex lg:flex-row flex-col items-center text-center justify-center gap-4">
        <Button
          className="lg:w-fit w-full"
          variant="outline-primary"
          onClick={() => setShowConfirmModal(false)}
        >
          No, gracias
        </Button>
        <Button
          className="lg:w-fit w-full"
          variant="primary"
          onClick={() => {
            onCreateMedicalRecord();
            setShowConfirmModal(false);
          }}
        >
          Finalizar consulta
        </Button>
      </div>

    </div>
  );
}
