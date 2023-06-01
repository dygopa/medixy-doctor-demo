import { IRecipe } from "domain/core/entities/recipeEntity";
import { useEffect, useState } from "react";

export default function Recipes() {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const setValueFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    const valuesJSON = JSON.parse(valuesStorage ?? "");
    setRecipes(valuesJSON.recipes);
  };

  useEffect(() => {
    setValueFromLocalStorage();
  }, []);

  if (recipes.length === 0) return <div />;

  return (
    <div>
      <div className="mb-2">
        <h3 className="text-slate-400 text-lg">Tratamientos</h3>
      </div>

      <div>
        {recipes.map((recipe: IRecipe) => (
          <div key={recipe.recipeId} className="mb-1">
            <h1 className="text-slate-900 font-bold text-lg">
              {recipe.medicine}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
}
