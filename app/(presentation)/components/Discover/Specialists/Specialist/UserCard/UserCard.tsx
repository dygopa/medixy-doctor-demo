import { FiImage } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { useContext, useMemo, useState, Dispatch, SetStateAction } from "react";
import Avatar from "./Avatar/Avatar";
import { IUserCardContext, UserCardContext } from "./context/UserCardContext";
import {
  ISpecialistsContext,
  SpecialistsContext,
} from "../../context/SpecialistsContext";
import { JiraInput } from "(presentation)/components/core/JiraInput/JiraInput";
import { Specialist } from "domain/core/entities/specialists/specialist";
import LocalitiesComponent from "./Localities/LocalitiesAndServices";

export const UserCardComponent = ({
  specialist,
  setIsVisible,
}: {
  specialist: Specialist;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    state: stateSpecialist,
    actions: actionsSpecialist,
    dispatch: dispatchSpecialist,
  } = useContext<ISpecialistsContext>(SpecialistsContext);
  const { getSpecialist } = actionsSpecialist;

  const { state, actions, dispatch } =
    useContext<IUserCardContext>(UserCardContext);
  const { editUser, updateProfileCompleted } = actions;
  const { data, loading, error, successful } = state.editUser;
  const { successful: updateAvatarSucessful } = state.updateAvatar;

  let listProfesions = [
    { id: 8, name: "Bioanalista" },
    { id: 7, name: "Enfermero/a" },
    { id: 4, name: "Farmaceuta" },
    { id: 3, name: "Fisioterapeuta" },
    { id: 1, name: "Médico" },
    { id: 6, name: "Nutriólogo" },
    { id: 2, name: "Odontólogo" },
    { id: 5, name: "Técnico radiólogo" },
  ];

  const profesion = listProfesions.find(
    (p) => p.id === specialist.pwaProfressionId
  );

  const [userObject, setUserObject] = useState({
    names: "",
    curp: "",
    shortDescription: "",
    aboutMe: "",
    pwaProfessionId: 0,
  });

  const handleNames = (value: string) => {
    return value.includes(" ") ? value.split(" ") : [value];
  };

  function handleOnClick(field: string) {
    let data = {
      accountId: specialist.accountId,
      names: specialist.names ?? "",
      first_lastname: specialist.firstName ?? "",
      second_lastname: specialist.lastName ?? "",
      curp:
        specialist.curp && specialist.curp.length > 0
          ? specialist.curp.trim()
          : null,
      phone_number: specialist.phone.trim() ?? "",
      birthdate:
        specialist.birthDate && specialist.birthDate.length > 0
          ? specialist.birthDate
          : null,
      birth_country: specialist.country.trim() ?? "",
      sex: specialist.sex ?? 0,
      person_type: specialist.personType ?? 0,
      about_me: specialist.aboutMe ?? "",
      short_description: specialist.shortDescription
        ? specialist.shortDescription
        : "",
      website_url: specialist.websiteUrl ?? "",
      address: specialist.address ?? "",
      pwa_profession_id: specialist.pwaProfressionId
        ? parseInt(specialist.pwaProfressionId.toString(), 10)
        : null,
      professional_license: specialist.professionalLicense ?? "",
      professional_license_institution:
        specialist.professionalLicenseInstitution ?? "",
    };

    switch (field) {
      case "names":
        editUser({
          ...data,
          names: handleNames(userObject.names)[0] ?? specialist.names,
          first_lastname:
            handleNames(userObject.names)[1] ?? specialist.firstName,
          second_lastname:
            handleNames(userObject.names)[2] ?? specialist.lastName,
        })(dispatch);
        break;
      case "curp":
        editUser({
          ...data,
          curp: userObject.curp,
        })(dispatch);
        break;
      case "shortDescription":
        editUser({
          ...data,
          short_description: userObject.shortDescription,
        })(dispatch);
        break;
      case "aboutMe":
        editUser({
          ...data,
          about_me: userObject.aboutMe,
        })(dispatch);
        break;
      case "pwaProfessionId":
        editUser({
          ...data,
          pwa_profession_id: userObject.pwaProfessionId,
        })(dispatch);
        break;
      default:
        break;
    }
  }

  useMemo(() => {
    if (successful || updateAvatarSucessful) {
      getSpecialist(specialist.accountId)(dispatchSpecialist);
    }
  }, [successful, updateAvatarSucessful]);

  const onValidCompletedProfileSpecialist = () => {
    if (
      specialist.avatar &&
      specialist.avatar.length > 0 &&
      specialist.shortDescription &&
      specialist.shortDescription.length > 0 &&
      specialist.pwaProfressionId &&
      parseInt(specialist.pwaProfressionId.toString(), 10) > 0 &&
      !specialist.completedProfile
    ) {
      setIsVisible(true);
      updateProfileCompleted(specialist.userId, specialist.accountId)(dispatch);
    }
  };

  useMemo(() => {
    if (specialist?.userId) {
      onValidCompletedProfileSpecialist();
    }
  }, [specialist]);

  return (
    <>
      <div
        className={twMerge([
          "bg-white rounded-lg p-6 shadow-sm border relative h-fit flex flex-col justify-start items-start gap-5",
          "lg:col-span-3",
          "col-span-6",
        ])}
      >
        <div className="w-full h-fit grid grid-cols-3 justify-start items-start gap-5">
          <Avatar disabled={false} specialist={specialist} />
          <div className="col-span-2 h-36 flex flex-col justify-start items-start text-left">
            <div className="w-full h-fit relative flex justify-start items-start px-1">
              <span className="w-[10%] h-fit relative block text-lg text-slate-900 font-semibold py-1">
                {specialist.sex === 1 ? "Dra." : "Dr."}
              </span>
              <div className="w-[90%] h-fit relative block">
                <JiraInput
                  onClick={() => {
                    handleOnClick("names");
                  }}
                  customStyleText={"text-lg text-slate-900 font-semibold"}
                  customType="text"
                  loading={loading}
                  text={`${specialist?.names} ${specialist?.firstName}`}
                  onChange={(e) => {
                    setUserObject({ ...userObject, names: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-start">
              <JiraInput
                onClick={() => {
                  handleOnClick("pwaProfessionId");
                }}
                customStyleText={"text-base text-slate-500 font-light"}
                placeholder="Selecciona tu especialidad"
                customType="select"
                text={profesion?.name ?? "Selecciona tu especialidad"}
                loading={loading}
                customList={listProfesions.map((value: any) => ({
                  id: value.id,
                  value: value.name,
                }))}
                onChange={(e) => {
                  setUserObject({
                    ...userObject,
                    pwaProfessionId: e.target.value,
                  });
                }}
              />
              <JiraInput
                onClick={() => {
                  handleOnClick("shortDescription");
                }}
                customStyleText={
                  "text-base hidden md:block text-slate-500 font-light"
                }
                customType="text"
                loading={loading}
                text={
                  specialist.shortDescription !== ""
                    ? specialist.shortDescription
                    : "Descripción corta de tí"
                }
                placeholder="Descripción corta de tí"
                onChange={(e) => {
                  setUserObject({
                    ...userObject,
                    shortDescription: e.target.value,
                  });
                }}
              />
              {specialist.curp && (
                <div className="flex w-full justify-start items-center px-1">
                  <span className="block w-[30%] text-base text-slate-500 font-light">
                    N° de CURP:
                  </span>
                  <div className="w-[70%] flex justify-start items-center">
                    <JiraInput
                      onClick={() => {
                        handleOnClick("curp");
                      }}
                      customStyleText={"text-base text-slate-500 font-light"}
                      customType="text"
                      loading={loading}
                      text={specialist.curp}
                      onChange={(e) => {
                        setUserObject({ ...userObject, curp: e.target.value });
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {specialist?.aboutMe && (
          <div className="w-full relative h-fit flex flex-col justify-start items-start gap-6">
            <div className="w-full flex flex-col justify-center items-start gap-2">
              <p className="text-lg text-slate-900 font-semibold">
                Información sobre mí
              </p>
              <div className="w-full bg-slate-300 h-px block relative"></div>
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-4">
              <p className="text-base text-slate-500 font-light w-full">
                <JiraInput
                  onClick={() => {
                    handleOnClick("aboutMe");
                  }}
                  customStyleText={"text-base text-slate-500 font-light"}
                  customType="textarea"
                  text={specialist?.aboutMe}
                  loading={loading}
                  onChange={(e) => {
                    setUserObject({ ...userObject, aboutMe: e.target.value });
                  }}
                />
              </p>
            </div>
          </div>
        )}
        <LocalitiesComponent specialist={specialist} />
      </div>
    </>
  );
};
