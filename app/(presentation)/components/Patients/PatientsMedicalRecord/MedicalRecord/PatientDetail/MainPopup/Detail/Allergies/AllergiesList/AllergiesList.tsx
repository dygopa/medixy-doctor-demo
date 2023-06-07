import Button from "(presentation)/components/core/BaseComponents/Button";
import { useContext, useEffect, useState } from "react";
import {
  IMedicalRecordContext,
  MedicalRecordContext,
} from "../../../../../context/MedicalRecordContext";

export default function AllergiesList() {
  const { state, actions, dispatch } =
    useContext<IMedicalRecordContext>(MedicalRecordContext);
  const { getAllergies } = actions;
  const { data: patient } = state.patient;
  const { data, loading, error, successful } = state.allergies;

  const [allergies, setAllergies] = useState<string[]>([]);

  const onGetAllergiesDispatch = () => {
    if (patient?.patientId) {
      getAllergies({
        patientId: patient.patientId,
      })(dispatch);
    }
  };

  useEffect(() => {
    onGetAllergiesDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (successful) setAllergiesMap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successful]);

  const setAllergiesMap = () => {
    if (data.data.length === 0) return;

    const allergiesList: string[] = [];

    data.data.forEach((allergy) => {
      if (allergy.medicalRecordValues.length > 0) {
        allergy.medicalRecordValues.forEach((allergyValue) => {
          if (allergiesList.indexOf(allergyValue.value) < 0) {
            allergiesList.push(allergyValue.value);
          }
        });
      }
    });

    setAllergies(allergiesList);
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          Cargando las alergias...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-bold text-slate-900 text-lg">
          Vaya, algo no ha salido como se esperaba
        </p>
        <p className="font-light text-slate-500 text-base mb-4">
          Lo sentimos, algo no ha salido bien. Vuelve a intentarlo
        </p>
        <Button variant="primary" onClick={() => onGetAllergiesDispatch()}>
          Volver a intentar
        </Button>
      </div>
    );
  }

  if (successful && allergies?.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center mt-8">
        <p className="font-light text-slate-500 text-base">
          El paciente no posee alergias.
        </p>
      </div>
    );
  }

  if (!data.data) return <div />;

  return (
    <>
      {allergies.map((allergy: string, i: number) => (
        <div key={i} className="flex justify-between items-center w-full mb-3">
          <p className="font-medium text-lg text-slate-900">- {allergy}</p>
        </div>
      ))}
    </>
  );
}
