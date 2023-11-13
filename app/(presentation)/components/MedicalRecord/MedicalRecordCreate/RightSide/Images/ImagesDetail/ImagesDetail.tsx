import clsx from "clsx";
import { IMedicalConsultyImage } from "domain/core/entities/medicalConsultyEntity";
import { Dispatch, SetStateAction } from "react";
import ImageUpload from "./ImageUploadButton/ImageUploadButton";
import ImageView from "./ImageView/ImageView";

type valuesTypes = {
  images: IMedicalConsultyImage[];
};

interface IImagesDetailProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function ImagesDetail({
  values,
  setValues,
}: IImagesDetailProps) {
  return (
    <div>
      <div className="xl:flex items-center mb-4 w-full">
        <div className="xl:flex  w-full">
          <div className="flex items-center">
            {values.images.length > 0 &&
              values.images.map((image: IMedicalConsultyImage, i: number) => (
                <div key={i} className="mr-3">
                  <ImageView
                    image={image}
                    values={values}
                    setValues={setValues}
                  />
                </div>
              ))}
          </div>

          <div
            className={clsx([
              "w-full",
              values.images.length > 0
                ? "lg:ml-4 md:ml-4 ml-0 lg:mt-0 md:mt-0 mt-4"
                : "ml-0",
            ])}
          >
            <ImageUpload values={values} setValues={setValues} />
          </div>
        </div>
      </div>
    </div>
  );
}
