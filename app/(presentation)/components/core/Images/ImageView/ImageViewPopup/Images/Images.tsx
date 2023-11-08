import { IImage } from "domain/core/entities/imageEntity";
import { Dispatch, SetStateAction } from "react";
import ArrowLeft from "./ArrowLeft/ArrowLeft";
import ArrowRight from "./ArrowRight/ArrowRight";
import ImageView from "./ImageView/ImageView";

interface IImagesProps {
  images: IImage[];
  activeIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
}

export default function Images({
  images,
  activeIndex,
  setActiveIndex,
}: IImagesProps) {
  return (
    <div className="h-full w-full relative">
      <div className="z-[99] absolute top-0 bottom-0 left-0 px-4">
        <ArrowLeft activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>

      <div className="h-full w-full">
        <ImageView image={images[activeIndex]} />
      </div>

      <div className="z-[99] absolute top-0 bottom-0 right-0 px-4">
        <ArrowRight
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    </div>
  );
}
