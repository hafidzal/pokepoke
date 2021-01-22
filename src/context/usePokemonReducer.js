import { useReducer, useEffect } from 'react';
import { CAPTURED, RECENT_CAPTURE } from './actions';

const setRecentCapturedPokemon = (recentPokemon, state) => {
    const ok = true;
    const arrCaptured = [];
    console.log('state recent: ', state);
    if(ok){
        return ({
            openModal: true,
            capturedPokemons: state.capturedPokemons,
            // recentCapturedPokemon: recentPokemon,
            recentCapturedPokemon: [...arrCaptured, recentPokemon]
        })}
    else{
        console.log('gagal');
    }
};

const setCapturedPokemon = (pokemon, state) => {
    let newPokemonWithNickname = Object.assign(pokemon, state.recentCapturedPokemon)
    // console.log('local storage captured: ', localStorage.getItem('storage'));
    localStorage.setItem('storage', JSON.stringify([...state.capturedPokemons  , newPokemonWithNickname]))

    return ({
      ...state,
      openModal: false,
      capturedPokemons: [...state.capturedPokemons  , newPokemonWithNickname]
    })
};

const pokemonReducer = (state, action) => {
  switch (action.type) {
    case CAPTURED:
      return setCapturedPokemon(action.pokemonNickname, state);
    case RECENT_CAPTURE:
      return setRecentCapturedPokemon(action.recentPokemon, state);
    default:
      return state;
  }
};

export const usePokemonReducer = () =>
  useReducer(pokemonReducer, {
    pokemon: [],
    recentPokemon: null,
    capturedPokemons: [],
    openModal: false,
    recentCapturedPokemon: []
  });