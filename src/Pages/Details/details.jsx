import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../../Context/context";

export default function Details() {
  const { id } = useParams();
  const {
    recipeDetailsData,
    setRecipeDetailsData,
    favoritesList,
    handleAddToFavorite,
  } = useContext(GlobalContext);

  const ingredientNames = Array.from(
    new Set(
      recipeDetailsData?.analyzedInstructions?.[0]?.steps?.flatMap(step =>
        step.ingredients.map(ingredient => ingredient.name)
      ) || []
    )
  );

  useEffect(() => {
    async function getRecipeDetails() {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=c22a80e222a847b0a4ba30af39c15917`
      );
      const data = await response.json();

      console.log(data);
       if (data) {
         setRecipeDetailsData(data);
       }
    }

    getRecipeDetails();
  }, []);

  console.log(recipeDetailsData, "recipeDetailsData");

  return (
    <div className="container mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div className="row-start-2 lg:row-start-auto">
        <div className="h-96 overflow-hidden rounded-xl group">
          <img
            src={recipeDetailsData?.image}
            className="w-full h-full object-cover block group-hover:scale-105 duration-300"
          />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-sm text-cyan-700 font-medium">
          Ready in minutes: {recipeDetailsData?.readyInMinutes}
        </span>
        <h3 className="font-bold text-2xl truncate text-black">
          {recipeDetailsData?.title}
        </h3>
        <div>
          <button
            onClick={() => handleAddToFavorite(recipeDetailsData)}
            className="p-3 px-8 rounded-lg text-sm uppercase font-medium tracking-wider mt-3 inline-block shadow-md bg-black text-white"
          >
            {favoritesList && favoritesList.length > 0 && favoritesList.findIndex(
              (item) => item.id === recipeDetailsData?.id
            ) !== -1
              ? "Remove from favorites"
              : "Add to favorites"}
          </button>
        </div>
        
        <div>
            <span className="text-2xl font-semibold text-black">
               Ingredients:
            </span>
            <ul className="flex flex-col gap-3">
                {ingredientNames.map((ingredient, index) => (
                    <li key={index} className="text-black">
                    {ingredient}
                    </li>
                ))}
            </ul>
        </div>

        <div>
            <span className="text-2xl font-semibold text-black">
            Cooking Steps:
            </span>
            <ol className="list-decimal list-inside flex flex-col gap-3 mt-2">
            {recipeDetailsData?.analyzedInstructions?.[0]?.steps?.map((step, index) => (
                <li key={index} className="text-black">
                {step.step}
                </li>
            ))}
            </ol>
        </div>
      </div>
      
    </div>
  );
}