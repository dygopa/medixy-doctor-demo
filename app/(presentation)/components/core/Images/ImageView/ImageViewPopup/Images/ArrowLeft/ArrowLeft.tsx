import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { Dispatch, SetStateAction } from "react";

interface IArrowLeftProps {
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

export default function ArrowLeft({
  activeIndex,
  setActiveIndex,
}: IArrowLeftProps) {
  return (
    <div className="flex items-center h-full">
      <button
        onClick={() => setActiveIndex(activeIndex - 1)}
        disabled={activeIndex === 0}
      >
        <Lucide
          icon="ChevronLeft"
          color={activeIndex === 0 ? "#A8A8A8" : "#fff"}
          size={60}
        />
      </button>
    </div>
  );
}
