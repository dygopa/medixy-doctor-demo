import { LocalitiesRoutesEnum } from "(presentation)/(routes)/localitiesRoutes";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import Tooltip from "(presentation)/components/core/BaseComponents/Tooltip/Tooltip";
import { IService } from "domain/core/entities/serviceEntity";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useMemo, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { NumericFormat } from "react-number-format";
import { twMerge } from "tailwind-merge";
import {
  ILocalitiesContext,
  LocalitiesContext,
} from "../../context/LocalitiesContext";
import Steps from "../Steps/Steps";

export default function Services({
  formData,
  address,
  setStep,
  step,
  localityId,
}: {
  formData: any;
  address: any;
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  localityId: number;
}) {
  const router = useRouter();

  const { state, actions, dispatch } =
    useContext<ILocalitiesContext>(LocalitiesContext);
  const { updateUserLocality } = actions;
  const { data } = state.gettingUserLocality;
  const {
    loading: loadingUpdate,
    successful: successfulUpdate,
    error: errorUpdate,
  } = state.updateUserLocality;
  const { data: servicesBaseData, successful: successFulBaseServices } =
    state.getUserBaseServices;
  const { data: servicesData } = state.getUserServices;

  const [services, setServices] = useState<any>([]);

  const onUpdateUserLocality = () => {
    if (services.length === 0) return;

    let hasError = false;
    const servicesList: any = [];

    services.forEach((item: any) => {
      if (!item.price || item.price === 0) {
        item.has_error = true;

        if (!hasError) hasError = true;
      } else {
        item.has_error = false;
      }

      servicesList.push(item);
    });

    setServices(servicesList);

    if (!hasError) {
      updateUserLocality({ ...formData, address }, data.id, services)(dispatch);
    }
  };

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
            service_parent_id: serviceBaseData.id,
            has_error: false,
          });
        }
      });
    }

    setServices(services);
  };

  useMemo(() => {
    setServicesInList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickButtonPrincipal: Function = () => {
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
        location_id: localityId,
        price: price,
        service_parent_id: serviceParentId,
        has_error: false,
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
    let serviceAdded =
      typeof servicesData !== "string" &&
      servicesData &&
      servicesData?.length > 0
        ? servicesData.find(
            (elem: any) =>
              elem["service_parent_id"] === data.id &&
              elem["location_id"] === localityId
          )
        : ({} as any);

    let isInList = serviceAdded?.id
      ? services.find((elem: any) => elem["service_id"] === serviceAdded["id"])
        ? true
        : false
      : services.find((elem: any) => elem["service_id"] === data.id);
    let isInListNotAdded = services.find(
      (elem: any) => elem["service_id"] === data.id
    );
    let serviceAddedForm = serviceAdded?.id
      ? services.find((elem: any) => elem["service_id"] === serviceAdded["id"])
      : ({} as any);
    let price = serviceAddedForm?.price
      ? serviceAddedForm.price
      : serviceAddedForm.has_error
      ? 0
      : serviceAdded?.base_price
      ? serviceAdded.base_price
      : data.base_price;
    let isAdded = true;

    if (!isInList) {
      isInList = false;
      isAdded = false;
      price = 0;
    }

    if (isInListNotAdded) {
      isAdded = false;
    }

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
          <div className="w-3/4 flex flex-col justify-start items-start gap-1 text-left">
            <div className="relative w-full">
              <div className="w-full">
                <NumericFormat
                  value={price && price > 0 ? price : undefined}
                  disabled={!isInList}
                  placeholder="Precio"
                  decimalScale={2}
                  thousandSeparator="."
                  defaultValue={isInList ? data.base_price : ""}
                  decimalSeparator=","
                  prefix={""}
                  onValueChange={(values, sourceInfo) =>
                    managePriceChangeInList(
                      values.floatValue ? values.floatValue : 0,
                      serviceAddedForm?.service_id
                        ? serviceAddedForm.service_id
                        : data.id
                    )
                  }
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

            {serviceAddedForm && serviceAddedForm?.has_error && (
              <div>
                <span className="text-danger">Debe colocar un precio</span>
              </div>
            )}
          </div>

          <div className="w-1/4 flex flex-col justify-center items-center">
            <button
              onClick={() => {
                manageAddToList(
                  serviceAddedForm?.service_id
                    ? serviceAddedForm.service_id
                    : data.id,
                  serviceAddedForm?.price
                    ? serviceAddedForm.price
                    : data.base_price,
                  data.id
                );
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
          Actualizar Consultorio
        </h2>
        <div className="md:w-[40%] lg:w-[20%] w-full flex justify-center items-center">
          <Button
            disabled={services.length === 0}
            onClick={() => {
              onUpdateUserLocality();
            }}
            variant="primary"
            className="w-full"
          >
            {loadingUpdate ? "Actualizando..." : "Actualizar"}
          </Button>
        </div>
      </div>

      <Steps setSteps={setStep} steps={step} />

      <div className="flex justify-center w-full mt-5">
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
    </>
  );
}
