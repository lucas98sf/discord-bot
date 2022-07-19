import type { Client, Interaction, CommandInteraction } from 'discord.js';

import commands from '../commands';

export const handleSlashCommand = async (interaction: CommandInteraction): Promise<void> => {
	const slashCommand = commands.find(c => c.name === interaction.commandName);
	if (!slashCommand) {
		interaction.followUp({ content: 'An error has occurred' });
		return;
	}

	await interaction.deferReply();

	slashCommand.run(interaction);
};
//todo: interface/builder
export default (client: Client): void => {
	client.on('interactionCreate', async (interaction: Interaction) => {
		if (interaction.isChatInputCommand()) {
			await handleSlashCommand(interaction);
		}
	});
};
