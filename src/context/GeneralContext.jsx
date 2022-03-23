import { createContext,useState,useEffect} from "react";
import axios from 'axios'
export const RecipiesContext = createContext([])


export const GeneralProvider = ({children})=>{

    const [allRecipes,setAllRecipies] = useState([])
    const [recipeToSearch,setRecipeToSearch] = useState("chicken")

    const CallToAPI = async() =>{
        console.log("im calling the API")
        const req = await axios.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${recipeToSearch}&app_id=cad3728a&app_key=7b8b85ff810a0af7c23025db08e3eb25`)

        setAllRecipies(req.data.hits)
    }

    useEffect(()=>{
        CallToAPI()
        
    },[recipeToSearch])

    const data = {
        allRecipes:allRecipes,
        recipeToSearch:recipeToSearch,
        setRecipeToSearch:setRecipeToSearch
    }

    return(
        <RecipiesContext.Provider value={data}>
            {children}
        </RecipiesContext.Provider>
    )

}