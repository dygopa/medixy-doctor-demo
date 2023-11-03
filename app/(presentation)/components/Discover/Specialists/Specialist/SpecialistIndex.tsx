"use client";

import React, { useContext, useMemo, useState } from "react";
import {
  ISpecialistsContext,
  SpecialistsContext,
} from "../context/SpecialistsContext";
import { UserCardComponent } from "./UserCard/UserCard";
import UserCardProvider from "./UserCard/context/UserCardContext";
import { Specialist } from "domain/core/entities/specialists/specialist";
import ReservationCard from "./Reservation/Main";
import {
  IStepByStepContext,
  StepByStepContext,
} from "(presentation)/components/core/StepByStepPopup/context/StepByStepContext";

interface ISpecialistIndexProps {
  id: number;
}

function SpecialistIndex({ id }: ISpecialistIndexProps) {
  const { actions: actionsStep, dispatch: dispatchStep } =
    useContext<IStepByStepContext>(StepByStepContext);
  const { changeOpenPopup, changeOpenPopupText } = actionsStep;

  const { state, actions, dispatch } =
    useContext<ISpecialistsContext>(SpecialistsContext);
  const { getSpecialist } = actions;
  const { data } = state.getSpecialist;

  const [step, setStep] = useState(0);
  const [finishedStep, setFinishedStep] = useState(false);

  useMemo(() => {
    getSpecialist(id)(dispatch);
  }, []);

  return (
    <>
      <div className="w-full lg:px-24 px-0 mt-4 mb-4">
        {data && data.userId && (
          <div className="lg:flex md:flex block">
            <div className="xl:w-[710px] lg:w-[475px] md:w-[435px] w-[400px]">
              <UserCardProvider>
                <UserCardComponent
                  step={step}
                  setStep={setStep}
                  specialist={data as Specialist}
                  setIsVisible={() => {
                    changeOpenPopup(true)(dispatchStep);
                    changeOpenPopupText(
                      "Has completado los datos básicos de tu perfil.  Los datos proporcionados serán visibles en tu directorio, esta información es importante ya que brinda una rápida visualización a tus pacientes o futuros pacientes que te busquen o encuentren en tu directorio"
                    )(dispatchStep);
                  }}
                  finishedStep={finishedStep}
                />
              </UserCardProvider>
            </div>

            <div>
              <ReservationCard
                step={step}
                setStep={setStep}
                setFinishedStep={setFinishedStep}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SpecialistIndex;
