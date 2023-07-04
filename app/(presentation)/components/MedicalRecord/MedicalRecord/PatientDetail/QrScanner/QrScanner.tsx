import { MedicalRecordQrRoutesEnum } from "(presentation)/(routes)/medicalRecordRoutes";
import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import Link from "next/link";

export default function QrScanner() {
  return (
    <div className="fixed bottom-4 right-8 z-[98] lg:hidden md:hidden">
      <Link href={MedicalRecordQrRoutesEnum.QrScanner}>
        <Button variant="primary">
          <div className="flex items-center">
            <div className="mr-3">
              <Lucide icon="QrCode" color="#fff" size={25} />
            </div>

            <div>Escanear QR</div>
          </div>
        </Button>
      </Link>
    </div>
  );
}
