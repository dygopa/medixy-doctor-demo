import Button from "(presentation)/components/core/BaseComponents/Button";
import clsx from "clsx";
import { IMedicalConsultyImage } from "domain/core/entities/medicalConsultyEntity";
import { IUser } from "domain/core/entities/userEntity";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import {
  MedicalRecordCreateContext,
  IMedicalRecordCreateContext,
} from "../../context/MedicalRecordCreateContext";
import FinishedButton from "./FinishedButton/FinishedButton";
import ImagesDetail from "./ImagesDetail/ImagesDetail";

type valuesTypes = {
  images: IMedicalConsultyImage[];
};

interface IImagesProps {
  user: IUser;
}

export default function Images({ user }: IImagesProps) {
  const { state } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { loading } = state.createMedicalConsulty;

  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const view = params.get("view");
  const type = params.get("type");
  const imagesExpanded = params.get("images");

  const [values, setValues] = useState<valuesTypes>({
    images: [],
  });

  const [initialRender, setInitialRender] = useState(true);
  const [showBody, setShowBody] = useState(false);

  const saveValuesInLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    let valuesJSON = JSON.parse(valuesStorage ?? "");

    let images = valuesJSON.images;
    images = values.images;

    valuesJSON.images = images;

    localStorage.setItem(
      "prosit.storage.medical-record-create",
      JSON.stringify(valuesJSON)
    );
  };

  useEffect(() => {
    if (!initialRender) saveValuesInLocalStorage();

    setInitialRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const setValuesFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    const valuesJSON = JSON.parse(valuesStorage ?? "");

    setValues({
      ...values,
      images: valuesJSON.images,
    });
  };

  useEffect(() => {
    if (!initialRender) saveValuesInLocalStorage();

    setInitialRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    setValuesFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (view === "images" || imagesExpanded === "true") {
      setShowBody(true);
    } else {
      setShowBody(false);
    }
  }, [view, imagesExpanded]);

  return (
    <div>
      <div
        className={clsx([
          "h-auto z-40 w-full",
          " bg-slate-50 before:h-full before:mt-3 before:rounded-md before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="p-4 box h-full">
          <button type="button" className="w-full">
            <div className="w-full flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-bold text-lg text-slate-900">Imagenes</p>
              </div>
            </div>
          </button>

          <form>
            <div className="py-4">
              <ImagesDetail values={values} setValues={setValues} />
            </div>
          </form>
        </div>
      </div>

      <div className="w-full lg:flex md:flex justify-end mt-14">
        <div className="lg:mr-2 md:mr-2 mr-0 lg:mb-0 md:mb-0 mb-4">
          <Button
            disabled={loading}
            variant="outline-primary"
            className="h-[46px] lg:w-[150px] md:w-[150px] w-full"
            onClick={() => {
              router.replace(
                `${pathname}?view=recipe&type=${type ?? "medical-record"}`
              );
            }}
          >
            Volver
          </Button>
        </div>

        <div>
          <FinishedButton user={user} />
        </div>
      </div>
    </div>
  );
}
