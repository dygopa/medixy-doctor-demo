import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import { useState, useContext, ChangeEvent, useRef } from "react";
import { twMerge } from "tailwind-merge";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Image from "next/image";
import { b64toBlob } from "(presentation)/(helper)/files/filesHelper";
import SuccessfulComponent from "(presentation)/components/core/BaseComponents/Successful";
import { useRouter } from "next/navigation";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import {
  IMedicalCentersCreateContext,
  MedicalCentersCreateContext,
} from "../context/MedicalCentersCreateContext";
import PhoneNumberInput from "(presentation)/components/core/BaseComponents/Inputs/PhoneNumberInput/PhoneNumberInput";
import { PhoneNumberValidator } from "(presentation)/(validators)/phoneNumberValidator";
import { NameValidator } from "(presentation)/(validators)/nameValidator";
import { EmailValidator } from "(presentation)/(validators)/emailValidator";
import { PasswordValidator } from "(presentation)/(validators)/passwordValidator";
import {
  ICreateSupplier,
  IPictureSupplier,
} from "domain/core/entities/supplierEntity";
import { AdminMedicalCentersRoutesEnum } from "(presentation)/(routes)/admin/medicalCentersRoutes";
import { supplierFailuresEnum } from "domain/core/failures/supplier/supplierFailure";

export default function Formulary() {
  const { state, actions, dispatch } = useContext<IMedicalCentersCreateContext>(
    MedicalCentersCreateContext
  );
  const { createMedicalCenter } = actions;
  const { loading, error, successful } = state.createMedicalCenter;

  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    email: "",
    doctor_name: "",
    doctor_email: "",
    phone_number: "",
    password: "",
    media: {
      type: "",
      data: "",
    },
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    doctor_name: "",
    doctor_email: "",
    phone_number: "",
    password: "",
  });

  let avatarRef = useRef<HTMLInputElement>(null);

  const handleClickRef = () => avatarRef.current && avatarRef.current.click();

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

    setValues({ ...values, media: obj });
  }

  const handleName = (value: string) => {
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

    if (!new NameValidator(value).validate_max_length(100).isValid) {
      setErrors((previousState) => {
        return {
          ...previousState,
          name:
            new NameValidator(value).validate_max_length(100).error?.message ??
            "",
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

  const handleDoctorName = (value: string) => {
    setValues({ ...values, doctor_name: value });

    if (!new NameValidator(value).validate_not_empty().isValid) {
      setErrors((previousState) => {
        return {
          ...previousState,
          doctor_name:
            new NameValidator(value).validate_not_empty().error?.message ?? "",
        };
      });
      return true;
    }

    if (!new NameValidator(value).validate_max_length().isValid) {
      setErrors((previousState) => {
        return {
          ...previousState,
          doctor_name:
            new NameValidator(value).validate_max_length().error?.message ?? "",
        };
      });
      return true;
    }

    if (!new NameValidator(value).validate_regexp().isValid) {
      setErrors((previousState) => {
        return {
          ...previousState,
          doctor_name:
            new NameValidator(value).validate_regexp().error?.message ?? "",
        };
      });
      return true;
    }

    setErrors({ ...errors, name: "" });
    return false;
  };

  const handleEmail = (value: string) => {
    setValues({ ...values, email: value.trim() });

    if (!new EmailValidator(value).validate_not_empty().isValid) {
      if (!new EmailValidator(value).validate_regexp().isValid) {
        setErrors({
          ...errors,
          email:
            new EmailValidator(value).validate_regexp().error?.message ?? "",
        });
        return true;
      }
    }

    setErrors({ ...errors, email: "" });
    return false;
  };

  const handleDoctorEmail = (value: string) => {
    setValues({ ...values, doctor_email: value.trim() });

    if (!new EmailValidator(value).validate_not_empty().isValid) {
      if (!new EmailValidator(value).validate_regexp().isValid) {
        setErrors({
          ...errors,
          doctor_email:
            new EmailValidator(value).validate_regexp().error?.message ?? "",
        });
        return true;
      }
    }

    setErrors({ ...errors, doctor_email: "" });
    return false;
  };

  const handlePhone = (value: string, isValid: boolean) => {
    setValues({ ...values, phone_number: value.trim() });

    if (!new PhoneNumberValidator(value).validate_not_empty().isValid) {
      if (!isValid) {
        setErrors((previousState: any) => {
          return {
            ...previousState,
            phone_number: "El teléfono no tiene un formato correcto",
          };
        });
        return true;
      }
    }

    setErrors({ ...errors, phone_number: "" });
    return false;
  };

  const handlePassword = (value: string) => {
    setValues({ ...values, password: value });

    if (!new PasswordValidator(value).validate_not_empty().isValid) {
      setErrors({
        ...errors,
        password:
          new PasswordValidator(value).validate_not_empty().error?.message ??
          "",
      });
      return true;
    }

    if (!new PasswordValidator(value).validate_min_length().isValid) {
      setErrors({
        ...errors,
        password:
          new PasswordValidator(value).validate_min_length().error?.message ??
          "",
      });
      return true;
    }

    setErrors({ ...errors, password: "" });
    return false;
  };

  const onClickButtonPrincipal: Function = () => {
    router.push(AdminMedicalCentersRoutesEnum.MedicalCentersList);
  };

  const getErrorMessage = (): string => {
    switch (error?.code) {
      case supplierFailuresEnum.emailAlreadyRegistered:
        return "El correo del responsable ya permanece registrado";

      default:
        return "Ha ocurrido un error inesperado en la creación";
    }
  };

  const onSubmit = () => {
    const createMedicalCenterData: ICreateSupplier = {
      name: values.name,
      email: values.email.length > 0 ? values.email : null,
      doctor_name: values.doctor_name,
      doctor_email: values.doctor_email,
      phoneNumber: values.phone_number.length > 0 ? values.phone_number : null,
      password: values.password,
      typeSupplierId: 2,
      picture: {
        data: values.media.data,
        type: values.media.type,
      } as IPictureSupplier,
    } as ICreateSupplier;

    createMedicalCenter({ createMedicalCenter: createMedicalCenterData })(
      dispatch
    );
  };

  return (
    <>
      <AlertComponent
        variant="error"
        show={error !== null}
        description={getErrorMessage()}
      />
      <SuccessfulComponent
        tittle="Centro médico agregado con exito"
        show={successful}
        description={"Centro médico se ha creado exitosamente."}
        textButtonPrincipal={"Ir a centros médicos"}
        onClickButtonPrincipal={onClickButtonPrincipal}
      />

      <div className="w-full md:flex justify-between items-start sticky top-[67px] z-[50] bg-slate-100 py-2">
        <h2 className="lg:mr-5 lg:mb-0 mb-4 text-2xl font-bold truncate">
          Nuevo centro médico
        </h2>
        <div className="md:w-[40%]  flex justify-end items-center lg:gap-8 gap-2">
          <Button
            disabled={
              loading ||
              values.name === "" ||
              values.doctor_email === "" ||
              values.password === "" ||
              values.doctor_name === "" ||
              values.media.data === ""
            }
            onClick={() => onSubmit()}
            variant="primary"
            className="lg:w-1/2 w-full px-7"
          >
            <Lucide icon="plus" color="#fff" className="mr-2" />
            {loading ? "Creando..." : "Crear centro"}
          </Button>
        </div>
      </div>
      <div className="flex mt-5 justify-center w-full">
        <div className="relative flex w-full justify-center">
          <div className="bg-white lg:w-[60%] shadow-xl shadow-slate-100 rounded-md h-fit p-7 lg:mb-0 mb-8">
            <div className=" w-full flex">
              <div className="w-full flex flex-wrap justify-between items-center gap-6 relative">
                <div className="w-full border-b mb-2">
                  <p className="font-medium text-base text-slate-900 pb-2">
                    Definición del centro médico
                  </p>
                </div>
                <div className="text-center relative w-full gap-3">
                  {values?.media?.data?.length > 0 ? (
                    <>
                      <div className="flex text-center w-full justify-center">
                        <div className="w-[150px] h-[150px] relative flex justify-center hover:border hover:border-primary rounded-xl">
                          <input
                            accept="image/png, image/jpeg, application/pdf"
                            type="file"
                            ref={avatarRef}
                            className="opacity-0 top-0 h-full z-50 cursor-pointer"
                            onChange={(e) => {
                              handleChangeMedia(e);
                            }}
                          />
                          <Image
                            className="object-cover rounded-xl "
                            src={URL.createObjectURL(
                              b64toBlob(values.media.data)
                            )}
                            alt=""
                            fill
                          />
                        </div>
                      </div>

                      <p className="text-[13px] text-slate-500 font-medium pt-2">
                        Recomendado (.png, .jpg, .jpeg)
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex text-center w-full justify-center">
                        <input
                          accept="image/png, image/jpeg, application/pdf"
                          type="file"
                          ref={avatarRef}
                          className="hidden"
                          onChange={(e) => {
                            handleChangeMedia(e);
                          }}
                        />
                        <div
                          onClick={handleClickRef}
                          className={twMerge([
                            "transition w-[10rem] h-[10rem] rounded-xl border flex flex-col justify-center items-center cursor-pointer",
                            "hover:bg-slate-200",
                          ])}
                        >
                          <Lucide icon="image" color="#216AD9" size={60} />
                        </div>
                      </div>
                      <p className="text-[13px] text-slate-500 font-medium pt-2">
                        Recomendado (.png, .jpg, .jpeg)
                      </p>
                    </>
                  )}
                </div>

                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Nombre del centro
                    <span className="text-primary font-bold">*</span>
                  </p>
                  <div className="relative lg:w-[70%]">
                    <FormInput
                      type="text"
                      value={values.name}
                      placeholder="Nombre del centro"
                      className="form-control"
                      onChange={(e) => handleName(e.target.value)}
                    />

                    <div>
                      {errors.name.length > 0 && (
                        <div className="mt-1">
                          <span className="text-red-500">{errors.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Nombre del responsable
                    <span className="text-primary font-bold">*</span>
                  </p>

                  <div className="relative lg:w-[70%]">
                    <FormInput
                      type="text"
                      value={values.doctor_name}
                      placeholder="Nombre del responsable"
                      className="form-control]"
                      onChange={(e) => handleDoctorName(e.target.value)}
                    />

                    {errors.doctor_name.length > 0 && (
                      <div className="mt-1">
                        <span className="text-red-500">
                          {errors.doctor_name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Correo del responsable
                    <span className="text-primary font-bold">*</span>
                  </p>

                  <div className="relative lg:w-[70%]">
                    <FormInput
                      type="text"
                      value={values.doctor_email}
                      placeholder="Correo del responsable"
                      className="form-control"
                      onChange={(e) => handleDoctorEmail(e.target.value)}
                    />

                    {errors.doctor_email.length > 0 && (
                      <div className="mt-1">
                        <span className="text-red-500">
                          {errors.doctor_email}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Correo institucional
                  </p>

                  <div className="relative lg:w-[70%]">
                    <FormInput
                      type="text"
                      value={values.email}
                      placeholder="Correo institucional"
                      className="form-control"
                      onChange={(e) => handleEmail(e.target.value)}
                    />

                    {errors.email.length > 0 && (
                      <div className="mt-1">
                        <span className="text-red-500">{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Número de teléfono institucional
                  </p>

                  <div className="relative lg:w-[70%]">
                    <PhoneNumberInput
                      defaultSelectedCountry="mx"
                      onPhoneNumberChange={(values) => {
                        handlePhone(values.fullPhoneNumber, true);
                      }}
                      isDark
                    />

                    {errors.phone_number.length > 0 && (
                      <div className="mt-1">
                        <span className="text-red-500">
                          {errors.phone_number}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:flex justify-between items-start relative w-full gap-3">
                  <p className="text-[13px] w-fit text-slate-900 font-medium mb-2">
                    Contraseña del responsable
                    <span className="text-primary font-bold">*</span>
                  </p>

                  <div className="relative lg:w-[70%]">
                    <FormInput
                      type="password"
                      value={values.password}
                      placeholder="Contraseña del responsable"
                      className="form-control"
                      onChange={(e) => handlePassword(e.target.value)}
                    />

                    {errors.password.length > 0 && (
                      <div className="mt-1">
                        <span className="text-red-500">{errors.password}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
