"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { FiX } from "react-icons/fi";
import {
  ISpecialistsContext,
  SpecialistsContext,
} from "../context/SpecialistsContext";
import { UserCardComponent } from "./UserCard/UserCard";
import UserCardProvider from "./UserCard/context/UserCardContext";
import CompletedProfilePopup from "./UserCard/CompletedProfilePopup/CompletedProfilePopup";
import { Specialist } from "domain/core/entities/specialists/specialist";
import ReservationCard from "./Reservation/Main";

interface ISpecialistIndexProps {
  id: number;
}

function SpecialistIndex({ id }: ISpecialistIndexProps) {
  const { state, actions, dispatch } =
    useContext<ISpecialistsContext>(SpecialistsContext);
  const { getSpecialist } = actions;
  const { data } = state.getSpecialist;

  const [isVisible, setIsVisible] = useState(false);
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
                  setIsVisible={setIsVisible}
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

      <CompletedProfilePopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
}

export default SpecialistIndex;
