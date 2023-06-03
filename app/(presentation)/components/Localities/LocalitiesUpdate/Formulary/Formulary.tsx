import { ClassicEditor } from "(presentation)/components/core/BaseComponents/Ckeditor";
import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormSwitch,
} from "(presentation)/components/core/BaseComponents/Form";
import SearchLocality from "(presentation)/components/core/SpecialSearch/SpecialSearch";
import {
  useState,
  useEffect,
  SetStateAction,
  useContext,
  useMemo,
  ChangeEvent,
} from "react";
import { FiCheck, FiCheckCircle, FiX } from "react-icons/fi";
import { BiBuildingHouse } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  ILocalitiesContext,
  LocalitiesContext,
} from "../../context/LocalitiesContext";
import { ILocality } from "domain/core/entities/localityEntity";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { usePathname, useRouter } from "next/navigation";

export default function Formulary({ userId, localityId }: { userId: string, localityId:number },) {
  const pathname = usePathname();

  const { state, actions, dispatch } =
    useContext<ILocalitiesContext>(LocalitiesContext);
  const { gettingUserLocality, updateUserLocality } = actions;
  const { data, loading, successful, error } = state.gettingUserLocality;
  const {
    data: dataUpdate,
    loading: loadingUpdate,
    successful: successfulUpdate,
    error: errorUpdate,
  } = state.updateUserLocality;

  let [formData, setFormData] = useState({
    name: "",
    code: "",
    clues: "",
    state: {
      id: 0,
      name: "",
    },
    address: "",
    media: {
      data: "",
      type: "",
    },
  });

  useMemo(() => {
    gettingUserLocality(localityId, userId)(dispatch);
  }, []);

  const setFormDataValues = () => {
    setFormData({
      ...formData,
      name: data?.name ?? "",
      code: data?.code ?? "",
      clues: data?.clues ?? "",
      state: {
        id: data?.state.id ?? 0,
        name: data?.state.name ?? 0,
      },
      address: data?.address ?? "",
      media: {
        data: data?.image_url ?? "",
        type: data?.type,
      },
    })
  }

  useEffect(() => {
    if (successful) {
      setFormDataValues();
    }
  },[successful])

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  
  async function handleChangeMedia(e: ChangeEvent<HTMLInputElement>) {
    let file = e.target.files![0] as File;

    let base64 = await toBase64(file);
    let splittedType = file!.type.split("/");
    var base64result = base64?.toString().split(",")[1];

    let obj = {
      data: base64result ?? "",
      type: `${splittedType[1] ?? ""}`,
    };

    setFormData({ ...formData, media: obj });
  }

  
  useMemo(() => {
    if (successfulUpdate) window.location.href = "/localities";
  }, [successfulUpdate]);

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          Cargando la Localidad.
        </p>
      </div>
    );
  }

  return (
    <>
      <AlertComponent
        variant="error"
        show={errorUpdate !== null}
        description="Ha ocurrido un error inesperado en la actualización"
      />
      <AlertComponent
        variant="success"
        show={successfulUpdate}
        description="Tu consultorio se ha actualizado exitosamente"
      />

      <div className="w-full text-center md:flex md:justify-between items-start  sticky top-[67px] z-[50] bg-slate-100 md:pt-5 py-3">
        <h2 className="lg:mr-5 lg:mb-0 mb-4 text-2xl font-bold truncate">
          Actualizar consultorio
        </h2>
        <div className="lg:w-[20%]">
          <Button
            disabled={loadingUpdate || formData?.name === "" || formData?.clues === "" }
            onClick={() => {
              updateUserLocality({ ...formData, state: formData.state.name }, data.id)(
                dispatch
              );
              //console.log(formData)
            }}
            variant="primary"
            className="w-full"
          >
            {loadingUpdate ? "Actualizando..." : "Actualizar"}
          </Button>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="relative flex justify-center items-start gap-4 w-full">
          <div className="bg-white lg:w-[70%] shadow-xl shadow-slate-100 rounded-md h-fit p-5">
            <div className="border w-full rounded-md p-5 flex">
              <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
                <div className="w-full border-b mb-2">
                  <p className="font-medium text-base text-slate-900 pb-2">
                    Definición del consultorio
                  </p>
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Nombre del consultorio
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe el nombre del consultorio..."
                    min={0}
                    value={formData?.name}
                    className="form-control lg:w-[70%]"
                    onChange={(e: any) => {
                      setFormData({ ...formData, name: e.target.value });
                    }}
                  />
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Nro. de consultorio
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe el número del consultorio..."
                    min={0}
                    value={formData?.code}
                    className="form-control lg:w-[70%]"
                    onChange={(e: any) => {
                      setFormData({ ...formData, code: e.target.value });
                    }}
                  />
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    CLUES
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe el CLUES del consultorio..."
                    min={0}
                    value={formData?.clues}
                    className="form-control lg:w-[70%]"
                    onChange={(e: any) => {
                      setFormData({ ...formData, clues: e.target.value });
                    }}
                  />
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Dirección
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe la dirección del consultorio..."
                    min={0}
                    disabled={true}
                    value={formData?.address}
                    className="form-control lg:w-[70%]"
                    onChange={(e: any) => {
                      setFormData({ ...formData, address: e.target.value });
                    }}
                  />
                </div>
                <div className="flex justify-between items-center relative w-full gap-3"></div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Cargar imagen
                    <span className="text-primary font-bold">*</span>
                  </p>
                  <FormInput 
                    onChange={(e) => handleChangeMedia(e)}
                    type="file" 
                    className="form-control lg:w-[70%]" 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
