import {
  FormCheck,
  FormInput,
} from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { valuesTypes } from "../Records";

interface IRecordsNonPathologicalProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function RecordsNonPathological({
  values,
  setValues,
}: IRecordsNonPathologicalProps) {
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
            Antecedentes no patólogicos
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
        <div className="xl:flex items-center justify-between mb-4 w-full">
          <div className="xl:flex items-center w-full">
            <div className="xl:mr-5 xl:mb-0 mb-1 xl:w-[350px] w-full">
              <p className="text-slate-900 font-lighter text-lg">
                Grupo sanguíneo y RH
              </p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.bloodTypeNonPathological.isChecked}
                  defaultChecked={values.bloodTypeNonPathological.isChecked}
                  name="bloodTypeNonPathological"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.bloodTypeNonPathological.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.bloodTypeNonPathological.value}
                  name="bloodTypeNonPathological"
                  type="text"
                  placeholder="A, B, AB, O"
                  disabled={!values.bloodTypeNonPathological.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.bloodTypeNonPathological.isChecked,
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

        <div className="xl:flex items-center justify-between mb-4 w-full">
          <div className="xl:flex items-center w-full">
            <div className="xl:mr-5 xl:mb-0 mb-1 xl:w-[350px] w-full">
              <p className="text-slate-900 font-lighter text-lg">Tabaquismo</p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.smokingNonPathological.isChecked}
                  defaultChecked={values.smokingNonPathological.isChecked}
                  name="smokingNonPathological"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.smokingNonPathological.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.smokingNonPathological.value}
                  name="smokingNonPathological"
                  type="text"
                  placeholder="Desde cuando y con que frecuencia"
                  disabled={!values.smokingNonPathological.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.smokingNonPathological.isChecked,
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

        <div className="xl:flex items-center justify-between mb-4 w-full">
          <div className="xl:flex items-center w-full">
            <div className="xl:mr-5 xl:mb-0 mb-1 xl:w-[350px] w-full">
              <p className="text-slate-900 font-lighter text-lg">
                Toma bébidas alcohólicas
              </p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.alcoholicBeveragesNonPathological.isChecked}
                  defaultChecked={
                    values.alcoholicBeveragesNonPathological.isChecked
                  }
                  name="alcoholicBeveragesNonPathological"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.alcoholicBeveragesNonPathological.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.alcoholicBeveragesNonPathological.value}
                  name="alcoholicBeveragesNonPathological"
                  type="text"
                  placeholder="Desde cuando y con que frecuencia"
                  disabled={!values.alcoholicBeveragesNonPathological.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked:
                          values.alcoholicBeveragesNonPathological.isChecked,
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

        <div className="xl:flex items-center justify-between mb-4 w-full">
          <div className="xl:flex items-center w-full">
            <div className="xl:mr-5 xl:mb-0 mb-1 xl:w-[350px] w-full">
              <p className="text-slate-900 font-lighter text-lg">
                Consume drogas
              </p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.drugsNonPathological.isChecked}
                  defaultChecked={values.drugsNonPathological.isChecked}
                  name="drugsNonPathological"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.drugsNonPathological.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.drugsNonPathological.value}
                  name="drugsNonPathological"
                  type="text"
                  placeholder="Desde cuando, qué tipo y con que frecuencia"
                  disabled={!values.drugsNonPathological.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.drugsNonPathological.isChecked,
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

        <div className="xl:flex items-center justify-between mb-4 w-full">
          <div className="xl:flex items-center w-full">
            <div className="xl:mr-5 xl:mb-0 mb-1 xl:w-[350px] w-full">
              <p className="text-slate-900 font-lighter text-lg">
                Realiza ejercicio
              </p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.exerciseNonPathological.isChecked}
                  defaultChecked={values.exerciseNonPathological.isChecked}
                  name="exerciseNonPathological"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.exerciseNonPathological.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.exerciseNonPathological.value}
                  name="exerciseNonPathological"
                  type="text"
                  placeholder="Desde cuando, frecuencia"
                  disabled={!values.exerciseNonPathological.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.exerciseNonPathological.isChecked,
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

        <div className="xl:flex items-center justify-between mb-4 w-full">
          <div className="xl:flex items-center w-full">
            <div className="xl:mr-5 xl:mb-0 mb-1 xl:w-[350px] w-full">
              <p className="text-slate-900 font-lighter text-lg">
                Hás sido contagiado de COVID
              </p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.covidNonPathological.isChecked}
                  defaultChecked={values.covidNonPathological.isChecked}
                  name="covidNonPathological"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.covidNonPathological.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.covidNonPathological.value}
                  name="covidNonPathological"
                  type="text"
                  placeholder="Cuando, tratamiento o procedimiento recibido"
                  disabled={!values.covidNonPathological.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.covidNonPathological.isChecked,
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
