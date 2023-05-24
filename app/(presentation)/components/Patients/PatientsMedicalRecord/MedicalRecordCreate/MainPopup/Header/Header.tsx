import useMedicalRecordCreate from "(presentation)/(hooks)/useMedicalRecordCreate";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";

export default function Header() {
  const { setIsOpen } = useMedicalRecordCreate();

  return (
    <div className="flex items-center justify-between bg-primary p-4">
      <div>
        <h3 className="text-white text-lg font-bold">Historial de consultas</h3>
      </div>

      <div>
        <button type="button" onClick={() => setIsOpen(false)}>
          <Lucide icon="X" color="#fff" size={30} />
        </button>
      </div>
    </div>
  );
}
