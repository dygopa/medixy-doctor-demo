import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IRecipe } from "domain/core/entities/recipeEntity";
import { Dispatch, SetStateAction } from "react";
import { TreatmentDosisTypeEnum } from "(presentation)/(enum)/treatment/treatmentEnums";

interface IRecipeProps {
  recipes: IRecipe[];
  recipe: IRecipe;
  setRecipes: Dispatch<SetStateAction<IRecipe[]>>;
  recipeEdit: IRecipe | null;
  setRecipeEdit: Dispatch<SetStateAction<IRecipe | null>>;
}

export default function Recipe({
  recipes,
  recipe,
  setRecipes,
  recipeEdit,
  setRecipeEdit,
}: IRecipeProps) {
  const getDosisTypeText = () => {
    switch (recipe.unit) {
      case TreatmentDosisTypeEnum.CAPSULE:
        return "Tomar una cápsula";
      case TreatmentDosisTypeEnum.COMPRIMITE:
        return "Tomar comprimido";
      case TreatmentDosisTypeEnum.EMULSION:
        return "Tomar emulsión";
      case TreatmentDosisTypeEnum.GRANULATE:
        return "Tomar granulado";
      case TreatmentDosisTypeEnum.INYECTABLE:
        return "Inyectar";
      case TreatmentDosisTypeEnum.JARABE:
        return "Tomar jarabe";
      case TreatmentDosisTypeEnum.POLVOS:
        return "En polvo";
      case TreatmentDosisTypeEnum.SUSPENTION:
        return "Suspensión";

      default:
        return "";
    }
  };

  const getFrequencyText = () => {
    switch (recipe.frequencyMeasure) {
      case "hours":
        return recipe.frequencyValue === 1
          ? `${recipe.frequencyValue} hora`
          : `${recipe.frequencyValue} horas`;
      case "days":
        return recipe.frequencyValue === 1
          ? `${recipe.frequencyValue} día`
          : `${recipe.frequencyValue} dias`;
      case "weeks":
        return recipe.frequencyValue === 1
          ? `${recipe.frequencyValue} semana`
          : `${recipe.frequencyValue} semanas`;
      case "months":
        return recipe.frequencyValue === 1
          ? `${recipe.frequencyValue} mes`
          : `${recipe.frequencyValue} meses`;

      default:
        return "";
    }
  };

  const getDuringText = () => {
    switch (recipe.duringMeasure) {
      case "hours":
        return recipe.duringValue === 1
          ? `${recipe.duringValue} hora`
          : `${recipe.duringValue} horas`;
      case "days":
        return recipe.duringValue === 1
          ? `${recipe.duringValue} día`
          : `${recipe.duringValue} dias`;
      case "weeks":
        return recipe.duringValue === 1
          ? `${recipe.duringValue} semana`
          : `${recipe.duringValue} semanas`;
      case "months":
        return recipe.duringValue === 1
          ? `${recipe.duringValue} mes`
          : `${recipe.duringValue} meses`;

      default:
        return "";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="mb-2">
          <p className="text-slate-900 font-semibold">{recipe.medicine}</p>
        </div>

        <div>
          <p className="text-slate-400 font-normal">{`${getDosisTypeText()} cada ${getFrequencyText()} por ${getDuringText()}`}</p>
        </div>
      </div>

      <div className="flex items-center">
        <div className="mr-3">
          <button
            type="button"
            onClick={
              recipeEdit && recipeEdit.recipeId === recipe.recipeId
                ? () => setRecipeEdit(null)
                : () => setRecipeEdit(recipe)
            }
            className="text-center flex justify-center w-full"
          >
            <div className="flex items-center">
              <div>
                <Lucide
                  icon="pencil"
                  color={
                    recipeEdit && recipeEdit.recipeId === recipe.recipeId
                      ? "#059669"
                      : "#22345F"
                  }
                  size={25}
                />
              </div>

              {recipeEdit && recipeEdit.recipeId === recipe.recipeId && (
                <div className="ml-2">
                  <p>Editando...</p>
                </div>
              )}
            </div>
          </button>
        </div>

        <div>
          <button
            type="button"
            className="text-center flex justify-center w-full"
            onClick={() => {
              if (recipeEdit && recipeEdit.recipeId === recipe.recipeId) {
                setRecipeEdit(null);
              }

              setRecipes(
                recipes.filter(
                  (recipeFilter) => recipeFilter.recipeId !== recipe.recipeId
                )
              );
            }}
          >
            <Lucide icon="trash-can-outline" color="#e11d48" size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
