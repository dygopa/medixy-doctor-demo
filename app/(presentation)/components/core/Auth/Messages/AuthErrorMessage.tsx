"use client";

import Button from "../../BaseComponents/Button";
import Lucide from "../../BaseComponents/Lucide";

export default function AuthErrorMessage() {
  return (
    <div className="text-center w-screen h-[700px] flex justify-center items-center">
      <div>
        <div className="mb-4 flex justify-center">
          <Lucide icon="AlertCircle" size={60} color="#57419B" />
        </div>

        <div className="mb-3">
          <p>
            Algo ha salido mal al intentar procesar sus datos de usuario en la
            plataforma. Por favor, vuelva a intentarlo.
          </p>
        </div>

        <div className="mt-3">
          <Button variant="primary" onClick={() => window.location.reload()}>
            Reintentar
          </Button>
        </div>
      </div>
    </div>
  );
}
