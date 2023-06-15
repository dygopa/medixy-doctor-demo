import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

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

interface IAbnormalitySectionProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function AbnormalitySection({
  values,
  setValues,
}: IAbnormalitySectionProps) {
  return (
    <>
      <div className="md:flex items-center justify-between mb-4 w-full">
        <div className="md:flex items-center w-full">
          <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
            <p className="text-md">- En el estado anatómico de los ojos</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={
                  values.abnormality.values.anatomicalStateEyes.isChecked
                }
                defaultChecked={
                  values.abnormality.values.anatomicalStateEyes.isChecked
                }
                name="anatomicalStateEyes"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked: e.target.checked,
                          value: e.target.checked
                            ? values.abnormality.values.anatomicalStateEyes
                                .value
                            : "",
                        },
                      },
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.abnormality.values.anatomicalStateEyes.value}
                name="anatomicalStateEyes"
                placeholder="En el estado anatómico de los ojos"
                type="text"
                disabled={
                  !values.abnormality.values.anatomicalStateEyes.isChecked
                }
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked:
                            values.abnormality.values.anatomicalStateEyes
                              .isChecked,
                          value: e.target.value,
                        },
                      },
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
            <p className="text-md">- En la visión de cada ojo</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.abnormality.values.eyeVision.isChecked}
                defaultChecked={values.abnormality.values.eyeVision.isChecked}
                name="eyeVision"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked: e.target.checked,
                          value: e.target.checked
                            ? values.abnormality.values.eyeVision.value
                            : "",
                        },
                      },
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.abnormality.values.eyeVision.value}
                name="eyeVision"
                placeholder="En la visión de cada ojo"
                type="text"
                disabled={!values.abnormality.values.eyeVision.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked:
                            values.abnormality.values.eyeVision.isChecked,
                          value: e.target.value,
                        },
                      },
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
            <p className="text-md">- En la audición de cada oído</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.abnormality.values.hearingEars.isChecked}
                defaultChecked={values.abnormality.values.hearingEars.isChecked}
                name="hearingEars"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked: e.target.checked,
                          value: e.target.checked
                            ? values.abnormality.values.hearingEars.value
                            : "",
                        },
                      },
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.abnormality.values.hearingEars.value}
                name="hearingEars"
                placeholder="En la audición de cada oído"
                type="text"
                disabled={!values.abnormality.values.hearingEars.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked:
                            values.abnormality.values.hearingEars.isChecked,
                          value: e.target.value,
                        },
                      },
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
            <p className="text-md">- En la cavidad bucal y la faringe</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.abnormality.values.buccalPharynx.isChecked}
                defaultChecked={
                  values.abnormality.values.buccalPharynx.isChecked
                }
                name="buccalPharynx"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked: e.target.checked,
                          value: e.target.checked
                            ? values.abnormality.values.buccalPharynx.value
                            : "",
                        },
                      },
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.abnormality.values.buccalPharynx.value}
                name="buccalPharynx"
                placeholder="En la cavidad bucal y la faringe"
                type="text"
                disabled={!values.abnormality.values.buccalPharynx.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked:
                            values.abnormality.values.buccalPharynx.isChecked,
                          value: e.target.value,
                        },
                      },
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
              - En el cuello (ganglios, tiroides, ingurgitación yugular,
              arterias)
            </p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.abnormality.values.neck.isChecked}
                defaultChecked={values.abnormality.values.neck.isChecked}
                name="neck"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked: e.target.checked,
                          value: e.target.checked
                            ? values.abnormality.values.neck.value
                            : "",
                        },
                      },
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.abnormality.values.neck.value}
                name="neck"
                placeholder="En el cuello (ganglios, tiroides, ingurgitación yugular, arterias)"
                type="text"
                disabled={!values.abnormality.values.neck.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked: values.abnormality.values.neck.isChecked,
                          value: e.target.value,
                        },
                      },
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
            <p className="text-md">- En el tórax (inspección, auscultación)</p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.abnormality.values.chest.isChecked}
                defaultChecked={values.abnormality.values.chest.isChecked}
                name="chest"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked: e.target.checked,
                          value: e.target.checked
                            ? values.abnormality.values.chest.value
                            : "",
                        },
                      },
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.abnormality.values.chest.value}
                name="chest"
                placeholder="En el tórax (inspección, auscultación)"
                type="text"
                disabled={!values.abnormality.values.chest.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked: values.abnormality.values.chest.isChecked,
                          value: e.target.value,
                        },
                      },
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
              - En la columna vertebral (deformidad, dolor, limitación)
            </p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.abnormality.values.spine.isChecked}
                defaultChecked={values.abnormality.values.spine.isChecked}
                name="spine"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked: e.target.checked,
                          value: e.target.checked
                            ? values.abnormality.values.spine.value
                            : "",
                        },
                      },
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.abnormality.values.spine.value}
                name="spine"
                placeholder="En la columna vertebral (deformidad, dolor, limitación)"
                type="text"
                disabled={!values.abnormality.values.spine.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked: values.abnormality.values.spine.isChecked,
                          value: e.target.value,
                        },
                      },
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
              - En el abdomen (inspeccion, palpación, dolor, visceromeglias,
              ascitis)
            </p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.abnormality.values.abdomen.isChecked}
                defaultChecked={values.abnormality.values.abdomen.isChecked}
                name="abdomen"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked: e.target.checked,
                          value: e.target.checked
                            ? values.abnormality.values.abdomen.value
                            : "",
                        },
                      },
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.abnormality.values.abdomen.value}
                name="abdomen"
                placeholder="En el abdomen (inspeccion, palpación, dolor, visceromeglias, ascitis)"
                type="text"
                disabled={!values.abnormality.values.abdomen.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked:
                            values.abnormality.values.abdomen.isChecked,
                          value: e.target.value,
                        },
                      },
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
              - En las extremidades (várices, úlceras, edema, articulaciones,
              arterias, reflejo patelar)
            </p>
          </div>

          <div className="flex items-center w-full">
            <div className="w-[20px] h-[20px] mr-4">
              <FormInput
                type="checkbox"
                checked={values.abnormality.values.extremities.isChecked}
                defaultChecked={values.abnormality.values.extremities.isChecked}
                name="extremities"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked: e.target.checked,
                          value: e.target.checked
                            ? values.abnormality.values.extremities.value
                            : "",
                        },
                      },
                    },
                  })
                }
                className="w-[20px] h-[20px]"
              />
            </div>

            <div className="w-full">
              <FormInput
                value={values.abnormality.values.extremities.value}
                name="extremities"
                placeholder="En las extremidades (várices, úlceras, edema, articulaciones, arterias, reflejo patelar)"
                type="text"
                disabled={!values.abnormality.values.extremities.isChecked}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({
                    ...values,
                    abnormality: {
                      ...values.abnormality,
                      values: {
                        ...values.abnormality.values,
                        [e.target.name]: {
                          isChecked:
                            values.abnormality.values.extremities.isChecked,
                          value: e.target.value,
                        },
                      },
                    },
                  })
                }
                className="h-[50px] w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
