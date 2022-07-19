import { logger } from '@/logger';
import { Client, GatewayIntentBits, Partials } from 'discord.js';

import commands from './commands';
import interactionCreate from './listeners/interaction-create';

// import * as twt from './twitter';

const client = new Client({ intents: [GatewayIntentBits.Guilds], partials: [Partials.Channel] });

client.on('ready', async () => {
	if (!client.user || !client.application) {
		return;
	}
	await client.application.commands.set(commands);
	logger.info(`Discord BOT logged in as ${client.user.tag}!`);
});

interactionCreate(client);

export default client;
