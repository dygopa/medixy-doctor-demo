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

export default function Formulary({ userId, accountId }: { userId: string; accountId: string }) {
  const { state, actions, dispatch } =
    useContext<ILocalitiesContext>(LocalitiesContext);

  const { getMedicalCenters, createUserLocality } = actions;

  const {
    data: medicalCenters,
    loading: medicalCentersLoading,
    successful: medicalCentersSuccess,
    error: medicalCentersError,
  } = state.getMedicalCenters;
  const {
    loading: createUserLocalityLoading,
    successful: createUserLocalitySuccess,
    error: createUserLocalityError,
  } = state.createUserLocality;

  const { actions: actionsStep, dispatch: dispatchStep } = useContext<IStepByStepContext>(StepByStepContext);
  const { createUserSteps } = actionsStep;

  const [formData, setFormData] = useState({
    parent_location_id: 0,
    name: "",
    code: "",
    clues: "",
    address: "",
    media: {
      data: "",
      type: "",
    },
  });

  const [loadedMedicalCenters, setLoadedMedicalCenters] = useState(false);

  const [active, setActive] = useState(0);
  const [selectedItem, setSelectedItem] = useState({} as ILocality);

  let steps = [
    {
      title: "Busca la localidad",
      value: 0,
    },
    {
      title: "Confirma la información",
      value: 1,
    },
  ];

  const StepComponent = (data: {
    title: string;
    value: number;
    index: number;
  }) => {
    return (
      <div
        onClick={() => {
          data["index"] === 0 && setActive(0);
        }}
        className={twMerge([
          data["index"] === 0 && "cursor-pointer",
          "w-full flex justify-start items-center gap-3 bg-white border  rounded-md p-4",
          active === data["value"]
            ? "bg-white border-slate-200"
            : "bg-transparent border-transparent",
        ])}
      >
        <span
          className={twMerge([
            "w-9 h-9 rounded-full text-white flex flex-col justify-center items-center",
            active === data["value"] && "bg-primary",
            active < data["value"] && "bg-gray-300",
            active > data["value"] && "bg-green-500",
          ])}
        >
          {active < data["value"] || active === data["value"] ? (
            data["value"] + 1
          ) : (
            <FiCheck />
          )}
        </span>
        <p className="font-light text-slate-950 text-base">{data["title"]}</p>
      </div>
    );
  };

  const LeftColumn = () => {
    return (
      <div className="lg:w-[30%] h-fit lg:mb-0 mb-4">
        <p className="font-light text-slate-500 text-base mb-6">
          Si tu consultorio no existe dentro de la plataforma puedes crearlo
          para tener acceso a sus servicios
        </p>
        <div className="w-full flex flex-col justify-start items-start gap-3">
          {steps.map((s, i) => (
            <StepComponent
              title={s["title"]}
              value={s["value"]}
              index={i}
              key={i}
            />
          ))}
        </div>
      </div>
    );
  };

  const CenterComponent = ({ data }: { data: ILocality }) => {
    let thisValue = {
      name: "",
      code: "",
      clues: "",
      media: {
        data: "",
        type: "",
      },
      type: "CONSULTING_ROOM",
      address: data.address,
      postal_code: data.postal_code,
      state_id: data.state.id,
      city: data.name,
      latitude: data.latitude,
      longitude: data.longitude,
      parent_location_id: data.id,
    };

    return (
      <div
        onClick={() => {
          setFormData({ ...thisValue });
        }}
        className="cursor-pointer w-full border rounded bg-white p-4 lg:flex justify-between items-center gap-4"
      >
        <div className="lg:w-[2.5rem] w-full flex justify-center">
          <span className="w-[2.5rem] h-[2.5rem] text-center rounded-md bg-primary/30 text-primary flex flex-col justify-center items-center text-lg lg:mb-0 mb-4">
            <BiBuildingHouse />
          </span>
        </div>
        <div className="lg:w-[80%] flex flex-col justify-center items-start lg:mb-0 mb-4">
          <p className="text-base text-slate-900 font-semibold">{data.name}</p>
          <p className="text-sm text-slate-500 font-light">{data.address}</p>
        </div>
        <div className="flex justify-center lg:w-[2.5rem] w-full">
          <span
            className={twMerge([
              "transition w-[2.5rem] h-[2.5rem] cursor-pointer rounded-full text-slate-400 border border-slate-400 flex flex-col justify-center items-center bg-white",
              "hover:bg-primary hover:border-primary hover:text-white",
              formData?.parent_location_id === data.id &&
                "bg-green-500 border-green-500 text-white",
            ])}
          >
            <FiCheck />
          </span>
        </div>
      </div>
    );
  };

  const SearchComponent = () => {
    return (
      <div className="bg-white lg:w-[70%] shadow-xl shadow-slate-100 rounded-md h-fit p-5">
        <div className="border w-full rounded-md p-5 flex">
          <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
            <div className="w-full border-b mb-2">
              <p className="font-medium text-base text-slate-900 pb-2">
                Selecciona el centro médico
              </p>
            </div>
            <div className="lg:flex justify-start items-start relative w-full gap-3">
              <p className="lg:w-1/5 text-[13px] text-slate-900 font-medium mb-2">
                Centro médico
              </p>
              <div className="lg:w-4/5 flex flex-col justify-start items-start relative gap-3">
                {medicalCentersLoading && (
                  <div className="w-full flex flex-col justify-center items-center">
                    <p className="font-bold text-slate-900 text-lg">
                      Un momento...
                    </p>
                    <p className="font-light text-slate-500 text-base">
                      Cargando los centros médicos.
                    </p>
                  </div>
                )}
                {medicalCentersSuccess &&
                  [...(medicalCenters as Array<ILocality>)].length > 0 &&
                  [...(medicalCenters as Array<ILocality>)].map((center, i) => (
                    <CenterComponent key={i} data={center} />
                  ))}
                {medicalCentersSuccess &&
                  [...(medicalCenters as Array<ILocality>)].length === 0 && (
                    <div className="w-full flex flex-col justify-center items-center">
                      <p className="font-bold text-slate-900 text-lg">
                        Vaya, no hay centros aún
                      </p>
                      <p className="font-light text-slate-500 text-base">
                        Lo sentimos, pero en la plataforma no hay centros
                        médicos todavia.
                      </p>
                    </div>
                  )}

                <div className="w-full flex justify-end items-center gap-8 mt-3">
                  <Button
                    onClick={() => {
                      setActive(1);
                    }}
                    disabled={formData?.parent_location_id === 0}
                    variant="primary"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

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

  const loadAPI = () => {
    getMedicalCenters()(dispatch);
    setLoadedMedicalCenters(true);
  };

  useEffect(() => {
    loadAPI();
  }, [loadedMedicalCenters]);

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

      <div className="w-full lg:flex justify-between items-start">
        <div className="lg:mr-5 mb-4 lg:mb-0">
          <h2 className=" text-2xl font-bold truncate">Nuevo consultorio</h2>
        </div>
        <Button
          disabled={
            createUserLocalityLoading ||
            formData?.parent_location_id === 0 ||
            formData?.name === ""
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
        <div className="relative lg:flex gap-4 w-full">
          <LeftColumn />
          {active === 0 ? (
            <SearchComponent />
          ) : (
            <div className="bg-white lg:w-[70%] shadow-xl shadow-slate-100 rounded-md h-fit p-5">
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
                      Dirección
                    </p>
                    <FormInput
                      type={"text"}
                      placeholder="Escribe la dirección del consultorio..."
                      min={0}
                      disabled={true}
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
                      <span className="text-primary font-bold">*</span>
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
          )}
        </div>
      </div>
    </>
  );
}
