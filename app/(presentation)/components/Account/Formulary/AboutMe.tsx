import { FormTextarea } from "(presentation)/components/core/BaseComponents/Form";
import { IUser } from "domain/core/entities/userEntity";

interface IFormularyProps {
  account: IUser;
  setAccount: any;
  errors: any;
  setErrors: any;
}

export default function AboutMe({
  account,
  setAccount,
  errors,
  setErrors,
}: IFormularyProps) {
  const handleShortDescription = (value: string) => {
    setAccount({ ...account, shortDescription: value });
    if (value.length > 140) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          shortDescription: "La descripción debe tener menos de 140 carácteres",
        };
      });
      return true;
    }
    setErrors({ ...errors, shortDescription: "" });
    return false;
  };
  return (
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
      <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-base text-slate-900 pb-2">
            Sobre mí y mis servicios
          </p>
        </div>
        <div className="w-full">
          <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
            Descripción de la oferta
          </p>
          <FormTextarea
            placeholder="Escribe una descripción de tu oferta"
            value={account?.shortDescription}
            className="form-control w-full"
            onChange={(e: any) => handleShortDescription(e.target.value)}
          />
          {errors.shortDescription.length > 0 && (
            <span className="text-red-500">{errors.shortDescription}</span>
          )}
        </div>
        <div className="w-full">
          <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
            Descripción larga
          </p>
          <FormTextarea
            placeholder="Escribe un breve resumen sobre ti y los servicios que ofreces"
            value={account?.aboutMe}
            className="form-control w-full"
            onChange={(e) =>
              setAccount({ ...account, aboutMe: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
