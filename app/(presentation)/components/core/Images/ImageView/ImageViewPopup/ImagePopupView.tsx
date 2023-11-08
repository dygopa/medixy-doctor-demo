import { IImage } from "domain/core/entities/imageEntity";
import { Dispatch, SetStateAction, useState } from "react";
import { twMerge } from "tailwind-merge";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Images from "./Images/Images";

interface IImagePopupViewProps {
  images: IImage[];
  index: number;
  showImageViewPopup: boolean;
  setShowImageViewPopup: Dispatch<SetStateAction<boolean>>;
}

export default function ImagePopupView({
  images,
  index,
  showImageViewPopup,
  setShowImageViewPopup,
}: IImagePopupViewProps) {
  const [activeIndex, setActiveIndex] = useState(index);

  return (
    <div
      className={twMerge([
        "z-[98] fixed top-0 left-0 w-full h-screen overflow-y-hidden bg-black",
        showImageViewPopup ? "visible" : "hidden",
      ])}
    >
      <div className="w-full h-[10vh] p-4">
        <Header setShowImageViewPopup={setShowImageViewPopup} />
      </div>

      <div className="w-full h-[80vh]">
        <Images
          images={images}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>

      <div className="w-full h-[10vh] pt-2">
        <Footer description={images[activeIndex].description ?? ""} />
      </div>
    </div>
  );
}
