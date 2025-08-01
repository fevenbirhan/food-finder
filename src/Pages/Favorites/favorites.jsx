import { useContext } from "react";
import RecipeItem from "../../Components/recipe-Item/recipeItem";
import { GlobalContext } from "../../Context/context";

export default function Favorites() {
    const { favoritesList } = useContext(GlobalContext);

    return (
        <div className="py-8 container mx-auto flex flex-wrap justify-center gap-10">
            {favoritesList && favoritesList.length > 0 ? (
                favoritesList.map((item) => <RecipeItem item={item} key={item?.id} />)
            ) : (
                <div>
                    <p className="lg:text-4xl text-xl text-center text-black font-extrabold">
                        No favorites added yet!
                    </p>
                </div>
            )}
        </div>
    );
}