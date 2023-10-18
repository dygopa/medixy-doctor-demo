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

interface ISpecialistIndexProps {
  id: number;
}

function SpecialistIndex({ id }: ISpecialistIndexProps) {
  const { state, actions, dispatch } =
    useContext<ISpecialistsContext>(SpecialistsContext);
  const { getSpecialist } = actions;
  const { data } = state.getSpecialist;

  const [isVisible, setIsVisible] = useState(false);

  useMemo(() => {
    getSpecialist(id)(dispatch);
  }, []);

  return (
    <>
      <div className="w-full px-24">
        {data && data.userId && (
          <>
            <div className="h-fit relative flex justify-between items-center bg-primary rounded-md p-3">
              <div className="text-left flex flex-col justify-center items-start">
                <p className="text-base text-white font-bold">
                  Completa tu perfil
                </p>
                <p className="text-sm text-white font-light">
                  Completa los campos restantes para que los pacientes vean
                  información más detallada sobre tí
                </p>
              </div>
            </div>
            <div className="w-full flex justify-center mt-8">
              <div>
                <UserCardProvider>
                  <UserCardComponent
                    specialist={data as Specialist}
                    setIsVisible={setIsVisible}
                  />
                </UserCardProvider>
              </div>
            </div>
          </>
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
