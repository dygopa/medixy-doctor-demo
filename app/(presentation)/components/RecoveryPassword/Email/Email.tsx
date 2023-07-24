import { VALIDATE_EMAIL } from "(presentation)/(utils)/errors-validation";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import { otpFailuresEnum } from "domain/core/failures/otp/otpFailure";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  IRecoveryPasswordContext,
  RecoveryPasswordContext,
} from "../context/RecoveryPasswordContext";

interface IEmailProps {
  values: {
    email: string;
    otp: string;
    password: string;
  };
  setValues: Dispatch<
    SetStateAction<{
      email: string;
      otp: string;
      password: string;
    }>
  >;
  setStep: Dispatch<SetStateAction<number>>;
}

export default function Email({ values, setValues, setStep }: IEmailProps) {
  const { state, actions, dispatch } = useContext<IRecoveryPasswordContext>(
    RecoveryPasswordContext
  );
  const { getDoctorOTPCode } = actions;
  const { loading, successful, error } = state.getDoctorOTPCode;

  const [errors, setErrors] = useState({
    email: "",
  });

  const [showAlertError, setShowAlertError] = useState(false);

  const handleEmail = (value: string) => {
    setValues({ ...values, email: value.trim() });

    if (values.email.length > 1) {
      if (!VALIDATE_EMAIL(values.email)) {
        setErrors({ ...errors, email: "El email debe ser correcto" });
        return true;
      }
    }

    setErrors({ ...errors, email: "" });
    return false;
  };

  const getErrorMessage = () => {
    if (error?.code === otpFailuresEnum.emailNotFound)
      return "Por favor, comprueba tu correo electrónico registrado y vuelve a intentarlo.";

    return "Algo no ha salido bien. Vuelve a intentarlo.";
  };

  const onShowAlertError = () => {
    setShowAlertError(true);

    setTimeout(() => {
      setShowAlertError(false);
    }, 5000);
  };

  useEffect(() => {
    if (error) onShowAlertError();
  }, [error]);

  useEffect(() => {
    if (successful) setStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  return (
    <div className="lg:w-[60%] md:w-[70%] lg:px-20 md:px-14 sm:px-20 px-8 w-full h-fit flex flex-col justify-between items-center gap-6">
      <AlertComponent
        variant="error"
        show={showAlertError}
        description={getErrorMessage()}
      />

      <div className="w-full flex flex-col justify-between items-center gap-3 text-center z-30">
        <p className="text-gray-950 font-semibold lg:text-3xl md:text-3xl text-2xl">
          Correo electrónico
        </p>
        <p className="text-gray-500 font-light lg:text-base md:text-base text-md">
          Escribe el correo electrónico donde deseas reestablecer tu contraseña.
          Te enviarémos un código de seguridad a tu cuenta de correo electrónico
          para confirmar el código y proceder con tu reestablecimiento de
          contraseña
        </p>
      </div>

      <div className="relative w-full">
        <FormInput
          type="email"
          className="w-full py-3 pr-10 bg-white"
          placeholder="Correo electrónico"
          value={values.email}
          onChange={(e: any) => handleEmail(e.target.value)}
        />

        {errors.email.length > 0 && (
          <span className="text-red-500">{errors.email}</span>
        )}
      </div>

      <Button
        onClick={() => getDoctorOTPCode(values.email)(dispatch)}
        disabled={
          values.email.length === 0 || errors.email.length > 0 || loading
        }
        variant="primary"
        type="submit"
        className="mt-4 mb-8 w-full"
      >
        {loading ? "Cargando.." : "Enviar código"}
      </Button>
    </div>
  );
}
