import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { ChangeEvent, useContext, useRef, useEffect } from "react";
import { IUserContext, UserContext } from "../context/UserContext";
import { twMerge } from "tailwind-merge";
import { IUser } from "domain/core/entities/userEntity";
import {
  AuthContext,
  IAuthContext,
} from "(presentation)/(layouts)/AppLayout/context/AuthContext";
import { FiUser } from "react-icons/fi";
import moment from "moment/moment";
import Image from "next/image";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";

interface IFormularyProps {
  account: IUser;
  setAccount: any;
  errors: {
    global: string;
    name: string;
    lastname: string;
    age: string;
  };
  setErrors: any;
}

export default function BasicData({
  account,
  setAccount,
  errors,
  setErrors,
}: IFormularyProps) {
  const {
    state: authState,
    actions: authActions,
    dispatch: authDispatch,
  } = useContext<IAuthContext>(AuthContext);
  const { getUserAuthenticated } = authActions;
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

    updateAvatar(obj, user.userId)(dispatch);
  }

  const handleClickRef = () => avatarRef.current && avatarRef.current.click();

  const handleage = (value: string) => {
    setAccount({ ...account, age: value });
    if (value.length < 2) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          age: "La fecha de nacimiento es obligatorio",
        };
      });
      return true;
    }
    setErrors({ ...errors, age: "" });
    return false;
  };

  const handlename = (value: string) => {
    setAccount({ ...account, names: value });
    if (value.length < 2) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          name: "El nombre es obligatorio",
        };
      });
      return true;
    }
    setErrors({ ...errors, name: "" });
    return false;
  };

  const handlelastname = (value: string) => {
    setAccount({ ...account, firstName: value });
    if (value.length < 2) {
      setErrors((previousState: any) => {
        return {
          ...previousState,
          lastname: "El apellido es obligatorio",
        };
      });
      return true;
    }
    setErrors({ ...errors, lastname: "" });
    return false;
  };

  useEffect(() => {
    if (successful) getUserAuthenticated()(authDispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  useEffect(() => {
    getCountriesISO()(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AlertComponent
        variant="error"
        show={error !== null}
        description={"Ha ocurrido un error cambiando la foto de su perfil"}
      />
      <AlertComponent
        variant="success"
        show={successful}
        description="¡Su foto de perfil ha sido actualizada con éxito!"
      />

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
                {user?.avatar?.length > 0 ? (
                  <>
                    <div className="w-[150px] h-[150px] relative flex justify-center hover:border hover:border-primary rounded-full">
                      <input
                        accept="image/png, image/jpeg, application/pdf"
                        type="file"
                        ref={avatarRef}
                        className="opacity-0 top-0 h-full z-50 cursor-pointer"
                        onChange={(e) => {
                          handleChangeAvatar(e);
                        }}
                      />
                      <Image
                        className="object-cover rounded-full "
                        src={user?.avatar}
                        alt=""
                        fill
                      />
                    </div>

                    <p className="text-[13px] text-slate-500 font-medium">
                      Recomendado (.png, .jpg, .jpeg)
                    </p>
                    {loading && (
                      <p className="text-[13px] text-slate-800 font-bold">
                        Guardando su foto de perfil...
                      </p>
                    )}
                  </>
                ) : (
                  <>
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
                    {loading && (
                      <p className="text-[13px] text-slate-800 font-bold">
                        Guardando su foto de perfil...
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="lg:w-[70%] grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 justify-start items-start gap-3 lg:mt-0 mt-6">
                <div className="flex flex-col justify-between items-start relative gap-1">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Nombre(s)
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe tu nombre..."
                    min={0}
                    defaultValue={user?.names}
                    className="form-control w-full"
                    onChange={(e: any) => handlename(e.target.value)}
                  />
                  {errors.name.length > 0 && (
                    <span className="text-red-500">{errors.name}</span>
                  )}
                </div>
                <div className="flex flex-col justify-between items-start relative gap-1">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Apellido paterno
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe tu apellido paterno..."
                    min={0}
                    defaultValue={user?.firstName}
                    className="form-control w-full"
                    onChange={(e: any) => handlelastname(e.target.value)}
                  />
                  {errors.lastname.length > 0 && (
                    <span className="text-red-500">{errors.lastname}</span>
                  )}
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
                    defaultValue={user?.curp}
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
                    defaultValue={user?.birthDate}
                    className="form-control w-full"
                    onChange={(e: any) => handleage(e.target.value)}
                  />
                  {errors.age.length > 0 && (
                    <span className="text-red-500">{errors.age}</span>
                  )}
                </div>
                <div className="flex flex-col justify-between items-start relative gap-1">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Sexo
                  </p>
                  <FormSelect
                    value={account?.sex}
                    className="form-control w-full"
                    onChange={(e) =>
                      setAccount({ ...account, sex: +e.target.value })
                    }
                  >
                    <option value="">Seleciona tu sexo</option>
                    <option value={0}>No especificado</option>
                    <option value={1}>Femenino</option>
                    <option value={2}>Masculino</option>
                  </FormSelect>
                </div>
                <div className="flex flex-col justify-between items-start relative gap-1">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    País nacimiento
                  </p>
                  <FormSelect
                    value={account?.country}
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
                  <FormSelect
                    value={account?.personType}
                    className="form-control w-full"
                    onChange={(e) =>
                      setAccount({ ...account, personType: +e.target.value })
                    }
                  >
                    <option value="">Seleciona tu tipo de persona</option>
                    <option value={0}>No especificado</option>
                    <option value={1}>Moral</option>
                    <option value={2}>Física</option>
                  </FormSelect>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
