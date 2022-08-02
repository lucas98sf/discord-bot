import { Client, GatewayIntentBits, Interaction, Message, Partials } from 'discord.js';

import { logger } from '@/logger';

import { commands } from './commands';
import { handleSlashCommand } from './util/handle-slash-command';

const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildPresences,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.Channel],
});

client.on('ready', async () => {
	if (!client.user || !client.application) {
		return;
	}
	await client.application.commands.set(commands);
	logger.info(`Discord BOT logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction: Interaction) => {
	if (interaction.isChatInputCommand()) {
		await handleSlashCommand(interaction);
	}
});

client.on('messageCreate', (message: Message) => {
	logger.info(`Message from ${message.author.tag} in ${message.channel.id}`);
});

export { client as DiscordClient };
