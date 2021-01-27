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
    const [clicked, setClicked] = useState(false);
    
    useEffect((a) => {
        // setPokeList(pokeList)
        // console.log('clicked: ', clicked, 'poke: ', pokeList);
      }, [clicked]);

    const release = (nick) => {
        for(let i = 0; i < pokeList.length; i++) {
            if(pokeList[i].nickname === nick) {
                pokeList.splice(i, 1);
                // console.log('poke: ', pokeList);
                setPokeList(pokeList);
            }
        }
    }

    const handleClick = () => {
        history.push("/");
    }

    // if (loading) return <p>Still loading..</p>;
    // if (error) return <p>There is an error!</p>;

    if (true) {
        // console.log('captured in list hoho: ', pokeList, ' length: ', pokeList.length);
        return (
            <>
                {/* <Container className="mt-4"> */}
                    {/* <React.Fragment> */}
                        <div className="flex flex-col w-full h-screen bg-gray-100">
                            <button className="bg-blue-200 text-blue-500 w-48 m-2 rounded py-1" onClick={handleClick}>&larr; back to home</button>
                            <div className="mx-auto items-center justify-center text-xl font-medium pt-6">My Poke List</div>
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
                                                <div className="flex flex-col p-4"><button className="bg-red-300 text-red-600 px-6 py-2 rounded" onClick={()=> {setClicked(!clicked); release(pokemon.nickname)}}>Release</button></div>

                                                {/* <div className="flex flex-col p-4"><button className="bg-red-300 text-red-600 px-6 py-2 rounded" onClick={() => release(pokemon.nickname)}>relase</button></div> */}
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
