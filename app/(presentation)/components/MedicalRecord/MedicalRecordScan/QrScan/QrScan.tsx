import { MedicalRecordRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import AlertComponent from "(presentation)/components/core/BaseComponents/Alert";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { QrReader } from "react-qr-reader";

export default function QrScan() {
  const [showAlertError, setShowAlertError] = useState(false);

  const router = useRouter();

  const onShowAlertError = () => {
    setShowAlertError(true);

    setTimeout(() => {
      setShowAlertError(false);
    }, 3000);
  };

  return (
    <>
      <AlertComponent
        variant="error"
        show={showAlertError}
        description="Algo ha salido mal. Vuelve a escanear el código QR"
      />

      <div className="w-full h-screen flex items-center justify-center">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              router.push(
                MedicalRecordRoutesEnum.MedicalRecord +
                  result.getText() +
                  MedicalRecordRoutesEnum.MedicalRecordSummary
              );
              return;
            }

            if (!!error && error.name !== "e") {
              onShowAlertError();
            }
          }}
          constraints={{ facingMode: "user" }}
          className="w-[150px] h-[150px]"
        />
      </div>
    </>
  );
}
