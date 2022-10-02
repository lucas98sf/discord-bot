/* eslint-disable no-console */
import { ApplicationCommandType, TextChannel } from 'discord.js';

import { logger } from '@/logger';

import votacao from '../../providers/votacao';
import { DiscordClient } from '../client';
import type { Command } from '../interfaces';

export const lula: Command = {
	name: 'votacao',
	description: 'LULALULALULALULALULALULALULALULA',
	type: ApplicationCommandType.ChatInput,
	run: async interaction => {
		try {
			const res = await votacao();
			await interaction.followUp({ embeds: [res] });
		} catch (error) {
			logger.error(error);
			await interaction.followUp({
				content: JSON.stringify(error, null, 2),
			});
		}
	},
};

export const lulaChron = async (channelId: string) => {
	try {
		const res = await votacao();
		const channel = (await DiscordClient.channels.fetch(channelId)) as TextChannel;
		await channel?.send({ embeds: [res] });
	} catch (error) {
		logger.error(error);
	}
};
