import React, {useContext, useState}from "react";
import { useHistory } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { pokemonListQuery } from '../graphql/queries/pokemonListQuery';
import { PokemonContext } from '../context/PokemonContext';



export const PokemonList = () => {
    const { data, loading, error } = useQuery(pokemonListQuery);
    // const { recentCapturedPokemon , capturedPokemons, setRecentCapturedPokemon, setCapturedPokemon, openModal } = useContext(PokemonContext);
    const [ownedPokemon, setOwnedPokemon] = useState(JSON.parse(localStorage.getItem('storage')));

    let history = useHistory();

    const renderOwned = (name) => {
        
        if(ownedPokemon !== null){

            let pokeNames = ownedPokemon.map(p => p[0].name);

            if(pokeNames.includes(name)){
                return (
                    <button className="px-6 py-1 bg-blue-200 text-blue-500 text-xs rounded-xl focus:outline-none">
                        Owned
                    </button>
                )
            } else {
                return (
                    <button className="px-6 py-1 bg-red-200 text-red-500 text-base rounded-xl focus:outline-none">
                        Not owned
                    </button>
                )
            }
        } else {
            return (
                <button className="px-6 py-1 bg-red-200 text-red-500 text-base rounded-xl focus:outline-none">
                    Not owned
                </button>
            )
        }
        
    }

    if (loading) return <p>Still loading..</p>;
    if (error) return <p>There is an error!</p>;

    if (data) {
        return (
            <>
                <div>
                    <div className="flex w-full bg-gray-100">
                        <div className="w-full lg:px-64">
                            {data.pokemons.results.map((pokemon, index) => (
                                <ul key={index} className="flex flex-col bg-gray-300 p-4">
                                    <li className="w-full border-gray-400 flex flex-row mb-2"
                                        onClick={() => history.push({
                                        pathname: '/pokemon-detail',
                                        pokemonName: pokemon.name
                                    })}>
                                        <div className="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                                            <div className="flex flex-col rounded-md w-12 h-12 bg-gray-300 justify-center items-center mr-4">
                                                <img src={pokemon.image}></img>
                                            </div>
                                            <div className="flex-1 pl-1">
                                                <div className="w-full font-medium text-2xl">{pokemon.name}</div>
                                                <div className="w-full mt-2">{renderOwned(pokemon.name)}</div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )
    }
};


