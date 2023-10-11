import { IUser } from "domain/core/entities/userEntity";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";
import {
  IMedicalRecordCreateSummaryContext,
  MedicalRecordCreateSummaryContext,
} from "../context/MedicalRecordCreateSummaryContext";
import Diagnosis from "./Diagnosis/Diagnosis";
import Orders from "./Orders/Orders";
import Physical from "./Physical/Physical";
import Reason from "./Reason/Reason";
import Recipes from "./Recipes/Recipes";
import Records from "./Records/Records";
import Title from "./Title/Title";
import VitalSigns from "./VitalSigns/VitalSigns";

interface IDetailProps {
  user: IUser;
}

export default function Detail({ user }: IDetailProps) {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordCreateSummaryContext>(
      MedicalRecordCreateSummaryContext
    );
  const { getMedicalConsultyById } = actions;
  const {
    data: medicalConsulty,
    loading,
    successful,
    error,
  } = state.getMedicalConsultyById;

  const searchParams = useSearchParams();

  const medicalConsultyId = searchParams.get("medical_consulty_id");

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup)
      getMedicalConsultyById(
        medicalConsultyId ? parseInt(medicalConsultyId.toString(), 10) : 0
      )(dispatch);

    return () => {
      isCleanup = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading)
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">Un momento...</p>
        <p className="font-light text-slate-500 text-base">
          Cargando tu consulta.
        </p>
      </div>
    );

  if (error)
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, algo no ha salido como se esperaba
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, algo no ha salido bien. Vuelve a intentarlo
        </p>
      </div>
    );

  if (!medicalConsulty?.id && successful) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, no se ha encontrado la consulta
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero no hemos encontrado la consulta
        </p>
      </div>
    );
  }

  if (!medicalConsulty?.id && !successful)
    return <div className="mt-5" style={{ height: "80vh" }} />;

  return (
    <div>
      <div className="mb-4 border-b">
        <Title user={user} medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Reason medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Diagnosis medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Records medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Physical medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <VitalSigns medicalConsulty={medicalConsulty} />
      </div>

      <div className="mb-4">
        <Recipes user={user} medicalConsulty={medicalConsulty} />
      </div>

      <div>
        <Orders user={user} medicalConsulty={medicalConsulty} />
      </div>
    </div>
  );
}
