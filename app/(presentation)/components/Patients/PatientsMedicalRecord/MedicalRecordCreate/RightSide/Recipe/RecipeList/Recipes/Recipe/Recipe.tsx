import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import { IRecipe } from "domain/core/entities/recipeEntity";
import { Dispatch, SetStateAction } from "react";

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
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="mb-2">
          <p className="text-slate-900 font-semibold">{recipe.medicine}</p>
        </div>

        <div>
          <p className="text-slate-400 font-normal">{recipe.indication}</p>
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
                  icon="Pencil"
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
            <Lucide icon="Trash2" color="#e11d48" size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}
