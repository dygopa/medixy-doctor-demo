import { useContext, useEffect, useMemo, useState } from "react";
import { FormInput, FormSelect } from "(presentation)/components/core/BaseComponents/Form";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { RegisterContext, IRegisterContext } from "../context/RegisterContext";
import { DashboardRoutesEnum } from "(presentation)/(routes)/dashboardRoutes";
import { RegisterFailure, registerFailuresEnum } from "domain/core/failures/register/registerFailure";
import { IStepsContext, StepsContext } from "../Steps/context/StepsContext";

export default function FormularyTypeUser() {
    const { state, actions, dispatch } = useContext<IRegisterContext>(RegisterContext);
    const { updateRegisterData } = actions;
    const { loading, error, successful } = state.searchCURP;
    let { data: formData } = state.registerData;

    const { actions: stepActions, dispatch: stepDispatch } = useContext<IStepsContext>(StepsContext);
    const { changeStep } = stepActions;

    const [values, setValues] = useState({
        type_user: "",
    });
    const [errors, setErrors] = useState({
        global: "",
        type_user: "",
    })

    const handleTypeUser = (value: string) => {
        setErrors({ ...errors, global: "" });

        if (value.length === 0) {
            setErrors({ ...errors, type_user: "El tipo de usuario es requerido" })
        } else {
            setErrors({ ...errors, type_user: "" })
        }
        
        setValues({ ...values, type_user: value });
    }

    const onSubmit = () => {

        if (values.type_user.length === 0) {
            setErrors({ ...errors, type_user: "El tipo de usuario es requerido" })
            return;
        } else{
            formData = {...formData as Object, type_user: values.type_user}
            updateRegisterData(formData)(dispatch);
            console.log(formData)
            changeStep(1)(stepDispatch)
        }


    }

    const handleErrors = () => {
        switch (error?.code) {
        case registerFailuresEnum.tooManyRequest:
            setErrors({ ...errors, global: "Ha ocurrido un error inesperado" })
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
                ¿Qué tipo de proveedor eres?
                </p>
                <p className="text-gray-500 font-light text-base">
                Escribe tus credenciales para acceder al panel de proveedores
                </p>
            </div>
            <div className="relative w-full text-slate-500">
                <FormSelect
                    className="w-full py-3 pr-10"
                    placeholder="Especialista"
                    value={values.type_user}
                    onChange={(e: any) => setValues({ ...values, type_user: e.target.value })}
                >
                    <option value={""}>-</option>
                    <option value={"1"}>Médico</option>
                    <option value={"2"}>Clínica</option>
                    <option value={"3"}>Laboratorio clínico</option>
                    <option value={"4"}>Centro de diagnóstico</option>
                </FormSelect>
                {errors["type_user"] !== "" && <p className="text-red-500">{errors["type_user"]}</p>}
            </div>

            <Button onClick={() => onSubmit()} disabled={loading} variant="primary" type="submit" className="mt-4 w-full">
                {loading ? (
                "Cargando"
                ) : (
                "Continuar"
                )}
            </Button>

        </div>
    );
}
