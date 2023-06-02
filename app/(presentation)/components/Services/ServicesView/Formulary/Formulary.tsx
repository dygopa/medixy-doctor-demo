import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";
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
  let [formData, setFormData] = useState({} as IService);

  useMemo(() => {
    if (userId) {
      const url = pathname?.split("/");
      let id = url![url!.length - 1];
      getService(parseInt(id), userId)(dispatch);
    }
  }, [userId, pathname]);

  useMemo(() => setFormData(data as unknown as IService), [successful]);

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

      <div className="w-full lg:flex justify-between items-start">
        <h2 className="lg:mr-5 lg:mb-0 mb-8 text-2xl font-bold truncate">
          Actualizar servicio
        </h2>
        <div className="lg:w-[45%] grid grid-cols-3 justify-center items-center gap-3">
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
          <Button
            disabled={loadingDelete || !formData?.id || !userId}
            onClick={() => {
              deleteService(formData?.id, userId)(dispatch);
            }}
            variant="danger"
            className=""
          >
            {loadingDelete ? "Eliminando..." : "Eliminar"}
          </Button>
          <Button
            disabled={loadingUpdate || formData?.name === "" || formData?.service_category_id === ""}
            onClick={() => {
              updateService(formData)(dispatch);
            }}
            variant="primary"
            className=""
          >
            {loadingUpdate ? "Actualizando..." : "Actualizar"}
          </Button>
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
                        service_category_id: e.target.value,
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
                  <FormInput type="file" className="form-control lg:w-[70%]" />
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
