import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { Dispatch, SetStateAction } from "react";

interface IHeaderProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Header({ setIsOpen }: IHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-primary p-4">
      <div>
        <h3 className="text-white text-lg font-bold">
          Información del paciente
        </h3>
      </div>

      <div>
        <button type="button" onClick={() => setIsOpen(false)}>
          <Lucide icon="X" color="#fff" size={30} />
        </button>
      </div>
    </div>
  );
}
