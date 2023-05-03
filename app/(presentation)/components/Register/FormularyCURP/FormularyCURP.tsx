import { useContext, useEffect, useMemo, useState } from "react";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { RegisterContext, IRegisterContext } from "../context/RegisterContext";
import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import { RegisterFailure, registerFailuresEnum } from "domain/core/failures/register/registerFailure";
import { IStepsContext, StepsContext } from "../Steps/context/StepsContext";
import Link from "next/link";
import { IRegister } from "domain/core/entities/registerEntity";

export default function FormularyCURP() {
    const { state, actions, dispatch } = useContext<IRegisterContext>(RegisterContext);
    const { updateRegisterData } = actions;
    const { loading, error, successful } = state.searchCURP;
    let { data: formData } = state.registerData;

    const { actions: stepActions, dispatch: stepDispatch } = useContext<IStepsContext>(StepsContext);
    const { changeStep } = stepActions;

    const [values, setValues] = useState({
        curp: "",
    });

    const [errors, setErrors] = useState({
        global: "",
        curp: "",
    })

    const handleCURP = (value: string) => {
        
        if (value.length <= 2 || value.length === 0 ) {
            errors["curp"] =  "El CURP debe tener más de 2 caracteres"
        } else {
            setErrors({ ...errors, curp: "" })
        }
        
    }

    const onSubmit = () => {

        if (values.curp.length <= 2 || values.curp.length === 0 ) {
            setErrors({ ...errors, curp: "El CURP debe tener más de 2 caracteres" })
            return;
        } else {
            setErrors({ ...errors, curp: "" })
            formData = {...formData as Object, curp: values.curp}
            updateRegisterData(formData)(dispatch)
            changeStep(0)(stepDispatch)
        }

    }

    const handleErrors = () => {
        switch (error?.code) {
        case registerFailuresEnum.curpNotFound:
            setErrors({ ...errors, global: "El CURP no existe en nuestra plataforma" })
            break;
        
        default:
            break;
        }
    }

    useMemo(() => {
        if (error) handleErrors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    return (
        <div className="w-[60%] h-fit flex flex-col justify-between items-center gap-6">
            <div className="w-full flex flex-col justify-between items-center gap-3 text-center">
                <p className="text-gray-950 font-semibold text-3xl">
                ¿Cuál es tú CURP?
                </p>
                <p className="text-gray-500 font-light text-base">
                Escribe tus credenciales para acceder al panel de proveedores
                </p>
            </div>
            <div className="relative w-full text-slate-500">
                <FormInput
                    type="text"
                    className="w-full py-3 pr-10"
                    placeholder="CURP"
                    value={values.curp}
                    onChange={(e: any) => setValues({ ...values, curp: e.target.value })}
                />
                {errors["curp"] !== "" && <p className="text-red-500">{errors["curp"]}</p>}
            </div>

            <div className="w-full text-center">
                <Link href="/register" className="text-primary font-light text-base">No sabes cual es tu CURP?, visita este sitio</Link>
                <Button onClick={() => onSubmit()} disabled={loading} variant="primary" type="submit" className="mt-4 w-full">
                    {loading ? (
                    "Cargando"
                    ) : (
                    "Continuar"
                    )}
                </Button>
            </div>

        </div>
    );
}
