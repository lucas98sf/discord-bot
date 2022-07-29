import { Client, GatewayIntentBits, Partials } from 'discord.js';

import { logger } from '@/logger';

import { commands } from './commands';
import { interactionCreate } from './listeners/interaction-create';
import { messageCreate } from './listeners/message-create';

// import * as twt from './twitter';

const client = new Client({
	intents: [GatewayIntentBits.Guilds],
	partials: [Partials.Channel],
});

client.on('ready', async () => {
	if (!client.user || !client.application) {
		return;
	}
	await client.application.commands.set(commands);
	logger.info(`Discord BOT logged in as ${client.user.tag}!`);
});

interactionCreate(client);
messageCreate(client);

export { client as DiscordClient };
