import { logger } from '@/logger';
import type { Client, Message } from 'discord.js';

//todo: interface/builder
export const messageCreate = (client: Client): void => {
	client.on('messageCreate', async (message: Message) => {
		logger.info(`Message from ${message.author.tag} in ${message.channel.id}`);
	});
};
