import { IImage } from "domain/core/entities/imageEntity";
import Image from "next/image";

interface IImageViewProps {
  image: IImage;
}

export default function ImageView({ image }: IImageViewProps) {
  return <Image src={image.url} alt="" fill style={{ objectFit: "contain" }} />;
}
