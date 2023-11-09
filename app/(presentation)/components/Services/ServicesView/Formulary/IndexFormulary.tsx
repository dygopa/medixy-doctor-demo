import { usePathname, useRouter } from "next/navigation";
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import {
  IServicesContext,
  ServicesContext,
} from "../../context/ServicesContext";
import Button from "(presentation)/components/core/BaseComponents/Button";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import {
  getBase64ImageFromUrl,
} from "(presentation)/(helper)/files/filesHelper";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import { ServicesRoutesEnum } from "(presentation)/(routes)/servicesRoutes";
import {
  ILocality,
} from "domain/core/entities/localityEntity";
import {
  IStepByStepContext,
  StepByStepContext,
} from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";
import Steps from "./Steps/Steps";
import Formulary from "./Formulary";
import LocalitiesList from "./Localities/LocalitiesList";

export default function FormularyIndex({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) {
  const pathname = usePathname();

  const { state, actions, dispatch } =
    useContext<IServicesContext>(ServicesContext);
  const { getServiceByBase, updateService, deleteService } =
    actions;
  const { data, loading, successful } = state.getService;
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
  const [steps, setSteps] = useState(0)
  const [ serviceId, setServiceId ] = useState(0);
  const [ services, setServices ] = useState<any[]>([])

  const [formData, setFormData] = useState({
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

  const router = useRouter();

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
      setServiceId(parseInt(id));
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
              loadingUpdate ||
              formData?.name === "" ||
              formData?.base_price === 0
              // formData?.service_category_name.length === 0
            }
            onClick={() => {
              updateService({
                dataService: formData,
                serviceId: data.id,
                servicesChildren: services,
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
      <Steps steps={steps} setSteps={setSteps} />
      {steps === 0 ?
        <Formulary 
          formData={formData}
          setFormData={setFormData}
        />
      :
        <LocalitiesList serviceId={serviceId} userId={userId} services={services} setServices={setServices} />
      }
    </>
  );
}
