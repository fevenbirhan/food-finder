import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({children}) {

    const [searchParam, setSearchParam] = useState("");
    const [loading, setLoading] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeDetailsData, setRecipeDetailsData] = useState(null);
    const [favoritesList, setFavoritesList] = useState(() => {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    });

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const res = await fetch(
            `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchParam}&number=30&apiKey=c22a80e222a847b0a4ba30af39c15917`
        );
        const data = await res.json();
        console.log(data);
        if(data) {
          setRecipeList(data);
          setLoading(false);
          navigate('/')
        }
    }

    function handleAddToFavorite(getCurrentItem) {
        console.log(getCurrentItem);
        let cpyFavoritesList = [...favoritesList];
        const index = cpyFavoritesList.findIndex(item=> item.id === getCurrentItem.id)
    
        if(index === -1) {
          cpyFavoritesList.push(getCurrentItem);
        } else {
          cpyFavoritesList.splice(index, 1);
        }
    
        setFavoritesList(cpyFavoritesList);
    }

    useEffect(() => {
      localStorage.setItem('favorites', JSON.stringify(favoritesList));
    }, [favoritesList]);

    return (
        <GlobalContext.Provider
          value={{
            searchParam,
            loading,
            recipeList,
            setSearchParam,
            handleSubmit,
            recipeDetailsData,
            setRecipeDetailsData,
            handleAddToFavorite,
            favoritesList
          }}
        >
          {children}
        </GlobalContext.Provider>
    );
}