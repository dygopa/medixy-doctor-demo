import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import { ScheduleRoutesEnum } from "(presentation)/(routes)/scheduleRoutes";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import Tooltip from "(presentation)/components/core/BaseComponents/Tooltip/Tooltip";
import {
  IStepByStepContext,
  StepByStepContext,
} from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";
import {
  ILocalitiesContext,
  LocalitiesContext,
} from "(presentation)/components/Localities/context/LocalitiesContext";
import { IService } from "domain/core/entities/serviceEntity";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { FiCheck } from "react-icons/fi";
import { NumericFormat } from "react-number-format";
import { twMerge } from "tailwind-merge";

export default function Services({
  userId,
  accountId,
  formData,
  address,
  setStep,
}: {
  userId: string;
  accountId: string;
  formData: any;
  address: any;
  setStep: Dispatch<SetStateAction<number>>;
}) {
  const { state, actions, dispatch } =
    useContext<ILocalitiesContext>(LocalitiesContext);

  const { createUserLocality, getUserBaseServices } = actions;

  const {
    data: locality,
    loading: createUserLocalityLoading,
    successful: createUserLocalitySuccess,
    error: createUserLocalityError,
  } = state.createUserLocality;

  const {
    data: servicesData,
    loading: loadingServices,
    error: errorServices,
    successful: successFulServices,
  } = state.getUserBaseServices;

  const {
    actions: actionsStep,
    state: stateSteps,
    dispatch: dispatchStep,
  } = useContext<IStepByStepContext>(StepByStepContext);
  const { createUserSteps, changeOpenPopup } = actionsStep;
  const {
    successful: stepSucessful,
    error: stepNotCreated,
    loading: creatingStep,
  } = stateSteps.createUserSteps;

  const [services, setServices] = useState<any>([]);
  const [inputIndex, setInputIndex] = useState(0);
  const [showServicesError, setShowServicesError] = useState(false);
  const [successfulPopup, setSuccessfulPopup] = useState(false);

  const router = useRouter();

  useMemo(() => {
    if (stepNotCreated) {
      setSuccessfulPopup(true);
    }

    if (stepSucessful) {
      setStep(0);
      changeOpenPopup(true)(dispatchStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepSucessful, stepNotCreated]);

  useMemo(() => {
    if (createUserLocalitySuccess) {
      createUserSteps(accountId, "LOCATION_CREATED")(dispatchStep);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createUserLocalitySuccess]);

  const onCreateUserLocality = () => {
    if (services.length === 0) {
      setShowServicesError(true);

      setTimeout(() => {
        setShowServicesError(false);
      }, 3000);
      return;
    }

    const servicesPrices = services.filter(
      (serviceFind: any) => serviceFind["price"] > 0
    );

    if (!servicesPrices || servicesPrices.length === 0) {
      setShowServicesError(true);

      setTimeout(() => {
        setShowServicesError(false);
      }, 3000);
      return;
    }

    createUserLocality(
      { ...formData, address: address, id: userId },
      servicesPrices
    )(dispatch);
  };

  const getDisabledButton = () => {
    if (showServicesError) return true;

    if (services.length === 0) {
      return true;
    }

    return false;
  };

  const onClickButtonPrincipal: Function = () => {
    router.push(ScheduleRoutesEnum.Configuration + `?locality=${locality.id}`);
  };

  const onClickButtonSecondary: Function = () => {
    router.push(LocalitiesRoutesEnum.Localities);
  };

  function manageAddToList(serviceId: any, price: any, serviceParentId: any) {
    let list: any = [...services];
    if (list.some((elem: any) => elem["service_id"] === serviceId)) {
      list = list.filter((elem: any) => elem["service_id"] !== serviceId);
    } else {
      list.push({
        id: 0,
        service_id: serviceId,
        location_id: 0,
        price: price,
        service_parent_id: serviceParentId,
        has_error: false,
      });
    }

    setServices(list);
  }

  function managePriceChangeInList(
    price: number,
    serviceId: number,
    serviceParentId: any
  ) {
    let list: any = [...services];
    const serviceIndex = list.findIndex(
      (serviceFind: any) => serviceFind["service_id"] === serviceId
    );

    if (serviceIndex >= 0) {
      list[serviceIndex].price = price;
      setServices(list);
      return;
    }

    list.push({
      id: 0,
      service_id: serviceId,
      location_id: 0,
      price: price,
      service_parent_id: serviceParentId,
      has_error: false,
    });
    setServices(list);
  }

  const ServiceComponent = ({ data, i }: { data: IService; i: number }) => {
    let isInList = services.find((elem: any) => elem["service_id"] === data.id);

    return (
      <div className="w-full border rounded-sm bg-white p-3 grid grid-cols-2 justify-between items-center gap-2">
        <div className="text-left group relative">
          <p className="font-normal text-[14px] text-slate-950 truncate">
            {data["name"]}
          </p>
          <Tooltip>{data["name"]}</Tooltip>
          {/*  <p className="font-light text-sm text-slate-400">{data.state.name}</p> */}
        </div>
        <div className="flex justify-between items-center gap-2">
          <div className="w-full flex flex-col justify-start items-start gap-1 text-left">
            <div className="relative w-full">
              <div className="w-full">
                <NumericFormat
                  autoFocus={inputIndex === i}
                  onFocus={() => setInputIndex(i)}
                  value={
                    isInList?.price && isInList.price > 0
                      ? isInList.price
                      : undefined
                  }
                  placeholder="Precio"
                  decimalScale={2}
                  defaultValue={""}
                  thousandSeparator="."
                  decimalSeparator=","
                  prefix={""}
                  onValueChange={(values, sourceInfo) => {
                    /* manageAddToList(
                      data.id,
                      isInList?.price ? isInList.price : data.base_price,
                      data.id
                    ); */

                    managePriceChangeInList(
                      values.floatValue && values.floatValue > 0
                        ? values.floatValue
                        : 0,
                      data.id,
                      data.id
                    );
                  }}
                  className={twMerge([
                    "disabled:bg-gray-300 text-right pl-7 disabled:cursor-not-allowed dark:disabled:bg-darkmode-800/50 dark:disabled:border-transparent text-gray-900 form-control w-[100%]",
                    "[&[readonly]]:bg-gray-300 [&[readonly]]:cursor-not-allowed [&[readonly]]:dark:bg-darkmode-800/50 [&[readonly]]:dark:border-transparent",
                    "transition duration-200 ease-in-out w-full bg-gray-100 text-sm border-none shadow-sm rounded-md placeholder:text-gray-400/90 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40 dark:bg-darkmode-800 dark:border-transparent dark:focus:ring-gray-700 dark:focus:ring-opacity-50 dark:placeholder:text-gray-500/80",
                  ])}
                />
              </div>

              <div className="absolute left-2 top-2 text-md text-gray-400">
                $
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <AlertComponent
        variant="error"
        show={createUserLocalityError !== null}
        description="Ha ocurrido un error inesperado en la creación"
      />
      <AlertComponent
        variant="error"
        show={showServicesError}
        description="Debe colocar un precio por lo minimo a un servicio para este consultorio"
      />
      <SuccessfulComponent
        tittle="Agregado con exito"
        show={successfulPopup}
        description={
          "Tu consultorio se ha creado exitosamente. Ahora puedes configurar su agenda."
        }
        textButtonPrincipal={"Ir a configurar la agenda"}
        onClickButtonPrincipal={onClickButtonPrincipal}
        textButtonSecondary={"Ir a la lista de consultorios"}
        onClickButtonSecondary={onClickButtonSecondary}
      />
      <div className="w-full md:flex justify-between items-center sticky top-[67px] z-[50] border-b bg-slate-100 py-2">
        <div className="lg:mr-5 mb-4 md:mb-0">
          <h2 className=" text-2xl font-bold truncate">Nuevo Consultorio</h2>
        </div>

        <Button
          className="w-full md:w-fit"
          disabled={getDisabledButton()}
          onClick={() => {
            onCreateUserLocality();
          }}
          variant="primary"
        >
          <Lucide icon="Plus" className="mr-2" />
          {createUserLocalityLoading ? "Creando..." : "Crear Consultorio"}
        </Button>
      </div>

      <button
        type="button"
        className="flex items-center mt-3"
        onClick={() => setStep(0)}
      >
        <div className="mr-2">
          <Lucide icon="ChevronLeft" size={25} color="#216AD9" />
        </div>

        <div>
          <p className="text-primary">Volver al paso anterior</p>
        </div>
      </button>

      <div className="lg:flex justify-center lg:mt-5 mt-8">
        <div className="bg-white lg:w-[40%] w-full shadow-xl shadow-slate-100 rounded-md h-fit lg:max-h-[80vh] lg:overflow-y-auto p-7 lg:ml-4 lg:mt-0 mt-5 lg:sticky lg:top-[140px]">
          <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
            <div className="w-full border-b mb-2 flex flex-col justify-between items-start gap-1 pb-3">
              <p className="font-medium text-base text-slate-900">
                Servicios(*)
              </p>
              <p className="font-light text-sm text-slate-500">
                Indica los servicios que prestaras en este consultorio
              </p>
            </div>
            {servicesData?.length === 0 && successFulServices && (
              <div className="w-full flex flex-col justify-center items-center text-center">
                <p className="font-bold text-slate-900 text-lg">
                  Vaya, no tienes servicios aún
                </p>
                <p className="font-light text-slate-500 text-base">
                  Lo sentimos, pero en la plataforma no hay servicios todavia.
                </p>
              </div>
            )}
            {servicesData?.length > 0 &&
              successFulServices &&
              [...(servicesData as Array<IService>)].map((l, i) => (
                <ServiceComponent data={l} i={i} key={i} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
