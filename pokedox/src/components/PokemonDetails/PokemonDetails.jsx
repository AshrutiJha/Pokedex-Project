import {useParams} from "react-router-dom"
import './PokemonDetails.css';
import usePokemonDetails from "../../Hooks/usePokemonDetails";

function PokemonDetails(){
    const {id} = useParams();
    const [pokemon]=usePokemonDetails(id);
    return (
<div className="pokemon-details-wrapper">

   <div className="pokemon-details-name">:<span>{pokemon.name}</span> </div> 
   <img className="pokemon-details-image" src={pokemon.image}/>
   <div className="pokemon-details-image">Height : {pokemon.height}</div>
   <div className="pokemon-details-image">Weight: {pokemon.weight}</div>
   <div className="pokemon-details-types">
    {pokemon.types && pokemon.types.map((t)=> <div key = {t}>{t} </div>)}
   </div>
   {

   pokemon.types && pokemon.similarPokemons &&
    <div>
        more{pokemon.types[0]}type pokemons 
        <ul>
            {pokemon.similarpokemon.map((p)=><li key={p.pokemon.id}>{p.pokemon.name}</li>)}

        </ul>
        </div>
   }
</div>
    );

}
export default PokemonDetails;