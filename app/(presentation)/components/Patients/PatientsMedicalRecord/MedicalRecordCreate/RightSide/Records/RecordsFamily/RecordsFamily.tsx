import AutocompleteInput from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInput";
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
        <div className="md:flex items-center justify-between mb-4 w-full">
          <div className="md:flex items-center w-full">
            <div className="md:mr-5 md:mb-0 mb-1 lg:w-[350px] md:w-[200px] w-full">
              <p className="text-lg">Diabéticos en la familia</p>
            </div>

            <div className="w-full">
              <div className="flex items-center">
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
                          values: e.target.checked
                            ? values.diabetesFamily.values
                            : [],
                        },
                      })
                    }
                    className="w-[20px] h-[20px]"
                  />
                </div>

                <div className="w-full">
                  <AutocompleteInput
                    disabled={!values.diabetesFamily.isChecked}
                    items={["Padre", "Madre", "Hermano", "Hermana", "Abuelo", "Abuela"]}
                    itemsAdded={values.diabetesFamily.values}
                    placeholder="Padre, Madre, Hermanos, Abuelos (ENTER para agregar)"
                    className="h-[50px] w-full"
                    onClick={(item: string) => {
                      if (
                        values.diabetesFamily.isChecked &&
                        item.length > 0 &&
                        values.diabetesFamily.values.indexOf(item) < 0
                      ) {
                        const valuesAllergies =
                          values.diabetesFamily.values;
                        valuesAllergies.push(item);

                        setValues({
                          ...values,
                          diabetesFamily: {
                            isChecked: true,
                            values: valuesAllergies,
                          },
                        });
                      }
                    }}
                    onKeyDown={(item: string) => {
                      if (
                        values.diabetesFamily.isChecked &&
                        item.length > 0 &&
                        values.diabetesFamily.values.indexOf(item) < 0
                      ) {
                        const valuesAllergies =
                          values.diabetesFamily.values;
                        valuesAllergies.push(item);

                        setValues({
                          ...values,
                          diabetesFamily: {
                            isChecked: true,
                            values: valuesAllergies,
                          },
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="ml-[36px] max-w-full overflow-x-auto">
                {values.diabetesFamily.values.length > 0 &&
                  values.diabetesFamily.values.map(
                    (value: string, i: number) => (
                      <button
                        type="button"
                        key={i}
                        className="mt-3 mr-3"
                        onClick={() => {
                          setValues({
                            ...values,
                            diabetesFamily: {
                              isChecked: true,
                              values:
                                values.diabetesFamily.values.filter(
                                  (valueInterventionsFilter) =>
                                    valueInterventionsFilter !== value
                                ),
                            },
                          });
                        }}
                      >
                        <div className="bg-primary px-2 py-1 w-auto rounded-md flex justify-between items-center">
                          <div className="mr-2">
                            <p className="text-white text-md font-semibold">
                              {value}
                            </p>
                          </div>

                          <div className="mt-1">
                            <Lucide icon="XCircle" color="#fff" size={20} />
                          </div>
                        </div>
                      </button>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex items-center justify-between mb-4 w-full">
          <div className="md:flex items-center w-full">
            <div className="md:mr-5 md:mb-0 mb-1 lg:w-[350px] md:w-[200px] w-full">
              <p className="text-lg">Cáncer en la familia</p>
            </div>

            <div className="w-full">
              <div className="flex items-center">
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
                          values: e.target.checked
                            ? values.cancerFamily.values
                            : [],
                        },
                      })
                    }
                    className="w-[20px] h-[20px]"
                  />
                </div>

                <div className="w-full">
                  <AutocompleteInput
                    disabled={!values.cancerFamily.isChecked}
                    items={["Padre", "Madre", "Hermano", "Hermana", "Abuelo", "Abuela"]}
                    itemsAdded={values.cancerFamily.values}
                    placeholder="Padre, Madre, Hermanos, Abuelos (ENTER para agregar)"
                    className="h-[50px] w-full"
                    onClick={(item: string) => {
                      if (
                        values.cancerFamily.isChecked &&
                        item.length > 0 &&
                        values.cancerFamily.values.indexOf(item) < 0
                      ) {
                        const valuesAllergies =
                          values.cancerFamily.values;
                        valuesAllergies.push(item);

                        setValues({
                          ...values,
                          cancerFamily: {
                            isChecked: true,
                            values: valuesAllergies,
                          },
                        });
                      }
                    }}
                    onKeyDown={(item: string) => {
                      if (
                        values.cancerFamily.isChecked &&
                        item.length > 0 &&
                        values.cancerFamily.values.indexOf(item) < 0
                      ) {
                        const valuesAllergies =
                          values.cancerFamily.values;
                        valuesAllergies.push(item);

                        setValues({
                          ...values,
                          cancerFamily: {
                            isChecked: true,
                            values: valuesAllergies,
                          },
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="ml-[36px] max-w-full overflow-x-auto">
                {values.cancerFamily.values.length > 0 &&
                  values.cancerFamily.values.map(
                    (value: string, i: number) => (
                      <button
                        type="button"
                        key={i}
                        className="mt-3 mr-3"
                        onClick={() => {
                          setValues({
                            ...values,
                            cancerFamily: {
                              isChecked: true,
                              values:
                                values.cancerFamily.values.filter(
                                  (valueInterventionsFilter) =>
                                    valueInterventionsFilter !== value
                                ),
                            },
                          });
                        }}
                      >
                        <div className="bg-primary px-2 py-1 w-auto rounded-md flex justify-between items-center">
                          <div className="mr-2">
                            <p className="text-white text-md font-semibold">
                              {value}
                            </p>
                          </div>

                          <div className="mt-1">
                            <Lucide icon="XCircle" color="#fff" size={20} />
                          </div>
                        </div>
                      </button>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex items-center justify-between mb-4 w-full">
          <div className="md:flex items-center w-full">
            <div className="md:mr-5 md:mb-0 mb-1 lg:w-[350px] md:w-[200px] w-full">
              <p className="text-lg">Hipertensión en la familia</p>
            </div>

            <div className="w-full">
              <div className="flex items-center">
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
                          values: e.target.checked
                            ? values.hypertensionFamily.values
                            : [],
                        },
                      })
                    }
                    className="w-[20px] h-[20px]"
                  />
                </div>

                <div className="w-full">
                  <AutocompleteInput
                    disabled={!values.hypertensionFamily.isChecked}
                    items={["Padre", "Madre", "Hermano", "Hermana", "Abuelo", "Abuela"]}
                    itemsAdded={values.hypertensionFamily.values}
                    placeholder="Padre, Madre, Hermanos, Abuelos (ENTER para agregar)"
                    className="h-[50px] w-full"
                    onClick={(item: string) => {
                      if (
                        values.hypertensionFamily.isChecked &&
                        item.length > 0 &&
                        values.hypertensionFamily.values.indexOf(item) < 0
                      ) {
                        const valuesAllergies =
                          values.hypertensionFamily.values;
                        valuesAllergies.push(item);

                        setValues({
                          ...values,
                          hypertensionFamily: {
                            isChecked: true,
                            values: valuesAllergies,
                          },
                        });
                      }
                    }}
                    onKeyDown={(item: string) => {
                      if (
                        values.hypertensionFamily.isChecked &&
                        item.length > 0 &&
                        values.hypertensionFamily.values.indexOf(item) < 0
                      ) {
                        const valuesAllergies =
                          values.hypertensionFamily.values;
                        valuesAllergies.push(item);

                        setValues({
                          ...values,
                          hypertensionFamily: {
                            isChecked: true,
                            values: valuesAllergies,
                          },
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="ml-[36px] max-w-full overflow-x-auto">
                {values.hypertensionFamily.values.length > 0 &&
                  values.hypertensionFamily.values.map(
                    (value: string, i: number) => (
                      <button
                        type="button"
                        key={i}
                        className="mt-3 mr-3"
                        onClick={() => {
                          setValues({
                            ...values,
                            hypertensionFamily: {
                              isChecked: true,
                              values:
                                values.hypertensionFamily.values.filter(
                                  (valueInterventionsFilter) =>
                                    valueInterventionsFilter !== value
                                ),
                            },
                          });
                        }}
                      >
                        <div className="bg-primary px-2 py-1 w-auto rounded-md flex justify-between items-center">
                          <div className="mr-2">
                            <p className="text-white text-md font-semibold">
                              {value}
                            </p>
                          </div>

                          <div className="mt-1">
                            <Lucide icon="XCircle" color="#fff" size={20} />
                          </div>
                        </div>
                      </button>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex items-center justify-between mb-4 w-full">
          <div className="md:flex items-center w-full">
            <div className="md:mr-5 md:mb-0 mb-1 lg:w-[350px] md:w-[200px] w-full">
              <p className="text-lg">Sida en la familia</p>
            </div>

            <div className="w-full">
              <div className="flex items-center">
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
                          values: e.target.checked
                            ? values.sidaFamily.values
                            : [],
                        },
                      })
                    }
                    className="w-[20px] h-[20px]"
                  />
                </div>

                <div className="w-full">
                  <AutocompleteInput
                    disabled={!values.sidaFamily.isChecked}
                    items={["Padre", "Madre", "Hermano", "Hermana", "Abuelo", "Abuela"]}
                    itemsAdded={values.sidaFamily.values}
                    placeholder="Padre, Madre, Hermanos, Abuelos (ENTER para agregar)"
                    className="h-[50px] w-full"
                    onClick={(item: string) => {
                      if (
                        values.sidaFamily.isChecked &&
                        item.length > 0 &&
                        values.sidaFamily.values.indexOf(item) < 0
                      ) {
                        const valuesAllergies =
                          values.sidaFamily.values;
                        valuesAllergies.push(item);

                        setValues({
                          ...values,
                          sidaFamily: {
                            isChecked: true,
                            values: valuesAllergies,
                          },
                        });
                      }
                    }}
                    onKeyDown={(item: string) => {
                      if (
                        values.sidaFamily.isChecked &&
                        item.length > 0 &&
                        values.sidaFamily.values.indexOf(item) < 0
                      ) {
                        const valuesAllergies =
                          values.sidaFamily.values;
                        valuesAllergies.push(item);

                        setValues({
                          ...values,
                          sidaFamily: {
                            isChecked: true,
                            values: valuesAllergies,
                          },
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="ml-[36px] max-w-full overflow-x-auto">
                {values.sidaFamily.values.length > 0 &&
                  values.sidaFamily.values.map(
                    (value: string, i: number) => (
                      <button
                        type="button"
                        key={i}
                        className="mt-3 mr-3"
                        onClick={() => {
                          setValues({
                            ...values,
                            sidaFamily: {
                              isChecked: true,
                              values:
                                values.sidaFamily.values.filter(
                                  (valueInterventionsFilter) =>
                                    valueInterventionsFilter !== value
                                ),
                            },
                          });
                        }}
                      >
                        <div className="bg-primary px-2 py-1 w-auto rounded-md flex justify-between items-center">
                          <div className="mr-2">
                            <p className="text-white text-md font-semibold">
                              {value}
                            </p>
                          </div>

                          <div className="mt-1">
                            <Lucide icon="XCircle" color="#fff" size={20} />
                          </div>
                        </div>
                      </button>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:flex items-center justify-between mb-4 w-full">
          <div className="md:flex items-center w-full">
            <div className="md:mr-5 md:mb-0 mb-1 lg:w-[350px] md:w-[200px] w-full">
              <p className="text-lg">Otra</p>
            </div>

            <div className="w-full">
              <div className="flex items-center">
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
                          values: e.target.checked
                            ? values.otherFamily.values
                            : [],
                        },
                      })
                    }
                    className="w-[20px] h-[20px]"
                  />
                </div>

                <div className="w-full">
                  <AutocompleteInput
                    disabled={!values.otherFamily.isChecked}
                    items={["Padre", "Madre", "Hermano", "Hermana", "Abuelo", "Abuela"]}
                    itemsAdded={values.otherFamily.values}
                    placeholder="Padre, Madre, Hermanos, Abuelos (ENTER para agregar)"
                    className="h-[50px] w-full"
                    onClick={(item: string) => {
                      if (
                        values.otherFamily.isChecked &&
                        item.length > 0 &&
                        values.otherFamily.values.indexOf(item) < 0
                      ) {
                        const valuesAllergies =
                          values.otherFamily.values;
                        valuesAllergies.push(item);

                        setValues({
                          ...values,
                          otherFamily: {
                            isChecked: true,
                            values: valuesAllergies,
                          },
                        });
                      }
                    }}
                    onKeyDown={(item: string) => {
                      if (
                        values.otherFamily.isChecked &&
                        item.length > 0 &&
                        values.otherFamily.values.indexOf(item) < 0
                      ) {
                        const valuesAllergies =
                          values.otherFamily.values;
                        valuesAllergies.push(item);

                        setValues({
                          ...values,
                          otherFamily: {
                            isChecked: true,
                            values: valuesAllergies,
                          },
                        });
                      }
                    }}
                  />
                </div>
              </div>

              <div className="ml-[36px] max-w-full overflow-x-auto">
                {values.otherFamily.values.length > 0 &&
                  values.otherFamily.values.map(
                    (value: string, i: number) => (
                      <button
                        type="button"
                        key={i}
                        className="mt-3 mr-3"
                        onClick={() => {
                          setValues({
                            ...values,
                            otherFamily: {
                              isChecked: true,
                              values:
                                values.otherFamily.values.filter(
                                  (valueInterventionsFilter) =>
                                    valueInterventionsFilter !== value
                                ),
                            },
                          });
                        }}
                      >
                        <div className="bg-primary px-2 py-1 w-auto rounded-md flex justify-between items-center">
                          <div className="mr-2">
                            <p className="text-white text-md font-semibold">
                              {value}
                            </p>
                          </div>

                          <div className="mt-1">
                            <Lucide icon="XCircle" color="#fff" size={20} />
                          </div>
                        </div>
                      </button>
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
