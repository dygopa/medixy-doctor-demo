import { createContext, useState } from "react";

const MedicalRecordContext = createContext({});

const MedicalRecordProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [active, setActive] = useState(0);
  const [popupActive, setPopupActive] = useState(false);
  const [popupSectionActive, setPopupSectionActive] = useState(0);
  const [title, setTitle] = useState("Historial de consultas");

  return (
    <MedicalRecordContext.Provider
      value={{
        setActive,
        active,
        popupActive,
        setPopupActive,
        popupSectionActive,
        setPopupSectionActive,
        title,
        setTitle,
      }}
    >
      {children}
    </MedicalRecordContext.Provider>
  );
};

export { MedicalRecordProvider };

export default MedicalRecordContext;
