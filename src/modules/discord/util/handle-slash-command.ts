import type { CommandInteraction } from 'discord.js';

import { commands } from '../commands';

export const handleSlashCommand = async (interaction: CommandInteraction): Promise<void> => {
	const slashCommand = commands.find(c => c.name === interaction.commandName);
	if (!slashCommand) {
		await interaction.followUp({ content: 'An error has occurred' });
		return;
	}

	await interaction.deferReply();

	slashCommand.run(interaction);
};
