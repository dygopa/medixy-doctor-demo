export type valuesTypes = {
  abnormalAppearance: {
    isChecked: boolean;
    value: string;
  };
  disnea: {
    isChecked: boolean;
    value: string;
  };
  deformity: {
    isChecked: boolean;
    value: string;
  };
  amputation: {
    isChecked: boolean;
    value: string;
  };
  paralysis: {
    isChecked: boolean;
    value: string;
  };
  abnormalMovements: {
    isChecked: boolean;
    value: string;
  };
  normalGait: {
    isChecked: boolean;
    value: string;
  };
  mentalDisorder: {
    isChecked: boolean;
    value: string;
  };
  smokingPhysical: {
    isChecked: boolean;
    value: string;
  };
  abnormality: {
    isChecked: boolean;
    value: string;
    values: {
      anatomicalStateEyes: {
        isChecked: boolean;
        value: string;
      };
      eyeVision: {
        isChecked: boolean;
        value: string;
      };
      hearingEars: {
        isChecked: boolean;
        value: string;
      };
      buccalPharynx: {
        isChecked: boolean;
        value: string;
      };
      neck: {
        isChecked: boolean;
        value: string;
      };
      chest: {
        isChecked: boolean;
        value: string;
      };
      spine: {
        isChecked: boolean;
        value: string;
      };
      abdomen: {
        isChecked: boolean;
        value: string;
      };
      extremities: {
        isChecked: boolean;
        value: string;
      };
    };
  };
};

interface IAbnormalityDetailProps {
  values: valuesTypes;
}

export default function AbnormalityDetail({ values }: IAbnormalityDetailProps) {
  return (
    <>
      {values.abnormality.values.anatomicalStateEyes.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            - En el estado anatómico de los ojos:
            {values.abnormality.values.anatomicalStateEyes.value.length > 0
              ? ` ${values.abnormality.values.anatomicalStateEyes.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.abnormality.values.eyeVision.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            - En la visión de cada ojo:
            {values.abnormality.values.eyeVision.value.length > 0
              ? ` ${values.abnormality.values.eyeVision.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.abnormality.values.hearingEars.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            - En la audición de cada oído:
            {values.abnormality.values.hearingEars.value.length > 0
              ? ` ${values.abnormality.values.hearingEars.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.abnormality.values.buccalPharynx.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            - En la cavidad bucal o faringe:
            {values.abnormality.values.buccalPharynx.value.length > 0
              ? ` ${values.abnormality.values.buccalPharynx.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.abnormality.values.neck.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            - En el cuello (ganglios, tiroides, ingurgitación yugular,
            arterias):
            {values.abnormality.values.neck.value.length > 0
              ? ` ${values.abnormality.values.neck.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.abnormality.values.chest.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            - En el tórax (inspección, auscultación):
            {values.abnormality.values.chest.value.length > 0
              ? ` ${values.abnormality.values.chest.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.abnormality.values.spine.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            - En la columna vertebral (deformidad, color, limitación funcional):
            {values.abnormality.values.spine.value.length > 0
              ? ` ${values.abnormality.values.spine.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.abnormality.values.abdomen.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            - En el abdomen (inspección, palpación, dolor visceromegalias,
            ascitis):
            {values.abnormality.values.abdomen.value.length > 0
              ? ` ${values.abnormality.values.abdomen.value}`
              : ""}
          </h1>
        </div>
      )}

      {values.abnormality.values.extremities.isChecked && (
        <div>
          <h1 className="text-slate-900 font-bold text-lg flex">
            - En las extremidades (várices, úlceras, edema, articulaciones,
            arterias, reflejo patelar):
            {values.abnormality.values.extremities.value.length > 0
              ? ` ${values.abnormality.values.extremities.value}`
              : ""}
          </h1>
        </div>
      )}
    </>
  );
}
