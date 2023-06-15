import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import AbnormalitySection from "./AbnormalitySection/AbnormalitySection";

type valuesTypes = {
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
  smokingPhysical: {
    isChecked: boolean;
    value: string;
  };
};

interface IPhysicalExplorationFormProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function PhysicalExplorationForm({
  values,
  setValues,
}: IPhysicalExplorationFormProps) {
  return (
    <div>
      <div className="md:flex items-center justify-between mb-4 w-full">
        <div className="md:flex items-center w-full">
          <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
            <p className="text-md">¿Existe alguna anormalidad en su aspecto?</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.abnormalAppearance.isChecked}
                defaultChecked={values.abnormalAppearance.isChecked}
                name="abnormalAppearance"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: e.target.checked,
                      value: e.target.checked
                        ? values.abnormalAppearance.value
                        : "",
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.abnormalAppearance.value}
                name="abnormalAppearance"
                placeholder="¿Existe alguna anormalidad en su aspecto?"
                type="text"
                disabled={!values.abnormalAppearance.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: values.abnormalAppearance.isChecked,
                      value: e.target.value,
                    },
                  })
                }
                className="h-[50px] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex items-center justify-between mb-4 w-full">
        <div className="md:flex items-center w-full">
          <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
            <p className="text-md">¿Existe disnea?</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.disnea.isChecked}
                defaultChecked={values.disnea.isChecked}
                name="disnea"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: e.target.checked,
                      value: e.target.checked ? values.disnea.value : "",
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.disnea.value}
                name="disnea"
                placeholder="¿Existe disnea?"
                type="text"
                disabled={!values.disnea.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: values.disnea.isChecked,
                      value: e.target.value,
                    },
                  })
                }
                className="h-[50px] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex items-center justify-between mb-4 w-full">
        <div className="md:flex items-center w-full">
          <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
            <p className="text-md">¿Existe alguna deformidad?</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.deformity.isChecked}
                defaultChecked={values.deformity.isChecked}
                name="deformity"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: e.target.checked,
                      value: e.target.checked ? values.deformity.value : "",
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.deformity.value}
                name="deformity"
                placeholder="¿Existe alguna deformidad?"
                type="text"
                disabled={!values.deformity.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: values.deformity.isChecked,
                      value: e.target.value,
                    },
                  })
                }
                className="h-[50px] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex items-center justify-between mb-4 w-full">
        <div className="md:flex items-center w-full">
          <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
            <p className="text-md">¿Falta algún miembro o parte de él?</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.amputation.isChecked}
                defaultChecked={values.amputation.isChecked}
                name="amputation"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: e.target.checked,
                      value: e.target.checked ? values.amputation.value : "",
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.amputation.value}
                name="amputation"
                placeholder="¿Falta algún miembro o parte de él?"
                type="text"
                disabled={!values.amputation.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: values.amputation.isChecked,
                      value: e.target.value,
                    },
                  })
                }
                className="h-[50px] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex items-center justify-between mb-4 w-full">
        <div className="md:flex items-center w-full">
          <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
            <p className="text-md">¿Hay parálisis o paresias?</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.paralysis.isChecked}
                defaultChecked={values.paralysis.isChecked}
                name="paralysis"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: e.target.checked,
                      value: e.target.checked ? values.paralysis.value : "",
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.paralysis.value}
                name="paralysis"
                placeholder="¿Hay parálisis o paresias?"
                type="text"
                disabled={!values.paralysis.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: values.paralysis.isChecked,
                      value: e.target.value,
                    },
                  })
                }
                className="h-[50px] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex items-center justify-between mb-4 w-full">
        <div className="md:flex items-center w-full">
          <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
            <p className="text-md">¿Hay movimientos anormales?</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.abnormalMovements.isChecked}
                defaultChecked={values.abnormalMovements.isChecked}
                name="abnormalMovements"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: e.target.checked,
                      value: e.target.checked
                        ? values.abnormalMovements.value
                        : "",
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.abnormalMovements.value}
                name="abnormalMovements"
                placeholder="¿Hay movimientos anormales?"
                type="text"
                disabled={!values.abnormalMovements.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: values.abnormalMovements.isChecked,
                      value: e.target.value,
                    },
                  })
                }
                className="h-[50px] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex items-center justify-between mb-4 w-full">
        <div className="md:flex items-center w-full">
          <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
            <p className="text-md">¿La marcha es anormal?</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.normalGait.isChecked}
                defaultChecked={values.normalGait.isChecked}
                name="normalGait"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: e.target.checked,
                      value: e.target.checked ? values.normalGait.value : "",
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.normalGait.value}
                name="normalGait"
                placeholder="¿La marcha es anormal?"
                type="text"
                disabled={!values.normalGait.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: values.normalGait.isChecked,
                      value: e.target.value,
                    },
                  })
                }
                className="h-[50px] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex items-center justify-between mb-4 w-full">
        <div className="md:flex items-center w-full">
          <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
            <p className="text-md">¿Se aprecia algún transtorno psíquico?</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.mentalDisorder.isChecked}
                defaultChecked={values.mentalDisorder.isChecked}
                name="mentalDisorder"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: e.target.checked,
                      value: e.target.checked
                        ? values.mentalDisorder.value
                        : "",
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.mentalDisorder.value}
                name="mentalDisorder"
                placeholder="¿Se aprecia algún transtorno psíquico?"
                type="text"
                disabled={!values.mentalDisorder.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: values.mentalDisorder.isChecked,
                      value: e.target.value,
                    },
                  })
                }
                className="h-[50px] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex items-center justify-between mb-4 w-full">
        <div className="md:flex items-center w-full">
          <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
            <p className="text-md">
              ¿Existe algún dato en el aliento, dientes, dedos del solicitante
              que señale que fume?
            </p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.smokingPhysical.isChecked}
                defaultChecked={values.smokingPhysical.isChecked}
                name="smokingPhysical"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: e.target.checked,
                      value: e.target.checked
                        ? values.smokingPhysical.value
                        : "",
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.smokingPhysical.value}
                name="smokingPhysical"
                placeholder="¿Existe algún dato en el aliento, dientes, dedos del solicitante que señale que fume?"
                type="text"
                disabled={!values.smokingPhysical.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: values.smokingPhysical.isChecked,
                      value: e.target.value,
                    },
                  })
                }
                className="h-[50px] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="md:flex items-center justify-between mb-4 w-full">
        <div className="md:flex items-center w-full">
          <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
            <p className="text-md">¿Existe cualquier anormalidad?</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.abnormality.isChecked}
                defaultChecked={values.abnormality.isChecked}
                name="abnormality"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: e.target.checked,
                      values: values.abnormality.values,
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.abnormality.value}
                name="abnormality"
                placeholder="¿Existe cualquier anormalidad?"
                type="text"
                disabled={!values.abnormality.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    [e.target.name]: {
                      isChecked: values.abnormality.isChecked,
                      value: e.target.value,
                      values: values.abnormality.values,
                    },
                  })
                }
                className="h-[50px] w-full"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex items-center">
        <div className="lg:w-[325px] md:w-[150px] w-[40px]" />

        <div className="w-full">
          {values.abnormality.isChecked && (
            <AbnormalitySection values={values} setValues={setValues} />
          )}
        </div>
      </div>
    </div>
  );
}
