import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import { IUser } from "domain/core/entities/userEntity";

interface IFormularyProps {
  account: IUser;
  setAccount: any;
}

export default function Contact({ account, setAccount }: IFormularyProps) {
  return (
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
      <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-base text-slate-900 pb-2">
            Contácto
          </p>
        </div>
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-start items-center gap-3">
          <div className="flex flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
              Teléfono de contacto
            </p>
            <FormInput
              type={"text"}
              placeholder="+00 000-000-0000"
              min={0}
              value={account?.phone}
              className="form-control w-full"
              onChange={(e) =>
                setAccount({ ...account, phone: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
              Sitio web
            </p>
            <FormInput
              type={"text"}
              placeholder="www.misitio.com"
              min={0}
              value={account?.websiteUrl}
              className="form-control w-full"
              onChange={(e) =>
                setAccount({ ...account, websiteUrl: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
