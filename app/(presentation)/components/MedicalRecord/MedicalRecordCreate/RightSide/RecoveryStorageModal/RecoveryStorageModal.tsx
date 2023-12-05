import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { Dispatch, SetStateAction } from "react";

interface IRecoveryStorageModal {
  setShowRecoveryStorageModal: Dispatch<SetStateAction<boolean>>;
  setValuesLocalStorage: () => void;
}

export default function RecoveryStorageModal({
  setShowRecoveryStorageModal,
  setValuesLocalStorage,
}: IRecoveryStorageModal) {
  return (
    <div className="w-full px-4">
      <div className="mb-14">
        <p className="font-bold text-2xl text-slate-900">
          Recuperar información
        </p>
      </div>

      <div className="flex justify-center text-center mb-6">
        <Lucide icon="information-outline" color="#216AD9" size={60} />
      </div>

      <div className="flex justify-center text-center mb-14">
        <p className="font-normal text-md text-slate-900">
          Hemos detectado información guardada en esta consulta médica
          anteriormente. ¿Deseas recuperarla?
        </p>
      </div>

      <div className="lg:flex items-center text-center justify-center">
        <div className="lg:mr-6 lg:mb-0 mb-4">
          <Button
            variant="primary"
            className="w-[275px]"
            onClick={() => setShowRecoveryStorageModal(false)}
          >
            Recuperar información
          </Button>
        </div>

        <div>
          <Button
            variant="outline-primary"
            className="w-[275px]"
            onClick={() => {
              setValuesLocalStorage();
              setShowRecoveryStorageModal(false);
            }}
          >
            No, gracias
          </Button>
        </div>
      </div>
    </div>
  );
}
