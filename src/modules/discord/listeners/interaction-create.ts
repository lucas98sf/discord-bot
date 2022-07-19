import type { Client, CommandInteraction, Interaction } from 'discord.js';

import { commands } from '../commands';

const handleSlashCommand = async (interaction: CommandInteraction): Promise<void> => {
	const slashCommand = commands.find(c => c.name === interaction.commandName);
	if (!slashCommand) {
		interaction.followUp({ content: 'An error has occurred' });
		return;
	}

	await interaction.deferReply();

	slashCommand.run(interaction);
};
//todo: interface/builder
export const interactionCreate = (client: Client): void => {
	client.on('interactionCreate', async (interaction: Interaction) => {
		if (interaction.isChatInputCommand()) {
			await handleSlashCommand(interaction);
		}
	});
};
