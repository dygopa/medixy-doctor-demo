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
  useRef,
} from "react";
import { FiCheck, FiCheckCircle, FiX } from "react-icons/fi";
import { BiBuilding, BiBuildingHouse } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  ILocalitiesContext,
  LocalitiesContext,
} from "../../context/LocalitiesContext";
import {
  ILocality,
  ILocalityService,
} from "domain/core/entities/localityEntity";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { usePathname, useRouter } from "next/navigation";
import AutocompleteInputStates from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputStates/AutocompleteInputStates";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import AutocompleteInputMunicipalities from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputMunicipalities/AutocompleteInputMunicipalities";
import AutocompleteInputLocations from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputLocations/AutocompleteInputLocations";
import { VALIDATE_NUMBERS } from "(presentation)/(utils)/errors-validation";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import Image from "next/image";
import {
  b64toBlob,
  getBase64ImageFromUrl,
} from "(presentation)/(helper)/files/filesHelper";
import { NumericFormat } from "react-number-format";
import { IService } from "domain/core/entities/serviceEntity";

export default function Formulary({
  userId,
  localityId,
}: {
  userId: string;
  localityId: number;
}) {
  const pathname = usePathname();

  const { state, actions, dispatch } =
    useContext<ILocalitiesContext>(LocalitiesContext);
  const {
    gettingUserLocality,
    updateUserLocality,
    getUserBaseServices,
    getUserServices,
  } = actions;
  const { data, loading, successful, error } = state.gettingUserLocality;
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

  let [formData, setFormData] = useState({
    name: "",
    code: "",
    city: "",
    postal_code: "",
    latitude: 0,
    longitude: 0,
    clues: "",
    federalEntity: 0,
    municipality: 0,
    municipalityCatalogId: 0,
    countryLocation: 0,
    street: "",
    address: "",
    isPublic: 1,
    isVirtual: 0,
    media: {
      data: "",
      type: "",
    },
  });

  let [errors, setErrors] = useState({
    postal_code: "",
  });

  const handlePostalCode = (value: string) => {
    setFormData({ ...formData, postal_code: value });
    if (value.length > 0) {
      if (!VALIDATE_NUMBERS(value)) {
        setErrors((previousState) => {
          return {
            ...previousState,
            postal_code: "El código postal solo lleva números",
          };
        });
        return true;
      }
    }
    setErrors({ ...errors, postal_code: "" });
    return false;
  };

  let [loadedStates, setLoadedStates] = useState(false);

  useMemo(() => {
    gettingUserLocality(localityId, userId)(dispatch);
  }, []);

  const setFormDataValues = async () => {
    let imageUrl: any = "";

    if (data.image_url) {
      if (data.image_url.length > 0)
        imageUrl = await getBase64ImageFromUrl(data.image_url);
    }
    setFormData({
      ...formData,
      name: data?.name ?? "",
      code: data?.code ?? "",
      clues: data?.clues ?? "",
      federalEntity: data?.state.id ?? 0,
      municipality: data?.municipalityId ?? 0,
      countryLocation: data?.countryLocationId ?? 0,
      street: data?.street ?? "",
      city: data?.city ?? "",
      postal_code: data?.postal_code ? data.postal_code.toString() : "",
      address: data?.address ?? "",
      latitude: data?.latitude ?? "",
      longitude: data?.longitude ?? "",
      isPublic: data?.is_public ? 1 : 0,
      isVirtual: data?.is_virtual ? 1 : 0,
      media: {
        data: imageUrl.toString().split(",")[1],
        type: data?.type,
      },
    });
  };

  useEffect(() => {
    if (successful) {
      setFormDataValues();
    }
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

  const router = useRouter();

  /*useMemo(() => {
    if (successfulUpdate) window.location.href = "/localities";
  }, [successfulUpdate]);*/

  useMemo(() => {
    if (userId) {
      getUserServices(userId)(dispatch);
      getUserBaseServices(userId)(dispatch);
    }
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

    console.log(services);

    setServices(services);
  };

  useMemo(() => {
    setServicesInList();
  }, [successFulServices, successFulBaseServices]);

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

  const onClickButtonPrincipal: Function = () => {
    router.push(LocalitiesRoutesEnum.Localities);
  };

  function manageAddToList(data: IService) {
    let list: Array<ILocalityService> = [...services];
    if (list.some((elem) => elem["service_id"] === data.id)) {
      list = list.filter((elem) => elem["service_id"] !== data.id);
    } else {
      list.push({
        id: 0,
        service_id: data.id,
        location_id: 0,
        price: 0,
      });
    }
    setServices(list);
  }

  function managePriceChangeInList(value: number, id: number) {
    let index = services.findIndex((elem: any) => elem["service_id"] === id);
    services[index].price = value;
    setServices(services);
  }

  const ServiceComponent = ({ data }: { data: IService }) => {
    let id = data.id;
    let isInList = services.find((elem: any) => elem["service_id"] === data.id);
    let price = 0;
    let isAdded = false;

    if (
      !isInList &&
      servicesData?.length > 0 &&
      typeof servicesData !== "string"
    ) {
      const service = servicesData.find(
        (serviceData) =>
          serviceData.service_parent_id === data.id &&
          serviceData.location_id === localityId
      );

      if (service) {
        isInList = true;
        id = service.id;
        price = service.base_price;
        isAdded = true;
      }
    }

    return (
      <div className="w-full border rounded-sm bg-white p-3 grid grid-cols-2 justify-between items-center gap-2">
        <div className="flex flex-col justify-start items-start text-left">
          <p className="font-normal text-base text-slate-950">{data["name"]}</p>
          {/*  <p className="font-light text-sm text-slate-400">{data.state.name}</p> */}
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="w-3/4 flex flex-col justify-start items-start gap-1 text-left">
            <div className="relative lg:w-[70%]">
              <div className="w-full">
                <NumericFormat
                  value={price && price > 0 ? price : undefined}
                  disabled={!isInList}
                  placeholder="Precio"
                  decimalScale={2}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix={""}
                  onValueChange={(values, sourceInfo) =>
                    managePriceChangeInList(
                      values.floatValue ? values.floatValue : 0,
                      id
                    )
                  }
                  className={twMerge([
                    "disabled:bg-gray-300 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent text-gray-900 form-control w-[100%]",
                    "[&[readonly]]:bg-gray-300 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
                    "transition duration-200 ease-in-out w-full bg-gray-100 text-sm border-none shadow-sm rounded-md placeholder:text-gray-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-gray-700 dark:focus:ring-opacity-50 dark:placeholder:text-gray-500/80",
                  ])}
                />
              </div>

              <div className="absolute right-4 top-2 text-md text-gray-400">
                $
              </div>
            </div>
          </div>

          <div className="w-1/4 flex flex-col justify-center items-center">
            <button
              onClick={() => {
                manageAddToList(data);
              }}
              disabled={isAdded}
              className={twMerge([
                "transition w-8 h-8 cursor-pointer rounded-full text-slate-400 border border-slate-400 flex flex-col justify-center items-center bg-white",
                "hover:bg-primary hover:border-primary hover:text-white",
                isInList && "bg-green-500 border-green-500 text-white",
              ])}
            >
              <FiCheck />
            </button>
          </div>
        </div>
      </div>
    );
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
        description={"Tu consultorio se ha actualizado exitosamente"}
        textButtonPrincipal={"Ir a lista de consultorios"}
        onClickButtonPrincipal={onClickButtonPrincipal}
      />

      <div className="w-full md:flex justify-between items-start sticky top-[67px] z-[50]  bg-slate-100 py-3">
        <h2 className="lg:mr-5 lg:mb-0 mb-4 text-2xl font-bold truncate">
          Actualizar consultorio
        </h2>
        <div className="md:w-[40%] lg:w-[20%] w-full flex justify-center items-center">
          <Button
            disabled={
              loadingUpdate ||
              formData?.postal_code === "" ||
              formData?.name === "" ||
              formData?.city === "" ||
              formData?.federalEntity === 0 ||
              services.length === 0
            }
            onClick={() => {
              updateUserLocality(formData, data.id, services)(dispatch);
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
        <div className="relative lg:flex items-start w-full">
          <div className="bg-white lg:w-[65%] shadow-xl shadow-slate-100 rounded-md h-fit p-7">
            {loading ? (
              <div className="w-full flex flex-col justify-center items-center">
                <p className="font-semibold text-base text-slate-900">
                  Cargando...
                </p>
                <p className="font-light text-sm text-slate-500">
                  Espere mientras se carga la información de la localidad
                </p>
              </div>
            ) : (
              <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
                <div className="w-full border-b mb-2">
                  <p className="font-medium text-base text-slate-900 pb-2">
                    Definición del consultorio
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
                          <BiBuilding size={60} />
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
                    Nombre del consultorio
                    <span className="text-primary font-bold">*</span>
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

                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Código Postal
                    <span className="text-primary font-bold">*</span>
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe el código postal del consultorio..."
                    min={0}
                    value={formData.postal_code}
                    className="form-control lg:w-[70%]"
                    onChange={(e: any) => handlePostalCode(e.target.value)}
                  />
                </div>
                {errors.postal_code.length > 0 && (
                  <span className="text-red-500 w-full text-right -mt-5">
                    {errors.postal_code}
                  </span>
                )}
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
                    Estado <span className="text-primary font-bold">*</span>
                  </p>
                  <div className="lg:w-[70%]">
                    <AutocompleteInputStates
                      defaultValue={data.state?.name ?? ""}
                      setDefaultValue
                      onClick={(item: IFederalEntity) =>
                        setFormData({
                          ...formData,
                          federalEntity: item.entityId,
                          municipality: 0,
                          municipalityCatalogId: 0,
                          countryLocation: 0,
                        })
                      }
                      className="form-control lg:w-full"
                      federalEntityId={formData.federalEntity}
                    />
                  </div>
                  {/* <FormSelect
                  className="form-control lg:w-[70%]"
                  defaultValue={formData.federalEntity}
                  value={formData.federalEntity}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      federalEntity: parseInt(e.target.value),
                    })
                  }
                >
                  {federalEntities.map((elem) => (
                    <option key={elem.entityId} value={elem.entityId}>
                      {elem.nameEntity}
                    </option>
                  ))}
                  </FormSelect> */}
                </div>

                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Municipio
                  </p>
                  <div className="lg:w-[70%]">
                    <AutocompleteInputMunicipalities
                      onClick={(item: IMunicipality) =>
                        setFormData({
                          ...formData,
                          municipality: item.id,
                          municipalityCatalogId: item.catalogId,
                          countryLocation: 0,
                        })
                      }
                      disabled={formData.federalEntity === 0}
                      className="form-control lg:w-full"
                      municipalityId={formData.municipality}
                      federalEntityId={formData.federalEntity}
                    />
                  </div>
                  {/*<FormSelect
                  className="form-control lg:w-[70%]"
                  disabled={formData.federalEntity === 0}
                  defaultValue={formData.municipality}
                  value={formData.municipality}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      municipality: parseInt(e.target.value),
                    })
                  }
                >
                  <option>NO ESPECIFICADO</option>
                  {municipalities.data?.map((elem: IMunicipality) => (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  ))}
                  </FormSelect> */}
                </div>

                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Colonia
                  </p>

                  <div className="lg:w-[70%]">
                    <AutocompleteInputLocations
                      onClick={(item: ICountryLocation) =>
                        setFormData({ ...formData, countryLocation: item.id })
                      }
                      disabled={formData.municipality === 0}
                      className="form-control lg:w-full"
                      municipalityId={formData.municipality}
                      federalEntityId={formData.federalEntity}
                      countryLocationId={formData.countryLocation}
                    />
                  </div>
                  {/*  <FormSelect
                  className="form-control lg:w-[70%]"
                  disabled={formData.municipality === 0}
                  defaultValue={formData.countryLocation}
                  value={formData.countryLocation}
                  onChange={(e: any) =>
                    setFormData({
                      ...formData,
                      countryLocation: parseInt(e.target.value),
                    })
                  }
                >
                  <option>NO ESPECIFICADO</option>
                  {countryLocations.data?.map((elem: ICountryLocation) => (
                    <option key={elem.id} value={elem.id}>
                      {elem.name}
                    </option>
                  ))}
                  </FormSelect> */}
                </div>

                <div className="lg:flex justify-between items-center relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Ciudad <span className="text-primary font-bold">*</span>
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe la ciudad del consultorio..."
                    min={0}
                    defaultValue={formData.city}
                    className="form-control lg:w-[70%]"
                    onChange={(e: any) => {
                      setFormData({ ...formData, city: e.target.value });
                    }}
                  />
                </div>

                <div className="lg:flex justify-between items-center relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Calle
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe la calle..."
                    min={0}
                    defaultValue={formData.street}
                    className="form-control lg:w-[70%]"
                    onChange={(e: any) => {
                      setFormData({ ...formData, street: e.target.value });
                    }}
                  />
                </div>
                {/*<div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Dirección<span className="text-primary font-bold">*</span>
                  </p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe la dirección del consultorio..."
                    min={0}
                    value={formData?.address}
                    className="form-control lg:w-[70%]"
                    onChange={(e: any) => {
                      setFormData({ ...formData, address: e.target.value });
                    }}
                  />
                  </div>*/}
              </div>
            )}
          </div>
          <div className="bg-white lg:w-[40%] shadow-xl shadow-slate-100 rounded-md h-fit p-7 lg:ml-4 ml-0 mt-5 lg:mt-0">
            <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
              <div className="w-full border-b mb-2 flex flex-col justify-between items-start gap-1 pb-3">
                <p className="font-medium text-base text-slate-900">
                  Servicios(*)
                </p>
                <p className="font-light text-sm text-slate-500">
                  Indica los servicios que prestaras en este consultorio
                </p>
              </div>
              {servicesBaseData?.length === 0 && successFulBaseServices && (
                <div className="w-full flex flex-col justify-center items-center text-center">
                  <p className="font-bold text-slate-900 text-lg">
                    Vaya, no tienes servicios aún
                  </p>
                  <p className="font-light text-slate-500 text-base">
                    Lo sentimos, pero en la plataforma no hay servicios todavia.
                  </p>
                </div>
              )}
              {servicesBaseData?.length > 0 &&
                successFulBaseServices &&
                [...(servicesBaseData as Array<IService>)].map((l, i) => (
                  <ServiceComponent data={l} key={i} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
