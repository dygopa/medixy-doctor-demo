import { useContext, useEffect } from "react";
import {
  IMedicalRecordCreateContext,
  MedicalRecordCreateContext,
} from "../../../../context/MedicalRecordCreateContext";
import Formulary from "./Formulary/Formulary";

interface IEditPatientProps {
  subjectId: number;
}

export default function EditPatient({ subjectId }: IEditPatientProps) {
  const { state, actions, dispatch } = useContext<IMedicalRecordCreateContext>(
    MedicalRecordCreateContext
  );
  const { getSubjectById } = actions;
  const { data: subject, loading, successful, error } = state.subject;

  useEffect(() => {
    let isCleanup = true;

    if (isCleanup) getSubjectById(subjectId)(dispatch);

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
          Cargando tu paciente.
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

  if (!subject?.subjectId && successful) {
    return (
      <div className="w-full flex flex-col justify-center items-center py-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, se ha encontrado el paciente
        </p>
        <p className="font-light text-slate-500 text-base">
          Lo sentimos, pero no hemos encontrado el paciente
        </p>
      </div>
    );
  }

  if (!subject?.subjectId && !successful) return <div className="mt-5" />;

  return (
    <div>
      <div>
        <Formulary />
      </div>
    </div>
  );
}
