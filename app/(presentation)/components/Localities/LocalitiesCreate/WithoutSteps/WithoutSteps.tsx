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
import { IStepByStepContext, StepByStepContext } from "(presentation)/components/core/StepByStep/context/StepByStepContext";
import MapView from "(presentation)/components/core/MapView";

export default function WithoutSteps({ userId, accountId }: { userId: string; accountId: string }) {
  const { state, actions, dispatch } =
    useContext<ILocalitiesContext>(LocalitiesContext);

  const { createUserLocality, getCountryStates} = actions;

  const {
    loading: createUserLocalityLoading,
    successful: createUserLocalitySuccess,
    error: createUserLocalityError,
  } = state.createUserLocality;

  const {
    data: states,
    loading: statesLoading,
    successful: statesSuccess,
    error: statesError,
  } = state.getCountryStates;

  const { actions: actionsStep, dispatch: dispatchStep } = useContext<IStepByStepContext>(StepByStepContext);
  const { createUserSteps } = actionsStep;

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    postal_code: "",
    state_id: 0,
    city: "",
    clues: "",
    latitude: 0,
    longitude: 0,
    address: "",
    media: {
      data: "",
      type: "",
    },
  });

  const [loadedStates, setLoadedStates] = useState(false)

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

  useEffect(()=>{
    getCountryStates()(dispatch)
    setLoadedStates(true)
  },[loadedStates])

  useMemo(() => {
    if (createUserLocalitySuccess){
      createUserSteps(accountId, "LOCATION_CREATED")(dispatchStep)
      setTimeout(() => {
        window.location.href = "/localities"
      }, 1000);
    };
  }, [createUserLocalitySuccess]);

  return (
    <>
      <AlertComponent
        variant="error"
        show={createUserLocalityError !== null}
        description="Ha ocurrido un error inesperado en la creación"
      />
      <AlertComponent
        variant="success"
        show={createUserLocalitySuccess}
        description="Tu consultorio se ha creado exitosamente"
      />

      <div className="w-full lg:flex justify-between items-center sticky top-[67px] z-[50] border-b bg-slate-100 py-2">
        <div className="lg:mr-5 mb-4 lg:mb-0">
          <h2 className=" text-2xl font-bold truncate">Nuevo consultorio</h2>
        </div>
        <Button
          className="w-full lg:w-fit"
          disabled={
            createUserLocalityLoading ||
            formData?.name === "" || 
            formData?.clues === "" || 
            formData?.address === ""
          }
          onClick={() => {
            console.log(formData);
            createUserLocality({ ...formData, id: userId })(dispatch);
          }}
          variant="primary"
        >
          {createUserLocalityLoading ? "Creando..." : "Crear consultorio"}
        </Button>
      </div>
      <div className="flex lg:mt-5 mt-8">
        <div className="relative lg:flex gap-4 w-full lg:w-[70%]">

          <div className="bg-white w-full shadow-xl shadow-slate-100 rounded-md h-fit p-5">
            <div className="border w-full rounded-md p-5 flex">
              <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
                <div className="w-full border-b mb-2">
                  <p className="font-medium text-base text-slate-900 pb-2">
                    Definición del consultorio
                  </p>
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
                    value={formData.name}
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
                    value={formData.code}
                    className="form-control lg:w-[70%]"
                    onChange={(e: any) => {
                      setFormData({ ...formData, code: e.target.value });
                    }}
                  />
                </div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    CLUES
                    <span className="text-primary font-bold">*</span>
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
                      value={formData.state_id}
                      className="form-control lg:w-[70%]"
                      onChange={(e: any) => {
                        setFormData({ ...formData, state_id: e.target.value });
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
                </div>
                <div className="flex justify-between items-center relative w-full gap-3"></div>
                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Cargar imagen
                  </p>
                  <FormInput
                    onChange={(e) => handleChangeMedia(e)}
                    type="file"
                    className="form-control lg:w-[70%]"
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
