import Search from "../Search/Search";
import'./Pokedex.css';

function Pokedex(){

    return (
        <div className="pokedex-wrapper">

        <Search/>
        < pokemonList />   
        </div>
    )
}

export default Pokedex;