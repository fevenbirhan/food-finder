import { useContext } from "react"
import { GlobalContext } from "../../Context/context"
import RecipeItem from "../../Components/recipe-Item/recipeItem";

export default function Home() {
    const { recipeList, loading } = useContext(GlobalContext);

    if (loading) return <div>Loading...Please wait!</div>;

    return(
      <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
        {recipeList && recipeList.length > 0 ? (
            recipeList.map((item) => <RecipeItem item={item} key={item?.id} />)
        ) : (
          <div className="text-center w-full">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              🍳 What&apos;s in Your Fridge?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Search for meals by entering ingredients you have (e.g., &quot;egg, banana&quot;).
            </p>
            <div className="animate-bounce text-4xl">↑</div>
          </div>
        )}
        
      </div>  
    )
}