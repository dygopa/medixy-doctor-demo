import {
  TreatmentDosisTypeEnum,
  TreatmentDosisTypeTextEnum,
  TreatmentViaDosisEnum,
  TreatmentViaDosisTextEnum,
} from "(presentation)/(enum)/treatment/treatmentEnums";
import AutocompleteInput, {
  IAutocompleteValue,
} from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInput";
import AutocompleteInputMedicines from "(presentation)/components/core/BaseComponents/Autocomplete/AutocompleteInputMedicines/AutocompleteInputMedicines";
import Button from "(presentation)/components/core/BaseComponents/Button";
import {
  FormInput,
  FormSelect,
} from "(presentation)/components/core/BaseComponents/Form";
import clsx from "clsx";
import { IMedicine } from "domain/core/entities/medicineEntity";
import { IRecipe } from "domain/core/entities/recipeEntity";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface IAddRecipeProps {
  recipes: IRecipe[];
  setRecipes: Dispatch<SetStateAction<IRecipe[]>>;
  recipeEdit: IRecipe | null;
  setRecipeEdit: Dispatch<SetStateAction<IRecipe | null>>;
}

export default function AddRecipe({
  recipes,
  setRecipes,
  recipeEdit,
  setRecipeEdit,
}: IAddRecipeProps) {
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  const [values, setValues] = useState({
    medicine: "",
    via: TreatmentViaDosisEnum.ORAL,
    quantity: "",
    unit: TreatmentDosisTypeEnum.CAPSULE,
    frequencyMeasure: "hours",
    frequencyValue: "",
    duringMeasure: "days",
    duringValue: "",
    indication: "",
  });

  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };

    if (screenSize.width === 0 && screenSize.height === 0) updateDimension();

    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

  const onAddRecipe = () => {
    const recipe: IRecipe = {
      recipeId: recipes.length + 1,
      medicine: values.medicine,
      via: values.via,
      quantity: values.quantity.length > 0 ? parseInt(values.quantity, 10) : 0,
      unit: parseInt(values.unit.toString(), 10),
      frequencyMeasure: values.frequencyMeasure,
      frequencyValue:
        values.frequencyValue.length > 0
          ? parseInt(values.frequencyValue, 10)
          : 0,
      duringMeasure: values.duringMeasure,
      duringValue:
        values.duringValue.length > 0 ? parseInt(values.duringValue, 10) : 0,
      indication: values.indication,
      createdOn: new Date(),
    };

    setRecipes([...recipes, recipe]);
    setValues({
      ...values,
      medicine: "",
      via: TreatmentViaDosisEnum.ORAL,
      quantity: "",
      unit: TreatmentDosisTypeEnum.CAPSULE,
      frequencyMeasure: "hours",
      frequencyValue: "",
      duringMeasure: "hours",
      duringValue: "",
      indication: "",
    });
  };

  const onEditRecipe = () => {
    const id = recipeEdit?.recipeId ? recipeEdit.recipeId - 1 : 0;

    let newRecipesLists = [...recipes];

    let item = { ...newRecipesLists[id] };

    const recipeEditObject: IRecipe = {
      recipeId: id,
      medicine: values.medicine,
      via: values.via,
      quantity: values.quantity.length > 0 ? parseInt(values.quantity, 10) : 0,
      unit: parseInt(values.unit.toString(), 10),
      frequencyMeasure: values.frequencyMeasure,
      frequencyValue:
        values.frequencyValue.length > 0
          ? parseInt(values.frequencyValue, 10)
          : 0,
      duringMeasure: values.duringMeasure,
      duringValue:
        values.duringValue.length > 0 ? parseInt(values.duringValue, 10) : 0,
      indication: values.indication,
      createdOn: new Date(),
    };

    item = recipeEditObject;
    newRecipesLists[id] = item;

    setRecipes(newRecipesLists);
    setRecipeEdit(null);

    setValues({
      ...values,
      medicine: "",
      via: TreatmentViaDosisEnum.ORAL,
      quantity: "",
      unit: TreatmentDosisTypeEnum.CAPSULE,
      frequencyMeasure: "hours",
      frequencyValue: "",
      duringMeasure: "hours",
      duringValue: "",
      indication: "",
    });
  };

  const setValuesByRecipeEdit = () => {
    setValues({
      ...values,
      medicine: recipeEdit?.medicine ?? "",
      via: recipeEdit?.via ?? TreatmentViaDosisEnum.ORAL,
      quantity: recipeEdit?.quantity ? recipeEdit.quantity.toString() : "",
      unit: recipeEdit?.unit
        ? parseInt(recipeEdit.unit.toString(), 10)
        : TreatmentDosisTypeEnum.CAPSULE,
      frequencyMeasure: recipeEdit?.frequencyMeasure ?? "",
      frequencyValue: recipeEdit?.frequencyValue
        ? recipeEdit.frequencyValue.toString()
        : "",
      duringMeasure: recipeEdit?.duringMeasure ?? "",
      duringValue: recipeEdit?.duringValue
        ? recipeEdit.duringValue.toString()
        : "",
      indication: recipeEdit?.indication ?? "",
    });
  };

  const isValidForm = (): boolean => {
    if (
      values.medicine.length > 0 &&
      values.quantity.length > 0 &&
      values.frequencyMeasure.length > 0 &&
      values.frequencyValue.length > 0 &&
      values.duringMeasure.length > 0 &&
      values.duringValue.length > 0
    ) {
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (recipeEdit) setValuesByRecipeEdit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeEdit]);

  return (
    <div>
      <div className="xl:flex items-center justify-between mb-4 w-full">
        <div className="xl:flex items-center w-full">
          <div className="xl:mr-5 xl:mb-0 mb-1 xl:w-[100px] w-full">
            <p className="text-md">Medicamento</p>
          </div>

          <div className="w-full">
            <AutocompleteInputMedicines
              defaultValue={values.medicine}
              placeholder=""
              className="h-[50px] w-full"
              onChange={(item: string) =>
                setValues({ ...values, medicine: "" })
              }
              onClick={(item: IAutocompleteValue) =>
                setValues({ ...values, medicine: item.name })
              }
            />
          </div>
        </div>
      </div>

      <div className="mb-4 w-full">
        <div
          className={clsx([
            "items-center mb-4",
            screenSize.width > 1500 && "xl:flex",
          ])}
        >
          <div
            className={clsx([
              "items-center w-full",
              screenSize.width > 1500 && "xl:flex",
            ])}
          >
            <div className="xl:mr-5 xl:mb-0 mb-1 xl:w-[100px] w-full md:grid grid-cols-2 md:gap-5 xl:gap-0">
              <p className="text-slate-900 font-lighter text-md">
                Prescripción
              </p>
              <p
                className={clsx([
                  "text-slate-900 font-lighter text-md",
                  screenSize.width <= 1500 && screenSize.width >= 767
                    ? "block xl:ml-56"
                    : "hidden",
                ])}
              >
                Duración
              </p>
            </div>

            <div className="xl:flex items-center md:grid grid-cols-2 md:gap-5 xl:gap-0">
              <div className="md:flex items-center md:gap-3 xl:gap-0">
                <div className="xl:mr-3 xl:mb-0 mb-3">
                  <div className="mb-1">
                    <p className="text-md text-slate-500">Vía</p>
                  </div>

                  <div>
                    <FormSelect
                      defaultValue={values.via}
                      name="via"
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setValues({
                          ...values,
                          [e.target.name]: e.target.value,
                        })
                      }
                    >
                      <option value={TreatmentViaDosisEnum.ORAL}>
                        {TreatmentViaDosisTextEnum.ORAL}
                      </option>
                      <option value={TreatmentViaDosisEnum.SUBLINGUAL}>
                        {TreatmentViaDosisTextEnum.SUBLINGUAL}
                      </option>
                      <option value={TreatmentViaDosisEnum.TOPICA}>
                        {TreatmentViaDosisTextEnum.TOPICA}
                      </option>
                      <option value={TreatmentViaDosisEnum.TRANSDERMIC}>
                        {TreatmentViaDosisTextEnum.TRANSDERMIC}
                      </option>
                      <option value={TreatmentViaDosisEnum.OPHTHALMOLOGICAL}>
                        {TreatmentViaDosisTextEnum.OPHTHALMOLOGICAL}
                      </option>
                      <option value={TreatmentViaDosisEnum.INHALATION}>
                        {TreatmentViaDosisTextEnum.INHALATION}
                      </option>
                      <option value={TreatmentViaDosisEnum.RECTAL}>
                        {TreatmentViaDosisTextEnum.RECTAL}
                      </option>
                      <option value={TreatmentViaDosisEnum.VAGINAL}>
                        {TreatmentViaDosisTextEnum.VAGINAL}
                      </option>
                      <option value={TreatmentViaDosisEnum.PARENTAL}>
                        {TreatmentViaDosisTextEnum.PARENTAL}
                      </option>
                    </FormSelect>
                  </div>
                </div>

                <div className="xl:mr-3 xl:mb-0 mb-3">
                  <div className="mb-1">
                    <p className="text-md text-slate-500">Cantidad</p>
                  </div>

                  <div>
                    <FormInput
                      value={values.quantity}
                      name="quantity"
                      type="number"
                      min="1"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (
                          e.target.value.length > 0 &&
                          parseInt(e.target.value, 10) <= 0
                        )
                          return;

                        setValues({
                          ...values,
                          [e.target.name]: e.target.value,
                        });
                      }}
                      className="xl:w-16 md:w-14 w-full"
                    />
                  </div>
                </div>

                <div className="xl:mr-3 xl:mb-0 mb-3">
                  <div className="mb-1">
                    <p className="text-md text-slate-500">Unidad</p>
                  </div>

                  <div>
                    <FormSelect
                      defaultValue={values.unit}
                      name="unit"
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        setValues({
                          ...values,
                          [e.target.name]: e.target.value,
                        })
                      }
                    >
                      <option value={TreatmentDosisTypeEnum.CAPSULE}>
                        {TreatmentDosisTypeTextEnum.CAPSULE}
                      </option>
                      <option value={TreatmentDosisTypeEnum.JARABE}>
                        {TreatmentDosisTypeTextEnum.JARABE}
                      </option>
                      <option value={TreatmentDosisTypeEnum.POLVOS}>
                        {TreatmentDosisTypeTextEnum.POLVOS}
                      </option>
                      <option value={TreatmentDosisTypeEnum.SUSPENTION}>
                        {TreatmentDosisTypeTextEnum.SUSPENTION}
                      </option>
                      <option value={TreatmentDosisTypeEnum.COMPRIMITE}>
                        {TreatmentDosisTypeTextEnum.COMPRIMITE}
                      </option>
                      <option value={TreatmentDosisTypeEnum.GRANULATE}>
                        {TreatmentDosisTypeTextEnum.GRANULATE}
                      </option>
                      <option value={TreatmentDosisTypeEnum.EMULSION}>
                        {TreatmentDosisTypeTextEnum.EMULSION}
                      </option>
                      <option value={TreatmentDosisTypeEnum.INYECTABLE}>
                        {TreatmentDosisTypeTextEnum.INYECTABLE}
                      </option>
                    </FormSelect>
                  </div>
                </div>
              </div>

              <div
                className={clsx([
                  "items-center",
                  screenSize.width > 1500 && "flex",
                ])}
              >
                <div
                  className={clsx([
                    "xl:mr-5 xl:mb-0 xl:w-[80px] w-full md:hidden lg:hidden",
                    screenSize.width <= 1500 && screenSize.width >= 1200
                      ? "hidden"
                      : "block xl:block",
                  ])}
                >
                  <p className="text-slate-900 font-lighter text-md">
                    Duración
                  </p>
                </div>

                <div className="md:flex items-center md:gap-3 xl:gap-0">
                  <div className="xl:mr-3 xl:mb-0 mb-3">
                    <div className="mb-1">
                      <p className="text-md text-slate-500">Cada</p>
                    </div>

                    <div>
                      <FormInput
                        value={values.frequencyValue}
                        name="frequencyValue"
                        type="number"
                        min="1"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          if (
                            e.target.value.length > 0 &&
                            parseInt(e.target.value, 10) <= 0
                          )
                            return;

                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        className="xl:w-16 md:w-14 w-full"
                      />
                    </div>
                  </div>

                  <div className="xl:mr-3 xl:mb-0 mb-3">
                    <div className="mb-1">
                      <p className="text-md text-white md:h-[20px]" />
                    </div>

                    <div>
                      <FormSelect
                        defaultValue={values.frequencyMeasure}
                        name="frequencyMeasure"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      >
                        <option value="hours">Horas</option>
                        <option value="days">Días</option>
                        <option value="weeks">Semanas</option>
                        <option value="months">Meses</option>
                      </FormSelect>
                    </div>
                  </div>

                  <div className="xl:mr-3 xl:mb-0 mb-3">
                    <div className="mb-1">
                      <p className="text-md text-slate-500">Durante</p>
                    </div>

                    <div>
                      <FormInput
                        value={values.duringValue}
                        name="duringValue"
                        type="number"
                        min="1"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          if (
                            e.target.value.length > 0 &&
                            parseInt(e.target.value, 10) <= 0
                          )
                            return;

                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          });
                        }}
                        className="xl:w-16 md:w-14 w-full"
                      />
                    </div>
                  </div>

                  <div className="xl:mr-3 xl:mb-0 mb-3">
                    <div className="mb-1">
                      <p className="text-md text-white md:h-[20px]" />
                    </div>

                    <div>
                      <FormSelect
                        defaultValue={values.duringMeasure}
                        name="duringMeasure"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          setValues({
                            ...values,
                            [e.target.name]: e.target.value,
                          })
                        }
                      >
                        <option value="hours">Horas</option>
                        <option value="days">Días</option>
                        <option value="weeks">Semanas</option>
                        <option value="months">Meses</option>
                      </FormSelect>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="xl:flex items-center justify-between w-full mt-4">
        <div className="xl:flex items-center w-full">
          <div className="xl:mr-5 xl:mb-0 mb-1 w-[110px]">
            <p className="input-label" />
          </div>

          <div className="xl:flex items-center w-full">
            <div className="w-full xl:mr-3 xl:mb-0 mb-3">
              <FormInput
                value={values.indication}
                name="indication"
                type="text"
                placeholder="Observación o indicación adicional para el tratamiento"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="h-[50px] w-full"
              />
            </div>

            <div>
              <Button
                type="button"
                variant="primary"
                className="h-[50px]"
                disabled={isValidForm()}
                onClick={
                  recipeEdit ? () => onEditRecipe() : () => onAddRecipe()
                }
              >
                {recipeEdit ? "Modificar" : "Agregar"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
