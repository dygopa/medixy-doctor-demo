import { usePathname } from "next/navigation";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
  Fragment,
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

export default function Formulary({ userId }: { userId: string }) {
  const pathname = usePathname();

  const { state, actions, dispatch } =
    useContext<IServicesContext>(ServicesContext);
  const { getService, updateService, deleteService, getCategories } = actions;
  const { data, loading, successful, error } = state.getService;
  const {
    data: dataUpdate,
    loading: loadingUpdate,
    successful: successfulUpdate,
    error: errorUpdate,
  } = state.updateService;
  const { data: categories } = state.getCategories;
  const {
    data: dataDelete,
    loading: loadingDelete,
    successful: successfulDelete,
    error: errorDelete,
  } = state.deleteService;

  const [loadedAPI, setLoadedAPI] = useState(false);
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

  const setFormDataValues = () => {
    setFormData({
      ...formData,
      name: data?.name ?? "",
      service_category_id: data?.service_category_id
        ? parseInt(data.service_category_id, 10)
        : 0,
      description: data?.description ?? "",
      conditions: data?.conditions ?? "",
      base_price: data?.base_price ?? "",
      status: data?.status ?? "",
      media: {
        data: "",
        type: "",
      },
    });
  };
  useEffect(() => {
    if (successful) {
      setFormDataValues();
    }
  }, [successful]);

  useMemo(() => {
    if (userId) {
      const url = pathname?.split("/");
      let id = url![url!.length - 1];
      getService(parseInt(id), userId)(dispatch);
    }
  }, [userId, pathname]);

  const loadAPI = () => {
    getCategories()(dispatch);
    setLoadedAPI(true);
  };

  useEffect(() => {
    loadAPI();
  }, [loadedAPI]);

  useMemo(() => {
    if (successfulDelete) window.location.href = "/services";
  }, [successfulDelete]);

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
        description="Tu servicio se ha actualizado exitosamente"
      />

      <AlertComponent
        variant="error"
        show={errorDelete !== null}
        description="Ha ocurrido un error inesperado en la eliminación"
      />
      <AlertComponent
        variant="success"
        show={successfulDelete}
        description="Tu servicio se ha elimanado exitosamente, redireccionando..."
      />

      <div className="w-full md:gap-5 md:flex justify-between items-start sticky top-[67px] z-[50] bg-slate-100 py-2">
        <h2 className="lg:mr-5 lg:mb-0 mb-8 text-2xl font-bold truncate">
          Actualizar servicio
        </h2>
        <div className="md:w-[50%] flex justify-end items-center gap-3">
          <Button
            disabled={
              loadingUpdate ||
              formData?.name === "" ||
              formData?.service_category_id === 0
            }
            onClick={() => {
              updateService(formData, data.id)(dispatch);
            }}
            variant="primary"
            className="w-[275px]"
          >
            {loadingUpdate ? "Actualizando..." : "Actualizar"}
          </Button>

          <Menu as="div" className="relative inline-block text-left">
            <Menu.Button className="rounded-lg hover:bg-primary hover:bg-opacity-30 border border-primary p-1">
              <Lucide icon="MoreVertical" size={27} />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-15 mt-1 w-36 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      className="w-full"
                      onClick={() => {
                        deleteService(data?.id, userId)(dispatch);
                      }}
                    >
                      <div className="flex items-center py-2 px-3 m-0 gap-2 hover:bg-gray-100">
                        <Lucide icon="Trash" className="w-5 h-5" />
                        {loadingDelete ? "Eliminando..." : "Eliminar"}
                      </div>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="flex mt-5">
        <div className="relative flex justify-center items-start gap-4 w-full">
          <div className="bg-white lg:w-[60%] shadow-xl shadow-slate-100 rounded-md h-fit p-5">
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
                    value={formData?.service_category_id}
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
                    value={formData?.name}
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
                    <span className="text-primary font-bold">*</span>
                  </p>
                  <FormInput
                    type="file"
                    className="form-control lg:w-[70%]"
                    onChange={(e) => handleChangeMedia(e)}
                  />
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Precio
                  </p>
                  <FormInput
                    type={"number"}
                    placeholder="0.0"
                    min={0}
                    value={formData?.base_price}
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
                    <FormTextarea
                      placeholder="Descripcion el servicio..."
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
                    placeholder="Condiciones el servicio..."
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
                      <option value="">Estado del servicio</option>
                      <option value={1}>Activo</option>
                      <option value={2}>Borrador</option>
                    </FormSelect>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
