import { ApplicationCommandOptionType, ApplicationCommandType } from 'discord.js';

import { logger } from '@/logger';
import { getPokemon } from '@/modules/providers/pokemon/get-pokemon';

import type { Command } from '../interfaces';

export const getPokemonSprite: Command = {
	name: 'pokemon',
	description: 'Returns a pokémon sprite',
	type: ApplicationCommandType.ChatInput,
	options: [
		{
			name: 'name',
			description: 'The name of the pokémon',
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	],
	run: async interaction => {
		try {
			const pokemonName = interaction.options.get('name')?.value as string;
			const pokemon = await getPokemon(pokemonName);

			await interaction.followUp({ content: pokemon.sprites.front_shiny });
		} catch (error) {
			logger.error(error);
			await interaction.followUp({
				content: `Pokémon não encontrado`,
			});
		}
	},
};
//todo: error handler
