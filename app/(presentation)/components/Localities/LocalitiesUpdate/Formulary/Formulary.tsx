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
} from "react";
import { FiCheck, FiCheckCircle, FiX } from "react-icons/fi";
import { BiBuildingHouse } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  ILocalitiesContext,
  LocalitiesContext,
} from "../../context/LocalitiesContext";
import { ILocality } from "domain/core/entities/localityEntity";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { usePathname, useRouter } from "next/navigation";

export default function Formulary({ userId }: { userId: string }) {
  const pathname = usePathname();

  const { state, actions, dispatch } =
    useContext<ILocalitiesContext>(LocalitiesContext);
  const { gettingUserLocality, updateUserLocality, getCountryStates } = actions;
  const { data, loading, successful, error } = state.gettingUserLocality;
  const {
    data: dataUpdate,
    loading: loadingUpdate,
    successful: successfulUpdate,
    error: errorUpdate,
  } = state.updateUserLocality;

  const {
    data: states,
    loading: statesLoading,
    successful: statesSuccess,
    error: statesError,
  } = state.getCountryStates;

  let [formData, setFormData] = useState({} as ILocality);
  let [loadedStates, setLoadedStates] = useState(false)

  useMemo(() => {
    if (userId) {
      const url = pathname?.split("/");
      let id = url![url!.length - 1];
      gettingUserLocality(parseInt(id), userId)(dispatch);
    }
  }, [userId, pathname]);


  useEffect(()=>{
    getCountryStates()(dispatch)
    setLoadedStates(true)
  },[loadedStates])

  useMemo(() => {
    setFormData(data as unknown as ILocality)
    console.log("data", data)
  }, [successful]);

  useMemo(() => {
    if (successfulUpdate) window.location.href = "/localities";
  }, [successfulUpdate]);

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
        description="Tu consultorio se ha actualizado exitosamente"
      />

      <div className="w-full lg:flex justify-between items-start">
        <h2 className="lg:mr-5 lg:mb-0 mb-4 text-2xl font-bold truncate">
          Actualizar consultorio
        </h2>
        <div className="lg:w-[20%] w-[40%] flex justify-center items-center">
          <Button
            disabled={loadingUpdate}
            onClick={() => {
              updateUserLocality({ ...formData, state: formData.state.name })(
                dispatch
              );
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
        <div className="relative flex justify-center items-start gap-4 w-full">
          <div className="bg-white lg:w-[70%] shadow-xl shadow-slate-100 rounded-md h-fit p-5">
            <div className="border w-full rounded-md p-5 flex">
              {loading ? 
                <div className="w-full flex flex-col justify-center items-center">
                  <p className="font-semibold text-base text-slate-900">Cargando...</p>
                  <p className="font-light text-sm text-slate-500">Espere mientras se carga la información de la localidad</p>
                </div>
              : 
                <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
                  <div className="w-full border-b mb-2">
                    <p className="font-medium text-base text-slate-900 pb-2">
                      Definición del consultorio
                    </p>
                  </div>
                  <div className="lg:flex justify-between items-start relative w-full gap-3">
                    <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                      Nombre del consultorio
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
                      Nro. de consultorio
                    </p>
                    <FormInput
                      type={"text"}
                      placeholder="Escribe el número del consultorio..."
                      min={0}
                      value={formData?.code}
                      className="form-control lg:w-[70%]"
                      onChange={(e: any) => {
                        setFormData({ ...formData, code: e.target.value });
                      }}
                    />
                  </div>
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
                      Código postal
                    </p>
                    <FormInput
                      type={"text"}
                      placeholder="Escribe el código postal del consultorio..."
                      min={0}
                      value={formData.postal_code}
                      className="form-control lg:w-[70%]"
                      onChange={(e: any) => {
                        setFormData({ ...formData, postal_code: e.target.value });
                      }}
                    />
                  </div>
                  <div className="w-full flex justify-start items-center gap-5">
                    <div className="lg:flex justify-between items-center relative w-full gap-3">
                      <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                        Estado
                      </p>
                      <FormSelect
                        value={formData.state?.id}
                        className="form-control lg:w-[70%]"
                        onChange={(e: any) => {
                          setFormData({ ...formData, state: {...formData["state"], id: +e.target.value} });
                        }}
                      >
                        <option>Estado del consultorio...</option>
                        {states &&
                          [...(states as Array<any>)].map((elem, i) => (
                            <option key={i} value={elem["id"]}>
                              {elem["name"]}
                            </option>
                          ))
                        }
                      </FormSelect>
                    </div>
                    <div className="lg:flex justify-between items-center relative w-full gap-3">
                      <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                        Ciudad
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
                  </div>
                  <div className="w-full flex justify-start items-center gap-5">
                    <div className="lg:flex justify-between items-center relative w-full gap-3">
                      <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                        Latitud
                      </p>
                      <FormInput
                        type={"number"}
                        placeholder="0"
                        min={0}
                        value={formData.latitude}
                        className="form-control lg:w-[70%]"
                        onChange={(e: any) => {
                          setFormData({ ...formData, latitude: +e.target.value });
                        }}
                      />
                    </div>
                    <div className="lg:flex justify-between items-center relative w-full gap-3">
                      <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                        Longitud
                      </p>
                      <FormInput
                        type={"number"}
                        placeholder="0"
                        min={0}
                        value={formData.longitude}
                        className="form-control lg:w-[70%]"
                        onChange={(e: any) => {
                          setFormData({ ...formData, longitude: +e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="lg:flex justify-between items-start relative w-full gap-3">
                    <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                      Dirección
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
                  </div>
                  <div className="flex justify-between items-center relative w-full gap-3"></div>
                  <div className="lg:flex justify-between items-start relative w-full gap-3">
                    <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                      Cargar imagen
                      <span className="text-primary font-bold">*</span>
                    </p>
                    <FormInput type="file" className="form-control lg:w-[70%]" />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
