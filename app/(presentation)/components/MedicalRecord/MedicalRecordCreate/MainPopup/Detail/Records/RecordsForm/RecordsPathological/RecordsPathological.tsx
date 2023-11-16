import AutocompleteInput, {
  IAutocompleteValue,
} from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInput";
import AutocompleteInputMedicines from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputMedicines/AutocompleteInputMedicines";
import { FormInput } from "(presentation)/components/core/BaseComponents/Form";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { valuesTypes } from "../RecordsForm";

interface IRecordsPathologicalProps {
  values: valuesTypes;
  setValues: Dispatch<SetStateAction<valuesTypes>>;
}

export default function RecordsPathological({
  values,
  setValues,
}: IRecordsPathologicalProps) {
  const [showFields, setShowFields] = useState(false);

  const getItemsAutocompleteValues = (list: string[]): IAutocompleteValue[] => {
    const values: IAutocompleteValue[] = [];

    list.forEach((listItem, i) => {
      const value: IAutocompleteValue = {
        id: i,
        name: listItem,
      };

      values.push(value);
    });

    return values;
  };

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
            Antecedentes patólogicos
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
            <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
              <p className="text-md">Alergías</p>
            </div>

            <div className="w-full">
              <div className="flex items-center">
                <div className="w-[20px] h-[20px] mr-4">
                  <FormInput
                    type="checkbox"
                    checked={values.allergiesPathological.isChecked}
                    defaultChecked={values.allergiesPathological.isChecked}
                    name="allergiesPathological"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setValues({
                        ...values,
                        [e.target.name]: {
                          isChecked: e.target.checked,
                          values: e.target.checked
                            ? values.allergiesPathological.values
                            : [],
                        },
                      })
                    }
                    className="w-[20px] h-[20px]"
                  />
                </div>

                <div className="w-full">
                  <AutocompleteInput
                    showClearButton={false}
                    disabled={!values.allergiesPathological.isChecked}
                    items={getItemsAutocompleteValues([
                      "Maní",
                      "Gluten",
                      "Penicilina",
                    ])}
                    itemsListAdded={values.allergiesPathological.values}
                    placeholder="Maní, gluten, penicilina (ENTER para agregar)"
                    className="h-[50px] w-full"
                    onClick={(item: IAutocompleteValue) => {
                      if (
                        values.allergiesPathological.isChecked &&
                        values.allergiesPathological.values.indexOf(item.name) <
                          0
                      ) {
                        const valuesAllergies =
                          values.allergiesPathological.values;
                        valuesAllergies.push(item.name);

                        setValues({
                          ...values,
                          allergiesPathological: {
                            isChecked: true,
                            values: valuesAllergies,
                          },
                        });
                      }
                    }}
                    onKeyDown={(item: IAutocompleteValue) => {
                      if (
                        values.allergiesPathological.isChecked &&
                        values.allergiesPathological.values.indexOf(item.name) <
                          0
                      ) {
                        const valuesAllergies =
                          values.allergiesPathological.values;
                        valuesAllergies.push(item.name);

                        setValues({
                          ...values,
                          allergiesPathological: {
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
                {values.allergiesPathological.values.length > 0 &&
                  values.allergiesPathological.values.map(
                    (value: string, i: number) => (
                      <button
                        type="button"
                        key={i}
                        className="mt-3 mr-3"
                        onClick={() => {
                          setValues({
                            ...values,
                            allergiesPathological: {
                              isChecked: true,
                              values:
                                values.allergiesPathological.values.filter(
                                  (valueAllergicalFilter) =>
                                    valueAllergicalFilter !== value
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
            <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
              <p className="text-md">Intervenciones quirúrgicas</p>
            </div>

            <div className="w-full">
              <div className="flex items-center">
                <div className="w-[20px] h-[20px] mr-4">
                  <FormInput
                    type="checkbox"
                    checked={values.surgicalInterventions.isChecked}
                    defaultChecked={values.surgicalInterventions.isChecked}
                    name="surgicalInterventions"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setValues({
                        ...values,
                        [e.target.name]: {
                          isChecked: e.target.checked,
                          values: e.target.checked
                            ? values.surgicalInterventions.values
                            : [],
                        },
                      })
                    }
                    className="w-[20px] h-[20px]"
                  />
                </div>

                <div className="w-full">
                  <AutocompleteInput
                    showClearButton={false}
                    disabled={!values.surgicalInterventions.isChecked}
                    items={getItemsAutocompleteValues([
                      "Cesarea",
                      "Apendicectomía",
                      "Laparotomía Exploratoria",
                    ])}
                    itemsListAdded={values.surgicalInterventions.values}
                    placeholder="Tipo, cuando, ejem: Amígdalas 2013 (ENTER para agregar)"
                    className="h-[50px] w-full"
                    onClick={(item: IAutocompleteValue) => {
                      if (
                        values.surgicalInterventions.isChecked &&
                        values.surgicalInterventions.values.indexOf(item.name) <
                          0
                      ) {
                        const valuesAllergies =
                          values.surgicalInterventions.values;
                        valuesAllergies.push(item.name);

                        setValues({
                          ...values,
                          surgicalInterventions: {
                            isChecked: true,
                            values: valuesAllergies,
                          },
                        });
                      }
                    }}
                    onKeyDown={(item: IAutocompleteValue) => {
                      if (
                        values.surgicalInterventions.isChecked &&
                        values.surgicalInterventions.values.indexOf(item.name) <
                          0
                      ) {
                        const valuesAllergies =
                          values.surgicalInterventions.values;
                        valuesAllergies.push(item.name);

                        setValues({
                          ...values,
                          surgicalInterventions: {
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
                {values.surgicalInterventions.values.length > 0 &&
                  values.surgicalInterventions.values.map(
                    (value: string, i: number) => (
                      <button
                        type="button"
                        key={i}
                        className="mt-3 mr-3"
                        onClick={() => {
                          setValues({
                            ...values,
                            surgicalInterventions: {
                              isChecked: true,
                              values:
                                values.surgicalInterventions.values.filter(
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

        <div className="md:flex items-center mb-4 w-full">
          <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
            <p className="text-md">Toma medicamentos actualmente</p>
          </div>

          <div className="w-full">
            <div className="flex items-center">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.takeMedication.isChecked}
                  defaultChecked={values.takeMedication.isChecked}
                  name="takeMedication"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        values: e.target.checked
                          ? values.takeMedication.values
                          : [],
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <AutocompleteInputMedicines
                  placeholder="Omeprazol, Ibuprofeno (ENTER para agregar)"
                  disabled={!values.takeMedication.isChecked}
                  className="h-[50px] w-full"
                  onClick={(item: IAutocompleteValue) => {
                    if (
                      values.takeMedication.isChecked &&
                      values.takeMedication.values.indexOf(item.name) < 0
                    ) {
                      const valuesMedication = values.takeMedication.values;
                      valuesMedication.push(item.name);

                      setValues({
                        ...values,
                        takeMedication: {
                          isChecked: true,
                          values: valuesMedication,
                        },
                      });
                    }
                  }}
                />
              </div>
            </div>

            <div className="ml-[36px] max-w-full overflow-x-auto">
              {values.takeMedication.values.length > 0 &&
                values.takeMedication.values.map((value: string, i: number) => (
                  <button
                    type="button"
                    key={i}
                    className="mt-3 mb-3 mr-3"
                    onClick={() => {
                      setValues({
                        ...values,
                        takeMedication: {
                          isChecked: true,
                          values: values.takeMedication.values.filter(
                            (valueTakeMedicationFilter) =>
                              valueTakeMedicationFilter !== value
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
                ))}
            </div>
          </div>
        </div>

        <div className="md:flex items-center justify-between mb-4 w-full">
          <div className="md:flex items-center w-full">
            <div className="md:mr-5 md:mb-0 mb-1 lg:w-[300px] md:w-[300px] w-full">
              <p className="text-md">Transfusiones</p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.transfusions.isChecked}
                  defaultChecked={values.transfusions.isChecked}
                  name="transfusions"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked
                          ? values.transfusions.value
                          : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.transfusions.value}
                  name="transfusions"
                  placeholder="Cuando, tratamiento o procedimiento recibido"
                  type="text"
                  disabled={!values.transfusions.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.transfusions.isChecked,
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
              <p className="text-md">Anemia</p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.anemia.isChecked}
                  defaultChecked={values.anemia.isChecked}
                  name="anemia"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked ? values.anemia.value : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.anemia.value}
                  name="anemia"
                  type="text"
                  placeholder="Cuando, tratamiento o procedimiento recibido"
                  disabled={!values.anemia.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.anemia.isChecked,
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
              <p className="text-md">Artritis</p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.arthritis.isChecked}
                  defaultChecked={values.arthritis.isChecked}
                  name="arthritis"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked ? values.arthritis.value : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.arthritis.value}
                  name="arthritis"
                  type="text"
                  placeholder="Cuando, tratamiento o procedimiento recibido"
                  disabled={!values.arthritis.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.arthritis.isChecked,
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
              <p className="text-md">Asma</p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.asma.isChecked}
                  defaultChecked={values.asma.isChecked}
                  name="asma"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked ? values.asma.value : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.asma.value}
                  name="asma"
                  type="text"
                  placeholder="Cuando, tratamiento o procedimiento recibido"
                  disabled={!values.asma.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.asma.isChecked,
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
              <p className="text-md">Cáncer</p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.cancer.isChecked}
                  defaultChecked={values.cancer.isChecked}
                  name="cancer"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked ? values.cancer.value : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.cancer.value}
                  name="cancer"
                  type="text"
                  placeholder="Cuando, tratamiento o procedimiento recibido"
                  disabled={!values.cancer.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.cancer.isChecked,
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
              <p className="text-md">Coágulos sanguíneos</p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.bloodClots.isChecked}
                  defaultChecked={values.bloodClots.isChecked}
                  name="bloodClots"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked ? values.bloodClots.value : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.bloodClots.value}
                  name="bloodClots"
                  type="text"
                  placeholder="Cuando, tratamiento o procedimiento recibido"
                  disabled={!values.bloodClots.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.bloodClots.isChecked,
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
              <p className="text-md">Colitis</p>
            </div>

            <div className="flex items-center w-full">
              <div className="w-[20px] h-[20px] mr-4">
                <FormInput
                  type="checkbox"
                  checked={values.colitis.isChecked}
                  defaultChecked={values.colitis.isChecked}
                  name="colitis"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: e.target.checked,
                        value: e.target.checked ? values.colitis.value : "",
                      },
                    })
                  }
                  className="w-[20px] h-[20px]"
                />
              </div>

              <div className="w-full">
                <FormInput
                  value={values.colitis.value}
                  name="colitis"
                  type="text"
                  placeholder="Cuando, tratamiento o procedimiento recibido"
                  disabled={!values.colitis.isChecked}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setValues({
                      ...values,
                      [e.target.name]: {
                        isChecked: values.colitis.isChecked,
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
