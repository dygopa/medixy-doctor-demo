import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import {
  useState,
  useEffect,
  useContext,
  useMemo,
  ChangeEvent,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { BiBuilding } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  ILocalitiesContext,
  LocalitiesContext,
} from "../../context/LocalitiesContext";
import Image from "next/image";
import {
  b64toBlob,
  getBase64ImageFromUrl,
} from "(presentation)/(helper)/files/filesHelper";
import AddressAutocomplete from "(presentation)/components/core/BaseComponents/Autocomplete/AddressAutocomplete/AddressAutocomplete";
import Steps from "../Steps/Steps";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import { useRouter } from "next/navigation";

export default function Formulary({
  userId,
  localityId,
  step,
  setStep,
  dataFormData,
  addressData,
  setData,
  setAddressData,
}: {
  userId: string;
  localityId: number;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  dataFormData: any;
  setData: any;
  addressData: any;
  setAddressData: any;
}) {
  const { state, actions, dispatch } =
    useContext<ILocalitiesContext>(LocalitiesContext);
  const {
    gettingUserLocality,
    getUserBaseServices,
    getUserServices,
    updateUserLocality,
  } = actions;
  const { data, loading, successful } = state.gettingUserLocality;

  const {
    data: dataUpdate,
    loading: loadingUpdate,
    successful: successfulUpdate,
    error: errorUpdate,
  } = state.updateUserLocality;
  const {
    data: servicesBaseData,
    loading: loadingBaseServices,
    error: errorBaseServices,
    successful: successFulBaseServices,
  } = state.getUserBaseServices;
  const {
    data: servicesData,
    loading: loadingServices,
    error: errorServices,
    successful: successFulServices,
  } = state.getUserServices;

  const [services, setServices] = useState<any>([]);

  const router = useRouter();

  let [formData, setFormData] = useState({
    name: "",
    code: "",
    latitude: 0,
    longitude: 0,
    isVirtual: 0,
    isPublic: 1,
    media: {
      data: "",
      type: "",
    },
  });

  const [address, setAddress] = useState({
    postal_code: "",
    city: "",
    clues: "",
    federalEntity: 0,
    municipality: 0,
    municipalityCatalogId: 0,
    countryLocation: "",
    street: "",
    address: "",
  });

  useMemo(() => {
    if (!data?.id) gettingUserLocality(localityId, userId)(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const setFormDataValues = async () => {
    let imageUrl: any = "";

    if (data.image_url) {
      if (data.image_url.length > 0)
        imageUrl = await getBase64ImageFromUrl(data.image_url);
    }
    console.log("aca");
    setFormData({
      ...formData,
      name: data?.name ?? "",
      code: data?.code ?? "",
      latitude: data?.latitude ?? "",
      longitude: data?.longitude ?? "",
      isPublic: data?.is_public ? 1 : 0,
      isVirtual: data?.is_virtual ? 1 : 0,
      media: {
        data: imageUrl.toString().split(",")[1],
        type: data?.type,
      },
    });
    setAddress({
      ...address,
      clues: data?.address.clues ?? "",
      federalEntity: data?.address?.state?.id ?? 0,
      municipality: data?.address.municipalityId ?? 0,
      countryLocation: data?.address.countryLocation ?? "",
      street: data?.address.street ?? "",
      city: data?.address.city ?? "",
      postal_code: data?.address.postal_code
        ? data.address.postal_code.toString()
        : "",
      address: data?.address.address ?? "",
    });

    setData({
      ...dataFormData,
      name: data?.name ?? "",
      code: data?.code ?? "",
      latitude: data?.latitude ?? "",
      longitude: data?.longitude ?? "",
      isPublic: data?.is_public ? 1 : 0,
      isVirtual: data?.is_virtual ? 1 : 0,
      media: {
        data: imageUrl.toString().split(",")[1],
        type: data?.type,
      },
    });
    setAddressData({
      ...addressData,
      clues: data?.address.clues ?? "",
      federalEntity: data?.address?.state?.id ?? 0,
      municipality: data?.address.municipalityId ?? 0,
      countryLocation: data?.address.countryLocation ?? "",
      street: data?.address.street ?? "",
      city: data?.address.city ?? "",
      postal_code: data?.address.postal_code
        ? data.address.postal_code.toString()
        : "",
      address: data?.address.address ?? "",
    });
  };

  useEffect(() => {
    if (successful) {
      setFormDataValues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  let avatarRef = useRef<HTMLInputElement>(null);

  const handleClickRef = () => avatarRef.current && avatarRef.current.click();

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
    if (userId) {
      getUserServices(userId)(dispatch);
      getUserBaseServices(userId)(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const setServicesInList = () => {
    if (
      typeof servicesData === "string" ||
      typeof servicesBaseData === "string"
    )
      return;

    const services: any[] = [];

    if (
      servicesData &&
      servicesBaseData &&
      servicesData?.length > 0 &&
      servicesBaseData?.length > 0
    ) {
      servicesBaseData.forEach((serviceBaseData) => {
        const service = servicesData.find(
          (serviceData) =>
            serviceData.service_parent_id === serviceBaseData.id &&
            serviceData.location_id === localityId
        );

        if (service) {
          services.push({
            id: 0,
            service_id: service.id,
            location_id: localityId,
            price: service.base_price,
          });
        }
      });
    }

    setServices(services);
  };

  useMemo(() => {
    setServicesInList();
  }, [successFulServices, successFulBaseServices]);

  const onClickButtonPrincipal: Function = () => {
    router.push(LocalitiesRoutesEnum.Localities);
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">Un momento</p>
        <p className="font-light text-slate-500 text-base">
          Cargando la Localidad
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
      <SuccessfulComponent
        tittle="Actualizado con exito"
        show={successfulUpdate}
        description={"Tu consultorio se ha actualizado exitosamente"}
        textButtonPrincipal={"Ir a lista de consultorios"}
        onClickButtonPrincipal={onClickButtonPrincipal}
      />
      <div className="w-full md:flex justify-between items-start sticky top-[67px] z-[50]  bg-slate-100 py-3">
        <h2 className="lg:mr-5 lg:mb-0 mb-4 text-2xl font-bold truncate">
          Actualizar Consultorio
        </h2>
        <div className="md:w-[40%] lg:w-[20%] w-full flex justify-center items-center">
          <Button
            disabled={
              loadingUpdate ||
              address?.postal_code === "" ||
              formData?.name === "" ||
              address?.federalEntity === 0
            }
            onClick={() => {
              updateUserLocality(
                { ...formData, address },
                data.id,
                services
              )(dispatch);
            }}
            variant="primary"
            className="w-full"
          >
            {loadingUpdate ? "Actualizando..." : "Actualizar"}
          </Button>
        </div>
      </div>
      <div>
        <Steps steps={step} setSteps={setStep} />
      </div>
      <div className="flex justify-center mt-5 w-full">
        <div className="relative flex justify-center w-full">
          <div className="bg-white lg:w-[65%] shadow-xl shadow-slate-100 rounded-md h-fit p-7">
            {loading ? (
              <div className="w-full flex flex-col justify-center items-center">
                <p className="font-semibold text-base text-slate-900">
                  Cargando
                </p>
                <p className="font-light text-sm text-slate-500">
                  Espere mientras se carga la información de la localidad
                </p>
              </div>
            ) : (
              <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
                <div className="w-full border-b mb-2">
                  <p className="font-medium text-base text-slate-900 pb-2">
                    Definición del Consultorio
                  </p>
                </div>
                <div className="text-center relative w-full gap-3">
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
                          <BiBuilding size={60} />
                        </div>
                      </div>
                      <p className="text-[13px] text-slate-500 font-medium pt-2">
                        Recomendado (.png, .jpg, .jpeg)
                      </p>
                    </>
                  )}
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Nombre del Consultorio
                    <span className="text-primary font-bold">*</span>
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe el nombre del consultorio"
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
                    Tipo de consultorio{" "}
                    <span className="text-primary font-bold">*</span>
                  </p>
                  <FormSelect
                    className="form-control lg:w-[70%]"
                    defaultValue={formData.isVirtual}
                    value={formData.isVirtual}
                    onChange={(e: any) =>
                      setFormData({
                        ...formData,
                        isVirtual: +e.target.value,
                      })
                    }
                  >
                    <option value={0}>Físico</option>
                    <option value={1}>Virtual</option>
                  </FormSelect>
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Sector <span className="text-primary font-bold">*</span>
                  </p>
                  <FormSelect
                    className="form-control lg:w-[70%]"
                    defaultValue={formData.isPublic}
                    value={formData.isPublic}
                    onChange={(e: any) =>
                      setFormData({
                        ...formData,
                        isPublic: +e.target.value,
                      })
                    }
                  >
                    <option value={1}>Público</option>
                    <option value={0}>Privado</option>
                  </FormSelect>
                </div>

                <AddressAutocomplete
                  formData={address}
                  setFormData={setAddress}
                  federalEntityId={address.federalEntity}
                  municipalityId={address.municipality}
                  municipalityCatalogId={address.municipalityCatalogId}
                  location={address.countryLocation}
                  postalCode={address.postal_code}
                  showPostalCode
                />

                <div className="lg:flex justify-between items-center relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Calle
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe la calle"
                    min={0}
                    defaultValue={address.street}
                    className="form-control lg:w-[70%]"
                    onChange={(e: any) => {
                      setAddress({ ...address, street: e.target.value });
                    }}
                  />
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    CLUES
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe el CLUES del consultorio"
                    min={0}
                    value={address?.clues}
                    className="form-control lg:w-[70%]"
                    onChange={(e: any) => {
                      setAddress({ ...address, clues: e.target.value });
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
