import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { ChangeEvent, useContext, useEffect, useRef } from "react";
import { IUserContext, UserContext } from "../context/UserContext";
import { twMerge } from "tailwind-merge";
import { IUser } from "domain/core/entities/userEntity";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import { FiUser } from "react-icons/fi";
import moment from "moment/moment";

interface IFormularyProps {
  account: IUser;
  setAccount: any;
}

export default function BasicData({ account, setAccount }: IFormularyProps) {
  const { state: authState } = useContext<IAuthContext>(AuthContext);
  const { data: user } = authState.getUserAuthenticated;

  const { state, actions, dispatch } = useContext<IUserContext>(UserContext);
  const { updateAvatar } = actions;

  
  const { getCountriesISO } = actions;
  const { data: countriesISO } = state.getCountriesISO;

  const { data, loading, error, successful } = state.updateAvatar;

  let avatarRef = useRef<HTMLInputElement>(null);

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  async function handleChangeAvatar(e: ChangeEvent<HTMLInputElement>) {
    let file = e.target.files![0] as File;

    let base64 = await toBase64(file);
    let splittedType = file!.type.split("/");
    var base64result = base64?.toString().split(",")[1];

    let obj = {
      id: user.userId,
      data: base64result,
      type: `${splittedType[1]}`,
    };

    updateAvatar(obj)(dispatch);
  }

  const handleClickRef = () => avatarRef.current && avatarRef.current.click();

  useEffect(() => {
    getCountriesISO()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-5">
      <div className="border w-full rounded-md p-5 flex">
        <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
          <div className="w-full border-b mb-2">
            <p className="font-medium text-base text-slate-900 pb-2">
              Datos generales
            </p>
          </div>
          <div className="w-full lg:flex justify-between items-center gap-4">
            <div className="lg:w-[30%] flex flex-col justify-center items-center text-center gap-3">
              <input
                accept="image/png, image/jpeg, application/pdf"
                type="file"
                ref={avatarRef}
                className="hidden"
                onChange={(e) => {
                  handleChangeAvatar(e);
                }}
              />
              <div
                onClick={handleClickRef}
                className={twMerge([
                  "transition w-[10rem] h-[10rem] rounded-full border flex flex-col justify-center items-center cursor-pointer",
                  "hover:bg-slate-200",
                ])}
              >
                <FiUser size={60} />
              </div>
              <p className="text-[13px] text-slate-500 font-medium">
                Recomendado (.png, .jpg, .jpeg)
              </p>
            </div>
            <div className="lg:w-[70%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-start items-center gap-3 lg:mt-0 mt-6">
              <div className="flex flex-col justify-between items-start relative gap-1">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Nombre(s)
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Escribe tu nombre..."
                  min={0}
                  defaultValue={account?.names}
                  className="form-control w-full"
                  onChange={(e) =>
                    setAccount({ ...account, names: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col justify-between items-start relative gap-1">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Apellido paterno
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Escribe tu apellido paterno..."
                  min={0}
                  defaultValue={account?.firstName}
                  className="form-control w-full"
                  onChange={(e) =>
                    setAccount({ ...account, firstName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col justify-between items-start relative gap-1">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Apellido materno
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Escribe tu apellido materno..."
                  min={0}
                  defaultValue={user?.lastName}
                  className="form-control w-full"
                  onChange={(e) =>
                    setAccount({ ...account, lastName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col justify-between items-start relative gap-1">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  CURP
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Escribe tu CURP..."
                  disabled={true}
                  defaultValue={account?.curp}
                  className="form-control w-full"
                  onChange={(e) =>
                    setAccount({ ...account, curp: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col justify-between items-start relative gap-1">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Fecha de nacimiento
                </p>
                <FormInput
                  type={"date"}
                  placeholder="Escribe el nombre del consultorio..."
                  min={0}
                  defaultValue={
                    account?.birthDate !== ""
                      ? moment(account?.birthDate).toDate().getDate()
                      : Date.now()
                  }
                  className="form-control w-full"
                  onChange={(e) =>
                    setAccount({ ...account, birthDate: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col justify-between items-start relative gap-1">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Sexo
                </p>
                <FormSelect
                  defaultValue={account?.sex}
                  className="form-control w-full"
                  onChange={(e) =>
                    setAccount({ ...account, sex: +e.target.value })
                  }
                >
                  <option value="">Seleciona tu sexo</option>
                  <option value={1}>Femenino</option>
                  <option value={2}>Masculino</option>
                </FormSelect>
              </div>
              <div className="flex flex-col justify-between items-start relative gap-1">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  País nacimiento
                </p>
                <FormSelect
                  defaultValue={user?.country}
                  className="form-control w-full"
                  onChange={(e) =>
                    setAccount({ ...account, country: e.target.value })
                  }
                >
                  <option value="">Tu pais de nacimiento</option>
                  {countriesISO.length > 0 &&
                  countriesISO.map((elem) => (
                    <option key={elem.iso} value={elem.iso}>
                      {elem.iso} - {elem.name}
                    </option>
                  ))}
                </FormSelect>
              </div>
              <div className="flex flex-col justify-between items-start relative gap-1">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Tipo de persona
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Indica tu tipo de persona..."
                  min={0}
                  defaultValue={account?.personType}
                  className="form-control w-full"
                  onChange={(e) =>
                    setAccount({ ...account, personType: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
