import React from "react";
import './App.css';
import { BrowserRouter,Switch, Route } from "react-router-dom";
import { PokemonProvider } from './context/PokemonContext';
import { PokemonList } from "./pages/pokemonList";
import { MyPokemonList } from "./pages/myPokemonList";
import { PokemonDetail } from "./pages/pokemonDetail";
import { NotFound } from "./pages/notFound";

function App() {
  return (
    <PokemonProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={PokemonList} />
          <Route exact path="/my-pokemon-list" component={MyPokemonList} />
          <Route exact path="/pokemon-detail" component={PokemonDetail} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </PokemonProvider>
  );
}

export default App;
