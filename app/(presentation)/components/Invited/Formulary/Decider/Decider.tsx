import Button from '(presentation)/components/core/BaseComponents/Button'
import Link from 'next/link'
import React, { useContext } from 'react'
import { FormularyContext, IFormularyContext } from '../context/FormularyContext';

export default function Decider() {

  const { state, actions, dispatch } = useContext<IFormularyContext>(FormularyContext);
  const { changeStep } = actions;

  const onSubmit = () => {
    changeStep(1)(dispatch)
  };

  return (
    <div className="w-full relative">
      <div className="w-full mx-auto flex flex-col justify-center items-center gap-2 mb-8 text-center">
        <h2 className="text-2xl font-bold text-center xl:text-3xl xl:text-center">
          Valida tu información
        </h2>
        <span className="font-light text-lg text-center">
        Verifica si indicaste el código correcto y si lo es y no eres tu, el equipo de Medhaus se comunicará contigo
        </span>
      </div>
      <div className="mb-4 relative w-full flex flex-col justify-center items-center">
        
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-4 text-center mt-8">
        <Button onClick={()=>{ onSubmit() }} variant="success" type="submit" className="w-full py-2 text-white">
            Sí, soy yo
        </Button>
        <Button variant="outline-danger" type="submit" className="w-full py-2">
            No soy yo
        </Button>
        <Link className="text-base text-primary font-light" href="/login">
          Ya tengo una cuenta,{" "}
          <span className="font-semibold">entrar a la cuenta</span>
        </Link>
      </div>
    </div>
  )
}