import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { valuesTypes } from "../Records";

interface IRecordsSpecialtyProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function RecordsSpecialty({
  values,
  setValues,
}: IRecordsSpecialtyProps) {
  const [showFields, setShowFields] = useState(false);

  return (
    <div>
      <button
        type="button"
        className="w-full flex justify-between items-center border-b mb-5 pb-2"
        onClick={() => setShowFields(!showFields)}
      >
        <div>
          <p
            className={clsx([
              "text-lg text-slate-900 hover:font-bold",
              showFields ? "font-bold" : "font-medium",
            ])}
          >
            Antecedentes especialidad
          </p>
        </div>

        <div>
          <Lucide
            icon={showFields ? "ChevronUp" : "ChevronDown"}
            size={30}
            color="#22345F"
          />
        </div>
      </button>

      <div
        className={clsx(["transition-all", showFields ? "block" : "hidden"])}
      >
        <div className="flex items-center justify-between mb-4 w-full">
          <div className="flex items-center w-full">
            <div className="mr-5 w-[200px]">
              <p className="text-slate-900 font-lighter text-lg">Alergías</p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  defaultChecked={values.allergiesSpecialty.isChecked}
                  name="allergiesSpecialty"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.allergiesSpecialty.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.allergiesSpecialty.value}
                  name="allergiesSpecialty"
                  type="text"
                  disabled={!values.allergiesSpecialty.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.allergiesSpecialty.isChecked,
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

        <div className="flex items-center justify-between mb-4 w-full">
          <div className="flex items-center w-full">
            <div className="mr-5 w-[200px]">
              <p className="text-slate-900 font-lighter text-lg">Diabéticos</p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  defaultChecked={values.diabetesSpecialty.isChecked}
                  name="diabetesSpecialty"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.diabetesSpecialty.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.diabetesSpecialty.value}
                  name="diabetesSpecialty"
                  type="text"
                  disabled={!values.diabetesSpecialty.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.diabetesSpecialty.isChecked,
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

        <div className="flex items-center justify-between mb-4 w-full">
          <div className="flex items-center w-full">
            <div className="mr-5 w-[200px]">
              <p className="text-slate-900 font-lighter text-lg">Cáncer</p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  defaultChecked={values.cancerSpecialty.isChecked}
                  name="cancerSpecialty"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.cancerSpecialty.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.cancerSpecialty.value}
                  name="cancerSpecialty"
                  type="text"
                  disabled={!values.cancerSpecialty.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.cancerSpecialty.isChecked,
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

        <div className="flex items-center justify-between mb-4 w-full">
          <div className="flex items-center w-full">
            <div className="mr-5 w-[200px]">
              <p className="text-slate-900 font-lighter text-lg">
                Hipertensión
              </p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  defaultChecked={values.hypertensionSpecialty.isChecked}
                  name="hypertensionSpecialty"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.hypertensionSpecialty.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.hypertensionSpecialty.value}
                  name="hypertensionSpecialty"
                  type="text"
                  disabled={!values.hypertensionSpecialty.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.hypertensionSpecialty.isChecked,
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

        <div className="flex items-center justify-between mb-4 w-full">
          <div className="flex items-center w-full">
            <div className="mr-5 w-[200px]">
              <p className="text-slate-900 font-lighter text-lg">
                Ingiere bebidas alcohólicas
              </p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  defaultChecked={values.alcoholicBeveragesSpecialty.isChecked}
                  name="alcoholicBeveragesSpecialty"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.alcoholicBeveragesSpecialty.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.alcoholicBeveragesSpecialty.value}
                  name="alcoholicBeveragesSpecialty"
                  type="text"
                  disabled={!values.alcoholicBeveragesSpecialty.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.alcoholicBeveragesSpecialty.isChecked,
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
      </div>
    </div>
  );
}
