
import { useEffect, useState} from 'react';
import './App.css';
import video from'./food.mp4';
import MyResipesComponent from './MyResipesComponent';



function App() {
  
  //const MY_ID = "3c3bdcf0";
  //const MY_KEY = "c66d3012cccfebe105a4013242c26421";

  const[mySerch, setMySerch] = useState("");
  const [myRecipes, setMyRecipes] = useState([]);
  const [wordSumbitted, setWordSumbitted] = useState("");

  useEffect(() =>{
    const getRecipe = async () => {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${wordSumbitted}&app_id=3c3bdcf0&app_key=%20c66d3012cccfebe105a4013242c26421`);
      const data = await response.json();
      setMyRecipes(data.hits);
      console.log( data);
    }
    getRecipe()
  },[wordSumbitted])

 const myRecipeSerch = (e) =>{
  setMySerch(e.target.value)
}

  const finalSearch = (e) => {
    e.preventDefault()
    setWordSumbitted(mySerch)
  }


  return (
    <div className="App">
   <div className="container">
   <video autoPlay muted loop>
   <source src={video} type="video/mp4" />
   </video>
  <h1>Find a Recipe</h1>
  </div>

  <div className='container'>
     <form onSubmit={finalSearch}>
         <input className='search' placeholder='Search...' onChange={myRecipeSerch} value={mySerch}/> 
    </form>
</div>

<div className='container'>
     <button onClick={finalSearch}>
         <img src="https://img.icons8.com/fluency/48/000000/fry.png" alt="icon"/>
      </button>
</div>

{myRecipes.map((element, index) => (
  <MyResipesComponent key={index}
  label={element.recipe.label} 
  image={element.recipe.image} 
  calories={element.recipe.calories}
  ingredientLines={element.recipe.ingredientLines} />
))}

  </div>
  );
}

export default App;
