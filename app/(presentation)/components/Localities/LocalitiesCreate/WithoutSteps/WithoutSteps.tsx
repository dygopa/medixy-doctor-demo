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
  ChangeEvent,
  useMemo,
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
import { ILocality } from "domain/core/entities/localityEntity";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import {
  IStepByStepContext,
  StepByStepContext,
} from "(presentation)/components/core/StepByStep/context/StepByStepContext";
import { VALIDATE_NUMBERS } from "(presentation)/(utils)/errors-validation";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import { useRouter } from "next/navigation";
import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import AutocompleteInputStates from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputStates/AutocompleteInputStates";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import AutocompleteInputMunicipalities from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputMunicipalities/AutocompleteInputMunicipalities";
import AutocompleteInputLocations from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputLocations/AutocompleteInputLocations";
import Image from "next/image";
import { b64toBlob } from "(presentation)/(helper)/files/filesHelper";
import { BsBuilding } from "react-icons/bs";

export default function WithoutSteps({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) {
  const { state, actions, dispatch } =
    useContext<ILocalitiesContext>(LocalitiesContext);

  const {
    createUserLocality,
    getFederalEntities,
    getMunicipalities,
    getCountryLocations,
  } = actions;

  const {
    loading: createUserLocalityLoading,
    successful: createUserLocalitySuccess,
    error: createUserLocalityError,
  } = state.createUserLocality;

  const { actions: actionsStep, dispatch: dispatchStep } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { createUserSteps } = actionsStep;

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    postal_code: "",
    city: "",
    clues: "",
    latitude: 0,
    longitude: 0,
    federalEntity: 0,
    municipality: 0,
    municipalityCatalogId: 0,
    countryLocation: 0,
    isVirtual: 0,
    isPublic: 1,
    street: "",
    address: "",
    media: {
      data: "",
      type: "",
    },
  });

  const router = useRouter();

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

  const [loadedStates, setLoadedStates] = useState(false);

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
    if (createUserLocalitySuccess) {
      createUserSteps(accountId, "LOCATION_CREATED")(dispatchStep);
    }
  }, [createUserLocalitySuccess]);

  const onClickButtonPrincipal: Function = () => {
    router.push(LocalitiesRoutesEnum.Localities);
  };

  return (
    <>
      <AlertComponent
        variant="error"
        show={createUserLocalityError !== null}
        description="Ha ocurrido un error inesperado en la creación"
      />
      <SuccessfulComponent
        tittle="Agregado con exito"
        show={createUserLocalitySuccess}
        description={"Tu consultorio se ha creado exitosamente"}
        textButtonPrincipal={"Ir a lista de consultorios"}
        onClickButtonPrincipal={onClickButtonPrincipal}
      />

      <div className="w-full md:flex justify-between items-center sticky top-[67px] z-[50] border-b bg-slate-100 py-2">
        <div className="lg:mr-5 mb-4 md:mb-0">
          <h2 className=" text-2xl font-bold truncate">Nuevo consultorio</h2>
        </div>
        <Button
          className="w-full md:w-fit"
          disabled={
            createUserLocalityLoading ||
            formData?.name === "" ||
            formData?.postal_code === "" ||
            formData?.city === ""
          }
          onClick={() => {
            createUserLocality({ ...formData, id: userId })(dispatch);
          }}
          variant="primary"
        >
          {createUserLocalityLoading ? "Creando..." : "Crear consultorio"}
        </Button>
      </div>
      <div className="flex justify-center items-center lg:mt-5 mt-8">
        <div className="relative flex justify-center items-start gap-4 w-full lg:w-[70%]">
          <div className="bg-white w-full shadow-xl shadow-slate-100 rounded-md h-fit p-7">
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
              <div className="lg:flex justify-between items-center relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Nombre del consultorio
                  <span className="text-primary font-bold">*</span>
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Escribe el nombre del consultorio..."
                  min={0}
                  value={formData.name}
                  className="form-control lg:w-[70%]"
                  onChange={(e: any) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                />
              </div>
              <div className="lg:flex justify-between items-center relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Tipo de consultorio{" "}
                  <span className="text-primary font-bold">*</span>
                </p>
                <FormSelect
                  className="form-control lg:w-[70%]"
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
              <div className="lg:flex justify-between items-center relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Sector <span className="text-primary font-bold">*</span>
                </p>
                <FormSelect
                  className="form-control lg:w-[70%]"
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

              <div className="lg:flex justify-between items-center relative w-full gap-3">
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
              <div className="lg:flex justify-between items-center relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  CLUES
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Escribe el CLUES del consultorio..."
                  min={0}
                  value={formData.clues}
                  className="form-control lg:w-[70%]"
                  onChange={(e: any) => {
                    setFormData({ ...formData, clues: e.target.value });
                  }}
                />
              </div>
              <div className="lg:flex justify-between items-center relative w-full gap-3">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Estado
                  <span className="text-primary font-bold">*</span>
                </p>
                <div className="lg:w-[70%]">
                  <AutocompleteInputStates
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

              <div className="lg:flex justify-between items-center relative w-full gap-3">
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

              <div className="lg:flex justify-between items-center relative w-full gap-3">
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
                    municipalityId={formData.municipalityCatalogId}
                    federalEntityId={formData.federalEntity}
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
                  value={formData.city}
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
              {/*<div className="lg:flex justify-between items-center relative w-full gap-3 mb-4">
                <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                  Dirección
                  <span className="text-primary font-bold">*</span>
                </p>
                <FormInput
                  type={"text"}
                  placeholder="Escribe la dirección del consultorio..."
                  min={0}
                  value={formData.address}
                  className="form-control lg:w-[70%]"
                  onChange={(e: any) => {
                    setFormData({ ...formData, address: e.target.value });
                  }}
                />
                </div>*/}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
