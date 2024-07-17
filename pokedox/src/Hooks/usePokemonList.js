import {useEffect, useState} from "react";
import axios from 'axios';

function usePokemonList(){
    
    const [pokemonListState,setPokemonListState] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: `https://pokeapi.co/api/v2/pokemon`,
        nextUrl: '',
        prevUrl: '',
        
    });

    async function downloadPokemon(){

      setPokemonListState((state) => ({...state, isLoading: true}));
        console.log(pokemonListState.pokedexUrl);
        const response = await axios.get(pokemonListState.pokedexUrl); //this downloads the list of 20 pokemons

        const pokemonResults = response.data.results; // we get the array of pokemon from result
        console.log("response is",response.data.pokemon);

        console.log(pokemonListState)
        setPokemonListState((state) => ({
            ...state, 
            nextUrl: response.data.next, 
            prevUrl: response.data.previous
        }));
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
        //passing that promise array to axois.all
        const pokemonData = await axios.all(pokemonResultPromise) //Array of 20 pokemon detailed data
        console.log(pokemonData)
        //iterarte on the data of each pokemon and extraxt id,name,image and types
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            return {
                id: pokemon.id,
                name: pokemon.name , 
                image: (pokemon.sprites.other) ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny, 
                types: pokemon.types
            }
        });
        setPokemonListState( (state) => ({
            ...state, 
            pokemonList: pokeListResult , 
            isLoading: false
        }));
    
}
    useEffect(()=>{
        downloadPokemon();
    }, [pokemonListState.pokedexUrl]);
  return {pokemonListState,setPokemonListState}

}

export default usePokemonList;