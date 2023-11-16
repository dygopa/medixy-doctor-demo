import Button from "(presentation)/components/core/BaseComponents/Button";
import Lucide from "(presentation)/components/core/BaseComponents/Lucide";
import clsx from "clsx";
import { IRecipe } from "domain/core/entities/recipeEntity";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AddRecipe from "./AddRecipe/AddRecipe";
import RecipeList from "./RecipeList/RecipeList";

export default function Recipe() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const view = params.get("view");
  const type = params.get("type");

  const [showBody, setShowBody] = useState(false);
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [recipeEdit, setRecipeEdit] = useState<IRecipe | null>(null);

  const [initialRender, setInitialRender] = useState(true);

  const saveRecipesInLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    let valuesJSON = JSON.parse(valuesStorage ?? "");

    let recipesStorage = valuesJSON.recipes;
    recipesStorage = recipes;

    valuesJSON.recipes = recipesStorage;

    localStorage.setItem(
      "prosit.storage.medical-record-create",
      JSON.stringify(valuesJSON)
    );
  };

  const setRecipesFromLocalStorage = () => {
    const valuesStorage = localStorage.getItem(
      "prosit.storage.medical-record-create"
    );

    if (!valuesStorage) window.location.reload();

    const valuesJSON = JSON.parse(valuesStorage ?? "");

    setRecipes(valuesJSON.recipes);
  };

  useEffect(() => {
    if (!initialRender) saveRecipesInLocalStorage();

    setInitialRender(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipes]);

  useEffect(() => {
    setRecipesFromLocalStorage();
  }, []);

  useEffect(() => {
    if (!view || view === "recipe") {
      setShowBody(true);
    } else {
      setShowBody(false);
    }
  }, [view]);

  return (
    <div>
      <div
        className={clsx([
          "h-auto relative z-40 w-full",
          "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70",
        ])}
      >
        <div className="p-4 box h-full">
          <button type="button" className="w-full">
            <div className="w-full flex justify-between items-center border-b pb-2">
              <div>
                <p className="font-bold text-lg text-slate-900">Receta</p>
              </div>
            </div>
          </button>

          <form>
            <div className="py-4 border-b">
              <AddRecipe
                recipes={recipes}
                setRecipes={setRecipes}
                recipeEdit={recipeEdit}
                setRecipeEdit={setRecipeEdit}
              />
            </div>

            <div className="py-4">
              <RecipeList
                recipes={recipes}
                setRecipes={setRecipes}
                recipeEdit={recipeEdit}
                setRecipeEdit={setRecipeEdit}
              />
            </div>
          </form>
        </div>
      </div>

      <div className="w-full flex justify-end mt-14">
        <div className="mr-2">
          <Button
            variant="outline-primary"
            className="h-[46px]"
            onClick={() => {
              router.replace(
                `${pathname}?view=orders&type=${type ?? "medical-record"}`
              );
            }}
          >
            Volver
          </Button>
        </div>

        <div>
          <Button
            variant="primary"
            className="h-[46px]"
            onClick={() => {
              router.replace(
                `${pathname}?view=images&type=${type ?? "medical-record"}`
              );
            }}
          >
            <div className="flex items-center">
              <div className="mr-2">Imagenes</div>

              <div>
                <Lucide icon="ArrowRight" color="#fff" size={25} />
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
