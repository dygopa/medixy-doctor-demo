import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Button from "(presentation)/components/core/BaseComponents/Button";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import { useRouter } from "next/navigation";
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

interface IChangePasswordProps {
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
}

export default function ChangePassword({
  values,
  setValues,
}: IChangePasswordProps) {
  const { state, actions, dispatch } = useContext<IRecoveryPasswordContext>(
    RecoveryPasswordContext
  );
  const { updatePassword } = actions;
  const { loading, successful, error } = state.updatePassword;

  const router = useRouter();

  const [errors, setErrors] = useState({
    password: "",
  });

  const [showAlertError, setShowAlertError] = useState(false);

  const handlePassword = (value: string) => {
    setValues({ ...values, password: value });
    if (value.length <= 5) {
      setErrors({
        ...errors,
        password: "La contraseña debe contener al menos 6 carácteres",
      });
      return true;
    } else {
      setErrors({ ...errors, password: "" });
      return false;
    }
  };

  const getErrorMessage = () => {
    return "Algo no ha salido bien. Vuelve a intentarlo.";
  };

  const onShowAlertError = () => {
    setShowAlertError(true);

    setTimeout(() => {
      setShowAlertError(false);
    }, 3000);
  };

  useEffect(() => {
    if (error) onShowAlertError();
  }, [error]);

  useEffect(() => {
    if (successful) router.push("/login?from=recovery-password");
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
          Reestablecer contraseña
        </p>
        <p className="text-gray-500 font-light lg:text-base md:text-base text-md">
          Se ha validado el código de seguridad, puedes reestablecer tu
          contraseña.
        </p>
      </div>

      <div className="relative w-full">
        <FormInput
          type="password"
          className="w-full py-3 pr-10 bg-white"
          placeholder="Crea una contraseña"
          value={values.password}
          onChange={(e: any) => handlePassword(e.target.value)}
        />
        {errors.password.length > 0 && (
          <span className="text-red-500">{errors.password}</span>
        )}
      </div>

      <Button
        onClick={() =>
          updatePassword(values.email, values.password, values.otp)(dispatch)
        }
        disabled={
          values.password.length === 0 || errors.password.length > 0 || loading
        }
        variant="primary"
        type="submit"
        className="mt-4 mb-8 w-full"
      >
        {loading ? "Reestableciendo tu contraseña" : "Reestablecer contraseña"}
      </Button>
    </div>
  );
}
