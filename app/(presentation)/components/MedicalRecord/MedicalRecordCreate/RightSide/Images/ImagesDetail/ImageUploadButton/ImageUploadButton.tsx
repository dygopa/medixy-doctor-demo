import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IMedicalConsultyImage } from "domain/core/entities/medicalConsultyEntity";
import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import ImageUploadPopup from "./ImageUploadPopup/ImageUploadPopup";

type valuesTypes = {
  images: IMedicalConsultyImage[];
};

interface IImageUploadProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function ImageUpload({ values, setValues }: IImageUploadProps) {
  const [showImageUploadPopup, setShowImageUploadPopup] = useState(false);

  return (
    <>
      <div>
        <div className="flex text-center w-full">
          <div
            onClick={() => setShowImageUploadPopup(true)}
            className={twMerge([
              "transition w-[10rem] h-[10rem] rounded-xl border flex flex-col justify-center items-center cursor-pointer",
              "hover:bg-slate-200",
            ])}
          >
            <Lucide icon="image" size={60} color="#216AD9" />
          </div>
        </div>
      </div>

      {showImageUploadPopup && (
        <ImageUploadPopup
          values={values}
          setValues={setValues}
          showImageUploadPopup={showImageUploadPopup}
          setShowImageUploadPopup={setShowImageUploadPopup}
        />
      )}
    </>
  );
}
