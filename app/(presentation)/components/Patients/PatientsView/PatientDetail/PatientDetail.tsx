import {
  PatientsMedicalRecordRoutesEnum,
  PatientsRoutesEnum,
} from "(presentation)/(routes)/patientsRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function PatientDetails() {
  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mr-5 text-2xl font-bold truncate">
              Sobre el paciente
            </h2>
          </div>

          <div>
            <Link
              href={
                PatientsRoutesEnum.PatientsView +
                "ACV32JH" +
                PatientsMedicalRecordRoutesEnum.MedicalRecord
              }
            >
              <Button variant="primary">Expediente médico</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3 intro-y mb-14">
          <div
            className={clsx([
              "relative zoom-in",
              "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
            ])}
          >
            <div className="p-5 box text-center">
              <div className="flex w-full justify-center mb-4">
                <Image
                  className="object-cover rounded-md"
                  src="https://accountmanagement.gettyimages.com/Account/ProfileImage/8b931d4f-f756-4ae1-9380-e4ed329a4ce1.jpg"
                  alt=""
                  width={125}
                  height={125}
                />
              </div>

              <div className="mb-2">
                <h6 className="font-bold text-base">Jose Hernandez</h6>
              </div>

              <div>
                <div className="w-full flex justify-center items-center gap-2">
                  <span className="rounded-full w-[12px] h-[12px] bg-warning"></span>
                  <p className="text-sm font-medium text-slate-900">
                    En atencion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-6 intro-y mb-14">
          <div
            className={clsx([
              "relative",
              "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
            ])}
          >
            <div className="p-5 box">
              <div className="relative flex flex-wrap justify-between items-start gap-y-5">
                <div className="w-full h-fit">
                  <p className="font-semibold text-lg text-slate-900">
                    Información personal
                  </p>
                </div>

                <div className="w-[48%]">
                  <p className="font-semibold mb-2">Nombre(s)</p>

                  <span>Jose</span>
                </div>

                <div className="w-[48%]">
                  <p className="font-semibold mb-2">Primer apellido</p>

                  <span>Hernandez</span>
                </div>

                <div className="w-[48%]">
                  <p className="font-semibold mb-2">Segundo apellido</p>

                  <span>Gomez</span>
                </div>

                <div className="w-[48%]">
                  <p className="font-semibold mb-2">CURP</p>

                  <span>ACV32JH</span>
                </div>

                <div className="w-[48%]">
                  <p className="font-semibold mb-2">Teléfono</p>

                  <span>123456</span>
                </div>

                <div className="w-[48%]">
                  <p className="font-semibold mb-2">Ciudad</p>

                  <span>Durango</span>
                </div>

                <div className="w-[48%]">
                  <p className="font-semibold mb-2">Genero</p>

                  <span>Hombre</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3 intro-y mb-14">
          <div
            className={clsx([
              "relative zoom-in",
              "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
            ])}
          >
            <div className="p-3 box">
              <div className="relative h-fit flex flex-wrap justify-between items-start gap-y-5">
                <div className="w-full h-fit">
                  <p className="font-semibold text-lg text-slate-900">
                    Parientes
                  </p>
                </div>
                <div className="w-full h-fit text-center">
                  <p className="font-semibold text-base text-slate-900 mb-3">
                    Sin parientes
                  </p>
                  <p className="font-light text-sm text-slate-600">
                    No hay parientes relacionados a este paciente
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
