import Button from "(presentation)/components/core/BaseComponents/Button";
import { IMedicalConsulty } from "domain/core/entities/medicalConsultyEntity";
import { Dispatch, SetStateAction } from "react";
import * as QRCode from "qrcode";
import Image from "next/image";

interface IQrCodeModalProps {
  medicalConsulty: IMedicalConsulty;
  setShowQrCodeModal: Dispatch<SetStateAction<boolean>>;
}

export default function QrCodeModal({
  medicalConsulty,
  setShowQrCodeModal,
}: IQrCodeModalProps) {
  const getQrCodeUrl = () => {
    let urlQrCode = "";

    QRCode.toDataURL(medicalConsulty.id.toString(), (err: any, url: string) => {
      if (err) {
        urlQrCode = "";
        return;
      }

      urlQrCode = url;
    });

    return urlQrCode;
  };

  return (
    <div className="w-full px-4">
      <div className="mb-14">
        <p className="font-bold text-2xl text-slate-900">
          Código QR de la consulta
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <Image
          src={getQrCodeUrl()}
          width={150}
          height={150}
          alt="medical consulty qr code"
        />
      </div>

      <div className="flex justify-center text-center mb-14">
        <p className="font-normal text-md text-slate-900">
          El código QR presentado está asociado a esta consulta médica.
        </p>
      </div>

      <div className="lg:flex items-center text-center justify-center">
        <div className="lg:mr-6 lg:mb-0 mb-4">
          <Button
            variant="primary"
            className="w-[275px]"
            onClick={() => setShowQrCodeModal(false)}
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
}
