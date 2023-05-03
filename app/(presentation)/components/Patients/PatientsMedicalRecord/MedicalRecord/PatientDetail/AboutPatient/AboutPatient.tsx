import clsx from "clsx";
import Image from "next/image";

export default function AboutPatient() {
  return (
    <div
      className={clsx([
        "relative zoom-in",
        "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
      ])}
      style={{ height: "35vh" }}
    >
      <div className="p-5 box" style={{ height: "35vh" }}>
        <div className="flex items-center">
          <div className="text-center">
            <div className="flex w-full justify-center mb-4 mr-32">
              <Image
                className="object-cover rounded-full"
                src="https://accountmanagement.gettyimages.com/Account/ProfileImage/8b931d4f-f756-4ae1-9380-e4ed329a4ce1.jpg"
                alt=""
                width={150}
                height={150}
              />
            </div>

            <div>
              <div className="w-full flex justify-center items-center gap-2">
                <p className="font-medium p-[1.0%_7%] rounded text-sm text-yellow-800 bg-yellow-300">
                  En atención
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="relative flex flex-wrap justify-between items-start gap-y-5">
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
    </div>
  );
}
