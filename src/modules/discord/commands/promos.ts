import { ApplicationCommandOptionType, ApplicationCommandType, EmbedData } from 'discord.js';

import { logger } from '@/logger';

//todo: better imports
import type { Command } from './interfaces/Command';
import { getProducts } from '@/providers/ali-express/query-product';

export const getProduct: Command = {
	name: 'query-product',
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
					description: `⭐ ${product.rating ?? '❓'}`, //product.price,
					fields: [
						{
							name: 'Vendidos:',
							value: String(product.selled),
							inline: true,
						},
						{
							name: 'Preço:',
							value: String(product.price),
							inline: true,
						},
					],
				};
				return embed;
			});

			// @ts-ignore
			await interaction.followUp({ embeds });
		} catch (error) {
			logger.error(error);
			await interaction.followUp({
				content: `DESGRACA ASJKLFASHJGFABDHJK`,
			});
		}
	},
};
