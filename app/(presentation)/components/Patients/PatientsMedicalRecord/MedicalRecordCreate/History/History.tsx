import useMedicalRecordCreate from "(presentation)/(hooks)/useMedicalRecordCreate";
import Button from "(presentation)/components/core/BaseComponents/Button";

export default function History() {
  const { setIsOpen } = useMedicalRecordCreate();

  return (
    <div className="fixed right-10 bottom-4 z-50">
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        Historial de consultas
      </Button>
    </div>
  );
}
