import { IOrder } from "domain/core/entities/orderEntity";
import { IUser } from "domain/core/entities/userEntity";
import { OrdersRoutesEnum } from "(presentation)/(routes)/ordersRoutes";
import Paginate from "(presentation)/components/core/Paginate/Paginate";
import Link from "next/link";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  IServicesContext,
  ServicesContext,
} from "../../context/ServicesContext";
import { IService } from "domain/core/entities/serviceEntity";
import Table from "(presentation)/components/core/BaseComponents/Table";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {
  IStepByStepContext,
  StepByStepContext,
} from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";

export default function TableServices({ user }: { user: IUser }) {
  const {
    state: stepByStepState,
    dispatch: stepByStepDispatch,
    actions: stepByStepActions,
  } = useContext<IStepByStepContext>(StepByStepContext);
  const { createUserSteps } = stepByStepActions;
  const { data: steps, loading: getStepsLoading } =
    stepByStepState.getStepsMessages;
  const { successful: createStepSucessful } = stepByStepState.createUserSteps;

  const { state, actions, dispatch } =
    useContext<IServicesContext>(ServicesContext);
  const { data, loading, successful, error } = state.getUserServices;
  const { getUserServices } = actions;

  const [stepIsCompleted, setStepIsCompleted] = useState(false);

  const onStepCompleted = () =>
    createUserSteps(user.accountId, "SERVICE_UPDATED")(dispatch);

  const getStepIsCompleted = () => {
    const serviceEvent = steps.findIndex(
      (event: any) => event.evento === "SERVICE_UPDATED"
    );

    if (serviceEvent >= 0) setStepIsCompleted(true);
  };

  useEffect(() => {
    if (steps && steps.length > 0) getStepIsCompleted();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps]);

  useEffect(() => {
    if (createStepSucessful) {
      setStepIsCompleted(true);
    }
  }, [createStepSucessful]);

  const router = useRouter();

  useMemo(() => {
    if (user.userId) getUserServices(user.userId)(dispatch);
  }, [user.userId]);

  if (getStepsLoading || !user?.accountId) return <div />;

  const TableData = ({ data }: { data: IService }) => {
    if (!stepIsCompleted) {
      return (
        <button
          onClick={() => onStepCompleted()}
          className="cursor-pointer w-full grid grid-cols-4 items-center justify-items-start bg-white px-3 py-4 border rounded-lg"
        >
          <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
            {data.name}
          </p>
          <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
            {data.service_category.name}
          </p>
          <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
            <div className="w-full flex justify-start items-center gap-2">
              <span className="rounded-full w-[12px] h-[12px] bg-success"></span>
              <p className="text-sm font-medium text-slate-900">Activo</p>
            </div>
          </p>
          <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
            ${data.base_price}
          </p>
        </button>
      );
    }

    return (
      <Link
        href={`/services/${data.id}`}
        className="cursor-pointer w-full grid grid-cols-4 items-center justify-items-start bg-white px-3 py-4 border rounded-lg"
      >
        <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
          {data.name}
        </p>
        <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
          {data.service_category.name}
        </p>
        <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
          <div className="w-full flex justify-start items-center gap-2">
            <span className="rounded-full w-[12px] h-[12px] bg-success"></span>
            <p className="text-sm font-medium text-slate-900">Activo</p>
          </div>
        </p>
        <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
          ${data.base_price}
        </p>
      </Link>
    );
  };

  console.log(data);

  const CardData = ({ data }: { data: IService }) => {
    if (!stepIsCompleted) {
      return (
        <button
          onClick={() => onStepCompleted()}
          className="bg-white border rounded-lg p-4 flex flex-col justify-between items-start gap-4 cursor-pointer"
        >
          <div className="w-full flex justify-start items-center gap-4">
            <div className="relative flex flex-col justify-center items-start">
              <p className="font-semibold text-lg text-gray-950">{data.name}</p>
              <p className="font-light text-sm text-slate-500">
                Categoria: {data.service_category.name}
              </p>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-1">
            <div className="flex flex-col justify-start items-start gap-2 text-left">
              <p className="font-light text-gray-500 text-sm">Precio base</p>
              <p className="font-normal text-gray-950 text-base">
                ${data.base_price}
              </p>
            </div>
            <div className="flex flex-col justify-start items-start gap-2 text-left">
              <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                <p className="font-light text-gray-500 text-sm mb-3">Estatus</p>
                <div className="w-full flex justify-start items-center gap-2">
                  <span className="rounded-full w-[12px] h-[12px] bg-success"></span>
                  <p className="text-sm font-medium text-slate-900">Activo</p>
                </div>
              </p>
            </div>
          </div>
        </button>
      );
    }

    return (
      <>
        <Link
          href={`/services/${data.id}`}
          className="bg-white border rounded-lg p-4 flex flex-col justify-between items-start gap-4 cursor-pointer"
        >
          <div className="w-full flex justify-start items-center gap-4">
            <div className="relative flex flex-col justify-center items-start">
              <p className="font-semibold text-lg text-gray-950">{data.name}</p>
              <p className="font-light text-sm text-slate-500">
                Categoria: {data.service_category.name}
              </p>
            </div>
          </div>
          <div className="w-full grid grid-cols-3 gap-1">
            <div className="flex flex-col justify-start items-start gap-2 text-left">
              <p className="font-light text-gray-500 text-sm">Precio base</p>
              <p className="font-normal text-gray-950 text-base">
                ${data.base_price}
              </p>
            </div>
            <div className="flex flex-col justify-start items-start gap-2 text-left">
              <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                <p className="font-light text-gray-500 text-sm mb-3">Estatus</p>
                <div className="w-full flex justify-start items-center gap-2">
                  <span className="rounded-full w-[12px] h-[12px] bg-success"></span>
                  <p className="text-sm font-medium text-slate-900">Activo</p>
                </div>
              </p>
            </div>
          </div>
        </Link>
      </>
    );
  };

  const TableComponent = () => {
    return (
      <div className="col-span-12 overflow-auto lg:overflow-visible z-0">
        <Table className="border-spacing-y-[10px] border-separate -mt-2">
          <Table.Thead>
            <Table.Tr>
              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Servicio
              </Table.Th>

              {/* <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Consultorio
    </Table.Th> */}

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Estatus
              </Table.Th>

              <Table.Th className="border-b-0 whitespace-nowrap text-base">
                Precio base
              </Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {successful &&
              data.length > 0 &&
              [...(data as Array<IService>)].map((service, i) => (
                <Table.Tr
                  key={service.id}
                  onClick={
                    stepIsCompleted
                      ? () => router.push(`/services/${service.id}`)
                      : () => onStepCompleted()
                  }
                  className="bg-white cursor-pointer"
                >
                  <Table.Td>
                    <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                      {service.name}
                    </p>
                  </Table.Td>

                  {/*  <Table.Td>
                    <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                      {service.location.name}
                    </p>
              </Table.Td> */}

                  <Table.Td>
                    <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                      <div className="w-full flex justify-start items-center gap-2">
                        <span
                          className={twMerge([
                            "rounded-full w-[12px] h-[12px]",
                            service.status === 1 ? "bg-success" : "bg-warning",
                          ])}
                        ></span>
                        <p
                          className={twMerge([
                            "text-sm font-medium text-slate-900",
                          ])}
                        >
                          {service.status === 1 ? "Activo" : "Borrador"}
                        </p>
                      </div>
                    </p>
                  </Table.Td>

                  <Table.Td>
                    <p className="border-b-0 whitespace-nowrap text-sm font-medium text-slate-900">
                      ${service.base_price}
                    </p>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>

        {successful && data.length === 0 && (
          <div className="w-full flex flex-col justify-center items-center">
            <p className="font-bold text-slate-900 text-lg">
              Vaya, no tienes servicios aún
            </p>
            <p className="font-light text-slate-500 text-base">
              Lo sentimos, pero no tienes servicios agregados todavia.
            </p>
          </div>
        )}
      </div>
    );
  };

  const CardsComponent = () => {
    return (
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        {successful &&
          [...(data as Array<IService>)].length > 0 &&
          [...(data as Array<IService>)].map((service, i) => (
            <div key={service.id}>
              <CardData data={service} />
            </div>
          ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          Cargando tus servicios.
        </p>
      </div>
    );
  }

  if (successful && [...(data as Array<IService>)].length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no tienes servicios aún
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero no tienes servicios agregados todavia.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="lg:block md:block hidden">
        <TableComponent />
      </div>

      <div className="lg:hidden md:hidden block">
        <CardsComponent />
        {loading && (
          <div className="w-full flex flex-col justify-center items-center">
            <p className="font-bold text-slate-900 text-lg">Un momento...</p>
            <p className="font-light text-slate-500 text-base">
              Cargando tus servicios.
            </p>
          </div>
        )}

        {successful && [...(data as Array<IService>)].length === 0 && (
          <div className="w-full flex flex-col justify-center items-center">
            <p className="font-bold text-slate-900 text-lg">
              Vaya, no tienes servicios aún
            </p>
            <p className="font-light text-slate-500 text-base text-center">
              Lo sentimos, pero no tienes servicios agregados todavia.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
