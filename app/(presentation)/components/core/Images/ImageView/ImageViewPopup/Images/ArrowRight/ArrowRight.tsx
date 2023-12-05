import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IImage } from "domain/core/entities/imageEntity";
import { Dispatch, SetStateAction } from "react";

interface IArrowRightProps {
  images: IImage[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

export default function ArrowRight({
  images,
  activeIndex,
  setActiveIndex,
}: IArrowRightProps) {
  const onNextImage = () => {
    const imagesLength = images.length;

    if (imagesLength === 0) return;

    if (imagesLength > 0 && activeIndex + 1 < imagesLength) {
      setActiveIndex(activeIndex + 1);
      return;
    }

    setActiveIndex(0);
  };

  return (
    <div className="flex items-center h-full">
      <button onClick={() => onNextImage()}>
        <Lucide icon="arrow-right" color="#fff" size={60} />
      </button>
    </div>
  );
}
