import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { otpFailuresEnum } from "domain/core/failures/otp/otpFailure";
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import OTPInput from "react-otp-input";
import {
  IRecoveryPasswordContext,
  RecoveryPasswordContext,
} from "../context/RecoveryPasswordContext";

interface IOTPProps {
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

export default function OTP({ values, setValues, setStep }: IOTPProps) {
  const { state, actions, dispatch } = useContext<IRecoveryPasswordContext>(
    RecoveryPasswordContext
  );
  const { sendDoctorOTPCode } = actions;
  const { loading, successful, error } = state.sendDoctorOTPCode;

  const [showAlertError, setShowAlertError] = useState(false);

  const getErrorMessage = () => {
    if (error?.code === otpFailuresEnum.otpInvalid)
      return "El código ingresado es inválido. Por favor, comprueba el código y vuelve a intentarlo.";

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
    if (successful) setStep(2);
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
          Confirmar código
        </p>
        <p className="text-gray-500 font-light lg:text-base md:text-base text-md">
          Te hemos enviado un código de seguridad a tu cuenta de correo
          electrónico <p className="font-bold">{values.email}</p> Confirma el
          código para proceder a reestablecer tu contraseña
        </p>
      </div>

      <div className="relative w-full text-center flex justify-center">
        <OTPInput
          value={values.otp}
          onChange={(otp) => setValues({ ...values, otp: otp })}
          numInputs={6}
          inputType="text"
          placeholder="000000"
          renderSeparator={<span>-</span>}
          inputStyle={{
            width: "3rem",
            height: "3.6rem",
            margin: "20px 0rem",
            fontSize: "1rem",
            borderRadius: 4,
            border: "2px solid rgba(0,0,0,0.3)",
          }}
          renderInput={(props) => <input {...props} />}
        />
      </div>

      <Button
        onClick={() => sendDoctorOTPCode(values.email, values.otp)(dispatch)}
        disabled={values.otp.length !== 6 || loading}
        variant="primary"
        type="submit"
        className="mt-4 mb-8 w-full"
      >
        {loading ? "Validando código.." : "Confirmar código"}
      </Button>
    </div>
  );
}
