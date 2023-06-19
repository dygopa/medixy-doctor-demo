import { IRecipe } from "domain/core/entities/recipeEntity";
import { Dispatch, SetStateAction } from "react";
import Recipe from "./Recipe/Recipe";

interface IRecipesProps {
  recipes: IRecipe[];
  setRecipes: Dispatch<SetStateAction<IRecipe[]>>;
  recipeEdit: IRecipe | null;
  setRecipeEdit: Dispatch<SetStateAction<IRecipe | null>>;
}

export default function Recipes({
  recipes,
  setRecipes,
  recipeEdit,
  setRecipeEdit,
}: IRecipesProps) {
  return (
    <div>
      {recipes.map((recipe: IRecipe) => (
        <div key={recipe.recipeId} className="mb-3">
          <Recipe
            recipe={recipe}
            recipes={recipes}
            setRecipes={setRecipes}
            recipeEdit={recipeEdit}
            setRecipeEdit={setRecipeEdit}
          />
        </div>
      ))}
    </div>
  );
}
