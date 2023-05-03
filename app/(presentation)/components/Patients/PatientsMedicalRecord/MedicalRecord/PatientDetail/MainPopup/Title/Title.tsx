import useMedicalRecord from "(presentation)/(hooks)/useMedicalRecord";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import React from "react";
import { FiX } from "react-icons/fi";

function TitlePopup() {
  const {
    title,
    setTitle,
    setPopupActive,
    setPopupSectionActive,
    popupSectionActive,
  }: any = useMedicalRecord();

  return (
    <div className="w-full h-fit flex justify-between items-center p-[1.5%_1.5%] font-semibold text-left text-lg text-slate-900">
      <div className="flex justify-between items-center gap-3">
        {popupSectionActive === 4 && (
          <Button
            variant="outline-primary"
            onClick={() => {
              setPopupSectionActive(0), setTitle("Historial de consultas");
            }}
          >
            <Lucide icon="ArrowLeft" />
          </Button>
        )}

        <div className={popupSectionActive === 4 ? "ml-4" : ""}>{title}</div>
      </div>

      <FiX
        onClick={() => {
          setPopupActive(false);
        }}
        className="cursor-pointer"
        size={25}
      />
    </div>
  );
}

export default TitlePopup;
