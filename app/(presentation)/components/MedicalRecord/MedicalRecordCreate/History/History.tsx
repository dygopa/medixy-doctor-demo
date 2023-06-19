import Button from "(presentation)/components/core/BaseComponents/Button";
import { Dispatch, SetStateAction } from "react";

interface IHistoryProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setPopupSectionActive: Dispatch<SetStateAction<number>>;
}

export default function History({
  setIsOpen,
  setPopupSectionActive,
}: IHistoryProps) {
  return (
    <div className="fixed right-10 bottom-4 z-50">
      <Button
        variant="primary"
        onClick={() => {
          setPopupSectionActive(2);
          setIsOpen(true);
        }}
      >
        Historial de consultas
      </Button>
    </div>
  );
}
