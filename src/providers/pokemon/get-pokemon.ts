import axios from 'axios';

export const getPokemon = (pokemonName: string) =>
	axios
		.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
		.then(response => response.data)
		.catch(error => {
			throw error;
		});
