import { usePathname, useRouter } from "next/navigation";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
  Fragment,
  useRef,
} from "react";
import {
  IServicesContext,
  ServicesContext,
} from "../../context/ServicesContext";
import { IService } from "domain/core/entities/serviceEntity";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  FormInput,
  FormSelect,
  FormTextarea,
} from "(presentation)/components/core/BaseComponents/Form";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { Menu, Transition } from "@headlessui/react";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { MdOutlineMedicalServices } from "react-icons/md";
import {
  b64toBlob,
  getBase64ImageFromUrl,
} from "(presentation)/(helper)/files/filesHelper";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import { ServicesRoutesEnum } from "(presentation)/(routes)/servicesRoutes";
import {
  ILocality,
  ILocalityService,
} from "domain/core/entities/localityEntity";
import { FiCheck } from "react-icons/fi";
import { NumericFormat } from "react-number-format";
import {
  IStepByStepContext,
  StepByStepContext,
} from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";
import AutocompleteInputServices from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputServices/AutocompleteInputServices";

export default function Formulary({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) {
  const pathname = usePathname();

  const { state, actions, dispatch } =
    useContext<IServicesContext>(ServicesContext);
  const { getServiceByBase, updateService, deleteService, getCategories } =
    actions;
  const { data, loading, successful, error } = state.getService;
  const {
    data: dataUpdate,
    loading: loadingUpdate,
    successful: successfulUpdate,
    error: errorUpdate,
  } = state.updateService;
  // const { data: categories } = state.getCategories;
  const {
    data: dataDelete,
    loading: loadingDelete,
    successful: successfulDelete,
    error: errorDelete,
  } = state.deleteService;

  const {
    actions: actionsStep,
    state: stateSteps,
    dispatch: dispatchStep,
  } = useContext<IStepByStepContext>(StepByStepContext);
  const { createUserSteps, changeOpenPopup } = actionsStep;
  const {
    error: stepNotCreated,
    loading: creatingStep,
    successful: creatingStepSuccessful,
  } = stateSteps.createUserSteps;

  const [successfulPopup, setSuccessfulPopup] = useState(false);
  const [loadedAPI, setLoadedAPI] = useState(false);
  const [createdStep, setCreatedStep] = useState(false);

  const [formData, setFormData] = useState<any>({
    name: "",
    // service_category_id: 0,
    // service_category_name: "",
    // service_category_doctor_id: null,
    description: "",
    conditions: "",
    base_price: 0,
    status: 1,
    location: {} as ILocality,
    locationId: 0,
    media: {
      data: "",
      type: "",
    },
  });

  let avatarRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleClickRef = () => avatarRef.current && avatarRef.current.click();

  const setFormDataValues = async () => {
    let imageUrl: any = "";

    if (data.image_url) {
      if (data.image_url.length > 0)
        imageUrl = await getBase64ImageFromUrl(data.image_url);
    }
    setFormData({
      ...formData,
      name: data?.name ?? "",
      //service_category_id: data?.service_category_id
      //  ? parseInt(data.service_category_id, 10)
      //  : 0,
      //service_category_name: data?.service_category
      //  ? data.service_category.name
      //  : "",
      description: data?.description ?? "",
      conditions: data?.conditions ?? "",
      base_price: data?.base_price ?? "",
      status: data?.status ?? "",
      location: data?.location ?? {},
      locationId: data?.location_id ?? 0,
      media: {
        data: imageUrl.toString().split(",")[1],
        type: "",
      },
    });
  };

  useMemo(() => {
    if (stepNotCreated) {
      setSuccessfulPopup(true);
    }

    if (creatingStepSuccessful) {
      setTimeout(() => {
        changeOpenPopup(true)(dispatchStep);
      }, 3000);
    }
  }, [stepNotCreated, creatingStepSuccessful]);

  /* useEffect(() => {
    if (!createdStep) {
      createUserSteps(accountId, "SERVICE_UPDATED")(dispatchStep);
      setCreatedStep(true);
    }
  }, [createdStep]); */

  useEffect(() => {
    if (successful) {
      setFormDataValues();
    }
  }, [successful]);

  useMemo(() => {
    if (userId) {
      const url = pathname?.split("/");
      let id = url![url!.length - 1];
      getServiceByBase(parseInt(id), userId)(dispatch);
    }
  }, [userId, pathname]);

  const loadAPI = () => {
    // getCategories()(dispatch);
    setLoadedAPI(true);
  };

  useEffect(() => {
    loadAPI();
  }, [loadedAPI]);

  useMemo(() => {
    if (successfulDelete) window.location.href = "/services";
  }, [successfulDelete]);

  /* categories && categories !== null
    ? categories.sort((x: { name: string }, y: { name: any }) =>
        x.name.localeCompare(y.name)
      )
    : categories; */

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

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          Cargando el servicio.
        </p>
      </div>
    );
  }

  const onClickButtonPrincipal: Function = () => {
    router.push(ServicesRoutesEnum.Services);
  };

  return (
    <>
      <AlertComponent
        variant="error"
        show={errorUpdate !== null}
        description="Ha ocurrido un error inesperado en la actualización"
      />
      <SuccessfulComponent
        tittle="Actualizado con exito"
        show={successfulUpdate}
        description={"Tu servicio se ha actualizado exitosamente"}
        textButtonPrincipal={"Ir a lista de servicios"}
        onClickButtonPrincipal={onClickButtonPrincipal}
      />

      <AlertComponent
        variant="error"
        show={errorDelete !== null}
        description="Ha ocurrido un error inesperado en la eliminación"
      />
      <SuccessfulComponent
        tittle="Eliminado con exito"
        show={successfulDelete}
        description={"Tu servicio se ha eliminado exitosamente"}
      />

      <div className="w-full md:gap-5 md:flex justify-between items-start sticky top-[67px] z-[50] bg-slate-100 py-2">
        <h2 className="lg:mr-5 lg:mb-0 mb-8 text-2xl font-bold truncate">
          Actualizar Servicio
        </h2>
        <div className="md:w-[50%] flex justify-end items-center gap-3">
          <Button
            disabled={
              loadingUpdate || formData?.name === ""
              // formData?.service_category_name.length === 0
            }
            onClick={() => {
              updateService({
                dataService: formData,
                serviceId: data.id,
              })(dispatch);
            }}
            variant="primary"
            className="w-[275px]"
          >
            {loadingUpdate ? "Actualizando..." : "Actualizar"}
          </Button>

          <Button
            disabled={loadingDelete}
            onClick={() => {
              deleteService(data?.id, userId)(dispatch);
            }}
            variant="outline-primary"
            className=""
          >
            {loadingDelete ? "Eliminando..." : "Eliminar"}
          </Button>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="relative lg:flex justify-center items-start gap-4 w-full">
          <div className="bg-white lg:w-[60%] shadow-xl shadow-slate-100 rounded-md h-fit p-7 lg:mb-0 mb-8">
            <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
              <div className="w-full border-b mb-2">
                <p className="font-medium text-base text-slate-900 pb-2">
                  Definición del Servicio
                </p>
              </div>
              <div className="text-center relative w-full gap-3">
                {/*<p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Cargar imagen
                  <span className="text-primary font-bold">*</span>
                </p>
                <FormInput
                  type="file"
                  className="form-control lg:w-[70%]"
                  onChange={(e) => handleChangeMedia(e)}
                />*/}
                {formData?.media?.data?.length > 0 ? (
                  <>
                    <div className="flex text-center w-full justify-center">
                      <div className="w-[150px] h-[150px] relative flex justify-center hover:border hover:border-primary rounded-xl">
                        <input
                          accept="image/png, image/jpeg, application/pdf"
                          type="file"
                          ref={avatarRef}
                          className="opacity-0 top-0 h-full z-50 cursor-pointer"
                          onChange={(e) => {
                            handleChangeMedia(e);
                          }}
                        />
                        <Image
                          className="object-cover rounded-xl "
                          src={URL.createObjectURL(
                            b64toBlob(formData.media.data)
                          )}
                          alt=""
                          fill
                        />
                      </div>
                    </div>

                    <p className="text-[13px] text-slate-500 font-medium pt-2">
                      Recomendado (.png, .jpg, .jpeg)
                    </p>
                    {loadingUpdate && (
                      <p className="text-[13px] text-slate-800 font-bold pt-2">
                        Guardando su foto...
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <div className="flex text-center w-full justify-center">
                      <input
                        accept="image/png, image/jpeg, application/pdf"
                        type="file"
                        ref={avatarRef}
                        className="hidden"
                        onChange={(e) => {
                          handleChangeMedia(e);
                        }}
                      />
                      <div
                        onClick={handleClickRef}
                        className={twMerge([
                          "transition w-[10rem] h-[10rem] rounded-xl border flex flex-col justify-center items-center cursor-pointer",
                          "hover:bg-slate-200",
                        ])}
                      >
                        <MdOutlineMedicalServices size={60} />
                      </div>
                    </div>
                    <p className="text-[13px] text-slate-500 font-medium pt-2">
                      Recomendado (.png, .jpg, .jpeg)
                    </p>
                    {loadingUpdate && (
                      <p className="text-[13px] text-slate-800 font-bold pt-2">
                        Guardando su foto de perfil...
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="lg:flex justify-between items-start relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Servicio
                  <span className="text-primary font-bold">*</span>
                </p>
                <FormInput
                  type="text"
                  value={formData?.name}
                  placeholder="Nombre del Servicio..."
                  className="form-control lg:w-[70%]"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              {/* <div className="lg:flex justify-between items-start relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Categoría
                  <span className="text-primary font-bold">*</span>
                </p>
                <div className="lg:w-[70%]">
                  {userId && (
                    <AutocompleteInputServices
                      defaultValue={formData.service_category_name}
                      onClick={(item) =>
                        setFormData({
                          ...formData,
                          service_category_id: item.id,
                          service_category_name: item.name,
                          service_category_doctor_id: userId
                            ? parseInt(userId, 10)
                            : 0,
                        })
                      }
                      onChange={(item) =>
                        setFormData({
                          ...formData,
                          service_category_id: 0,
                          service_category_name: item,
                          service_category_doctor_id: userId,
                        })
                      }
                      doctorId={userId ? parseInt(userId, 10) : 0}
                      className="form-control w-full"
                    />
                  )}
                </div>
                    </div> */}

              <div className="lg:flex justify-between items-start relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Precio
                </p>
                <NumericFormat
                  value={
                    formData.base_price > 0 ? formData.base_price : undefined
                  }
                  decimalScale={2}
                  prefix={""}
                  placeholder=""
                  thousandSeparator="."
                  decimalSeparator=","
                  onValueChange={(values, sourceInfo) =>
                    setFormData({
                      ...formData,
                      base_price: values.floatValue ? values.floatValue : 0,
                    })
                  }
                  className={twMerge([
                    "disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent text-gray-900 lg:w-[70%]",
                    "[&[readonly]]:bg-gray-300 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
                    "transition duration-200 ease-in-out w-full bg-gray-100 text-sm border-none shadow-sm rounded-md placeholder:text-gray-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-gray-700 dark:focus:ring-opacity-50 dark:placeholder:text-gray-500/80",
                  ])}
                />
              </div>
              <div className="lg:flex justify-between items-start relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Descripción
                </p>
                <div className="lg:w-[70%]">
                  <FormTextarea
                    placeholder="Descripcion el Servicio..."
                    value={formData?.description}
                    className="form-control w-full"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="lg:flex justify-between items-start relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Condiciones
                </p>
                <FormTextarea
                  placeholder="Condiciones del Servicio..."
                  value={formData?.conditions}
                  className="form-control lg:w-[70%]"
                  onChange={(e) =>
                    setFormData({ ...formData, conditions: e.target.value })
                  }
                />
              </div>
              <div className="lg:flex justify-between items-start relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Estado
                </p>
                <div className="lg:w-[70%]">
                  <FormSelect
                    value={formData?.status}
                    className="form-control"
                    onChange={(e) =>
                      setFormData({ ...formData, status: +e.target.value })
                    }
                  >
                    <option value={1}>Activo</option>
                    <option value={2}>Borrador</option>
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
