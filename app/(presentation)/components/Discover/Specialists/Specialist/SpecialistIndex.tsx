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

  useMemo(() => {
    getSpecialist(id)(dispatch);
  }, []);

  return (
    <>
      <div className="w-full lg:px-24 px-0 mt-4">
        {data && data.userId && (
          <div className="lg:flex block">
            <div className="xl:w-[900px] lg:w-[700px] md:w-[600px] w-[400px]">
              <UserCardProvider>
                <UserCardComponent
                  specialist={data as Specialist}
                  setIsVisible={setIsVisible}
                />
              </UserCardProvider>
            </div>

            <div className="xl:block lg:block hidden">
              <ReservationCard />
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
