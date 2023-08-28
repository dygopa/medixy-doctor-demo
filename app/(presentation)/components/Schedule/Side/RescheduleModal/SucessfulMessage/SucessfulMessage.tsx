import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

interface ISucessfulMessageProps {
  setShowRescheduleModal: Function;
}

export default function SucessfulMessage({
  setShowRescheduleModal,
}: ISucessfulMessageProps) {
  return (
    <div className="w-full px-4">
      <div className="mb-8">
        <p className="font-bold text-2xl text-slate-900">Cita reagendada</p>
      </div>

      <div className="mb-5 text-center">
        <div className="flex justify-center text-center mb-6">
          <Lucide icon="CheckCircle" color="#216AD9" size={70} />
        </div>

        <p className="font-normal">
          La cita se ha reagendado exitosamente en tu agenda, el paciente en
          este momento recibió un email notificando el cambio de fecha y hora de
          la cita.
        </p>
      </div>

      <div className="lg:flex items-center text-center justify-center mt-14">
        <div className="lg:mr-6 lg:mb-0 mb-4">
          <Button
            variant="primary"
            className="w-[275px]"
            onClick={() => setShowRescheduleModal(false)}
          >
            Regresar
          </Button>
        </div>
      </div>
    </div>
  );
}
