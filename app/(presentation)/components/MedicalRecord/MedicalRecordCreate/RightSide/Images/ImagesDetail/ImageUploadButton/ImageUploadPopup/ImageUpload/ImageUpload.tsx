import { b64toBlob } from "(presentation)/(helper)/files/filesHelper";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormTextarea } from "(presentation)/components/core/BaseComponents/Form";
import { IMedicalConsultyImage } from "domain/core/entities/medicalConsultyEntity";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { BiImage } from "react-icons/bi";
import { twMerge } from "tailwind-merge";

type valuesTypes = {
  images: IMedicalConsultyImage[];
};

interface IImageUploadProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
  setShowImageUploadPopup: Dispatch<SetStateAction<boolean>>;
}

export default function ImageUpload({
  values,
  setValues,
  setShowImageUploadPopup,
}: IImageUploadProps) {
  const [file, setFile] = useState<null | IMedicalConsultyImage>(null);
  const [description, setDescription] = useState("");

  let imageRef = useRef<HTMLInputElement>(null);

  const handleClickRef = () => imageRef.current && imageRef.current.click();

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  async function handleChangeMedia(e: ChangeEvent<HTMLInputElement>) {
    let file = e.target.files![0] as File;

    let base64 = await toBase64(file);
    let splittedType = file!.type.split("/");
    var base64result = base64?.toString().split(",")[1];

    let obj = {
      data: base64result ?? "",
      type: `${splittedType[1] ?? ""}`,
    };

    const mediaConsultyImage: IMedicalConsultyImage = {
      id: 0,
      url: "",
      file: obj,
      description: description.length > 0 ? description : null,
      medicalConsultyId: 0,
    };

    setFile(mediaConsultyImage);
  }

  const onClick = () => {
    if (!file) return;

    setValues({ ...values, images: [...values.images, file] });
    setFile(null);
    setDescription("");
    setShowImageUploadPopup(false);
  };

  return (
    <div className="text-center">
      <div className="flex text-center justify-center w-full">
        {file && file.file?.data && file?.file?.data.length > 0 ? (
          <>
            <div className="w-[150px] h-[150px] relative flex justify-center hover:border hover:border-primary rounded-xl">
              <Image
                className="object-cover rounded-xl "
                src={URL.createObjectURL(b64toBlob(file.file.data))}
                alt=""
                fill
              />
            </div>
          </>
        ) : (
          <>
            <input
              accept="image/png, image/jpeg, application/pdf"
              type="file"
              ref={imageRef}
              className="hidden"
              onChange={(e) => {
                handleChangeMedia(e);
              }}
            />
            <div
              onClick={handleClickRef}
              className={twMerge([
                "transition w-[10rem] h-[10rem] rounded-xl border flex flex-col justify-center items-center cursor-pointer",
                "hover:bg-slate-200",
              ])}
            >
              <BiImage size={60} />
            </div>
          </>
        )}
      </div>

      <div className="text-left mt-8">
        <div className="mb-2">
          <span>Descripción de la imagen (Opcional)</span>
        </div>

        <FormTextarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);

            if (file?.file) {
              setFile({ ...file, description: e.target.value });
            }
          }}
        />
      </div>

      <div className="flex items-center justify-center mt-8">
        <div className="mr-3">
          <Button
            onClick={() => onClick()}
            variant="primary"
            className="w-[250px]"
          >
            Cargar imagen
          </Button>
        </div>

        <div>
          <Button
            variant="outline-primary"
            className="w-[250px]"
            onClick={() => setShowImageUploadPopup(false)}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
