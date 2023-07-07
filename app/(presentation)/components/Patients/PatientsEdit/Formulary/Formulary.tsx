import React, {
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import BasicData from "./BasicData";
import Credentials from "./Credentials";
import Direction from "./Direction";
import { IUser } from "domain/core/entities/userEntity";
import Button from "(presentation)/components/core/BaseComponents/Button";
/*import { IUserContext, UserContext } from "../context/UserContext";*/
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import {
  EditPatientContext,
  IEditPatientContext,
} from "../context/EditPatientContext";
import { useRouter } from "next/navigation";
import { PatientsRoutesEnum } from "(presentation)/(routes)/patientsRoutes";
import { ISubject } from "domain/core/entities/subjectEntity";
import CompanionsList from "./Companion/CompanionsList";
import CompanionCreate from "./Companion/CompanionCreate";
import {
  CompanionsListContext,
  ICompanionsListContext,
} from "./Companion/context/companionListContext";
import CompanionEdit from "./Companion/CompanionEdit";
import { IFederalEntity } from "domain/core/entities/federalEntitiesEntity";
import { IMunicipality } from "domain/core/entities/municipalityEntity";
import { ICountryLocation } from "domain/core/entities/countryEntity";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";

export default function Formulary() {
  const { state, actions, dispatch } =
    useContext<IEditPatientContext>(EditPatientContext);
  const { editSubject } = actions;
  const { data: patient } = state.subject;
  const { loading, successful, error } = state.editSubject;
  const {
    state: stateCompanions,
    actions: actionsCompanions,
    dispatch: dispatchCompanions,
  } = useContext<ICompanionsListContext>(CompanionsListContext);
  const {
    data: createCompanionResult,
    loading: loadingCompanion,
    successful: successfulCompanion,
    error: errorCompanion,
  } = stateCompanions.createCompanion;
  const { createCompanion } = actionsCompanions;

  const router = useRouter();

  const [values, setValues] = useState({
    id: 0,
    name: "",
    lastname: "",
    motherlastname: "",
    age: "",
    curp: "",
    sex: 0,
    gender: 0,
    phone: "",
    country: "",
    email: "",
    birthDate: "",
    federalEntity: 0,
    municipality: 0,
    countryLocation: 0,
    city: "",
    direction: "",
    street: "",
    pictureUrl: "",
  });

  const [errors, setErrors] = useState({
    global: "",
    name: "",
    lastname: "",
    motherlastname: "",
    age: "",
    curp: "",
    sex: "",
    country: "",
    email: "",
    phone: "",
    federalEntity: "",
  });

  const [valuesEditCompanion, setValuesEditCompanion] = useState({
    name: "",
    lastname: "",
    motherlastname: "",
    age: "",
    curp: "",
    sex: 0,
    gender: 0,
    phone: "",
    country: "",
    email: "",
    birthDate: "",
    federalEntity: 0,
    municipality: 0,
    countryLocation: 0,
    city: "",
    direction: "",
    street: "",
  });

  const [errorsEditCompanion, setErrorsEditCompanion] = useState({
    global: "",
    name: "",
    lastname: "",
    motherlastname: "",
    age: "",
    curp: "",
    sex: "",
    country: "",
    email: "",
    phone: "",
    federalEntity: "",
  });

  const [valuesNewCompanion, setValuesNewCompanion] = useState({
    name: "",
    lastname: "",
    motherlastname: "",
    age: "",
    curp: "",
    sex: 0,
    gender: 0,
    phone: "",
    country: "",
    email: "",
    birthDate: "",
    federalEntity: 0,
    municipality: 0,
    countryLocation: 0,
    city: "",
    direction: "",
    street: "",
  });

  const [errorsNewCompanion, setErrorsNewCompanion] = useState({
    global: "",
    name: "",
    lastname: "",
    motherlastname: "",
    age: "",
    curp: "",
    sex: "",
    country: "",
    email: "",
    phone: "",
    federalEntity: "",
  });

  const setInitialValues = () => {
    setValues({
      ...values,
      id: patient?.subjectId ?? 0,
      name: patient?.name ?? "",
      lastname: patient?.lastName ?? "",
      motherlastname: patient?.motherLastName ?? "",
      curp: patient?.curp ?? "",
      sex: patient?.sex ?? 0,
      gender: patient?.gender ?? 0,
      email: patient?.email ?? "",
      birthDate: patient?.birthDate ?? "",
      phone: patient?.phoneNumber ?? "",
      country: patient?.country ?? "",
      federalEntity: patient?.federativeEntityId ?? 0,
      municipality: patient?.municipalityId ?? 0,
      countryLocation: patient?.countryLocationId ?? 0,
      city: patient?.city ?? "",
      street: patient?.street ?? "",
      direction: patient?.address ?? "",
      pictureUrl: patient?.pictureUrl ?? "",
    });
  };

  useEffect(() => {
    setInitialValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validForm = () => {
    let errorsFieldsCount = 0;

    if (errors.global.length > 0) errorsFieldsCount++;

    if (errors.name.length > 0) errorsFieldsCount++;

    if (errors.lastname.length > 0) errorsFieldsCount++;

    if (errors.motherlastname.length > 0) errorsFieldsCount++;

    if (errors.age.length > 0) errorsFieldsCount++;

    if (errors.curp.length > 0) errorsFieldsCount++;

    if (errors.sex.length > 0) errorsFieldsCount++;

    if (errors.country.length > 0) errorsFieldsCount++;

    if (errors.email.length > 0) errorsFieldsCount++;

    if (errors.phone.length > 0) errorsFieldsCount++;

    if (errors.federalEntity.length > 0) errorsFieldsCount++;

    return errorsFieldsCount;
  };

  const validFormNewCompanion = () => {
    let errorsFieldsCount = 0;

    if (errorsNewCompanion.global.length > 0) errorsFieldsCount++;

    if (errorsNewCompanion.name.length > 0) errorsFieldsCount++;

    if (errorsNewCompanion.lastname.length > 0) errorsFieldsCount++;

    if (errorsNewCompanion.motherlastname.length > 0) errorsFieldsCount++;

    if (errorsNewCompanion.age.length > 0) errorsFieldsCount++;

    if (errorsNewCompanion.curp.length > 0) errorsFieldsCount++;

    if (errorsNewCompanion.sex.length > 0) errorsFieldsCount++;

    if (errorsNewCompanion.country.length > 0) errorsFieldsCount++;

    if (errorsNewCompanion.email.length > 0) errorsFieldsCount++;

    if (errorsNewCompanion.phone.length > 0) errorsFieldsCount++;

    if (errorsNewCompanion.federalEntity.length > 0) errorsFieldsCount++;

    return errorsFieldsCount;
  };

  const onSubmit = () => {
    const hasErrorsCount = validForm();

    if (hasErrorsCount > 0) return;

    const patientEdit: ISubject = {
      subjectId: patient?.subjectId ?? 0,
      name: values.name,
      lastName: values.lastname,
      motherLastName: values.motherlastname,
      curp: values.curp,
      email: values.email,
      sex: values.sex,
      gender: values.gender,
      phoneNumber: values.phone,
      federativeEntityId: values.federalEntity,
      municipalityId: values.municipality !== 0
        ? values.municipality
        : null,
      countryLocationId: values.countryLocation !== 0
       ? values.countryLocation
       : null,
      street: values.street,
      country: values.country,
      state: 0,
      address: values.direction,
      city: values.city,
      pictureUrl: "",
      isPatient: true,
      birthDate: values.birthDate ?? null,
      createdOn: patient?.createdOn ?? new Date(),
      updatedOn: new Date(),
      deletedOn: null,
    };

    editSubject(patientEdit)(dispatch);
  };

  const onSubmitEditCompanion = (e: any) => {
    const hasErrorsCount = validForm();

    if (hasErrorsCount > 0) return;

    const companionNewEdit: ISubject = {
      subjectId: companionEdit?.subjectId ?? 0,
      name: valuesEditCompanion.name,
      lastName: valuesEditCompanion.lastname,
      motherLastName: valuesEditCompanion.motherlastname,
      curp: valuesEditCompanion.curp,
      email: valuesEditCompanion.email,
      sex: valuesEditCompanion.sex,
      gender: valuesEditCompanion.gender,
      phoneNumber: valuesEditCompanion.phone,
      federativeEntityId: valuesEditCompanion.federalEntity,
      municipalityId:
        valuesEditCompanion.municipality !== 0
          ? valuesEditCompanion.municipality
          : null,
      countryLocationId:
        valuesEditCompanion.countryLocation !== 0
          ? valuesEditCompanion.countryLocation
          : null,
      street: valuesEditCompanion.street,
      country: valuesEditCompanion.country,
      state: 0,
      address: valuesEditCompanion.direction,
      city: valuesEditCompanion.city,
      pictureUrl: "",
      isPatient: false,
      birthDate: valuesEditCompanion.birthDate ?? null,
      createdOn: patient?.createdOn ?? new Date(),
      updatedOn: new Date(),
      deletedOn: null,
    };

    editSubject(companionNewEdit)(dispatch);
  };

  useEffect(() => {
    /*if (successful) {
      setTimeout(() => {
        router.push(PatientsRoutesEnum.PatientsList);
      }, 3500);
    }*/
    if (successfulCompanion) {
      setTimeout(() => {
        setNewCompanion(false);
      }, 3500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful, successfulCompanion]);

  let listTabs = ["Información básica", "Contactos"];

  const TabComponent = ({ title, index }: { title: string; index: number }) => {
    return (
      <div
        onClick={() => {
          setTabsActive(index);
        }}
        className={`lg:text-[0.9rem] md:text-[0.9rem] text-[12px] w-fit p-4 cursor-pointer hover:border-primary hover:border-b-[3px] text-center hover:text-slate-900 hover:font-bold
    ${
      tabsActive === index
        ? "border-primary border-b-[3px] font-bold text-slate-900"
        : "text-slate-400 font-normal border-b-[3px] border-transparent"
    }
  `}
      >
        {title}
      </div>
    );
  };

  const [tabsActive, setTabsActive] = useState(0);

  const [newCompanion, setNewCompanion] = useState(false);

  const [companionEdit, setCompanionEdit] = useState<ISubject | null>(null);

  const onNewCompanion = (e: any) => {
    if (!newCompanion) {
      setNewCompanion(true);
    } else {
      const companionNew = {
        name: valuesNewCompanion.name,
        lastName: valuesNewCompanion.lastname,
        motherLastName: valuesNewCompanion.motherlastname,
        curp: valuesNewCompanion.curp,
        email: valuesNewCompanion.email,
        sex: valuesNewCompanion.sex,
        gender: valuesNewCompanion.gender,
        phoneNumber: valuesNewCompanion.phone,
        federativeEntityId: valuesNewCompanion.federalEntity,
        municipalityId:
          valuesNewCompanion.municipality !== 0
            ? valuesNewCompanion.municipality
            : null,
        countryLocationId:
          valuesNewCompanion.countryLocation !== 0
            ? valuesNewCompanion.countryLocation
            : null,
        street: valuesNewCompanion.street,
        country: valuesNewCompanion.country,
        state: 0,
        address: valuesNewCompanion.direction,
        city: valuesNewCompanion.city,
        pictureUrl: "",
        isPatient: false,
        birthDate: valuesNewCompanion.birthDate ?? null,
        createdOn: patient?.createdOn ?? new Date(),
        updatedOn: new Date(),
        deletedOn: null,
      };

      createCompanion(patient?.subjectId, companionNew)(dispatchCompanions);
    }
  };

  const getComponentByTabActive = () => {
    switch (tabsActive) {
      case 0:
        return (
          <>
            <BasicData
              values={values}
              setValues={setValues}
              errors={errors}
              setErrors={setErrors}
            />
            <Direction
              values={values}
              setValues={setValues}
              errors={errors}
              setErrors={setErrors}
            />
          </>
        );
      case 1:
        return (
          <>
            {!newCompanion ? (
              <>
                {companionEdit ? (
                  <CompanionEdit
                    companionEdit={companionEdit}
                    setCompanionEdit={setCompanionEdit}
                    values={valuesEditCompanion}
                    setValues={setValuesEditCompanion}
                    errors={errorsEditCompanion}
                    setErrors={setErrorsEditCompanion}
                  />
                ) : (
                  <CompanionsList
                    idPatient={patient?.subjectId}
                    setCompanionEdit={setCompanionEdit}
                  />
                )}
              </>
            ) : (
              <CompanionCreate
                setNewCompanion={setNewCompanion}
                values={valuesNewCompanion}
                setValues={setValuesNewCompanion}
                errors={errorsNewCompanion}
                setErrors={setErrorsNewCompanion}
              />
            )}
          </>
        );
      case 2:
        return;

      default:
        return <div />;
    }
  };

  const onClickButton1: Function = () => {
    router.push(PatientsRoutesEnum.PatientsList);
  }

  return (
    <div>
      <AlertComponent
        variant="error"
        show={error !== null}
        description={
          "Ha ocurrido un error actualizando al paciente. Vuelve a intentarlo"
        }
      />
      <AlertComponent
        variant="error"
        show={errorCompanion !== null}
        description={
          "Ha ocurrido un error creando el acompañante. Vuelve a intentarlo"
        }
      />
      <SuccessfulComponent 
        tittle="Actualizado con exito"
        show={successfulCompanion}
        description={"Acompañante actualizado exitosamente"}
        textButtonPrincipal={"Ir a lista de pacientes"}
        onClickButtonPrincipal={onClickButton1}
      />
      <SuccessfulComponent 
        tittle="Actualizado con exito"
        show={successful}
        description={"Paciente actualizado exitosamente"}
        textButtonPrincipal={"Ir a lista de pacientes"}
        onClickButtonPrincipal={onClickButton1}
      />

      <div className="w-full sticky top-[67px] z-[50]  bg-slate-100 pt-2">
        <div className="md:flex justify-between items-center">
          <div className="lg:w-[50%]">
            <h2 className="lg:mr-5 text-2xl font-bold truncate">
              {patient?.name} {patient?.lastName}
            </h2>
            {/*<p className="font-light text-slate-500 text-base my-3 lg:block md:block hidden">
              Completa la información de tu paciente para registrar todos sus
              datos.
            </p>*/}
          </div>

          {tabsActive != 1 ? (
            <Button
              className="my-4 w-[100%] md:w-auto"
              variant="primary"
              disabled={
                loading ||
                values.name === "" ||
                values.lastname === "" ||
                values.birthDate === "" ||
                values.phone === "" ||
                validForm() > 0
              }
              onClick={() => onSubmit()}
            >
              {loading ? "Actualizando paciente..." : "Actualizar paciente"}
            </Button>
          ) : (
            <>
              {companionEdit ? (
                <Button
                  disabled={loading}
                  className="my-4 w-[100%] md:w-auto"
                  variant="primary"
                  onClick={(e: any) => onSubmitEditCompanion(e)}
                >
                  Actualizar Contacto
                </Button>
              ) : (
                <>
                  {!newCompanion ?
                    <Button
                    className="my-4 w-[100%] md:w-auto"
                    variant="primary"
                    onClick={(e: any) => onNewCompanion(e)}
                    >
                      Nuevo contacto
                    </Button>
                  :
                    <Button
                    disabled={
                      loadingCompanion || 
                      valuesNewCompanion.name === "" ||
                      valuesNewCompanion.lastname === "" ||
                      valuesNewCompanion.birthDate === "" ||
                      valuesNewCompanion.phone === "" ||
                      validFormNewCompanion() > 0
                    }
                    className="my-4 w-[100%] md:w-auto"
                    variant="primary"
                    onClick={(e: any) => onNewCompanion(e)}
                    >
                      Agregar contacto
                    </Button>
                  }
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex justify-start items-center overflow-x-auto overflow-y-hidden">
          {listTabs.map((tab, i) => (
            <TabComponent title={tab} index={i} key={i} />
          ))}
        </div>
      </div>
      <div className="w-full relative flex flex-col gap-4 mt-8">
        {getComponentByTabActive()}
      </div>
    </div>
  );
}
