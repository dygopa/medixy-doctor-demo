import { IMedicalConsultyImage } from "domain/core/entities/medicalConsultyEntity";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import ImageUpload from "./ImageUpload/ImageUpload";

type valuesTypes = {
  images: IMedicalConsultyImage[];
};

interface IImageUploadPopupProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
  showImageUploadPopup: boolean;
  setShowImageUploadPopup: Dispatch<SetStateAction<boolean>>;
}

export default function ImageUploadPopup({
  values,
  setValues,
  showImageUploadPopup,
  setShowImageUploadPopup,
}: IImageUploadPopupProps) {
  return (
    <div
      className={twMerge([
        "z-[100] fixed top-0 left-0 w-full h-screen overflow-y-hidden bg-gray-900/50 flex flex-col justify-center items-center",
        showImageUploadPopup ? "visible" : "hidden",
      ])}
    >
      <div
        className={twMerge([
          "w-full md:w-[60%] xl:w-[45%] lg:w-[60%] flex overflow-y-hidden flex-col justify-between items-start bg-white lg:rounded-md p-6 gap-8 h-[450px]",
        ])}
      >
        <div className="w-full px-4">
          <div className="mb-5 text-center">
            <ImageUpload
              values={values}
              setValues={setValues}
              setShowImageUploadPopup={setShowImageUploadPopup}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
