import { ICIE10 } from "domain/core/entities/cie10Entity";
import { Dispatch, SetStateAction } from "react";
import Diagnose from "./Diagnose/Diagnose";
import DiagnoseMobile from "./DiagnoseMobile/DiagnoseMobile";

type valuesTypes = {
  consultationDate: string;
  referredBy: string;
  consultationReason: string;
  sufferingDate: string;
  diagnose: ICIE10[];
  observations: string;
};

interface ITableDiagnosisProps {
  cie10: ICIE10[];
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function TableDiagnosis({
  cie10,
  values,
  setValues,
}: ITableDiagnosisProps) {
  if (cie10?.length === 0) return <div />;

  return (
    <div>
      {cie10.map((cie10Item: ICIE10) => (
        <div key={cie10Item.id} className="mb-3">
          <div className="lg:block md:block hidden">
            <Diagnose cie10={cie10Item} values={values} setValues={setValues} />
          </div>

          <div className="lg:hidden md:hidden block">
            <DiagnoseMobile
              cie10={cie10Item}
              values={values}
              setValues={setValues}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
