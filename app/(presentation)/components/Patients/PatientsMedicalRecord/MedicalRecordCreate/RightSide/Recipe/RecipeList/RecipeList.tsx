import { IRecipe } from "domain/core/entities/recipeEntity";
import { Dispatch, SetStateAction } from "react";
import Recipes from "./Recipes/Recipes";

interface IRecipesListProps {
  recipes: IRecipe[];
  setRecipes: Dispatch<SetStateAction<IRecipe[]>>;
  recipeEdit: IRecipe | null;
  setRecipeEdit: Dispatch<SetStateAction<IRecipe | null>>;
}

export default function RecipesList({
  recipes,
  setRecipes,
  recipeEdit,
  setRecipeEdit,
}: IRecipesListProps) {
  if (recipes.length === 0) return <div />;

  return (
    <div>
      <div className="mb-3">
        <Recipes
          recipes={recipes}
          setRecipes={setRecipes}
          recipeEdit={recipeEdit}
          setRecipeEdit={setRecipeEdit}
        />
      </div>
    </div>
  );
}
