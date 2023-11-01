import { useState } from "react";
import LocalityCreateFormulary from "./LocalityCreateFormulary/LocalityCreateFormulary";
import Services from "./Services/Services";

export default function WithoutSteps({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
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
          <LocalityCreateFormulary
            userId={userId}
            setStep={setStep}
            setData={setData}
            data={data}
            addressData={addressData}
            setAddressData={setAddressData}
          />
        );
      case 1:
        return (
          <Services
            userId={userId}
            accountId={accountId}
            formData={data}
            address={addressData}
            setStep={setStep}
          />
        );

      default:
        return <div />;
    }
  };

  return <div>{getComponentByStep()}</div>;
}
