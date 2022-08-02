import axios from 'axios';

type PokemonSpriteResponse = {
	sprites: {
		front_default: string;
		front_shiny: string;
	};
};

export const getPokemon = (pokemonName: string) =>
	axios
		.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
		.then(response => response.data as PokemonSpriteResponse)
		.catch(error => {
			throw error;
		});
