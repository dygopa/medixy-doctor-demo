import AlertComponent from '(presentation)/components/core/BaseComponents/Alert'
import Button from '(presentation)/components/core/BaseComponents/Button'
import Link from 'next/link'
import React, { useContext, useMemo, useState } from 'react'
import { FormularyContext, IFormularyContext } from '../context/FormularyContext';
import { authFailuresEnum } from 'domain/core/failures/auth/authFailure';
import { twMerge } from 'tailwind-merge';
import { FiCheck } from 'react-icons/fi';
import { FormInput } from '(presentation)/components/core/BaseComponents/Form';

export default function CompleteRegister() {

    const { state, actions, dispatch } = useContext<IFormularyContext>(FormularyContext);
    const { updateUserOTP } = actions;
    const { data, loading, error, successful } = state.updateUserOTP;

    const [termsContidions, setTermsContidions] = useState(false);
    const [activePolicy, setActivePolicy] = useState(false);

    let [values, setValues] = useState({
        email: "",
        confirm_password: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        global: "",
        email: "",
        confirm_password: "",
        password: "",
    });
    
    const CheckboxComponent = ({
        active,
        customClick,
    }: {
        active: boolean;
        customClick: Function;
    }) => {
        return (
        <div
            onClick={() => {
            customClick();
            }}
            className={twMerge([
            "w-[16px] h-[16px] rounded-md border border-slate-300  cursor-pointer hover:bg-slate-300 transition text-white",
            active ? "bg-primary" : "bg-white",
            ])}
        >
            {active && <FiCheck />}
        </div>
        );
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        //updateUserOTP({
        //    email:values.email, 
        //    password:values.password
        //})(dispatch)
        console.log(values)
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
        //if (successful) window.location.href = "/dashboard";
    }, [successful]);

    useMemo(() => {
        if (error) handleErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <form onSubmit={(e: any) => onSubmit(e)} className="w-full relative">
            <AlertComponent
                variant="error"
                show={error !== null}
                description={errors.global}
            />
            <AlertComponent
                variant="success"
                show={successful === true}
                description="Redireccionando a tu cuenta..."
            />
            <div className="w-[85%] mx-auto flex flex-col justify-center items-center gap-2 mb-8 text-center">
                <h2 className="text-2xl font-bold text-center xl:text-3xl xl:text-center">
                    Completemos tu cuenta
                </h2>
                <span className="font-light text-lg text-center">
                Completa los campos necesarios para finalizar la creación de tu cuenta
                </span>
            </div>

            <div className="mb-4 relative w-full flex flex-col justify-center items-center gap-3">
                <FormInput
                    type="email"
                    className="w-full py-3 pr-10"
                    placeholder="Email"
                    value={values.email}
                    onChange={(e: any) =>
                        setValues({ ...values, email: e.target.value })
                    }
                />
                <FormInput
                    type="password"
                    className="w-full py-3 pr-10"
                    placeholder="Contraseña"
                    value={values.password}
                    onChange={(e: any) =>
                        setValues({ ...values, password: e.target.value })
                    }
                />
                <FormInput
                    type="password"
                    className="w-full py-3 pr-10"
                    placeholder="Confirmar contraseña"
                    value={values.confirm_password}
                    onChange={(e: any) =>
                        setValues({ ...values, confirm_password: e.target.value })
                    }
                />
            </div>
            <div className="w-full relative flex flex-col justify-between gap-3 items-start">
                <div className="w-full flex justify-start items-center gap-3">
                    <CheckboxComponent
                        active={activePolicy}
                        customClick={() => { setActivePolicy(!activePolicy) }}
                    />
                    <p className="font-light text-sm text-slate-900">
                        Acepto los{" "}
                        <Link
                        target="_blank"
                        className="text-primary font-medium"
                        href="/register"
                        >
                        politica de privacidad
                        </Link>{" "}
                        de la plataforma
                    </p>
                </div>
                <div className="w-full flex justify-start items-center gap-3">
                    <CheckboxComponent
                        active={termsContidions}
                        customClick={() => { setTermsContidions(!termsContidions) }}
                    />
                    <p className="font-light text-sm text-slate-900">
                        Acepto los{" "}
                        <Link
                        target="_blank"
                        className="text-primary font-medium"
                        href="/register"
                        >
                        terminos y condiciones
                        </Link>{" "}
                        de la plataforma
                    </p>
                </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-4 text-center mt-8">
                <Button
                    disabled={
                        loading || 
                        !termsContidions ||
                        !activePolicy ||
                        values.email.length === 0 || 
                        values.password.length === 0 || 
                        values.confirm_password.length === 0
                    }
                    variant="primary"
                    type="submit"
                    className="w-full py-2"
                >
                    {loading ? "Cargando" : "Crear cuenta"}
                </Button>
                <Link className="text-base text-primary font-light" href="/login">
                    Ya tengo una cuenta,{" "}
                    <span className="font-semibold">entrar a la cuenta</span>
                </Link>
            </div>
        </form>
    )
}
