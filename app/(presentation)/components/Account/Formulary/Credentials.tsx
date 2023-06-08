import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IUserContext, UserContext } from "../context/UserContext";
import { IUser } from "domain/core/entities/userEntity";
import { FiPlus, FiSave, FiTrash } from "react-icons/fi";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { IStepByStepContext, StepByStepContext } from "(presentation)/components/core/StepByStep/context/StepByStepContext";

export default function Credentials({
  account,
  setAccount,
}: {
  account: IUser;
  setAccount: any;
}) {
  const { state, actions, dispatch } = useContext<IUserContext>(UserContext);
  const {
    getMedicalSpecialities,
    getUserMedicalSpecialities,
    createMedicalSpeciality,
    updateMedicalSpeciality,
    deleteMedicalSpeciality,
  } = actions;

  const { data: specialities } = state.medicalSpecialities;
  const {
    loading: loadingRegister,
    error: errorRegister,
    successful: successFulRegister,
  } = state.createMedicalSpeciality;
  const {
    loading: loadingDelete,
    error: errorDelete,
    successful: successFulDelete,
  } = state.deleteMedicalSpeciality;
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    successful: successFulUpdate,
  } = state.updateMedicalSpeciality;

  const { data, loading, error, successful } = state.getUserMedicalSpecialities;

  const { actions: actionsStep, dispatch: dispatchStep } = useContext<IStepByStepContext>(StepByStepContext);
  const { createUserSteps } = actionsStep;

  const [formData, setFormData] = useState({
    id: account.userId,
    specialty_id: 0,
    code: "",
    institution_name: "",
    main_specialty: false,
  });

  const [loadedAPI, setLoadedAPI] = useState(false);

  const updateSpeciality = (data: Object) => {
    console.log({ ...data, id_user: account.userId });
    updateMedicalSpeciality({ ...data, id_user: account.userId })(dispatch);
  };

  const deleteSpeciality = (data: Object) => {
    console.log({ ...data, id_user: account.userId });
    deleteMedicalSpeciality({ ...data, id_user: account.userId })(dispatch);
  };

  const SpecialityCard = ({
    name,
    id,
    main_specialty,
    code,
    institution_name,
  }: {
    name: string;
    id: number;
    main_specialty: boolean;
    code: string;
    institution_name: string;
  }) => {
    const [speciality, setSpeciality] = useState({
      name,
      id,
      main_specialty,
      code,
      institution_name,
    });

    return (
      <div className="w-full border bg-white grid lg:grid-cols-4 grid-cols-1 gap-3 p-4 rounded-md">
        <div className="flex flex-col justify-center items-start pr-5 gap-1">
          <p className="font-light text-sm text-slate-500">Especialidad</p>
          <p className="font-medium text-sm text-slate-900">
            {speciality["name"]}
          </p>
        </div>
        <div className="flex flex-col justify-center items-start pr-5 gap-1">
          <p className="font-light text-sm text-slate-500">Código</p>
          <FormInput
            onChange={(e) => {
              setSpeciality({ ...speciality, code: e.target.value });
            }}
            className="form-control"
            type={"text"}
            defaultValue={speciality["code"]}
          />
        </div>
        <div className="flex flex-col justify-center items-start pr-5 gap-1">
          <p className="font-light text-sm text-slate-500">Institución</p>
          <FormInput
            onChange={(e) => {
              setSpeciality({
                ...speciality,
                institution_name: e.target.value,
              });
            }}
            className="form-control"
            type={"text"}
            defaultValue={speciality["institution_name"]}
          />
        </div>
        <div className="relative grid grid-cols-3 items-center lg:justify-items-end justify-items-center lg:mt-0 mt-4">
          {!speciality["main_specialty"] ? (
            <AiOutlineStar
              onClick={() => {
                updateSpeciality({ ...speciality, main_specialty: true }),
                  setSpeciality({ ...speciality, main_specialty: true });
              }}
              className="text-2xl cursor-pointer text-yellow-500"
              title="Principal"
            />
          ) : (
            <AiFillStar
              onClick={() => {
                updateSpeciality({ ...speciality, main_specialty: false }),
                  setSpeciality({ ...speciality, main_specialty: false });
              }}
              className="text-2xl cursor-pointer text-yellow-500"
              title="Principal"
            />
          )}
          <FiSave
            onClick={() => {
              updateSpeciality(speciality as Object);
            }}
            className="text-xl cursor-pointer text-green-500"
            title="Guardar"
          />
          <FiTrash
            onClick={() => {
              deleteSpeciality(speciality as Object);
            }}
            className="text-xl cursor-pointer text-red-500"
            title="Eliminar"
          />
        </div>
      </div>
    );
  };

  const createSpeciality = () => {
    if (
      formData["specialty_id"] === 0 ||
      formData["code"] === "" ||
      formData["institution_name"] === ""
    ) {
      return;
    }
    //console.log(formData, account.userId)
    createMedicalSpeciality(formData)(dispatch);
  };

  const loadAPI = () => {
    getMedicalSpecialities()(dispatch);
    setLoadedAPI(true);
  };

  useMemo(() => {
    if (account.userId) {
      getUserMedicalSpecialities(account.userId)(dispatch);
      setFormData({ ...formData, id: account.userId });
    }
  }, [account.userId]);

  useMemo(() => {
    if (account.userId) {
      getUserMedicalSpecialities(account.userId)(dispatch);
      if(successFulRegister) createUserSteps(account.accountId, "PROFILE_COMPLETED")(dispatchStep)
    }
  }, [successFulRegister, successFulDelete, successFulUpdate]);

  useEffect(() => {
    loadAPI();
  }, [loadedAPI]);

  return (
    <div className="w-full bg-white shadow-xl shadow-slate-100 rounded-md h-fit p-7">
      <AlertComponent
        variant="error"
        show={errorRegister !== null}
        description={"Ha ocurrido un error cargando la especialidad"}
      />
      <AlertComponent
        variant="success"
        show={successFulRegister}
        description="Especialidad cargada exitosamente"
      />
      <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
        <div className="w-full border-b mb-2">
          <p className="font-medium text-base text-slate-900 pb-2">
            Credenciales
          </p>
        </div>
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-start items-end gap-3">
          <div className="flex flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
              Especialidad
            </p>
            <FormSelect
              value={formData["specialty_id"]}
              className="form-control w-full"
              onChange={(e) =>
                setFormData({ ...formData, specialty_id: +e.target.value })
              }
            >
              <option value="">-</option>
              {specialities &&
                [...(specialities as Array<any>)].map((elem, i) => (
                  <option key={i} value={elem["id"]}>
                    {elem["name"]}
                  </option>
                ))}
            </FormSelect>
          </div>
          <div className="flex flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
              Cédula de la especialidad
            </p>
            <FormInput
              type={"text"}
              placeholder="Escribe la cédula de la especialidad..."
              min={0}
              value={formData["code"]}
              className="form-control w-full"
              onChange={(e) =>
                setFormData({ ...formData, code: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col justify-between items-start relative gap-1">
            <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
              Institución
            </p>
            <FormInput
              type={"text"}
              placeholder="Escribe el nombre de la institución..."
              min={0}
              value={formData["institution_name"]}
              className="form-control w-full"
              onChange={(e) =>
                setFormData({ ...formData, institution_name: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col justify-between items-end relative">
            <Button
              disabled={loadingRegister || account.userId === undefined || formData.specialty_id === 0 }
              onClick={createSpeciality}
              className="w-full flex justify-center items-center gap-2 text-white font-base"
              variant="success"
            >
              <FiPlus />
              <p>Agregar</p>
            </Button>
          </div>
        </div>

        {loadingRegister ? (
          <div className="w-full flex justify-center items-center">
            <p className="font-semibold text-center text-base text-slate-900">
              Cargando...
            </p>
          </div>
        ) : data && [...(data as Array<any>)].length > 0 ? (
          [...(data as Array<any>)].map((elem, i) => (
            <SpecialityCard
              key={i}
              name={elem["name"]}
              id={elem["id"]}
              institution_name={elem["institution_name"]}
              main_specialty={elem["main_specialty"]}
              code={elem["code"]}
            />
          ))
        ) : (
          <div className="w-full flex flex-col justify-center items-center">
            <p className="font-semibold text-center text-base text-slate-900">
              Nada por aquí
            </p>
            <p className="font-light text-center text-sm text-slate-500">
              No tienes especialidades agregadas
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
