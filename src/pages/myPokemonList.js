import React, { useEffect, useContext, useState } from "react";
import { useQuery } from '@apollo/react-hooks';
import { useLocation, useHistory } from "react-router-dom";
import { pokemonDetailQuery } from '../graphql/queries/pokemonDetailQuery'
import { PokemonContext } from '../context/PokemonContext';

export const MyPokemonList = () => {
    const location = useLocation();
    const history = useHistory();

    // const { data, loading, error } = useQuery(pokemonDetailQuery);
    const {  capturedPokemons } = useContext(PokemonContext);
    const [pokeList, setPokeList] = useState(JSON.parse(localStorage.getItem('storage')));

    const release = () => {
        console.log('released');
    }

    // if (loading) return <p>Still loading..</p>;
    // if (error) return <p>There is an error!</p>;

    if (true) {
        console.log('captured in list hoho: ', pokeList);
        return (
            <>
                {/* <Container className="mt-4"> */}
                    {/* <React.Fragment> */}
                        <div className="flex flex-col w-full h-screen bg-gray-100">
                            <div className="mx-auto items-center justify-center text-xl font-medium pt-12">My Poke List</div>
                            <div className="flex mx-auto">
                                <div>
                                    {pokeList.map((pokemon, index) => (
                                        <ul key={index} className="flex flex-col bg-gray-300 p-4 rounded my-6">
                                            <li className="border-gray-400 flex flex-row mb-2">
                                            <div className="flex flex-col p-4">
                                                    <div className="text-gray-600 text-sm">Pokemon</div>
                                                    <div className="font-medium">{pokemon[0].name}</div>
                                                </div>
                                                <div className="flex flex-col p-4">
                                                    <div className="text-gray-600 text-sm">Nickname</div>
                                                    <div className="font-medium">{pokemon.nickname}</div>
                                                </div>
                                                <div className="flex flex-col p-4"><button className="bg-red-300 text-red-600 px-6 py-2 rounded" onClick={() => release()}>relase</button></div>
                                            </li>
                                        </ul>
                                    ))}
                                </div>
                            </div>
                        </div>
                    {/* </React.Fragment> */}
                {/* </Container> */}
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
