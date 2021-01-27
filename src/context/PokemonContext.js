import React, { createContext } from 'react';
import { usePokemonReducer } from './usePokemonReducer';
import { CAPTURED, RECENT_CAPTURE } from './actions';

//creating function to dispatch the action

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const [state, dispatch] = usePokemonReducer();
  const { pokemon, pokemonNickname, recentPokemon, capturedPokemons, openModal, openButton, recentCapturedPokemon, onSubmit } = state;

  const setCapturedPokemon = (pokemonNickname) => () => dispatch({ type: CAPTURED, pokemonNickname });
  const setRecentCapturedPokemon = (recentPokemon) => () => dispatch({ type: RECENT_CAPTURE, recentPokemon });

  const providerValue = {
    pokemon,
    recentPokemon,
    pokemonNickname,
    capturedPokemons,
    setCapturedPokemon,
    setRecentCapturedPokemon,
    openModal,
    openButton,
    recentCapturedPokemon,
    onSubmit
  };

  return (
    <PokemonContext.Provider value={providerValue}>
      {props.children}
    </PokemonContext.Provider>
  )
};

export { PokemonContext, PokemonProvider };