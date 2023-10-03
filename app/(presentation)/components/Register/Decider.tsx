import { useContext } from "react";
import { IStepsContext, StepsContext } from "./Steps/context/StepsContext";
import Formulary from "./Formulary/Formulary";
import FormularySpeciality from "./FormularySpeciality/FormularySpeciality";
import FormularyLocality from "./FormularyLocality/FormularyLocality";
import FinishRegister from "./FinishRegister/FinishRegister";
import AuthProvider from "(presentation)/(layouts)/AppLayout/context/AuthContext";

export default function Decider() {
    const { state } = useContext<IStepsContext>(StepsContext);
    const { data } = state.step;

    return(
        <>
            {/*data === 0 && <FormularySpeciality/>*/}
            {/*data === 1 && <FormularyLocality/>*/}
            {data === 0 && <Formulary/>}
            {data === 1 && <FinishRegister />}
        </>
    )

}