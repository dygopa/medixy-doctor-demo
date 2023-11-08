import ImageView from "(presentation)/components/core/Images/ImageView/ImageView";
import {
  IMedicalConsulty,
  IMedicalConsultyImage,
} from "domain/core/entities/medicalConsultyEntity";

interface IImagesProps {
  medicalConsulty: IMedicalConsulty;
}

export default function Images({ medicalConsulty }: IImagesProps) {
  if (
    !medicalConsulty.medicalConsultyImages ||
    medicalConsulty.medicalConsultyImages.length === 0
  )
    return <div />;

  return (
    <div className="flex items-center">
      {medicalConsulty.medicalConsultyImages.length > 0 &&
        medicalConsulty.medicalConsultyImages.map(
          (image: IMedicalConsultyImage, i: number) => (
            <div key={i} className="mr-3">
              <ImageView
                image={image}
                images={medicalConsulty.medicalConsultyImages}
              />
            </div>
          )
        )}
    </div>
  );
}
