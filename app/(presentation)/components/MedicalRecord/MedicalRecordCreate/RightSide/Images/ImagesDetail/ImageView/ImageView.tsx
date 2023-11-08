import { b64toBlob } from "(presentation)/(helper)/files/filesHelper";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { IMedicalConsultyImage } from "domain/core/entities/medicalConsultyEntity";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type valuesTypes = {
  images: IMedicalConsultyImage[];
};

interface IImageViewProps {
  image: IMedicalConsultyImage;
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function ImageView({
  image,
  values,
  setValues,
}: IImageViewProps) {
  const onDeleteImage = () =>
    setValues({
      ...values,
      images: values.images.filter(
        (imageFilter) => imageFilter.file?.data !== image.file?.data
      ),
    });

  if (!image.file) return <div />;

  return (
    <>
      <div className="flex text-center w-full justify-center">
        <div className="w-[150px] h-[150px] relative flex justify-center hover:border hover:border-primary rounded-xl">
          <Image
            className="object-cover rounded-xl "
            src={URL.createObjectURL(b64toBlob(image.file.data))}
            alt=""
            fill
          />
        </div>
      </div>

      <div className="mt-3">
        <Button variant="outline-primary" onClick={() => onDeleteImage()}>
          Eliminar
        </Button>
      </div>
    </>
  );
}
