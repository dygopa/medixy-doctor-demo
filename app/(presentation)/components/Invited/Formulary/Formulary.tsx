import { ClassAttributes, InputHTMLAttributes, useContext, useEffect, useMemo, useState } from "react";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import {
  FormularyContext,
  IFormularyContext,
} from "./context/FormularyContext";
import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import {
  AuthFailure,
  authFailuresEnum,
} from "domain/core/failures/auth/authFailure";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import Link from "next/link";
import OtpInput from 'react-otp-input';
import { twMerge } from "tailwind-merge";
import CompleteRegister from "./CompleteRegister/CompleteRegister";
import Decider from "./Decider/Decider";

export default function Formulary() {
  const { state, actions, dispatch } = useContext<IFormularyContext>(FormularyContext);
  const { changeStep, checkOTP } = actions;
  const { data, error, successful, loading } = state.checkOTP;
  const { data: step } = state.step;

  const [otp, setOtp] = useState('');

  const [errors, setErrors] = useState({
    global: "",
  });

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(otp)
    checkOTP(otp)(dispatch)
  };

  const handleErrors = () => {
    switch (error?.code) {
      case authFailuresEnum.tooManyRequest:
        setErrors({
          ...errors,
          global: "Se ha excedido el limite de intentos de inicio de sesión",
        });
        break;
      case authFailuresEnum.serverError:
        setErrors({
          ...errors,
          global: "Algo no ha salido como se esperaba. Vuelve a intentarlo.",
        });
        break;

      default:
        break;
    }
  };

  useMemo(() => {
    if(successful === true) changeStep(0)(dispatch)
  }, [successful]);

  useMemo(() => {
    if (error) handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <>
      { step === 1 ? 
        <Decider/> 
        : step === 2 ? 
        <CompleteRegister/> : 
        <form onSubmit={(e: any) => onSubmit(e)} className="w-full relative">
          <AlertComponent
            variant="error"
            show={error !== null}
            description={errors.global}
          />
          <div className="w-[85%] mx-auto flex flex-col justify-center items-center gap-2 mb-8 text-center">
            <h2 className="text-2xl font-bold text-center xl:text-3xl xl:text-center">
              Código de verificación
            </h2>
            <span className="font-light text-lg text-center">
              Inserta el código que te enviamos por SMS
            </span>
          </div>
          <div className="mb-4 relative w-full flex flex-col justify-center items-center">
            <OtpInput
              value={otp}
              placeholder="000000"
              inputType="text"
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              inputStyle={{  
                width: '3rem',
                height: '3.6rem',
                margin: '20px 0rem',
                fontSize: '1rem',
                borderRadius: 4,
                border: '2px solid rgba(0,0,0,0.3)',
              }}  
              //inputStyle={"transition px-5 text-slate-800 duration-200 ease-in-out w-full text-2xl border border-slate-400 shadow-sm rounded-md placeholder:text-slate-200 focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:border-primary focus:border-opacity-40"}
              renderInput={props => <input {...props}/>}
            />
          </div>
          
          <div className="w-full flex flex-col justify-center items-center gap-4 text-center mt-8">
            <Button
              disabled={loading || otp.length < 6}
              variant="primary"
              type="submit"
              className="w-full py-2"
            >
              {loading ? "Cargando..." : "Validar"}
            </Button>
            <Link className="text-base text-primary font-light" href="/login">
              Ya tengo una cuenta,{" "}
              <span className="font-semibold">entrar a la cuenta</span>
            </Link>
          </div>
        </form>
      }
    </>
  );
}
