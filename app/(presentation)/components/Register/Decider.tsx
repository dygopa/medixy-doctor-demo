import { useContext } from "react";
import { IStepsContext, StepsContext } from "./Steps/context/StepsContext";
import Formulary from "./Formulary/Formulary";
import FormularyCURP from "./FormularyCURP/FormularyCURP";
import FormularyTypeUser from "./FormularyTypeUser/FormularyTypeUser";

export default function Decider() {
    const { state } = useContext<IStepsContext>(StepsContext);
    const { data } = state.step;

    return(
        <>
            {data === 0 && <FormularyCURP/>}
            {data === 1 && <FormularyTypeUser/>}
            {data === 2 && <Formulary/>}
        </>
    )

}