import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { valuesTypes } from "../Records";

interface IRecordsFamilyProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function RecordsFamily({
  values,
  setValues,
}: IRecordsFamilyProps) {
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
            Antecedentes familiares
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
              <p className="text-slate-900 font-lighter text-lg">
                Diabéticos en la familia
              </p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.diabetesFamily.isChecked}
                  defaultChecked={values.diabetesFamily.isChecked}
                  name="diabetesFamily"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.diabetesFamily.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.diabetesFamily.value}
                  name="diabetesFamily"
                  type="text"
                  placeholder="Papá, mamá, abuelo, hermano"
                  disabled={!values.diabetesFamily.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.diabetesFamily.isChecked,
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
                Cáncer en la familia
              </p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.cancerFamily.isChecked}
                  defaultChecked={values.cancerFamily.isChecked}
                  name="cancerFamily"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.cancerFamily.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.cancerFamily.value}
                  name="cancerFamily"
                  type="text"
                  placeholder="Papá, mamá, abuelo, hermano"
                  disabled={!values.cancerFamily.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.cancerFamily.isChecked,
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
                Hipertensión en la familia
              </p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.hypertensionFamily.isChecked}
                  defaultChecked={values.hypertensionFamily.isChecked}
                  name="hypertensionFamily"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.hypertensionFamily.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.hypertensionFamily.value}
                  name="hypertensionFamily"
                  type="text"
                  placeholder="Papá, mamá, abuelo, hermano"
                  disabled={!values.hypertensionFamily.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.hypertensionFamily.isChecked,
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
                Sida en la familia
              </p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.sidaFamily.isChecked}
                  defaultChecked={values.sidaFamily.isChecked}
                  name="sidaFamily"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked ? values.sidaFamily.value : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.sidaFamily.value}
                  name="sidaFamily"
                  type="text"
                  placeholder="Papá, mamá, abuelo, hermano"
                  disabled={!values.sidaFamily.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.sidaFamily.isChecked,
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
              <p className="text-slate-900 font-lighter text-lg">Otra</p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.otherFamily.isChecked}
                  defaultChecked={values.otherFamily.isChecked}
                  name="otherFamily"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked ? values.otherFamily.value : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.otherFamily.value}
                  name="otherFamily"
                  type="text"
                  placeholder="Papá, mamá, abuelo, hermano"
                  disabled={!values.otherFamily.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.otherFamily.isChecked,
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
