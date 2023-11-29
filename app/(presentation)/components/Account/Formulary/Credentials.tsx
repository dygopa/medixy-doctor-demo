import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { useContext, useEffect, useMemo, useState } from "react";
import { IUserContext, UserContext } from "../context/UserContext";
import { IUser } from "domain/core/entities/userEntity";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { twMerge } from "tailwind-merge";
import AutocompleteInputSpecialties from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputSpecialties/AutocompleteInputSpecialties";

export default function Credentials({
  user,
  account,
  setAccount,
}: {
  user: IUser;
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

  let profesions = [
    { id: 8, name: "Bioanalista" },
    { id: 7, name: "Enfermero/a" },
    { id: 4, name: "Farmaceuta" },
    { id: 3, name: "Fisioterapeuta" },
    { id: 1, name: "Médico" },
    { id: 6, name: "Nutriólogo" },
    { id: 2, name: "Odontólogo" },
    { id: 5, name: "Técnico radiólogo" },
  ];

  const [formData, setFormData] = useState<any>({
    id: account.userId,
    specialty_id: 0,
    specialty_name: "",
    specialty_doctor_id: null,
    code: "",
    institution_name: "",
    main_specialty: false,
  });

  specialities && specialities !== null
    ? specialities.sort((x: { name: string }, y: { name: any }) =>
        x.name.localeCompare(y.name)
      )
    : specialities;

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

    const [canUpdate, setCanUpdate] = useState(false);
    const [initialValue, setInitialValue] = useState(speciality);

    function checkIfCanUpdate() {
      setCanUpdate(false);
      if (speciality.code !== initialValue.code) setCanUpdate(true);
      if (speciality.institution_name !== initialValue.institution_name)
        setCanUpdate(true);
    }

    useMemo(() => {
      checkIfCanUpdate();
    }, [speciality]);

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
            <Lucide
              icon="at"
              onClick={() => {
                updateSpeciality({ ...speciality, main_specialty: true }),
                  setSpeciality({ ...speciality, main_specialty: true });
              }}
              className="text-2xl cursor-pointer text-yellow-500"
              title="Principal"
            />
          ) : (
            <Lucide
              icon="at"
              onClick={() => {
                updateSpeciality({ ...speciality, main_specialty: false }),
                  setSpeciality({ ...speciality, main_specialty: false });
              }}
              className="text-2xl cursor-pointer text-yellow-500"
              title="Principal"
            />
          )}
          <Lucide
            icon="at"
            onClick={() => {
              if (canUpdate) {
                updateSpeciality(speciality as Object);
                setInitialValue(speciality);
              }
            }}
            className={twMerge([
              "text-xl cursor-pointer text-green-500",
              !canUpdate && "cursor-not-allowed text-slate-500/50",
            ])}
            title="Guardar"
          />
          <Lucide
            icon="at"
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
      formData["specialty_name"].length === 0 ||
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

      <div className="w-full rounded-md flex">
        <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
          <div className="w-full border-b mb-2">
            <p className="font-medium text-base text-slate-900 pb-2">
              Credenciales
            </p>
          </div>
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-start items-end gap-3 border-b pb-6">
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="input-label mb-2">Profesional de la salud</p>
              <FormSelect
                value={account?.pwaProfressionId}
                defaultValue={account?.pwaProfressionId}
                className="form-control w-full"
                onChange={(e) =>
                  setAccount({ ...account, pwaProfressionId: +e.target.value })
                }
              >
                <option value="0" disabled>
                  -
                </option>
                {profesions.map((elem, i) => (
                  <option key={i} value={elem["id"]}>
                    {elem["name"]}
                  </option>
                ))}
              </FormSelect>
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="input-label mb-2">
                Cédula Profesional{" "}
                <span className="text-primary font-bold">*</span>
              </p>
              <FormInput
                defaultValue={account?.professionalLicense}
                type={"text"}
                placeholder="Escribe tu Cédula Profesional"
                className="form-control w-full"
                onChange={(e) =>
                  setAccount({
                    ...account,
                    professionalLicense: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col justify-between items-start relative gap-1">
              <p className="input-label mb-2">Institución</p>
              <FormInput
                defaultValue={account?.professionalLicenseInstitution}
                type={"text"}
                placeholder="Escribe el nombre de la institución"
                className="form-control w-full"
                onChange={(e) =>
                  setAccount({
                    ...account,
                    professionalLicenseInstitution: e.target.value,
                  })
                }
              />
            </div>
          </div>
          {user?.professionalLicense?.length > 0 &&
            user?.pwaProfressionId > 0 && (
              <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 justify-start items-end gap-3">
                <div className="flex flex-col justify-between items-start relative gap-1">
                  <p className="input-label mb-2">Especialidad</p>
                  <AutocompleteInputSpecialties
                    defaultValue={formData.speciality_name}
                    onClick={(item) =>
                      setFormData({
                        ...formData,
                        specialty_id: item.id,
                        specialty_name: item.name,
                        specialty_doctor_id: account.userId
                          ? parseInt(account.userId, 10)
                          : 0,
                      })
                    }
                    onChange={(item) =>
                      setFormData({
                        ...formData,
                        specialty_id: 0,
                        specialty_name: item,
                        specialty_doctor_id: account.userId,
                      })
                    }
                    doctorId={account.userId ? parseInt(account.userId, 10) : 0}
                    className="form-control w-full"
                  />

                  {/* <FormSelect
                value={formData["specialty_id"]}
                disabled={
                  account?.professionalLicense?.length === 0 ||
                  !account.pwaProfressionId
                }
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
                  </FormSelect> */}
                </div>
                <div className="flex flex-col justify-between items-start relative gap-1">
                  <p className="input-label mb-2">Cédula de la especialidad</p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe la cédula de la especialidad"
                    min={0}
                    value={formData["code"]}
                    disabled={
                      account?.professionalLicense?.length === 0 ||
                      !account.pwaProfressionId
                    }
                    className="form-control w-full"
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col justify-between items-start relative gap-1">
                  <p className="input-label mb-2">Institución</p>
                  <FormInput
                    type={"text"}
                    placeholder="Escribe el nombre de la institución..."
                    min={0}
                    value={formData["institution_name"]}
                    disabled={
                      account?.professionalLicense?.length === 0 ||
                      !account.pwaProfressionId
                    }
                    className="form-control w-full"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        institution_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col justify-between items-end relative">
                  <Button
                    disabled={
                      loadingRegister ||
                      account.userId === undefined ||
                      formData.specialty_name.length === 0 ||
                      account.professionalLicense.length === 0 ||
                      formData.code.length === 0 ||
                      formData.institution_name.length === 0
                    }
                    onClick={createSpeciality}
                    className="w-full flex justify-center items-center gap-2  font-base"
                    variant="outline-primary"
                  >
                    <Lucide icon="at" />
                    <p>Agregar</p>
                  </Button>
                </div>
              </div>
            )}

          {loadingRegister ? (
            <div className="w-full flex justify-center items-center">
              <p className="font-semibold text-center text-base text-slate-900">
                Cargando...
              </p>
            </div>
          ) : account?.professionalLicense?.length === 0 ||
            !account.pwaProfressionId ? (
            <div className="w-full flex flex-col justify-center items-center">
              <p className="font-semibold text-center text-base text-slate-900">
                Tus especialidades
              </p>
              <p className="font-light text-center text-sm text-slate-500">
                Para agregar especialidades es necesario que selecciones tu
                profesión de salud y cédula profesional
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
    </div>
  );
}
