import { twMerge } from "tailwind-merge";
import {
  useContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import Avatar from "./Avatar/Avatar";
import { IUserCardContext, UserCardContext } from "./context/UserCardContext";
import {
  ISpecialistsContext,
  SpecialistsContext,
} from "../../context/SpecialistsContext";
import { Specialist } from "domain/core/entities/specialists/specialist";
import LocalitiesComponent from "./Localities/LocalitiesAndServices";
import NameField from "./Fields/NameField";
import ProfessionField from "./Fields/ProfessionField";
import CURPField from "./Fields/CURPField";
import TooltipIndicator from "(presentation)/components/core/TooltipIndacator/tooltipIndicator";
import AboutMeField from "./Fields/AboutMeField";
import ShortDescriptionField from "./Fields/ShortDescriptionField";

export const UserCardComponent = ({
  step,
  setStep,
  specialist,
  setIsVisible,
  finishedStep,
}: {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  specialist: Specialist;
  setIsVisible: () => void;
  finishedStep: boolean;
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
  const { successful: updateCompletedProfileSucessful } =
    state.updateCompletedProfile;
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
      !specialist.avatar ||
      (specialist.avatar && specialist.avatar.length === 0)
    ) {
      setStep(0);
      return;
    }

    if (
      !specialist.pwaProfressionId ||
      (specialist.pwaProfressionId &&
        parseInt(specialist.pwaProfressionId.toString(), 10) === 0)
    ) {
      setStep(2);
      return;
    }

    if (
      !specialist.shortDescription ||
      (specialist.shortDescription && specialist.shortDescription.length === 0)
    ) {
      setStep(3);
      return;
    }

    if (
      specialist.avatar &&
      specialist.avatar.length > 0 &&
      specialist.shortDescription &&
      specialist.shortDescription.length > 0 &&
      specialist.pwaProfressionId &&
      parseInt(specialist.pwaProfressionId.toString(), 10) > 0 &&
      finishedStep
    ) {
      updateProfileCompleted(specialist.userId, specialist.accountId)(dispatch);
      return;
    }

    setStep(4);
  };

  useMemo(() => {
    if (specialist?.userId) {
      onValidCompletedProfileSpecialist();
    }
  }, [specialist, finishedStep]);

  useEffect(() => {
    if (updateCompletedProfileSucessful) {
      setIsVisible();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateCompletedProfileSucessful]);

  return (
    <>
      {step !== 5 && (
        <div className="fixed top-0 left-0 w-screen h-screen z-[200] bg-black bg-opacity-70" />
      )}

      {/* <div
        className={clsx([
          "h-fit relative flex justify-between items-center bg-primary rounded-md p-3 mb-8",
          step !== 0 && step !== 4 && "fixed z-[201]",
        ])}
      >
        <div className="text-left flex flex-col justify-center items-start">
          <p className="text-base text-white font-bold">Completa tu perfil</p>
          <p className="text-sm text-white font-light">
            Completa los campos restantes para que los pacientes vean
            información más detallada sobre tí
          </p>
        </div>
      </div> */}

      <div className="">
        {step === 0 && (
          <>
            <div className="absolute z-[201] top-28 xl:left-[850px] lg:left-[550px] md:left-[470px] lg:block md:block hidden">
              <TooltipIndicator
                tittle="¡Completa tu perfil!"
                description="Para mejorar la visualización de tu presentación en nuestro directorio, es primordial que completes tu perfil."
                onClick={() => setStep(1)}
                tittleButton="De acuerdo"
                direcction="left"
              />
            </div>

            <div className="absolute z-[201] top-[500px] xl:left-[850px] lg:left-[550px] md:left-[470px] left-2 right-2 lg:hidden md:hidden block">
              <TooltipIndicator
                tittle="¡Completa tu perfil!"
                description="Para mejorar la visualización de tu presentación en nuestro directorio, es primordial que completes tu perfil."
                onClick={() => setStep(1)}
                tittleButton="De acuerdo"
                direcction="top"
              />
            </div>
          </>
        )}

        <div className="w-full">
          <div
            className={twMerge([
              "bg-white rounded-lg p-6 shadow-sm border xl:w-[700px] lg:w-[450px] md:w-[450px] w-[370px]",
              step === 0 && "absolute z-[200]",
            ])}
          >
            <div className="w-full h-fit grid grid-cols-3 justify-start items-start gap-5">
              <Avatar
                disabled={step === 0}
                specialist={specialist}
                step={step}
                setStep={setStep}
              />
              <div className="col-span-2 h-36 flex flex-col justify-start items-start text-left lg:ml-0 md:ml-0 ml-3">
                <div className="w-full h-fit flex justify-start items-start px-1">
                  <span className="w-[10%] h-fit block text-lg text-slate-900 font-semibold py-1">
                    {specialist.sex === 1 ? "Dra." : "Dr."}
                  </span>
                  <div className="w-[90%] h-fit block">
                    <NameField
                      step={step}
                      handleOnClick={handleOnClick}
                      setUserObject={setUserObject}
                      loading={loading}
                      specialist={specialist}
                      userObject={userObject}
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col justify-center items-start">
                  <div className="w-[225px] h-[35px]">
                    <ProfessionField
                      handleOnClick={handleOnClick}
                      setUserObject={setUserObject}
                      loading={loading}
                      userObject={userObject}
                      listProfesions={listProfesions}
                      profesion={profesion}
                      step={step}
                      setStep={setStep}
                    />
                  </div>
                  <div className="w-[225px] h-[35px]">
                    <ShortDescriptionField
                      handleOnClick={handleOnClick}
                      setUserObject={setUserObject}
                      loading={loading}
                      specialist={specialist}
                      userObject={userObject}
                      step={step}
                      setStep={setStep}
                    />
                  </div>
                  {specialist.curp && (
                    <div className="w-[225px] relative h-[35px]">
                      <CURPField
                        step={step}
                        handleOnClick={handleOnClick}
                        setUserObject={setUserObject}
                        loading={loading}
                        specialist={specialist}
                        userObject={userObject}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            {specialist?.aboutMe && (
              <AboutMeField
                step={step}
                handleOnClick={handleOnClick}
                setUserObject={setUserObject}
                loading={loading}
                specialist={specialist}
                userObject={userObject}
              />
            )}
            <div className="mt-4">
              <LocalitiesComponent specialist={specialist} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
