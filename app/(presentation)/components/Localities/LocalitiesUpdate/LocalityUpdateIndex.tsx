"use client";

import { IUser } from "domain/core/entities/userEntity";
import Formulary from "./Formulary/Formulary";
import LocalitiesProvider from "../context/LocalitiesContext";
import { useState } from "react";
import Services from "./Services/Services";

export default function LocalityUpdateIndex({
  localityId,
  user,
}: {
  localityId: number;
  user: IUser;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: "",
    code: "",
    latitude: 0,
    longitude: 0,
    isVirtual: 0,
    isPublic: 1,
  });
  const [addressData, setAddressData] = useState({
    postal_code: "",
    city: "",
    clues: "",
    federalEntity: 0,
    municipality: 0,
    municipalityCatalogId: 0,
    countryLocation: "",
    street: "",
    address: "",
  });

  const getComponentByStep = () => {
    switch (step) {
      case 0:
        return (
          <Formulary
            userId={user.userId}
            localityId={localityId}
            setStep={setStep}
            setData={setData}
            setAddressData={setAddressData}
          />
        );
      case 1:
        return (
          <Services
            formData={data}
            address={addressData}
            setStep={setStep}
            localityId={localityId}
          />
        );

      default:
        return <div />;
    }
  };

  return (
    <div className="py-5">
      <LocalitiesProvider>{getComponentByStep()}</LocalitiesProvider>
    </div>
  );
}
