import React, {
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useMemo,
  useEffect,
} from "react";
import {
  IStepByStepAppointmentContext,
  StepByStepAppointmentContext,
} from "../../context/StepByStepAppointmentContext";
import Button from "(presentation)/components/core/BaseComponents/Button";
import SpecialSearch from "(presentation)/components/core/SpecialSearch/SpecialSearch";
import { twMerge } from "tailwind-merge";
import { FiUser, FiX } from "react-icons/fi";
import { ISubject } from "domain/core/entities/subjectEntity";
import moment from "moment";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import {
  IScheduleContext,
  ScheduleContext,
} from "(presentation)/components/Schedule/context/ScheduleContext";
import { IUser } from "domain/core/entities/userEntity";
import { NameValidator } from "(presentation)/(validators)/nameValidator";
import { LastNameValidator } from "(presentation)/(validators)/lastNameValidator";
import { EmailValidator } from "(presentation)/(validators)/emailValidator";
import { BirthDateValidator } from "(presentation)/(validators)/birthDateValidator";

const PatientStep = ({
  user,
  appointment,
  setAppointment,
}: {
  user: IUser;
  appointment: any;
  setAppointment: Dispatch<SetStateAction<{}>>;
}) => {
  const { state: stateSchedule } =
    useContext<IScheduleContext>(ScheduleContext);
  const { data: activePatient } = stateSchedule.activePatient;

  const { state, actions, dispatch } =
    useContext<IStepByStepAppointmentContext>(StepByStepAppointmentContext);
  const { setStep, getPatients } = actions;
  const {
    data: patients,
    successful: loadedPatients,
    error: errorPatients,
  } = state.patients;

  const [patientNotFound, setPatientNotFound] = useState(false);

  const [listOfPatients, setListOfPatients] = useState([]);

  const [values, setValues] = useState({
    name: "",
    firstName: "",
    dateBirth: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    firstName: "",
    dateBirth: "",
    email: "",
  });

  const [selectedPatient, setSelectedPatient] = useState({
    id: 0,
    title: "",
    description: "",
  });

  const [loadedDataFromAppointment, setLoadedDataFromAppointment] =
    useState(false);

  const handlename = (value: string) => {
    setValues({ ...values, name: value });
    if (!new NameValidator(value).validate_not_empty().isValid) {
      setErrors((previousState) => {
        return {
          ...previousState,
          name:
            new NameValidator(value).validate_not_empty().error?.message ?? "",
        };
      });
      return true;
    }
    if (!new NameValidator(value).validate_max_length().isValid) {
      setErrors((previousState) => {
        return {
          ...previousState,
          name:
            new NameValidator(value).validate_max_length().error?.message ?? "",
        };
      });
      return true;
    }
    if (!new NameValidator(value).validate_regexp().isValid) {
      setErrors((previousState) => {
        return {
          ...previousState,
          name: new NameValidator(value).validate_regexp().error?.message ?? "",
        };
      });
      return true;
    }
    setErrors({ ...errors, name: "" });
    return false;
  };

  const handlelastname = (value: string) => {
    setValues({ ...values, firstName: value });
    if (!new LastNameValidator(value).validate_not_empty().isValid) {
      setErrors((previousState) => {
        return {
          ...previousState,
          firstName:
            new LastNameValidator(value).validate_not_empty().error?.message ??
            "",
        };
      });
      return true;
    }
    if (!new LastNameValidator(value).validate_max_length().isValid) {
      setErrors((previousState) => {
        return {
          ...previousState,
          firstName:
            new LastNameValidator(value).validate_max_length().error?.message ??
            "",
        };
      });
      return true;
    }
    if (!new LastNameValidator(value).validate_regexp().isValid) {
      setErrors((previousState) => {
        return {
          ...previousState,
          firstName:
            new LastNameValidator(value).validate_regexp().error?.message ?? "",
        };
      });
      return true;
    }
    setErrors({ ...errors, firstName: "" });
    return false;
  };

  const handlebirthdate = (value: string) => {
    setValues({ ...values, dateBirth: value });
    if (!new BirthDateValidator(value).validate_not_empty().isValid) {
      setErrors({
        ...errors,
        dateBirth:
          new BirthDateValidator(value).validate_not_empty().error?.message ??
          "",
      });
      return true;
    }

    setErrors({ ...errors, dateBirth: "" });
    return false;
  };

  const handleEmail = (value: string) => {
    setValues({ ...values, email: value.trim() });
    if (!new EmailValidator(value).validate_not_empty().isValid) {
      setErrors({
        ...errors,
        email:
          new EmailValidator(value).validate_not_empty().error?.message ?? "",
      });
      return true;
    }

    if (!new EmailValidator(value).validate_regexp().isValid) {
      setErrors({
        ...errors,
        email: new EmailValidator(value).validate_regexp().error?.message ?? "",
      });
      return true;
    }
    setErrors({ ...errors, email: "" });
    return false;
  };

  useEffect(() => {
    if (!loadedDataFromAppointment) {
      if (appointment["patient"]) {
        setSelectedPatient({
          id: appointment["patientId"],
          title: appointment["patient"]["name"],
          description: "",
        });
        setValues({
          name: appointment["patient"]["name"],
          firstName: "",
          dateBirth: "",
          email: "",
        });
      }
      setLoadedDataFromAppointment(true);
    }
  }, [loadedDataFromAppointment]);

  useMemo(() => {
    if (activePatient?.subjectId) {
      setValues({
        ...values,
        name: activePatient["name"],
        firstName: activePatient["lastName"],
        dateBirth: "",
        email: "",
      });
      setSelectedPatient({
        id: activePatient["subjectId"],
        title: activePatient["name"],
        description: "",
      });
    }
  }, [activePatient]);

  useMemo(() => {
    if (loadedPatients) {
      let list_patients = patients.data.map((elem: ISubject) => ({
        id: elem.subjectId,
        title: `${elem.name} ${elem.lastName}`,
        description: `${elem.phoneNumber} ${
          elem.curp.length > 0 ? `- ${elem.curp}` : ""
        }`,
        type: "PATIENT",
      }));
      setListOfPatients(list_patients as []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedPatients]);

  useMemo(() => {
    if (user) {
      getPatients({
        userId: user.userId,
      })(dispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSetAppointment = () => {
    if (
      selectedPatient.id === 0 &&
      (handleEmail(values.email) ||
        handlename(values.name) ||
        handlelastname(values.firstName) ||
        handlebirthdate(values.dateBirth))
    ) {
      return;
    }

    setAppointment({
      ...appointment,
      patient: values,
    });
    setStep(3)(dispatch);
  };

  return (
    <div className={"w-full h-fit relative flex flex-col gap-4"}>
      <div className="w-full flex flex-col justify-center items-start gap-2">
        {!activePatient?.subjectId && (
          <>
            <p className="font-normal text-sm text-slate-600">
              Busca el nombre del paciente
            </p>

            <SpecialSearch
              customClick={(value: any) => {
                setPatientNotFound(false);
                setSelectedPatient(value);
                setValues({
                  name: value.title,
                  firstName: "",
                  dateBirth: "",
                  email: "",
                });
                setAppointment({
                  ...appointment,
                  patientId: value["id"],
                  patient: value,
                });
              }}
              customClickEmpty={() => {
                console.log("Empty");
              }}
              list={listOfPatients}
              placeholder={"Buscar"}
              selectedItem={selectedPatient}
            />
          </>
        )}
        {selectedPatient["title"] !== "" && (
          <div
            className={twMerge([
              "w-full h-fit flex justify-between items-center gap-3 bg-white",
            ])}
          >
            <div className="w-12 h-12 overflow-hidden rounded-lg bg-primary/20 text-primary text-lg flex flex-col justify-center items-center">
              <FiUser />
            </div>
            <div className="w-[90%] h-full flex flex-col justify-center items-start">
              <p className="font-semibold text-gray-950 text-[0.9rem]">
                Paciente - {selectedPatient["title"]}
              </p>
              <p className="font-light text-gray-600 text-sm">
                {selectedPatient["description"]}
              </p>
            </div>
            {!activePatient?.subjectId && (
              <div
                onClick={() => {
                  setAppointment({
                    ...appointment,
                    patientId: 0,
                    patient: null,
                  });
                  setSelectedPatient({
                    id: 0,
                    title: "",
                    description: "",
                  });
                }}
                className="cursor-pointer w-8 h-8 overflow-hidden rounded-lg bg-red-500/20 text-red-500 text-lg flex flex-col justify-center items-center"
              >
                <FiX />
              </div>
            )}
          </div>
        )}

        {selectedPatient["id"] === 0 && (
          <div className="w-full flex flex-col justify-start items-center gap-4 mt-4 relative">
            <div className="w-full flex flex-col justify-center items-start text-left gap-1">
              <p className="font-medium text-base text-slate-900">
                Nuevo paciente
              </p>
              <p className="font-light text-sm text-slate-500">
                Registra la información necesaria de tu paciente para agendar la
                cita a su cuenta
              </p>
            </div>
            <div className="w-full flex flex-col justify-start items-center gap-3 relative">
              <div className="grid grid-cols-2 gap-2 w-full">
                <div className="input-group">
                  <p className="input-label pb-2">
                    Nombre <span className="text-primary font-bold">*</span>
                  </p>
                  <FormInput
                    type="text"
                    onChange={(e: any) => handlename(e.target.value)}
                    placeholder="Nombre"
                  />
                  {errors.name.length > 0 && (
                    <div className="mt-1">
                      <span className="text-red-500 mt-3">{errors.name}</span>
                    </div>
                  )}
                </div>
                <div className="input-group">
                  <p className="input-label pb-2">
                    Primer apellido{" "}
                    <span className="text-primary font-bold">*</span>
                  </p>
                  <FormInput
                    type="text"
                    onChange={(e: any) => handlelastname(e.target.value)}
                    placeholder="Primer apellido"
                  />
                  {errors.firstName.length > 0 && (
                    <div className="mt-1">
                      <span className="text-red-500 mt-3">
                        {errors.firstName}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="input-group w-full">
                <p className="input-label py-2">
                  Fecha de nacimiento{" "}
                  <span className="text-primary font-bold">*</span>
                </p>
                <FormInput
                  type={"date"}
                  max={moment().format("YYYY-MM-DD")}
                  onChange={(e: any) => handlebirthdate(e.target.value)}
                  className="form-control w-full"
                />
                {errors.dateBirth.length > 0 && (
                  <div className="mt-1">
                    <span className="text-red-500 mt-3">
                      {errors.dateBirth}
                    </span>
                  </div>
                )}
              </div>

              <div className="input-group w-full">
                <p className="input-label py-2">
                  Email <span className="text-primary font-bold">*</span>
                </p>
                <FormInput
                  type="email"
                  onChange={(e: any) => handleEmail(e.target.value)}
                  placeholder="Email"
                />
                {errors.email.length > 0 && (
                  <div className="mt-1">
                    <span className="text-red-500 mt-3">{errors.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 sticky bottom-0 py-3 bg-white">
        <Button
          disabled={
            selectedPatient.id === 0 &&
            (values.name === "" ||
              values.firstName === "" ||
              values.dateBirth === "" ||
              values.email === "")
          }
          onClick={() => onSetAppointment()}
          variant="primary"
          type="button"
          className="w-full"
        >
          Continuar
        </Button>
        <p
          onClick={() => {
            setStep(1)(dispatch);
          }}
          className="cursor-pointer font-normal text-sm text-primary text-center"
        >
          Regresar
        </p>
      </div>
    </div>
  );
};

export default PatientStep;
