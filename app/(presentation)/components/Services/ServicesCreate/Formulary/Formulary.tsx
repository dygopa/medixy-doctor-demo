import Button from "(presentation)/components/core/BaseComponents/Button";
/* import { ClassicEditor } from "(presentation)/components/core/BaseComponents/Ckeditor"; */
import {
  FormInput,
  FormSelect,
  FormTextarea,
  FormSwitch,
} from "(presentation)/components/core/BaseComponents/Form";
import { IService } from "domain/core/entities/serviceEntity";
import { useState, useEffect, useContext, useMemo, ChangeEvent } from "react";
import { FiCheck } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import {
  IServicesContext,
  ServicesContext,
} from "../../context/ServicesContext";
import { ILocality } from "domain/core/entities/localityEntity";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import {
  IStepByStepContext,
  StepByStepContext,
} from "(presentation)/components/core/StepByStep/context/StepByStepContext";

interface ILocalityService {
  service_id: number;
  location_id: number;
  price: number;
}

export default function Formulary({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) {
  const { state, actions, dispatch } =
    useContext<IServicesContext>(ServicesContext);
  const { createUserService, getCategories, getUserMedicalCenters } = actions;

  const {
    data: creationServiceData,
    loading: loadingCreationService,
    error: errorCreationService,
    successful: successFulCreationService,
  } = state.createUserService;

  const {
    data: medicalCenters,
    loading: loadingMedicalCenters,
    error: errorMedicalCenters,
    successful: successFulMedicalCenters,
  } = state.getUserMedicalCenters;

  const { data: categories } = state.getCategories;

  const { actions: actionsStep, dispatch: dispatchStep } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { createUserSteps } = actionsStep;

  const [loadedListOfTimes, setLoadedListOfTimes] = useState(false);
  const [loadedAPI, setLoadedAPI] = useState(false);

  const [tags, setTags] = useState(["1", "2"]);
  let [localities, setLocalities] = useState<Array<ILocalityService>>([]);

  const [formData, setFormData] = useState({
    name: "",
    service_category_id: 0,
    description: "",
    conditions: "",
    base_price: 0,
    status: 1,
    media: {
      data: "",
      type: "",
    },
  });

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

  function manageAddToList(data: ILocality) {
    let list: Array<ILocalityService> = [...localities];
    if (list.some((elem) => elem["location_id"] === data.id)) {
      list = list.filter((elem) => elem["location_id"] !== data.id);
    } else {
      list.push({
        service_id: 0,
        location_id: data.id,
        price: formData.base_price,
      });
    }
    setLocalities(list);
  }

  function managePriceChangeInList(value: number, id: number) {
    let index = localities.findIndex((elem) => elem["location_id"] === id);
    localities[index].price = value;
    setLocalities(localities);
  }

  const LocalityComponent = ({ data }: { data: ILocality }) => {
    let isInList = localities.find((elem) => elem["location_id"] === data.id);

    return (
      <div className="w-full border rounded-sm bg-white p-3 grid grid-cols-2 justify-between items-center gap-2">
        <div className="flex flex-col justify-start items-start text-left">
          <p className="font-normal text-base text-slate-950">{data["name"]}</p>
          <p className="font-light text-sm text-slate-400">{data.state.name}</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="w-3/4 flex flex-col justify-start items-start gap-1 text-left">
            <FormInput
              defaultValue={isInList?.price}
              disabled={!isInList}
              type={"number"}
              placeholder="Precio"
              min={0}
              className="form-control w-[100%]"
              onChange={(e) =>
                managePriceChangeInList(+e.target.value, data.id)
              }
            />
          </div>
          <div className="w-1/4 flex flex-col justify-center items-center">
            <span
              onClick={() => {
                manageAddToList(data);
              }}
              className={twMerge([
                "transition w-8 h-8 cursor-pointer rounded-full text-slate-400 border border-slate-400 flex flex-col justify-center items-center bg-white",
                "hover:bg-primary hover:border-primary hover:text-white",
                isInList && "bg-green-500 border-green-500 text-white",
              ])}
            >
              <FiCheck />
            </span>
          </div>
        </div>
      </div>
    );
  };

  const loadAPI = () => {
    getCategories()(dispatch);
    setLoadedAPI(true);
  };

  useMemo(() => {
    if (successFulCreationService) {
      createUserSteps(accountId, "SERVICE_CREATED")(dispatchStep);
      setTimeout(() => {
        window.location.href = "/services";
      }, 1000);
    }
  }, [successFulCreationService]);

  useMemo(() => {
    if (userId) getUserMedicalCenters(userId)(dispatch);
  }, [userId]);

  useEffect(() => {
    loadAPI();
  }, [loadedAPI]);

  return (
    <>
      <AlertComponent
        variant="error"
        show={errorCreationService !== null}
        description="Ha ocurrido un error inesperado en la creación"
      />
      <AlertComponent
        variant="success"
        show={successFulCreationService}
        description="Tu servicio se ha creado exitosamente"
      />

      <div className="w-full md:flex justify-between items-start sticky top-[67px] z-[50] bg-slate-100 py-2">
        <h2 className="lg:mr-5 lg:mb-0 mb-4 text-2xl font-bold truncate">
          Nuevo servicio
        </h2>
        <div className="lg:w-[40%] flex justify-end items-center lg:gap-8 gap-2">
          <Button
            disabled={
              loadingCreationService ||
              localities.length === 0 ||
              formData.service_category_id === 0 ||
              formData.name === ""
            }
            onClick={() => {
              createUserService(
                { ...formData, id: userId },
                localities
              )(dispatch);
              //console.log(localities, {...formData, id: userId})
            }}
            variant="primary"
            className="lg:w-1/2 px-7"
          >
            {loadingCreationService ? "Creando..." : "Crear servicio"}
          </Button>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="relative lg:flex gap-4 w-full ">
          <div className="bg-white lg:w-[60%] shadow-xl shadow-slate-100 rounded-md h-fit p-5 lg:mb-0 mb-8">
            <div className="border w-full rounded-md p-5 flex">
              <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
                <div className="w-full border-b mb-2">
                  <p className="font-medium text-base text-slate-900 pb-2">
                    Definición del servicio
                  </p>
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Categoría
                    <span className="text-primary font-bold">*</span>
                  </p>
                  <FormSelect
                    value={formData.service_category_id}
                    className="form-control lg:w-[70%]"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        service_category_id: +e.target.value,
                      })
                    }
                  >
                    <option value="">Seleccione la categoria</option>
                    {categories &&
                      [...(categories as Array<any>)].map((elem, i) => (
                        <option key={i} value={elem["id"]}>
                          {elem["name"]}
                        </option>
                      ))}
                  </FormSelect>
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Servicio
                    <span className="text-primary font-bold">*</span>
                  </p>
                  <FormInput
                    type="text"
                    value={formData.name}
                    placeholder="Nombre del servicio..."
                    className="form-control lg:w-[70%]"
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Cargar imagen
                  </p>
                  <FormInput
                    type="file"
                    className="form-control lg:w-[70%]"
                    onChange={(e) => handleChangeMedia(e)}
                  />
                </div>
                {/* <div className="flex justify-between items-start relative w-full gap-3">
                                    <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">Etiquetas</p>
                                    <FormInput
                                        type={"text"}
                                        placeholder="Salud"
                                        min={0}
                                        value={formData["tag"]}
                                        className="form-control w-[70%]"
                                        onChange={(e) =>
                                            setFormData({ ...formData, tag: e.target.value })
                                        }
                                    />
                                </div> */}
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Precio
                  </p>
                  <FormInput
                    type={"number"}
                    placeholder="0.0"
                    min={0}
                    value={formData.base_price}
                    className="form-control lg:w-[70%]"
                    onChange={(e) =>
                      setFormData({ ...formData, base_price: +e.target.value })
                    }
                  />
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Descripción
                  </p>
                  <div className="lg:w-[70%]">
                    {/* <ClassicEditor
                                            value={formData.description}
                                            onChange={(e: any) => setFormData({ ...formData, description: e })}
                                        /> */}
                    <FormTextarea
                      placeholder="Descripcion el servicio..."
                      value={formData.description}
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
                    placeholder="Condiciones el servicio..."
                    value={formData.conditions}
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
                  <FormSelect
                    value={formData.status}
                    className="form-control lg:w-[70%]"
                    onChange={(e) =>
                      setFormData({ ...formData, status: +e.target.value })
                    }
                  >
                    <option value="">Estado del servicio</option>
                    <option value={1}>Activo</option>
                    <option value={2}>Borrador</option>
                  </FormSelect>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white lg:w-[40%] shadow-xl shadow-slate-100 rounded-md h-fit p-5">
            <div className="border w-full rounded-md p-5 flex">
              <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
                <div className="w-full border-b mb-2 flex flex-col justify-between items-start gap-1 pb-3">
                  <p className="font-medium text-base text-slate-900">
                    Consultorios(*)
                  </p>
                  <p className="font-light text-sm text-slate-500">
                    Indica los consultorios donde prestas este servicio y ajusta
                    el precio si es requerido
                  </p>
                </div>
                {medicalCenters?.length === 0 && successFulMedicalCenters && (
                  <div className="w-full flex flex-col justify-center items-center text-center">
                    <p className="font-bold text-slate-900 text-lg">
                      Vaya, no tienes consultorios aún
                    </p>
                    <p className="font-light text-slate-500 text-base">
                      Lo sentimos, pero en la plataforma no hay centros médicos
                      todavia.
                    </p>
                  </div>
                )}
                {medicalCenters?.length > 0 &&
                  successFulMedicalCenters &&
                  [...(medicalCenters as Array<ILocality>)].map((l, i) => (
                    <LocalityComponent data={l} key={i} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
