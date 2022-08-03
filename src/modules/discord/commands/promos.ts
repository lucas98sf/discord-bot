import {
	ApplicationCommandOptionType,
	ApplicationCommandType,
	EmbedBuilder,
	EmbedData,
} from 'discord.js';

import { logger } from '@/logger';
import { getProducts } from '@/modules/providers/ali-express/get-products';

import type { Command } from '../interfaces';

export const queryProducts: Command = {
	name: 'query-products',
	description: 'Returns 5 first products from Ali Express',
	type: ApplicationCommandType.ChatInput,
	options: [
		{
			name: 'name',
			description: 'Name of the product',
			required: true,
			type: ApplicationCommandOptionType.String,
		},
	],
	run: async interaction => {
		try {
			const productName = interaction.options.get('name')?.value as string;
			const products = await getProducts(productName);

			const embeds = products.map(product => {
				const embed: EmbedData = {
					title: product.name,
					color: 4,
					url: `https://pt.aliexpress.com/item/${product.id}.html`,
					thumbnail: { url: `http:${product.image}` },
					description: `⭐ ${product.rating ? String(product.rating) : '❓'}`,
					fields: [
						{
							name: 'Vendidos:',
							value: product.sold ? String(product.sold) : '❓',
							inline: true,
						},
						{
							name: 'Preço:',
							value: product.price ? String(product.price) : '❓',
							inline: true,
						},
					],
				};
				return new EmbedBuilder(embed);
			});

			await interaction.followUp({ embeds });
		} catch (error) {
			logger.error(error);
			await interaction.followUp({
				content: JSON.stringify(error, null, 2),
			});
		}
	},
};
