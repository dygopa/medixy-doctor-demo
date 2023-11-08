import clsx from "clsx";
import { IImage } from "domain/core/entities/imageEntity";
import Image from "next/image";
import { useState } from "react";
import ImagePopupView from "./ImageViewPopup/ImagePopupView";

interface IImageViewProps {
  image: IImage;
  images?: IImage[];
  width?: number;
  height?: number;
}

export default function ImageView({
  image,
  images = [],
  width = 150,
  height = 150,
}: IImageViewProps) {
  const [showImageViewPopup, setShowImageViewPopup] = useState(false);

  const getIndex = (): number => {
    const index = images.findIndex((imageFind) => imageFind.url === image.url);

    if (index >= 0) return index;

    return 0;
  };

  return (
    <>
      <div
        onClick={
          images.length > 0 ? () => setShowImageViewPopup(true) : () => {}
        }
        style={{ width: width, height: height }}
        className={clsx([
          `relative flex justify-center hover:border hover:border-primary rounded-xl px-0 py-0`,
          images.length > 0 && "cursor-pointer",
        ])}
      >
        <Image
          className="object-cover rounded-xl"
          width={width}
          height={height}
          src={image.url}
          alt=""
        />
      </div>

      {showImageViewPopup && images.length > 0 && (
        <ImagePopupView
          images={images}
          index={getIndex()}
          showImageViewPopup={showImageViewPopup}
          setShowImageViewPopup={setShowImageViewPopup}
        />
      )}
    </>
  );
}
