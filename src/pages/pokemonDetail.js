import React, { useEffect, useContext, useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import { useLocation, useHistory } from "react-router-dom";
import { pokemonDetailQuery } from '../graphql/queries/pokemonDetailQuery'
import { PokemonContext } from '../context/PokemonContext';


export const PokemonDetail = () => {
    const location = useLocation();
    const history = useHistory();

    const { data, loading, error } = useQuery(pokemonDetailQuery, {variables: { "name":  location.pokemonName}});
    const { capturedPokemons, setRecentCapturedPokemon, setCapturedPokemon, openModal } = useContext(PokemonContext);

    const [pokemonNickname, setPokemonNickname] = useState('');

    const handleNameOnChange = (userKey, value) => {
        setPokemonNickname({[userKey]: value})
    }

    if (loading) return <p>Still loading..</p>;
    if (error) return <p>There is an error!</p>;

    const renderModal = () => {
        console.log('captured: ', capturedPokemons);
        if(openModal == true){
            return (
                <div className="">
                        {/* <div className="text-green-700 font-medium">Gotcha!</div> */}
                        <div className="flex mt-2">
                            <input className="focus:border-light-blue-500 focus:ring-1 focus:ring-light-blue-500 focus:outline-none w-full text-sm text-black placeholder-gray-500 border border-gray-200 rounded-md py-2 pl-2" type="text" value={pokemonNickname.nickname || ""} placeholder="add pokemon nickname" onChange={e => handleNameOnChange("nickname", e.target.value)} />
                            <button className="ml-4 bg-green-300 text-green-600 px-6 rounded" onClick={setCapturedPokemon(pokemonNickname)}>Add</button>
                        </div>
                </div>
            )
        }
    }

    if (data && location.pokemonName) {
        return (
            <>
                <div className="flex w-full bg-gray-100">
                    <div className="flex w-full h-screen lg:px-64 py-4">
                        <div className="flex flex-col rounded-md w-12 h-12 bg-gray-300 justify-center items-center mr-4">
                            <img src={data.pokemon.sprites.front_default}></img>
                        </div>
                        <div className="w-full h-64 bg-gray-300 px-4 py-2 rounded">
                            <div className="font-medium text-2xl my-4">{data.pokemon.name}</div> 
                            <button className="bg-yellow-200 text-yellow-700 px-6 py-2 rounded-xl" onClick={setRecentCapturedPokemon(data.pokemon)}>Catch The Pokemon</button>
                            {renderModal()}
                            <button className="mt-2 bg-blue-200 text-blue-600 text-white px-6 py-2 rounded" onClick={() => history.push("/my-pokemon-list")}>Go To My Pokemon List</button>

                        </div>
                    </div>
            </div>
            </>
        )
    } else {
        return (
            <>
                <div>
                    Pokemon not found.
                </div>
            </>
        )
    }
};
